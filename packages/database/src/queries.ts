// Common database queries for BankStatementRetriever
import { prisma, type Prisma } from './client'
import type { PaginationOptions, DateRangeOptions, ApiResponse } from './types'

// Organization queries
export const organizationQueries = {
  findByOwner: (userId: string) =>
    prisma.organization.findFirst({
      where: { owner_user_id: userId, deleted_at: null },
      include: {
        owner: true,
        connections: {
          include: { accounts: true }
        },
        destinations: true,
      }
    }),

  updatePlan: (orgId: string, plan: string) =>
    prisma.organization.update({
      where: { id: orgId },
      data: { plan, updated_at: new Date() }
    }),

  softDelete: (orgId: string) =>
    prisma.organization.update({
      where: { id: orgId },
      data: { deleted_at: new Date() }
    }),
}

// Account queries with pagination
export const accountQueries = {
  findByOrg: async (
    orgId: string, 
    options: PaginationOptions & { status?: string } = {}
  ): Promise<ApiResponse<any[]>> => {
    const { page = 1, pageSize = 20, status } = options
    const skip = (page - 1) * pageSize

    const where: Prisma.AccountWhereInput = {
      connection: { org_id: orgId },
      ...(status && { status })
    }

    const [accounts, total] = await Promise.all([
      prisma.account.findMany({
        where,
        skip,
        take: pageSize,
        include: {
          connection: true,
          statements: {
            orderBy: { statement_date: 'desc' },
            take: 1
          }
        },
        orderBy: { created_at: 'desc' }
      }),
      prisma.account.count({ where })
    ])

    return {
      data: accounts,
      page,
      pageSize,
      total
    }
  },

  findWithStatements: (accountId: string, dateRange: DateRangeOptions = {}) =>
    prisma.account.findUnique({
      where: { id: accountId },
      include: {
        statements: {
          where: {
            ...(dateRange.from && { statement_date: { gte: dateRange.from } }),
            ...(dateRange.to && { statement_date: { lte: dateRange.to } })
          },
          orderBy: { statement_date: 'desc' }
        },
        routing_rules: {
          include: { destination: true }
        }
      }
    }),
}

// Statement queries
export const statementQueries = {
  findByAccount: async (
    accountId: string,
    options: PaginationOptions & DateRangeOptions & { fileType?: string } = {}
  ): Promise<ApiResponse<any[]>> => {
    const { page = 1, pageSize = 20, from, to, fileType } = options
    const skip = (page - 1) * pageSize

    const where: Prisma.StatementWhereInput = {
      account_id: accountId,
      ...(from && { statement_date: { gte: from } }),
      ...(to && { statement_date: { lte: to } }),
      ...(fileType && { file_type: fileType })
    }

    const [statements, total] = await Promise.all([
      prisma.statement.findMany({
        where,
        skip,
        take: pageSize,
        include: {
          deliveries: {
            include: { destination: true }
          }
        },
        orderBy: { statement_date: 'desc' }
      }),
      prisma.statement.count({ where })
    ])

    return {
      data: statements,
      page,
      pageSize,
      total
    }
  },

  // Deduplication check per PRD Section 4.3
  checkDuplicate: (
    accountId: string, 
    periodEnd: Date, 
    fileType: string
  ) =>
    prisma.statement.findFirst({
      where: {
        account_id: accountId,
        period_end: periodEnd,
        file_type: fileType
      },
      orderBy: { version: 'desc' }
    }),

  createWithDeduplication: async (data: {
    account_id: string
    period_start: Date
    period_end: Date
    statement_date: Date
    file_type: string
    checksum: string
  }) => {
    const existing = await statementQueries.checkDuplicate(
      data.account_id,
      data.period_end,
      data.file_type
    )
    
    const version = existing ? existing.version + 1 : 1

    return prisma.statement.create({
      data: {
        account_id: data.account_id,
        period_start: data.period_start,
        period_end: data.period_end,
        statement_date: data.statement_date,
        file_type: data.file_type,
        checksum: data.checksum,
        version
      }
    })
  },
}

// Delivery queries
export const deliveryQueries = {
  findPending: () =>
    prisma.delivery.findMany({
      where: {
        status: { in: ['pending', 'retrying'] }
      },
      include: {
        statement: {
          include: { account: { include: { connection: true } } }
        },
        destination: true
      },
      orderBy: { created_at: 'asc' }
    }),

  updateStatus: (deliveryId: string, status: string, error?: string) =>
    prisma.delivery.update({
      where: { id: deliveryId },
      data: {
        status,
        last_error: error,
        attempts: { increment: 1 },
        ...(status === 'succeeded' && { delivered_at: new Date() }),
        updated_at: new Date()
      }
    }),

  findByRequestId: (requestId: string) =>
    prisma.delivery.findUnique({
      where: { request_id: requestId },
      include: {
        statement: true,
        destination: true
      }
    }),
}

// Audit log helpers
export const auditQueries = {
  log: (
    orgId: string,
    action: string,
    userId?: string,
    targetId?: string,
    meta?: any
  ) =>
    prisma.auditLog.create({
      data: {
        org_id: orgId,
        user_id: userId,
        action,
        target_id: targetId,
        meta_json: meta
      }
    }),

  findByOrg: async (
    orgId: string,
    options: PaginationOptions & DateRangeOptions = {}
  ) => {
    const { page = 1, pageSize = 50, from, to } = options
    const skip = (page - 1) * pageSize

    const where: Prisma.AuditLogWhereInput = {
      org_id: orgId,
      ...(from && { created_at: { gte: from } }),
      ...(to && { created_at: { lte: to } })
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: pageSize,
        include: { user: true },
        orderBy: { created_at: 'desc' }
      }),
      prisma.auditLog.count({ where })
    ])

    return { data: logs, page, pageSize, total }
  },
}

// Health check query
export const healthQueries = {
  check: async () => {
    try {
      await prisma.$queryRaw`SELECT 1`
      return { status: 'healthy', timestamp: new Date().toISOString() }
    } catch (error) {
      return { 
        status: 'unhealthy', 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString() 
      }
    }
  }
}