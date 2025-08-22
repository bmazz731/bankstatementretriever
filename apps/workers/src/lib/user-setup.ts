/**
 * User and Organization Setup Utilities
 * Handles the creation and management of users and organizations
 */

import { createSupabaseClient } from "./auth";
import type { Env } from "../types/env";

export interface UserOrgSetupResult {
  success: boolean;
  user?: any;
  organization?: any;
  error?: string;
  debugInfo?: any;
}

/**
 * Ensure user exists in database with proper organization setup
 * This function handles the circular dependency between users and organizations
 */
export async function ensureUserAndOrganization(
  env: Env,
  authUser: any,
): Promise<UserOrgSetupResult> {
  const supabase = createSupabaseClient(env);

  try {
    console.log("Ensuring user and organization setup for:", authUser.email);

    // First, check if user already exists in our database
    const { data: existingUser, error: userCheckError } = await supabase
      .from("users")
      .select("id, org_id, email")
      .eq("id", authUser.id)
      .single();

    if (existingUser && !userCheckError) {
      console.log("User already exists, returning existing data");
      return {
        success: true,
        user: {
          ...authUser,
          org_id: existingUser.org_id,
        },
      };
    }

    // Check if user exists but the query failed for other reasons
    if (userCheckError && userCheckError.code !== "PGRST116") {
      console.error(
        "Database error checking for existing user:",
        userCheckError,
      );
      return {
        success: false,
        error: "Database error during user lookup",
        debugInfo: { userCheckError },
      };
    }

    // User doesn't exist in our database, but they're authenticated via Supabase Auth
    // Handle circular dependency using transaction with deferred constraints
    console.log(
      "Creating new user and organization with proper circular dependency handling",
    );

    // Generate unique organization ID to avoid circular reference issues
    const orgId = crypto.randomUUID();
    console.log("Generated org ID:", orgId, "for user:", authUser.id);

    // Use the transaction function to handle circular dependency
    const { data: transactionResult, error: transactionError } =
      await supabase.rpc("create_user_and_organization", {
        p_user_id: authUser.id,
        p_org_id: orgId,
        p_user_email: authUser.email || authUser.user_metadata?.email,
        p_org_plan: "free",
        p_org_status: "active",
      });

    if (transactionError) {
      console.error(
        "Transaction error creating user and organization:",
        transactionError,
      );

      // Check if RPC function doesn't exist, fall back to sequential approach
      if (transactionError.code === "42883") {
        console.log(
          "RPC function not found, falling back to null-owner approach",
        );

        // Fallback: Create organization with NULL owner_user_id first
        const { data: newOrg, error: orgError } = await supabase
          .from("organizations")
          .insert({
            id: orgId,
            owner_user_id: null, // Temporarily NULL to avoid FK constraint
            plan: "free",
            status: "active",
          })
          .select()
          .single();

        if (orgError) {
          console.error("Failed to create organization (fallback):", orgError);
          return {
            success: false,
            error: "Failed to create organization",
            debugInfo: {
              orgError,
              userId: authUser.id,
              attemptedOrgId: orgId,
              approach: "fallback_null_owner",
            },
          };
        }

        // Create the user record
        const { data: newUser, error: newUserError } = await supabase
          .from("users")
          .insert({
            id: authUser.id,
            org_id: orgId,
            email: authUser.email || authUser.user_metadata?.email,
          })
          .select()
          .single();

        if (newUserError) {
          console.error("Failed to create user (fallback):", newUserError);
          // Cleanup: remove the organization we just created
          await supabase.from("organizations").delete().eq("id", orgId);
          return {
            success: false,
            error: "Failed to create user account",
            debugInfo: {
              newUserError,
              orgId: orgId,
              userId: authUser.id,
              approach: "fallback_after_org",
            },
          };
        }

        // Update organization with proper owner_user_id
        const { error: updateOrgError } = await supabase
          .from("organizations")
          .update({ owner_user_id: authUser.id })
          .eq("id", orgId);

        if (updateOrgError) {
          console.error(
            "Failed to update organization owner (fallback):",
            updateOrgError,
          );
          // Cleanup both records
          await supabase.from("users").delete().eq("id", authUser.id);
          await supabase.from("organizations").delete().eq("id", orgId);
          return {
            success: false,
            error: "Failed to update organization owner",
            debugInfo: {
              updateOrgError,
              orgId: orgId,
              userId: authUser.id,
              approach: "fallback_org_update",
            },
          };
        }

        console.log(
          "Fallback approach successful - user and organization created",
        );

        return {
          success: true,
          user: {
            ...authUser,
            org_id: orgId,
          },
          organization: { id: orgId },
        };
      } else {
        return {
          success: false,
          error: "Failed to create user and organization",
          debugInfo: {
            transactionError,
            userId: authUser.id,
            attemptedOrgId: orgId,
            approach: "transaction_rpc",
          },
        };
      }
    }

    // If we get here, the transaction was successful
    console.log("Transaction successful - user and organization created");
    return {
      success: true,
      user: {
        ...authUser,
        org_id: orgId,
      },
      organization: { id: orgId },
    };
  } catch (error) {
    console.error("Unexpected error in user setup:", error);
    return {
      success: false,
      error: "Unexpected error during user setup",
      debugInfo: { error: error.message },
    };
  }
}

/**
 * Validate that a user's organization exists and is accessible
 */
export async function validateUserOrganization(
  env: Env,
  userId: string,
  orgId: string,
): Promise<{ valid: boolean; error?: string }> {
  const supabase = createSupabaseClient(env);

  try {
    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .select("id, status")
      .eq("id", orgId)
      .single();

    if (orgError || !org) {
      return {
        valid: false,
        error: "Organization not found",
      };
    }

    if (org.status !== "active") {
      return {
        valid: false,
        error: "Organization is not active",
      };
    }

    // Check if user is a member of this organization
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", userId)
      .eq("org_id", orgId)
      .single();

    if (userError || !user) {
      return {
        valid: false,
        error: "User is not a member of this organization",
      };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: `Validation error: ${error.message}`,
    };
  }
}
