/**
 * Edge-compatible Plaid API service
 * Uses native fetch() and Web APIs only
 */
import type {
  PlaidConfig,
  PlaidResult,
  PlaidError,
  LinkTokenRequest,
  LinkTokenResponse,
  ItemPublicTokenExchangeRequest,
  ItemPublicTokenExchangeResponse,
  AccountsGetResponse,
  StatementsListRequest,
  StatementsListResponse,
  StatementsDownloadRequest,
  InstitutionsGetByIdResponse,
} from "./types";
import { TokenEncryption } from "./encryption";
import { prisma } from "@bsr/database";

export class PlaidService {
  private config: PlaidConfig;
  private encryption: TokenEncryption;
  private baseUrl: string;

  constructor(config: PlaidConfig, encryptionKey: string) {
    this.config = config;
    this.encryption = new TokenEncryption(encryptionKey);

    // Set Plaid API base URL based on environment
    this.baseUrl = {
      sandbox: "https://sandbox.api.plaid.com",
      development: "https://development.api.plaid.com",
      production: "https://production.api.plaid.com",
    }[config.environment];
  }

  /**
   * Create a link token for Plaid Link initialization
   */
  async createLinkToken(
    userId: string,
    clientName: string = "BankStatementRetriever",
  ): Promise<PlaidResult<LinkTokenResponse>> {
    try {
      const request: LinkTokenRequest = {
        client_name: clientName,
        country_codes: ["US"],
        language: "en",
        user: {
          client_user_id: userId,
        },
        products: ["statements"],
        webhook: this.config.webhook,
        account_filters: {
          depository: {
            account_subtypes: ["checking", "savings"],
          },
        },
      };

      const response = await this.makeRequest<LinkTokenResponse>(
        "/link/token/create",
        request,
      );
      return response;
    } catch (error) {
      console.error("Plaid link token creation failed:", error);
      return {
        success: false,
        error: this.parseError(error),
      };
    }
  }

  /**
   * Exchange public token for access token
   */
  async exchangePublicToken(
    publicToken: string,
  ): Promise<PlaidResult<ItemPublicTokenExchangeResponse>> {
    try {
      const request: ItemPublicTokenExchangeRequest = {
        public_token: publicToken,
      };

      const response = await this.makeRequest<ItemPublicTokenExchangeResponse>(
        "/link/token/exchange",
        request,
      );
      return response;
    } catch (error) {
      console.error("Plaid token exchange failed:", error);
      return {
        success: false,
        error: this.parseError(error),
      };
    }
  }

  /**
   * Get accounts for an access token
   */
  async getAccounts(
    accessToken: string,
  ): Promise<PlaidResult<AccountsGetResponse>> {
    try {
      const request = {
        access_token: accessToken,
      };

      const response = await this.makeRequest<AccountsGetResponse>(
        "/accounts/get",
        request,
      );
      return response;
    } catch (error) {
      console.error("Plaid accounts fetch failed:", error);
      return {
        success: false,
        error: this.parseError(error),
      };
    }
  }

  /**
   * Get institution information
   */
  async getInstitution(
    institutionId: string,
  ): Promise<PlaidResult<InstitutionsGetByIdResponse>> {
    try {
      const request = {
        institution_id: institutionId,
        country_codes: ["US"],
      };

      const response = await this.makeRequest<InstitutionsGetByIdResponse>(
        "/institutions/get_by_id",
        request,
      );
      return response;
    } catch (error) {
      console.error("Plaid institution fetch failed:", error);
      return {
        success: false,
        error: this.parseError(error),
      };
    }
  }

  /**
   * List available statements for account
   */
  async getStatements(
    accessToken: string,
    accountId: string,
    options: {
      startDate?: string;
      endDate?: string;
      count?: number;
      offset?: number;
    } = {},
  ): Promise<PlaidResult<StatementsListResponse>> {
    try {
      const request: StatementsListRequest = {
        access_token: accessToken,
        account_id: accountId,
        ...options,
      };

      const response = await this.makeRequest<StatementsListResponse>(
        "/statements/list",
        request,
      );
      return response;
    } catch (error) {
      console.error("Plaid statements list failed:", error);
      return {
        success: false,
        error: this.parseError(error),
      };
    }
  }

  /**
   * Download statement as stream (memory-efficient)
   */
  async downloadStatement(
    accessToken: string,
    statementId: string,
  ): Promise<PlaidResult<ReadableStream<Uint8Array>>> {
    try {
      const request: StatementsDownloadRequest = {
        access_token: accessToken,
        statement_id: statementId,
      };

      const response = await fetch(`${this.baseUrl}/statements/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "PLAID-CLIENT-ID": this.config.clientId,
          "PLAID-SECRET": this.config.secret,
          "User-Agent": "BankStatementRetriever/1.0",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      if (!response.body) {
        throw new Error("No response body received");
      }

      return {
        success: true,
        data: response.body,
      };
    } catch (error) {
      console.error("Plaid statement download failed:", error);
      return {
        success: false,
        error: this.parseError(error),
      };
    }
  }

  /**
   * Store encrypted access token
   */
  async storeAccessToken(
    userId: string,
    itemId: string,
    accessToken: string,
  ): Promise<boolean> {
    try {
      const encrypted = await this.encryption.encrypt(accessToken);

      await prisma.connection.create({
        data: {
          id: itemId,
          user_id: userId,
          institution_id: "unknown", // Will be updated when we fetch accounts
          status: "active",
          encrypted_token: encrypted.encrypted_data,
          encryption_iv: encrypted.iv,
          last_sync: new Date(),
        },
      });

      return true;
    } catch (error) {
      console.error("Failed to store access token:", error);
      return false;
    }
  }

  /**
   * Retrieve and decrypt access token
   */
  async getAccessToken(itemId: string): Promise<string | null> {
    try {
      const connection = await prisma.connection.findUnique({
        where: { id: itemId },
      });

      if (!connection?.encrypted_token || !connection.encryption_iv) {
        return null;
      }

      const decrypted = await this.encryption.decrypt(
        connection.encrypted_token,
        connection.encryption_iv,
      );

      return decrypted;
    } catch (error) {
      console.error("Failed to retrieve access token:", error);
      return null;
    }
  }

  /**
   * Update connection with institution info
   */
  async updateConnectionInstitution(
    itemId: string,
    institutionId: string,
    institutionName: string,
  ): Promise<void> {
    try {
      await prisma.connection.update({
        where: { id: itemId },
        data: {
          institution_id: institutionId,
          institution_name: institutionName,
        },
      });
    } catch (error) {
      console.error("Failed to update connection institution:", error);
    }
  }

  /**
   * Sync accounts for a connection
   */
  async syncAccounts(itemId: string): Promise<boolean> {
    try {
      const accessToken = await this.getAccessToken(itemId);
      if (!accessToken) return false;

      const accountsResult = await this.getAccounts(accessToken);
      if (!accountsResult.success || !accountsResult.data) return false;

      const { accounts, item } = accountsResult.data;

      // Update institution info if needed
      if (item.institution_id) {
        const institutionResult = await this.getInstitution(
          item.institution_id,
        );
        if (institutionResult.success && institutionResult.data) {
          await this.updateConnectionInstitution(
            itemId,
            item.institution_id,
            institutionResult.data.institution.name,
          );
        }
      }

      // Sync accounts
      for (const account of accounts) {
        await prisma.account.upsert({
          where: {
            plaid_account_id: account.account_id,
          },
          update: {
            name: account.name,
            official_name: account.official_name,
            type: account.type,
            subtype: account.subtype,
            mask: account.mask,
            balance: account.balances.current,
            currency: account.balances.iso_currency_code || "USD",
          },
          create: {
            connection_id: itemId,
            plaid_account_id: account.account_id,
            name: account.name,
            official_name: account.official_name,
            type: account.type,
            subtype: account.subtype,
            mask: account.mask,
            balance: account.balances.current,
            currency: account.balances.iso_currency_code || "USD",
          },
        });
      }

      // Update connection sync time
      await prisma.connection.update({
        where: { id: itemId },
        data: { last_sync: new Date() },
      });

      return true;
    } catch (error) {
      console.error("Account sync failed:", error);
      return false;
    }
  }

  // Private helper methods

  private async makeRequest<T>(
    endpoint: string,
    data: any,
  ): Promise<PlaidResult<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "PLAID-CLIENT-ID": this.config.clientId,
          "PLAID-SECRET": this.config.secret,
          "User-Agent": "BankStatementRetriever/1.0",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw responseData;
      }

      return {
        success: true,
        data: responseData as T,
      };
    } catch (error) {
      console.error(`Plaid API ${endpoint} failed:`, error);
      throw error;
    }
  }

  private parseError(error: any): PlaidError {
    if (error?.error_type) {
      return error as PlaidError;
    }

    return {
      error_type: "API_ERROR",
      error_code: "UNKNOWN_ERROR",
      error_message: error?.message || "An unknown error occurred",
    };
  }
}
