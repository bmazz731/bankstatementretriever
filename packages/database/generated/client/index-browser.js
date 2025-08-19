
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.OrganizationScalarFieldEnum = {
  id: 'id',
  owner_user_id: 'owner_user_id',
  plan: 'plan',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at',
  deleted_at: 'deleted_at'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  org_id: 'org_id',
  email: 'email',
  password_hash: 'password_hash',
  oidc_provider: 'oidc_provider',
  mfa_enabled: 'mfa_enabled',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ConnectionScalarFieldEnum = {
  id: 'id',
  org_id: 'org_id',
  plaid_item_id: 'plaid_item_id',
  institution: 'institution',
  status: 'status',
  last_reauth_at: 'last_reauth_at',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  connection_id: 'connection_id',
  plaid_account_id: 'plaid_account_id',
  account_last4: 'account_last4',
  account_name: 'account_name',
  type: 'type',
  statements_supported: 'statements_supported',
  learned_schedule_json: 'learned_schedule_json',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.StatementScalarFieldEnum = {
  id: 'id',
  account_id: 'account_id',
  period_start: 'period_start',
  period_end: 'period_end',
  statement_date: 'statement_date',
  file_type: 'file_type',
  checksum: 'checksum',
  version: 'version',
  retrieved_at: 'retrieved_at',
  created_at: 'created_at'
};

exports.Prisma.DestinationScalarFieldEnum = {
  id: 'id',
  org_id: 'org_id',
  kind: 'kind',
  name: 'name',
  config_json: 'config_json',
  secret_ref: 'secret_ref',
  active: 'active',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.RoutingRuleScalarFieldEnum = {
  id: 'id',
  account_id: 'account_id',
  destination_id: 'destination_id',
  folder_path: 'folder_path',
  filename_pattern: 'filename_pattern',
  active: 'active',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.DeliveryScalarFieldEnum = {
  id: 'id',
  statement_id: 'statement_id',
  destination_id: 'destination_id',
  status: 'status',
  path: 'path',
  delivered_at: 'delivered_at',
  attempts: 'attempts',
  last_error: 'last_error',
  request_id: 'request_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.WebhookEndpointScalarFieldEnum = {
  id: 'id',
  org_id: 'org_id',
  url: 'url',
  secret_ref: 'secret_ref',
  active: 'active',
  last_success_at: 'last_success_at',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.OAuthTokenScalarFieldEnum = {
  id: 'id',
  org_id: 'org_id',
  user_id: 'user_id',
  provider: 'provider',
  scopes: 'scopes',
  expires_at: 'expires_at',
  enc_payload: 'enc_payload',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  org_id: 'org_id',
  user_id: 'user_id',
  action: 'action',
  target_id: 'target_id',
  meta_json: 'meta_json',
  created_at: 'created_at'
};

exports.Prisma.BackfillJobScalarFieldEnum = {
  id: 'id',
  org_id: 'org_id',
  account_id: 'account_id',
  range_start: 'range_start',
  range_end: 'range_end',
  status: 'status',
  progress: 'progress',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.NotificationPreferenceScalarFieldEnum = {
  id: 'id',
  account_id: 'account_id',
  channel: 'channel',
  event_type: 'event_type',
  enabled: 'enabled',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  Organization: 'Organization',
  User: 'User',
  Connection: 'Connection',
  Account: 'Account',
  Statement: 'Statement',
  Destination: 'Destination',
  RoutingRule: 'RoutingRule',
  Delivery: 'Delivery',
  WebhookEndpoint: 'WebhookEndpoint',
  OAuthToken: 'OAuthToken',
  AuditLog: 'AuditLog',
  BackfillJob: 'BackfillJob',
  NotificationPreference: 'NotificationPreference'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
