
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Connection
 * 
 */
export type Connection = $Result.DefaultSelection<Prisma.$ConnectionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Statement
 * 
 */
export type Statement = $Result.DefaultSelection<Prisma.$StatementPayload>
/**
 * Model Destination
 * 
 */
export type Destination = $Result.DefaultSelection<Prisma.$DestinationPayload>
/**
 * Model RoutingRule
 * 
 */
export type RoutingRule = $Result.DefaultSelection<Prisma.$RoutingRulePayload>
/**
 * Model Delivery
 * 
 */
export type Delivery = $Result.DefaultSelection<Prisma.$DeliveryPayload>
/**
 * Model WebhookEndpoint
 * 
 */
export type WebhookEndpoint = $Result.DefaultSelection<Prisma.$WebhookEndpointPayload>
/**
 * Model OAuthToken
 * 
 */
export type OAuthToken = $Result.DefaultSelection<Prisma.$OAuthTokenPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model BackfillJob
 * 
 */
export type BackfillJob = $Result.DefaultSelection<Prisma.$BackfillJobPayload>
/**
 * Model NotificationPreference
 * 
 */
export type NotificationPreference = $Result.DefaultSelection<Prisma.$NotificationPreferencePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Organizations
 * const organizations = await prisma.organization.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Organizations
   * const organizations = await prisma.organization.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.connection`: Exposes CRUD operations for the **Connection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Connections
    * const connections = await prisma.connection.findMany()
    * ```
    */
  get connection(): Prisma.ConnectionDelegate<ExtArgs>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs>;

  /**
   * `prisma.statement`: Exposes CRUD operations for the **Statement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Statements
    * const statements = await prisma.statement.findMany()
    * ```
    */
  get statement(): Prisma.StatementDelegate<ExtArgs>;

  /**
   * `prisma.destination`: Exposes CRUD operations for the **Destination** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Destinations
    * const destinations = await prisma.destination.findMany()
    * ```
    */
  get destination(): Prisma.DestinationDelegate<ExtArgs>;

  /**
   * `prisma.routingRule`: Exposes CRUD operations for the **RoutingRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoutingRules
    * const routingRules = await prisma.routingRule.findMany()
    * ```
    */
  get routingRule(): Prisma.RoutingRuleDelegate<ExtArgs>;

  /**
   * `prisma.delivery`: Exposes CRUD operations for the **Delivery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Deliveries
    * const deliveries = await prisma.delivery.findMany()
    * ```
    */
  get delivery(): Prisma.DeliveryDelegate<ExtArgs>;

  /**
   * `prisma.webhookEndpoint`: Exposes CRUD operations for the **WebhookEndpoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookEndpoints
    * const webhookEndpoints = await prisma.webhookEndpoint.findMany()
    * ```
    */
  get webhookEndpoint(): Prisma.WebhookEndpointDelegate<ExtArgs>;

  /**
   * `prisma.oAuthToken`: Exposes CRUD operations for the **OAuthToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthTokens
    * const oAuthTokens = await prisma.oAuthToken.findMany()
    * ```
    */
  get oAuthToken(): Prisma.OAuthTokenDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.backfillJob`: Exposes CRUD operations for the **BackfillJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BackfillJobs
    * const backfillJobs = await prisma.backfillJob.findMany()
    * ```
    */
  get backfillJob(): Prisma.BackfillJobDelegate<ExtArgs>;

  /**
   * `prisma.notificationPreference`: Exposes CRUD operations for the **NotificationPreference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationPreferences
    * const notificationPreferences = await prisma.notificationPreference.findMany()
    * ```
    */
  get notificationPreference(): Prisma.NotificationPreferenceDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "organization" | "user" | "connection" | "account" | "statement" | "destination" | "routingRule" | "delivery" | "webhookEndpoint" | "oAuthToken" | "auditLog" | "backfillJob" | "notificationPreference"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Connection: {
        payload: Prisma.$ConnectionPayload<ExtArgs>
        fields: Prisma.ConnectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConnectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConnectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          findFirst: {
            args: Prisma.ConnectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConnectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          findMany: {
            args: Prisma.ConnectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>[]
          }
          create: {
            args: Prisma.ConnectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          createMany: {
            args: Prisma.ConnectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConnectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>[]
          }
          delete: {
            args: Prisma.ConnectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          update: {
            args: Prisma.ConnectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          deleteMany: {
            args: Prisma.ConnectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConnectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConnectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          aggregate: {
            args: Prisma.ConnectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConnection>
          }
          groupBy: {
            args: Prisma.ConnectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConnectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConnectionCountArgs<ExtArgs>
            result: $Utils.Optional<ConnectionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Statement: {
        payload: Prisma.$StatementPayload<ExtArgs>
        fields: Prisma.StatementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StatementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StatementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>
          }
          findFirst: {
            args: Prisma.StatementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StatementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>
          }
          findMany: {
            args: Prisma.StatementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>[]
          }
          create: {
            args: Prisma.StatementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>
          }
          createMany: {
            args: Prisma.StatementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StatementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>[]
          }
          delete: {
            args: Prisma.StatementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>
          }
          update: {
            args: Prisma.StatementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>
          }
          deleteMany: {
            args: Prisma.StatementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StatementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StatementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementPayload>
          }
          aggregate: {
            args: Prisma.StatementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStatement>
          }
          groupBy: {
            args: Prisma.StatementGroupByArgs<ExtArgs>
            result: $Utils.Optional<StatementGroupByOutputType>[]
          }
          count: {
            args: Prisma.StatementCountArgs<ExtArgs>
            result: $Utils.Optional<StatementCountAggregateOutputType> | number
          }
        }
      }
      Destination: {
        payload: Prisma.$DestinationPayload<ExtArgs>
        fields: Prisma.DestinationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DestinationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DestinationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinationPayload>
          }
          findFirst: {
            args: Prisma.DestinationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DestinationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinationPayload>
          }
          findMany: {
            args: Prisma.DestinationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinationPayload>[]
          }
          create: {
            args: Prisma.DestinationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinationPayload>
          }
          createMany: {
            args: Prisma.DestinationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DestinationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinationPayload>[]
          }
          delete: {
            args: Prisma.DestinationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinationPayload>
          }
          update: {
            args: Prisma.DestinationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinationPayload>
          }
          deleteMany: {
            args: Prisma.DestinationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DestinationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DestinationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinationPayload>
          }
          aggregate: {
            args: Prisma.DestinationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDestination>
          }
          groupBy: {
            args: Prisma.DestinationGroupByArgs<ExtArgs>
            result: $Utils.Optional<DestinationGroupByOutputType>[]
          }
          count: {
            args: Prisma.DestinationCountArgs<ExtArgs>
            result: $Utils.Optional<DestinationCountAggregateOutputType> | number
          }
        }
      }
      RoutingRule: {
        payload: Prisma.$RoutingRulePayload<ExtArgs>
        fields: Prisma.RoutingRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoutingRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoutingRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingRulePayload>
          }
          findFirst: {
            args: Prisma.RoutingRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoutingRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingRulePayload>
          }
          findMany: {
            args: Prisma.RoutingRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingRulePayload>[]
          }
          create: {
            args: Prisma.RoutingRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingRulePayload>
          }
          createMany: {
            args: Prisma.RoutingRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoutingRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingRulePayload>[]
          }
          delete: {
            args: Prisma.RoutingRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingRulePayload>
          }
          update: {
            args: Prisma.RoutingRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingRulePayload>
          }
          deleteMany: {
            args: Prisma.RoutingRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoutingRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoutingRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingRulePayload>
          }
          aggregate: {
            args: Prisma.RoutingRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoutingRule>
          }
          groupBy: {
            args: Prisma.RoutingRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoutingRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoutingRuleCountArgs<ExtArgs>
            result: $Utils.Optional<RoutingRuleCountAggregateOutputType> | number
          }
        }
      }
      Delivery: {
        payload: Prisma.$DeliveryPayload<ExtArgs>
        fields: Prisma.DeliveryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeliveryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeliveryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          findFirst: {
            args: Prisma.DeliveryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeliveryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          findMany: {
            args: Prisma.DeliveryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>[]
          }
          create: {
            args: Prisma.DeliveryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          createMany: {
            args: Prisma.DeliveryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeliveryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>[]
          }
          delete: {
            args: Prisma.DeliveryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          update: {
            args: Prisma.DeliveryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          deleteMany: {
            args: Prisma.DeliveryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeliveryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DeliveryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          aggregate: {
            args: Prisma.DeliveryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDelivery>
          }
          groupBy: {
            args: Prisma.DeliveryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeliveryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeliveryCountArgs<ExtArgs>
            result: $Utils.Optional<DeliveryCountAggregateOutputType> | number
          }
        }
      }
      WebhookEndpoint: {
        payload: Prisma.$WebhookEndpointPayload<ExtArgs>
        fields: Prisma.WebhookEndpointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookEndpointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookEndpointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          findFirst: {
            args: Prisma.WebhookEndpointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookEndpointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          findMany: {
            args: Prisma.WebhookEndpointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>[]
          }
          create: {
            args: Prisma.WebhookEndpointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          createMany: {
            args: Prisma.WebhookEndpointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookEndpointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>[]
          }
          delete: {
            args: Prisma.WebhookEndpointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          update: {
            args: Prisma.WebhookEndpointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          deleteMany: {
            args: Prisma.WebhookEndpointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookEndpointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WebhookEndpointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          aggregate: {
            args: Prisma.WebhookEndpointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookEndpoint>
          }
          groupBy: {
            args: Prisma.WebhookEndpointGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookEndpointGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookEndpointCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookEndpointCountAggregateOutputType> | number
          }
        }
      }
      OAuthToken: {
        payload: Prisma.$OAuthTokenPayload<ExtArgs>
        fields: Prisma.OAuthTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          findFirst: {
            args: Prisma.OAuthTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          findMany: {
            args: Prisma.OAuthTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          create: {
            args: Prisma.OAuthTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          createMany: {
            args: Prisma.OAuthTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          delete: {
            args: Prisma.OAuthTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          update: {
            args: Prisma.OAuthTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          deleteMany: {
            args: Prisma.OAuthTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OAuthTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          aggregate: {
            args: Prisma.OAuthTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthToken>
          }
          groupBy: {
            args: Prisma.OAuthTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthTokenCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthTokenCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      BackfillJob: {
        payload: Prisma.$BackfillJobPayload<ExtArgs>
        fields: Prisma.BackfillJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BackfillJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackfillJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BackfillJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackfillJobPayload>
          }
          findFirst: {
            args: Prisma.BackfillJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackfillJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BackfillJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackfillJobPayload>
          }
          findMany: {
            args: Prisma.BackfillJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackfillJobPayload>[]
          }
          create: {
            args: Prisma.BackfillJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackfillJobPayload>
          }
          createMany: {
            args: Prisma.BackfillJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BackfillJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackfillJobPayload>[]
          }
          delete: {
            args: Prisma.BackfillJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackfillJobPayload>
          }
          update: {
            args: Prisma.BackfillJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackfillJobPayload>
          }
          deleteMany: {
            args: Prisma.BackfillJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BackfillJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BackfillJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackfillJobPayload>
          }
          aggregate: {
            args: Prisma.BackfillJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBackfillJob>
          }
          groupBy: {
            args: Prisma.BackfillJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<BackfillJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.BackfillJobCountArgs<ExtArgs>
            result: $Utils.Optional<BackfillJobCountAggregateOutputType> | number
          }
        }
      }
      NotificationPreference: {
        payload: Prisma.$NotificationPreferencePayload<ExtArgs>
        fields: Prisma.NotificationPreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationPreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          findFirst: {
            args: Prisma.NotificationPreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          findMany: {
            args: Prisma.NotificationPreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          create: {
            args: Prisma.NotificationPreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          createMany: {
            args: Prisma.NotificationPreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          delete: {
            args: Prisma.NotificationPreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          update: {
            args: Prisma.NotificationPreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          deleteMany: {
            args: Prisma.NotificationPreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationPreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationPreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          aggregate: {
            args: Prisma.NotificationPreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationPreference>
          }
          groupBy: {
            args: Prisma.NotificationPreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationPreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationPreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationPreferenceCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    users: number
    connections: number
    destinations: number
    webhook_endpoints: number
    oauth_tokens: number
    audit_logs: number
    backfill_jobs: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | OrganizationCountOutputTypeCountUsersArgs
    connections?: boolean | OrganizationCountOutputTypeCountConnectionsArgs
    destinations?: boolean | OrganizationCountOutputTypeCountDestinationsArgs
    webhook_endpoints?: boolean | OrganizationCountOutputTypeCountWebhook_endpointsArgs
    oauth_tokens?: boolean | OrganizationCountOutputTypeCountOauth_tokensArgs
    audit_logs?: boolean | OrganizationCountOutputTypeCountAudit_logsArgs
    backfill_jobs?: boolean | OrganizationCountOutputTypeCountBackfill_jobsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectionWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountDestinationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DestinationWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountWebhook_endpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookEndpointWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountOauth_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthTokenWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountAudit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountBackfill_jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BackfillJobWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    owned_orgs: number
    oauth_tokens: number
    audit_logs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owned_orgs?: boolean | UserCountOutputTypeCountOwned_orgsArgs
    oauth_tokens?: boolean | UserCountOutputTypeCountOauth_tokensArgs
    audit_logs?: boolean | UserCountOutputTypeCountAudit_logsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwned_orgsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauth_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAudit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type ConnectionCountOutputType
   */

  export type ConnectionCountOutputType = {
    accounts: number
  }

  export type ConnectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | ConnectionCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * ConnectionCountOutputType without action
   */
  export type ConnectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionCountOutputType
     */
    select?: ConnectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConnectionCountOutputType without action
   */
  export type ConnectionCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * Count Type AccountCountOutputType
   */

  export type AccountCountOutputType = {
    statements: number
    routing_rules: number
    notification_preferences: number
    backfill_jobs: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statements?: boolean | AccountCountOutputTypeCountStatementsArgs
    routing_rules?: boolean | AccountCountOutputTypeCountRouting_rulesArgs
    notification_preferences?: boolean | AccountCountOutputTypeCountNotification_preferencesArgs
    backfill_jobs?: boolean | AccountCountOutputTypeCountBackfill_jobsArgs
  }

  // Custom InputTypes
  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountCountOutputType
     */
    select?: AccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountStatementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatementWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountRouting_rulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoutingRuleWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountNotification_preferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationPreferenceWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountBackfill_jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BackfillJobWhereInput
  }


  /**
   * Count Type StatementCountOutputType
   */

  export type StatementCountOutputType = {
    deliveries: number
  }

  export type StatementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveries?: boolean | StatementCountOutputTypeCountDeliveriesArgs
  }

  // Custom InputTypes
  /**
   * StatementCountOutputType without action
   */
  export type StatementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementCountOutputType
     */
    select?: StatementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StatementCountOutputType without action
   */
  export type StatementCountOutputTypeCountDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryWhereInput
  }


  /**
   * Count Type DestinationCountOutputType
   */

  export type DestinationCountOutputType = {
    routing_rules: number
    deliveries: number
  }

  export type DestinationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routing_rules?: boolean | DestinationCountOutputTypeCountRouting_rulesArgs
    deliveries?: boolean | DestinationCountOutputTypeCountDeliveriesArgs
  }

  // Custom InputTypes
  /**
   * DestinationCountOutputType without action
   */
  export type DestinationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DestinationCountOutputType
     */
    select?: DestinationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DestinationCountOutputType without action
   */
  export type DestinationCountOutputTypeCountRouting_rulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoutingRuleWhereInput
  }

  /**
   * DestinationCountOutputType without action
   */
  export type DestinationCountOutputTypeCountDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    owner_user_id: string | null
    plan: string | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    owner_user_id: string | null
    plan: string | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    owner_user_id: number
    plan: number
    status: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    owner_user_id?: true
    plan?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    owner_user_id?: true
    plan?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    owner_user_id?: true
    plan?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    owner_user_id: string
    plan: string
    status: string
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    owner_user_id?: boolean
    plan?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    users?: boolean | Organization$usersArgs<ExtArgs>
    connections?: boolean | Organization$connectionsArgs<ExtArgs>
    destinations?: boolean | Organization$destinationsArgs<ExtArgs>
    webhook_endpoints?: boolean | Organization$webhook_endpointsArgs<ExtArgs>
    oauth_tokens?: boolean | Organization$oauth_tokensArgs<ExtArgs>
    audit_logs?: boolean | Organization$audit_logsArgs<ExtArgs>
    backfill_jobs?: boolean | Organization$backfill_jobsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    owner_user_id?: boolean
    plan?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    owner_user_id?: boolean
    plan?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    users?: boolean | Organization$usersArgs<ExtArgs>
    connections?: boolean | Organization$connectionsArgs<ExtArgs>
    destinations?: boolean | Organization$destinationsArgs<ExtArgs>
    webhook_endpoints?: boolean | Organization$webhook_endpointsArgs<ExtArgs>
    oauth_tokens?: boolean | Organization$oauth_tokensArgs<ExtArgs>
    audit_logs?: boolean | Organization$audit_logsArgs<ExtArgs>
    backfill_jobs?: boolean | Organization$backfill_jobsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      users: Prisma.$UserPayload<ExtArgs>[]
      connections: Prisma.$ConnectionPayload<ExtArgs>[]
      destinations: Prisma.$DestinationPayload<ExtArgs>[]
      webhook_endpoints: Prisma.$WebhookEndpointPayload<ExtArgs>[]
      oauth_tokens: Prisma.$OAuthTokenPayload<ExtArgs>[]
      audit_logs: Prisma.$AuditLogPayload<ExtArgs>[]
      backfill_jobs: Prisma.$BackfillJobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      owner_user_id: string
      plan: string
      status: string
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    users<T extends Organization$usersArgs<ExtArgs> = {}>(args?: Subset<T, Organization$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    connections<T extends Organization$connectionsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$connectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findMany"> | Null>
    destinations<T extends Organization$destinationsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$destinationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DestinationPayload<ExtArgs>, T, "findMany"> | Null>
    webhook_endpoints<T extends Organization$webhook_endpointsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$webhook_endpointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findMany"> | Null>
    oauth_tokens<T extends Organization$oauth_tokensArgs<ExtArgs> = {}>(args?: Subset<T, Organization$oauth_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findMany"> | Null>
    audit_logs<T extends Organization$audit_logsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$audit_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    backfill_jobs<T extends Organization$backfill_jobsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$backfill_jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackfillJobPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */ 
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly owner_user_id: FieldRef<"Organization", 'String'>
    readonly plan: FieldRef<"Organization", 'String'>
    readonly status: FieldRef<"Organization", 'String'>
    readonly created_at: FieldRef<"Organization", 'DateTime'>
    readonly updated_at: FieldRef<"Organization", 'DateTime'>
    readonly deleted_at: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization.users
   */
  export type Organization$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Organization.connections
   */
  export type Organization$connectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    where?: ConnectionWhereInput
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    cursor?: ConnectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * Organization.destinations
   */
  export type Organization$destinationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destination
     */
    select?: DestinationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinationInclude<ExtArgs> | null
    where?: DestinationWhereInput
    orderBy?: DestinationOrderByWithRelationInput | DestinationOrderByWithRelationInput[]
    cursor?: DestinationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DestinationScalarFieldEnum | DestinationScalarFieldEnum[]
  }

  /**
   * Organization.webhook_endpoints
   */
  export type Organization$webhook_endpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    where?: WebhookEndpointWhereInput
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    cursor?: WebhookEndpointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebhookEndpointScalarFieldEnum | WebhookEndpointScalarFieldEnum[]
  }

  /**
   * Organization.oauth_tokens
   */
  export type Organization$oauth_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    where?: OAuthTokenWhereInput
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    cursor?: OAuthTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * Organization.audit_logs
   */
  export type Organization$audit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Organization.backfill_jobs
   */
  export type Organization$backfill_jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackfillJob
     */
    select?: BackfillJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackfillJobInclude<ExtArgs> | null
    where?: BackfillJobWhereInput
    orderBy?: BackfillJobOrderByWithRelationInput | BackfillJobOrderByWithRelationInput[]
    cursor?: BackfillJobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BackfillJobScalarFieldEnum | BackfillJobScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    org_id: string | null
    email: string | null
    password_hash: string | null
    oidc_provider: string | null
    mfa_enabled: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    org_id: string | null
    email: string | null
    password_hash: string | null
    oidc_provider: string | null
    mfa_enabled: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    org_id: number
    email: number
    password_hash: number
    oidc_provider: number
    mfa_enabled: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    org_id?: true
    email?: true
    password_hash?: true
    oidc_provider?: true
    mfa_enabled?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    org_id?: true
    email?: true
    password_hash?: true
    oidc_provider?: true
    mfa_enabled?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    org_id?: true
    email?: true
    password_hash?: true
    oidc_provider?: true
    mfa_enabled?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    org_id: string
    email: string
    password_hash: string | null
    oidc_provider: string | null
    mfa_enabled: boolean
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    email?: boolean
    password_hash?: boolean
    oidc_provider?: boolean
    mfa_enabled?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    owned_orgs?: boolean | User$owned_orgsArgs<ExtArgs>
    oauth_tokens?: boolean | User$oauth_tokensArgs<ExtArgs>
    audit_logs?: boolean | User$audit_logsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    email?: boolean
    password_hash?: boolean
    oidc_provider?: boolean
    mfa_enabled?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    org_id?: boolean
    email?: boolean
    password_hash?: boolean
    oidc_provider?: boolean
    mfa_enabled?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    owned_orgs?: boolean | User$owned_orgsArgs<ExtArgs>
    oauth_tokens?: boolean | User$oauth_tokensArgs<ExtArgs>
    audit_logs?: boolean | User$audit_logsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      owned_orgs: Prisma.$OrganizationPayload<ExtArgs>[]
      oauth_tokens: Prisma.$OAuthTokenPayload<ExtArgs>[]
      audit_logs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      org_id: string
      email: string
      password_hash: string | null
      oidc_provider: string | null
      mfa_enabled: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    owned_orgs<T extends User$owned_orgsArgs<ExtArgs> = {}>(args?: Subset<T, User$owned_orgsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany"> | Null>
    oauth_tokens<T extends User$oauth_tokensArgs<ExtArgs> = {}>(args?: Subset<T, User$oauth_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findMany"> | Null>
    audit_logs<T extends User$audit_logsArgs<ExtArgs> = {}>(args?: Subset<T, User$audit_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly org_id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly oidc_provider: FieldRef<"User", 'String'>
    readonly mfa_enabled: FieldRef<"User", 'Boolean'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.owned_orgs
   */
  export type User$owned_orgsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    cursor?: OrganizationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * User.oauth_tokens
   */
  export type User$oauth_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    where?: OAuthTokenWhereInput
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    cursor?: OAuthTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * User.audit_logs
   */
  export type User$audit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Connection
   */

  export type AggregateConnection = {
    _count: ConnectionCountAggregateOutputType | null
    _min: ConnectionMinAggregateOutputType | null
    _max: ConnectionMaxAggregateOutputType | null
  }

  export type ConnectionMinAggregateOutputType = {
    id: string | null
    org_id: string | null
    plaid_item_id: string | null
    institution: string | null
    status: string | null
    last_reauth_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ConnectionMaxAggregateOutputType = {
    id: string | null
    org_id: string | null
    plaid_item_id: string | null
    institution: string | null
    status: string | null
    last_reauth_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ConnectionCountAggregateOutputType = {
    id: number
    org_id: number
    plaid_item_id: number
    institution: number
    status: number
    last_reauth_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ConnectionMinAggregateInputType = {
    id?: true
    org_id?: true
    plaid_item_id?: true
    institution?: true
    status?: true
    last_reauth_at?: true
    created_at?: true
    updated_at?: true
  }

  export type ConnectionMaxAggregateInputType = {
    id?: true
    org_id?: true
    plaid_item_id?: true
    institution?: true
    status?: true
    last_reauth_at?: true
    created_at?: true
    updated_at?: true
  }

  export type ConnectionCountAggregateInputType = {
    id?: true
    org_id?: true
    plaid_item_id?: true
    institution?: true
    status?: true
    last_reauth_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ConnectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Connection to aggregate.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Connections
    **/
    _count?: true | ConnectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConnectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConnectionMaxAggregateInputType
  }

  export type GetConnectionAggregateType<T extends ConnectionAggregateArgs> = {
        [P in keyof T & keyof AggregateConnection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConnection[P]>
      : GetScalarType<T[P], AggregateConnection[P]>
  }




  export type ConnectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectionWhereInput
    orderBy?: ConnectionOrderByWithAggregationInput | ConnectionOrderByWithAggregationInput[]
    by: ConnectionScalarFieldEnum[] | ConnectionScalarFieldEnum
    having?: ConnectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConnectionCountAggregateInputType | true
    _min?: ConnectionMinAggregateInputType
    _max?: ConnectionMaxAggregateInputType
  }

  export type ConnectionGroupByOutputType = {
    id: string
    org_id: string
    plaid_item_id: string
    institution: string
    status: string
    last_reauth_at: Date | null
    created_at: Date
    updated_at: Date
    _count: ConnectionCountAggregateOutputType | null
    _min: ConnectionMinAggregateOutputType | null
    _max: ConnectionMaxAggregateOutputType | null
  }

  type GetConnectionGroupByPayload<T extends ConnectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConnectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConnectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConnectionGroupByOutputType[P]>
            : GetScalarType<T[P], ConnectionGroupByOutputType[P]>
        }
      >
    >


  export type ConnectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    plaid_item_id?: boolean
    institution?: boolean
    status?: boolean
    last_reauth_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    accounts?: boolean | Connection$accountsArgs<ExtArgs>
    _count?: boolean | ConnectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["connection"]>

  export type ConnectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    plaid_item_id?: boolean
    institution?: boolean
    status?: boolean
    last_reauth_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["connection"]>

  export type ConnectionSelectScalar = {
    id?: boolean
    org_id?: boolean
    plaid_item_id?: boolean
    institution?: boolean
    status?: boolean
    last_reauth_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ConnectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    accounts?: boolean | Connection$accountsArgs<ExtArgs>
    _count?: boolean | ConnectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConnectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $ConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Connection"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      accounts: Prisma.$AccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      org_id: string
      plaid_item_id: string
      institution: string
      status: string
      last_reauth_at: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["connection"]>
    composites: {}
  }

  type ConnectionGetPayload<S extends boolean | null | undefined | ConnectionDefaultArgs> = $Result.GetResult<Prisma.$ConnectionPayload, S>

  type ConnectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ConnectionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ConnectionCountAggregateInputType | true
    }

  export interface ConnectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Connection'], meta: { name: 'Connection' } }
    /**
     * Find zero or one Connection that matches the filter.
     * @param {ConnectionFindUniqueArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConnectionFindUniqueArgs>(args: SelectSubset<T, ConnectionFindUniqueArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Connection that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ConnectionFindUniqueOrThrowArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConnectionFindUniqueOrThrowArgs>(args: SelectSubset<T, ConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Connection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionFindFirstArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConnectionFindFirstArgs>(args?: SelectSubset<T, ConnectionFindFirstArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Connection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionFindFirstOrThrowArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConnectionFindFirstOrThrowArgs>(args?: SelectSubset<T, ConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Connections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Connections
     * const connections = await prisma.connection.findMany()
     * 
     * // Get first 10 Connections
     * const connections = await prisma.connection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const connectionWithIdOnly = await prisma.connection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConnectionFindManyArgs>(args?: SelectSubset<T, ConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Connection.
     * @param {ConnectionCreateArgs} args - Arguments to create a Connection.
     * @example
     * // Create one Connection
     * const Connection = await prisma.connection.create({
     *   data: {
     *     // ... data to create a Connection
     *   }
     * })
     * 
     */
    create<T extends ConnectionCreateArgs>(args: SelectSubset<T, ConnectionCreateArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Connections.
     * @param {ConnectionCreateManyArgs} args - Arguments to create many Connections.
     * @example
     * // Create many Connections
     * const connection = await prisma.connection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConnectionCreateManyArgs>(args?: SelectSubset<T, ConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Connections and returns the data saved in the database.
     * @param {ConnectionCreateManyAndReturnArgs} args - Arguments to create many Connections.
     * @example
     * // Create many Connections
     * const connection = await prisma.connection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Connections and only return the `id`
     * const connectionWithIdOnly = await prisma.connection.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConnectionCreateManyAndReturnArgs>(args?: SelectSubset<T, ConnectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Connection.
     * @param {ConnectionDeleteArgs} args - Arguments to delete one Connection.
     * @example
     * // Delete one Connection
     * const Connection = await prisma.connection.delete({
     *   where: {
     *     // ... filter to delete one Connection
     *   }
     * })
     * 
     */
    delete<T extends ConnectionDeleteArgs>(args: SelectSubset<T, ConnectionDeleteArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Connection.
     * @param {ConnectionUpdateArgs} args - Arguments to update one Connection.
     * @example
     * // Update one Connection
     * const connection = await prisma.connection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConnectionUpdateArgs>(args: SelectSubset<T, ConnectionUpdateArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Connections.
     * @param {ConnectionDeleteManyArgs} args - Arguments to filter Connections to delete.
     * @example
     * // Delete a few Connections
     * const { count } = await prisma.connection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConnectionDeleteManyArgs>(args?: SelectSubset<T, ConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Connections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Connections
     * const connection = await prisma.connection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConnectionUpdateManyArgs>(args: SelectSubset<T, ConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Connection.
     * @param {ConnectionUpsertArgs} args - Arguments to update or create a Connection.
     * @example
     * // Update or create a Connection
     * const connection = await prisma.connection.upsert({
     *   create: {
     *     // ... data to create a Connection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Connection we want to update
     *   }
     * })
     */
    upsert<T extends ConnectionUpsertArgs>(args: SelectSubset<T, ConnectionUpsertArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Connections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionCountArgs} args - Arguments to filter Connections to count.
     * @example
     * // Count the number of Connections
     * const count = await prisma.connection.count({
     *   where: {
     *     // ... the filter for the Connections we want to count
     *   }
     * })
    **/
    count<T extends ConnectionCountArgs>(
      args?: Subset<T, ConnectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConnectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Connection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConnectionAggregateArgs>(args: Subset<T, ConnectionAggregateArgs>): Prisma.PrismaPromise<GetConnectionAggregateType<T>>

    /**
     * Group by Connection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConnectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConnectionGroupByArgs['orderBy'] }
        : { orderBy?: ConnectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Connection model
   */
  readonly fields: ConnectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Connection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConnectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    accounts<T extends Connection$accountsArgs<ExtArgs> = {}>(args?: Subset<T, Connection$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Connection model
   */ 
  interface ConnectionFieldRefs {
    readonly id: FieldRef<"Connection", 'String'>
    readonly org_id: FieldRef<"Connection", 'String'>
    readonly plaid_item_id: FieldRef<"Connection", 'String'>
    readonly institution: FieldRef<"Connection", 'String'>
    readonly status: FieldRef<"Connection", 'String'>
    readonly last_reauth_at: FieldRef<"Connection", 'DateTime'>
    readonly created_at: FieldRef<"Connection", 'DateTime'>
    readonly updated_at: FieldRef<"Connection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Connection findUnique
   */
  export type ConnectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection findUniqueOrThrow
   */
  export type ConnectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection findFirst
   */
  export type ConnectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Connections.
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Connections.
     */
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * Connection findFirstOrThrow
   */
  export type ConnectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Connections.
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Connections.
     */
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * Connection findMany
   */
  export type ConnectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connections to fetch.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Connections.
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * Connection create
   */
  export type ConnectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Connection.
     */
    data: XOR<ConnectionCreateInput, ConnectionUncheckedCreateInput>
  }

  /**
   * Connection createMany
   */
  export type ConnectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Connections.
     */
    data: ConnectionCreateManyInput | ConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Connection createManyAndReturn
   */
  export type ConnectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Connections.
     */
    data: ConnectionCreateManyInput | ConnectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Connection update
   */
  export type ConnectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Connection.
     */
    data: XOR<ConnectionUpdateInput, ConnectionUncheckedUpdateInput>
    /**
     * Choose, which Connection to update.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection updateMany
   */
  export type ConnectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Connections.
     */
    data: XOR<ConnectionUpdateManyMutationInput, ConnectionUncheckedUpdateManyInput>
    /**
     * Filter which Connections to update
     */
    where?: ConnectionWhereInput
  }

  /**
   * Connection upsert
   */
  export type ConnectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Connection to update in case it exists.
     */
    where: ConnectionWhereUniqueInput
    /**
     * In case the Connection found by the `where` argument doesn't exist, create a new Connection with this data.
     */
    create: XOR<ConnectionCreateInput, ConnectionUncheckedCreateInput>
    /**
     * In case the Connection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConnectionUpdateInput, ConnectionUncheckedUpdateInput>
  }

  /**
   * Connection delete
   */
  export type ConnectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter which Connection to delete.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection deleteMany
   */
  export type ConnectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Connections to delete
     */
    where?: ConnectionWhereInput
  }

  /**
   * Connection.accounts
   */
  export type Connection$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Connection without action
   */
  export type ConnectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    connection_id: string | null
    plaid_account_id: string | null
    account_last4: string | null
    account_name: string | null
    type: string | null
    statements_supported: boolean | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    connection_id: string | null
    plaid_account_id: string | null
    account_last4: string | null
    account_name: string | null
    type: string | null
    statements_supported: boolean | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    connection_id: number
    plaid_account_id: number
    account_last4: number
    account_name: number
    type: number
    statements_supported: number
    learned_schedule_json: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    connection_id?: true
    plaid_account_id?: true
    account_last4?: true
    account_name?: true
    type?: true
    statements_supported?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    connection_id?: true
    plaid_account_id?: true
    account_last4?: true
    account_name?: true
    type?: true
    statements_supported?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    connection_id?: true
    plaid_account_id?: true
    account_last4?: true
    account_name?: true
    type?: true
    statements_supported?: true
    learned_schedule_json?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    connection_id: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported: boolean
    learned_schedule_json: JsonValue | null
    status: string
    created_at: Date
    updated_at: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connection_id?: boolean
    plaid_account_id?: boolean
    account_last4?: boolean
    account_name?: boolean
    type?: boolean
    statements_supported?: boolean
    learned_schedule_json?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
    statements?: boolean | Account$statementsArgs<ExtArgs>
    routing_rules?: boolean | Account$routing_rulesArgs<ExtArgs>
    notification_preferences?: boolean | Account$notification_preferencesArgs<ExtArgs>
    backfill_jobs?: boolean | Account$backfill_jobsArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connection_id?: boolean
    plaid_account_id?: boolean
    account_last4?: boolean
    account_name?: boolean
    type?: boolean
    statements_supported?: boolean
    learned_schedule_json?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    connection_id?: boolean
    plaid_account_id?: boolean
    account_last4?: boolean
    account_name?: boolean
    type?: boolean
    statements_supported?: boolean
    learned_schedule_json?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
    statements?: boolean | Account$statementsArgs<ExtArgs>
    routing_rules?: boolean | Account$routing_rulesArgs<ExtArgs>
    notification_preferences?: boolean | Account$notification_preferencesArgs<ExtArgs>
    backfill_jobs?: boolean | Account$backfill_jobsArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      connection: Prisma.$ConnectionPayload<ExtArgs>
      statements: Prisma.$StatementPayload<ExtArgs>[]
      routing_rules: Prisma.$RoutingRulePayload<ExtArgs>[]
      notification_preferences: Prisma.$NotificationPreferencePayload<ExtArgs>[]
      backfill_jobs: Prisma.$BackfillJobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      connection_id: string
      plaid_account_id: string
      account_last4: string
      account_name: string
      type: string
      statements_supported: boolean
      learned_schedule_json: Prisma.JsonValue | null
      status: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connection<T extends ConnectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConnectionDefaultArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    statements<T extends Account$statementsArgs<ExtArgs> = {}>(args?: Subset<T, Account$statementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findMany"> | Null>
    routing_rules<T extends Account$routing_rulesArgs<ExtArgs> = {}>(args?: Subset<T, Account$routing_rulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutingRulePayload<ExtArgs>, T, "findMany"> | Null>
    notification_preferences<T extends Account$notification_preferencesArgs<ExtArgs> = {}>(args?: Subset<T, Account$notification_preferencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findMany"> | Null>
    backfill_jobs<T extends Account$backfill_jobsArgs<ExtArgs> = {}>(args?: Subset<T, Account$backfill_jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackfillJobPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */ 
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly connection_id: FieldRef<"Account", 'String'>
    readonly plaid_account_id: FieldRef<"Account", 'String'>
    readonly account_last4: FieldRef<"Account", 'String'>
    readonly account_name: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly statements_supported: FieldRef<"Account", 'Boolean'>
    readonly learned_schedule_json: FieldRef<"Account", 'Json'>
    readonly status: FieldRef<"Account", 'String'>
    readonly created_at: FieldRef<"Account", 'DateTime'>
    readonly updated_at: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
  }

  /**
   * Account.statements
   */
  export type Account$statementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    where?: StatementWhereInput
    orderBy?: StatementOrderByWithRelationInput | StatementOrderByWithRelationInput[]
    cursor?: StatementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StatementScalarFieldEnum | StatementScalarFieldEnum[]
  }

  /**
   * Account.routing_rules
   */
  export type Account$routing_rulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingRule
     */
    select?: RoutingRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingRuleInclude<ExtArgs> | null
    where?: RoutingRuleWhereInput
    orderBy?: RoutingRuleOrderByWithRelationInput | RoutingRuleOrderByWithRelationInput[]
    cursor?: RoutingRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoutingRuleScalarFieldEnum | RoutingRuleScalarFieldEnum[]
  }

  /**
   * Account.notification_preferences
   */
  export type Account$notification_preferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    where?: NotificationPreferenceWhereInput
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    cursor?: NotificationPreferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * Account.backfill_jobs
   */
  export type Account$backfill_jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackfillJob
     */
    select?: BackfillJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackfillJobInclude<ExtArgs> | null
    where?: BackfillJobWhereInput
    orderBy?: BackfillJobOrderByWithRelationInput | BackfillJobOrderByWithRelationInput[]
    cursor?: BackfillJobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BackfillJobScalarFieldEnum | BackfillJobScalarFieldEnum[]
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Statement
   */

  export type AggregateStatement = {
    _count: StatementCountAggregateOutputType | null
    _avg: StatementAvgAggregateOutputType | null
    _sum: StatementSumAggregateOutputType | null
    _min: StatementMinAggregateOutputType | null
    _max: StatementMaxAggregateOutputType | null
  }

  export type StatementAvgAggregateOutputType = {
    version: number | null
  }

  export type StatementSumAggregateOutputType = {
    version: number | null
  }

  export type StatementMinAggregateOutputType = {
    id: string | null
    account_id: string | null
    period_start: Date | null
    period_end: Date | null
    statement_date: Date | null
    file_type: string | null
    checksum: string | null
    version: number | null
    retrieved_at: Date | null
    created_at: Date | null
  }

  export type StatementMaxAggregateOutputType = {
    id: string | null
    account_id: string | null
    period_start: Date | null
    period_end: Date | null
    statement_date: Date | null
    file_type: string | null
    checksum: string | null
    version: number | null
    retrieved_at: Date | null
    created_at: Date | null
  }

  export type StatementCountAggregateOutputType = {
    id: number
    account_id: number
    period_start: number
    period_end: number
    statement_date: number
    file_type: number
    checksum: number
    version: number
    retrieved_at: number
    created_at: number
    _all: number
  }


  export type StatementAvgAggregateInputType = {
    version?: true
  }

  export type StatementSumAggregateInputType = {
    version?: true
  }

  export type StatementMinAggregateInputType = {
    id?: true
    account_id?: true
    period_start?: true
    period_end?: true
    statement_date?: true
    file_type?: true
    checksum?: true
    version?: true
    retrieved_at?: true
    created_at?: true
  }

  export type StatementMaxAggregateInputType = {
    id?: true
    account_id?: true
    period_start?: true
    period_end?: true
    statement_date?: true
    file_type?: true
    checksum?: true
    version?: true
    retrieved_at?: true
    created_at?: true
  }

  export type StatementCountAggregateInputType = {
    id?: true
    account_id?: true
    period_start?: true
    period_end?: true
    statement_date?: true
    file_type?: true
    checksum?: true
    version?: true
    retrieved_at?: true
    created_at?: true
    _all?: true
  }

  export type StatementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Statement to aggregate.
     */
    where?: StatementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statements to fetch.
     */
    orderBy?: StatementOrderByWithRelationInput | StatementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StatementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Statements
    **/
    _count?: true | StatementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StatementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StatementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StatementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StatementMaxAggregateInputType
  }

  export type GetStatementAggregateType<T extends StatementAggregateArgs> = {
        [P in keyof T & keyof AggregateStatement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStatement[P]>
      : GetScalarType<T[P], AggregateStatement[P]>
  }




  export type StatementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatementWhereInput
    orderBy?: StatementOrderByWithAggregationInput | StatementOrderByWithAggregationInput[]
    by: StatementScalarFieldEnum[] | StatementScalarFieldEnum
    having?: StatementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StatementCountAggregateInputType | true
    _avg?: StatementAvgAggregateInputType
    _sum?: StatementSumAggregateInputType
    _min?: StatementMinAggregateInputType
    _max?: StatementMaxAggregateInputType
  }

  export type StatementGroupByOutputType = {
    id: string
    account_id: string
    period_start: Date
    period_end: Date
    statement_date: Date
    file_type: string
    checksum: string
    version: number
    retrieved_at: Date
    created_at: Date
    _count: StatementCountAggregateOutputType | null
    _avg: StatementAvgAggregateOutputType | null
    _sum: StatementSumAggregateOutputType | null
    _min: StatementMinAggregateOutputType | null
    _max: StatementMaxAggregateOutputType | null
  }

  type GetStatementGroupByPayload<T extends StatementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StatementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StatementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StatementGroupByOutputType[P]>
            : GetScalarType<T[P], StatementGroupByOutputType[P]>
        }
      >
    >


  export type StatementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    account_id?: boolean
    period_start?: boolean
    period_end?: boolean
    statement_date?: boolean
    file_type?: boolean
    checksum?: boolean
    version?: boolean
    retrieved_at?: boolean
    created_at?: boolean
    account?: boolean | AccountDefaultArgs<ExtArgs>
    deliveries?: boolean | Statement$deliveriesArgs<ExtArgs>
    _count?: boolean | StatementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statement"]>

  export type StatementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    account_id?: boolean
    period_start?: boolean
    period_end?: boolean
    statement_date?: boolean
    file_type?: boolean
    checksum?: boolean
    version?: boolean
    retrieved_at?: boolean
    created_at?: boolean
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statement"]>

  export type StatementSelectScalar = {
    id?: boolean
    account_id?: boolean
    period_start?: boolean
    period_end?: boolean
    statement_date?: boolean
    file_type?: boolean
    checksum?: boolean
    version?: boolean
    retrieved_at?: boolean
    created_at?: boolean
  }

  export type StatementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountDefaultArgs<ExtArgs>
    deliveries?: boolean | Statement$deliveriesArgs<ExtArgs>
    _count?: boolean | StatementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StatementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }

  export type $StatementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Statement"
    objects: {
      account: Prisma.$AccountPayload<ExtArgs>
      deliveries: Prisma.$DeliveryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      account_id: string
      period_start: Date
      period_end: Date
      statement_date: Date
      file_type: string
      checksum: string
      version: number
      retrieved_at: Date
      created_at: Date
    }, ExtArgs["result"]["statement"]>
    composites: {}
  }

  type StatementGetPayload<S extends boolean | null | undefined | StatementDefaultArgs> = $Result.GetResult<Prisma.$StatementPayload, S>

  type StatementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StatementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StatementCountAggregateInputType | true
    }

  export interface StatementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Statement'], meta: { name: 'Statement' } }
    /**
     * Find zero or one Statement that matches the filter.
     * @param {StatementFindUniqueArgs} args - Arguments to find a Statement
     * @example
     * // Get one Statement
     * const statement = await prisma.statement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatementFindUniqueArgs>(args: SelectSubset<T, StatementFindUniqueArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Statement that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StatementFindUniqueOrThrowArgs} args - Arguments to find a Statement
     * @example
     * // Get one Statement
     * const statement = await prisma.statement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatementFindUniqueOrThrowArgs>(args: SelectSubset<T, StatementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Statement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementFindFirstArgs} args - Arguments to find a Statement
     * @example
     * // Get one Statement
     * const statement = await prisma.statement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatementFindFirstArgs>(args?: SelectSubset<T, StatementFindFirstArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Statement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementFindFirstOrThrowArgs} args - Arguments to find a Statement
     * @example
     * // Get one Statement
     * const statement = await prisma.statement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatementFindFirstOrThrowArgs>(args?: SelectSubset<T, StatementFindFirstOrThrowArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Statements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Statements
     * const statements = await prisma.statement.findMany()
     * 
     * // Get first 10 Statements
     * const statements = await prisma.statement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const statementWithIdOnly = await prisma.statement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StatementFindManyArgs>(args?: SelectSubset<T, StatementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Statement.
     * @param {StatementCreateArgs} args - Arguments to create a Statement.
     * @example
     * // Create one Statement
     * const Statement = await prisma.statement.create({
     *   data: {
     *     // ... data to create a Statement
     *   }
     * })
     * 
     */
    create<T extends StatementCreateArgs>(args: SelectSubset<T, StatementCreateArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Statements.
     * @param {StatementCreateManyArgs} args - Arguments to create many Statements.
     * @example
     * // Create many Statements
     * const statement = await prisma.statement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StatementCreateManyArgs>(args?: SelectSubset<T, StatementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Statements and returns the data saved in the database.
     * @param {StatementCreateManyAndReturnArgs} args - Arguments to create many Statements.
     * @example
     * // Create many Statements
     * const statement = await prisma.statement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Statements and only return the `id`
     * const statementWithIdOnly = await prisma.statement.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StatementCreateManyAndReturnArgs>(args?: SelectSubset<T, StatementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Statement.
     * @param {StatementDeleteArgs} args - Arguments to delete one Statement.
     * @example
     * // Delete one Statement
     * const Statement = await prisma.statement.delete({
     *   where: {
     *     // ... filter to delete one Statement
     *   }
     * })
     * 
     */
    delete<T extends StatementDeleteArgs>(args: SelectSubset<T, StatementDeleteArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Statement.
     * @param {StatementUpdateArgs} args - Arguments to update one Statement.
     * @example
     * // Update one Statement
     * const statement = await prisma.statement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StatementUpdateArgs>(args: SelectSubset<T, StatementUpdateArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Statements.
     * @param {StatementDeleteManyArgs} args - Arguments to filter Statements to delete.
     * @example
     * // Delete a few Statements
     * const { count } = await prisma.statement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StatementDeleteManyArgs>(args?: SelectSubset<T, StatementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Statements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Statements
     * const statement = await prisma.statement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StatementUpdateManyArgs>(args: SelectSubset<T, StatementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Statement.
     * @param {StatementUpsertArgs} args - Arguments to update or create a Statement.
     * @example
     * // Update or create a Statement
     * const statement = await prisma.statement.upsert({
     *   create: {
     *     // ... data to create a Statement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Statement we want to update
     *   }
     * })
     */
    upsert<T extends StatementUpsertArgs>(args: SelectSubset<T, StatementUpsertArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Statements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementCountArgs} args - Arguments to filter Statements to count.
     * @example
     * // Count the number of Statements
     * const count = await prisma.statement.count({
     *   where: {
     *     // ... the filter for the Statements we want to count
     *   }
     * })
    **/
    count<T extends StatementCountArgs>(
      args?: Subset<T, StatementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StatementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Statement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StatementAggregateArgs>(args: Subset<T, StatementAggregateArgs>): Prisma.PrismaPromise<GetStatementAggregateType<T>>

    /**
     * Group by Statement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StatementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StatementGroupByArgs['orderBy'] }
        : { orderBy?: StatementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StatementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Statement model
   */
  readonly fields: StatementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Statement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StatementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    deliveries<T extends Statement$deliveriesArgs<ExtArgs> = {}>(args?: Subset<T, Statement$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Statement model
   */ 
  interface StatementFieldRefs {
    readonly id: FieldRef<"Statement", 'String'>
    readonly account_id: FieldRef<"Statement", 'String'>
    readonly period_start: FieldRef<"Statement", 'DateTime'>
    readonly period_end: FieldRef<"Statement", 'DateTime'>
    readonly statement_date: FieldRef<"Statement", 'DateTime'>
    readonly file_type: FieldRef<"Statement", 'String'>
    readonly checksum: FieldRef<"Statement", 'String'>
    readonly version: FieldRef<"Statement", 'Int'>
    readonly retrieved_at: FieldRef<"Statement", 'DateTime'>
    readonly created_at: FieldRef<"Statement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Statement findUnique
   */
  export type StatementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * Filter, which Statement to fetch.
     */
    where: StatementWhereUniqueInput
  }

  /**
   * Statement findUniqueOrThrow
   */
  export type StatementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * Filter, which Statement to fetch.
     */
    where: StatementWhereUniqueInput
  }

  /**
   * Statement findFirst
   */
  export type StatementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * Filter, which Statement to fetch.
     */
    where?: StatementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statements to fetch.
     */
    orderBy?: StatementOrderByWithRelationInput | StatementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Statements.
     */
    cursor?: StatementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Statements.
     */
    distinct?: StatementScalarFieldEnum | StatementScalarFieldEnum[]
  }

  /**
   * Statement findFirstOrThrow
   */
  export type StatementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * Filter, which Statement to fetch.
     */
    where?: StatementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statements to fetch.
     */
    orderBy?: StatementOrderByWithRelationInput | StatementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Statements.
     */
    cursor?: StatementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Statements.
     */
    distinct?: StatementScalarFieldEnum | StatementScalarFieldEnum[]
  }

  /**
   * Statement findMany
   */
  export type StatementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * Filter, which Statements to fetch.
     */
    where?: StatementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statements to fetch.
     */
    orderBy?: StatementOrderByWithRelationInput | StatementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Statements.
     */
    cursor?: StatementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statements.
     */
    skip?: number
    distinct?: StatementScalarFieldEnum | StatementScalarFieldEnum[]
  }

  /**
   * Statement create
   */
  export type StatementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * The data needed to create a Statement.
     */
    data: XOR<StatementCreateInput, StatementUncheckedCreateInput>
  }

  /**
   * Statement createMany
   */
  export type StatementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Statements.
     */
    data: StatementCreateManyInput | StatementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Statement createManyAndReturn
   */
  export type StatementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Statements.
     */
    data: StatementCreateManyInput | StatementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Statement update
   */
  export type StatementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * The data needed to update a Statement.
     */
    data: XOR<StatementUpdateInput, StatementUncheckedUpdateInput>
    /**
     * Choose, which Statement to update.
     */
    where: StatementWhereUniqueInput
  }

  /**
   * Statement updateMany
   */
  export type StatementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Statements.
     */
    data: XOR<StatementUpdateManyMutationInput, StatementUncheckedUpdateManyInput>
    /**
     * Filter which Statements to update
     */
    where?: StatementWhereInput
  }

  /**
   * Statement upsert
   */
  export type StatementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * The filter to search for the Statement to update in case it exists.
     */
    where: StatementWhereUniqueInput
    /**
     * In case the Statement found by the `where` argument doesn't exist, create a new Statement with this data.
     */
    create: XOR<StatementCreateInput, StatementUncheckedCreateInput>
    /**
     * In case the Statement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StatementUpdateInput, StatementUncheckedUpdateInput>
  }

  /**
   * Statement delete
   */
  export type StatementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
    /**
     * Filter which Statement to delete.
     */
    where: StatementWhereUniqueInput
  }

  /**
   * Statement deleteMany
   */
  export type StatementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Statements to delete
     */
    where?: StatementWhereInput
  }

  /**
   * Statement.deliveries
   */
  export type Statement$deliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    where?: DeliveryWhereInput
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    cursor?: DeliveryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Statement without action
   */
  export type StatementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statement
     */
    select?: StatementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementInclude<ExtArgs> | null
  }


  /**
   * Model Destination
   */

  export type AggregateDestination = {
    _count: DestinationCountAggregateOutputType | null
    _min: DestinationMinAggregateOutputType | null
    _max: DestinationMaxAggregateOutputType | null
  }

  export type DestinationMinAggregateOutputType = {
    id: string | null
    org_id: string | null
    kind: string | null
    name: string | null
    secret_ref: string | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DestinationMaxAggregateOutputType = {
    id: string | null
    org_id: string | null
    kind: string | null
    name: string | null
    secret_ref: string | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DestinationCountAggregateOutputType = {
    id: number
    org_id: number
    kind: number
    name: number
    config_json: number
    secret_ref: number
    active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type DestinationMinAggregateInputType = {
    id?: true
    org_id?: true
    kind?: true
    name?: true
    secret_ref?: true
    active?: true
    created_at?: true
    updated_at?: true
  }

  export type DestinationMaxAggregateInputType = {
    id?: true
    org_id?: true
    kind?: true
    name?: true
    secret_ref?: true
    active?: true
    created_at?: true
    updated_at?: true
  }

  export type DestinationCountAggregateInputType = {
    id?: true
    org_id?: true
    kind?: true
    name?: true
    config_json?: true
    secret_ref?: true
    active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type DestinationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Destination to aggregate.
     */
    where?: DestinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Destinations to fetch.
     */
    orderBy?: DestinationOrderByWithRelationInput | DestinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DestinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Destinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Destinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Destinations
    **/
    _count?: true | DestinationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DestinationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DestinationMaxAggregateInputType
  }

  export type GetDestinationAggregateType<T extends DestinationAggregateArgs> = {
        [P in keyof T & keyof AggregateDestination]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDestination[P]>
      : GetScalarType<T[P], AggregateDestination[P]>
  }




  export type DestinationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DestinationWhereInput
    orderBy?: DestinationOrderByWithAggregationInput | DestinationOrderByWithAggregationInput[]
    by: DestinationScalarFieldEnum[] | DestinationScalarFieldEnum
    having?: DestinationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DestinationCountAggregateInputType | true
    _min?: DestinationMinAggregateInputType
    _max?: DestinationMaxAggregateInputType
  }

  export type DestinationGroupByOutputType = {
    id: string
    org_id: string
    kind: string
    name: string
    config_json: JsonValue
    secret_ref: string | null
    active: boolean
    created_at: Date
    updated_at: Date
    _count: DestinationCountAggregateOutputType | null
    _min: DestinationMinAggregateOutputType | null
    _max: DestinationMaxAggregateOutputType | null
  }

  type GetDestinationGroupByPayload<T extends DestinationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DestinationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DestinationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DestinationGroupByOutputType[P]>
            : GetScalarType<T[P], DestinationGroupByOutputType[P]>
        }
      >
    >


  export type DestinationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    kind?: boolean
    name?: boolean
    config_json?: boolean
    secret_ref?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    routing_rules?: boolean | Destination$routing_rulesArgs<ExtArgs>
    deliveries?: boolean | Destination$deliveriesArgs<ExtArgs>
    _count?: boolean | DestinationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["destination"]>

  export type DestinationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    kind?: boolean
    name?: boolean
    config_json?: boolean
    secret_ref?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["destination"]>

  export type DestinationSelectScalar = {
    id?: boolean
    org_id?: boolean
    kind?: boolean
    name?: boolean
    config_json?: boolean
    secret_ref?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type DestinationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    routing_rules?: boolean | Destination$routing_rulesArgs<ExtArgs>
    deliveries?: boolean | Destination$deliveriesArgs<ExtArgs>
    _count?: boolean | DestinationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DestinationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $DestinationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Destination"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      routing_rules: Prisma.$RoutingRulePayload<ExtArgs>[]
      deliveries: Prisma.$DeliveryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      org_id: string
      kind: string
      name: string
      config_json: Prisma.JsonValue
      secret_ref: string | null
      active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["destination"]>
    composites: {}
  }

  type DestinationGetPayload<S extends boolean | null | undefined | DestinationDefaultArgs> = $Result.GetResult<Prisma.$DestinationPayload, S>

  type DestinationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DestinationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DestinationCountAggregateInputType | true
    }

  export interface DestinationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Destination'], meta: { name: 'Destination' } }
    /**
     * Find zero or one Destination that matches the filter.
     * @param {DestinationFindUniqueArgs} args - Arguments to find a Destination
     * @example
     * // Get one Destination
     * const destination = await prisma.destination.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DestinationFindUniqueArgs>(args: SelectSubset<T, DestinationFindUniqueArgs<ExtArgs>>): Prisma__DestinationClient<$Result.GetResult<Prisma.$DestinationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Destination that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DestinationFindUniqueOrThrowArgs} args - Arguments to find a Destination
     * @example
     * // Get one Destination
     * const destination = await prisma.destination.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DestinationFindUniqueOrThrowArgs>(args: SelectSubset<T, DestinationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DestinationClient<$Result.GetResult<Prisma.$DestinationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Destination that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinationFindFirstArgs} args - Arguments to find a Destination
     * @example
     * // Get one Destination
     * const destination = await prisma.destination.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DestinationFindFirstArgs>(args?: SelectSubset<T, DestinationFindFirstArgs<ExtArgs>>): Prisma__DestinationClient<$Result.GetResult<Prisma.$DestinationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Destination that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinationFindFirstOrThrowArgs} args - Arguments to find a Destination
     * @example
     * // Get one Destination
     * const destination = await prisma.destination.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DestinationFindFirstOrThrowArgs>(args?: SelectSubset<T, DestinationFindFirstOrThrowArgs<ExtArgs>>): Prisma__DestinationClient<$Result.GetResult<Prisma.$DestinationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Destinations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Destinations
     * const destinations = await prisma.destination.findMany()
     * 
     * // Get first 10 Destinations
     * const destinations = await prisma.destination.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const destinationWithIdOnly = await prisma.destination.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DestinationFindManyArgs>(args?: SelectSubset<T, DestinationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DestinationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Destination.
     * @param {DestinationCreateArgs} args - Arguments to create a Destination.
     * @example
     * // Create one Destination
     * const Destination = await prisma.destination.create({
     *   data: {
     *     // ... data to create a Destination
     *   }
     * })
     * 
     */
    create<T extends DestinationCreateArgs>(args: SelectSubset<T, DestinationCreateArgs<ExtArgs>>): Prisma__DestinationClient<$Result.GetResult<Prisma.$DestinationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Destinations.
     * @param {DestinationCreateManyArgs} args - Arguments to create many Destinations.
     * @example
     * // Create many Destinations
     * const destination = await prisma.destination.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DestinationCreateManyArgs>(args?: SelectSubset<T, DestinationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Destinations and returns the data saved in the database.
     * @param {DestinationCreateManyAndReturnArgs} args - Arguments to create many Destinations.
     * @example
     * // Create many Destinations
     * const destination = await prisma.destination.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Destinations and only return the `id`
     * const destinationWithIdOnly = await prisma.destination.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DestinationCreateManyAndReturnArgs>(args?: SelectSubset<T, DestinationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DestinationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Destination.
     * @param {DestinationDeleteArgs} args - Arguments to delete one Destination.
     * @example
     * // Delete one Destination
     * const Destination = await prisma.destination.delete({
     *   where: {
     *     // ... filter to delete one Destination
     *   }
     * })
     * 
     */
    delete<T extends DestinationDeleteArgs>(args: SelectSubset<T, DestinationDeleteArgs<ExtArgs>>): Prisma__DestinationClient<$Result.GetResult<Prisma.$DestinationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Destination.
     * @param {DestinationUpdateArgs} args - Arguments to update one Destination.
     * @example
     * // Update one Destination
     * const destination = await prisma.destination.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DestinationUpdateArgs>(args: SelectSubset<T, DestinationUpdateArgs<ExtArgs>>): Prisma__DestinationClient<$Result.GetResult<Prisma.$DestinationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Destinations.
     * @param {DestinationDeleteManyArgs} args - Arguments to filter Destinations to delete.
     * @example
     * // Delete a few Destinations
     * const { count } = await prisma.destination.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DestinationDeleteManyArgs>(args?: SelectSubset<T, DestinationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Destinations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Destinations
     * const destination = await prisma.destination.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DestinationUpdateManyArgs>(args: SelectSubset<T, DestinationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Destination.
     * @param {DestinationUpsertArgs} args - Arguments to update or create a Destination.
     * @example
     * // Update or create a Destination
     * const destination = await prisma.destination.upsert({
     *   create: {
     *     // ... data to create a Destination
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Destination we want to update
     *   }
     * })
     */
    upsert<T extends DestinationUpsertArgs>(args: SelectSubset<T, DestinationUpsertArgs<ExtArgs>>): Prisma__DestinationClient<$Result.GetResult<Prisma.$DestinationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Destinations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinationCountArgs} args - Arguments to filter Destinations to count.
     * @example
     * // Count the number of Destinations
     * const count = await prisma.destination.count({
     *   where: {
     *     // ... the filter for the Destinations we want to count
     *   }
     * })
    **/
    count<T extends DestinationCountArgs>(
      args?: Subset<T, DestinationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DestinationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Destination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DestinationAggregateArgs>(args: Subset<T, DestinationAggregateArgs>): Prisma.PrismaPromise<GetDestinationAggregateType<T>>

    /**
     * Group by Destination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DestinationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DestinationGroupByArgs['orderBy'] }
        : { orderBy?: DestinationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DestinationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDestinationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Destination model
   */
  readonly fields: DestinationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Destination.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DestinationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    routing_rules<T extends Destination$routing_rulesArgs<ExtArgs> = {}>(args?: Subset<T, Destination$routing_rulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutingRulePayload<ExtArgs>, T, "findMany"> | Null>
    deliveries<T extends Destination$deliveriesArgs<ExtArgs> = {}>(args?: Subset<T, Destination$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Destination model
   */ 
  interface DestinationFieldRefs {
    readonly id: FieldRef<"Destination", 'String'>
    readonly org_id: FieldRef<"Destination", 'String'>
    readonly kind: FieldRef<"Destination", 'String'>
    readonly name: FieldRef<"Destination", 'String'>
    readonly config_json: FieldRef<"Destination", 'Json'>
    readonly secret_ref: FieldRef<"Destination", 'String'>
    readonly active: FieldRef<"Destination", 'Boolean'>
    readonly created_at: FieldRef<"Destination", 'DateTime'>
    readonly updated_at: FieldRef<"Destination", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Destination findUnique
   */
  export type DestinationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destination
     */
    select?: DestinationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinationInclude<ExtArgs> | null
    /**
     * Filter, which Destination to fetch.
     */
    where: DestinationWhereUniqueInput
  }

  /**
   * Destination findUniqueOrThrow
   */
  export type DestinationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destination
     */
    select?: DestinationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinationInclude<ExtArgs> | null
    /**
     * Filter, which Destination to fetch.
     */
    where: DestinationWhereUniqueInput
  }

  /**
   * Destination findFirst
   */
  export type DestinationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destination
     */
    select?: DestinationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinationInclude<ExtArgs> | null
    /**
     * Filter, which Destination to fetch.
     */
    where?: DestinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Destinations to fetch.
     */
    orderBy?: DestinationOrderByWithRelationInput | DestinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Destinations.
     */
    cursor?: DestinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Destinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Destinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Destinations.
     */
    distinct?: DestinationScalarFieldEnum | DestinationScalarFieldEnum[]
  }

  /**
   * Destination findFirstOrThrow
   */
  export type DestinationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destination
     */
    select?: DestinationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinationInclude<ExtArgs> | null
    /**
     * Filter, which Destination to fetch.
     */
    where?: DestinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Destinations to fetch.
     */
    orderBy?: DestinationOrderByWithRelationInput | DestinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Destinations.
     */
    cursor?: DestinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Destinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Destinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Destinations.
     */
    distinct?: DestinationScalarFieldEnum | DestinationScalarFieldEnum[]
  }

  /**
   * Destination findMany
   */
  export type DestinationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destination
     */
    select?: DestinationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinationInclude<ExtArgs> | null
    /**
     * Filter, which Destinations to fetch.
     */
    where?: DestinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Destinations to fetch.
     */
    orderBy?: DestinationOrderByWithRelationInput | DestinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Destinations.
     */
    cursor?: DestinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Destinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Destinations.
     */
    skip?: number
    distinct?: DestinationScalarFieldEnum | DestinationScalarFieldEnum[]
  }

  /**
   * Destination create
   */
  export type DestinationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destination
     */
    select?: DestinationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinationInclude<ExtArgs> | null
    /**
     * The data needed to create a Destination.
     */
    data: XOR<DestinationCreateInput, DestinationUncheckedCreateInput>
  }

  /**
   * Destination createMany
   */
  export type DestinationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Destinations.
     */
    data: DestinationCreateManyInput | DestinationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Destination createManyAndReturn
   */
  export type DestinationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destination
     */
    select?: DestinationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Destinations.
     */
    data: DestinationCreateManyInput | DestinationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Destination update
   */
  export type DestinationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destination
     */
    select?: DestinationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinationInclude<ExtArgs> | null
    /**
     * The data needed to update a Destination.
     */
    data: XOR<DestinationUpdateInput, DestinationUncheckedUpdateInput>
    /**
     * Choose, which Destination to update.
     */
    where: DestinationWhereUniqueInput
  }

  /**
   * Destination updateMany
   */
  export type DestinationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Destinations.
     */
    data: XOR<DestinationUpdateManyMutationInput, DestinationUncheckedUpdateManyInput>
    /**
     * Filter which Destinations to update
     */
    where?: DestinationWhereInput
  }

  /**
   * Destination upsert
   */
  export type DestinationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destination
     */
    select?: DestinationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinationInclude<ExtArgs> | null
    /**
     * The filter to search for the Destination to update in case it exists.
     */
    where: DestinationWhereUniqueInput
    /**
     * In case the Destination found by the `where` argument doesn't exist, create a new Destination with this data.
     */
    create: XOR<DestinationCreateInput, DestinationUncheckedCreateInput>
    /**
     * In case the Destination was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DestinationUpdateInput, DestinationUncheckedUpdateInput>
  }

  /**
   * Destination delete
   */
  export type DestinationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destination
     */
    select?: DestinationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinationInclude<ExtArgs> | null
    /**
     * Filter which Destination to delete.
     */
    where: DestinationWhereUniqueInput
  }

  /**
   * Destination deleteMany
   */
  export type DestinationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Destinations to delete
     */
    where?: DestinationWhereInput
  }

  /**
   * Destination.routing_rules
   */
  export type Destination$routing_rulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingRule
     */
    select?: RoutingRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingRuleInclude<ExtArgs> | null
    where?: RoutingRuleWhereInput
    orderBy?: RoutingRuleOrderByWithRelationInput | RoutingRuleOrderByWithRelationInput[]
    cursor?: RoutingRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoutingRuleScalarFieldEnum | RoutingRuleScalarFieldEnum[]
  }

  /**
   * Destination.deliveries
   */
  export type Destination$deliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    where?: DeliveryWhereInput
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    cursor?: DeliveryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Destination without action
   */
  export type DestinationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destination
     */
    select?: DestinationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinationInclude<ExtArgs> | null
  }


  /**
   * Model RoutingRule
   */

  export type AggregateRoutingRule = {
    _count: RoutingRuleCountAggregateOutputType | null
    _min: RoutingRuleMinAggregateOutputType | null
    _max: RoutingRuleMaxAggregateOutputType | null
  }

  export type RoutingRuleMinAggregateOutputType = {
    id: string | null
    account_id: string | null
    destination_id: string | null
    folder_path: string | null
    filename_pattern: string | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RoutingRuleMaxAggregateOutputType = {
    id: string | null
    account_id: string | null
    destination_id: string | null
    folder_path: string | null
    filename_pattern: string | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RoutingRuleCountAggregateOutputType = {
    id: number
    account_id: number
    destination_id: number
    folder_path: number
    filename_pattern: number
    active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type RoutingRuleMinAggregateInputType = {
    id?: true
    account_id?: true
    destination_id?: true
    folder_path?: true
    filename_pattern?: true
    active?: true
    created_at?: true
    updated_at?: true
  }

  export type RoutingRuleMaxAggregateInputType = {
    id?: true
    account_id?: true
    destination_id?: true
    folder_path?: true
    filename_pattern?: true
    active?: true
    created_at?: true
    updated_at?: true
  }

  export type RoutingRuleCountAggregateInputType = {
    id?: true
    account_id?: true
    destination_id?: true
    folder_path?: true
    filename_pattern?: true
    active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type RoutingRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoutingRule to aggregate.
     */
    where?: RoutingRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutingRules to fetch.
     */
    orderBy?: RoutingRuleOrderByWithRelationInput | RoutingRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoutingRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutingRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutingRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoutingRules
    **/
    _count?: true | RoutingRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoutingRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoutingRuleMaxAggregateInputType
  }

  export type GetRoutingRuleAggregateType<T extends RoutingRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateRoutingRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoutingRule[P]>
      : GetScalarType<T[P], AggregateRoutingRule[P]>
  }




  export type RoutingRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoutingRuleWhereInput
    orderBy?: RoutingRuleOrderByWithAggregationInput | RoutingRuleOrderByWithAggregationInput[]
    by: RoutingRuleScalarFieldEnum[] | RoutingRuleScalarFieldEnum
    having?: RoutingRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoutingRuleCountAggregateInputType | true
    _min?: RoutingRuleMinAggregateInputType
    _max?: RoutingRuleMaxAggregateInputType
  }

  export type RoutingRuleGroupByOutputType = {
    id: string
    account_id: string
    destination_id: string
    folder_path: string
    filename_pattern: string
    active: boolean
    created_at: Date
    updated_at: Date
    _count: RoutingRuleCountAggregateOutputType | null
    _min: RoutingRuleMinAggregateOutputType | null
    _max: RoutingRuleMaxAggregateOutputType | null
  }

  type GetRoutingRuleGroupByPayload<T extends RoutingRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoutingRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoutingRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoutingRuleGroupByOutputType[P]>
            : GetScalarType<T[P], RoutingRuleGroupByOutputType[P]>
        }
      >
    >


  export type RoutingRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    account_id?: boolean
    destination_id?: boolean
    folder_path?: boolean
    filename_pattern?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
    account?: boolean | AccountDefaultArgs<ExtArgs>
    destination?: boolean | DestinationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routingRule"]>

  export type RoutingRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    account_id?: boolean
    destination_id?: boolean
    folder_path?: boolean
    filename_pattern?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
    account?: boolean | AccountDefaultArgs<ExtArgs>
    destination?: boolean | DestinationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routingRule"]>

  export type RoutingRuleSelectScalar = {
    id?: boolean
    account_id?: boolean
    destination_id?: boolean
    folder_path?: boolean
    filename_pattern?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type RoutingRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountDefaultArgs<ExtArgs>
    destination?: boolean | DestinationDefaultArgs<ExtArgs>
  }
  export type RoutingRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountDefaultArgs<ExtArgs>
    destination?: boolean | DestinationDefaultArgs<ExtArgs>
  }

  export type $RoutingRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoutingRule"
    objects: {
      account: Prisma.$AccountPayload<ExtArgs>
      destination: Prisma.$DestinationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      account_id: string
      destination_id: string
      folder_path: string
      filename_pattern: string
      active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["routingRule"]>
    composites: {}
  }

  type RoutingRuleGetPayload<S extends boolean | null | undefined | RoutingRuleDefaultArgs> = $Result.GetResult<Prisma.$RoutingRulePayload, S>

  type RoutingRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoutingRuleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoutingRuleCountAggregateInputType | true
    }

  export interface RoutingRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoutingRule'], meta: { name: 'RoutingRule' } }
    /**
     * Find zero or one RoutingRule that matches the filter.
     * @param {RoutingRuleFindUniqueArgs} args - Arguments to find a RoutingRule
     * @example
     * // Get one RoutingRule
     * const routingRule = await prisma.routingRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoutingRuleFindUniqueArgs>(args: SelectSubset<T, RoutingRuleFindUniqueArgs<ExtArgs>>): Prisma__RoutingRuleClient<$Result.GetResult<Prisma.$RoutingRulePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RoutingRule that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoutingRuleFindUniqueOrThrowArgs} args - Arguments to find a RoutingRule
     * @example
     * // Get one RoutingRule
     * const routingRule = await prisma.routingRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoutingRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoutingRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoutingRuleClient<$Result.GetResult<Prisma.$RoutingRulePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RoutingRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingRuleFindFirstArgs} args - Arguments to find a RoutingRule
     * @example
     * // Get one RoutingRule
     * const routingRule = await prisma.routingRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoutingRuleFindFirstArgs>(args?: SelectSubset<T, RoutingRuleFindFirstArgs<ExtArgs>>): Prisma__RoutingRuleClient<$Result.GetResult<Prisma.$RoutingRulePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RoutingRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingRuleFindFirstOrThrowArgs} args - Arguments to find a RoutingRule
     * @example
     * // Get one RoutingRule
     * const routingRule = await prisma.routingRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoutingRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoutingRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoutingRuleClient<$Result.GetResult<Prisma.$RoutingRulePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RoutingRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoutingRules
     * const routingRules = await prisma.routingRule.findMany()
     * 
     * // Get first 10 RoutingRules
     * const routingRules = await prisma.routingRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const routingRuleWithIdOnly = await prisma.routingRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoutingRuleFindManyArgs>(args?: SelectSubset<T, RoutingRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutingRulePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RoutingRule.
     * @param {RoutingRuleCreateArgs} args - Arguments to create a RoutingRule.
     * @example
     * // Create one RoutingRule
     * const RoutingRule = await prisma.routingRule.create({
     *   data: {
     *     // ... data to create a RoutingRule
     *   }
     * })
     * 
     */
    create<T extends RoutingRuleCreateArgs>(args: SelectSubset<T, RoutingRuleCreateArgs<ExtArgs>>): Prisma__RoutingRuleClient<$Result.GetResult<Prisma.$RoutingRulePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RoutingRules.
     * @param {RoutingRuleCreateManyArgs} args - Arguments to create many RoutingRules.
     * @example
     * // Create many RoutingRules
     * const routingRule = await prisma.routingRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoutingRuleCreateManyArgs>(args?: SelectSubset<T, RoutingRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoutingRules and returns the data saved in the database.
     * @param {RoutingRuleCreateManyAndReturnArgs} args - Arguments to create many RoutingRules.
     * @example
     * // Create many RoutingRules
     * const routingRule = await prisma.routingRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoutingRules and only return the `id`
     * const routingRuleWithIdOnly = await prisma.routingRule.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoutingRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoutingRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutingRulePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RoutingRule.
     * @param {RoutingRuleDeleteArgs} args - Arguments to delete one RoutingRule.
     * @example
     * // Delete one RoutingRule
     * const RoutingRule = await prisma.routingRule.delete({
     *   where: {
     *     // ... filter to delete one RoutingRule
     *   }
     * })
     * 
     */
    delete<T extends RoutingRuleDeleteArgs>(args: SelectSubset<T, RoutingRuleDeleteArgs<ExtArgs>>): Prisma__RoutingRuleClient<$Result.GetResult<Prisma.$RoutingRulePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RoutingRule.
     * @param {RoutingRuleUpdateArgs} args - Arguments to update one RoutingRule.
     * @example
     * // Update one RoutingRule
     * const routingRule = await prisma.routingRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoutingRuleUpdateArgs>(args: SelectSubset<T, RoutingRuleUpdateArgs<ExtArgs>>): Prisma__RoutingRuleClient<$Result.GetResult<Prisma.$RoutingRulePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RoutingRules.
     * @param {RoutingRuleDeleteManyArgs} args - Arguments to filter RoutingRules to delete.
     * @example
     * // Delete a few RoutingRules
     * const { count } = await prisma.routingRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoutingRuleDeleteManyArgs>(args?: SelectSubset<T, RoutingRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoutingRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoutingRules
     * const routingRule = await prisma.routingRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoutingRuleUpdateManyArgs>(args: SelectSubset<T, RoutingRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoutingRule.
     * @param {RoutingRuleUpsertArgs} args - Arguments to update or create a RoutingRule.
     * @example
     * // Update or create a RoutingRule
     * const routingRule = await prisma.routingRule.upsert({
     *   create: {
     *     // ... data to create a RoutingRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoutingRule we want to update
     *   }
     * })
     */
    upsert<T extends RoutingRuleUpsertArgs>(args: SelectSubset<T, RoutingRuleUpsertArgs<ExtArgs>>): Prisma__RoutingRuleClient<$Result.GetResult<Prisma.$RoutingRulePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RoutingRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingRuleCountArgs} args - Arguments to filter RoutingRules to count.
     * @example
     * // Count the number of RoutingRules
     * const count = await prisma.routingRule.count({
     *   where: {
     *     // ... the filter for the RoutingRules we want to count
     *   }
     * })
    **/
    count<T extends RoutingRuleCountArgs>(
      args?: Subset<T, RoutingRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoutingRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoutingRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoutingRuleAggregateArgs>(args: Subset<T, RoutingRuleAggregateArgs>): Prisma.PrismaPromise<GetRoutingRuleAggregateType<T>>

    /**
     * Group by RoutingRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoutingRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoutingRuleGroupByArgs['orderBy'] }
        : { orderBy?: RoutingRuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoutingRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoutingRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoutingRule model
   */
  readonly fields: RoutingRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoutingRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoutingRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    destination<T extends DestinationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DestinationDefaultArgs<ExtArgs>>): Prisma__DestinationClient<$Result.GetResult<Prisma.$DestinationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoutingRule model
   */ 
  interface RoutingRuleFieldRefs {
    readonly id: FieldRef<"RoutingRule", 'String'>
    readonly account_id: FieldRef<"RoutingRule", 'String'>
    readonly destination_id: FieldRef<"RoutingRule", 'String'>
    readonly folder_path: FieldRef<"RoutingRule", 'String'>
    readonly filename_pattern: FieldRef<"RoutingRule", 'String'>
    readonly active: FieldRef<"RoutingRule", 'Boolean'>
    readonly created_at: FieldRef<"RoutingRule", 'DateTime'>
    readonly updated_at: FieldRef<"RoutingRule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoutingRule findUnique
   */
  export type RoutingRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingRule
     */
    select?: RoutingRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingRuleInclude<ExtArgs> | null
    /**
     * Filter, which RoutingRule to fetch.
     */
    where: RoutingRuleWhereUniqueInput
  }

  /**
   * RoutingRule findUniqueOrThrow
   */
  export type RoutingRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingRule
     */
    select?: RoutingRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingRuleInclude<ExtArgs> | null
    /**
     * Filter, which RoutingRule to fetch.
     */
    where: RoutingRuleWhereUniqueInput
  }

  /**
   * RoutingRule findFirst
   */
  export type RoutingRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingRule
     */
    select?: RoutingRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingRuleInclude<ExtArgs> | null
    /**
     * Filter, which RoutingRule to fetch.
     */
    where?: RoutingRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutingRules to fetch.
     */
    orderBy?: RoutingRuleOrderByWithRelationInput | RoutingRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoutingRules.
     */
    cursor?: RoutingRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutingRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutingRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoutingRules.
     */
    distinct?: RoutingRuleScalarFieldEnum | RoutingRuleScalarFieldEnum[]
  }

  /**
   * RoutingRule findFirstOrThrow
   */
  export type RoutingRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingRule
     */
    select?: RoutingRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingRuleInclude<ExtArgs> | null
    /**
     * Filter, which RoutingRule to fetch.
     */
    where?: RoutingRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutingRules to fetch.
     */
    orderBy?: RoutingRuleOrderByWithRelationInput | RoutingRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoutingRules.
     */
    cursor?: RoutingRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutingRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutingRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoutingRules.
     */
    distinct?: RoutingRuleScalarFieldEnum | RoutingRuleScalarFieldEnum[]
  }

  /**
   * RoutingRule findMany
   */
  export type RoutingRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingRule
     */
    select?: RoutingRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingRuleInclude<ExtArgs> | null
    /**
     * Filter, which RoutingRules to fetch.
     */
    where?: RoutingRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutingRules to fetch.
     */
    orderBy?: RoutingRuleOrderByWithRelationInput | RoutingRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoutingRules.
     */
    cursor?: RoutingRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutingRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutingRules.
     */
    skip?: number
    distinct?: RoutingRuleScalarFieldEnum | RoutingRuleScalarFieldEnum[]
  }

  /**
   * RoutingRule create
   */
  export type RoutingRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingRule
     */
    select?: RoutingRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a RoutingRule.
     */
    data: XOR<RoutingRuleCreateInput, RoutingRuleUncheckedCreateInput>
  }

  /**
   * RoutingRule createMany
   */
  export type RoutingRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoutingRules.
     */
    data: RoutingRuleCreateManyInput | RoutingRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoutingRule createManyAndReturn
   */
  export type RoutingRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingRule
     */
    select?: RoutingRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RoutingRules.
     */
    data: RoutingRuleCreateManyInput | RoutingRuleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingRuleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoutingRule update
   */
  export type RoutingRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingRule
     */
    select?: RoutingRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a RoutingRule.
     */
    data: XOR<RoutingRuleUpdateInput, RoutingRuleUncheckedUpdateInput>
    /**
     * Choose, which RoutingRule to update.
     */
    where: RoutingRuleWhereUniqueInput
  }

  /**
   * RoutingRule updateMany
   */
  export type RoutingRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoutingRules.
     */
    data: XOR<RoutingRuleUpdateManyMutationInput, RoutingRuleUncheckedUpdateManyInput>
    /**
     * Filter which RoutingRules to update
     */
    where?: RoutingRuleWhereInput
  }

  /**
   * RoutingRule upsert
   */
  export type RoutingRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingRule
     */
    select?: RoutingRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the RoutingRule to update in case it exists.
     */
    where: RoutingRuleWhereUniqueInput
    /**
     * In case the RoutingRule found by the `where` argument doesn't exist, create a new RoutingRule with this data.
     */
    create: XOR<RoutingRuleCreateInput, RoutingRuleUncheckedCreateInput>
    /**
     * In case the RoutingRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoutingRuleUpdateInput, RoutingRuleUncheckedUpdateInput>
  }

  /**
   * RoutingRule delete
   */
  export type RoutingRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingRule
     */
    select?: RoutingRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingRuleInclude<ExtArgs> | null
    /**
     * Filter which RoutingRule to delete.
     */
    where: RoutingRuleWhereUniqueInput
  }

  /**
   * RoutingRule deleteMany
   */
  export type RoutingRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoutingRules to delete
     */
    where?: RoutingRuleWhereInput
  }

  /**
   * RoutingRule without action
   */
  export type RoutingRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingRule
     */
    select?: RoutingRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingRuleInclude<ExtArgs> | null
  }


  /**
   * Model Delivery
   */

  export type AggregateDelivery = {
    _count: DeliveryCountAggregateOutputType | null
    _avg: DeliveryAvgAggregateOutputType | null
    _sum: DeliverySumAggregateOutputType | null
    _min: DeliveryMinAggregateOutputType | null
    _max: DeliveryMaxAggregateOutputType | null
  }

  export type DeliveryAvgAggregateOutputType = {
    attempts: number | null
  }

  export type DeliverySumAggregateOutputType = {
    attempts: number | null
  }

  export type DeliveryMinAggregateOutputType = {
    id: string | null
    statement_id: string | null
    destination_id: string | null
    status: string | null
    path: string | null
    delivered_at: Date | null
    attempts: number | null
    last_error: string | null
    request_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DeliveryMaxAggregateOutputType = {
    id: string | null
    statement_id: string | null
    destination_id: string | null
    status: string | null
    path: string | null
    delivered_at: Date | null
    attempts: number | null
    last_error: string | null
    request_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DeliveryCountAggregateOutputType = {
    id: number
    statement_id: number
    destination_id: number
    status: number
    path: number
    delivered_at: number
    attempts: number
    last_error: number
    request_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type DeliveryAvgAggregateInputType = {
    attempts?: true
  }

  export type DeliverySumAggregateInputType = {
    attempts?: true
  }

  export type DeliveryMinAggregateInputType = {
    id?: true
    statement_id?: true
    destination_id?: true
    status?: true
    path?: true
    delivered_at?: true
    attempts?: true
    last_error?: true
    request_id?: true
    created_at?: true
    updated_at?: true
  }

  export type DeliveryMaxAggregateInputType = {
    id?: true
    statement_id?: true
    destination_id?: true
    status?: true
    path?: true
    delivered_at?: true
    attempts?: true
    last_error?: true
    request_id?: true
    created_at?: true
    updated_at?: true
  }

  export type DeliveryCountAggregateInputType = {
    id?: true
    statement_id?: true
    destination_id?: true
    status?: true
    path?: true
    delivered_at?: true
    attempts?: true
    last_error?: true
    request_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type DeliveryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Delivery to aggregate.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Deliveries
    **/
    _count?: true | DeliveryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeliveryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeliverySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeliveryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeliveryMaxAggregateInputType
  }

  export type GetDeliveryAggregateType<T extends DeliveryAggregateArgs> = {
        [P in keyof T & keyof AggregateDelivery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDelivery[P]>
      : GetScalarType<T[P], AggregateDelivery[P]>
  }




  export type DeliveryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryWhereInput
    orderBy?: DeliveryOrderByWithAggregationInput | DeliveryOrderByWithAggregationInput[]
    by: DeliveryScalarFieldEnum[] | DeliveryScalarFieldEnum
    having?: DeliveryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeliveryCountAggregateInputType | true
    _avg?: DeliveryAvgAggregateInputType
    _sum?: DeliverySumAggregateInputType
    _min?: DeliveryMinAggregateInputType
    _max?: DeliveryMaxAggregateInputType
  }

  export type DeliveryGroupByOutputType = {
    id: string
    statement_id: string
    destination_id: string
    status: string
    path: string | null
    delivered_at: Date | null
    attempts: number
    last_error: string | null
    request_id: string
    created_at: Date
    updated_at: Date
    _count: DeliveryCountAggregateOutputType | null
    _avg: DeliveryAvgAggregateOutputType | null
    _sum: DeliverySumAggregateOutputType | null
    _min: DeliveryMinAggregateOutputType | null
    _max: DeliveryMaxAggregateOutputType | null
  }

  type GetDeliveryGroupByPayload<T extends DeliveryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeliveryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeliveryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeliveryGroupByOutputType[P]>
            : GetScalarType<T[P], DeliveryGroupByOutputType[P]>
        }
      >
    >


  export type DeliverySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    statement_id?: boolean
    destination_id?: boolean
    status?: boolean
    path?: boolean
    delivered_at?: boolean
    attempts?: boolean
    last_error?: boolean
    request_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    statement?: boolean | StatementDefaultArgs<ExtArgs>
    destination?: boolean | DestinationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["delivery"]>

  export type DeliverySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    statement_id?: boolean
    destination_id?: boolean
    status?: boolean
    path?: boolean
    delivered_at?: boolean
    attempts?: boolean
    last_error?: boolean
    request_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    statement?: boolean | StatementDefaultArgs<ExtArgs>
    destination?: boolean | DestinationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["delivery"]>

  export type DeliverySelectScalar = {
    id?: boolean
    statement_id?: boolean
    destination_id?: boolean
    status?: boolean
    path?: boolean
    delivered_at?: boolean
    attempts?: boolean
    last_error?: boolean
    request_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type DeliveryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statement?: boolean | StatementDefaultArgs<ExtArgs>
    destination?: boolean | DestinationDefaultArgs<ExtArgs>
  }
  export type DeliveryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statement?: boolean | StatementDefaultArgs<ExtArgs>
    destination?: boolean | DestinationDefaultArgs<ExtArgs>
  }

  export type $DeliveryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Delivery"
    objects: {
      statement: Prisma.$StatementPayload<ExtArgs>
      destination: Prisma.$DestinationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      statement_id: string
      destination_id: string
      status: string
      path: string | null
      delivered_at: Date | null
      attempts: number
      last_error: string | null
      request_id: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["delivery"]>
    composites: {}
  }

  type DeliveryGetPayload<S extends boolean | null | undefined | DeliveryDefaultArgs> = $Result.GetResult<Prisma.$DeliveryPayload, S>

  type DeliveryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DeliveryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DeliveryCountAggregateInputType | true
    }

  export interface DeliveryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Delivery'], meta: { name: 'Delivery' } }
    /**
     * Find zero or one Delivery that matches the filter.
     * @param {DeliveryFindUniqueArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeliveryFindUniqueArgs>(args: SelectSubset<T, DeliveryFindUniqueArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Delivery that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DeliveryFindUniqueOrThrowArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeliveryFindUniqueOrThrowArgs>(args: SelectSubset<T, DeliveryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Delivery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryFindFirstArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeliveryFindFirstArgs>(args?: SelectSubset<T, DeliveryFindFirstArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Delivery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryFindFirstOrThrowArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeliveryFindFirstOrThrowArgs>(args?: SelectSubset<T, DeliveryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Deliveries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Deliveries
     * const deliveries = await prisma.delivery.findMany()
     * 
     * // Get first 10 Deliveries
     * const deliveries = await prisma.delivery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deliveryWithIdOnly = await prisma.delivery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeliveryFindManyArgs>(args?: SelectSubset<T, DeliveryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Delivery.
     * @param {DeliveryCreateArgs} args - Arguments to create a Delivery.
     * @example
     * // Create one Delivery
     * const Delivery = await prisma.delivery.create({
     *   data: {
     *     // ... data to create a Delivery
     *   }
     * })
     * 
     */
    create<T extends DeliveryCreateArgs>(args: SelectSubset<T, DeliveryCreateArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Deliveries.
     * @param {DeliveryCreateManyArgs} args - Arguments to create many Deliveries.
     * @example
     * // Create many Deliveries
     * const delivery = await prisma.delivery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeliveryCreateManyArgs>(args?: SelectSubset<T, DeliveryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Deliveries and returns the data saved in the database.
     * @param {DeliveryCreateManyAndReturnArgs} args - Arguments to create many Deliveries.
     * @example
     * // Create many Deliveries
     * const delivery = await prisma.delivery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Deliveries and only return the `id`
     * const deliveryWithIdOnly = await prisma.delivery.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeliveryCreateManyAndReturnArgs>(args?: SelectSubset<T, DeliveryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Delivery.
     * @param {DeliveryDeleteArgs} args - Arguments to delete one Delivery.
     * @example
     * // Delete one Delivery
     * const Delivery = await prisma.delivery.delete({
     *   where: {
     *     // ... filter to delete one Delivery
     *   }
     * })
     * 
     */
    delete<T extends DeliveryDeleteArgs>(args: SelectSubset<T, DeliveryDeleteArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Delivery.
     * @param {DeliveryUpdateArgs} args - Arguments to update one Delivery.
     * @example
     * // Update one Delivery
     * const delivery = await prisma.delivery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeliveryUpdateArgs>(args: SelectSubset<T, DeliveryUpdateArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Deliveries.
     * @param {DeliveryDeleteManyArgs} args - Arguments to filter Deliveries to delete.
     * @example
     * // Delete a few Deliveries
     * const { count } = await prisma.delivery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeliveryDeleteManyArgs>(args?: SelectSubset<T, DeliveryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Deliveries
     * const delivery = await prisma.delivery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeliveryUpdateManyArgs>(args: SelectSubset<T, DeliveryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Delivery.
     * @param {DeliveryUpsertArgs} args - Arguments to update or create a Delivery.
     * @example
     * // Update or create a Delivery
     * const delivery = await prisma.delivery.upsert({
     *   create: {
     *     // ... data to create a Delivery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Delivery we want to update
     *   }
     * })
     */
    upsert<T extends DeliveryUpsertArgs>(args: SelectSubset<T, DeliveryUpsertArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Deliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryCountArgs} args - Arguments to filter Deliveries to count.
     * @example
     * // Count the number of Deliveries
     * const count = await prisma.delivery.count({
     *   where: {
     *     // ... the filter for the Deliveries we want to count
     *   }
     * })
    **/
    count<T extends DeliveryCountArgs>(
      args?: Subset<T, DeliveryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeliveryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Delivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeliveryAggregateArgs>(args: Subset<T, DeliveryAggregateArgs>): Prisma.PrismaPromise<GetDeliveryAggregateType<T>>

    /**
     * Group by Delivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeliveryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeliveryGroupByArgs['orderBy'] }
        : { orderBy?: DeliveryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeliveryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliveryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Delivery model
   */
  readonly fields: DeliveryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Delivery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeliveryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    statement<T extends StatementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StatementDefaultArgs<ExtArgs>>): Prisma__StatementClient<$Result.GetResult<Prisma.$StatementPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    destination<T extends DestinationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DestinationDefaultArgs<ExtArgs>>): Prisma__DestinationClient<$Result.GetResult<Prisma.$DestinationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Delivery model
   */ 
  interface DeliveryFieldRefs {
    readonly id: FieldRef<"Delivery", 'String'>
    readonly statement_id: FieldRef<"Delivery", 'String'>
    readonly destination_id: FieldRef<"Delivery", 'String'>
    readonly status: FieldRef<"Delivery", 'String'>
    readonly path: FieldRef<"Delivery", 'String'>
    readonly delivered_at: FieldRef<"Delivery", 'DateTime'>
    readonly attempts: FieldRef<"Delivery", 'Int'>
    readonly last_error: FieldRef<"Delivery", 'String'>
    readonly request_id: FieldRef<"Delivery", 'String'>
    readonly created_at: FieldRef<"Delivery", 'DateTime'>
    readonly updated_at: FieldRef<"Delivery", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Delivery findUnique
   */
  export type DeliveryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery findUniqueOrThrow
   */
  export type DeliveryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery findFirst
   */
  export type DeliveryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deliveries.
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deliveries.
     */
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Delivery findFirstOrThrow
   */
  export type DeliveryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deliveries.
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deliveries.
     */
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Delivery findMany
   */
  export type DeliveryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Deliveries to fetch.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Deliveries.
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Delivery create
   */
  export type DeliveryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * The data needed to create a Delivery.
     */
    data: XOR<DeliveryCreateInput, DeliveryUncheckedCreateInput>
  }

  /**
   * Delivery createMany
   */
  export type DeliveryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Deliveries.
     */
    data: DeliveryCreateManyInput | DeliveryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Delivery createManyAndReturn
   */
  export type DeliveryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Deliveries.
     */
    data: DeliveryCreateManyInput | DeliveryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Delivery update
   */
  export type DeliveryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * The data needed to update a Delivery.
     */
    data: XOR<DeliveryUpdateInput, DeliveryUncheckedUpdateInput>
    /**
     * Choose, which Delivery to update.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery updateMany
   */
  export type DeliveryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Deliveries.
     */
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyInput>
    /**
     * Filter which Deliveries to update
     */
    where?: DeliveryWhereInput
  }

  /**
   * Delivery upsert
   */
  export type DeliveryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * The filter to search for the Delivery to update in case it exists.
     */
    where: DeliveryWhereUniqueInput
    /**
     * In case the Delivery found by the `where` argument doesn't exist, create a new Delivery with this data.
     */
    create: XOR<DeliveryCreateInput, DeliveryUncheckedCreateInput>
    /**
     * In case the Delivery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeliveryUpdateInput, DeliveryUncheckedUpdateInput>
  }

  /**
   * Delivery delete
   */
  export type DeliveryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter which Delivery to delete.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery deleteMany
   */
  export type DeliveryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deliveries to delete
     */
    where?: DeliveryWhereInput
  }

  /**
   * Delivery without action
   */
  export type DeliveryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
  }


  /**
   * Model WebhookEndpoint
   */

  export type AggregateWebhookEndpoint = {
    _count: WebhookEndpointCountAggregateOutputType | null
    _min: WebhookEndpointMinAggregateOutputType | null
    _max: WebhookEndpointMaxAggregateOutputType | null
  }

  export type WebhookEndpointMinAggregateOutputType = {
    id: string | null
    org_id: string | null
    url: string | null
    secret_ref: string | null
    active: boolean | null
    last_success_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WebhookEndpointMaxAggregateOutputType = {
    id: string | null
    org_id: string | null
    url: string | null
    secret_ref: string | null
    active: boolean | null
    last_success_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WebhookEndpointCountAggregateOutputType = {
    id: number
    org_id: number
    url: number
    secret_ref: number
    active: number
    last_success_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type WebhookEndpointMinAggregateInputType = {
    id?: true
    org_id?: true
    url?: true
    secret_ref?: true
    active?: true
    last_success_at?: true
    created_at?: true
    updated_at?: true
  }

  export type WebhookEndpointMaxAggregateInputType = {
    id?: true
    org_id?: true
    url?: true
    secret_ref?: true
    active?: true
    last_success_at?: true
    created_at?: true
    updated_at?: true
  }

  export type WebhookEndpointCountAggregateInputType = {
    id?: true
    org_id?: true
    url?: true
    secret_ref?: true
    active?: true
    last_success_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type WebhookEndpointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEndpoint to aggregate.
     */
    where?: WebhookEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEndpoints to fetch.
     */
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEndpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookEndpoints
    **/
    _count?: true | WebhookEndpointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookEndpointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookEndpointMaxAggregateInputType
  }

  export type GetWebhookEndpointAggregateType<T extends WebhookEndpointAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookEndpoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookEndpoint[P]>
      : GetScalarType<T[P], AggregateWebhookEndpoint[P]>
  }




  export type WebhookEndpointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookEndpointWhereInput
    orderBy?: WebhookEndpointOrderByWithAggregationInput | WebhookEndpointOrderByWithAggregationInput[]
    by: WebhookEndpointScalarFieldEnum[] | WebhookEndpointScalarFieldEnum
    having?: WebhookEndpointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookEndpointCountAggregateInputType | true
    _min?: WebhookEndpointMinAggregateInputType
    _max?: WebhookEndpointMaxAggregateInputType
  }

  export type WebhookEndpointGroupByOutputType = {
    id: string
    org_id: string
    url: string
    secret_ref: string
    active: boolean
    last_success_at: Date | null
    created_at: Date
    updated_at: Date
    _count: WebhookEndpointCountAggregateOutputType | null
    _min: WebhookEndpointMinAggregateOutputType | null
    _max: WebhookEndpointMaxAggregateOutputType | null
  }

  type GetWebhookEndpointGroupByPayload<T extends WebhookEndpointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookEndpointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookEndpointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookEndpointGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookEndpointGroupByOutputType[P]>
        }
      >
    >


  export type WebhookEndpointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    url?: boolean
    secret_ref?: boolean
    active?: boolean
    last_success_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookEndpoint"]>

  export type WebhookEndpointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    url?: boolean
    secret_ref?: boolean
    active?: boolean
    last_success_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookEndpoint"]>

  export type WebhookEndpointSelectScalar = {
    id?: boolean
    org_id?: boolean
    url?: boolean
    secret_ref?: boolean
    active?: boolean
    last_success_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type WebhookEndpointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type WebhookEndpointIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $WebhookEndpointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookEndpoint"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      org_id: string
      url: string
      secret_ref: string
      active: boolean
      last_success_at: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["webhookEndpoint"]>
    composites: {}
  }

  type WebhookEndpointGetPayload<S extends boolean | null | undefined | WebhookEndpointDefaultArgs> = $Result.GetResult<Prisma.$WebhookEndpointPayload, S>

  type WebhookEndpointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WebhookEndpointFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WebhookEndpointCountAggregateInputType | true
    }

  export interface WebhookEndpointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookEndpoint'], meta: { name: 'WebhookEndpoint' } }
    /**
     * Find zero or one WebhookEndpoint that matches the filter.
     * @param {WebhookEndpointFindUniqueArgs} args - Arguments to find a WebhookEndpoint
     * @example
     * // Get one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookEndpointFindUniqueArgs>(args: SelectSubset<T, WebhookEndpointFindUniqueArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WebhookEndpoint that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WebhookEndpointFindUniqueOrThrowArgs} args - Arguments to find a WebhookEndpoint
     * @example
     * // Get one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookEndpointFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookEndpointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WebhookEndpoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointFindFirstArgs} args - Arguments to find a WebhookEndpoint
     * @example
     * // Get one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookEndpointFindFirstArgs>(args?: SelectSubset<T, WebhookEndpointFindFirstArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WebhookEndpoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointFindFirstOrThrowArgs} args - Arguments to find a WebhookEndpoint
     * @example
     * // Get one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookEndpointFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookEndpointFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WebhookEndpoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookEndpoints
     * const webhookEndpoints = await prisma.webhookEndpoint.findMany()
     * 
     * // Get first 10 WebhookEndpoints
     * const webhookEndpoints = await prisma.webhookEndpoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookEndpointWithIdOnly = await prisma.webhookEndpoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookEndpointFindManyArgs>(args?: SelectSubset<T, WebhookEndpointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WebhookEndpoint.
     * @param {WebhookEndpointCreateArgs} args - Arguments to create a WebhookEndpoint.
     * @example
     * // Create one WebhookEndpoint
     * const WebhookEndpoint = await prisma.webhookEndpoint.create({
     *   data: {
     *     // ... data to create a WebhookEndpoint
     *   }
     * })
     * 
     */
    create<T extends WebhookEndpointCreateArgs>(args: SelectSubset<T, WebhookEndpointCreateArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WebhookEndpoints.
     * @param {WebhookEndpointCreateManyArgs} args - Arguments to create many WebhookEndpoints.
     * @example
     * // Create many WebhookEndpoints
     * const webhookEndpoint = await prisma.webhookEndpoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookEndpointCreateManyArgs>(args?: SelectSubset<T, WebhookEndpointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookEndpoints and returns the data saved in the database.
     * @param {WebhookEndpointCreateManyAndReturnArgs} args - Arguments to create many WebhookEndpoints.
     * @example
     * // Create many WebhookEndpoints
     * const webhookEndpoint = await prisma.webhookEndpoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookEndpoints and only return the `id`
     * const webhookEndpointWithIdOnly = await prisma.webhookEndpoint.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookEndpointCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookEndpointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WebhookEndpoint.
     * @param {WebhookEndpointDeleteArgs} args - Arguments to delete one WebhookEndpoint.
     * @example
     * // Delete one WebhookEndpoint
     * const WebhookEndpoint = await prisma.webhookEndpoint.delete({
     *   where: {
     *     // ... filter to delete one WebhookEndpoint
     *   }
     * })
     * 
     */
    delete<T extends WebhookEndpointDeleteArgs>(args: SelectSubset<T, WebhookEndpointDeleteArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WebhookEndpoint.
     * @param {WebhookEndpointUpdateArgs} args - Arguments to update one WebhookEndpoint.
     * @example
     * // Update one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookEndpointUpdateArgs>(args: SelectSubset<T, WebhookEndpointUpdateArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WebhookEndpoints.
     * @param {WebhookEndpointDeleteManyArgs} args - Arguments to filter WebhookEndpoints to delete.
     * @example
     * // Delete a few WebhookEndpoints
     * const { count } = await prisma.webhookEndpoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookEndpointDeleteManyArgs>(args?: SelectSubset<T, WebhookEndpointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEndpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookEndpoints
     * const webhookEndpoint = await prisma.webhookEndpoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookEndpointUpdateManyArgs>(args: SelectSubset<T, WebhookEndpointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WebhookEndpoint.
     * @param {WebhookEndpointUpsertArgs} args - Arguments to update or create a WebhookEndpoint.
     * @example
     * // Update or create a WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.upsert({
     *   create: {
     *     // ... data to create a WebhookEndpoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookEndpoint we want to update
     *   }
     * })
     */
    upsert<T extends WebhookEndpointUpsertArgs>(args: SelectSubset<T, WebhookEndpointUpsertArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WebhookEndpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointCountArgs} args - Arguments to filter WebhookEndpoints to count.
     * @example
     * // Count the number of WebhookEndpoints
     * const count = await prisma.webhookEndpoint.count({
     *   where: {
     *     // ... the filter for the WebhookEndpoints we want to count
     *   }
     * })
    **/
    count<T extends WebhookEndpointCountArgs>(
      args?: Subset<T, WebhookEndpointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookEndpointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookEndpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebhookEndpointAggregateArgs>(args: Subset<T, WebhookEndpointAggregateArgs>): Prisma.PrismaPromise<GetWebhookEndpointAggregateType<T>>

    /**
     * Group by WebhookEndpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebhookEndpointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookEndpointGroupByArgs['orderBy'] }
        : { orderBy?: WebhookEndpointGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebhookEndpointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookEndpointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookEndpoint model
   */
  readonly fields: WebhookEndpointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookEndpoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookEndpointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebhookEndpoint model
   */ 
  interface WebhookEndpointFieldRefs {
    readonly id: FieldRef<"WebhookEndpoint", 'String'>
    readonly org_id: FieldRef<"WebhookEndpoint", 'String'>
    readonly url: FieldRef<"WebhookEndpoint", 'String'>
    readonly secret_ref: FieldRef<"WebhookEndpoint", 'String'>
    readonly active: FieldRef<"WebhookEndpoint", 'Boolean'>
    readonly last_success_at: FieldRef<"WebhookEndpoint", 'DateTime'>
    readonly created_at: FieldRef<"WebhookEndpoint", 'DateTime'>
    readonly updated_at: FieldRef<"WebhookEndpoint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebhookEndpoint findUnique
   */
  export type WebhookEndpointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoint to fetch.
     */
    where: WebhookEndpointWhereUniqueInput
  }

  /**
   * WebhookEndpoint findUniqueOrThrow
   */
  export type WebhookEndpointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoint to fetch.
     */
    where: WebhookEndpointWhereUniqueInput
  }

  /**
   * WebhookEndpoint findFirst
   */
  export type WebhookEndpointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoint to fetch.
     */
    where?: WebhookEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEndpoints to fetch.
     */
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEndpoints.
     */
    cursor?: WebhookEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEndpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEndpoints.
     */
    distinct?: WebhookEndpointScalarFieldEnum | WebhookEndpointScalarFieldEnum[]
  }

  /**
   * WebhookEndpoint findFirstOrThrow
   */
  export type WebhookEndpointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoint to fetch.
     */
    where?: WebhookEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEndpoints to fetch.
     */
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEndpoints.
     */
    cursor?: WebhookEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEndpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEndpoints.
     */
    distinct?: WebhookEndpointScalarFieldEnum | WebhookEndpointScalarFieldEnum[]
  }

  /**
   * WebhookEndpoint findMany
   */
  export type WebhookEndpointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoints to fetch.
     */
    where?: WebhookEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEndpoints to fetch.
     */
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookEndpoints.
     */
    cursor?: WebhookEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEndpoints.
     */
    skip?: number
    distinct?: WebhookEndpointScalarFieldEnum | WebhookEndpointScalarFieldEnum[]
  }

  /**
   * WebhookEndpoint create
   */
  export type WebhookEndpointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * The data needed to create a WebhookEndpoint.
     */
    data: XOR<WebhookEndpointCreateInput, WebhookEndpointUncheckedCreateInput>
  }

  /**
   * WebhookEndpoint createMany
   */
  export type WebhookEndpointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookEndpoints.
     */
    data: WebhookEndpointCreateManyInput | WebhookEndpointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookEndpoint createManyAndReturn
   */
  export type WebhookEndpointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WebhookEndpoints.
     */
    data: WebhookEndpointCreateManyInput | WebhookEndpointCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookEndpoint update
   */
  export type WebhookEndpointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * The data needed to update a WebhookEndpoint.
     */
    data: XOR<WebhookEndpointUpdateInput, WebhookEndpointUncheckedUpdateInput>
    /**
     * Choose, which WebhookEndpoint to update.
     */
    where: WebhookEndpointWhereUniqueInput
  }

  /**
   * WebhookEndpoint updateMany
   */
  export type WebhookEndpointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookEndpoints.
     */
    data: XOR<WebhookEndpointUpdateManyMutationInput, WebhookEndpointUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEndpoints to update
     */
    where?: WebhookEndpointWhereInput
  }

  /**
   * WebhookEndpoint upsert
   */
  export type WebhookEndpointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * The filter to search for the WebhookEndpoint to update in case it exists.
     */
    where: WebhookEndpointWhereUniqueInput
    /**
     * In case the WebhookEndpoint found by the `where` argument doesn't exist, create a new WebhookEndpoint with this data.
     */
    create: XOR<WebhookEndpointCreateInput, WebhookEndpointUncheckedCreateInput>
    /**
     * In case the WebhookEndpoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookEndpointUpdateInput, WebhookEndpointUncheckedUpdateInput>
  }

  /**
   * WebhookEndpoint delete
   */
  export type WebhookEndpointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * Filter which WebhookEndpoint to delete.
     */
    where: WebhookEndpointWhereUniqueInput
  }

  /**
   * WebhookEndpoint deleteMany
   */
  export type WebhookEndpointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEndpoints to delete
     */
    where?: WebhookEndpointWhereInput
  }

  /**
   * WebhookEndpoint without action
   */
  export type WebhookEndpointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
  }


  /**
   * Model OAuthToken
   */

  export type AggregateOAuthToken = {
    _count: OAuthTokenCountAggregateOutputType | null
    _min: OAuthTokenMinAggregateOutputType | null
    _max: OAuthTokenMaxAggregateOutputType | null
  }

  export type OAuthTokenMinAggregateOutputType = {
    id: string | null
    org_id: string | null
    user_id: string | null
    provider: string | null
    expires_at: Date | null
    enc_payload: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OAuthTokenMaxAggregateOutputType = {
    id: string | null
    org_id: string | null
    user_id: string | null
    provider: string | null
    expires_at: Date | null
    enc_payload: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OAuthTokenCountAggregateOutputType = {
    id: number
    org_id: number
    user_id: number
    provider: number
    scopes: number
    expires_at: number
    enc_payload: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type OAuthTokenMinAggregateInputType = {
    id?: true
    org_id?: true
    user_id?: true
    provider?: true
    expires_at?: true
    enc_payload?: true
    created_at?: true
    updated_at?: true
  }

  export type OAuthTokenMaxAggregateInputType = {
    id?: true
    org_id?: true
    user_id?: true
    provider?: true
    expires_at?: true
    enc_payload?: true
    created_at?: true
    updated_at?: true
  }

  export type OAuthTokenCountAggregateInputType = {
    id?: true
    org_id?: true
    user_id?: true
    provider?: true
    scopes?: true
    expires_at?: true
    enc_payload?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type OAuthTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthToken to aggregate.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthTokens
    **/
    _count?: true | OAuthTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthTokenMaxAggregateInputType
  }

  export type GetOAuthTokenAggregateType<T extends OAuthTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthToken[P]>
      : GetScalarType<T[P], AggregateOAuthToken[P]>
  }




  export type OAuthTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthTokenWhereInput
    orderBy?: OAuthTokenOrderByWithAggregationInput | OAuthTokenOrderByWithAggregationInput[]
    by: OAuthTokenScalarFieldEnum[] | OAuthTokenScalarFieldEnum
    having?: OAuthTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthTokenCountAggregateInputType | true
    _min?: OAuthTokenMinAggregateInputType
    _max?: OAuthTokenMaxAggregateInputType
  }

  export type OAuthTokenGroupByOutputType = {
    id: string
    org_id: string | null
    user_id: string | null
    provider: string
    scopes: string[]
    expires_at: Date | null
    enc_payload: string
    created_at: Date
    updated_at: Date
    _count: OAuthTokenCountAggregateOutputType | null
    _min: OAuthTokenMinAggregateOutputType | null
    _max: OAuthTokenMaxAggregateOutputType | null
  }

  type GetOAuthTokenGroupByPayload<T extends OAuthTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthTokenGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthTokenGroupByOutputType[P]>
        }
      >
    >


  export type OAuthTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    user_id?: boolean
    provider?: boolean
    scopes?: boolean
    expires_at?: boolean
    enc_payload?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | OAuthToken$organizationArgs<ExtArgs>
    user?: boolean | OAuthToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    user_id?: boolean
    provider?: boolean
    scopes?: boolean
    expires_at?: boolean
    enc_payload?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | OAuthToken$organizationArgs<ExtArgs>
    user?: boolean | OAuthToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectScalar = {
    id?: boolean
    org_id?: boolean
    user_id?: boolean
    provider?: boolean
    scopes?: boolean
    expires_at?: boolean
    enc_payload?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type OAuthTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OAuthToken$organizationArgs<ExtArgs>
    user?: boolean | OAuthToken$userArgs<ExtArgs>
  }
  export type OAuthTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OAuthToken$organizationArgs<ExtArgs>
    user?: boolean | OAuthToken$userArgs<ExtArgs>
  }

  export type $OAuthTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthToken"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      org_id: string | null
      user_id: string | null
      provider: string
      scopes: string[]
      expires_at: Date | null
      enc_payload: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["oAuthToken"]>
    composites: {}
  }

  type OAuthTokenGetPayload<S extends boolean | null | undefined | OAuthTokenDefaultArgs> = $Result.GetResult<Prisma.$OAuthTokenPayload, S>

  type OAuthTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OAuthTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OAuthTokenCountAggregateInputType | true
    }

  export interface OAuthTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthToken'], meta: { name: 'OAuthToken' } }
    /**
     * Find zero or one OAuthToken that matches the filter.
     * @param {OAuthTokenFindUniqueArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthTokenFindUniqueArgs>(args: SelectSubset<T, OAuthTokenFindUniqueArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one OAuthToken that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OAuthTokenFindUniqueOrThrowArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first OAuthToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindFirstArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthTokenFindFirstArgs>(args?: SelectSubset<T, OAuthTokenFindFirstArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first OAuthToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindFirstOrThrowArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more OAuthTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthTokens
     * const oAuthTokens = await prisma.oAuthToken.findMany()
     * 
     * // Get first 10 OAuthTokens
     * const oAuthTokens = await prisma.oAuthToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthTokenFindManyArgs>(args?: SelectSubset<T, OAuthTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a OAuthToken.
     * @param {OAuthTokenCreateArgs} args - Arguments to create a OAuthToken.
     * @example
     * // Create one OAuthToken
     * const OAuthToken = await prisma.oAuthToken.create({
     *   data: {
     *     // ... data to create a OAuthToken
     *   }
     * })
     * 
     */
    create<T extends OAuthTokenCreateArgs>(args: SelectSubset<T, OAuthTokenCreateArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many OAuthTokens.
     * @param {OAuthTokenCreateManyArgs} args - Arguments to create many OAuthTokens.
     * @example
     * // Create many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthTokenCreateManyArgs>(args?: SelectSubset<T, OAuthTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthTokens and returns the data saved in the database.
     * @param {OAuthTokenCreateManyAndReturnArgs} args - Arguments to create many OAuthTokens.
     * @example
     * // Create many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthTokens and only return the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a OAuthToken.
     * @param {OAuthTokenDeleteArgs} args - Arguments to delete one OAuthToken.
     * @example
     * // Delete one OAuthToken
     * const OAuthToken = await prisma.oAuthToken.delete({
     *   where: {
     *     // ... filter to delete one OAuthToken
     *   }
     * })
     * 
     */
    delete<T extends OAuthTokenDeleteArgs>(args: SelectSubset<T, OAuthTokenDeleteArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one OAuthToken.
     * @param {OAuthTokenUpdateArgs} args - Arguments to update one OAuthToken.
     * @example
     * // Update one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthTokenUpdateArgs>(args: SelectSubset<T, OAuthTokenUpdateArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more OAuthTokens.
     * @param {OAuthTokenDeleteManyArgs} args - Arguments to filter OAuthTokens to delete.
     * @example
     * // Delete a few OAuthTokens
     * const { count } = await prisma.oAuthToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthTokenDeleteManyArgs>(args?: SelectSubset<T, OAuthTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthTokenUpdateManyArgs>(args: SelectSubset<T, OAuthTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OAuthToken.
     * @param {OAuthTokenUpsertArgs} args - Arguments to update or create a OAuthToken.
     * @example
     * // Update or create a OAuthToken
     * const oAuthToken = await prisma.oAuthToken.upsert({
     *   create: {
     *     // ... data to create a OAuthToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthToken we want to update
     *   }
     * })
     */
    upsert<T extends OAuthTokenUpsertArgs>(args: SelectSubset<T, OAuthTokenUpsertArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of OAuthTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenCountArgs} args - Arguments to filter OAuthTokens to count.
     * @example
     * // Count the number of OAuthTokens
     * const count = await prisma.oAuthToken.count({
     *   where: {
     *     // ... the filter for the OAuthTokens we want to count
     *   }
     * })
    **/
    count<T extends OAuthTokenCountArgs>(
      args?: Subset<T, OAuthTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OAuthTokenAggregateArgs>(args: Subset<T, OAuthTokenAggregateArgs>): Prisma.PrismaPromise<GetOAuthTokenAggregateType<T>>

    /**
     * Group by OAuthToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OAuthTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthTokenGroupByArgs['orderBy'] }
        : { orderBy?: OAuthTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OAuthTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthToken model
   */
  readonly fields: OAuthTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OAuthToken$organizationArgs<ExtArgs> = {}>(args?: Subset<T, OAuthToken$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    user<T extends OAuthToken$userArgs<ExtArgs> = {}>(args?: Subset<T, OAuthToken$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OAuthToken model
   */ 
  interface OAuthTokenFieldRefs {
    readonly id: FieldRef<"OAuthToken", 'String'>
    readonly org_id: FieldRef<"OAuthToken", 'String'>
    readonly user_id: FieldRef<"OAuthToken", 'String'>
    readonly provider: FieldRef<"OAuthToken", 'String'>
    readonly scopes: FieldRef<"OAuthToken", 'String[]'>
    readonly expires_at: FieldRef<"OAuthToken", 'DateTime'>
    readonly enc_payload: FieldRef<"OAuthToken", 'String'>
    readonly created_at: FieldRef<"OAuthToken", 'DateTime'>
    readonly updated_at: FieldRef<"OAuthToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthToken findUnique
   */
  export type OAuthTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken findUniqueOrThrow
   */
  export type OAuthTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken findFirst
   */
  export type OAuthTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthTokens.
     */
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken findFirstOrThrow
   */
  export type OAuthTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthTokens.
     */
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken findMany
   */
  export type OAuthTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthTokens to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken create
   */
  export type OAuthTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthToken.
     */
    data: XOR<OAuthTokenCreateInput, OAuthTokenUncheckedCreateInput>
  }

  /**
   * OAuthToken createMany
   */
  export type OAuthTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthTokens.
     */
    data: OAuthTokenCreateManyInput | OAuthTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthToken createManyAndReturn
   */
  export type OAuthTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many OAuthTokens.
     */
    data: OAuthTokenCreateManyInput | OAuthTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthToken update
   */
  export type OAuthTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthToken.
     */
    data: XOR<OAuthTokenUpdateInput, OAuthTokenUncheckedUpdateInput>
    /**
     * Choose, which OAuthToken to update.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken updateMany
   */
  export type OAuthTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthTokens.
     */
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyInput>
    /**
     * Filter which OAuthTokens to update
     */
    where?: OAuthTokenWhereInput
  }

  /**
   * OAuthToken upsert
   */
  export type OAuthTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthToken to update in case it exists.
     */
    where: OAuthTokenWhereUniqueInput
    /**
     * In case the OAuthToken found by the `where` argument doesn't exist, create a new OAuthToken with this data.
     */
    create: XOR<OAuthTokenCreateInput, OAuthTokenUncheckedCreateInput>
    /**
     * In case the OAuthToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthTokenUpdateInput, OAuthTokenUncheckedUpdateInput>
  }

  /**
   * OAuthToken delete
   */
  export type OAuthTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter which OAuthToken to delete.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken deleteMany
   */
  export type OAuthTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthTokens to delete
     */
    where?: OAuthTokenWhereInput
  }

  /**
   * OAuthToken.organization
   */
  export type OAuthToken$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * OAuthToken.user
   */
  export type OAuthToken$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * OAuthToken without action
   */
  export type OAuthTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    org_id: string | null
    user_id: string | null
    action: string | null
    target_id: string | null
    created_at: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    org_id: string | null
    user_id: string | null
    action: string | null
    target_id: string | null
    created_at: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    org_id: number
    user_id: number
    action: number
    target_id: number
    meta_json: number
    created_at: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    org_id?: true
    user_id?: true
    action?: true
    target_id?: true
    created_at?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    org_id?: true
    user_id?: true
    action?: true
    target_id?: true
    created_at?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    org_id?: true
    user_id?: true
    action?: true
    target_id?: true
    meta_json?: true
    created_at?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    org_id: string
    user_id: string | null
    action: string
    target_id: string | null
    meta_json: JsonValue | null
    created_at: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    user_id?: boolean
    action?: boolean
    target_id?: boolean
    meta_json?: boolean
    created_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    user_id?: boolean
    action?: boolean
    target_id?: boolean
    meta_json?: boolean
    created_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    org_id?: boolean
    user_id?: boolean
    action?: boolean
    target_id?: boolean
    meta_json?: boolean
    created_at?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      org_id: string
      user_id: string | null
      action: string
      target_id: string | null
      meta_json: Prisma.JsonValue | null
      created_at: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly org_id: FieldRef<"AuditLog", 'String'>
    readonly user_id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly target_id: FieldRef<"AuditLog", 'String'>
    readonly meta_json: FieldRef<"AuditLog", 'Json'>
    readonly created_at: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model BackfillJob
   */

  export type AggregateBackfillJob = {
    _count: BackfillJobCountAggregateOutputType | null
    _min: BackfillJobMinAggregateOutputType | null
    _max: BackfillJobMaxAggregateOutputType | null
  }

  export type BackfillJobMinAggregateOutputType = {
    id: string | null
    org_id: string | null
    account_id: string | null
    range_start: Date | null
    range_end: Date | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BackfillJobMaxAggregateOutputType = {
    id: string | null
    org_id: string | null
    account_id: string | null
    range_start: Date | null
    range_end: Date | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BackfillJobCountAggregateOutputType = {
    id: number
    org_id: number
    account_id: number
    range_start: number
    range_end: number
    status: number
    progress: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BackfillJobMinAggregateInputType = {
    id?: true
    org_id?: true
    account_id?: true
    range_start?: true
    range_end?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type BackfillJobMaxAggregateInputType = {
    id?: true
    org_id?: true
    account_id?: true
    range_start?: true
    range_end?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type BackfillJobCountAggregateInputType = {
    id?: true
    org_id?: true
    account_id?: true
    range_start?: true
    range_end?: true
    status?: true
    progress?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BackfillJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BackfillJob to aggregate.
     */
    where?: BackfillJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackfillJobs to fetch.
     */
    orderBy?: BackfillJobOrderByWithRelationInput | BackfillJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BackfillJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackfillJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackfillJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BackfillJobs
    **/
    _count?: true | BackfillJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BackfillJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BackfillJobMaxAggregateInputType
  }

  export type GetBackfillJobAggregateType<T extends BackfillJobAggregateArgs> = {
        [P in keyof T & keyof AggregateBackfillJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBackfillJob[P]>
      : GetScalarType<T[P], AggregateBackfillJob[P]>
  }




  export type BackfillJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BackfillJobWhereInput
    orderBy?: BackfillJobOrderByWithAggregationInput | BackfillJobOrderByWithAggregationInput[]
    by: BackfillJobScalarFieldEnum[] | BackfillJobScalarFieldEnum
    having?: BackfillJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BackfillJobCountAggregateInputType | true
    _min?: BackfillJobMinAggregateInputType
    _max?: BackfillJobMaxAggregateInputType
  }

  export type BackfillJobGroupByOutputType = {
    id: string
    org_id: string
    account_id: string
    range_start: Date
    range_end: Date
    status: string
    progress: JsonValue | null
    created_at: Date
    updated_at: Date
    _count: BackfillJobCountAggregateOutputType | null
    _min: BackfillJobMinAggregateOutputType | null
    _max: BackfillJobMaxAggregateOutputType | null
  }

  type GetBackfillJobGroupByPayload<T extends BackfillJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BackfillJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BackfillJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BackfillJobGroupByOutputType[P]>
            : GetScalarType<T[P], BackfillJobGroupByOutputType[P]>
        }
      >
    >


  export type BackfillJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    account_id?: boolean
    range_start?: boolean
    range_end?: boolean
    status?: boolean
    progress?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backfillJob"]>

  export type BackfillJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    org_id?: boolean
    account_id?: boolean
    range_start?: boolean
    range_end?: boolean
    status?: boolean
    progress?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backfillJob"]>

  export type BackfillJobSelectScalar = {
    id?: boolean
    org_id?: boolean
    account_id?: boolean
    range_start?: boolean
    range_end?: boolean
    status?: boolean
    progress?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type BackfillJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }
  export type BackfillJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }

  export type $BackfillJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BackfillJob"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      account: Prisma.$AccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      org_id: string
      account_id: string
      range_start: Date
      range_end: Date
      status: string
      progress: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["backfillJob"]>
    composites: {}
  }

  type BackfillJobGetPayload<S extends boolean | null | undefined | BackfillJobDefaultArgs> = $Result.GetResult<Prisma.$BackfillJobPayload, S>

  type BackfillJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BackfillJobFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BackfillJobCountAggregateInputType | true
    }

  export interface BackfillJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BackfillJob'], meta: { name: 'BackfillJob' } }
    /**
     * Find zero or one BackfillJob that matches the filter.
     * @param {BackfillJobFindUniqueArgs} args - Arguments to find a BackfillJob
     * @example
     * // Get one BackfillJob
     * const backfillJob = await prisma.backfillJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BackfillJobFindUniqueArgs>(args: SelectSubset<T, BackfillJobFindUniqueArgs<ExtArgs>>): Prisma__BackfillJobClient<$Result.GetResult<Prisma.$BackfillJobPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BackfillJob that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BackfillJobFindUniqueOrThrowArgs} args - Arguments to find a BackfillJob
     * @example
     * // Get one BackfillJob
     * const backfillJob = await prisma.backfillJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BackfillJobFindUniqueOrThrowArgs>(args: SelectSubset<T, BackfillJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BackfillJobClient<$Result.GetResult<Prisma.$BackfillJobPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BackfillJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackfillJobFindFirstArgs} args - Arguments to find a BackfillJob
     * @example
     * // Get one BackfillJob
     * const backfillJob = await prisma.backfillJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BackfillJobFindFirstArgs>(args?: SelectSubset<T, BackfillJobFindFirstArgs<ExtArgs>>): Prisma__BackfillJobClient<$Result.GetResult<Prisma.$BackfillJobPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BackfillJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackfillJobFindFirstOrThrowArgs} args - Arguments to find a BackfillJob
     * @example
     * // Get one BackfillJob
     * const backfillJob = await prisma.backfillJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BackfillJobFindFirstOrThrowArgs>(args?: SelectSubset<T, BackfillJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__BackfillJobClient<$Result.GetResult<Prisma.$BackfillJobPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BackfillJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackfillJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BackfillJobs
     * const backfillJobs = await prisma.backfillJob.findMany()
     * 
     * // Get first 10 BackfillJobs
     * const backfillJobs = await prisma.backfillJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const backfillJobWithIdOnly = await prisma.backfillJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BackfillJobFindManyArgs>(args?: SelectSubset<T, BackfillJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackfillJobPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BackfillJob.
     * @param {BackfillJobCreateArgs} args - Arguments to create a BackfillJob.
     * @example
     * // Create one BackfillJob
     * const BackfillJob = await prisma.backfillJob.create({
     *   data: {
     *     // ... data to create a BackfillJob
     *   }
     * })
     * 
     */
    create<T extends BackfillJobCreateArgs>(args: SelectSubset<T, BackfillJobCreateArgs<ExtArgs>>): Prisma__BackfillJobClient<$Result.GetResult<Prisma.$BackfillJobPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BackfillJobs.
     * @param {BackfillJobCreateManyArgs} args - Arguments to create many BackfillJobs.
     * @example
     * // Create many BackfillJobs
     * const backfillJob = await prisma.backfillJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BackfillJobCreateManyArgs>(args?: SelectSubset<T, BackfillJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BackfillJobs and returns the data saved in the database.
     * @param {BackfillJobCreateManyAndReturnArgs} args - Arguments to create many BackfillJobs.
     * @example
     * // Create many BackfillJobs
     * const backfillJob = await prisma.backfillJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BackfillJobs and only return the `id`
     * const backfillJobWithIdOnly = await prisma.backfillJob.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BackfillJobCreateManyAndReturnArgs>(args?: SelectSubset<T, BackfillJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackfillJobPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BackfillJob.
     * @param {BackfillJobDeleteArgs} args - Arguments to delete one BackfillJob.
     * @example
     * // Delete one BackfillJob
     * const BackfillJob = await prisma.backfillJob.delete({
     *   where: {
     *     // ... filter to delete one BackfillJob
     *   }
     * })
     * 
     */
    delete<T extends BackfillJobDeleteArgs>(args: SelectSubset<T, BackfillJobDeleteArgs<ExtArgs>>): Prisma__BackfillJobClient<$Result.GetResult<Prisma.$BackfillJobPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BackfillJob.
     * @param {BackfillJobUpdateArgs} args - Arguments to update one BackfillJob.
     * @example
     * // Update one BackfillJob
     * const backfillJob = await prisma.backfillJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BackfillJobUpdateArgs>(args: SelectSubset<T, BackfillJobUpdateArgs<ExtArgs>>): Prisma__BackfillJobClient<$Result.GetResult<Prisma.$BackfillJobPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BackfillJobs.
     * @param {BackfillJobDeleteManyArgs} args - Arguments to filter BackfillJobs to delete.
     * @example
     * // Delete a few BackfillJobs
     * const { count } = await prisma.backfillJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BackfillJobDeleteManyArgs>(args?: SelectSubset<T, BackfillJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BackfillJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackfillJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BackfillJobs
     * const backfillJob = await prisma.backfillJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BackfillJobUpdateManyArgs>(args: SelectSubset<T, BackfillJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BackfillJob.
     * @param {BackfillJobUpsertArgs} args - Arguments to update or create a BackfillJob.
     * @example
     * // Update or create a BackfillJob
     * const backfillJob = await prisma.backfillJob.upsert({
     *   create: {
     *     // ... data to create a BackfillJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BackfillJob we want to update
     *   }
     * })
     */
    upsert<T extends BackfillJobUpsertArgs>(args: SelectSubset<T, BackfillJobUpsertArgs<ExtArgs>>): Prisma__BackfillJobClient<$Result.GetResult<Prisma.$BackfillJobPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BackfillJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackfillJobCountArgs} args - Arguments to filter BackfillJobs to count.
     * @example
     * // Count the number of BackfillJobs
     * const count = await prisma.backfillJob.count({
     *   where: {
     *     // ... the filter for the BackfillJobs we want to count
     *   }
     * })
    **/
    count<T extends BackfillJobCountArgs>(
      args?: Subset<T, BackfillJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BackfillJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BackfillJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackfillJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BackfillJobAggregateArgs>(args: Subset<T, BackfillJobAggregateArgs>): Prisma.PrismaPromise<GetBackfillJobAggregateType<T>>

    /**
     * Group by BackfillJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackfillJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BackfillJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BackfillJobGroupByArgs['orderBy'] }
        : { orderBy?: BackfillJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BackfillJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBackfillJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BackfillJob model
   */
  readonly fields: BackfillJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BackfillJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BackfillJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BackfillJob model
   */ 
  interface BackfillJobFieldRefs {
    readonly id: FieldRef<"BackfillJob", 'String'>
    readonly org_id: FieldRef<"BackfillJob", 'String'>
    readonly account_id: FieldRef<"BackfillJob", 'String'>
    readonly range_start: FieldRef<"BackfillJob", 'DateTime'>
    readonly range_end: FieldRef<"BackfillJob", 'DateTime'>
    readonly status: FieldRef<"BackfillJob", 'String'>
    readonly progress: FieldRef<"BackfillJob", 'Json'>
    readonly created_at: FieldRef<"BackfillJob", 'DateTime'>
    readonly updated_at: FieldRef<"BackfillJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BackfillJob findUnique
   */
  export type BackfillJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackfillJob
     */
    select?: BackfillJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackfillJobInclude<ExtArgs> | null
    /**
     * Filter, which BackfillJob to fetch.
     */
    where: BackfillJobWhereUniqueInput
  }

  /**
   * BackfillJob findUniqueOrThrow
   */
  export type BackfillJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackfillJob
     */
    select?: BackfillJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackfillJobInclude<ExtArgs> | null
    /**
     * Filter, which BackfillJob to fetch.
     */
    where: BackfillJobWhereUniqueInput
  }

  /**
   * BackfillJob findFirst
   */
  export type BackfillJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackfillJob
     */
    select?: BackfillJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackfillJobInclude<ExtArgs> | null
    /**
     * Filter, which BackfillJob to fetch.
     */
    where?: BackfillJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackfillJobs to fetch.
     */
    orderBy?: BackfillJobOrderByWithRelationInput | BackfillJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BackfillJobs.
     */
    cursor?: BackfillJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackfillJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackfillJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BackfillJobs.
     */
    distinct?: BackfillJobScalarFieldEnum | BackfillJobScalarFieldEnum[]
  }

  /**
   * BackfillJob findFirstOrThrow
   */
  export type BackfillJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackfillJob
     */
    select?: BackfillJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackfillJobInclude<ExtArgs> | null
    /**
     * Filter, which BackfillJob to fetch.
     */
    where?: BackfillJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackfillJobs to fetch.
     */
    orderBy?: BackfillJobOrderByWithRelationInput | BackfillJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BackfillJobs.
     */
    cursor?: BackfillJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackfillJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackfillJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BackfillJobs.
     */
    distinct?: BackfillJobScalarFieldEnum | BackfillJobScalarFieldEnum[]
  }

  /**
   * BackfillJob findMany
   */
  export type BackfillJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackfillJob
     */
    select?: BackfillJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackfillJobInclude<ExtArgs> | null
    /**
     * Filter, which BackfillJobs to fetch.
     */
    where?: BackfillJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackfillJobs to fetch.
     */
    orderBy?: BackfillJobOrderByWithRelationInput | BackfillJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BackfillJobs.
     */
    cursor?: BackfillJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackfillJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackfillJobs.
     */
    skip?: number
    distinct?: BackfillJobScalarFieldEnum | BackfillJobScalarFieldEnum[]
  }

  /**
   * BackfillJob create
   */
  export type BackfillJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackfillJob
     */
    select?: BackfillJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackfillJobInclude<ExtArgs> | null
    /**
     * The data needed to create a BackfillJob.
     */
    data: XOR<BackfillJobCreateInput, BackfillJobUncheckedCreateInput>
  }

  /**
   * BackfillJob createMany
   */
  export type BackfillJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BackfillJobs.
     */
    data: BackfillJobCreateManyInput | BackfillJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BackfillJob createManyAndReturn
   */
  export type BackfillJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackfillJob
     */
    select?: BackfillJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BackfillJobs.
     */
    data: BackfillJobCreateManyInput | BackfillJobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackfillJobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BackfillJob update
   */
  export type BackfillJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackfillJob
     */
    select?: BackfillJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackfillJobInclude<ExtArgs> | null
    /**
     * The data needed to update a BackfillJob.
     */
    data: XOR<BackfillJobUpdateInput, BackfillJobUncheckedUpdateInput>
    /**
     * Choose, which BackfillJob to update.
     */
    where: BackfillJobWhereUniqueInput
  }

  /**
   * BackfillJob updateMany
   */
  export type BackfillJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BackfillJobs.
     */
    data: XOR<BackfillJobUpdateManyMutationInput, BackfillJobUncheckedUpdateManyInput>
    /**
     * Filter which BackfillJobs to update
     */
    where?: BackfillJobWhereInput
  }

  /**
   * BackfillJob upsert
   */
  export type BackfillJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackfillJob
     */
    select?: BackfillJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackfillJobInclude<ExtArgs> | null
    /**
     * The filter to search for the BackfillJob to update in case it exists.
     */
    where: BackfillJobWhereUniqueInput
    /**
     * In case the BackfillJob found by the `where` argument doesn't exist, create a new BackfillJob with this data.
     */
    create: XOR<BackfillJobCreateInput, BackfillJobUncheckedCreateInput>
    /**
     * In case the BackfillJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BackfillJobUpdateInput, BackfillJobUncheckedUpdateInput>
  }

  /**
   * BackfillJob delete
   */
  export type BackfillJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackfillJob
     */
    select?: BackfillJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackfillJobInclude<ExtArgs> | null
    /**
     * Filter which BackfillJob to delete.
     */
    where: BackfillJobWhereUniqueInput
  }

  /**
   * BackfillJob deleteMany
   */
  export type BackfillJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BackfillJobs to delete
     */
    where?: BackfillJobWhereInput
  }

  /**
   * BackfillJob without action
   */
  export type BackfillJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackfillJob
     */
    select?: BackfillJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackfillJobInclude<ExtArgs> | null
  }


  /**
   * Model NotificationPreference
   */

  export type AggregateNotificationPreference = {
    _count: NotificationPreferenceCountAggregateOutputType | null
    _min: NotificationPreferenceMinAggregateOutputType | null
    _max: NotificationPreferenceMaxAggregateOutputType | null
  }

  export type NotificationPreferenceMinAggregateOutputType = {
    id: string | null
    account_id: string | null
    channel: string | null
    event_type: string | null
    enabled: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type NotificationPreferenceMaxAggregateOutputType = {
    id: string | null
    account_id: string | null
    channel: string | null
    event_type: string | null
    enabled: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type NotificationPreferenceCountAggregateOutputType = {
    id: number
    account_id: number
    channel: number
    event_type: number
    enabled: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type NotificationPreferenceMinAggregateInputType = {
    id?: true
    account_id?: true
    channel?: true
    event_type?: true
    enabled?: true
    created_at?: true
    updated_at?: true
  }

  export type NotificationPreferenceMaxAggregateInputType = {
    id?: true
    account_id?: true
    channel?: true
    event_type?: true
    enabled?: true
    created_at?: true
    updated_at?: true
  }

  export type NotificationPreferenceCountAggregateInputType = {
    id?: true
    account_id?: true
    channel?: true
    event_type?: true
    enabled?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type NotificationPreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPreference to aggregate.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationPreferences
    **/
    _count?: true | NotificationPreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationPreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationPreferenceMaxAggregateInputType
  }

  export type GetNotificationPreferenceAggregateType<T extends NotificationPreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationPreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationPreference[P]>
      : GetScalarType<T[P], AggregateNotificationPreference[P]>
  }




  export type NotificationPreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationPreferenceWhereInput
    orderBy?: NotificationPreferenceOrderByWithAggregationInput | NotificationPreferenceOrderByWithAggregationInput[]
    by: NotificationPreferenceScalarFieldEnum[] | NotificationPreferenceScalarFieldEnum
    having?: NotificationPreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationPreferenceCountAggregateInputType | true
    _min?: NotificationPreferenceMinAggregateInputType
    _max?: NotificationPreferenceMaxAggregateInputType
  }

  export type NotificationPreferenceGroupByOutputType = {
    id: string
    account_id: string
    channel: string
    event_type: string
    enabled: boolean
    created_at: Date
    updated_at: Date
    _count: NotificationPreferenceCountAggregateOutputType | null
    _min: NotificationPreferenceMinAggregateOutputType | null
    _max: NotificationPreferenceMaxAggregateOutputType | null
  }

  type GetNotificationPreferenceGroupByPayload<T extends NotificationPreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationPreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationPreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationPreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationPreferenceGroupByOutputType[P]>
        }
      >
    >


  export type NotificationPreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    account_id?: boolean
    channel?: boolean
    event_type?: boolean
    enabled?: boolean
    created_at?: boolean
    updated_at?: boolean
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    account_id?: boolean
    channel?: boolean
    event_type?: boolean
    enabled?: boolean
    created_at?: boolean
    updated_at?: boolean
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectScalar = {
    id?: boolean
    account_id?: boolean
    channel?: boolean
    event_type?: boolean
    enabled?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type NotificationPreferenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }
  export type NotificationPreferenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }

  export type $NotificationPreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationPreference"
    objects: {
      account: Prisma.$AccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      account_id: string
      channel: string
      event_type: string
      enabled: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["notificationPreference"]>
    composites: {}
  }

  type NotificationPreferenceGetPayload<S extends boolean | null | undefined | NotificationPreferenceDefaultArgs> = $Result.GetResult<Prisma.$NotificationPreferencePayload, S>

  type NotificationPreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationPreferenceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationPreferenceCountAggregateInputType | true
    }

  export interface NotificationPreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationPreference'], meta: { name: 'NotificationPreference' } }
    /**
     * Find zero or one NotificationPreference that matches the filter.
     * @param {NotificationPreferenceFindUniqueArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationPreferenceFindUniqueArgs>(args: SelectSubset<T, NotificationPreferenceFindUniqueArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one NotificationPreference that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationPreferenceFindUniqueOrThrowArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationPreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first NotificationPreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindFirstArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationPreferenceFindFirstArgs>(args?: SelectSubset<T, NotificationPreferenceFindFirstArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first NotificationPreference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindFirstOrThrowArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationPreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more NotificationPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreference.findMany()
     * 
     * // Get first 10 NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationPreferenceFindManyArgs>(args?: SelectSubset<T, NotificationPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a NotificationPreference.
     * @param {NotificationPreferenceCreateArgs} args - Arguments to create a NotificationPreference.
     * @example
     * // Create one NotificationPreference
     * const NotificationPreference = await prisma.notificationPreference.create({
     *   data: {
     *     // ... data to create a NotificationPreference
     *   }
     * })
     * 
     */
    create<T extends NotificationPreferenceCreateArgs>(args: SelectSubset<T, NotificationPreferenceCreateArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many NotificationPreferences.
     * @param {NotificationPreferenceCreateManyArgs} args - Arguments to create many NotificationPreferences.
     * @example
     * // Create many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationPreferenceCreateManyArgs>(args?: SelectSubset<T, NotificationPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationPreferences and returns the data saved in the database.
     * @param {NotificationPreferenceCreateManyAndReturnArgs} args - Arguments to create many NotificationPreferences.
     * @example
     * // Create many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationPreferences and only return the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationPreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a NotificationPreference.
     * @param {NotificationPreferenceDeleteArgs} args - Arguments to delete one NotificationPreference.
     * @example
     * // Delete one NotificationPreference
     * const NotificationPreference = await prisma.notificationPreference.delete({
     *   where: {
     *     // ... filter to delete one NotificationPreference
     *   }
     * })
     * 
     */
    delete<T extends NotificationPreferenceDeleteArgs>(args: SelectSubset<T, NotificationPreferenceDeleteArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one NotificationPreference.
     * @param {NotificationPreferenceUpdateArgs} args - Arguments to update one NotificationPreference.
     * @example
     * // Update one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationPreferenceUpdateArgs>(args: SelectSubset<T, NotificationPreferenceUpdateArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more NotificationPreferences.
     * @param {NotificationPreferenceDeleteManyArgs} args - Arguments to filter NotificationPreferences to delete.
     * @example
     * // Delete a few NotificationPreferences
     * const { count } = await prisma.notificationPreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationPreferenceDeleteManyArgs>(args?: SelectSubset<T, NotificationPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationPreferenceUpdateManyArgs>(args: SelectSubset<T, NotificationPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NotificationPreference.
     * @param {NotificationPreferenceUpsertArgs} args - Arguments to update or create a NotificationPreference.
     * @example
     * // Update or create a NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.upsert({
     *   create: {
     *     // ... data to create a NotificationPreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationPreference we want to update
     *   }
     * })
     */
    upsert<T extends NotificationPreferenceUpsertArgs>(args: SelectSubset<T, NotificationPreferenceUpsertArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceCountArgs} args - Arguments to filter NotificationPreferences to count.
     * @example
     * // Count the number of NotificationPreferences
     * const count = await prisma.notificationPreference.count({
     *   where: {
     *     // ... the filter for the NotificationPreferences we want to count
     *   }
     * })
    **/
    count<T extends NotificationPreferenceCountArgs>(
      args?: Subset<T, NotificationPreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationPreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationPreferenceAggregateArgs>(args: Subset<T, NotificationPreferenceAggregateArgs>): Prisma.PrismaPromise<GetNotificationPreferenceAggregateType<T>>

    /**
     * Group by NotificationPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationPreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationPreferenceGroupByArgs['orderBy'] }
        : { orderBy?: NotificationPreferenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationPreference model
   */
  readonly fields: NotificationPreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationPreference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationPreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationPreference model
   */ 
  interface NotificationPreferenceFieldRefs {
    readonly id: FieldRef<"NotificationPreference", 'String'>
    readonly account_id: FieldRef<"NotificationPreference", 'String'>
    readonly channel: FieldRef<"NotificationPreference", 'String'>
    readonly event_type: FieldRef<"NotificationPreference", 'String'>
    readonly enabled: FieldRef<"NotificationPreference", 'Boolean'>
    readonly created_at: FieldRef<"NotificationPreference", 'DateTime'>
    readonly updated_at: FieldRef<"NotificationPreference", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationPreference findUnique
   */
  export type NotificationPreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference findUniqueOrThrow
   */
  export type NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference findFirst
   */
  export type NotificationPreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPreferences.
     */
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference findFirstOrThrow
   */
  export type NotificationPreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPreferences.
     */
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference findMany
   */
  export type NotificationPreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreferences to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference create
   */
  export type NotificationPreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to create a NotificationPreference.
     */
    data: XOR<NotificationPreferenceCreateInput, NotificationPreferenceUncheckedCreateInput>
  }

  /**
   * NotificationPreference createMany
   */
  export type NotificationPreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationPreferences.
     */
    data: NotificationPreferenceCreateManyInput | NotificationPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationPreference createManyAndReturn
   */
  export type NotificationPreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many NotificationPreferences.
     */
    data: NotificationPreferenceCreateManyInput | NotificationPreferenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NotificationPreference update
   */
  export type NotificationPreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to update a NotificationPreference.
     */
    data: XOR<NotificationPreferenceUpdateInput, NotificationPreferenceUncheckedUpdateInput>
    /**
     * Choose, which NotificationPreference to update.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference updateMany
   */
  export type NotificationPreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationPreferences.
     */
    data: XOR<NotificationPreferenceUpdateManyMutationInput, NotificationPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which NotificationPreferences to update
     */
    where?: NotificationPreferenceWhereInput
  }

  /**
   * NotificationPreference upsert
   */
  export type NotificationPreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * The filter to search for the NotificationPreference to update in case it exists.
     */
    where: NotificationPreferenceWhereUniqueInput
    /**
     * In case the NotificationPreference found by the `where` argument doesn't exist, create a new NotificationPreference with this data.
     */
    create: XOR<NotificationPreferenceCreateInput, NotificationPreferenceUncheckedCreateInput>
    /**
     * In case the NotificationPreference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationPreferenceUpdateInput, NotificationPreferenceUncheckedUpdateInput>
  }

  /**
   * NotificationPreference delete
   */
  export type NotificationPreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * Filter which NotificationPreference to delete.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference deleteMany
   */
  export type NotificationPreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPreferences to delete
     */
    where?: NotificationPreferenceWhereInput
  }

  /**
   * NotificationPreference without action
   */
  export type NotificationPreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    owner_user_id: 'owner_user_id',
    plan: 'plan',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    org_id: 'org_id',
    email: 'email',
    password_hash: 'password_hash',
    oidc_provider: 'oidc_provider',
    mfa_enabled: 'mfa_enabled',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ConnectionScalarFieldEnum: {
    id: 'id',
    org_id: 'org_id',
    plaid_item_id: 'plaid_item_id',
    institution: 'institution',
    status: 'status',
    last_reauth_at: 'last_reauth_at',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ConnectionScalarFieldEnum = (typeof ConnectionScalarFieldEnum)[keyof typeof ConnectionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
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

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const StatementScalarFieldEnum: {
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

  export type StatementScalarFieldEnum = (typeof StatementScalarFieldEnum)[keyof typeof StatementScalarFieldEnum]


  export const DestinationScalarFieldEnum: {
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

  export type DestinationScalarFieldEnum = (typeof DestinationScalarFieldEnum)[keyof typeof DestinationScalarFieldEnum]


  export const RoutingRuleScalarFieldEnum: {
    id: 'id',
    account_id: 'account_id',
    destination_id: 'destination_id',
    folder_path: 'folder_path',
    filename_pattern: 'filename_pattern',
    active: 'active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type RoutingRuleScalarFieldEnum = (typeof RoutingRuleScalarFieldEnum)[keyof typeof RoutingRuleScalarFieldEnum]


  export const DeliveryScalarFieldEnum: {
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

  export type DeliveryScalarFieldEnum = (typeof DeliveryScalarFieldEnum)[keyof typeof DeliveryScalarFieldEnum]


  export const WebhookEndpointScalarFieldEnum: {
    id: 'id',
    org_id: 'org_id',
    url: 'url',
    secret_ref: 'secret_ref',
    active: 'active',
    last_success_at: 'last_success_at',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type WebhookEndpointScalarFieldEnum = (typeof WebhookEndpointScalarFieldEnum)[keyof typeof WebhookEndpointScalarFieldEnum]


  export const OAuthTokenScalarFieldEnum: {
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

  export type OAuthTokenScalarFieldEnum = (typeof OAuthTokenScalarFieldEnum)[keyof typeof OAuthTokenScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    org_id: 'org_id',
    user_id: 'user_id',
    action: 'action',
    target_id: 'target_id',
    meta_json: 'meta_json',
    created_at: 'created_at'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const BackfillJobScalarFieldEnum: {
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

  export type BackfillJobScalarFieldEnum = (typeof BackfillJobScalarFieldEnum)[keyof typeof BackfillJobScalarFieldEnum]


  export const NotificationPreferenceScalarFieldEnum: {
    id: 'id',
    account_id: 'account_id',
    channel: 'channel',
    event_type: 'event_type',
    enabled: 'enabled',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type NotificationPreferenceScalarFieldEnum = (typeof NotificationPreferenceScalarFieldEnum)[keyof typeof NotificationPreferenceScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: UuidFilter<"Organization"> | string
    owner_user_id?: UuidFilter<"Organization"> | string
    plan?: StringFilter<"Organization"> | string
    status?: StringFilter<"Organization"> | string
    created_at?: DateTimeFilter<"Organization"> | Date | string
    updated_at?: DateTimeFilter<"Organization"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Organization"> | Date | string | null
    owner?: XOR<UserRelationFilter, UserWhereInput>
    users?: UserListRelationFilter
    connections?: ConnectionListRelationFilter
    destinations?: DestinationListRelationFilter
    webhook_endpoints?: WebhookEndpointListRelationFilter
    oauth_tokens?: OAuthTokenListRelationFilter
    audit_logs?: AuditLogListRelationFilter
    backfill_jobs?: BackfillJobListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    owner_user_id?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    owner?: UserOrderByWithRelationInput
    users?: UserOrderByRelationAggregateInput
    connections?: ConnectionOrderByRelationAggregateInput
    destinations?: DestinationOrderByRelationAggregateInput
    webhook_endpoints?: WebhookEndpointOrderByRelationAggregateInput
    oauth_tokens?: OAuthTokenOrderByRelationAggregateInput
    audit_logs?: AuditLogOrderByRelationAggregateInput
    backfill_jobs?: BackfillJobOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    owner_user_id?: UuidFilter<"Organization"> | string
    plan?: StringFilter<"Organization"> | string
    status?: StringFilter<"Organization"> | string
    created_at?: DateTimeFilter<"Organization"> | Date | string
    updated_at?: DateTimeFilter<"Organization"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Organization"> | Date | string | null
    owner?: XOR<UserRelationFilter, UserWhereInput>
    users?: UserListRelationFilter
    connections?: ConnectionListRelationFilter
    destinations?: DestinationListRelationFilter
    webhook_endpoints?: WebhookEndpointListRelationFilter
    oauth_tokens?: OAuthTokenListRelationFilter
    audit_logs?: AuditLogListRelationFilter
    backfill_jobs?: BackfillJobListRelationFilter
  }, "id">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    owner_user_id?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Organization"> | string
    owner_user_id?: UuidWithAggregatesFilter<"Organization"> | string
    plan?: StringWithAggregatesFilter<"Organization"> | string
    status?: StringWithAggregatesFilter<"Organization"> | string
    created_at?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Organization"> | Date | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    org_id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password_hash?: StringNullableFilter<"User"> | string | null
    oidc_provider?: StringNullableFilter<"User"> | string | null
    mfa_enabled?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    owned_orgs?: OrganizationListRelationFilter
    oauth_tokens?: OAuthTokenListRelationFilter
    audit_logs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    org_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrderInput | SortOrder
    oidc_provider?: SortOrderInput | SortOrder
    mfa_enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    owned_orgs?: OrganizationOrderByRelationAggregateInput
    oauth_tokens?: OAuthTokenOrderByRelationAggregateInput
    audit_logs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    org_id?: UuidFilter<"User"> | string
    password_hash?: StringNullableFilter<"User"> | string | null
    oidc_provider?: StringNullableFilter<"User"> | string | null
    mfa_enabled?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    owned_orgs?: OrganizationListRelationFilter
    oauth_tokens?: OAuthTokenListRelationFilter
    audit_logs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    org_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrderInput | SortOrder
    oidc_provider?: SortOrderInput | SortOrder
    mfa_enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    org_id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringNullableWithAggregatesFilter<"User"> | string | null
    oidc_provider?: StringNullableWithAggregatesFilter<"User"> | string | null
    mfa_enabled?: BoolWithAggregatesFilter<"User"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ConnectionWhereInput = {
    AND?: ConnectionWhereInput | ConnectionWhereInput[]
    OR?: ConnectionWhereInput[]
    NOT?: ConnectionWhereInput | ConnectionWhereInput[]
    id?: UuidFilter<"Connection"> | string
    org_id?: UuidFilter<"Connection"> | string
    plaid_item_id?: StringFilter<"Connection"> | string
    institution?: StringFilter<"Connection"> | string
    status?: StringFilter<"Connection"> | string
    last_reauth_at?: DateTimeNullableFilter<"Connection"> | Date | string | null
    created_at?: DateTimeFilter<"Connection"> | Date | string
    updated_at?: DateTimeFilter<"Connection"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    accounts?: AccountListRelationFilter
  }

  export type ConnectionOrderByWithRelationInput = {
    id?: SortOrder
    org_id?: SortOrder
    plaid_item_id?: SortOrder
    institution?: SortOrder
    status?: SortOrder
    last_reauth_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    accounts?: AccountOrderByRelationAggregateInput
  }

  export type ConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    plaid_item_id?: string
    AND?: ConnectionWhereInput | ConnectionWhereInput[]
    OR?: ConnectionWhereInput[]
    NOT?: ConnectionWhereInput | ConnectionWhereInput[]
    org_id?: UuidFilter<"Connection"> | string
    institution?: StringFilter<"Connection"> | string
    status?: StringFilter<"Connection"> | string
    last_reauth_at?: DateTimeNullableFilter<"Connection"> | Date | string | null
    created_at?: DateTimeFilter<"Connection"> | Date | string
    updated_at?: DateTimeFilter<"Connection"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    accounts?: AccountListRelationFilter
  }, "id" | "plaid_item_id">

  export type ConnectionOrderByWithAggregationInput = {
    id?: SortOrder
    org_id?: SortOrder
    plaid_item_id?: SortOrder
    institution?: SortOrder
    status?: SortOrder
    last_reauth_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ConnectionCountOrderByAggregateInput
    _max?: ConnectionMaxOrderByAggregateInput
    _min?: ConnectionMinOrderByAggregateInput
  }

  export type ConnectionScalarWhereWithAggregatesInput = {
    AND?: ConnectionScalarWhereWithAggregatesInput | ConnectionScalarWhereWithAggregatesInput[]
    OR?: ConnectionScalarWhereWithAggregatesInput[]
    NOT?: ConnectionScalarWhereWithAggregatesInput | ConnectionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Connection"> | string
    org_id?: UuidWithAggregatesFilter<"Connection"> | string
    plaid_item_id?: StringWithAggregatesFilter<"Connection"> | string
    institution?: StringWithAggregatesFilter<"Connection"> | string
    status?: StringWithAggregatesFilter<"Connection"> | string
    last_reauth_at?: DateTimeNullableWithAggregatesFilter<"Connection"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Connection"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Connection"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: UuidFilter<"Account"> | string
    connection_id?: UuidFilter<"Account"> | string
    plaid_account_id?: StringFilter<"Account"> | string
    account_last4?: StringFilter<"Account"> | string
    account_name?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    statements_supported?: BoolFilter<"Account"> | boolean
    learned_schedule_json?: JsonNullableFilter<"Account">
    status?: StringFilter<"Account"> | string
    created_at?: DateTimeFilter<"Account"> | Date | string
    updated_at?: DateTimeFilter<"Account"> | Date | string
    connection?: XOR<ConnectionRelationFilter, ConnectionWhereInput>
    statements?: StatementListRelationFilter
    routing_rules?: RoutingRuleListRelationFilter
    notification_preferences?: NotificationPreferenceListRelationFilter
    backfill_jobs?: BackfillJobListRelationFilter
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    connection_id?: SortOrder
    plaid_account_id?: SortOrder
    account_last4?: SortOrder
    account_name?: SortOrder
    type?: SortOrder
    statements_supported?: SortOrder
    learned_schedule_json?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    connection?: ConnectionOrderByWithRelationInput
    statements?: StatementOrderByRelationAggregateInput
    routing_rules?: RoutingRuleOrderByRelationAggregateInput
    notification_preferences?: NotificationPreferenceOrderByRelationAggregateInput
    backfill_jobs?: BackfillJobOrderByRelationAggregateInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    plaid_account_id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    connection_id?: UuidFilter<"Account"> | string
    account_last4?: StringFilter<"Account"> | string
    account_name?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    statements_supported?: BoolFilter<"Account"> | boolean
    learned_schedule_json?: JsonNullableFilter<"Account">
    status?: StringFilter<"Account"> | string
    created_at?: DateTimeFilter<"Account"> | Date | string
    updated_at?: DateTimeFilter<"Account"> | Date | string
    connection?: XOR<ConnectionRelationFilter, ConnectionWhereInput>
    statements?: StatementListRelationFilter
    routing_rules?: RoutingRuleListRelationFilter
    notification_preferences?: NotificationPreferenceListRelationFilter
    backfill_jobs?: BackfillJobListRelationFilter
  }, "id" | "plaid_account_id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    connection_id?: SortOrder
    plaid_account_id?: SortOrder
    account_last4?: SortOrder
    account_name?: SortOrder
    type?: SortOrder
    statements_supported?: SortOrder
    learned_schedule_json?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Account"> | string
    connection_id?: UuidWithAggregatesFilter<"Account"> | string
    plaid_account_id?: StringWithAggregatesFilter<"Account"> | string
    account_last4?: StringWithAggregatesFilter<"Account"> | string
    account_name?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    statements_supported?: BoolWithAggregatesFilter<"Account"> | boolean
    learned_schedule_json?: JsonNullableWithAggregatesFilter<"Account">
    status?: StringWithAggregatesFilter<"Account"> | string
    created_at?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type StatementWhereInput = {
    AND?: StatementWhereInput | StatementWhereInput[]
    OR?: StatementWhereInput[]
    NOT?: StatementWhereInput | StatementWhereInput[]
    id?: UuidFilter<"Statement"> | string
    account_id?: UuidFilter<"Statement"> | string
    period_start?: DateTimeFilter<"Statement"> | Date | string
    period_end?: DateTimeFilter<"Statement"> | Date | string
    statement_date?: DateTimeFilter<"Statement"> | Date | string
    file_type?: StringFilter<"Statement"> | string
    checksum?: StringFilter<"Statement"> | string
    version?: IntFilter<"Statement"> | number
    retrieved_at?: DateTimeFilter<"Statement"> | Date | string
    created_at?: DateTimeFilter<"Statement"> | Date | string
    account?: XOR<AccountRelationFilter, AccountWhereInput>
    deliveries?: DeliveryListRelationFilter
  }

  export type StatementOrderByWithRelationInput = {
    id?: SortOrder
    account_id?: SortOrder
    period_start?: SortOrder
    period_end?: SortOrder
    statement_date?: SortOrder
    file_type?: SortOrder
    checksum?: SortOrder
    version?: SortOrder
    retrieved_at?: SortOrder
    created_at?: SortOrder
    account?: AccountOrderByWithRelationInput
    deliveries?: DeliveryOrderByRelationAggregateInput
  }

  export type StatementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    account_id_period_end_file_type_version?: StatementAccount_idPeriod_endFile_typeVersionCompoundUniqueInput
    AND?: StatementWhereInput | StatementWhereInput[]
    OR?: StatementWhereInput[]
    NOT?: StatementWhereInput | StatementWhereInput[]
    account_id?: UuidFilter<"Statement"> | string
    period_start?: DateTimeFilter<"Statement"> | Date | string
    period_end?: DateTimeFilter<"Statement"> | Date | string
    statement_date?: DateTimeFilter<"Statement"> | Date | string
    file_type?: StringFilter<"Statement"> | string
    checksum?: StringFilter<"Statement"> | string
    version?: IntFilter<"Statement"> | number
    retrieved_at?: DateTimeFilter<"Statement"> | Date | string
    created_at?: DateTimeFilter<"Statement"> | Date | string
    account?: XOR<AccountRelationFilter, AccountWhereInput>
    deliveries?: DeliveryListRelationFilter
  }, "id" | "account_id_period_end_file_type_version">

  export type StatementOrderByWithAggregationInput = {
    id?: SortOrder
    account_id?: SortOrder
    period_start?: SortOrder
    period_end?: SortOrder
    statement_date?: SortOrder
    file_type?: SortOrder
    checksum?: SortOrder
    version?: SortOrder
    retrieved_at?: SortOrder
    created_at?: SortOrder
    _count?: StatementCountOrderByAggregateInput
    _avg?: StatementAvgOrderByAggregateInput
    _max?: StatementMaxOrderByAggregateInput
    _min?: StatementMinOrderByAggregateInput
    _sum?: StatementSumOrderByAggregateInput
  }

  export type StatementScalarWhereWithAggregatesInput = {
    AND?: StatementScalarWhereWithAggregatesInput | StatementScalarWhereWithAggregatesInput[]
    OR?: StatementScalarWhereWithAggregatesInput[]
    NOT?: StatementScalarWhereWithAggregatesInput | StatementScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Statement"> | string
    account_id?: UuidWithAggregatesFilter<"Statement"> | string
    period_start?: DateTimeWithAggregatesFilter<"Statement"> | Date | string
    period_end?: DateTimeWithAggregatesFilter<"Statement"> | Date | string
    statement_date?: DateTimeWithAggregatesFilter<"Statement"> | Date | string
    file_type?: StringWithAggregatesFilter<"Statement"> | string
    checksum?: StringWithAggregatesFilter<"Statement"> | string
    version?: IntWithAggregatesFilter<"Statement"> | number
    retrieved_at?: DateTimeWithAggregatesFilter<"Statement"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"Statement"> | Date | string
  }

  export type DestinationWhereInput = {
    AND?: DestinationWhereInput | DestinationWhereInput[]
    OR?: DestinationWhereInput[]
    NOT?: DestinationWhereInput | DestinationWhereInput[]
    id?: UuidFilter<"Destination"> | string
    org_id?: UuidFilter<"Destination"> | string
    kind?: StringFilter<"Destination"> | string
    name?: StringFilter<"Destination"> | string
    config_json?: JsonFilter<"Destination">
    secret_ref?: StringNullableFilter<"Destination"> | string | null
    active?: BoolFilter<"Destination"> | boolean
    created_at?: DateTimeFilter<"Destination"> | Date | string
    updated_at?: DateTimeFilter<"Destination"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    routing_rules?: RoutingRuleListRelationFilter
    deliveries?: DeliveryListRelationFilter
  }

  export type DestinationOrderByWithRelationInput = {
    id?: SortOrder
    org_id?: SortOrder
    kind?: SortOrder
    name?: SortOrder
    config_json?: SortOrder
    secret_ref?: SortOrderInput | SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    routing_rules?: RoutingRuleOrderByRelationAggregateInput
    deliveries?: DeliveryOrderByRelationAggregateInput
  }

  export type DestinationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DestinationWhereInput | DestinationWhereInput[]
    OR?: DestinationWhereInput[]
    NOT?: DestinationWhereInput | DestinationWhereInput[]
    org_id?: UuidFilter<"Destination"> | string
    kind?: StringFilter<"Destination"> | string
    name?: StringFilter<"Destination"> | string
    config_json?: JsonFilter<"Destination">
    secret_ref?: StringNullableFilter<"Destination"> | string | null
    active?: BoolFilter<"Destination"> | boolean
    created_at?: DateTimeFilter<"Destination"> | Date | string
    updated_at?: DateTimeFilter<"Destination"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    routing_rules?: RoutingRuleListRelationFilter
    deliveries?: DeliveryListRelationFilter
  }, "id">

  export type DestinationOrderByWithAggregationInput = {
    id?: SortOrder
    org_id?: SortOrder
    kind?: SortOrder
    name?: SortOrder
    config_json?: SortOrder
    secret_ref?: SortOrderInput | SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: DestinationCountOrderByAggregateInput
    _max?: DestinationMaxOrderByAggregateInput
    _min?: DestinationMinOrderByAggregateInput
  }

  export type DestinationScalarWhereWithAggregatesInput = {
    AND?: DestinationScalarWhereWithAggregatesInput | DestinationScalarWhereWithAggregatesInput[]
    OR?: DestinationScalarWhereWithAggregatesInput[]
    NOT?: DestinationScalarWhereWithAggregatesInput | DestinationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Destination"> | string
    org_id?: UuidWithAggregatesFilter<"Destination"> | string
    kind?: StringWithAggregatesFilter<"Destination"> | string
    name?: StringWithAggregatesFilter<"Destination"> | string
    config_json?: JsonWithAggregatesFilter<"Destination">
    secret_ref?: StringNullableWithAggregatesFilter<"Destination"> | string | null
    active?: BoolWithAggregatesFilter<"Destination"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Destination"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Destination"> | Date | string
  }

  export type RoutingRuleWhereInput = {
    AND?: RoutingRuleWhereInput | RoutingRuleWhereInput[]
    OR?: RoutingRuleWhereInput[]
    NOT?: RoutingRuleWhereInput | RoutingRuleWhereInput[]
    id?: UuidFilter<"RoutingRule"> | string
    account_id?: UuidFilter<"RoutingRule"> | string
    destination_id?: UuidFilter<"RoutingRule"> | string
    folder_path?: StringFilter<"RoutingRule"> | string
    filename_pattern?: StringFilter<"RoutingRule"> | string
    active?: BoolFilter<"RoutingRule"> | boolean
    created_at?: DateTimeFilter<"RoutingRule"> | Date | string
    updated_at?: DateTimeFilter<"RoutingRule"> | Date | string
    account?: XOR<AccountRelationFilter, AccountWhereInput>
    destination?: XOR<DestinationRelationFilter, DestinationWhereInput>
  }

  export type RoutingRuleOrderByWithRelationInput = {
    id?: SortOrder
    account_id?: SortOrder
    destination_id?: SortOrder
    folder_path?: SortOrder
    filename_pattern?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    account?: AccountOrderByWithRelationInput
    destination?: DestinationOrderByWithRelationInput
  }

  export type RoutingRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    account_id_destination_id?: RoutingRuleAccount_idDestination_idCompoundUniqueInput
    AND?: RoutingRuleWhereInput | RoutingRuleWhereInput[]
    OR?: RoutingRuleWhereInput[]
    NOT?: RoutingRuleWhereInput | RoutingRuleWhereInput[]
    account_id?: UuidFilter<"RoutingRule"> | string
    destination_id?: UuidFilter<"RoutingRule"> | string
    folder_path?: StringFilter<"RoutingRule"> | string
    filename_pattern?: StringFilter<"RoutingRule"> | string
    active?: BoolFilter<"RoutingRule"> | boolean
    created_at?: DateTimeFilter<"RoutingRule"> | Date | string
    updated_at?: DateTimeFilter<"RoutingRule"> | Date | string
    account?: XOR<AccountRelationFilter, AccountWhereInput>
    destination?: XOR<DestinationRelationFilter, DestinationWhereInput>
  }, "id" | "account_id_destination_id">

  export type RoutingRuleOrderByWithAggregationInput = {
    id?: SortOrder
    account_id?: SortOrder
    destination_id?: SortOrder
    folder_path?: SortOrder
    filename_pattern?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: RoutingRuleCountOrderByAggregateInput
    _max?: RoutingRuleMaxOrderByAggregateInput
    _min?: RoutingRuleMinOrderByAggregateInput
  }

  export type RoutingRuleScalarWhereWithAggregatesInput = {
    AND?: RoutingRuleScalarWhereWithAggregatesInput | RoutingRuleScalarWhereWithAggregatesInput[]
    OR?: RoutingRuleScalarWhereWithAggregatesInput[]
    NOT?: RoutingRuleScalarWhereWithAggregatesInput | RoutingRuleScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RoutingRule"> | string
    account_id?: UuidWithAggregatesFilter<"RoutingRule"> | string
    destination_id?: UuidWithAggregatesFilter<"RoutingRule"> | string
    folder_path?: StringWithAggregatesFilter<"RoutingRule"> | string
    filename_pattern?: StringWithAggregatesFilter<"RoutingRule"> | string
    active?: BoolWithAggregatesFilter<"RoutingRule"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"RoutingRule"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"RoutingRule"> | Date | string
  }

  export type DeliveryWhereInput = {
    AND?: DeliveryWhereInput | DeliveryWhereInput[]
    OR?: DeliveryWhereInput[]
    NOT?: DeliveryWhereInput | DeliveryWhereInput[]
    id?: UuidFilter<"Delivery"> | string
    statement_id?: UuidFilter<"Delivery"> | string
    destination_id?: UuidFilter<"Delivery"> | string
    status?: StringFilter<"Delivery"> | string
    path?: StringNullableFilter<"Delivery"> | string | null
    delivered_at?: DateTimeNullableFilter<"Delivery"> | Date | string | null
    attempts?: IntFilter<"Delivery"> | number
    last_error?: StringNullableFilter<"Delivery"> | string | null
    request_id?: StringFilter<"Delivery"> | string
    created_at?: DateTimeFilter<"Delivery"> | Date | string
    updated_at?: DateTimeFilter<"Delivery"> | Date | string
    statement?: XOR<StatementRelationFilter, StatementWhereInput>
    destination?: XOR<DestinationRelationFilter, DestinationWhereInput>
  }

  export type DeliveryOrderByWithRelationInput = {
    id?: SortOrder
    statement_id?: SortOrder
    destination_id?: SortOrder
    status?: SortOrder
    path?: SortOrderInput | SortOrder
    delivered_at?: SortOrderInput | SortOrder
    attempts?: SortOrder
    last_error?: SortOrderInput | SortOrder
    request_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    statement?: StatementOrderByWithRelationInput
    destination?: DestinationOrderByWithRelationInput
  }

  export type DeliveryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    request_id?: string
    AND?: DeliveryWhereInput | DeliveryWhereInput[]
    OR?: DeliveryWhereInput[]
    NOT?: DeliveryWhereInput | DeliveryWhereInput[]
    statement_id?: UuidFilter<"Delivery"> | string
    destination_id?: UuidFilter<"Delivery"> | string
    status?: StringFilter<"Delivery"> | string
    path?: StringNullableFilter<"Delivery"> | string | null
    delivered_at?: DateTimeNullableFilter<"Delivery"> | Date | string | null
    attempts?: IntFilter<"Delivery"> | number
    last_error?: StringNullableFilter<"Delivery"> | string | null
    created_at?: DateTimeFilter<"Delivery"> | Date | string
    updated_at?: DateTimeFilter<"Delivery"> | Date | string
    statement?: XOR<StatementRelationFilter, StatementWhereInput>
    destination?: XOR<DestinationRelationFilter, DestinationWhereInput>
  }, "id" | "request_id">

  export type DeliveryOrderByWithAggregationInput = {
    id?: SortOrder
    statement_id?: SortOrder
    destination_id?: SortOrder
    status?: SortOrder
    path?: SortOrderInput | SortOrder
    delivered_at?: SortOrderInput | SortOrder
    attempts?: SortOrder
    last_error?: SortOrderInput | SortOrder
    request_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: DeliveryCountOrderByAggregateInput
    _avg?: DeliveryAvgOrderByAggregateInput
    _max?: DeliveryMaxOrderByAggregateInput
    _min?: DeliveryMinOrderByAggregateInput
    _sum?: DeliverySumOrderByAggregateInput
  }

  export type DeliveryScalarWhereWithAggregatesInput = {
    AND?: DeliveryScalarWhereWithAggregatesInput | DeliveryScalarWhereWithAggregatesInput[]
    OR?: DeliveryScalarWhereWithAggregatesInput[]
    NOT?: DeliveryScalarWhereWithAggregatesInput | DeliveryScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Delivery"> | string
    statement_id?: UuidWithAggregatesFilter<"Delivery"> | string
    destination_id?: UuidWithAggregatesFilter<"Delivery"> | string
    status?: StringWithAggregatesFilter<"Delivery"> | string
    path?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    delivered_at?: DateTimeNullableWithAggregatesFilter<"Delivery"> | Date | string | null
    attempts?: IntWithAggregatesFilter<"Delivery"> | number
    last_error?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    request_id?: StringWithAggregatesFilter<"Delivery"> | string
    created_at?: DateTimeWithAggregatesFilter<"Delivery"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Delivery"> | Date | string
  }

  export type WebhookEndpointWhereInput = {
    AND?: WebhookEndpointWhereInput | WebhookEndpointWhereInput[]
    OR?: WebhookEndpointWhereInput[]
    NOT?: WebhookEndpointWhereInput | WebhookEndpointWhereInput[]
    id?: UuidFilter<"WebhookEndpoint"> | string
    org_id?: UuidFilter<"WebhookEndpoint"> | string
    url?: StringFilter<"WebhookEndpoint"> | string
    secret_ref?: StringFilter<"WebhookEndpoint"> | string
    active?: BoolFilter<"WebhookEndpoint"> | boolean
    last_success_at?: DateTimeNullableFilter<"WebhookEndpoint"> | Date | string | null
    created_at?: DateTimeFilter<"WebhookEndpoint"> | Date | string
    updated_at?: DateTimeFilter<"WebhookEndpoint"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
  }

  export type WebhookEndpointOrderByWithRelationInput = {
    id?: SortOrder
    org_id?: SortOrder
    url?: SortOrder
    secret_ref?: SortOrder
    active?: SortOrder
    last_success_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
  }

  export type WebhookEndpointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebhookEndpointWhereInput | WebhookEndpointWhereInput[]
    OR?: WebhookEndpointWhereInput[]
    NOT?: WebhookEndpointWhereInput | WebhookEndpointWhereInput[]
    org_id?: UuidFilter<"WebhookEndpoint"> | string
    url?: StringFilter<"WebhookEndpoint"> | string
    secret_ref?: StringFilter<"WebhookEndpoint"> | string
    active?: BoolFilter<"WebhookEndpoint"> | boolean
    last_success_at?: DateTimeNullableFilter<"WebhookEndpoint"> | Date | string | null
    created_at?: DateTimeFilter<"WebhookEndpoint"> | Date | string
    updated_at?: DateTimeFilter<"WebhookEndpoint"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
  }, "id">

  export type WebhookEndpointOrderByWithAggregationInput = {
    id?: SortOrder
    org_id?: SortOrder
    url?: SortOrder
    secret_ref?: SortOrder
    active?: SortOrder
    last_success_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: WebhookEndpointCountOrderByAggregateInput
    _max?: WebhookEndpointMaxOrderByAggregateInput
    _min?: WebhookEndpointMinOrderByAggregateInput
  }

  export type WebhookEndpointScalarWhereWithAggregatesInput = {
    AND?: WebhookEndpointScalarWhereWithAggregatesInput | WebhookEndpointScalarWhereWithAggregatesInput[]
    OR?: WebhookEndpointScalarWhereWithAggregatesInput[]
    NOT?: WebhookEndpointScalarWhereWithAggregatesInput | WebhookEndpointScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"WebhookEndpoint"> | string
    org_id?: UuidWithAggregatesFilter<"WebhookEndpoint"> | string
    url?: StringWithAggregatesFilter<"WebhookEndpoint"> | string
    secret_ref?: StringWithAggregatesFilter<"WebhookEndpoint"> | string
    active?: BoolWithAggregatesFilter<"WebhookEndpoint"> | boolean
    last_success_at?: DateTimeNullableWithAggregatesFilter<"WebhookEndpoint"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"WebhookEndpoint"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"WebhookEndpoint"> | Date | string
  }

  export type OAuthTokenWhereInput = {
    AND?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    OR?: OAuthTokenWhereInput[]
    NOT?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    id?: UuidFilter<"OAuthToken"> | string
    org_id?: UuidNullableFilter<"OAuthToken"> | string | null
    user_id?: UuidNullableFilter<"OAuthToken"> | string | null
    provider?: StringFilter<"OAuthToken"> | string
    scopes?: StringNullableListFilter<"OAuthToken">
    expires_at?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    enc_payload?: StringFilter<"OAuthToken"> | string
    created_at?: DateTimeFilter<"OAuthToken"> | Date | string
    updated_at?: DateTimeFilter<"OAuthToken"> | Date | string
    organization?: XOR<OrganizationNullableRelationFilter, OrganizationWhereInput> | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type OAuthTokenOrderByWithRelationInput = {
    id?: SortOrder
    org_id?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    provider?: SortOrder
    scopes?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    enc_payload?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type OAuthTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    OR?: OAuthTokenWhereInput[]
    NOT?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    org_id?: UuidNullableFilter<"OAuthToken"> | string | null
    user_id?: UuidNullableFilter<"OAuthToken"> | string | null
    provider?: StringFilter<"OAuthToken"> | string
    scopes?: StringNullableListFilter<"OAuthToken">
    expires_at?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    enc_payload?: StringFilter<"OAuthToken"> | string
    created_at?: DateTimeFilter<"OAuthToken"> | Date | string
    updated_at?: DateTimeFilter<"OAuthToken"> | Date | string
    organization?: XOR<OrganizationNullableRelationFilter, OrganizationWhereInput> | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type OAuthTokenOrderByWithAggregationInput = {
    id?: SortOrder
    org_id?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    provider?: SortOrder
    scopes?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    enc_payload?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: OAuthTokenCountOrderByAggregateInput
    _max?: OAuthTokenMaxOrderByAggregateInput
    _min?: OAuthTokenMinOrderByAggregateInput
  }

  export type OAuthTokenScalarWhereWithAggregatesInput = {
    AND?: OAuthTokenScalarWhereWithAggregatesInput | OAuthTokenScalarWhereWithAggregatesInput[]
    OR?: OAuthTokenScalarWhereWithAggregatesInput[]
    NOT?: OAuthTokenScalarWhereWithAggregatesInput | OAuthTokenScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"OAuthToken"> | string
    org_id?: UuidNullableWithAggregatesFilter<"OAuthToken"> | string | null
    user_id?: UuidNullableWithAggregatesFilter<"OAuthToken"> | string | null
    provider?: StringWithAggregatesFilter<"OAuthToken"> | string
    scopes?: StringNullableListFilter<"OAuthToken">
    expires_at?: DateTimeNullableWithAggregatesFilter<"OAuthToken"> | Date | string | null
    enc_payload?: StringWithAggregatesFilter<"OAuthToken"> | string
    created_at?: DateTimeWithAggregatesFilter<"OAuthToken"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"OAuthToken"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: UuidFilter<"AuditLog"> | string
    org_id?: UuidFilter<"AuditLog"> | string
    user_id?: UuidNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    target_id?: StringNullableFilter<"AuditLog"> | string | null
    meta_json?: JsonNullableFilter<"AuditLog">
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    org_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    action?: SortOrder
    target_id?: SortOrderInput | SortOrder
    meta_json?: SortOrderInput | SortOrder
    created_at?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    org_id?: UuidFilter<"AuditLog"> | string
    user_id?: UuidNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    target_id?: StringNullableFilter<"AuditLog"> | string | null
    meta_json?: JsonNullableFilter<"AuditLog">
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    org_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    action?: SortOrder
    target_id?: SortOrderInput | SortOrder
    meta_json?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AuditLog"> | string
    org_id?: UuidWithAggregatesFilter<"AuditLog"> | string
    user_id?: UuidNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    target_id?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    meta_json?: JsonNullableWithAggregatesFilter<"AuditLog">
    created_at?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type BackfillJobWhereInput = {
    AND?: BackfillJobWhereInput | BackfillJobWhereInput[]
    OR?: BackfillJobWhereInput[]
    NOT?: BackfillJobWhereInput | BackfillJobWhereInput[]
    id?: UuidFilter<"BackfillJob"> | string
    org_id?: UuidFilter<"BackfillJob"> | string
    account_id?: UuidFilter<"BackfillJob"> | string
    range_start?: DateTimeFilter<"BackfillJob"> | Date | string
    range_end?: DateTimeFilter<"BackfillJob"> | Date | string
    status?: StringFilter<"BackfillJob"> | string
    progress?: JsonNullableFilter<"BackfillJob">
    created_at?: DateTimeFilter<"BackfillJob"> | Date | string
    updated_at?: DateTimeFilter<"BackfillJob"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    account?: XOR<AccountRelationFilter, AccountWhereInput>
  }

  export type BackfillJobOrderByWithRelationInput = {
    id?: SortOrder
    org_id?: SortOrder
    account_id?: SortOrder
    range_start?: SortOrder
    range_end?: SortOrder
    status?: SortOrder
    progress?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    account?: AccountOrderByWithRelationInput
  }

  export type BackfillJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BackfillJobWhereInput | BackfillJobWhereInput[]
    OR?: BackfillJobWhereInput[]
    NOT?: BackfillJobWhereInput | BackfillJobWhereInput[]
    org_id?: UuidFilter<"BackfillJob"> | string
    account_id?: UuidFilter<"BackfillJob"> | string
    range_start?: DateTimeFilter<"BackfillJob"> | Date | string
    range_end?: DateTimeFilter<"BackfillJob"> | Date | string
    status?: StringFilter<"BackfillJob"> | string
    progress?: JsonNullableFilter<"BackfillJob">
    created_at?: DateTimeFilter<"BackfillJob"> | Date | string
    updated_at?: DateTimeFilter<"BackfillJob"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    account?: XOR<AccountRelationFilter, AccountWhereInput>
  }, "id">

  export type BackfillJobOrderByWithAggregationInput = {
    id?: SortOrder
    org_id?: SortOrder
    account_id?: SortOrder
    range_start?: SortOrder
    range_end?: SortOrder
    status?: SortOrder
    progress?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: BackfillJobCountOrderByAggregateInput
    _max?: BackfillJobMaxOrderByAggregateInput
    _min?: BackfillJobMinOrderByAggregateInput
  }

  export type BackfillJobScalarWhereWithAggregatesInput = {
    AND?: BackfillJobScalarWhereWithAggregatesInput | BackfillJobScalarWhereWithAggregatesInput[]
    OR?: BackfillJobScalarWhereWithAggregatesInput[]
    NOT?: BackfillJobScalarWhereWithAggregatesInput | BackfillJobScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"BackfillJob"> | string
    org_id?: UuidWithAggregatesFilter<"BackfillJob"> | string
    account_id?: UuidWithAggregatesFilter<"BackfillJob"> | string
    range_start?: DateTimeWithAggregatesFilter<"BackfillJob"> | Date | string
    range_end?: DateTimeWithAggregatesFilter<"BackfillJob"> | Date | string
    status?: StringWithAggregatesFilter<"BackfillJob"> | string
    progress?: JsonNullableWithAggregatesFilter<"BackfillJob">
    created_at?: DateTimeWithAggregatesFilter<"BackfillJob"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"BackfillJob"> | Date | string
  }

  export type NotificationPreferenceWhereInput = {
    AND?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    OR?: NotificationPreferenceWhereInput[]
    NOT?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    id?: UuidFilter<"NotificationPreference"> | string
    account_id?: UuidFilter<"NotificationPreference"> | string
    channel?: StringFilter<"NotificationPreference"> | string
    event_type?: StringFilter<"NotificationPreference"> | string
    enabled?: BoolFilter<"NotificationPreference"> | boolean
    created_at?: DateTimeFilter<"NotificationPreference"> | Date | string
    updated_at?: DateTimeFilter<"NotificationPreference"> | Date | string
    account?: XOR<AccountRelationFilter, AccountWhereInput>
  }

  export type NotificationPreferenceOrderByWithRelationInput = {
    id?: SortOrder
    account_id?: SortOrder
    channel?: SortOrder
    event_type?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    account?: AccountOrderByWithRelationInput
  }

  export type NotificationPreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    account_id_channel_event_type?: NotificationPreferenceAccount_idChannelEvent_typeCompoundUniqueInput
    AND?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    OR?: NotificationPreferenceWhereInput[]
    NOT?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    account_id?: UuidFilter<"NotificationPreference"> | string
    channel?: StringFilter<"NotificationPreference"> | string
    event_type?: StringFilter<"NotificationPreference"> | string
    enabled?: BoolFilter<"NotificationPreference"> | boolean
    created_at?: DateTimeFilter<"NotificationPreference"> | Date | string
    updated_at?: DateTimeFilter<"NotificationPreference"> | Date | string
    account?: XOR<AccountRelationFilter, AccountWhereInput>
  }, "id" | "account_id_channel_event_type">

  export type NotificationPreferenceOrderByWithAggregationInput = {
    id?: SortOrder
    account_id?: SortOrder
    channel?: SortOrder
    event_type?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: NotificationPreferenceCountOrderByAggregateInput
    _max?: NotificationPreferenceMaxOrderByAggregateInput
    _min?: NotificationPreferenceMinOrderByAggregateInput
  }

  export type NotificationPreferenceScalarWhereWithAggregatesInput = {
    AND?: NotificationPreferenceScalarWhereWithAggregatesInput | NotificationPreferenceScalarWhereWithAggregatesInput[]
    OR?: NotificationPreferenceScalarWhereWithAggregatesInput[]
    NOT?: NotificationPreferenceScalarWhereWithAggregatesInput | NotificationPreferenceScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"NotificationPreference"> | string
    account_id?: UuidWithAggregatesFilter<"NotificationPreference"> | string
    channel?: StringWithAggregatesFilter<"NotificationPreference"> | string
    event_type?: StringWithAggregatesFilter<"NotificationPreference"> | string
    enabled?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"NotificationPreference"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"NotificationPreference"> | Date | string
  }

  export type OrganizationCreateInput = {
    id?: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    owner: UserCreateNestedOneWithoutOwned_orgsInput
    users?: UserCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    owner_user_id: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionUncheckedCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationUncheckedCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointUncheckedCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenUncheckedCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwned_orgsNestedInput
    users?: UserUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    owner_user_id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUncheckedUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUncheckedUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUncheckedUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUncheckedUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    owner_user_id: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    owner_user_id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password_hash?: string | null
    oidc_provider?: string | null
    mfa_enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutUsersInput
    owned_orgs?: OrganizationCreateNestedManyWithoutOwnerInput
    oauth_tokens?: OAuthTokenCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    org_id: string
    email: string
    password_hash?: string | null
    oidc_provider?: string | null
    mfa_enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    owned_orgs?: OrganizationUncheckedCreateNestedManyWithoutOwnerInput
    oauth_tokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    oidc_provider?: NullableStringFieldUpdateOperationsInput | string | null
    mfa_enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    owned_orgs?: OrganizationUpdateManyWithoutOwnerNestedInput
    oauth_tokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    oidc_provider?: NullableStringFieldUpdateOperationsInput | string | null
    mfa_enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    owned_orgs?: OrganizationUncheckedUpdateManyWithoutOwnerNestedInput
    oauth_tokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    org_id: string
    email: string
    password_hash?: string | null
    oidc_provider?: string | null
    mfa_enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    oidc_provider?: NullableStringFieldUpdateOperationsInput | string | null
    mfa_enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    oidc_provider?: NullableStringFieldUpdateOperationsInput | string | null
    mfa_enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionCreateInput = {
    id?: string
    plaid_item_id: string
    institution: string
    status?: string
    last_reauth_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutConnectionsInput
    accounts?: AccountCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateInput = {
    id?: string
    org_id: string
    plaid_item_id: string
    institution: string
    status?: string
    last_reauth_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_item_id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    last_reauth_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutConnectionsNestedInput
    accounts?: AccountUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    plaid_item_id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    last_reauth_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionCreateManyInput = {
    id?: string
    org_id: string
    plaid_item_id: string
    institution: string
    status?: string
    last_reauth_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ConnectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_item_id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    last_reauth_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    plaid_item_id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    last_reauth_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    connection: ConnectionCreateNestedOneWithoutAccountsInput
    statements?: StatementCreateNestedManyWithoutAccountInput
    routing_rules?: RoutingRuleCreateNestedManyWithoutAccountInput
    notification_preferences?: NotificationPreferenceCreateNestedManyWithoutAccountInput
    backfill_jobs?: BackfillJobCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    connection_id: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    statements?: StatementUncheckedCreateNestedManyWithoutAccountInput
    routing_rules?: RoutingRuleUncheckedCreateNestedManyWithoutAccountInput
    notification_preferences?: NotificationPreferenceUncheckedCreateNestedManyWithoutAccountInput
    backfill_jobs?: BackfillJobUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneRequiredWithoutAccountsNestedInput
    statements?: StatementUpdateManyWithoutAccountNestedInput
    routing_rules?: RoutingRuleUpdateManyWithoutAccountNestedInput
    notification_preferences?: NotificationPreferenceUpdateManyWithoutAccountNestedInput
    backfill_jobs?: BackfillJobUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    connection_id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUncheckedUpdateManyWithoutAccountNestedInput
    routing_rules?: RoutingRuleUncheckedUpdateManyWithoutAccountNestedInput
    notification_preferences?: NotificationPreferenceUncheckedUpdateManyWithoutAccountNestedInput
    backfill_jobs?: BackfillJobUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountCreateManyInput = {
    id?: string
    connection_id: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    connection_id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatementCreateInput = {
    id?: string
    period_start: Date | string
    period_end: Date | string
    statement_date: Date | string
    file_type: string
    checksum: string
    version?: number
    retrieved_at?: Date | string
    created_at?: Date | string
    account: AccountCreateNestedOneWithoutStatementsInput
    deliveries?: DeliveryCreateNestedManyWithoutStatementInput
  }

  export type StatementUncheckedCreateInput = {
    id?: string
    account_id: string
    period_start: Date | string
    period_end: Date | string
    statement_date: Date | string
    file_type: string
    checksum: string
    version?: number
    retrieved_at?: Date | string
    created_at?: Date | string
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutStatementInput
  }

  export type StatementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    period_end?: DateTimeFieldUpdateOperationsInput | Date | string
    statement_date?: DateTimeFieldUpdateOperationsInput | Date | string
    file_type?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    retrieved_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutStatementsNestedInput
    deliveries?: DeliveryUpdateManyWithoutStatementNestedInput
  }

  export type StatementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    period_end?: DateTimeFieldUpdateOperationsInput | Date | string
    statement_date?: DateTimeFieldUpdateOperationsInput | Date | string
    file_type?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    retrieved_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryUncheckedUpdateManyWithoutStatementNestedInput
  }

  export type StatementCreateManyInput = {
    id?: string
    account_id: string
    period_start: Date | string
    period_end: Date | string
    statement_date: Date | string
    file_type: string
    checksum: string
    version?: number
    retrieved_at?: Date | string
    created_at?: Date | string
  }

  export type StatementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    period_end?: DateTimeFieldUpdateOperationsInput | Date | string
    statement_date?: DateTimeFieldUpdateOperationsInput | Date | string
    file_type?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    retrieved_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    period_end?: DateTimeFieldUpdateOperationsInput | Date | string
    statement_date?: DateTimeFieldUpdateOperationsInput | Date | string
    file_type?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    retrieved_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DestinationCreateInput = {
    id?: string
    kind: string
    name: string
    config_json: JsonNullValueInput | InputJsonValue
    secret_ref?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutDestinationsInput
    routing_rules?: RoutingRuleCreateNestedManyWithoutDestinationInput
    deliveries?: DeliveryCreateNestedManyWithoutDestinationInput
  }

  export type DestinationUncheckedCreateInput = {
    id?: string
    org_id: string
    kind: string
    name: string
    config_json: JsonNullValueInput | InputJsonValue
    secret_ref?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    routing_rules?: RoutingRuleUncheckedCreateNestedManyWithoutDestinationInput
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutDestinationInput
  }

  export type DestinationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    config_json?: JsonNullValueInput | InputJsonValue
    secret_ref?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutDestinationsNestedInput
    routing_rules?: RoutingRuleUpdateManyWithoutDestinationNestedInput
    deliveries?: DeliveryUpdateManyWithoutDestinationNestedInput
  }

  export type DestinationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    config_json?: JsonNullValueInput | InputJsonValue
    secret_ref?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    routing_rules?: RoutingRuleUncheckedUpdateManyWithoutDestinationNestedInput
    deliveries?: DeliveryUncheckedUpdateManyWithoutDestinationNestedInput
  }

  export type DestinationCreateManyInput = {
    id?: string
    org_id: string
    kind: string
    name: string
    config_json: JsonNullValueInput | InputJsonValue
    secret_ref?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DestinationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    config_json?: JsonNullValueInput | InputJsonValue
    secret_ref?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DestinationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    config_json?: JsonNullValueInput | InputJsonValue
    secret_ref?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingRuleCreateInput = {
    id?: string
    folder_path?: string
    filename_pattern?: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    account: AccountCreateNestedOneWithoutRouting_rulesInput
    destination: DestinationCreateNestedOneWithoutRouting_rulesInput
  }

  export type RoutingRuleUncheckedCreateInput = {
    id?: string
    account_id: string
    destination_id: string
    folder_path?: string
    filename_pattern?: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RoutingRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    folder_path?: StringFieldUpdateOperationsInput | string
    filename_pattern?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutRouting_rulesNestedInput
    destination?: DestinationUpdateOneRequiredWithoutRouting_rulesNestedInput
  }

  export type RoutingRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    destination_id?: StringFieldUpdateOperationsInput | string
    folder_path?: StringFieldUpdateOperationsInput | string
    filename_pattern?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingRuleCreateManyInput = {
    id?: string
    account_id: string
    destination_id: string
    folder_path?: string
    filename_pattern?: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RoutingRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    folder_path?: StringFieldUpdateOperationsInput | string
    filename_pattern?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    destination_id?: StringFieldUpdateOperationsInput | string
    folder_path?: StringFieldUpdateOperationsInput | string
    filename_pattern?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryCreateInput = {
    id?: string
    status?: string
    path?: string | null
    delivered_at?: Date | string | null
    attempts?: number
    last_error?: string | null
    request_id: string
    created_at?: Date | string
    updated_at?: Date | string
    statement: StatementCreateNestedOneWithoutDeliveriesInput
    destination: DestinationCreateNestedOneWithoutDeliveriesInput
  }

  export type DeliveryUncheckedCreateInput = {
    id?: string
    statement_id: string
    destination_id: string
    status?: string
    path?: string | null
    delivered_at?: Date | string | null
    attempts?: number
    last_error?: string | null
    request_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DeliveryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    delivered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
    request_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    statement?: StatementUpdateOneRequiredWithoutDeliveriesNestedInput
    destination?: DestinationUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type DeliveryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    statement_id?: StringFieldUpdateOperationsInput | string
    destination_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    delivered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
    request_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryCreateManyInput = {
    id?: string
    statement_id: string
    destination_id: string
    status?: string
    path?: string | null
    delivered_at?: Date | string | null
    attempts?: number
    last_error?: string | null
    request_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DeliveryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    delivered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
    request_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    statement_id?: StringFieldUpdateOperationsInput | string
    destination_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    delivered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
    request_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEndpointCreateInput = {
    id?: string
    url: string
    secret_ref: string
    active?: boolean
    last_success_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutWebhook_endpointsInput
  }

  export type WebhookEndpointUncheckedCreateInput = {
    id?: string
    org_id: string
    url: string
    secret_ref: string
    active?: boolean
    last_success_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WebhookEndpointUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret_ref?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    last_success_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutWebhook_endpointsNestedInput
  }

  export type WebhookEndpointUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret_ref?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    last_success_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEndpointCreateManyInput = {
    id?: string
    org_id: string
    url: string
    secret_ref: string
    active?: boolean
    last_success_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WebhookEndpointUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret_ref?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    last_success_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEndpointUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret_ref?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    last_success_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenCreateInput = {
    id?: string
    provider: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    expires_at?: Date | string | null
    enc_payload: string
    created_at?: Date | string
    updated_at?: Date | string
    organization?: OrganizationCreateNestedOneWithoutOauth_tokensInput
    user?: UserCreateNestedOneWithoutOauth_tokensInput
  }

  export type OAuthTokenUncheckedCreateInput = {
    id?: string
    org_id?: string | null
    user_id?: string | null
    provider: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    expires_at?: Date | string | null
    enc_payload: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OAuthTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enc_payload?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutOauth_tokensNestedInput
    user?: UserUpdateOneWithoutOauth_tokensNestedInput
  }

  export type OAuthTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enc_payload?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenCreateManyInput = {
    id?: string
    org_id?: string | null
    user_id?: string | null
    provider: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    expires_at?: Date | string | null
    enc_payload: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OAuthTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enc_payload?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enc_payload?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    target_id?: string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutAudit_logsInput
    user?: UserCreateNestedOneWithoutAudit_logsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    org_id: string
    user_id?: string | null
    action: string
    target_id?: string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutAudit_logsNestedInput
    user?: UserUpdateOneWithoutAudit_logsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    org_id: string
    user_id?: string | null
    action: string
    target_id?: string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackfillJobCreateInput = {
    id?: string
    range_start: Date | string
    range_end: Date | string
    status?: string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutBackfill_jobsInput
    account: AccountCreateNestedOneWithoutBackfill_jobsInput
  }

  export type BackfillJobUncheckedCreateInput = {
    id?: string
    org_id: string
    account_id: string
    range_start: Date | string
    range_end: Date | string
    status?: string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BackfillJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    range_start?: DateTimeFieldUpdateOperationsInput | Date | string
    range_end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutBackfill_jobsNestedInput
    account?: AccountUpdateOneRequiredWithoutBackfill_jobsNestedInput
  }

  export type BackfillJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    range_start?: DateTimeFieldUpdateOperationsInput | Date | string
    range_end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackfillJobCreateManyInput = {
    id?: string
    org_id: string
    account_id: string
    range_start: Date | string
    range_end: Date | string
    status?: string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BackfillJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    range_start?: DateTimeFieldUpdateOperationsInput | Date | string
    range_end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackfillJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    range_start?: DateTimeFieldUpdateOperationsInput | Date | string
    range_end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceCreateInput = {
    id?: string
    channel: string
    event_type: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    account: AccountCreateNestedOneWithoutNotification_preferencesInput
  }

  export type NotificationPreferenceUncheckedCreateInput = {
    id?: string
    account_id: string
    channel: string
    event_type: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type NotificationPreferenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutNotification_preferencesNestedInput
  }

  export type NotificationPreferenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceCreateManyInput = {
    id?: string
    account_id: string
    channel: string
    event_type: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type NotificationPreferenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type ConnectionListRelationFilter = {
    every?: ConnectionWhereInput
    some?: ConnectionWhereInput
    none?: ConnectionWhereInput
  }

  export type DestinationListRelationFilter = {
    every?: DestinationWhereInput
    some?: DestinationWhereInput
    none?: DestinationWhereInput
  }

  export type WebhookEndpointListRelationFilter = {
    every?: WebhookEndpointWhereInput
    some?: WebhookEndpointWhereInput
    none?: WebhookEndpointWhereInput
  }

  export type OAuthTokenListRelationFilter = {
    every?: OAuthTokenWhereInput
    some?: OAuthTokenWhereInput
    none?: OAuthTokenWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type BackfillJobListRelationFilter = {
    every?: BackfillJobWhereInput
    some?: BackfillJobWhereInput
    none?: BackfillJobWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConnectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DestinationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebhookEndpointOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OAuthTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BackfillJobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    owner_user_id?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    owner_user_id?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    owner_user_id?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OrganizationRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type OrganizationListRelationFilter = {
    every?: OrganizationWhereInput
    some?: OrganizationWhereInput
    none?: OrganizationWhereInput
  }

  export type OrganizationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    oidc_provider?: SortOrder
    mfa_enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    oidc_provider?: SortOrder
    mfa_enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    oidc_provider?: SortOrder
    mfa_enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConnectionCountOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    plaid_item_id?: SortOrder
    institution?: SortOrder
    status?: SortOrder
    last_reauth_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ConnectionMaxOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    plaid_item_id?: SortOrder
    institution?: SortOrder
    status?: SortOrder
    last_reauth_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ConnectionMinOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    plaid_item_id?: SortOrder
    institution?: SortOrder
    status?: SortOrder
    last_reauth_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ConnectionRelationFilter = {
    is?: ConnectionWhereInput
    isNot?: ConnectionWhereInput
  }

  export type StatementListRelationFilter = {
    every?: StatementWhereInput
    some?: StatementWhereInput
    none?: StatementWhereInput
  }

  export type RoutingRuleListRelationFilter = {
    every?: RoutingRuleWhereInput
    some?: RoutingRuleWhereInput
    none?: RoutingRuleWhereInput
  }

  export type NotificationPreferenceListRelationFilter = {
    every?: NotificationPreferenceWhereInput
    some?: NotificationPreferenceWhereInput
    none?: NotificationPreferenceWhereInput
  }

  export type StatementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoutingRuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationPreferenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    connection_id?: SortOrder
    plaid_account_id?: SortOrder
    account_last4?: SortOrder
    account_name?: SortOrder
    type?: SortOrder
    statements_supported?: SortOrder
    learned_schedule_json?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    connection_id?: SortOrder
    plaid_account_id?: SortOrder
    account_last4?: SortOrder
    account_name?: SortOrder
    type?: SortOrder
    statements_supported?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    connection_id?: SortOrder
    plaid_account_id?: SortOrder
    account_last4?: SortOrder
    account_name?: SortOrder
    type?: SortOrder
    statements_supported?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type AccountRelationFilter = {
    is?: AccountWhereInput
    isNot?: AccountWhereInput
  }

  export type DeliveryListRelationFilter = {
    every?: DeliveryWhereInput
    some?: DeliveryWhereInput
    none?: DeliveryWhereInput
  }

  export type DeliveryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StatementAccount_idPeriod_endFile_typeVersionCompoundUniqueInput = {
    account_id: string
    period_end: Date | string
    file_type: string
    version: number
  }

  export type StatementCountOrderByAggregateInput = {
    id?: SortOrder
    account_id?: SortOrder
    period_start?: SortOrder
    period_end?: SortOrder
    statement_date?: SortOrder
    file_type?: SortOrder
    checksum?: SortOrder
    version?: SortOrder
    retrieved_at?: SortOrder
    created_at?: SortOrder
  }

  export type StatementAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type StatementMaxOrderByAggregateInput = {
    id?: SortOrder
    account_id?: SortOrder
    period_start?: SortOrder
    period_end?: SortOrder
    statement_date?: SortOrder
    file_type?: SortOrder
    checksum?: SortOrder
    version?: SortOrder
    retrieved_at?: SortOrder
    created_at?: SortOrder
  }

  export type StatementMinOrderByAggregateInput = {
    id?: SortOrder
    account_id?: SortOrder
    period_start?: SortOrder
    period_end?: SortOrder
    statement_date?: SortOrder
    file_type?: SortOrder
    checksum?: SortOrder
    version?: SortOrder
    retrieved_at?: SortOrder
    created_at?: SortOrder
  }

  export type StatementSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DestinationCountOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    kind?: SortOrder
    name?: SortOrder
    config_json?: SortOrder
    secret_ref?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DestinationMaxOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    kind?: SortOrder
    name?: SortOrder
    secret_ref?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DestinationMinOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    kind?: SortOrder
    name?: SortOrder
    secret_ref?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DestinationRelationFilter = {
    is?: DestinationWhereInput
    isNot?: DestinationWhereInput
  }

  export type RoutingRuleAccount_idDestination_idCompoundUniqueInput = {
    account_id: string
    destination_id: string
  }

  export type RoutingRuleCountOrderByAggregateInput = {
    id?: SortOrder
    account_id?: SortOrder
    destination_id?: SortOrder
    folder_path?: SortOrder
    filename_pattern?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RoutingRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    account_id?: SortOrder
    destination_id?: SortOrder
    folder_path?: SortOrder
    filename_pattern?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RoutingRuleMinOrderByAggregateInput = {
    id?: SortOrder
    account_id?: SortOrder
    destination_id?: SortOrder
    folder_path?: SortOrder
    filename_pattern?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StatementRelationFilter = {
    is?: StatementWhereInput
    isNot?: StatementWhereInput
  }

  export type DeliveryCountOrderByAggregateInput = {
    id?: SortOrder
    statement_id?: SortOrder
    destination_id?: SortOrder
    status?: SortOrder
    path?: SortOrder
    delivered_at?: SortOrder
    attempts?: SortOrder
    last_error?: SortOrder
    request_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DeliveryAvgOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type DeliveryMaxOrderByAggregateInput = {
    id?: SortOrder
    statement_id?: SortOrder
    destination_id?: SortOrder
    status?: SortOrder
    path?: SortOrder
    delivered_at?: SortOrder
    attempts?: SortOrder
    last_error?: SortOrder
    request_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DeliveryMinOrderByAggregateInput = {
    id?: SortOrder
    statement_id?: SortOrder
    destination_id?: SortOrder
    status?: SortOrder
    path?: SortOrder
    delivered_at?: SortOrder
    attempts?: SortOrder
    last_error?: SortOrder
    request_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DeliverySumOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type WebhookEndpointCountOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    url?: SortOrder
    secret_ref?: SortOrder
    active?: SortOrder
    last_success_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WebhookEndpointMaxOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    url?: SortOrder
    secret_ref?: SortOrder
    active?: SortOrder
    last_success_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WebhookEndpointMinOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    url?: SortOrder
    secret_ref?: SortOrder
    active?: SortOrder
    last_success_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type OrganizationNullableRelationFilter = {
    is?: OrganizationWhereInput | null
    isNot?: OrganizationWhereInput | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type OAuthTokenCountOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    user_id?: SortOrder
    provider?: SortOrder
    scopes?: SortOrder
    expires_at?: SortOrder
    enc_payload?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OAuthTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    user_id?: SortOrder
    provider?: SortOrder
    expires_at?: SortOrder
    enc_payload?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OAuthTokenMinOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    user_id?: SortOrder
    provider?: SortOrder
    expires_at?: SortOrder
    enc_payload?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    target_id?: SortOrder
    meta_json?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    target_id?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    target_id?: SortOrder
    created_at?: SortOrder
  }

  export type BackfillJobCountOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    account_id?: SortOrder
    range_start?: SortOrder
    range_end?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BackfillJobMaxOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    account_id?: SortOrder
    range_start?: SortOrder
    range_end?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BackfillJobMinOrderByAggregateInput = {
    id?: SortOrder
    org_id?: SortOrder
    account_id?: SortOrder
    range_start?: SortOrder
    range_end?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type NotificationPreferenceAccount_idChannelEvent_typeCompoundUniqueInput = {
    account_id: string
    channel: string
    event_type: string
  }

  export type NotificationPreferenceCountOrderByAggregateInput = {
    id?: SortOrder
    account_id?: SortOrder
    channel?: SortOrder
    event_type?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type NotificationPreferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    account_id?: SortOrder
    channel?: SortOrder
    event_type?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type NotificationPreferenceMinOrderByAggregateInput = {
    id?: SortOrder
    account_id?: SortOrder
    channel?: SortOrder
    event_type?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserCreateNestedOneWithoutOwned_orgsInput = {
    create?: XOR<UserCreateWithoutOwned_orgsInput, UserUncheckedCreateWithoutOwned_orgsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwned_orgsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ConnectionCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ConnectionCreateWithoutOrganizationInput, ConnectionUncheckedCreateWithoutOrganizationInput> | ConnectionCreateWithoutOrganizationInput[] | ConnectionUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutOrganizationInput | ConnectionCreateOrConnectWithoutOrganizationInput[]
    createMany?: ConnectionCreateManyOrganizationInputEnvelope
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
  }

  export type DestinationCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<DestinationCreateWithoutOrganizationInput, DestinationUncheckedCreateWithoutOrganizationInput> | DestinationCreateWithoutOrganizationInput[] | DestinationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: DestinationCreateOrConnectWithoutOrganizationInput | DestinationCreateOrConnectWithoutOrganizationInput[]
    createMany?: DestinationCreateManyOrganizationInputEnvelope
    connect?: DestinationWhereUniqueInput | DestinationWhereUniqueInput[]
  }

  export type WebhookEndpointCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<WebhookEndpointCreateWithoutOrganizationInput, WebhookEndpointUncheckedCreateWithoutOrganizationInput> | WebhookEndpointCreateWithoutOrganizationInput[] | WebhookEndpointUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: WebhookEndpointCreateOrConnectWithoutOrganizationInput | WebhookEndpointCreateOrConnectWithoutOrganizationInput[]
    createMany?: WebhookEndpointCreateManyOrganizationInputEnvelope
    connect?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
  }

  export type OAuthTokenCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OAuthTokenCreateWithoutOrganizationInput, OAuthTokenUncheckedCreateWithoutOrganizationInput> | OAuthTokenCreateWithoutOrganizationInput[] | OAuthTokenUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutOrganizationInput | OAuthTokenCreateOrConnectWithoutOrganizationInput[]
    createMany?: OAuthTokenCreateManyOrganizationInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type BackfillJobCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<BackfillJobCreateWithoutOrganizationInput, BackfillJobUncheckedCreateWithoutOrganizationInput> | BackfillJobCreateWithoutOrganizationInput[] | BackfillJobUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BackfillJobCreateOrConnectWithoutOrganizationInput | BackfillJobCreateOrConnectWithoutOrganizationInput[]
    createMany?: BackfillJobCreateManyOrganizationInputEnvelope
    connect?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ConnectionUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ConnectionCreateWithoutOrganizationInput, ConnectionUncheckedCreateWithoutOrganizationInput> | ConnectionCreateWithoutOrganizationInput[] | ConnectionUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutOrganizationInput | ConnectionCreateOrConnectWithoutOrganizationInput[]
    createMany?: ConnectionCreateManyOrganizationInputEnvelope
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
  }

  export type DestinationUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<DestinationCreateWithoutOrganizationInput, DestinationUncheckedCreateWithoutOrganizationInput> | DestinationCreateWithoutOrganizationInput[] | DestinationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: DestinationCreateOrConnectWithoutOrganizationInput | DestinationCreateOrConnectWithoutOrganizationInput[]
    createMany?: DestinationCreateManyOrganizationInputEnvelope
    connect?: DestinationWhereUniqueInput | DestinationWhereUniqueInput[]
  }

  export type WebhookEndpointUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<WebhookEndpointCreateWithoutOrganizationInput, WebhookEndpointUncheckedCreateWithoutOrganizationInput> | WebhookEndpointCreateWithoutOrganizationInput[] | WebhookEndpointUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: WebhookEndpointCreateOrConnectWithoutOrganizationInput | WebhookEndpointCreateOrConnectWithoutOrganizationInput[]
    createMany?: WebhookEndpointCreateManyOrganizationInputEnvelope
    connect?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
  }

  export type OAuthTokenUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OAuthTokenCreateWithoutOrganizationInput, OAuthTokenUncheckedCreateWithoutOrganizationInput> | OAuthTokenCreateWithoutOrganizationInput[] | OAuthTokenUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutOrganizationInput | OAuthTokenCreateOrConnectWithoutOrganizationInput[]
    createMany?: OAuthTokenCreateManyOrganizationInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type BackfillJobUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<BackfillJobCreateWithoutOrganizationInput, BackfillJobUncheckedCreateWithoutOrganizationInput> | BackfillJobCreateWithoutOrganizationInput[] | BackfillJobUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BackfillJobCreateOrConnectWithoutOrganizationInput | BackfillJobCreateOrConnectWithoutOrganizationInput[]
    createMany?: BackfillJobCreateManyOrganizationInputEnvelope
    connect?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutOwned_orgsNestedInput = {
    create?: XOR<UserCreateWithoutOwned_orgsInput, UserUncheckedCreateWithoutOwned_orgsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwned_orgsInput
    upsert?: UserUpsertWithoutOwned_orgsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwned_orgsInput, UserUpdateWithoutOwned_orgsInput>, UserUncheckedUpdateWithoutOwned_orgsInput>
  }

  export type UserUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ConnectionUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ConnectionCreateWithoutOrganizationInput, ConnectionUncheckedCreateWithoutOrganizationInput> | ConnectionCreateWithoutOrganizationInput[] | ConnectionUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutOrganizationInput | ConnectionCreateOrConnectWithoutOrganizationInput[]
    upsert?: ConnectionUpsertWithWhereUniqueWithoutOrganizationInput | ConnectionUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ConnectionCreateManyOrganizationInputEnvelope
    set?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    disconnect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    delete?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    update?: ConnectionUpdateWithWhereUniqueWithoutOrganizationInput | ConnectionUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ConnectionUpdateManyWithWhereWithoutOrganizationInput | ConnectionUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
  }

  export type DestinationUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<DestinationCreateWithoutOrganizationInput, DestinationUncheckedCreateWithoutOrganizationInput> | DestinationCreateWithoutOrganizationInput[] | DestinationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: DestinationCreateOrConnectWithoutOrganizationInput | DestinationCreateOrConnectWithoutOrganizationInput[]
    upsert?: DestinationUpsertWithWhereUniqueWithoutOrganizationInput | DestinationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: DestinationCreateManyOrganizationInputEnvelope
    set?: DestinationWhereUniqueInput | DestinationWhereUniqueInput[]
    disconnect?: DestinationWhereUniqueInput | DestinationWhereUniqueInput[]
    delete?: DestinationWhereUniqueInput | DestinationWhereUniqueInput[]
    connect?: DestinationWhereUniqueInput | DestinationWhereUniqueInput[]
    update?: DestinationUpdateWithWhereUniqueWithoutOrganizationInput | DestinationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: DestinationUpdateManyWithWhereWithoutOrganizationInput | DestinationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: DestinationScalarWhereInput | DestinationScalarWhereInput[]
  }

  export type WebhookEndpointUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<WebhookEndpointCreateWithoutOrganizationInput, WebhookEndpointUncheckedCreateWithoutOrganizationInput> | WebhookEndpointCreateWithoutOrganizationInput[] | WebhookEndpointUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: WebhookEndpointCreateOrConnectWithoutOrganizationInput | WebhookEndpointCreateOrConnectWithoutOrganizationInput[]
    upsert?: WebhookEndpointUpsertWithWhereUniqueWithoutOrganizationInput | WebhookEndpointUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: WebhookEndpointCreateManyOrganizationInputEnvelope
    set?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    disconnect?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    delete?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    connect?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    update?: WebhookEndpointUpdateWithWhereUniqueWithoutOrganizationInput | WebhookEndpointUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: WebhookEndpointUpdateManyWithWhereWithoutOrganizationInput | WebhookEndpointUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: WebhookEndpointScalarWhereInput | WebhookEndpointScalarWhereInput[]
  }

  export type OAuthTokenUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutOrganizationInput, OAuthTokenUncheckedCreateWithoutOrganizationInput> | OAuthTokenCreateWithoutOrganizationInput[] | OAuthTokenUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutOrganizationInput | OAuthTokenCreateOrConnectWithoutOrganizationInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutOrganizationInput | OAuthTokenUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OAuthTokenCreateManyOrganizationInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutOrganizationInput | OAuthTokenUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutOrganizationInput | OAuthTokenUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutOrganizationInput | AuditLogUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutOrganizationInput | AuditLogUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutOrganizationInput | AuditLogUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type BackfillJobUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<BackfillJobCreateWithoutOrganizationInput, BackfillJobUncheckedCreateWithoutOrganizationInput> | BackfillJobCreateWithoutOrganizationInput[] | BackfillJobUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BackfillJobCreateOrConnectWithoutOrganizationInput | BackfillJobCreateOrConnectWithoutOrganizationInput[]
    upsert?: BackfillJobUpsertWithWhereUniqueWithoutOrganizationInput | BackfillJobUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: BackfillJobCreateManyOrganizationInputEnvelope
    set?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    disconnect?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    delete?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    connect?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    update?: BackfillJobUpdateWithWhereUniqueWithoutOrganizationInput | BackfillJobUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: BackfillJobUpdateManyWithWhereWithoutOrganizationInput | BackfillJobUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: BackfillJobScalarWhereInput | BackfillJobScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ConnectionUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ConnectionCreateWithoutOrganizationInput, ConnectionUncheckedCreateWithoutOrganizationInput> | ConnectionCreateWithoutOrganizationInput[] | ConnectionUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutOrganizationInput | ConnectionCreateOrConnectWithoutOrganizationInput[]
    upsert?: ConnectionUpsertWithWhereUniqueWithoutOrganizationInput | ConnectionUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ConnectionCreateManyOrganizationInputEnvelope
    set?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    disconnect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    delete?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    update?: ConnectionUpdateWithWhereUniqueWithoutOrganizationInput | ConnectionUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ConnectionUpdateManyWithWhereWithoutOrganizationInput | ConnectionUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
  }

  export type DestinationUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<DestinationCreateWithoutOrganizationInput, DestinationUncheckedCreateWithoutOrganizationInput> | DestinationCreateWithoutOrganizationInput[] | DestinationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: DestinationCreateOrConnectWithoutOrganizationInput | DestinationCreateOrConnectWithoutOrganizationInput[]
    upsert?: DestinationUpsertWithWhereUniqueWithoutOrganizationInput | DestinationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: DestinationCreateManyOrganizationInputEnvelope
    set?: DestinationWhereUniqueInput | DestinationWhereUniqueInput[]
    disconnect?: DestinationWhereUniqueInput | DestinationWhereUniqueInput[]
    delete?: DestinationWhereUniqueInput | DestinationWhereUniqueInput[]
    connect?: DestinationWhereUniqueInput | DestinationWhereUniqueInput[]
    update?: DestinationUpdateWithWhereUniqueWithoutOrganizationInput | DestinationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: DestinationUpdateManyWithWhereWithoutOrganizationInput | DestinationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: DestinationScalarWhereInput | DestinationScalarWhereInput[]
  }

  export type WebhookEndpointUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<WebhookEndpointCreateWithoutOrganizationInput, WebhookEndpointUncheckedCreateWithoutOrganizationInput> | WebhookEndpointCreateWithoutOrganizationInput[] | WebhookEndpointUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: WebhookEndpointCreateOrConnectWithoutOrganizationInput | WebhookEndpointCreateOrConnectWithoutOrganizationInput[]
    upsert?: WebhookEndpointUpsertWithWhereUniqueWithoutOrganizationInput | WebhookEndpointUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: WebhookEndpointCreateManyOrganizationInputEnvelope
    set?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    disconnect?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    delete?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    connect?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    update?: WebhookEndpointUpdateWithWhereUniqueWithoutOrganizationInput | WebhookEndpointUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: WebhookEndpointUpdateManyWithWhereWithoutOrganizationInput | WebhookEndpointUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: WebhookEndpointScalarWhereInput | WebhookEndpointScalarWhereInput[]
  }

  export type OAuthTokenUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutOrganizationInput, OAuthTokenUncheckedCreateWithoutOrganizationInput> | OAuthTokenCreateWithoutOrganizationInput[] | OAuthTokenUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutOrganizationInput | OAuthTokenCreateOrConnectWithoutOrganizationInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutOrganizationInput | OAuthTokenUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OAuthTokenCreateManyOrganizationInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutOrganizationInput | OAuthTokenUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutOrganizationInput | OAuthTokenUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutOrganizationInput | AuditLogUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutOrganizationInput | AuditLogUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutOrganizationInput | AuditLogUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type BackfillJobUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<BackfillJobCreateWithoutOrganizationInput, BackfillJobUncheckedCreateWithoutOrganizationInput> | BackfillJobCreateWithoutOrganizationInput[] | BackfillJobUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BackfillJobCreateOrConnectWithoutOrganizationInput | BackfillJobCreateOrConnectWithoutOrganizationInput[]
    upsert?: BackfillJobUpsertWithWhereUniqueWithoutOrganizationInput | BackfillJobUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: BackfillJobCreateManyOrganizationInputEnvelope
    set?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    disconnect?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    delete?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    connect?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    update?: BackfillJobUpdateWithWhereUniqueWithoutOrganizationInput | BackfillJobUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: BackfillJobUpdateManyWithWhereWithoutOrganizationInput | BackfillJobUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: BackfillJobScalarWhereInput | BackfillJobScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutUsersInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type OrganizationCreateNestedManyWithoutOwnerInput = {
    create?: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput> | OrganizationCreateWithoutOwnerInput[] | OrganizationUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutOwnerInput | OrganizationCreateOrConnectWithoutOwnerInput[]
    createMany?: OrganizationCreateManyOwnerInputEnvelope
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
  }

  export type OAuthTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type OrganizationUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput> | OrganizationCreateWithoutOwnerInput[] | OrganizationUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutOwnerInput | OrganizationCreateOrConnectWithoutOwnerInput[]
    createMany?: OrganizationCreateManyOwnerInputEnvelope
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
  }

  export type OAuthTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type OrganizationUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    upsert?: OrganizationUpsertWithoutUsersInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutUsersInput, OrganizationUpdateWithoutUsersInput>, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type OrganizationUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput> | OrganizationCreateWithoutOwnerInput[] | OrganizationUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutOwnerInput | OrganizationCreateOrConnectWithoutOwnerInput[]
    upsert?: OrganizationUpsertWithWhereUniqueWithoutOwnerInput | OrganizationUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: OrganizationCreateManyOwnerInputEnvelope
    set?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    disconnect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    delete?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    update?: OrganizationUpdateWithWhereUniqueWithoutOwnerInput | OrganizationUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: OrganizationUpdateManyWithWhereWithoutOwnerInput | OrganizationUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
  }

  export type OAuthTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutUserInput | OAuthTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutUserInput | OAuthTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutUserInput | OAuthTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type OrganizationUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput> | OrganizationCreateWithoutOwnerInput[] | OrganizationUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutOwnerInput | OrganizationCreateOrConnectWithoutOwnerInput[]
    upsert?: OrganizationUpsertWithWhereUniqueWithoutOwnerInput | OrganizationUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: OrganizationCreateManyOwnerInputEnvelope
    set?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    disconnect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    delete?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    update?: OrganizationUpdateWithWhereUniqueWithoutOwnerInput | OrganizationUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: OrganizationUpdateManyWithWhereWithoutOwnerInput | OrganizationUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
  }

  export type OAuthTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutUserInput | OAuthTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutUserInput | OAuthTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutUserInput | OAuthTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutConnectionsInput = {
    create?: XOR<OrganizationCreateWithoutConnectionsInput, OrganizationUncheckedCreateWithoutConnectionsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutConnectionsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type AccountCreateNestedManyWithoutConnectionInput = {
    create?: XOR<AccountCreateWithoutConnectionInput, AccountUncheckedCreateWithoutConnectionInput> | AccountCreateWithoutConnectionInput[] | AccountUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutConnectionInput | AccountCreateOrConnectWithoutConnectionInput[]
    createMany?: AccountCreateManyConnectionInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutConnectionInput = {
    create?: XOR<AccountCreateWithoutConnectionInput, AccountUncheckedCreateWithoutConnectionInput> | AccountCreateWithoutConnectionInput[] | AccountUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutConnectionInput | AccountCreateOrConnectWithoutConnectionInput[]
    createMany?: AccountCreateManyConnectionInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type OrganizationUpdateOneRequiredWithoutConnectionsNestedInput = {
    create?: XOR<OrganizationCreateWithoutConnectionsInput, OrganizationUncheckedCreateWithoutConnectionsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutConnectionsInput
    upsert?: OrganizationUpsertWithoutConnectionsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutConnectionsInput, OrganizationUpdateWithoutConnectionsInput>, OrganizationUncheckedUpdateWithoutConnectionsInput>
  }

  export type AccountUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<AccountCreateWithoutConnectionInput, AccountUncheckedCreateWithoutConnectionInput> | AccountCreateWithoutConnectionInput[] | AccountUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutConnectionInput | AccountCreateOrConnectWithoutConnectionInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutConnectionInput | AccountUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: AccountCreateManyConnectionInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutConnectionInput | AccountUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutConnectionInput | AccountUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<AccountCreateWithoutConnectionInput, AccountUncheckedCreateWithoutConnectionInput> | AccountCreateWithoutConnectionInput[] | AccountUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutConnectionInput | AccountCreateOrConnectWithoutConnectionInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutConnectionInput | AccountUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: AccountCreateManyConnectionInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutConnectionInput | AccountUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutConnectionInput | AccountUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ConnectionCreateNestedOneWithoutAccountsInput = {
    create?: XOR<ConnectionCreateWithoutAccountsInput, ConnectionUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutAccountsInput
    connect?: ConnectionWhereUniqueInput
  }

  export type StatementCreateNestedManyWithoutAccountInput = {
    create?: XOR<StatementCreateWithoutAccountInput, StatementUncheckedCreateWithoutAccountInput> | StatementCreateWithoutAccountInput[] | StatementUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: StatementCreateOrConnectWithoutAccountInput | StatementCreateOrConnectWithoutAccountInput[]
    createMany?: StatementCreateManyAccountInputEnvelope
    connect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
  }

  export type RoutingRuleCreateNestedManyWithoutAccountInput = {
    create?: XOR<RoutingRuleCreateWithoutAccountInput, RoutingRuleUncheckedCreateWithoutAccountInput> | RoutingRuleCreateWithoutAccountInput[] | RoutingRuleUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: RoutingRuleCreateOrConnectWithoutAccountInput | RoutingRuleCreateOrConnectWithoutAccountInput[]
    createMany?: RoutingRuleCreateManyAccountInputEnvelope
    connect?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
  }

  export type NotificationPreferenceCreateNestedManyWithoutAccountInput = {
    create?: XOR<NotificationPreferenceCreateWithoutAccountInput, NotificationPreferenceUncheckedCreateWithoutAccountInput> | NotificationPreferenceCreateWithoutAccountInput[] | NotificationPreferenceUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: NotificationPreferenceCreateOrConnectWithoutAccountInput | NotificationPreferenceCreateOrConnectWithoutAccountInput[]
    createMany?: NotificationPreferenceCreateManyAccountInputEnvelope
    connect?: NotificationPreferenceWhereUniqueInput | NotificationPreferenceWhereUniqueInput[]
  }

  export type BackfillJobCreateNestedManyWithoutAccountInput = {
    create?: XOR<BackfillJobCreateWithoutAccountInput, BackfillJobUncheckedCreateWithoutAccountInput> | BackfillJobCreateWithoutAccountInput[] | BackfillJobUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: BackfillJobCreateOrConnectWithoutAccountInput | BackfillJobCreateOrConnectWithoutAccountInput[]
    createMany?: BackfillJobCreateManyAccountInputEnvelope
    connect?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
  }

  export type StatementUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<StatementCreateWithoutAccountInput, StatementUncheckedCreateWithoutAccountInput> | StatementCreateWithoutAccountInput[] | StatementUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: StatementCreateOrConnectWithoutAccountInput | StatementCreateOrConnectWithoutAccountInput[]
    createMany?: StatementCreateManyAccountInputEnvelope
    connect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
  }

  export type RoutingRuleUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<RoutingRuleCreateWithoutAccountInput, RoutingRuleUncheckedCreateWithoutAccountInput> | RoutingRuleCreateWithoutAccountInput[] | RoutingRuleUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: RoutingRuleCreateOrConnectWithoutAccountInput | RoutingRuleCreateOrConnectWithoutAccountInput[]
    createMany?: RoutingRuleCreateManyAccountInputEnvelope
    connect?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
  }

  export type NotificationPreferenceUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<NotificationPreferenceCreateWithoutAccountInput, NotificationPreferenceUncheckedCreateWithoutAccountInput> | NotificationPreferenceCreateWithoutAccountInput[] | NotificationPreferenceUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: NotificationPreferenceCreateOrConnectWithoutAccountInput | NotificationPreferenceCreateOrConnectWithoutAccountInput[]
    createMany?: NotificationPreferenceCreateManyAccountInputEnvelope
    connect?: NotificationPreferenceWhereUniqueInput | NotificationPreferenceWhereUniqueInput[]
  }

  export type BackfillJobUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<BackfillJobCreateWithoutAccountInput, BackfillJobUncheckedCreateWithoutAccountInput> | BackfillJobCreateWithoutAccountInput[] | BackfillJobUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: BackfillJobCreateOrConnectWithoutAccountInput | BackfillJobCreateOrConnectWithoutAccountInput[]
    createMany?: BackfillJobCreateManyAccountInputEnvelope
    connect?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
  }

  export type ConnectionUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<ConnectionCreateWithoutAccountsInput, ConnectionUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutAccountsInput
    upsert?: ConnectionUpsertWithoutAccountsInput
    connect?: ConnectionWhereUniqueInput
    update?: XOR<XOR<ConnectionUpdateToOneWithWhereWithoutAccountsInput, ConnectionUpdateWithoutAccountsInput>, ConnectionUncheckedUpdateWithoutAccountsInput>
  }

  export type StatementUpdateManyWithoutAccountNestedInput = {
    create?: XOR<StatementCreateWithoutAccountInput, StatementUncheckedCreateWithoutAccountInput> | StatementCreateWithoutAccountInput[] | StatementUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: StatementCreateOrConnectWithoutAccountInput | StatementCreateOrConnectWithoutAccountInput[]
    upsert?: StatementUpsertWithWhereUniqueWithoutAccountInput | StatementUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: StatementCreateManyAccountInputEnvelope
    set?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    disconnect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    delete?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    connect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    update?: StatementUpdateWithWhereUniqueWithoutAccountInput | StatementUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: StatementUpdateManyWithWhereWithoutAccountInput | StatementUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: StatementScalarWhereInput | StatementScalarWhereInput[]
  }

  export type RoutingRuleUpdateManyWithoutAccountNestedInput = {
    create?: XOR<RoutingRuleCreateWithoutAccountInput, RoutingRuleUncheckedCreateWithoutAccountInput> | RoutingRuleCreateWithoutAccountInput[] | RoutingRuleUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: RoutingRuleCreateOrConnectWithoutAccountInput | RoutingRuleCreateOrConnectWithoutAccountInput[]
    upsert?: RoutingRuleUpsertWithWhereUniqueWithoutAccountInput | RoutingRuleUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: RoutingRuleCreateManyAccountInputEnvelope
    set?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    disconnect?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    delete?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    connect?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    update?: RoutingRuleUpdateWithWhereUniqueWithoutAccountInput | RoutingRuleUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: RoutingRuleUpdateManyWithWhereWithoutAccountInput | RoutingRuleUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: RoutingRuleScalarWhereInput | RoutingRuleScalarWhereInput[]
  }

  export type NotificationPreferenceUpdateManyWithoutAccountNestedInput = {
    create?: XOR<NotificationPreferenceCreateWithoutAccountInput, NotificationPreferenceUncheckedCreateWithoutAccountInput> | NotificationPreferenceCreateWithoutAccountInput[] | NotificationPreferenceUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: NotificationPreferenceCreateOrConnectWithoutAccountInput | NotificationPreferenceCreateOrConnectWithoutAccountInput[]
    upsert?: NotificationPreferenceUpsertWithWhereUniqueWithoutAccountInput | NotificationPreferenceUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: NotificationPreferenceCreateManyAccountInputEnvelope
    set?: NotificationPreferenceWhereUniqueInput | NotificationPreferenceWhereUniqueInput[]
    disconnect?: NotificationPreferenceWhereUniqueInput | NotificationPreferenceWhereUniqueInput[]
    delete?: NotificationPreferenceWhereUniqueInput | NotificationPreferenceWhereUniqueInput[]
    connect?: NotificationPreferenceWhereUniqueInput | NotificationPreferenceWhereUniqueInput[]
    update?: NotificationPreferenceUpdateWithWhereUniqueWithoutAccountInput | NotificationPreferenceUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: NotificationPreferenceUpdateManyWithWhereWithoutAccountInput | NotificationPreferenceUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: NotificationPreferenceScalarWhereInput | NotificationPreferenceScalarWhereInput[]
  }

  export type BackfillJobUpdateManyWithoutAccountNestedInput = {
    create?: XOR<BackfillJobCreateWithoutAccountInput, BackfillJobUncheckedCreateWithoutAccountInput> | BackfillJobCreateWithoutAccountInput[] | BackfillJobUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: BackfillJobCreateOrConnectWithoutAccountInput | BackfillJobCreateOrConnectWithoutAccountInput[]
    upsert?: BackfillJobUpsertWithWhereUniqueWithoutAccountInput | BackfillJobUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: BackfillJobCreateManyAccountInputEnvelope
    set?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    disconnect?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    delete?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    connect?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    update?: BackfillJobUpdateWithWhereUniqueWithoutAccountInput | BackfillJobUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: BackfillJobUpdateManyWithWhereWithoutAccountInput | BackfillJobUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: BackfillJobScalarWhereInput | BackfillJobScalarWhereInput[]
  }

  export type StatementUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<StatementCreateWithoutAccountInput, StatementUncheckedCreateWithoutAccountInput> | StatementCreateWithoutAccountInput[] | StatementUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: StatementCreateOrConnectWithoutAccountInput | StatementCreateOrConnectWithoutAccountInput[]
    upsert?: StatementUpsertWithWhereUniqueWithoutAccountInput | StatementUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: StatementCreateManyAccountInputEnvelope
    set?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    disconnect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    delete?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    connect?: StatementWhereUniqueInput | StatementWhereUniqueInput[]
    update?: StatementUpdateWithWhereUniqueWithoutAccountInput | StatementUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: StatementUpdateManyWithWhereWithoutAccountInput | StatementUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: StatementScalarWhereInput | StatementScalarWhereInput[]
  }

  export type RoutingRuleUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<RoutingRuleCreateWithoutAccountInput, RoutingRuleUncheckedCreateWithoutAccountInput> | RoutingRuleCreateWithoutAccountInput[] | RoutingRuleUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: RoutingRuleCreateOrConnectWithoutAccountInput | RoutingRuleCreateOrConnectWithoutAccountInput[]
    upsert?: RoutingRuleUpsertWithWhereUniqueWithoutAccountInput | RoutingRuleUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: RoutingRuleCreateManyAccountInputEnvelope
    set?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    disconnect?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    delete?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    connect?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    update?: RoutingRuleUpdateWithWhereUniqueWithoutAccountInput | RoutingRuleUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: RoutingRuleUpdateManyWithWhereWithoutAccountInput | RoutingRuleUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: RoutingRuleScalarWhereInput | RoutingRuleScalarWhereInput[]
  }

  export type NotificationPreferenceUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<NotificationPreferenceCreateWithoutAccountInput, NotificationPreferenceUncheckedCreateWithoutAccountInput> | NotificationPreferenceCreateWithoutAccountInput[] | NotificationPreferenceUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: NotificationPreferenceCreateOrConnectWithoutAccountInput | NotificationPreferenceCreateOrConnectWithoutAccountInput[]
    upsert?: NotificationPreferenceUpsertWithWhereUniqueWithoutAccountInput | NotificationPreferenceUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: NotificationPreferenceCreateManyAccountInputEnvelope
    set?: NotificationPreferenceWhereUniqueInput | NotificationPreferenceWhereUniqueInput[]
    disconnect?: NotificationPreferenceWhereUniqueInput | NotificationPreferenceWhereUniqueInput[]
    delete?: NotificationPreferenceWhereUniqueInput | NotificationPreferenceWhereUniqueInput[]
    connect?: NotificationPreferenceWhereUniqueInput | NotificationPreferenceWhereUniqueInput[]
    update?: NotificationPreferenceUpdateWithWhereUniqueWithoutAccountInput | NotificationPreferenceUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: NotificationPreferenceUpdateManyWithWhereWithoutAccountInput | NotificationPreferenceUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: NotificationPreferenceScalarWhereInput | NotificationPreferenceScalarWhereInput[]
  }

  export type BackfillJobUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<BackfillJobCreateWithoutAccountInput, BackfillJobUncheckedCreateWithoutAccountInput> | BackfillJobCreateWithoutAccountInput[] | BackfillJobUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: BackfillJobCreateOrConnectWithoutAccountInput | BackfillJobCreateOrConnectWithoutAccountInput[]
    upsert?: BackfillJobUpsertWithWhereUniqueWithoutAccountInput | BackfillJobUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: BackfillJobCreateManyAccountInputEnvelope
    set?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    disconnect?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    delete?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    connect?: BackfillJobWhereUniqueInput | BackfillJobWhereUniqueInput[]
    update?: BackfillJobUpdateWithWhereUniqueWithoutAccountInput | BackfillJobUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: BackfillJobUpdateManyWithWhereWithoutAccountInput | BackfillJobUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: BackfillJobScalarWhereInput | BackfillJobScalarWhereInput[]
  }

  export type AccountCreateNestedOneWithoutStatementsInput = {
    create?: XOR<AccountCreateWithoutStatementsInput, AccountUncheckedCreateWithoutStatementsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutStatementsInput
    connect?: AccountWhereUniqueInput
  }

  export type DeliveryCreateNestedManyWithoutStatementInput = {
    create?: XOR<DeliveryCreateWithoutStatementInput, DeliveryUncheckedCreateWithoutStatementInput> | DeliveryCreateWithoutStatementInput[] | DeliveryUncheckedCreateWithoutStatementInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutStatementInput | DeliveryCreateOrConnectWithoutStatementInput[]
    createMany?: DeliveryCreateManyStatementInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type DeliveryUncheckedCreateNestedManyWithoutStatementInput = {
    create?: XOR<DeliveryCreateWithoutStatementInput, DeliveryUncheckedCreateWithoutStatementInput> | DeliveryCreateWithoutStatementInput[] | DeliveryUncheckedCreateWithoutStatementInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutStatementInput | DeliveryCreateOrConnectWithoutStatementInput[]
    createMany?: DeliveryCreateManyStatementInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AccountUpdateOneRequiredWithoutStatementsNestedInput = {
    create?: XOR<AccountCreateWithoutStatementsInput, AccountUncheckedCreateWithoutStatementsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutStatementsInput
    upsert?: AccountUpsertWithoutStatementsInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutStatementsInput, AccountUpdateWithoutStatementsInput>, AccountUncheckedUpdateWithoutStatementsInput>
  }

  export type DeliveryUpdateManyWithoutStatementNestedInput = {
    create?: XOR<DeliveryCreateWithoutStatementInput, DeliveryUncheckedCreateWithoutStatementInput> | DeliveryCreateWithoutStatementInput[] | DeliveryUncheckedCreateWithoutStatementInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutStatementInput | DeliveryCreateOrConnectWithoutStatementInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutStatementInput | DeliveryUpsertWithWhereUniqueWithoutStatementInput[]
    createMany?: DeliveryCreateManyStatementInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutStatementInput | DeliveryUpdateWithWhereUniqueWithoutStatementInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutStatementInput | DeliveryUpdateManyWithWhereWithoutStatementInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type DeliveryUncheckedUpdateManyWithoutStatementNestedInput = {
    create?: XOR<DeliveryCreateWithoutStatementInput, DeliveryUncheckedCreateWithoutStatementInput> | DeliveryCreateWithoutStatementInput[] | DeliveryUncheckedCreateWithoutStatementInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutStatementInput | DeliveryCreateOrConnectWithoutStatementInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutStatementInput | DeliveryUpsertWithWhereUniqueWithoutStatementInput[]
    createMany?: DeliveryCreateManyStatementInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutStatementInput | DeliveryUpdateWithWhereUniqueWithoutStatementInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutStatementInput | DeliveryUpdateManyWithWhereWithoutStatementInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutDestinationsInput = {
    create?: XOR<OrganizationCreateWithoutDestinationsInput, OrganizationUncheckedCreateWithoutDestinationsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutDestinationsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type RoutingRuleCreateNestedManyWithoutDestinationInput = {
    create?: XOR<RoutingRuleCreateWithoutDestinationInput, RoutingRuleUncheckedCreateWithoutDestinationInput> | RoutingRuleCreateWithoutDestinationInput[] | RoutingRuleUncheckedCreateWithoutDestinationInput[]
    connectOrCreate?: RoutingRuleCreateOrConnectWithoutDestinationInput | RoutingRuleCreateOrConnectWithoutDestinationInput[]
    createMany?: RoutingRuleCreateManyDestinationInputEnvelope
    connect?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
  }

  export type DeliveryCreateNestedManyWithoutDestinationInput = {
    create?: XOR<DeliveryCreateWithoutDestinationInput, DeliveryUncheckedCreateWithoutDestinationInput> | DeliveryCreateWithoutDestinationInput[] | DeliveryUncheckedCreateWithoutDestinationInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutDestinationInput | DeliveryCreateOrConnectWithoutDestinationInput[]
    createMany?: DeliveryCreateManyDestinationInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type RoutingRuleUncheckedCreateNestedManyWithoutDestinationInput = {
    create?: XOR<RoutingRuleCreateWithoutDestinationInput, RoutingRuleUncheckedCreateWithoutDestinationInput> | RoutingRuleCreateWithoutDestinationInput[] | RoutingRuleUncheckedCreateWithoutDestinationInput[]
    connectOrCreate?: RoutingRuleCreateOrConnectWithoutDestinationInput | RoutingRuleCreateOrConnectWithoutDestinationInput[]
    createMany?: RoutingRuleCreateManyDestinationInputEnvelope
    connect?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
  }

  export type DeliveryUncheckedCreateNestedManyWithoutDestinationInput = {
    create?: XOR<DeliveryCreateWithoutDestinationInput, DeliveryUncheckedCreateWithoutDestinationInput> | DeliveryCreateWithoutDestinationInput[] | DeliveryUncheckedCreateWithoutDestinationInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutDestinationInput | DeliveryCreateOrConnectWithoutDestinationInput[]
    createMany?: DeliveryCreateManyDestinationInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type OrganizationUpdateOneRequiredWithoutDestinationsNestedInput = {
    create?: XOR<OrganizationCreateWithoutDestinationsInput, OrganizationUncheckedCreateWithoutDestinationsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutDestinationsInput
    upsert?: OrganizationUpsertWithoutDestinationsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutDestinationsInput, OrganizationUpdateWithoutDestinationsInput>, OrganizationUncheckedUpdateWithoutDestinationsInput>
  }

  export type RoutingRuleUpdateManyWithoutDestinationNestedInput = {
    create?: XOR<RoutingRuleCreateWithoutDestinationInput, RoutingRuleUncheckedCreateWithoutDestinationInput> | RoutingRuleCreateWithoutDestinationInput[] | RoutingRuleUncheckedCreateWithoutDestinationInput[]
    connectOrCreate?: RoutingRuleCreateOrConnectWithoutDestinationInput | RoutingRuleCreateOrConnectWithoutDestinationInput[]
    upsert?: RoutingRuleUpsertWithWhereUniqueWithoutDestinationInput | RoutingRuleUpsertWithWhereUniqueWithoutDestinationInput[]
    createMany?: RoutingRuleCreateManyDestinationInputEnvelope
    set?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    disconnect?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    delete?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    connect?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    update?: RoutingRuleUpdateWithWhereUniqueWithoutDestinationInput | RoutingRuleUpdateWithWhereUniqueWithoutDestinationInput[]
    updateMany?: RoutingRuleUpdateManyWithWhereWithoutDestinationInput | RoutingRuleUpdateManyWithWhereWithoutDestinationInput[]
    deleteMany?: RoutingRuleScalarWhereInput | RoutingRuleScalarWhereInput[]
  }

  export type DeliveryUpdateManyWithoutDestinationNestedInput = {
    create?: XOR<DeliveryCreateWithoutDestinationInput, DeliveryUncheckedCreateWithoutDestinationInput> | DeliveryCreateWithoutDestinationInput[] | DeliveryUncheckedCreateWithoutDestinationInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutDestinationInput | DeliveryCreateOrConnectWithoutDestinationInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutDestinationInput | DeliveryUpsertWithWhereUniqueWithoutDestinationInput[]
    createMany?: DeliveryCreateManyDestinationInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutDestinationInput | DeliveryUpdateWithWhereUniqueWithoutDestinationInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutDestinationInput | DeliveryUpdateManyWithWhereWithoutDestinationInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type RoutingRuleUncheckedUpdateManyWithoutDestinationNestedInput = {
    create?: XOR<RoutingRuleCreateWithoutDestinationInput, RoutingRuleUncheckedCreateWithoutDestinationInput> | RoutingRuleCreateWithoutDestinationInput[] | RoutingRuleUncheckedCreateWithoutDestinationInput[]
    connectOrCreate?: RoutingRuleCreateOrConnectWithoutDestinationInput | RoutingRuleCreateOrConnectWithoutDestinationInput[]
    upsert?: RoutingRuleUpsertWithWhereUniqueWithoutDestinationInput | RoutingRuleUpsertWithWhereUniqueWithoutDestinationInput[]
    createMany?: RoutingRuleCreateManyDestinationInputEnvelope
    set?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    disconnect?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    delete?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    connect?: RoutingRuleWhereUniqueInput | RoutingRuleWhereUniqueInput[]
    update?: RoutingRuleUpdateWithWhereUniqueWithoutDestinationInput | RoutingRuleUpdateWithWhereUniqueWithoutDestinationInput[]
    updateMany?: RoutingRuleUpdateManyWithWhereWithoutDestinationInput | RoutingRuleUpdateManyWithWhereWithoutDestinationInput[]
    deleteMany?: RoutingRuleScalarWhereInput | RoutingRuleScalarWhereInput[]
  }

  export type DeliveryUncheckedUpdateManyWithoutDestinationNestedInput = {
    create?: XOR<DeliveryCreateWithoutDestinationInput, DeliveryUncheckedCreateWithoutDestinationInput> | DeliveryCreateWithoutDestinationInput[] | DeliveryUncheckedCreateWithoutDestinationInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutDestinationInput | DeliveryCreateOrConnectWithoutDestinationInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutDestinationInput | DeliveryUpsertWithWhereUniqueWithoutDestinationInput[]
    createMany?: DeliveryCreateManyDestinationInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutDestinationInput | DeliveryUpdateWithWhereUniqueWithoutDestinationInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutDestinationInput | DeliveryUpdateManyWithWhereWithoutDestinationInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type AccountCreateNestedOneWithoutRouting_rulesInput = {
    create?: XOR<AccountCreateWithoutRouting_rulesInput, AccountUncheckedCreateWithoutRouting_rulesInput>
    connectOrCreate?: AccountCreateOrConnectWithoutRouting_rulesInput
    connect?: AccountWhereUniqueInput
  }

  export type DestinationCreateNestedOneWithoutRouting_rulesInput = {
    create?: XOR<DestinationCreateWithoutRouting_rulesInput, DestinationUncheckedCreateWithoutRouting_rulesInput>
    connectOrCreate?: DestinationCreateOrConnectWithoutRouting_rulesInput
    connect?: DestinationWhereUniqueInput
  }

  export type AccountUpdateOneRequiredWithoutRouting_rulesNestedInput = {
    create?: XOR<AccountCreateWithoutRouting_rulesInput, AccountUncheckedCreateWithoutRouting_rulesInput>
    connectOrCreate?: AccountCreateOrConnectWithoutRouting_rulesInput
    upsert?: AccountUpsertWithoutRouting_rulesInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutRouting_rulesInput, AccountUpdateWithoutRouting_rulesInput>, AccountUncheckedUpdateWithoutRouting_rulesInput>
  }

  export type DestinationUpdateOneRequiredWithoutRouting_rulesNestedInput = {
    create?: XOR<DestinationCreateWithoutRouting_rulesInput, DestinationUncheckedCreateWithoutRouting_rulesInput>
    connectOrCreate?: DestinationCreateOrConnectWithoutRouting_rulesInput
    upsert?: DestinationUpsertWithoutRouting_rulesInput
    connect?: DestinationWhereUniqueInput
    update?: XOR<XOR<DestinationUpdateToOneWithWhereWithoutRouting_rulesInput, DestinationUpdateWithoutRouting_rulesInput>, DestinationUncheckedUpdateWithoutRouting_rulesInput>
  }

  export type StatementCreateNestedOneWithoutDeliveriesInput = {
    create?: XOR<StatementCreateWithoutDeliveriesInput, StatementUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: StatementCreateOrConnectWithoutDeliveriesInput
    connect?: StatementWhereUniqueInput
  }

  export type DestinationCreateNestedOneWithoutDeliveriesInput = {
    create?: XOR<DestinationCreateWithoutDeliveriesInput, DestinationUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: DestinationCreateOrConnectWithoutDeliveriesInput
    connect?: DestinationWhereUniqueInput
  }

  export type StatementUpdateOneRequiredWithoutDeliveriesNestedInput = {
    create?: XOR<StatementCreateWithoutDeliveriesInput, StatementUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: StatementCreateOrConnectWithoutDeliveriesInput
    upsert?: StatementUpsertWithoutDeliveriesInput
    connect?: StatementWhereUniqueInput
    update?: XOR<XOR<StatementUpdateToOneWithWhereWithoutDeliveriesInput, StatementUpdateWithoutDeliveriesInput>, StatementUncheckedUpdateWithoutDeliveriesInput>
  }

  export type DestinationUpdateOneRequiredWithoutDeliveriesNestedInput = {
    create?: XOR<DestinationCreateWithoutDeliveriesInput, DestinationUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: DestinationCreateOrConnectWithoutDeliveriesInput
    upsert?: DestinationUpsertWithoutDeliveriesInput
    connect?: DestinationWhereUniqueInput
    update?: XOR<XOR<DestinationUpdateToOneWithWhereWithoutDeliveriesInput, DestinationUpdateWithoutDeliveriesInput>, DestinationUncheckedUpdateWithoutDeliveriesInput>
  }

  export type OrganizationCreateNestedOneWithoutWebhook_endpointsInput = {
    create?: XOR<OrganizationCreateWithoutWebhook_endpointsInput, OrganizationUncheckedCreateWithoutWebhook_endpointsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutWebhook_endpointsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type OrganizationUpdateOneRequiredWithoutWebhook_endpointsNestedInput = {
    create?: XOR<OrganizationCreateWithoutWebhook_endpointsInput, OrganizationUncheckedCreateWithoutWebhook_endpointsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutWebhook_endpointsInput
    upsert?: OrganizationUpsertWithoutWebhook_endpointsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutWebhook_endpointsInput, OrganizationUpdateWithoutWebhook_endpointsInput>, OrganizationUncheckedUpdateWithoutWebhook_endpointsInput>
  }

  export type OAuthTokenCreatescopesInput = {
    set: string[]
  }

  export type OrganizationCreateNestedOneWithoutOauth_tokensInput = {
    create?: XOR<OrganizationCreateWithoutOauth_tokensInput, OrganizationUncheckedCreateWithoutOauth_tokensInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutOauth_tokensInput
    connect?: OrganizationWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOauth_tokensInput = {
    create?: XOR<UserCreateWithoutOauth_tokensInput, UserUncheckedCreateWithoutOauth_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth_tokensInput
    connect?: UserWhereUniqueInput
  }

  export type OAuthTokenUpdatescopesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OrganizationUpdateOneWithoutOauth_tokensNestedInput = {
    create?: XOR<OrganizationCreateWithoutOauth_tokensInput, OrganizationUncheckedCreateWithoutOauth_tokensInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutOauth_tokensInput
    upsert?: OrganizationUpsertWithoutOauth_tokensInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutOauth_tokensInput, OrganizationUpdateWithoutOauth_tokensInput>, OrganizationUncheckedUpdateWithoutOauth_tokensInput>
  }

  export type UserUpdateOneWithoutOauth_tokensNestedInput = {
    create?: XOR<UserCreateWithoutOauth_tokensInput, UserUncheckedCreateWithoutOauth_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth_tokensInput
    upsert?: UserUpsertWithoutOauth_tokensInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauth_tokensInput, UserUpdateWithoutOauth_tokensInput>, UserUncheckedUpdateWithoutOauth_tokensInput>
  }

  export type OrganizationCreateNestedOneWithoutAudit_logsInput = {
    create?: XOR<OrganizationCreateWithoutAudit_logsInput, OrganizationUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutAudit_logsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAudit_logsInput = {
    create?: XOR<UserCreateWithoutAudit_logsInput, UserUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAudit_logsInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationUpdateOneRequiredWithoutAudit_logsNestedInput = {
    create?: XOR<OrganizationCreateWithoutAudit_logsInput, OrganizationUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutAudit_logsInput
    upsert?: OrganizationUpsertWithoutAudit_logsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutAudit_logsInput, OrganizationUpdateWithoutAudit_logsInput>, OrganizationUncheckedUpdateWithoutAudit_logsInput>
  }

  export type UserUpdateOneWithoutAudit_logsNestedInput = {
    create?: XOR<UserCreateWithoutAudit_logsInput, UserUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAudit_logsInput
    upsert?: UserUpsertWithoutAudit_logsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAudit_logsInput, UserUpdateWithoutAudit_logsInput>, UserUncheckedUpdateWithoutAudit_logsInput>
  }

  export type OrganizationCreateNestedOneWithoutBackfill_jobsInput = {
    create?: XOR<OrganizationCreateWithoutBackfill_jobsInput, OrganizationUncheckedCreateWithoutBackfill_jobsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutBackfill_jobsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutBackfill_jobsInput = {
    create?: XOR<AccountCreateWithoutBackfill_jobsInput, AccountUncheckedCreateWithoutBackfill_jobsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutBackfill_jobsInput
    connect?: AccountWhereUniqueInput
  }

  export type OrganizationUpdateOneRequiredWithoutBackfill_jobsNestedInput = {
    create?: XOR<OrganizationCreateWithoutBackfill_jobsInput, OrganizationUncheckedCreateWithoutBackfill_jobsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutBackfill_jobsInput
    upsert?: OrganizationUpsertWithoutBackfill_jobsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutBackfill_jobsInput, OrganizationUpdateWithoutBackfill_jobsInput>, OrganizationUncheckedUpdateWithoutBackfill_jobsInput>
  }

  export type AccountUpdateOneRequiredWithoutBackfill_jobsNestedInput = {
    create?: XOR<AccountCreateWithoutBackfill_jobsInput, AccountUncheckedCreateWithoutBackfill_jobsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutBackfill_jobsInput
    upsert?: AccountUpsertWithoutBackfill_jobsInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutBackfill_jobsInput, AccountUpdateWithoutBackfill_jobsInput>, AccountUncheckedUpdateWithoutBackfill_jobsInput>
  }

  export type AccountCreateNestedOneWithoutNotification_preferencesInput = {
    create?: XOR<AccountCreateWithoutNotification_preferencesInput, AccountUncheckedCreateWithoutNotification_preferencesInput>
    connectOrCreate?: AccountCreateOrConnectWithoutNotification_preferencesInput
    connect?: AccountWhereUniqueInput
  }

  export type AccountUpdateOneRequiredWithoutNotification_preferencesNestedInput = {
    create?: XOR<AccountCreateWithoutNotification_preferencesInput, AccountUncheckedCreateWithoutNotification_preferencesInput>
    connectOrCreate?: AccountCreateOrConnectWithoutNotification_preferencesInput
    upsert?: AccountUpsertWithoutNotification_preferencesInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutNotification_preferencesInput, AccountUpdateWithoutNotification_preferencesInput>, AccountUncheckedUpdateWithoutNotification_preferencesInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutOwned_orgsInput = {
    id?: string
    email: string
    password_hash?: string | null
    oidc_provider?: string | null
    mfa_enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutUsersInput
    oauth_tokens?: OAuthTokenCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOwned_orgsInput = {
    id?: string
    org_id: string
    email: string
    password_hash?: string | null
    oidc_provider?: string | null
    mfa_enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    oauth_tokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOwned_orgsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwned_orgsInput, UserUncheckedCreateWithoutOwned_orgsInput>
  }

  export type UserCreateWithoutOrganizationInput = {
    id?: string
    email: string
    password_hash?: string | null
    oidc_provider?: string | null
    mfa_enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    owned_orgs?: OrganizationCreateNestedManyWithoutOwnerInput
    oauth_tokens?: OAuthTokenCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrganizationInput = {
    id?: string
    email: string
    password_hash?: string | null
    oidc_provider?: string | null
    mfa_enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    owned_orgs?: OrganizationUncheckedCreateNestedManyWithoutOwnerInput
    oauth_tokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserCreateManyOrganizationInputEnvelope = {
    data: UserCreateManyOrganizationInput | UserCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type ConnectionCreateWithoutOrganizationInput = {
    id?: string
    plaid_item_id: string
    institution: string
    status?: string
    last_reauth_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    accounts?: AccountCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateWithoutOrganizationInput = {
    id?: string
    plaid_item_id: string
    institution: string
    status?: string
    last_reauth_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionCreateOrConnectWithoutOrganizationInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutOrganizationInput, ConnectionUncheckedCreateWithoutOrganizationInput>
  }

  export type ConnectionCreateManyOrganizationInputEnvelope = {
    data: ConnectionCreateManyOrganizationInput | ConnectionCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type DestinationCreateWithoutOrganizationInput = {
    id?: string
    kind: string
    name: string
    config_json: JsonNullValueInput | InputJsonValue
    secret_ref?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    routing_rules?: RoutingRuleCreateNestedManyWithoutDestinationInput
    deliveries?: DeliveryCreateNestedManyWithoutDestinationInput
  }

  export type DestinationUncheckedCreateWithoutOrganizationInput = {
    id?: string
    kind: string
    name: string
    config_json: JsonNullValueInput | InputJsonValue
    secret_ref?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    routing_rules?: RoutingRuleUncheckedCreateNestedManyWithoutDestinationInput
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutDestinationInput
  }

  export type DestinationCreateOrConnectWithoutOrganizationInput = {
    where: DestinationWhereUniqueInput
    create: XOR<DestinationCreateWithoutOrganizationInput, DestinationUncheckedCreateWithoutOrganizationInput>
  }

  export type DestinationCreateManyOrganizationInputEnvelope = {
    data: DestinationCreateManyOrganizationInput | DestinationCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type WebhookEndpointCreateWithoutOrganizationInput = {
    id?: string
    url: string
    secret_ref: string
    active?: boolean
    last_success_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WebhookEndpointUncheckedCreateWithoutOrganizationInput = {
    id?: string
    url: string
    secret_ref: string
    active?: boolean
    last_success_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WebhookEndpointCreateOrConnectWithoutOrganizationInput = {
    where: WebhookEndpointWhereUniqueInput
    create: XOR<WebhookEndpointCreateWithoutOrganizationInput, WebhookEndpointUncheckedCreateWithoutOrganizationInput>
  }

  export type WebhookEndpointCreateManyOrganizationInputEnvelope = {
    data: WebhookEndpointCreateManyOrganizationInput | WebhookEndpointCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type OAuthTokenCreateWithoutOrganizationInput = {
    id?: string
    provider: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    expires_at?: Date | string | null
    enc_payload: string
    created_at?: Date | string
    updated_at?: Date | string
    user?: UserCreateNestedOneWithoutOauth_tokensInput
  }

  export type OAuthTokenUncheckedCreateWithoutOrganizationInput = {
    id?: string
    user_id?: string | null
    provider: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    expires_at?: Date | string | null
    enc_payload: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OAuthTokenCreateOrConnectWithoutOrganizationInput = {
    where: OAuthTokenWhereUniqueInput
    create: XOR<OAuthTokenCreateWithoutOrganizationInput, OAuthTokenUncheckedCreateWithoutOrganizationInput>
  }

  export type OAuthTokenCreateManyOrganizationInputEnvelope = {
    data: OAuthTokenCreateManyOrganizationInput | OAuthTokenCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutOrganizationInput = {
    id?: string
    action: string
    target_id?: string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    user?: UserCreateNestedOneWithoutAudit_logsInput
  }

  export type AuditLogUncheckedCreateWithoutOrganizationInput = {
    id?: string
    user_id?: string | null
    action: string
    target_id?: string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutOrganizationInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput>
  }

  export type AuditLogCreateManyOrganizationInputEnvelope = {
    data: AuditLogCreateManyOrganizationInput | AuditLogCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type BackfillJobCreateWithoutOrganizationInput = {
    id?: string
    range_start: Date | string
    range_end: Date | string
    status?: string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    account: AccountCreateNestedOneWithoutBackfill_jobsInput
  }

  export type BackfillJobUncheckedCreateWithoutOrganizationInput = {
    id?: string
    account_id: string
    range_start: Date | string
    range_end: Date | string
    status?: string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BackfillJobCreateOrConnectWithoutOrganizationInput = {
    where: BackfillJobWhereUniqueInput
    create: XOR<BackfillJobCreateWithoutOrganizationInput, BackfillJobUncheckedCreateWithoutOrganizationInput>
  }

  export type BackfillJobCreateManyOrganizationInputEnvelope = {
    data: BackfillJobCreateManyOrganizationInput | BackfillJobCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOwned_orgsInput = {
    update: XOR<UserUpdateWithoutOwned_orgsInput, UserUncheckedUpdateWithoutOwned_orgsInput>
    create: XOR<UserCreateWithoutOwned_orgsInput, UserUncheckedCreateWithoutOwned_orgsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwned_orgsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwned_orgsInput, UserUncheckedUpdateWithoutOwned_orgsInput>
  }

  export type UserUpdateWithoutOwned_orgsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    oidc_provider?: NullableStringFieldUpdateOperationsInput | string | null
    mfa_enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    oauth_tokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOwned_orgsInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    oidc_provider?: NullableStringFieldUpdateOperationsInput | string | null
    mfa_enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    oauth_tokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
  }

  export type UserUpdateManyWithWhereWithoutOrganizationInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: UuidFilter<"User"> | string
    org_id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password_hash?: StringNullableFilter<"User"> | string | null
    oidc_provider?: StringNullableFilter<"User"> | string | null
    mfa_enabled?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
  }

  export type ConnectionUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: ConnectionWhereUniqueInput
    update: XOR<ConnectionUpdateWithoutOrganizationInput, ConnectionUncheckedUpdateWithoutOrganizationInput>
    create: XOR<ConnectionCreateWithoutOrganizationInput, ConnectionUncheckedCreateWithoutOrganizationInput>
  }

  export type ConnectionUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: ConnectionWhereUniqueInput
    data: XOR<ConnectionUpdateWithoutOrganizationInput, ConnectionUncheckedUpdateWithoutOrganizationInput>
  }

  export type ConnectionUpdateManyWithWhereWithoutOrganizationInput = {
    where: ConnectionScalarWhereInput
    data: XOR<ConnectionUpdateManyMutationInput, ConnectionUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type ConnectionScalarWhereInput = {
    AND?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
    OR?: ConnectionScalarWhereInput[]
    NOT?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
    id?: UuidFilter<"Connection"> | string
    org_id?: UuidFilter<"Connection"> | string
    plaid_item_id?: StringFilter<"Connection"> | string
    institution?: StringFilter<"Connection"> | string
    status?: StringFilter<"Connection"> | string
    last_reauth_at?: DateTimeNullableFilter<"Connection"> | Date | string | null
    created_at?: DateTimeFilter<"Connection"> | Date | string
    updated_at?: DateTimeFilter<"Connection"> | Date | string
  }

  export type DestinationUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: DestinationWhereUniqueInput
    update: XOR<DestinationUpdateWithoutOrganizationInput, DestinationUncheckedUpdateWithoutOrganizationInput>
    create: XOR<DestinationCreateWithoutOrganizationInput, DestinationUncheckedCreateWithoutOrganizationInput>
  }

  export type DestinationUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: DestinationWhereUniqueInput
    data: XOR<DestinationUpdateWithoutOrganizationInput, DestinationUncheckedUpdateWithoutOrganizationInput>
  }

  export type DestinationUpdateManyWithWhereWithoutOrganizationInput = {
    where: DestinationScalarWhereInput
    data: XOR<DestinationUpdateManyMutationInput, DestinationUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type DestinationScalarWhereInput = {
    AND?: DestinationScalarWhereInput | DestinationScalarWhereInput[]
    OR?: DestinationScalarWhereInput[]
    NOT?: DestinationScalarWhereInput | DestinationScalarWhereInput[]
    id?: UuidFilter<"Destination"> | string
    org_id?: UuidFilter<"Destination"> | string
    kind?: StringFilter<"Destination"> | string
    name?: StringFilter<"Destination"> | string
    config_json?: JsonFilter<"Destination">
    secret_ref?: StringNullableFilter<"Destination"> | string | null
    active?: BoolFilter<"Destination"> | boolean
    created_at?: DateTimeFilter<"Destination"> | Date | string
    updated_at?: DateTimeFilter<"Destination"> | Date | string
  }

  export type WebhookEndpointUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: WebhookEndpointWhereUniqueInput
    update: XOR<WebhookEndpointUpdateWithoutOrganizationInput, WebhookEndpointUncheckedUpdateWithoutOrganizationInput>
    create: XOR<WebhookEndpointCreateWithoutOrganizationInput, WebhookEndpointUncheckedCreateWithoutOrganizationInput>
  }

  export type WebhookEndpointUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: WebhookEndpointWhereUniqueInput
    data: XOR<WebhookEndpointUpdateWithoutOrganizationInput, WebhookEndpointUncheckedUpdateWithoutOrganizationInput>
  }

  export type WebhookEndpointUpdateManyWithWhereWithoutOrganizationInput = {
    where: WebhookEndpointScalarWhereInput
    data: XOR<WebhookEndpointUpdateManyMutationInput, WebhookEndpointUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type WebhookEndpointScalarWhereInput = {
    AND?: WebhookEndpointScalarWhereInput | WebhookEndpointScalarWhereInput[]
    OR?: WebhookEndpointScalarWhereInput[]
    NOT?: WebhookEndpointScalarWhereInput | WebhookEndpointScalarWhereInput[]
    id?: UuidFilter<"WebhookEndpoint"> | string
    org_id?: UuidFilter<"WebhookEndpoint"> | string
    url?: StringFilter<"WebhookEndpoint"> | string
    secret_ref?: StringFilter<"WebhookEndpoint"> | string
    active?: BoolFilter<"WebhookEndpoint"> | boolean
    last_success_at?: DateTimeNullableFilter<"WebhookEndpoint"> | Date | string | null
    created_at?: DateTimeFilter<"WebhookEndpoint"> | Date | string
    updated_at?: DateTimeFilter<"WebhookEndpoint"> | Date | string
  }

  export type OAuthTokenUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: OAuthTokenWhereUniqueInput
    update: XOR<OAuthTokenUpdateWithoutOrganizationInput, OAuthTokenUncheckedUpdateWithoutOrganizationInput>
    create: XOR<OAuthTokenCreateWithoutOrganizationInput, OAuthTokenUncheckedCreateWithoutOrganizationInput>
  }

  export type OAuthTokenUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: OAuthTokenWhereUniqueInput
    data: XOR<OAuthTokenUpdateWithoutOrganizationInput, OAuthTokenUncheckedUpdateWithoutOrganizationInput>
  }

  export type OAuthTokenUpdateManyWithWhereWithoutOrganizationInput = {
    where: OAuthTokenScalarWhereInput
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type OAuthTokenScalarWhereInput = {
    AND?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
    OR?: OAuthTokenScalarWhereInput[]
    NOT?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
    id?: UuidFilter<"OAuthToken"> | string
    org_id?: UuidNullableFilter<"OAuthToken"> | string | null
    user_id?: UuidNullableFilter<"OAuthToken"> | string | null
    provider?: StringFilter<"OAuthToken"> | string
    scopes?: StringNullableListFilter<"OAuthToken">
    expires_at?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    enc_payload?: StringFilter<"OAuthToken"> | string
    created_at?: DateTimeFilter<"OAuthToken"> | Date | string
    updated_at?: DateTimeFilter<"OAuthToken"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutOrganizationInput, AuditLogUncheckedUpdateWithoutOrganizationInput>
    create: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutOrganizationInput, AuditLogUncheckedUpdateWithoutOrganizationInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutOrganizationInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: UuidFilter<"AuditLog"> | string
    org_id?: UuidFilter<"AuditLog"> | string
    user_id?: UuidNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    target_id?: StringNullableFilter<"AuditLog"> | string | null
    meta_json?: JsonNullableFilter<"AuditLog">
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type BackfillJobUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: BackfillJobWhereUniqueInput
    update: XOR<BackfillJobUpdateWithoutOrganizationInput, BackfillJobUncheckedUpdateWithoutOrganizationInput>
    create: XOR<BackfillJobCreateWithoutOrganizationInput, BackfillJobUncheckedCreateWithoutOrganizationInput>
  }

  export type BackfillJobUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: BackfillJobWhereUniqueInput
    data: XOR<BackfillJobUpdateWithoutOrganizationInput, BackfillJobUncheckedUpdateWithoutOrganizationInput>
  }

  export type BackfillJobUpdateManyWithWhereWithoutOrganizationInput = {
    where: BackfillJobScalarWhereInput
    data: XOR<BackfillJobUpdateManyMutationInput, BackfillJobUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type BackfillJobScalarWhereInput = {
    AND?: BackfillJobScalarWhereInput | BackfillJobScalarWhereInput[]
    OR?: BackfillJobScalarWhereInput[]
    NOT?: BackfillJobScalarWhereInput | BackfillJobScalarWhereInput[]
    id?: UuidFilter<"BackfillJob"> | string
    org_id?: UuidFilter<"BackfillJob"> | string
    account_id?: UuidFilter<"BackfillJob"> | string
    range_start?: DateTimeFilter<"BackfillJob"> | Date | string
    range_end?: DateTimeFilter<"BackfillJob"> | Date | string
    status?: StringFilter<"BackfillJob"> | string
    progress?: JsonNullableFilter<"BackfillJob">
    created_at?: DateTimeFilter<"BackfillJob"> | Date | string
    updated_at?: DateTimeFilter<"BackfillJob"> | Date | string
  }

  export type OrganizationCreateWithoutUsersInput = {
    id?: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    owner: UserCreateNestedOneWithoutOwned_orgsInput
    connections?: ConnectionCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutUsersInput = {
    id?: string
    owner_user_id: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    connections?: ConnectionUncheckedCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationUncheckedCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointUncheckedCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenUncheckedCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutUsersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
  }

  export type OrganizationCreateWithoutOwnerInput = {
    id?: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    users?: UserCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutOwnerInput = {
    id?: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionUncheckedCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationUncheckedCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointUncheckedCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenUncheckedCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutOwnerInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput>
  }

  export type OrganizationCreateManyOwnerInputEnvelope = {
    data: OrganizationCreateManyOwnerInput | OrganizationCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type OAuthTokenCreateWithoutUserInput = {
    id?: string
    provider: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    expires_at?: Date | string | null
    enc_payload: string
    created_at?: Date | string
    updated_at?: Date | string
    organization?: OrganizationCreateNestedOneWithoutOauth_tokensInput
  }

  export type OAuthTokenUncheckedCreateWithoutUserInput = {
    id?: string
    org_id?: string | null
    provider: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    expires_at?: Date | string | null
    enc_payload: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OAuthTokenCreateOrConnectWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    create: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthTokenCreateManyUserInputEnvelope = {
    data: OAuthTokenCreateManyUserInput | OAuthTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    target_id?: string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutAudit_logsInput
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    org_id: string
    action: string
    target_id?: string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutUsersInput = {
    update: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutUsersInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type OrganizationUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwned_orgsNestedInput
    connections?: ConnectionUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    owner_user_id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    connections?: ConnectionUncheckedUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUncheckedUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUncheckedUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUncheckedUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUpsertWithWhereUniqueWithoutOwnerInput = {
    where: OrganizationWhereUniqueInput
    update: XOR<OrganizationUpdateWithoutOwnerInput, OrganizationUncheckedUpdateWithoutOwnerInput>
    create: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput>
  }

  export type OrganizationUpdateWithWhereUniqueWithoutOwnerInput = {
    where: OrganizationWhereUniqueInput
    data: XOR<OrganizationUpdateWithoutOwnerInput, OrganizationUncheckedUpdateWithoutOwnerInput>
  }

  export type OrganizationUpdateManyWithWhereWithoutOwnerInput = {
    where: OrganizationScalarWhereInput
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyWithoutOwnerInput>
  }

  export type OrganizationScalarWhereInput = {
    AND?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
    OR?: OrganizationScalarWhereInput[]
    NOT?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
    id?: UuidFilter<"Organization"> | string
    owner_user_id?: UuidFilter<"Organization"> | string
    plan?: StringFilter<"Organization"> | string
    status?: StringFilter<"Organization"> | string
    created_at?: DateTimeFilter<"Organization"> | Date | string
    updated_at?: DateTimeFilter<"Organization"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Organization"> | Date | string | null
  }

  export type OAuthTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    update: XOR<OAuthTokenUpdateWithoutUserInput, OAuthTokenUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    data: XOR<OAuthTokenUpdateWithoutUserInput, OAuthTokenUncheckedUpdateWithoutUserInput>
  }

  export type OAuthTokenUpdateManyWithWhereWithoutUserInput = {
    where: OAuthTokenScalarWhereInput
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type OrganizationCreateWithoutConnectionsInput = {
    id?: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    owner: UserCreateNestedOneWithoutOwned_orgsInput
    users?: UserCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutConnectionsInput = {
    id?: string
    owner_user_id: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationUncheckedCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointUncheckedCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenUncheckedCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutConnectionsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutConnectionsInput, OrganizationUncheckedCreateWithoutConnectionsInput>
  }

  export type AccountCreateWithoutConnectionInput = {
    id?: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    statements?: StatementCreateNestedManyWithoutAccountInput
    routing_rules?: RoutingRuleCreateNestedManyWithoutAccountInput
    notification_preferences?: NotificationPreferenceCreateNestedManyWithoutAccountInput
    backfill_jobs?: BackfillJobCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutConnectionInput = {
    id?: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    statements?: StatementUncheckedCreateNestedManyWithoutAccountInput
    routing_rules?: RoutingRuleUncheckedCreateNestedManyWithoutAccountInput
    notification_preferences?: NotificationPreferenceUncheckedCreateNestedManyWithoutAccountInput
    backfill_jobs?: BackfillJobUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutConnectionInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutConnectionInput, AccountUncheckedCreateWithoutConnectionInput>
  }

  export type AccountCreateManyConnectionInputEnvelope = {
    data: AccountCreateManyConnectionInput | AccountCreateManyConnectionInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutConnectionsInput = {
    update: XOR<OrganizationUpdateWithoutConnectionsInput, OrganizationUncheckedUpdateWithoutConnectionsInput>
    create: XOR<OrganizationCreateWithoutConnectionsInput, OrganizationUncheckedCreateWithoutConnectionsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutConnectionsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutConnectionsInput, OrganizationUncheckedUpdateWithoutConnectionsInput>
  }

  export type OrganizationUpdateWithoutConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwned_orgsNestedInput
    users?: UserUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    owner_user_id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUncheckedUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUncheckedUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUncheckedUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type AccountUpsertWithWhereUniqueWithoutConnectionInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutConnectionInput, AccountUncheckedUpdateWithoutConnectionInput>
    create: XOR<AccountCreateWithoutConnectionInput, AccountUncheckedCreateWithoutConnectionInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutConnectionInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutConnectionInput, AccountUncheckedUpdateWithoutConnectionInput>
  }

  export type AccountUpdateManyWithWhereWithoutConnectionInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutConnectionInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: UuidFilter<"Account"> | string
    connection_id?: UuidFilter<"Account"> | string
    plaid_account_id?: StringFilter<"Account"> | string
    account_last4?: StringFilter<"Account"> | string
    account_name?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    statements_supported?: BoolFilter<"Account"> | boolean
    learned_schedule_json?: JsonNullableFilter<"Account">
    status?: StringFilter<"Account"> | string
    created_at?: DateTimeFilter<"Account"> | Date | string
    updated_at?: DateTimeFilter<"Account"> | Date | string
  }

  export type ConnectionCreateWithoutAccountsInput = {
    id?: string
    plaid_item_id: string
    institution: string
    status?: string
    last_reauth_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutConnectionsInput
  }

  export type ConnectionUncheckedCreateWithoutAccountsInput = {
    id?: string
    org_id: string
    plaid_item_id: string
    institution: string
    status?: string
    last_reauth_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ConnectionCreateOrConnectWithoutAccountsInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutAccountsInput, ConnectionUncheckedCreateWithoutAccountsInput>
  }

  export type StatementCreateWithoutAccountInput = {
    id?: string
    period_start: Date | string
    period_end: Date | string
    statement_date: Date | string
    file_type: string
    checksum: string
    version?: number
    retrieved_at?: Date | string
    created_at?: Date | string
    deliveries?: DeliveryCreateNestedManyWithoutStatementInput
  }

  export type StatementUncheckedCreateWithoutAccountInput = {
    id?: string
    period_start: Date | string
    period_end: Date | string
    statement_date: Date | string
    file_type: string
    checksum: string
    version?: number
    retrieved_at?: Date | string
    created_at?: Date | string
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutStatementInput
  }

  export type StatementCreateOrConnectWithoutAccountInput = {
    where: StatementWhereUniqueInput
    create: XOR<StatementCreateWithoutAccountInput, StatementUncheckedCreateWithoutAccountInput>
  }

  export type StatementCreateManyAccountInputEnvelope = {
    data: StatementCreateManyAccountInput | StatementCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type RoutingRuleCreateWithoutAccountInput = {
    id?: string
    folder_path?: string
    filename_pattern?: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    destination: DestinationCreateNestedOneWithoutRouting_rulesInput
  }

  export type RoutingRuleUncheckedCreateWithoutAccountInput = {
    id?: string
    destination_id: string
    folder_path?: string
    filename_pattern?: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RoutingRuleCreateOrConnectWithoutAccountInput = {
    where: RoutingRuleWhereUniqueInput
    create: XOR<RoutingRuleCreateWithoutAccountInput, RoutingRuleUncheckedCreateWithoutAccountInput>
  }

  export type RoutingRuleCreateManyAccountInputEnvelope = {
    data: RoutingRuleCreateManyAccountInput | RoutingRuleCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type NotificationPreferenceCreateWithoutAccountInput = {
    id?: string
    channel: string
    event_type: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type NotificationPreferenceUncheckedCreateWithoutAccountInput = {
    id?: string
    channel: string
    event_type: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type NotificationPreferenceCreateOrConnectWithoutAccountInput = {
    where: NotificationPreferenceWhereUniqueInput
    create: XOR<NotificationPreferenceCreateWithoutAccountInput, NotificationPreferenceUncheckedCreateWithoutAccountInput>
  }

  export type NotificationPreferenceCreateManyAccountInputEnvelope = {
    data: NotificationPreferenceCreateManyAccountInput | NotificationPreferenceCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type BackfillJobCreateWithoutAccountInput = {
    id?: string
    range_start: Date | string
    range_end: Date | string
    status?: string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutBackfill_jobsInput
  }

  export type BackfillJobUncheckedCreateWithoutAccountInput = {
    id?: string
    org_id: string
    range_start: Date | string
    range_end: Date | string
    status?: string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BackfillJobCreateOrConnectWithoutAccountInput = {
    where: BackfillJobWhereUniqueInput
    create: XOR<BackfillJobCreateWithoutAccountInput, BackfillJobUncheckedCreateWithoutAccountInput>
  }

  export type BackfillJobCreateManyAccountInputEnvelope = {
    data: BackfillJobCreateManyAccountInput | BackfillJobCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type ConnectionUpsertWithoutAccountsInput = {
    update: XOR<ConnectionUpdateWithoutAccountsInput, ConnectionUncheckedUpdateWithoutAccountsInput>
    create: XOR<ConnectionCreateWithoutAccountsInput, ConnectionUncheckedCreateWithoutAccountsInput>
    where?: ConnectionWhereInput
  }

  export type ConnectionUpdateToOneWithWhereWithoutAccountsInput = {
    where?: ConnectionWhereInput
    data: XOR<ConnectionUpdateWithoutAccountsInput, ConnectionUncheckedUpdateWithoutAccountsInput>
  }

  export type ConnectionUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_item_id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    last_reauth_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutConnectionsNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    plaid_item_id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    last_reauth_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatementUpsertWithWhereUniqueWithoutAccountInput = {
    where: StatementWhereUniqueInput
    update: XOR<StatementUpdateWithoutAccountInput, StatementUncheckedUpdateWithoutAccountInput>
    create: XOR<StatementCreateWithoutAccountInput, StatementUncheckedCreateWithoutAccountInput>
  }

  export type StatementUpdateWithWhereUniqueWithoutAccountInput = {
    where: StatementWhereUniqueInput
    data: XOR<StatementUpdateWithoutAccountInput, StatementUncheckedUpdateWithoutAccountInput>
  }

  export type StatementUpdateManyWithWhereWithoutAccountInput = {
    where: StatementScalarWhereInput
    data: XOR<StatementUpdateManyMutationInput, StatementUncheckedUpdateManyWithoutAccountInput>
  }

  export type StatementScalarWhereInput = {
    AND?: StatementScalarWhereInput | StatementScalarWhereInput[]
    OR?: StatementScalarWhereInput[]
    NOT?: StatementScalarWhereInput | StatementScalarWhereInput[]
    id?: UuidFilter<"Statement"> | string
    account_id?: UuidFilter<"Statement"> | string
    period_start?: DateTimeFilter<"Statement"> | Date | string
    period_end?: DateTimeFilter<"Statement"> | Date | string
    statement_date?: DateTimeFilter<"Statement"> | Date | string
    file_type?: StringFilter<"Statement"> | string
    checksum?: StringFilter<"Statement"> | string
    version?: IntFilter<"Statement"> | number
    retrieved_at?: DateTimeFilter<"Statement"> | Date | string
    created_at?: DateTimeFilter<"Statement"> | Date | string
  }

  export type RoutingRuleUpsertWithWhereUniqueWithoutAccountInput = {
    where: RoutingRuleWhereUniqueInput
    update: XOR<RoutingRuleUpdateWithoutAccountInput, RoutingRuleUncheckedUpdateWithoutAccountInput>
    create: XOR<RoutingRuleCreateWithoutAccountInput, RoutingRuleUncheckedCreateWithoutAccountInput>
  }

  export type RoutingRuleUpdateWithWhereUniqueWithoutAccountInput = {
    where: RoutingRuleWhereUniqueInput
    data: XOR<RoutingRuleUpdateWithoutAccountInput, RoutingRuleUncheckedUpdateWithoutAccountInput>
  }

  export type RoutingRuleUpdateManyWithWhereWithoutAccountInput = {
    where: RoutingRuleScalarWhereInput
    data: XOR<RoutingRuleUpdateManyMutationInput, RoutingRuleUncheckedUpdateManyWithoutAccountInput>
  }

  export type RoutingRuleScalarWhereInput = {
    AND?: RoutingRuleScalarWhereInput | RoutingRuleScalarWhereInput[]
    OR?: RoutingRuleScalarWhereInput[]
    NOT?: RoutingRuleScalarWhereInput | RoutingRuleScalarWhereInput[]
    id?: UuidFilter<"RoutingRule"> | string
    account_id?: UuidFilter<"RoutingRule"> | string
    destination_id?: UuidFilter<"RoutingRule"> | string
    folder_path?: StringFilter<"RoutingRule"> | string
    filename_pattern?: StringFilter<"RoutingRule"> | string
    active?: BoolFilter<"RoutingRule"> | boolean
    created_at?: DateTimeFilter<"RoutingRule"> | Date | string
    updated_at?: DateTimeFilter<"RoutingRule"> | Date | string
  }

  export type NotificationPreferenceUpsertWithWhereUniqueWithoutAccountInput = {
    where: NotificationPreferenceWhereUniqueInput
    update: XOR<NotificationPreferenceUpdateWithoutAccountInput, NotificationPreferenceUncheckedUpdateWithoutAccountInput>
    create: XOR<NotificationPreferenceCreateWithoutAccountInput, NotificationPreferenceUncheckedCreateWithoutAccountInput>
  }

  export type NotificationPreferenceUpdateWithWhereUniqueWithoutAccountInput = {
    where: NotificationPreferenceWhereUniqueInput
    data: XOR<NotificationPreferenceUpdateWithoutAccountInput, NotificationPreferenceUncheckedUpdateWithoutAccountInput>
  }

  export type NotificationPreferenceUpdateManyWithWhereWithoutAccountInput = {
    where: NotificationPreferenceScalarWhereInput
    data: XOR<NotificationPreferenceUpdateManyMutationInput, NotificationPreferenceUncheckedUpdateManyWithoutAccountInput>
  }

  export type NotificationPreferenceScalarWhereInput = {
    AND?: NotificationPreferenceScalarWhereInput | NotificationPreferenceScalarWhereInput[]
    OR?: NotificationPreferenceScalarWhereInput[]
    NOT?: NotificationPreferenceScalarWhereInput | NotificationPreferenceScalarWhereInput[]
    id?: UuidFilter<"NotificationPreference"> | string
    account_id?: UuidFilter<"NotificationPreference"> | string
    channel?: StringFilter<"NotificationPreference"> | string
    event_type?: StringFilter<"NotificationPreference"> | string
    enabled?: BoolFilter<"NotificationPreference"> | boolean
    created_at?: DateTimeFilter<"NotificationPreference"> | Date | string
    updated_at?: DateTimeFilter<"NotificationPreference"> | Date | string
  }

  export type BackfillJobUpsertWithWhereUniqueWithoutAccountInput = {
    where: BackfillJobWhereUniqueInput
    update: XOR<BackfillJobUpdateWithoutAccountInput, BackfillJobUncheckedUpdateWithoutAccountInput>
    create: XOR<BackfillJobCreateWithoutAccountInput, BackfillJobUncheckedCreateWithoutAccountInput>
  }

  export type BackfillJobUpdateWithWhereUniqueWithoutAccountInput = {
    where: BackfillJobWhereUniqueInput
    data: XOR<BackfillJobUpdateWithoutAccountInput, BackfillJobUncheckedUpdateWithoutAccountInput>
  }

  export type BackfillJobUpdateManyWithWhereWithoutAccountInput = {
    where: BackfillJobScalarWhereInput
    data: XOR<BackfillJobUpdateManyMutationInput, BackfillJobUncheckedUpdateManyWithoutAccountInput>
  }

  export type AccountCreateWithoutStatementsInput = {
    id?: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    connection: ConnectionCreateNestedOneWithoutAccountsInput
    routing_rules?: RoutingRuleCreateNestedManyWithoutAccountInput
    notification_preferences?: NotificationPreferenceCreateNestedManyWithoutAccountInput
    backfill_jobs?: BackfillJobCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutStatementsInput = {
    id?: string
    connection_id: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    routing_rules?: RoutingRuleUncheckedCreateNestedManyWithoutAccountInput
    notification_preferences?: NotificationPreferenceUncheckedCreateNestedManyWithoutAccountInput
    backfill_jobs?: BackfillJobUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutStatementsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutStatementsInput, AccountUncheckedCreateWithoutStatementsInput>
  }

  export type DeliveryCreateWithoutStatementInput = {
    id?: string
    status?: string
    path?: string | null
    delivered_at?: Date | string | null
    attempts?: number
    last_error?: string | null
    request_id: string
    created_at?: Date | string
    updated_at?: Date | string
    destination: DestinationCreateNestedOneWithoutDeliveriesInput
  }

  export type DeliveryUncheckedCreateWithoutStatementInput = {
    id?: string
    destination_id: string
    status?: string
    path?: string | null
    delivered_at?: Date | string | null
    attempts?: number
    last_error?: string | null
    request_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DeliveryCreateOrConnectWithoutStatementInput = {
    where: DeliveryWhereUniqueInput
    create: XOR<DeliveryCreateWithoutStatementInput, DeliveryUncheckedCreateWithoutStatementInput>
  }

  export type DeliveryCreateManyStatementInputEnvelope = {
    data: DeliveryCreateManyStatementInput | DeliveryCreateManyStatementInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithoutStatementsInput = {
    update: XOR<AccountUpdateWithoutStatementsInput, AccountUncheckedUpdateWithoutStatementsInput>
    create: XOR<AccountCreateWithoutStatementsInput, AccountUncheckedCreateWithoutStatementsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutStatementsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutStatementsInput, AccountUncheckedUpdateWithoutStatementsInput>
  }

  export type AccountUpdateWithoutStatementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneRequiredWithoutAccountsNestedInput
    routing_rules?: RoutingRuleUpdateManyWithoutAccountNestedInput
    notification_preferences?: NotificationPreferenceUpdateManyWithoutAccountNestedInput
    backfill_jobs?: BackfillJobUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutStatementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    connection_id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    routing_rules?: RoutingRuleUncheckedUpdateManyWithoutAccountNestedInput
    notification_preferences?: NotificationPreferenceUncheckedUpdateManyWithoutAccountNestedInput
    backfill_jobs?: BackfillJobUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type DeliveryUpsertWithWhereUniqueWithoutStatementInput = {
    where: DeliveryWhereUniqueInput
    update: XOR<DeliveryUpdateWithoutStatementInput, DeliveryUncheckedUpdateWithoutStatementInput>
    create: XOR<DeliveryCreateWithoutStatementInput, DeliveryUncheckedCreateWithoutStatementInput>
  }

  export type DeliveryUpdateWithWhereUniqueWithoutStatementInput = {
    where: DeliveryWhereUniqueInput
    data: XOR<DeliveryUpdateWithoutStatementInput, DeliveryUncheckedUpdateWithoutStatementInput>
  }

  export type DeliveryUpdateManyWithWhereWithoutStatementInput = {
    where: DeliveryScalarWhereInput
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyWithoutStatementInput>
  }

  export type DeliveryScalarWhereInput = {
    AND?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
    OR?: DeliveryScalarWhereInput[]
    NOT?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
    id?: UuidFilter<"Delivery"> | string
    statement_id?: UuidFilter<"Delivery"> | string
    destination_id?: UuidFilter<"Delivery"> | string
    status?: StringFilter<"Delivery"> | string
    path?: StringNullableFilter<"Delivery"> | string | null
    delivered_at?: DateTimeNullableFilter<"Delivery"> | Date | string | null
    attempts?: IntFilter<"Delivery"> | number
    last_error?: StringNullableFilter<"Delivery"> | string | null
    request_id?: StringFilter<"Delivery"> | string
    created_at?: DateTimeFilter<"Delivery"> | Date | string
    updated_at?: DateTimeFilter<"Delivery"> | Date | string
  }

  export type OrganizationCreateWithoutDestinationsInput = {
    id?: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    owner: UserCreateNestedOneWithoutOwned_orgsInput
    users?: UserCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutDestinationsInput = {
    id?: string
    owner_user_id: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionUncheckedCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointUncheckedCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenUncheckedCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutDestinationsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutDestinationsInput, OrganizationUncheckedCreateWithoutDestinationsInput>
  }

  export type RoutingRuleCreateWithoutDestinationInput = {
    id?: string
    folder_path?: string
    filename_pattern?: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    account: AccountCreateNestedOneWithoutRouting_rulesInput
  }

  export type RoutingRuleUncheckedCreateWithoutDestinationInput = {
    id?: string
    account_id: string
    folder_path?: string
    filename_pattern?: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RoutingRuleCreateOrConnectWithoutDestinationInput = {
    where: RoutingRuleWhereUniqueInput
    create: XOR<RoutingRuleCreateWithoutDestinationInput, RoutingRuleUncheckedCreateWithoutDestinationInput>
  }

  export type RoutingRuleCreateManyDestinationInputEnvelope = {
    data: RoutingRuleCreateManyDestinationInput | RoutingRuleCreateManyDestinationInput[]
    skipDuplicates?: boolean
  }

  export type DeliveryCreateWithoutDestinationInput = {
    id?: string
    status?: string
    path?: string | null
    delivered_at?: Date | string | null
    attempts?: number
    last_error?: string | null
    request_id: string
    created_at?: Date | string
    updated_at?: Date | string
    statement: StatementCreateNestedOneWithoutDeliveriesInput
  }

  export type DeliveryUncheckedCreateWithoutDestinationInput = {
    id?: string
    statement_id: string
    status?: string
    path?: string | null
    delivered_at?: Date | string | null
    attempts?: number
    last_error?: string | null
    request_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DeliveryCreateOrConnectWithoutDestinationInput = {
    where: DeliveryWhereUniqueInput
    create: XOR<DeliveryCreateWithoutDestinationInput, DeliveryUncheckedCreateWithoutDestinationInput>
  }

  export type DeliveryCreateManyDestinationInputEnvelope = {
    data: DeliveryCreateManyDestinationInput | DeliveryCreateManyDestinationInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutDestinationsInput = {
    update: XOR<OrganizationUpdateWithoutDestinationsInput, OrganizationUncheckedUpdateWithoutDestinationsInput>
    create: XOR<OrganizationCreateWithoutDestinationsInput, OrganizationUncheckedCreateWithoutDestinationsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutDestinationsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutDestinationsInput, OrganizationUncheckedUpdateWithoutDestinationsInput>
  }

  export type OrganizationUpdateWithoutDestinationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwned_orgsNestedInput
    users?: UserUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutDestinationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    owner_user_id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUncheckedUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUncheckedUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUncheckedUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type RoutingRuleUpsertWithWhereUniqueWithoutDestinationInput = {
    where: RoutingRuleWhereUniqueInput
    update: XOR<RoutingRuleUpdateWithoutDestinationInput, RoutingRuleUncheckedUpdateWithoutDestinationInput>
    create: XOR<RoutingRuleCreateWithoutDestinationInput, RoutingRuleUncheckedCreateWithoutDestinationInput>
  }

  export type RoutingRuleUpdateWithWhereUniqueWithoutDestinationInput = {
    where: RoutingRuleWhereUniqueInput
    data: XOR<RoutingRuleUpdateWithoutDestinationInput, RoutingRuleUncheckedUpdateWithoutDestinationInput>
  }

  export type RoutingRuleUpdateManyWithWhereWithoutDestinationInput = {
    where: RoutingRuleScalarWhereInput
    data: XOR<RoutingRuleUpdateManyMutationInput, RoutingRuleUncheckedUpdateManyWithoutDestinationInput>
  }

  export type DeliveryUpsertWithWhereUniqueWithoutDestinationInput = {
    where: DeliveryWhereUniqueInput
    update: XOR<DeliveryUpdateWithoutDestinationInput, DeliveryUncheckedUpdateWithoutDestinationInput>
    create: XOR<DeliveryCreateWithoutDestinationInput, DeliveryUncheckedCreateWithoutDestinationInput>
  }

  export type DeliveryUpdateWithWhereUniqueWithoutDestinationInput = {
    where: DeliveryWhereUniqueInput
    data: XOR<DeliveryUpdateWithoutDestinationInput, DeliveryUncheckedUpdateWithoutDestinationInput>
  }

  export type DeliveryUpdateManyWithWhereWithoutDestinationInput = {
    where: DeliveryScalarWhereInput
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyWithoutDestinationInput>
  }

  export type AccountCreateWithoutRouting_rulesInput = {
    id?: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    connection: ConnectionCreateNestedOneWithoutAccountsInput
    statements?: StatementCreateNestedManyWithoutAccountInput
    notification_preferences?: NotificationPreferenceCreateNestedManyWithoutAccountInput
    backfill_jobs?: BackfillJobCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutRouting_rulesInput = {
    id?: string
    connection_id: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    statements?: StatementUncheckedCreateNestedManyWithoutAccountInput
    notification_preferences?: NotificationPreferenceUncheckedCreateNestedManyWithoutAccountInput
    backfill_jobs?: BackfillJobUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutRouting_rulesInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutRouting_rulesInput, AccountUncheckedCreateWithoutRouting_rulesInput>
  }

  export type DestinationCreateWithoutRouting_rulesInput = {
    id?: string
    kind: string
    name: string
    config_json: JsonNullValueInput | InputJsonValue
    secret_ref?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutDestinationsInput
    deliveries?: DeliveryCreateNestedManyWithoutDestinationInput
  }

  export type DestinationUncheckedCreateWithoutRouting_rulesInput = {
    id?: string
    org_id: string
    kind: string
    name: string
    config_json: JsonNullValueInput | InputJsonValue
    secret_ref?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutDestinationInput
  }

  export type DestinationCreateOrConnectWithoutRouting_rulesInput = {
    where: DestinationWhereUniqueInput
    create: XOR<DestinationCreateWithoutRouting_rulesInput, DestinationUncheckedCreateWithoutRouting_rulesInput>
  }

  export type AccountUpsertWithoutRouting_rulesInput = {
    update: XOR<AccountUpdateWithoutRouting_rulesInput, AccountUncheckedUpdateWithoutRouting_rulesInput>
    create: XOR<AccountCreateWithoutRouting_rulesInput, AccountUncheckedCreateWithoutRouting_rulesInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutRouting_rulesInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutRouting_rulesInput, AccountUncheckedUpdateWithoutRouting_rulesInput>
  }

  export type AccountUpdateWithoutRouting_rulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneRequiredWithoutAccountsNestedInput
    statements?: StatementUpdateManyWithoutAccountNestedInput
    notification_preferences?: NotificationPreferenceUpdateManyWithoutAccountNestedInput
    backfill_jobs?: BackfillJobUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutRouting_rulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    connection_id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUncheckedUpdateManyWithoutAccountNestedInput
    notification_preferences?: NotificationPreferenceUncheckedUpdateManyWithoutAccountNestedInput
    backfill_jobs?: BackfillJobUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type DestinationUpsertWithoutRouting_rulesInput = {
    update: XOR<DestinationUpdateWithoutRouting_rulesInput, DestinationUncheckedUpdateWithoutRouting_rulesInput>
    create: XOR<DestinationCreateWithoutRouting_rulesInput, DestinationUncheckedCreateWithoutRouting_rulesInput>
    where?: DestinationWhereInput
  }

  export type DestinationUpdateToOneWithWhereWithoutRouting_rulesInput = {
    where?: DestinationWhereInput
    data: XOR<DestinationUpdateWithoutRouting_rulesInput, DestinationUncheckedUpdateWithoutRouting_rulesInput>
  }

  export type DestinationUpdateWithoutRouting_rulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    config_json?: JsonNullValueInput | InputJsonValue
    secret_ref?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutDestinationsNestedInput
    deliveries?: DeliveryUpdateManyWithoutDestinationNestedInput
  }

  export type DestinationUncheckedUpdateWithoutRouting_rulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    config_json?: JsonNullValueInput | InputJsonValue
    secret_ref?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryUncheckedUpdateManyWithoutDestinationNestedInput
  }

  export type StatementCreateWithoutDeliveriesInput = {
    id?: string
    period_start: Date | string
    period_end: Date | string
    statement_date: Date | string
    file_type: string
    checksum: string
    version?: number
    retrieved_at?: Date | string
    created_at?: Date | string
    account: AccountCreateNestedOneWithoutStatementsInput
  }

  export type StatementUncheckedCreateWithoutDeliveriesInput = {
    id?: string
    account_id: string
    period_start: Date | string
    period_end: Date | string
    statement_date: Date | string
    file_type: string
    checksum: string
    version?: number
    retrieved_at?: Date | string
    created_at?: Date | string
  }

  export type StatementCreateOrConnectWithoutDeliveriesInput = {
    where: StatementWhereUniqueInput
    create: XOR<StatementCreateWithoutDeliveriesInput, StatementUncheckedCreateWithoutDeliveriesInput>
  }

  export type DestinationCreateWithoutDeliveriesInput = {
    id?: string
    kind: string
    name: string
    config_json: JsonNullValueInput | InputJsonValue
    secret_ref?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutDestinationsInput
    routing_rules?: RoutingRuleCreateNestedManyWithoutDestinationInput
  }

  export type DestinationUncheckedCreateWithoutDeliveriesInput = {
    id?: string
    org_id: string
    kind: string
    name: string
    config_json: JsonNullValueInput | InputJsonValue
    secret_ref?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    routing_rules?: RoutingRuleUncheckedCreateNestedManyWithoutDestinationInput
  }

  export type DestinationCreateOrConnectWithoutDeliveriesInput = {
    where: DestinationWhereUniqueInput
    create: XOR<DestinationCreateWithoutDeliveriesInput, DestinationUncheckedCreateWithoutDeliveriesInput>
  }

  export type StatementUpsertWithoutDeliveriesInput = {
    update: XOR<StatementUpdateWithoutDeliveriesInput, StatementUncheckedUpdateWithoutDeliveriesInput>
    create: XOR<StatementCreateWithoutDeliveriesInput, StatementUncheckedCreateWithoutDeliveriesInput>
    where?: StatementWhereInput
  }

  export type StatementUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: StatementWhereInput
    data: XOR<StatementUpdateWithoutDeliveriesInput, StatementUncheckedUpdateWithoutDeliveriesInput>
  }

  export type StatementUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    period_end?: DateTimeFieldUpdateOperationsInput | Date | string
    statement_date?: DateTimeFieldUpdateOperationsInput | Date | string
    file_type?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    retrieved_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutStatementsNestedInput
  }

  export type StatementUncheckedUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    period_end?: DateTimeFieldUpdateOperationsInput | Date | string
    statement_date?: DateTimeFieldUpdateOperationsInput | Date | string
    file_type?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    retrieved_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DestinationUpsertWithoutDeliveriesInput = {
    update: XOR<DestinationUpdateWithoutDeliveriesInput, DestinationUncheckedUpdateWithoutDeliveriesInput>
    create: XOR<DestinationCreateWithoutDeliveriesInput, DestinationUncheckedCreateWithoutDeliveriesInput>
    where?: DestinationWhereInput
  }

  export type DestinationUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: DestinationWhereInput
    data: XOR<DestinationUpdateWithoutDeliveriesInput, DestinationUncheckedUpdateWithoutDeliveriesInput>
  }

  export type DestinationUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    config_json?: JsonNullValueInput | InputJsonValue
    secret_ref?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutDestinationsNestedInput
    routing_rules?: RoutingRuleUpdateManyWithoutDestinationNestedInput
  }

  export type DestinationUncheckedUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    config_json?: JsonNullValueInput | InputJsonValue
    secret_ref?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    routing_rules?: RoutingRuleUncheckedUpdateManyWithoutDestinationNestedInput
  }

  export type OrganizationCreateWithoutWebhook_endpointsInput = {
    id?: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    owner: UserCreateNestedOneWithoutOwned_orgsInput
    users?: UserCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutWebhook_endpointsInput = {
    id?: string
    owner_user_id: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionUncheckedCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationUncheckedCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenUncheckedCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutWebhook_endpointsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutWebhook_endpointsInput, OrganizationUncheckedCreateWithoutWebhook_endpointsInput>
  }

  export type OrganizationUpsertWithoutWebhook_endpointsInput = {
    update: XOR<OrganizationUpdateWithoutWebhook_endpointsInput, OrganizationUncheckedUpdateWithoutWebhook_endpointsInput>
    create: XOR<OrganizationCreateWithoutWebhook_endpointsInput, OrganizationUncheckedCreateWithoutWebhook_endpointsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutWebhook_endpointsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutWebhook_endpointsInput, OrganizationUncheckedUpdateWithoutWebhook_endpointsInput>
  }

  export type OrganizationUpdateWithoutWebhook_endpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwned_orgsNestedInput
    users?: UserUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutWebhook_endpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    owner_user_id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUncheckedUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUncheckedUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUncheckedUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateWithoutOauth_tokensInput = {
    id?: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    owner: UserCreateNestedOneWithoutOwned_orgsInput
    users?: UserCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutOauth_tokensInput = {
    id?: string
    owner_user_id: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionUncheckedCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationUncheckedCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointUncheckedCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutOauth_tokensInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutOauth_tokensInput, OrganizationUncheckedCreateWithoutOauth_tokensInput>
  }

  export type UserCreateWithoutOauth_tokensInput = {
    id?: string
    email: string
    password_hash?: string | null
    oidc_provider?: string | null
    mfa_enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutUsersInput
    owned_orgs?: OrganizationCreateNestedManyWithoutOwnerInput
    audit_logs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauth_tokensInput = {
    id?: string
    org_id: string
    email: string
    password_hash?: string | null
    oidc_provider?: string | null
    mfa_enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    owned_orgs?: OrganizationUncheckedCreateNestedManyWithoutOwnerInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauth_tokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauth_tokensInput, UserUncheckedCreateWithoutOauth_tokensInput>
  }

  export type OrganizationUpsertWithoutOauth_tokensInput = {
    update: XOR<OrganizationUpdateWithoutOauth_tokensInput, OrganizationUncheckedUpdateWithoutOauth_tokensInput>
    create: XOR<OrganizationCreateWithoutOauth_tokensInput, OrganizationUncheckedCreateWithoutOauth_tokensInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutOauth_tokensInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutOauth_tokensInput, OrganizationUncheckedUpdateWithoutOauth_tokensInput>
  }

  export type OrganizationUpdateWithoutOauth_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwned_orgsNestedInput
    users?: UserUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutOauth_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    owner_user_id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUncheckedUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUncheckedUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUncheckedUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type UserUpsertWithoutOauth_tokensInput = {
    update: XOR<UserUpdateWithoutOauth_tokensInput, UserUncheckedUpdateWithoutOauth_tokensInput>
    create: XOR<UserCreateWithoutOauth_tokensInput, UserUncheckedCreateWithoutOauth_tokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauth_tokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauth_tokensInput, UserUncheckedUpdateWithoutOauth_tokensInput>
  }

  export type UserUpdateWithoutOauth_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    oidc_provider?: NullableStringFieldUpdateOperationsInput | string | null
    mfa_enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    owned_orgs?: OrganizationUpdateManyWithoutOwnerNestedInput
    audit_logs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauth_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    oidc_provider?: NullableStringFieldUpdateOperationsInput | string | null
    mfa_enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    owned_orgs?: OrganizationUncheckedUpdateManyWithoutOwnerNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrganizationCreateWithoutAudit_logsInput = {
    id?: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    owner: UserCreateNestedOneWithoutOwned_orgsInput
    users?: UserCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutAudit_logsInput = {
    id?: string
    owner_user_id: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionUncheckedCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationUncheckedCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointUncheckedCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenUncheckedCreateNestedManyWithoutOrganizationInput
    backfill_jobs?: BackfillJobUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutAudit_logsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutAudit_logsInput, OrganizationUncheckedCreateWithoutAudit_logsInput>
  }

  export type UserCreateWithoutAudit_logsInput = {
    id?: string
    email: string
    password_hash?: string | null
    oidc_provider?: string | null
    mfa_enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutUsersInput
    owned_orgs?: OrganizationCreateNestedManyWithoutOwnerInput
    oauth_tokens?: OAuthTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAudit_logsInput = {
    id?: string
    org_id: string
    email: string
    password_hash?: string | null
    oidc_provider?: string | null
    mfa_enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    owned_orgs?: OrganizationUncheckedCreateNestedManyWithoutOwnerInput
    oauth_tokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAudit_logsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAudit_logsInput, UserUncheckedCreateWithoutAudit_logsInput>
  }

  export type OrganizationUpsertWithoutAudit_logsInput = {
    update: XOR<OrganizationUpdateWithoutAudit_logsInput, OrganizationUncheckedUpdateWithoutAudit_logsInput>
    create: XOR<OrganizationCreateWithoutAudit_logsInput, OrganizationUncheckedCreateWithoutAudit_logsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutAudit_logsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutAudit_logsInput, OrganizationUncheckedUpdateWithoutAudit_logsInput>
  }

  export type OrganizationUpdateWithoutAudit_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwned_orgsNestedInput
    users?: UserUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutAudit_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    owner_user_id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUncheckedUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUncheckedUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUncheckedUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUncheckedUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type UserUpsertWithoutAudit_logsInput = {
    update: XOR<UserUpdateWithoutAudit_logsInput, UserUncheckedUpdateWithoutAudit_logsInput>
    create: XOR<UserCreateWithoutAudit_logsInput, UserUncheckedCreateWithoutAudit_logsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAudit_logsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAudit_logsInput, UserUncheckedUpdateWithoutAudit_logsInput>
  }

  export type UserUpdateWithoutAudit_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    oidc_provider?: NullableStringFieldUpdateOperationsInput | string | null
    mfa_enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    owned_orgs?: OrganizationUpdateManyWithoutOwnerNestedInput
    oauth_tokens?: OAuthTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAudit_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    oidc_provider?: NullableStringFieldUpdateOperationsInput | string | null
    mfa_enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    owned_orgs?: OrganizationUncheckedUpdateManyWithoutOwnerNestedInput
    oauth_tokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrganizationCreateWithoutBackfill_jobsInput = {
    id?: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    owner: UserCreateNestedOneWithoutOwned_orgsInput
    users?: UserCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutBackfill_jobsInput = {
    id?: string
    owner_user_id: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    connections?: ConnectionUncheckedCreateNestedManyWithoutOrganizationInput
    destinations?: DestinationUncheckedCreateNestedManyWithoutOrganizationInput
    webhook_endpoints?: WebhookEndpointUncheckedCreateNestedManyWithoutOrganizationInput
    oauth_tokens?: OAuthTokenUncheckedCreateNestedManyWithoutOrganizationInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutBackfill_jobsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutBackfill_jobsInput, OrganizationUncheckedCreateWithoutBackfill_jobsInput>
  }

  export type AccountCreateWithoutBackfill_jobsInput = {
    id?: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    connection: ConnectionCreateNestedOneWithoutAccountsInput
    statements?: StatementCreateNestedManyWithoutAccountInput
    routing_rules?: RoutingRuleCreateNestedManyWithoutAccountInput
    notification_preferences?: NotificationPreferenceCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutBackfill_jobsInput = {
    id?: string
    connection_id: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    statements?: StatementUncheckedCreateNestedManyWithoutAccountInput
    routing_rules?: RoutingRuleUncheckedCreateNestedManyWithoutAccountInput
    notification_preferences?: NotificationPreferenceUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutBackfill_jobsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutBackfill_jobsInput, AccountUncheckedCreateWithoutBackfill_jobsInput>
  }

  export type OrganizationUpsertWithoutBackfill_jobsInput = {
    update: XOR<OrganizationUpdateWithoutBackfill_jobsInput, OrganizationUncheckedUpdateWithoutBackfill_jobsInput>
    create: XOR<OrganizationCreateWithoutBackfill_jobsInput, OrganizationUncheckedCreateWithoutBackfill_jobsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutBackfill_jobsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutBackfill_jobsInput, OrganizationUncheckedUpdateWithoutBackfill_jobsInput>
  }

  export type OrganizationUpdateWithoutBackfill_jobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwned_orgsNestedInput
    users?: UserUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutBackfill_jobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    owner_user_id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUncheckedUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUncheckedUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUncheckedUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUncheckedUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type AccountUpsertWithoutBackfill_jobsInput = {
    update: XOR<AccountUpdateWithoutBackfill_jobsInput, AccountUncheckedUpdateWithoutBackfill_jobsInput>
    create: XOR<AccountCreateWithoutBackfill_jobsInput, AccountUncheckedCreateWithoutBackfill_jobsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutBackfill_jobsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutBackfill_jobsInput, AccountUncheckedUpdateWithoutBackfill_jobsInput>
  }

  export type AccountUpdateWithoutBackfill_jobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneRequiredWithoutAccountsNestedInput
    statements?: StatementUpdateManyWithoutAccountNestedInput
    routing_rules?: RoutingRuleUpdateManyWithoutAccountNestedInput
    notification_preferences?: NotificationPreferenceUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutBackfill_jobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    connection_id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUncheckedUpdateManyWithoutAccountNestedInput
    routing_rules?: RoutingRuleUncheckedUpdateManyWithoutAccountNestedInput
    notification_preferences?: NotificationPreferenceUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountCreateWithoutNotification_preferencesInput = {
    id?: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    connection: ConnectionCreateNestedOneWithoutAccountsInput
    statements?: StatementCreateNestedManyWithoutAccountInput
    routing_rules?: RoutingRuleCreateNestedManyWithoutAccountInput
    backfill_jobs?: BackfillJobCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutNotification_preferencesInput = {
    id?: string
    connection_id: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    statements?: StatementUncheckedCreateNestedManyWithoutAccountInput
    routing_rules?: RoutingRuleUncheckedCreateNestedManyWithoutAccountInput
    backfill_jobs?: BackfillJobUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutNotification_preferencesInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutNotification_preferencesInput, AccountUncheckedCreateWithoutNotification_preferencesInput>
  }

  export type AccountUpsertWithoutNotification_preferencesInput = {
    update: XOR<AccountUpdateWithoutNotification_preferencesInput, AccountUncheckedUpdateWithoutNotification_preferencesInput>
    create: XOR<AccountCreateWithoutNotification_preferencesInput, AccountUncheckedCreateWithoutNotification_preferencesInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutNotification_preferencesInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutNotification_preferencesInput, AccountUncheckedUpdateWithoutNotification_preferencesInput>
  }

  export type AccountUpdateWithoutNotification_preferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneRequiredWithoutAccountsNestedInput
    statements?: StatementUpdateManyWithoutAccountNestedInput
    routing_rules?: RoutingRuleUpdateManyWithoutAccountNestedInput
    backfill_jobs?: BackfillJobUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutNotification_preferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    connection_id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUncheckedUpdateManyWithoutAccountNestedInput
    routing_rules?: RoutingRuleUncheckedUpdateManyWithoutAccountNestedInput
    backfill_jobs?: BackfillJobUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type UserCreateManyOrganizationInput = {
    id?: string
    email: string
    password_hash?: string | null
    oidc_provider?: string | null
    mfa_enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ConnectionCreateManyOrganizationInput = {
    id?: string
    plaid_item_id: string
    institution: string
    status?: string
    last_reauth_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DestinationCreateManyOrganizationInput = {
    id?: string
    kind: string
    name: string
    config_json: JsonNullValueInput | InputJsonValue
    secret_ref?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WebhookEndpointCreateManyOrganizationInput = {
    id?: string
    url: string
    secret_ref: string
    active?: boolean
    last_success_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OAuthTokenCreateManyOrganizationInput = {
    id?: string
    user_id?: string | null
    provider: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    expires_at?: Date | string | null
    enc_payload: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AuditLogCreateManyOrganizationInput = {
    id?: string
    user_id?: string | null
    action: string
    target_id?: string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type BackfillJobCreateManyOrganizationInput = {
    id?: string
    account_id: string
    range_start: Date | string
    range_end: Date | string
    status?: string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    oidc_provider?: NullableStringFieldUpdateOperationsInput | string | null
    mfa_enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    owned_orgs?: OrganizationUpdateManyWithoutOwnerNestedInput
    oauth_tokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    oidc_provider?: NullableStringFieldUpdateOperationsInput | string | null
    mfa_enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    owned_orgs?: OrganizationUncheckedUpdateManyWithoutOwnerNestedInput
    oauth_tokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    oidc_provider?: NullableStringFieldUpdateOperationsInput | string | null
    mfa_enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_item_id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    last_reauth_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_item_id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    last_reauth_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_item_id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    last_reauth_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DestinationUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    config_json?: JsonNullValueInput | InputJsonValue
    secret_ref?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    routing_rules?: RoutingRuleUpdateManyWithoutDestinationNestedInput
    deliveries?: DeliveryUpdateManyWithoutDestinationNestedInput
  }

  export type DestinationUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    config_json?: JsonNullValueInput | InputJsonValue
    secret_ref?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    routing_rules?: RoutingRuleUncheckedUpdateManyWithoutDestinationNestedInput
    deliveries?: DeliveryUncheckedUpdateManyWithoutDestinationNestedInput
  }

  export type DestinationUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    config_json?: JsonNullValueInput | InputJsonValue
    secret_ref?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEndpointUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret_ref?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    last_success_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEndpointUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret_ref?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    last_success_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEndpointUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret_ref?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    last_success_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enc_payload?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutOauth_tokensNestedInput
  }

  export type OAuthTokenUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enc_payload?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enc_payload?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAudit_logsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackfillJobUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    range_start?: DateTimeFieldUpdateOperationsInput | Date | string
    range_end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutBackfill_jobsNestedInput
  }

  export type BackfillJobUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    range_start?: DateTimeFieldUpdateOperationsInput | Date | string
    range_end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackfillJobUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    range_start?: DateTimeFieldUpdateOperationsInput | Date | string
    range_end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationCreateManyOwnerInput = {
    id?: string
    plan?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type OAuthTokenCreateManyUserInput = {
    id?: string
    org_id?: string | null
    provider: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    expires_at?: Date | string | null
    enc_payload: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    org_id: string
    action: string
    target_id?: string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type OrganizationUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    connections?: ConnectionUncheckedUpdateManyWithoutOrganizationNestedInput
    destinations?: DestinationUncheckedUpdateManyWithoutOrganizationNestedInput
    webhook_endpoints?: WebhookEndpointUncheckedUpdateManyWithoutOrganizationNestedInput
    oauth_tokens?: OAuthTokenUncheckedUpdateManyWithoutOrganizationNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
    backfill_jobs?: BackfillJobUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OAuthTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enc_payload?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutOauth_tokensNestedInput
  }

  export type OAuthTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enc_payload?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enc_payload?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutAudit_logsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_json?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyConnectionInput = {
    id?: string
    plaid_account_id: string
    account_last4: string
    account_name: string
    type: string
    statements_supported?: boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AccountUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUpdateManyWithoutAccountNestedInput
    routing_rules?: RoutingRuleUpdateManyWithoutAccountNestedInput
    notification_preferences?: NotificationPreferenceUpdateManyWithoutAccountNestedInput
    backfill_jobs?: BackfillJobUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    statements?: StatementUncheckedUpdateManyWithoutAccountNestedInput
    routing_rules?: RoutingRuleUncheckedUpdateManyWithoutAccountNestedInput
    notification_preferences?: NotificationPreferenceUncheckedUpdateManyWithoutAccountNestedInput
    backfill_jobs?: BackfillJobUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateManyWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    plaid_account_id?: StringFieldUpdateOperationsInput | string
    account_last4?: StringFieldUpdateOperationsInput | string
    account_name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    statements_supported?: BoolFieldUpdateOperationsInput | boolean
    learned_schedule_json?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatementCreateManyAccountInput = {
    id?: string
    period_start: Date | string
    period_end: Date | string
    statement_date: Date | string
    file_type: string
    checksum: string
    version?: number
    retrieved_at?: Date | string
    created_at?: Date | string
  }

  export type RoutingRuleCreateManyAccountInput = {
    id?: string
    destination_id: string
    folder_path?: string
    filename_pattern?: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type NotificationPreferenceCreateManyAccountInput = {
    id?: string
    channel: string
    event_type: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BackfillJobCreateManyAccountInput = {
    id?: string
    org_id: string
    range_start: Date | string
    range_end: Date | string
    status?: string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type StatementUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    period_end?: DateTimeFieldUpdateOperationsInput | Date | string
    statement_date?: DateTimeFieldUpdateOperationsInput | Date | string
    file_type?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    retrieved_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryUpdateManyWithoutStatementNestedInput
  }

  export type StatementUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    period_end?: DateTimeFieldUpdateOperationsInput | Date | string
    statement_date?: DateTimeFieldUpdateOperationsInput | Date | string
    file_type?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    retrieved_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryUncheckedUpdateManyWithoutStatementNestedInput
  }

  export type StatementUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    period_end?: DateTimeFieldUpdateOperationsInput | Date | string
    statement_date?: DateTimeFieldUpdateOperationsInput | Date | string
    file_type?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    retrieved_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingRuleUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    folder_path?: StringFieldUpdateOperationsInput | string
    filename_pattern?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    destination?: DestinationUpdateOneRequiredWithoutRouting_rulesNestedInput
  }

  export type RoutingRuleUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    destination_id?: StringFieldUpdateOperationsInput | string
    folder_path?: StringFieldUpdateOperationsInput | string
    filename_pattern?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingRuleUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    destination_id?: StringFieldUpdateOperationsInput | string
    folder_path?: StringFieldUpdateOperationsInput | string
    filename_pattern?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackfillJobUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    range_start?: DateTimeFieldUpdateOperationsInput | Date | string
    range_end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutBackfill_jobsNestedInput
  }

  export type BackfillJobUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    range_start?: DateTimeFieldUpdateOperationsInput | Date | string
    range_end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackfillJobUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    org_id?: StringFieldUpdateOperationsInput | string
    range_start?: DateTimeFieldUpdateOperationsInput | Date | string
    range_end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryCreateManyStatementInput = {
    id?: string
    destination_id: string
    status?: string
    path?: string | null
    delivered_at?: Date | string | null
    attempts?: number
    last_error?: string | null
    request_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DeliveryUpdateWithoutStatementInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    delivered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
    request_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    destination?: DestinationUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type DeliveryUncheckedUpdateWithoutStatementInput = {
    id?: StringFieldUpdateOperationsInput | string
    destination_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    delivered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
    request_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUncheckedUpdateManyWithoutStatementInput = {
    id?: StringFieldUpdateOperationsInput | string
    destination_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    delivered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
    request_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingRuleCreateManyDestinationInput = {
    id?: string
    account_id: string
    folder_path?: string
    filename_pattern?: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DeliveryCreateManyDestinationInput = {
    id?: string
    statement_id: string
    status?: string
    path?: string | null
    delivered_at?: Date | string | null
    attempts?: number
    last_error?: string | null
    request_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RoutingRuleUpdateWithoutDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    folder_path?: StringFieldUpdateOperationsInput | string
    filename_pattern?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutRouting_rulesNestedInput
  }

  export type RoutingRuleUncheckedUpdateWithoutDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    folder_path?: StringFieldUpdateOperationsInput | string
    filename_pattern?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingRuleUncheckedUpdateManyWithoutDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    folder_path?: StringFieldUpdateOperationsInput | string
    filename_pattern?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUpdateWithoutDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    delivered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
    request_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    statement?: StatementUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type DeliveryUncheckedUpdateWithoutDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    statement_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    delivered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
    request_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUncheckedUpdateManyWithoutDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    statement_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    delivered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
    request_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use OrganizationCountOutputTypeDefaultArgs instead
     */
    export type OrganizationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConnectionCountOutputTypeDefaultArgs instead
     */
    export type ConnectionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConnectionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AccountCountOutputTypeDefaultArgs instead
     */
    export type AccountCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AccountCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StatementCountOutputTypeDefaultArgs instead
     */
    export type StatementCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StatementCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DestinationCountOutputTypeDefaultArgs instead
     */
    export type DestinationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DestinationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrganizationDefaultArgs instead
     */
    export type OrganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConnectionDefaultArgs instead
     */
    export type ConnectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConnectionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AccountDefaultArgs instead
     */
    export type AccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StatementDefaultArgs instead
     */
    export type StatementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StatementDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DestinationDefaultArgs instead
     */
    export type DestinationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DestinationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoutingRuleDefaultArgs instead
     */
    export type RoutingRuleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoutingRuleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeliveryDefaultArgs instead
     */
    export type DeliveryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeliveryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WebhookEndpointDefaultArgs instead
     */
    export type WebhookEndpointArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WebhookEndpointDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OAuthTokenDefaultArgs instead
     */
    export type OAuthTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OAuthTokenDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BackfillJobDefaultArgs instead
     */
    export type BackfillJobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BackfillJobDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationPreferenceDefaultArgs instead
     */
    export type NotificationPreferenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationPreferenceDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}