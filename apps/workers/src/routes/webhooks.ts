/**
 * Webhook Routes - External integrations
 */
import { Hono } from "hono";
import type { Env } from "../types/env";
import { verifyWebhookSignature } from "../lib/webhook-delivery";

const webhooks = new Hono<{ Bindings: Env }>();

// Plaid webhooks
webhooks.post("/plaid", async (c) => {
  try {
    const bodyText = await c.req.text();
    const signature = c.req.header("Plaid-Webhook-Verification-Key");

    if (!signature) {
      return c.json({ error: "Missing webhook signature" }, 401);
    }

    // Verify webhook signature using Plaid secret
    const isValid = await verifyWebhookSignature(
      bodyText,
      signature,
      c.env.PLAID_WEBHOOK_SECRET,
    );

    if (!isValid) {
      return c.json({ error: "Invalid webhook signature" }, 401);
    }

    const body = JSON.parse(bodyText);
    console.log("Plaid webhook received:", body);

    // Handle different webhook types
    switch (body.webhook_type) {
      case "ITEM":
        return handleItemWebhook(body, c.env);
      case "STATEMENTS":
        return handleStatementsWebhook(body, c.env);
      default:
        console.log("Unknown Plaid webhook type:", body.webhook_type);
        return c.json({ received: true });
    }
  } catch (error) {
    console.error("Plaid webhook error:", error);
    return c.json({ error: "Webhook processing failed" }, 500);
  }
});

// Stripe webhooks
webhooks.post("/stripe", async (c) => {
  try {
    const signature = c.req.header("Stripe-Signature");
    if (!signature) {
      return c.json({ error: "Missing Stripe signature" }, 401);
    }

    const body = await c.req.text();
    // TODO: Verify Stripe signature

    const event = JSON.parse(body);
    console.log("Stripe webhook received:", event.type);

    // Handle Stripe events
    switch (event.type) {
      case "invoice.payment_succeeded":
        return handlePaymentSucceeded(event, c.env);
      case "invoice.payment_failed":
        return handlePaymentFailed(event, c.env);
      case "customer.subscription.updated":
        return handleSubscriptionUpdated(event, c.env);
      default:
        console.log("Unhandled Stripe event:", event.type);
        return c.json({ received: true });
    }
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return c.json({ error: "Webhook processing failed" }, 500);
  }
});

// Handle Plaid Item webhooks
async function handleItemWebhook(body: any, env: Env) {
  const { webhook_code, item_id, error } = body;

  switch (webhook_code) {
    case "ERROR":
      console.log(`Plaid Item error for ${item_id}:`, error);
      // Update connection status to error
      await updateConnectionStatus(item_id, "error", env);
      break;

    case "PENDING_EXPIRATION":
      console.log(`Plaid Item expiring for ${item_id}`);
      // Notify user of required reauth
      await updateConnectionStatus(item_id, "reauth_required", env);
      break;

    case "USER_PERMISSION_REVOKED":
      console.log(`User revoked permissions for ${item_id}`);
      await updateConnectionStatus(item_id, "error", env);
      break;

    default:
      console.log("Unhandled Item webhook:", webhook_code);
  }

  return Response.json({ received: true });
}

// Handle Plaid Statements webhooks
async function handleStatementsWebhook(body: any, env: Env) {
  const { webhook_code, item_id, account_ids } = body;

  switch (webhook_code) {
    case "DEFAULT_UPDATE":
      console.log(`New statements available for ${item_id}:`, account_ids);

      // Queue statement retrieval for affected accounts
      for (const accountId of account_ids || []) {
        const message = {
          type: "retrieve_statements",
          accountId: accountId,
          orgId: "from-webhook", // TODO: Get org from item_id
          connectionId: item_id,
          requestId: crypto.randomUUID(),
        };

        await env.BSR_QUEUE.send(message);
      }
      break;

    default:
      console.log("Unhandled Statements webhook:", webhook_code);
  }

  return Response.json({ received: true });
}

// Update connection status in database
async function updateConnectionStatus(
  itemId: string,
  status: string,
  env: Env,
) {
  try {
    const response = await fetch(
      `${env.SUPABASE_URL}/rest/v1/connections?plaid_item_id=eq.${itemId}`,
      {
        method: "PATCH",
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          updated_at: new Date().toISOString(),
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to update connection: ${response.statusText}`);
    }

    console.log(`Updated connection ${itemId} status to ${status}`);
  } catch (error) {
    console.error("Failed to update connection status:", error);
  }
}

// Handle Stripe payment succeeded
async function handlePaymentSucceeded(event: any, env: Env) {
  const invoice = event.data.object;
  const customerId = invoice.customer;

  console.log(`Payment succeeded for customer ${customerId}`);

  // Update organization status to active
  await updateOrgStatusByStripeCustomer(customerId, "active", env);

  return Response.json({ received: true });
}

// Handle Stripe payment failed
async function handlePaymentFailed(event: any, env: Env) {
  const invoice = event.data.object;
  const customerId = invoice.customer;

  console.log(`Payment failed for customer ${customerId}`);

  // Update organization status to paused after grace period
  await updateOrgStatusByStripeCustomer(customerId, "paused", env);

  return Response.json({ received: true });
}

// Handle Stripe subscription updated
async function handleSubscriptionUpdated(event: any, env: Env) {
  const subscription = event.data.object;
  const customerId = subscription.customer;
  const newPlan = subscription.items.data[0]?.price?.nickname || "free";

  console.log(`Subscription updated for customer ${customerId} to ${newPlan}`);

  // Update organization plan
  await updateOrgPlanByStripeCustomer(customerId, newPlan, env);

  return Response.json({ received: true });
}

// Update organization status by Stripe customer ID
async function updateOrgStatusByStripeCustomer(
  customerId: string,
  status: string,
  env: Env,
) {
  // Note: This assumes we store stripe_customer_id in organizations table
  // Implementation depends on billing integration
  console.log(
    `TODO: Update org status for Stripe customer ${customerId} to ${status}`,
  );
}

// Update organization plan by Stripe customer ID
async function updateOrgPlanByStripeCustomer(
  customerId: string,
  plan: string,
  env: Env,
) {
  console.log(
    `TODO: Update org plan for Stripe customer ${customerId} to ${plan}`,
  );
}

export { webhooks as webhooksRouter };
