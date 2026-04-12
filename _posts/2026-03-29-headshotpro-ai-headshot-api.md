---
title: "HeadshotPro API: Programmatic AI Headshots for Teams and Enterprises"
excerpt: "HeadshotPro's API lets organizations generate professional AI headshots at scale, with team management, whitelabel integration, and credit-based billing for enterprise workflows."
coverImage: "/assets/blog/headshotpro-cover.jpg"
date: 2026-03-29T00:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/headshotpro-cover.jpg"
---

## TL;DR

HeadshotPro is a Netherlands-based AI headshot generator that has produced over 17 million professional headshots for nearly 200,000 customers. Its REST API (v2) lets organizations manage headshot generation programmatically: invite team members, track AI model training status, retrieve generated photos, and embed the full workflow into custom applications via whitelabel integration. Authentication uses Bearer tokens, rate limits sit at 300 RPM (standard) to 1,000 RPM (enterprise), and the entire system runs on credit-based billing.

## The Problem

Corporate headshot day is a logistical headache. Coordinating schedules across remote teams, booking photographers, managing wardrobe, and ensuring visual consistency across LinkedIn profiles and company directories adds up fast. Professional headshots in the US average around $232.50 per session, and that does not include the time employees spend traveling to studios or waiting for edited deliverables.

For organizations onboarding dozens or hundreds of employees at once, multiplying that cost and coordination overhead becomes genuinely painful. Existing consumer-grade AI headshot tools solve the cost problem for individuals but fall apart when you need centralized management, consistent branding, and a workflow that integrates with internal HR systems or employee portals.

## HeadshotPro API: How It Works

HeadshotPro's API is built around a team-and-organization model designed for multi-user management. The base URL is `https://server.headshotpro.com/api/v2`, and all endpoints require Bearer token authentication.

### Authentication and API Keys

API keys are generated from the Admin Dashboard under Settings. Keys are scoped to the organization and shown only once at creation time. Every request includes the key in the Authorization header:

```bash
curl -X GET "https://server.headshotpro.com/api/v2/organization" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

The API supports five permission scopes: Organization (read details and credits), Invites (create, list, revoke), Teams (manage membership), Models (list and manage AI training sessions), and Photos (access generated headshots). Keys are organization-scoped, which means all actions are tied to the parent account's billing and limits.

### Core Endpoints

**Organization and Credits**

`GET /organization` returns the org profile, including team listings. `GET /organization/credits` returns the current credit balance. Credits are consumed when a team member uploads photos and starts AI training. They are not consumed for creating invites, retrieving photos, or managing teams. Monitoring the credit balance programmatically is straightforward and lets you set up alerts before balances run dry.

**Team Invites**

`POST /organization/invites` sends email invitations to new team members. Each invite reserves a credit, which gets consumed only when the recipient uploads their photos and initiates the training process. Invites can be scoped to specific teams for departmental segmentation.

**AI Models**

Each team member who completes onboarding gets an associated AI model. The model progresses through distinct statuses: `onboarding`, `waiting`, `pending`, `generating`, `active`, `failed`, or `deleted`. You can list all models with pagination and filter by status or team:

```bash
curl -X GET "https://server.headshotpro.com/api/v2/organization/models?status=active&limit=25" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

`GET /organization/models/:modelId` returns detailed information about a specific model, including timestamps for creation and completion.

**Whitelabel Integration**

For companies that want to embed headshot generation into their own portals or HR platforms, the API supports whitelabel model creation. `POST /organization/models` creates an anonymous user and returns a signed URL for embedding:

```bash
curl -X POST "https://server.headshotpro.com/api/v2/organization/models" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "teamId": "team_xyz789",
    "version": "one-shot"
  }'
```

The response includes a `signedUrl` that can be embedded as an iframe or redirect target. Two model versions are available: `lora` (the current default) and `one-shot` (a newer, faster model set to become the default in June 2026).

A development mode (`isDevelopment: true`) reduces processing time from roughly one hour to about three minutes, uses test data instead of real photos, and consumes zero credits, making it useful for integration testing.

### Rate Limiting and Error Handling

Rate limits are tiered: 300 requests per minute for Standard and Professional plans, 1,000 RPM for Enterprise. Every response includes rate limit headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`).

Error responses follow a consistent JSON structure with a machine-readable `code` field. Common codes include `UNAUTHORIZED` (401), `INSUFFICIENT_CREDITS` (402), `NOT_FOUND` (404), and `RATE_LIMIT_EXCEEDED` (429). The documentation includes retry logic examples with exponential backoff and queue-based throttling patterns for high-volume integrations.

### Privacy and Data Retention

Input photos are deleted after 7 days. Generated headshots are deleted after 30 days. Users can trigger immediate deletion through the API or account settings. HeadshotPro states it never sells user photos and that customers retain full commercial rights to all generated images.

## Who It Is For

The primary audience is HR teams, recruiting platforms, and employee onboarding systems that need to generate consistent professional headshots across distributed teams. The whitelabel endpoint extends this to SaaS platforms that want to offer headshot generation as a built-in feature without redirecting users to an external site.

The credit-based pricing model avoids per-headshot subscription lock-in, and the team structure maps naturally to departmental or project-based org charts.

## Pricing

Individual headshot packages start at $29. API access and credit purchasing for organizations are handled through the admin dashboard or by contacting sales for enterprise arrangements with higher rate limits and SLA commitments.

## Getting Started

Sign up at [headshotpro.com](https://www.headshotpro.com), generate an API key from the Admin Dashboard, and start with `GET /organization` to verify connectivity. The documentation at [headshotpro.com/api](https://www.headshotpro.com/api) covers all endpoints with code examples in cURL, Node.js, and Python.
