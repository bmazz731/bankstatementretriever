# BankStatementRetriever — MVP Product Requirements Document (PRD)

**Version:** v0.2
**Date:** 2025‑08‑18
**Owner:** Brandon Mazzella\
**Product:** bankstatementretriever.com

---

## 1. Overview

**Purpose.** Automate retrieval and delivery of monthly bank and credit card statements for US businesses.

**Goals.**

- Deliver new statements to the customer’s chosen destination reliably and quickly.
- Provide simple setup, clear visibility into delivery health, and minimal manual touch.

**Non‑Goals (MVP).**

- Investment/brokerage statements; email or S3 delivery; multi‑aggregator coverage; public API; accountant/agency role UX (post‑MVP).

**Primary Persona (MVP).** Business owner (single‑owner account).\
**Secondary (Post‑MVP).** Accountant/bookkeeper (agency model), business owner managed via agency.

---

## 2. Target Market

- **Company size:** Solo → Mid‑market (1–500 employees)
- **Geography:** US only
- **Industries:** Service businesses with simple banking needs

---

## 3. Coverage & Dependencies

**Account types (MVP):** Banks (checking/savings), credit cards, corporate cards, credit unions, loans.\
**Excluded (post‑MVP):** Investment/brokerage.\
**Priority institutions:** Capital One, M&T Bank, Chase, American Express + all Plaid‑available institutions.\
**Aggregator:** Plaid only (MVP).\
**Core vendors/subprocessors (MVP):** Plaid, Stripe, Supabase, Cloudflare (Workers/WAF/CDN/Queues), Vercel (dashboard hosting), SendGrid **or** Postmark (email), Sentry (error monitoring), Cloudflare Logpush (logging/export).

---

## 4. Functional Scope (MVP)

### 4.1 Onboarding & Auth

- **Auth methods:** Email+password, Google SSO, magic link backup.
- **Session timeout:** 24 hours.
- **High‑risk actions:** Re‑auth required (no step‑up MFA in MVP).
- **Org/Users:** Single owner per account (no invites in MVP).
- **Storage OAuth:** Per‑user tokens for Google Drive, Dropbox, OneDrive/SharePoint.

### 4.2 Bank Linking

- **Flow:** Plaid Link embedded.
- **Consent:** Explicit “I authorize statement retrieval” + “I have account authority” + destination transparency.
- **Historical backfill options at signup:** Last statement only, last 3 months, 6 months, 12 months (subject to institution support).
- **Manual backfill (dashboard):** User‑selectable date range, up to 12 months and max 50 statements per run.

### 4.3 Statement Detection & Retrieval

- **Detection:** Plaid statements API only (no proxy/transaction heuristics in MVP).
- **Learning period:** Daily poll at **2:00 AM America/New\_York** for the first **45 days** per account; then switch to learned schedule (per‑account pattern persisted).
- **First attempt post‑generation:** Within **1 hour** of detected availability.
- **Duplicate prevention:** Statement ledger keyed by `{institution, accountId, periodEnd, fileType}`.
  - Auto‑version duplicates as `..._statement_v2.pdf` (or `.csv`).
  - Manual override allowed.

### 4.4 File Types & Naming

- **Fetch types:** Configurable per account: PDF, CSV/Excel, or both.
- **Default name:** `{institution}_{accountLast4}_{periodEnd}_statement.{pdf|csv}`.
- **Org‑wide default + per‑account overrides** using variables: `{institution}`, `{accountLast4}`, `{periodEnd}`, `{accountName}`, `{fileType}`.
- **If both PDF+CSV for same period:**
  - PDF → `{base}_statement.pdf`
  - CSV/Excel → `{base}_transactions.csv`
- **Sanitization:** Prevent path traversal and illegal characters.

### 4.5 Destinations & Foldering

- **Destinations (MVP):** Google Drive, Dropbox, OneDrive/SharePoint, **Webhook**.
- **Foldering:** User‑defined paths per account; auto‑create missing folders; preview shows exact destination path.

### 4.6 Delivery & Webhooks

- **Delivery timing:** On successful retrieval, stream and deliver immediately (zero storage).
- **Webhook delivery (as a destination):**
  - **Method:** `POST`
  - **Retries:** 3 attempts with exponential backoff **1s → 5s → 30s**
  - **Success criteria:** Any `2xx`
  - **Payload (JSON):**
    ```json
    {
      "webhookVersion": "1.0",
      "eventType": "statement.delivered",
      "orgId": "...",
      "accountId": "...",
      "institution": "...",
      "accountLast4": "1234",
      "periodStart": "YYYY-MM-DD",
      "periodEnd": "YYYY-MM-DD",
      "statementDate": "YYYY-MM-DD",
      "fileType": "pdf|csv",
      "fileName": "...",
      "deliveryPath": "...",
      "deliveredAt": "ISO-8601",
      "checksum": "sha256:...",
      "requestId": "uuid"
    }
    ```
  - **Security:** HMAC‑SHA256 signature header `X-BSR-Signature: t=timestamp, v1=hex` using per‑destination secret; replay window 5 minutes.

### 4.7 Notifications & Reporting

- **Channels (MVP):** Email **and** Webhook (for teams/Slack via integrators).
- **Events:** Statement delivered, delivery failure, reauth required, monthly summary.
- **Monthly summary contents:** Count of statements delivered, failures & reasons, accounts paused, usage vs plan limits.
- **Preferences:** Per‑account opt‑in/out for events.

### 4.8 Error Handling & Reauth

- **Automatic retries (retrieval and delivery):** 3 automatic → **Immediate**, **+6h**, **+24h**, then **Pause**.
- **Manual retry:** Always allowed while paused.
- **Reconsent/MFA changes:** Silent retries first; on continuing failure, send email; auto‑pause after **3** consecutive failures.
- **Maintenance windows (<24h):** Detect via Plaid/storage error codes; log and auto‑retry without user alert.

### 4.9 Admin Dashboard

- **Main view:** Connection health grid (Green/Yellow/Red), recent activity (last 10 deliveries), action‑needed alerts, quick actions (Add Bank, Test Delivery).
- **Detail view:** Connection settings, destination configuration with preview, activity log, manual sync button, manual backfill.
- **Logs:** Activity **and** audit logs retained **90 days**.

---

## 5. Non‑Functional Requirements (NFRs)

### 5.1 Security & Privacy

- **Zero storage:** Statements streamed in memory only; never persisted on BSR servers.
- **Encryption:** TLS 1.2+ in transit; AES‑256 for stored tokens; **provider‑managed encryption at rest** (customer‑managed keys/CMK **post‑MVP**).
- **Secrets:** Vaulted; least‑privilege access.
- **Data residency:** All processing confined to **US regions** across Supabase, Cloudflare, and Vercel services.
- **Deletion:** Immediate revocation of Plaid/storage tokens on org deletion; 7‑day soft delete for configs, then purge.
- **Compliance posture:** ToS includes agent authorization; Privacy Policy includes Plaid disclosure, zero retention, subprocessors; GLBA alignment statements now; SOC 2 Type I post‑MVP; min LLC + \$1M cyber insurance; abuse detection for high‑volume use (≥50 accounts).

### 5.2 Reliability & Performance

- **SLO (internal target):** ≥95% of new statements delivered within 24h of generation.
- **Throughput:** Support up to 50 active accounts per org (higher volumes trigger manual review).
- **Scalability:** Queue‑based worker architecture; idempotent delivery using `requestId`.

### 5.3 Observability & Ops

- **Error monitoring:** Sentry.
- **Logging/metrics:** **Cloudflare Logpush** (cost‑efficient export) with simple in‑app dashboards; Datadog **post‑MVP** if needed.
- **Audit log scope:** Auth, connection changes, delivery attempts, policy changes.
- **Runbooks:** Playbooks for Plaid errors, storage auth failures, webhook failures, and rate‑limit events.

---

## 6. Technical Architecture (High‑Level)

- **Frontend:** Next.js app on **Vercel** for onboarding & dashboard.
- **Backend/API:** **Cloudflare Workers** behind Cloudflare WAF; all endpoints (Plaid webhooks, internal API, delivery signing) served from Workers.
- **Scheduling:** **Cloudflare Cron Triggers** (e.g., daily 2:00 AM ET) enqueue polling jobs.
- **Jobs/Queueing:** **Cloudflare Queues** handle retrieval/delivery pipelines with backoff; **Durable Objects** provide per‑account locks and counters (rate‑limit governance, idempotency).
- **Data:** Supabase (Postgres) for auth/db; Plaid for statements. (No Redis in MVP.)
- **Pipeline:** Plaid → Worker (retrieval) → Transform (metadata extraction only) → Destinations/Webhooks → Notify.

**Statement Date Learning Algorithm (MVP):**

1. During first 45 days: poll at 2:00 AM ET daily.
2. When two consecutive statement cycles confirm a consistent drop day/time window, persist pattern per account (e.g., “between day 3–5 of month at \~01:00–04:00 ET”).
3. Switch scheduler to targeted window + 1h follow‑up sweep; fall back to daily 2:00 AM if drift detected for two cycles.

---

## 7. Data Model (Key Entities)

- **Organization** `(org_id, owner_user_id, plan, status, created_at, deleted_at_soft)`
- **User** `(user_id, org_id, email, password_hash/oidc, mfa_enabled, created_at)`
- **Connection** `(connection_id, org_id, plaid_item_id, institution, status, last_reauth_at)`
- **Account** `(account_id, connection_id, account_last4, account_name, type, learned_schedule_json)`
- **Statement** `(statement_id, account_id, period_start, period_end, statement_date, file_type, checksum, version, retrieved_at)`
- **Destination** `(destination_id, org_id, kind, config_json, secret_ref, active)`
- **RoutingRule** `(rule_id, account_id, destination_id, folder_path, filename_pattern)`
- **Delivery** `(delivery_id, statement_id, destination_id, status, path, delivered_at, attempts, last_error)`
- **WebhookEndpoint** `(endpoint_id, org_id, url, secret_ref, active, last_success_at)`
- **OAuthToken** `(token_id, org_id|user_id, provider, scopes, expires_at, enc_payload)`
- **AuditLog** `(log_id, org_id, user_id, action, target_id, meta_json, created_at)`
- **BackfillJob** `(job_id, org_id, account_id, range_start, range_end, status, created_at)`
- **NotificationPreference** `(pref_id, account_id, channel, event_type, enabled, created_at, updated_at)`\
  • `channel ∈ {email, webhook}`; `event_type ∈ {statement_delivered, delivery_failed, reauth_required, monthly_summary}`; uniqueness constraint `(account_id, channel, event_type)`.

---

## 8. API (Internal, MVP)

> A public API is **post‑MVP**. The following describe internal endpoints and contracts.

- **POST /api/plaid/link\_token** → `{link_token}`
- **POST /api/plaid/exchange\_public\_token** → `{item_id, accounts[]}`
- **GET /api/accounts** → List accounts for current org. Supports `?status=active|paused` and pagination `?page=&page_size=`.\
  **200** `{accounts: [{account_id, connection_id, institution, account_name, account_last4, type, statements_supported, status}], page, page_size, total}`
- **DELETE /api/accounts/{id}** → Soft‑delete or inactivate account (preserve history). **204** on success.
- **GET /api/statements/{accountId}** → Paginated statement history for an account; filters `?from=YYYY-MM-DD&to=YYYY-MM-DD&file_type=pdf|csv`.\
  **200** `{statements: [{statement_id, period_start, period_end, statement_date, file_type, version, checksum, delivered: boolean}], page, page_size, total}`
- **PUT /api/notifications/preferences/{accountId}** → Upsert per‑account preferences.\
  **Request** `{preferences: [{channel: "email|webhook", event_type: "...", enabled: true|false}]}`\
  **200** `{updated: true}`
- **POST /api/destinations** (create storage/webhook destination)
- **POST /api/routes** (map account → destination, folder, filename)
- **POST /api/accounts/{id}/backfill** `{range_start, range_end}` (limits enforced)
- **POST /api/accounts/{id}/sync** (manual immediate retrieval attempt)
- **GET /api/health** → Lightweight health endpoint for load balancer. **200** `{status: "ok", build: "gitsha", uptime_s: 12345}`\
  **/api/health/deep** (protected) checks DB, Queues/Durable Objects, Plaid auth, and storage provider tokens.

**Webhook Security:** HMAC signature as in §4.6; reject if timestamp skew > 5 minutes or signature invalid.\
**Idempotency:** All delivery and webhook operations require `requestId`; repeated IDs must be safe to replay.

---

## 9. Pricing & Billing (MVP)

| Tier         | Monthly | Accounts  | Key Features                                    |
| ------------ | ------- | --------- | ----------------------------------------------- |
| Free         | \$0     | 1         | 1 statement pull per account per calendar month |
| Business     | \$19    | 5         | Daily checks, priority support                  |
| Professional | \$49    | 20        | All features, webhooks                          |
| Agency       | \$99    | 50        | Multi‑org management (post‑MVP UX)              |
| Enterprise   | Custom  | Unlimited | SLA, custom integrations                        |

**Billing:** Stripe; 20% annual discount.\
**Plan limits:** Soft warning at 80%; hard at 100% **blocks new connections only**. Existing syncs never stop.\
**Trials:** 14‑day full‑feature trials on paid tiers (no statement limits during trial).

---

## 10. Risk Management & Abuse Controls

- **Abuse trigger:** ≥50 accounts for a new org → auto‑limit new connections + manual review; notify admin; flag in internal dashboard.
- **No screen scraping clause** in ToS.
- **Cyber liability insurance:** \$1M.

---

## 11. Acceptance Criteria (MVP)

### Linking & Setup

- User can sign up (email/password or Google SSO) and complete Plaid Link to connect at least one institution.
- User can select backfill: last statement / 3 / 6 / 12 months; limits enforced by institution capabilities.
- User can add at least one destination (Drive/Dropbox/OneDrive/SharePoint or Webhook) with per‑account routing.

### Retrieval & Delivery

- System polls at 2:00 AM ET during learning; switches to learned schedule after 45 days given stable patterns.
- New statements are attempted within 1 hour of detection.
- 3 automatic retries on failure then pause; manual retry always allowed.
- Zero server storage verified via logs and storage checks.
- Duplicate fetches produce versioned filenames and maintain a single statement record with versions.

### Notifications & Reporting

- Email + webhook notifications fire for: delivered, failure, reauth required, monthly summary.
- Monthly summary includes counts delivered, failures & reasons, paused accounts, and usage vs plan limits.

### Logs & Audit

- Activity and audit logs available for 90 days, filterable by account/institution/event.

### Security & Compliance

- All data processed in US regions (Supabase/Cloudflare/Vercel); tokens encrypted with provider‑managed encryption; HMAC signing on outbound webhooks; ToS/Privacy reflect GLBA alignment and zero retention.

### Billing & Limits

- At 100% of plan, new connections are blocked; existing deliveries continue; trial logic honors 14‑day window.

---

## 12. Metrics & Success

**Primary KPIs:**

1. % of statements delivered within 24h of generation
2. Churn
3. Time‑to‑first‑statement after connect

Instrumentation requirements: emit events for `statement_detected`, `retrieval_attempted/succeeded/failed`, `delivery_succeeded/failed`, `reauth_required`, and plan usage counters.

---

## 13. Rollout Plan

- **Default timezone:** America/New\_York for all jobs.
- **Environment gates:** Dev → Staging (seeded with sandbox Plaid) → Prod.
- **Canary:** Enable for 10% of orgs for first week; monitor Sentry alerts and delivery SLO.
- **Runbooks:** Publish incident SOPs; set on‑call rotations.
- **Docs:** Customer setup guide; privacy & ToS pages live at launch.

---

## 14. Post‑MVP Roadmap (Not in MVP)

- Accountant/agency role UX (multi‑client management surfaces).
- Email and S3 destinations.
- Event webhooks & public API.
- Multi‑aggregator fallback.
- AI enhancements (availability detection via AI, anomaly hints).
- SOC 2 Type I attestation.
- Optional step‑up MFA.

---

## 15. Gaps Addressed (Addenda for MVP Readiness)

### 15.1 Rate Limiting (Plaid, Storage, Internal)

**Design principles:** fail‑safe, backoff, and visibility.

- **Plaid:** Treat HTTP `429` and Plaid error codes as rate‑limit signals; apply token‑bucket per **client**, **Item**, and **endpoint class** (read vs write). Default budgets are configurable; workers obey exponential backoff with jitter and honor any `Retry‑After` header if present. Surface rate‑limit counters and recent `429` samples in Ops dashboard.
- **Google Drive / Dropbox / OneDrive:** Respect provider throttling guidance; implement per‑provider token buckets and `Retry‑After` handling. Queue writes to avoid bursty uploads; batch metadata updates when available.
- **Manual sync/backfill:** Gate via per‑org concurrency: **max 2 concurrent backfills** and **max 10 concurrent manual syncs** per org; global worker concurrency auto‑scales but caps to protect provider limits. Backfill jobs chunk by account+month and are resumable.

### 15.2 Plaid Integration (Tokens, Webhooks, Degraded States)

- **Access token lifecycle:** Store per‑Item access tokens server‑side (encrypted at rest (provider‑managed keys)). Support **token rotation** (on demand and during incident response); persist `item_id` and rotate token atomically with automatic re‑hydration of any cursors or pointers used in polling.
- **Item webhooks:** Subscribe and handle Item‑level webhooks (reauth required, user‑revoked, etc.) and any statement‑related signals where available. All handlers are idempotent and enqueue follow‑up tasks.
- **Maintenance / degraded:** Consult provider error codes and status endpoints; classify as **temporary** vs **hard** errors. Temporary => schedule retries (no user alert if <24h). Hard => notify per notification prefs and pause if persistent.

### 15.3 Partial Failures & Recovery

- **Per‑filetype atomicity:** PDF and CSV are independent delivery units under the same statement period. If one succeeds and the other fails, mark the statement **Partially Delivered** and continue retries for the failed artifact on the cadence (Immediate → 6h → 24h → Pause). Notifications summarize partial status.
- **Per‑destination atomicity:** Each destination receives its own delivery attempt; one success does not block others. Delivery ledger tracks status per destination.
- **Mid‑delivery failure:** If streaming fails mid‑upload, restart with provider‑supported resume (if any) or retry from scratch; checksum validation required before marking success.
- **Backfill partial completion:** Backfill job is chunked (account×month). Completed chunks persist; retries re‑enqueue only failed chunks; UI shows % complete and failed months.

### 15.4 Plan Downgrade Policy

- **Effective time:** Enforce at **end of current billing period**; show downgrade banner immediately.
- **What’s blocked on downgrade request:** New connections blocked immediately if new plan’s limit is already exceeded.
- **Selection:** Owner must select which accounts remain active to fit the new limit. If not selected by renewal, system auto‑keeps most‑recently‑active accounts and **auto‑inactivates** the rest; nothing is deleted.
- **Grace:** 7‑day grace after renewal where over‑limit accounts remain paused (not deleted); Owner can re‑prioritize.

### 15.5 Support & Operations (MVP)

- **Customer support:** Email‑based (support@…). Auto‑tag alerts for failures and reauth events.
- **Admin tools:** Read‑only **impersonation** (audited) to view dashboards; secure manual replays; redaction view for PII.
- **Debugging:** Correlate by `requestId` / `Plaid-Request-Id`; searchable logs; download of a redacted delivery trace for support.

### 15.6 Password & Session Security

- **Passwords:** Minimum 12 chars; block top leaked passwords; strength check (zxcvbn ≥ 3).
- **Sessions:** Invalidate all sessions on password change; rotate refresh tokens; device list with forced sign‑out.
- **Account recovery:** Magic‑link + email verification; optional cooldown (e.g., 24h) if MFA enabled.
- **MFA (optional in MVP):** TOTP (app‑based) with **10** one‑time backup codes; no SMS; recovery via backup codes or support‑verified reset.

### 15.7 Storage Provider Error Handling

- **Quota exceeded:** Detect provider‑specific errors; pause the affected destination and notify; auto‑resume when quota recovers if signal available.
- **Permission revoked / token expired:** Detect 401/403; prompt re‑auth; queue retries post‑reauth; do not drop statements.
- **Folder deleted:** Recreate folder path if permissions allow; otherwise mark destination misconfigured and notify.

### 15.8 Webhook Validation (Outbound Destinations)

- **Pre‑save validation:** Require HTTPS URL; perform `HEAD`/test `POST` (empty signed payload) expecting 2xx; block private‑IP/loopback by default.
- **TLS:** Enforce valid certificate chains; no plaintext redirects; follow at most one 307/308.
- **Dead endpoint:** Auto‑disable after **50 consecutive failures or 7 days**, whichever first; notify Owner.

### 15.9 Monitoring & Alerting

- **Ops alerts:**
  - Retrieval success rate (rolling 1h) < **90%** OR (rolling 24h) < **95%**
  - Delivery backlog age > **2 hours** for any queue
  - Provider 5xx or 429 spike > **3×** baseline over 15 minutes
  - Webhook failure rate > **10%** over 30 minutes
- **SLA breach notifications:** If primary KPI (24h delivery) drops below target for a cohort, page on‑call and email status to affected orgs.
- **Anomaly rules (v1):** Flag accounts with >3 cycles missed or sudden spike in failures.

### 15.10 Data Portability (Defer OK)

- **Export:** Owner can export org configuration (JSON) and delivery logs (CSV) for the last 90 days.
- **Backup/restore:** Allow download of routing rules for backup; import guarded behind dry‑run validator.

### 15.11 Email Infrastructure (MVP hygiene)

- Central bounce/complaint handling with automatic suppression list. IP warming **not required** for MVP volumes; document plan for scale‑up.

### 15.12 Database Operations

- **Backups:** Automated daily snapshots + PITR (e.g., 7 days). Quarterly restore drills.
- **Pooling:** PgBouncer/connection pool; start with 100 max pooled connections; tune under load.
- **Replicas:** Optional read replica for analytics; not required day‑1.

### 15.13 Timezone & DST

- **Scheduling:** System jobs run in **America/New\_York**.
- **User display:** Always show schedule previews in the user’s local browser timezone; annotate DST transitions explicitly.

### 15.14 AI Scope (Clarified)

- **In‑MVP:** Filename normalization & de‑duplication; PDF metadata extraction **only** (no statement content beyond headers/metadata is persisted or used for training). Vendor data retention disabled.
- **Post‑MVP:** Availability detection and anomaly hints.

### 15.15 Statement Learning Algorithm (Advanced)

- **Confidence to switch:** Require **2 consecutive cycles** within a 72‑hour window to consider a pattern; switch after **3 total cycles** if confidence ≥0.8.
- **Irregular cycles:** If variance > ±5 days across 3 cycles, remain on daily 2:00 AM polling; re‑evaluate every cycle.
- **Drift handling:** If an expected drop is missed, fall back to daily polling for 2 cycles; then attempt a tighter window based on new observations.

### 15.16 Infrastructure Details

- **CDN/WAF:** **Cloudflare** (CDN caching + WAF rules for IP allow/deny, Turnstile at signup).
- **Edge runtime:** **Cloudflare Workers** for API and delivery logic; **Durable Objects** for per‑account coordination.
- **Queues & retries:** **Cloudflare Queues** for retrieval/delivery with exponential backoff and dead‑letter topics.
- **Routing:** DNS and TLS termination via Cloudflare; custom domains for app/api.
- **Autoscaling:** Driven by queue depth and invocation rate; no servers to manage.

### 15.17 Appendix A: Error Codes & Contracts (Summary)

- **Customer‑facing codes:** `BSR-1xx` (validation), `BSR-2xx` (auth/config), `BSR-3xx` (retrieval), `BSR-4xx` (delivery), `BSR-9xx` (unknown). Map each to HTTP status, user message, support action.
- **Webhook error responses:** Always return JSON `{code, message, requestId}`; never leak internal stack traces.

### 15.17a File Size & Memory Limits (MVP)

- **Max statement file size:** **50 MB** per artifact (PDF or CSV). If exceeded → mark retrieval **Failed** with `BSR-303 FILE_TOO_LARGE`; notify Owner and show remediation (reduce statement scope with institution, or contact support).
- **Streaming chunk size:** **10 MB** chunks with backpressure; provider uploads must support resumable or whole‑file retry.
- **Per‑worker memory budget:** Soft cap **512 MB RSS**, hard cap **768 MB**; alert if soft cap exceeded for >1 minute.
- **Concurrent stream buffers per worker:** Max **4** active buffers (≈40 MB) to keep memory within budget.
- **When caps are exceeded:** Immediately abort the offending stream, emit metric + Sentry event, and backoff further jobs for that org by 10 minutes.

### 15.18 Plaid Statements API Limitations & Fallbacks (MVP)

- **Capability detection (link‑time and nightly):** After Plaid Link, probe the connected Item/accounts to determine if **Statements** are supported for each account. Persist a per‑account capability flag `statements_supported` and optionally an institution‑level hint.
- **Unsupported accounts (MVP behavior):** Mark account as **Not Supported for Statements**. Block enabling retrieval/backfill for that account and surface an actionable banner with a **Join Waitlist** CTA.
- **Institutions with transactions only:** Treat as unsupported for statements in MVP.
- **UI/UX:** In Connection detail, list each account with a "Statements: Supported/Not Supported" badge and an info tooltip explaining limitation.
- **Decision:** **MVP is statements‑only**. No transactions‑CSV stopgap.

### 15.19 Free Tier Abuse Prevention

- **Email verification:** Mandatory before bank linking and before enabling deliveries (email‑password users). Google SSO counts as verified.
- **Disposable domains:** Block signups from known disposable/temporary email domains (maintain allow/deny lists; weekly refresh).
- **Signup throttles & CAPTCHA:** Per‑IP and per‑device rate limits (e.g., max 3 new orgs/day/IP). **Cloudflare Turnstile** required at **signup** (MVP). Extend to other flows post‑MVP as needed.
- **One free org per person (soft rule):** Heuristics across email, device fingerprint, IP/subnet; auto‑flag for manual review if exceeded.
- **Plan guardrails enforcement:** Free plan limited to **1 account, 1 statement pull per calendar month**; block backfills; show upgrade prompts.
- **Decision:** Allow generic email domains (gmail/outlook/etc.) on free tier (MVP).

### 15.20 Webhook Payload Size Limits

- **No file content in webhooks:** Only metadata is sent; files are delivered to storage destinations.
- **Payload sizing:** Target < **16 KB**. If payload exceeds **8 KB**, send with `Content-Encoding: gzip`.
- **Error handling:** If destination returns **413/414/431**, retry using a **compact payload** (drop optional fields such as `deliveryPath`, include only `requestId` + core fields). Maintain signature over the actual body.
- **Config:** Org‑level toggle "Send compact payload by default" for fragile receivers.
- **Retries:** Use existing 3‑attempt policy with jittered backoff; mark endpoint unhealthy if repeated 413/414 over 24h.

### 15.21 Statement Availability Semantics

- **Available:** A new statement object appears from Plaid for an account/period not present in our ledger (has stable `statement_date` and retrievable file link).
- **Unavailable:** Plaid returns empty/no new statements; not an error. Continue polling per schedule.
- **Expected/Pending window:** During learned drop window, show status **Expected** and display **“Expected by \~DATE”** in the dashboard (calculated from learned pattern); outside window, show **Polling**. If expected window passes with no new statement, mark **Missed Window** and fall back to daily polling.
- **Acceptance criteria:** UI clearly distinguishes **Supported + Available**, **Supported but Unavailable**, **Not Supported**.

### 15.22 Multi‑Destination Coordination

- **Correlation IDs:** Generate a single ``** per statement retrieval event** and a unique ``** per destination**. Include both in logs and notifications; webhooks carry the shared `requestId`.
- **Atomicity:** Each destination is independent. Success on one does not block others. Partial status = at least one failed and one succeeded.
- **Retries:** Apply delivery retry schedule per destination. Pausing one destination does not pause others.
- **UI/UX:** In the Statement detail drawer: show per‑destination chips (Success/Retrying/Paused) and an aggregate row status.

### 15.23 Billing Edge Cases (Cancellation & Payment Failure)

- **Cancellation by Owner:** Effective at **end of billing period**. In‑flight retrievals/deliveries complete. New schedules cease after the effective date.
- **Payment failure (MVP dunning):**
  - **Due date (Day 0):** Attempt charge. If failure → mark **Past Due** and email Owner.
  - **Day 1:** Automatic retry. If failure → **Pause services** (retrievals and deliveries). Dashboard banner; email Owner.
  - **Day 3:** Retry charge again. On success → **immediately resume** services. On failure → remain paused (no auto‑cancel in MVP).
- **Enhancements:** Additional retries/escalations post‑MVP.

### 15.24 Storage OAuth Token Refresh

- **Proactive refresh:** Track provider token expiry; refresh **10 minutes before** expiration where supported. On refresh failure, retry with backoff; if still failing, mark destination **Reauth Required** and notify.
- **During scheduled retrieval:** If a destination token is expired and refresh fails, proceed with retrieval; **delivery will retry later** (statement will be re‑fetched as needed due to zero‑storage design).
- **Permanent expiry/revocation:** After **3** refresh failures or explicit revocation errors, disable the destination, continue polling statements, and queue deliveries until reauth (subject to provider limits).
- **User notification:** Email + dashboard banner with clear CTA to re‑connect storage; resend every 72h until resolved.

---

## 16. Change Log

- **2025‑08‑18:** v0.2 — migrated infra to Supabase + Cloudflare + Vercel; updated Security/Observability/Architecture; added file size & memory caps; new internal API endpoints; NotificationPreference entity; Plaid statements fallback; free‑tier abuse controls; webhook payload size handling; dunning flow; storage OAuth refresh; multi‑destination coordination; availability semantics.

- **2025‑08‑13:** Added §15 Gaps Addressed, expanded reliability, security, and ops specifications; clarified AI scope; added downgrade policy.
- **2025‑08‑13:** Added §15.18–15.24 covering Plaid statements limitations, free‑tier abuse prevention, webhook payload sizing, availability semantics, multi‑destination coordination, billing edge cases, and storage OAuth refresh.
- **2025‑08‑13:** Locked decisions: MVP statements‑only (no transactions CSV stopgap); Cloudflare Turnstile at signup; free tier allows generic domains; predictive “Expected by \~DATE” UI; payment failure dunning per MVP (Day0/Day1‑pause/Day3 retry).

