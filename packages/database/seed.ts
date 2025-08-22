// Seed data for BankStatementRetriever development
import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create test organization and user
  const testUser = await prisma.user.create({
    data: {
      id: "00000000-0000-0000-0000-000000000001",
      email: "test@bankstatementretriever.com",
      password_hash: "$2b$10$example_hash_for_testing",
      org_id: "00000000-0000-0000-0000-000000000001",
    },
  });

  const testOrg = await prisma.organization.create({
    data: {
      id: "00000000-0000-0000-0000-000000000001",
      owner_user_id: testUser.id,
      plan: "professional",
      status: "active",
    },
  });

  console.log("✅ Created test organization and user");

  // Create test connection (Plaid Item)
  const testConnection = await prisma.connection.create({
    data: {
      id: "00000000-0000-0000-0000-000000000002",
      org_id: testOrg.id,
      plaid_item_id: "item_test_sandbox_12345",
      institution: "First Platypus Bank",
      status: "active",
    },
  });

  console.log("✅ Created test connection");

  // Create test accounts
  const checkingAccount = await prisma.account.create({
    data: {
      id: "00000000-0000-0000-0000-000000000003",
      connection_id: testConnection.id,
      plaid_account_id: "account_test_checking_12345",
      account_last4: "1234",
      account_name: "Plaid Checking",
      type: "checking",
      statements_supported: true,
      status: "active",
    },
  });

  const creditAccount = await prisma.account.create({
    data: {
      id: "00000000-0000-0000-0000-000000000004",
      connection_id: testConnection.id,
      plaid_account_id: "account_test_credit_12345",
      account_last4: "5678",
      account_name: "Plaid Credit Card",
      type: "credit_card",
      statements_supported: true,
      status: "active",
    },
  });

  console.log("✅ Created test accounts");

  // Create test destinations
  const googleDriveDestination = await prisma.destination.create({
    data: {
      id: "00000000-0000-0000-0000-000000000005",
      org_id: testOrg.id,
      kind: "google_drive",
      name: "My Google Drive",
      config_json: {
        folderId: "test_folder_id",
        folderName: "Bank Statements",
      },
      secret_ref: "oauth_token_ref_1",
      active: true,
    },
  });

  const webhookDestination = await prisma.destination.create({
    data: {
      id: "00000000-0000-0000-0000-000000000006",
      org_id: testOrg.id,
      kind: "webhook",
      name: "Test Webhook",
      config_json: {
        url: "https://webhook.site/test-endpoint",
      },
      secret_ref: "webhook_secret_ref_1",
      active: true,
    },
  });

  console.log("✅ Created test destinations");

  // Create routing rules
  await prisma.routingRule.create({
    data: {
      account_id: checkingAccount.id,
      destination_id: googleDriveDestination.id,
      folder_path: "Bank Statements/{institution}",
      filename_pattern:
        "{institution}_{accountLast4}_{periodEnd}_statement.{fileType}",
      active: true,
    },
  });

  await prisma.routingRule.create({
    data: {
      account_id: creditAccount.id,
      destination_id: webhookDestination.id,
      folder_path: "",
      filename_pattern: "{institution}_credit_{periodEnd}.{fileType}",
      active: true,
    },
  });

  console.log("✅ Created routing rules");

  // Create sample statements
  const statement1 = await prisma.statement.create({
    data: {
      account_id: checkingAccount.id,
      period_start: new Date("2024-01-01"),
      period_end: new Date("2024-01-31"),
      statement_date: new Date("2024-02-01"),
      file_type: "pdf",
      checksum: "sha256:abc123...",
      version: 1,
    },
  });

  const statement2 = await prisma.statement.create({
    data: {
      account_id: creditAccount.id,
      period_start: new Date("2024-01-01"),
      period_end: new Date("2024-01-31"),
      statement_date: new Date("2024-02-03"),
      file_type: "csv",
      checksum: "sha256:def456...",
      version: 1,
    },
  });

  console.log("✅ Created sample statements");

  // Create deliveries
  await prisma.delivery.create({
    data: {
      statement_id: statement1.id,
      destination_id: googleDriveDestination.id,
      status: "succeeded",
      path: "Bank Statements/First Platypus Bank/First_Platypus_Bank_1234_2024-01-31_statement.pdf",
      delivered_at: new Date("2024-02-01T10:30:00Z"),
      request_id: "req_00000000-0000-0000-0000-000000000001",
    },
  });

  await prisma.delivery.create({
    data: {
      statement_id: statement2.id,
      destination_id: webhookDestination.id,
      status: "pending",
      attempts: 0,
      request_id: "req_00000000-0000-0000-0000-000000000002",
    },
  });

  console.log("✅ Created sample deliveries");

  // Create notification preferences
  await prisma.notificationPreference.create({
    data: {
      account_id: checkingAccount.id,
      channel: "email",
      event_type: "statement_delivered",
      enabled: true,
    },
  });

  await prisma.notificationPreference.create({
    data: {
      account_id: checkingAccount.id,
      channel: "email",
      event_type: "delivery_failed",
      enabled: true,
    },
  });

  console.log("✅ Created notification preferences");

  // Create audit log entries
  await prisma.auditLog.create({
    data: {
      org_id: testOrg.id,
      user_id: testUser.id,
      action: "connection_added",
      target_id: testConnection.id,
      meta_json: {
        institution: "First Platypus Bank",
        accounts_count: 2,
      },
    },
  });

  await prisma.auditLog.create({
    data: {
      org_id: testOrg.id,
      user_id: testUser.id,
      action: "delivery_succeeded",
      target_id: statement1.id,
      meta_json: {
        destination: "Google Drive",
        file_type: "pdf",
      },
    },
  });

  console.log("✅ Created audit log entries");

  console.log("🎉 Seeding completed successfully!");

  // Print summary
  console.log("\n📊 Seed Summary:");
  console.log(`- Organizations: 1`);
  console.log(`- Users: 1`);
  console.log(`- Connections: 1`);
  console.log(`- Accounts: 2`);
  console.log(`- Destinations: 2`);
  console.log(`- Statements: 2`);
  console.log(`- Deliveries: 2`);
  console.log(`- Routing Rules: 2`);
  console.log(`- Notification Preferences: 2`);
  console.log(`- Audit Logs: 2`);
  console.log("\n🔑 Test Login:");
  console.log(`Email: test@bankstatementretriever.com`);
  console.log(`Org ID: ${testOrg.id}`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
