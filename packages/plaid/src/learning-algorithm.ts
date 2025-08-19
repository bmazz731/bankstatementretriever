/**
 * Learning algorithm for statement availability patterns
 * Tracks when statements become available for each institution/account
 */
import { prisma } from '@bsr/database'
import type { StatementPattern, LearningData, AvailabilityCheck } from './types'

export class StatementLearningService {
  
  /**
   * Record when a statement becomes available
   */
  async recordStatementAvailability(
    institutionId: string,
    accountId: string,
    statementMonth: number,
    statementYear: number,
    availableDate: Date
  ): Promise<void> {
    try {
      const discoveredDay = availableDate.getDate()
      
      // Store the learning data point
      await prisma.statementPattern.create({
        data: {
          institution_id: institutionId,
          account_id: accountId,
          statement_month: statementMonth,
          statement_year: statementYear,
          available_date: availableDate,
          discovered_day: discoveredDay
        }
      })

      // Update pattern analysis
      await this.updatePattern(institutionId, accountId)

    } catch (error) {
      console.error('Failed to record statement availability:', error)
    }
  }

  /**
   * Get predicted availability date for next statement
   */
  async predictNextStatement(institutionId: string, accountId: string): Promise<AvailabilityCheck | null> {
    try {
      // Get current pattern
      const pattern = await this.getPattern(institutionId, accountId)
      if (!pattern) return null

      const now = new Date()
      const nextMonth = now.getMonth() + 1
      const nextYear = nextMonth > 11 ? now.getFullYear() + 1 : now.getFullYear()
      const normalizedMonth = nextMonth > 11 ? 0 : nextMonth

      // Calculate expected date based on pattern
      const expectedDate = new Date(nextYear, normalizedMonth, pattern.typical_day)
      
      // Adjust check date based on confidence
      const daysBuffer = Math.round((1 - pattern.confidence) * 5) // 0-5 day buffer
      const checkAfter = new Date(expectedDate)
      checkAfter.setDate(expectedDate.getDate() - daysBuffer)

      return {
        account_id: accountId,
        expected_date: expectedDate,
        confidence: pattern.confidence,
        check_after: checkAfter
      }

    } catch (error) {
      console.error('Failed to predict next statement:', error)
      return null
    }
  }

  /**
   * Get all accounts that should be checked for new statements
   */
  async getAccountsToCheck(): Promise<AvailabilityCheck[]> {
    try {
      // Get all active accounts
      const accounts = await prisma.account.findMany({
        where: {
          connection: {
            status: 'active'
          }
        },
        include: {
          connection: true
        }
      })

      const checks: AvailabilityCheck[] = []
      const now = new Date()

      for (const account of accounts) {
        const prediction = await this.predictNextStatement(
          account.connection.institution_id || 'unknown',
          account.plaid_account_id
        )

        if (prediction && prediction.check_after <= now) {
          checks.push(prediction)
        }
      }

      return checks

    } catch (error) {
      console.error('Failed to get accounts to check:', error)
      return []
    }
  }

  /**
   * Check if we're in the 45-day learning period for an account
   */
  async isInLearningPeriod(institutionId: string, accountId: string): Promise<boolean> {
    try {
      const firstRecord = await prisma.statementPattern.findFirst({
        where: {
          institution_id: institutionId,
          account_id: accountId
        },
        orderBy: {
          available_date: 'asc'
        }
      })

      if (!firstRecord) return true

      const daysSinceFirst = Math.floor(
        (Date.now() - firstRecord.available_date.getTime()) / (1000 * 60 * 60 * 24)
      )

      return daysSinceFirst < 45
    } catch (error) {
      console.error('Failed to check learning period:', error)
      return true
    }
  }

  /**
   * Get learning period frequency (daily during learning, smart afterwards)
   */
  async getCheckFrequency(institutionId: string, accountId: string): Promise<'daily' | 'smart'> {
    const inLearning = await this.isInLearningPeriod(institutionId, accountId)
    return inLearning ? 'daily' : 'smart'
  }

  // Private helper methods

  private async getPattern(institutionId: string, accountId: string): Promise<StatementPattern | null> {
    try {
      // Calculate pattern from historical data
      const records = await prisma.statementPattern.findMany({
        where: {
          institution_id: institutionId,
          account_id: accountId
        },
        orderBy: {
          available_date: 'desc'
        }
      })

      if (records.length === 0) return null

      // Calculate typical day and confidence
      const days = records.map(r => r.discovered_day)
      const avgDay = Math.round(days.reduce((sum, day) => sum + day, 0) / days.length)
      
      // Calculate confidence based on consistency
      const variance = days.reduce((sum, day) => sum + Math.pow(day - avgDay, 2), 0) / days.length
      const standardDev = Math.sqrt(variance)
      const confidence = Math.max(0, Math.min(1, 1 - (standardDev / 15))) // 15 days max deviation

      return {
        institution_id: institutionId,
        account_id: accountId,
        typical_day: avgDay,
        confidence,
        last_updated: new Date(),
        sample_size: records.length
      }

    } catch (error) {
      console.error('Failed to get pattern:', error)
      return null
    }
  }

  private async updatePattern(institutionId: string, accountId: string): Promise<void> {
    // Pattern is calculated dynamically, no persistent storage needed
    // This could be optimized later with a pattern cache table
  }

  /**
   * Get historical statistics for debugging/monitoring
   */
  async getStatistics(institutionId?: string): Promise<{
    total_accounts: number
    learning_accounts: number
    confident_accounts: number
    avg_confidence: number
  }> {
    try {
      const whereClause = institutionId ? { institution_id: institutionId } : {}
      
      // Get all unique account combinations
      const accounts = await prisma.statementPattern.groupBy({
        by: ['institution_id', 'account_id'],
        where: whereClause,
        _count: {
          id: true
        }
      })

      let learningCount = 0
      let confidentCount = 0
      let totalConfidence = 0

      for (const account of accounts) {
        const pattern = await this.getPattern(account.institution_id, account.account_id)
        const inLearning = await this.isInLearningPeriod(account.institution_id, account.account_id)
        
        if (inLearning) {
          learningCount++
        } else {
          confidentCount++
        }

        if (pattern) {
          totalConfidence += pattern.confidence
        }
      }

      return {
        total_accounts: accounts.length,
        learning_accounts: learningCount,
        confident_accounts: confidentCount,
        avg_confidence: accounts.length > 0 ? totalConfidence / accounts.length : 0
      }

    } catch (error) {
      console.error('Failed to get statistics:', error)
      return {
        total_accounts: 0,
        learning_accounts: 0,
        confident_accounts: 0,
        avg_confidence: 0
      }
    }
  }
}