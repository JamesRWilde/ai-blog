---
title: "Merge Agent Handler: The API Platform That Connects AI Agents to 200+ Tools Without Making You Build a Single Integration"
excerpt: "Merge's Agent Handler gives AI agents secure, authenticated access to hundreds of third-party tools through a single platform, handling OAuth flows, credential management, and connector maintenance so developers don't have to."
coverImage: "/assets/blog/merge-agent-handler-cover.png"
date: 2026-03-26T21:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/merge-agent-handler-cover.png"
---

## TL;DR

Merge Agent Handler is a platform that connects AI agents to third-party tools through pre-built, authenticated connectors. Instead of building and maintaining individual integrations for every service your agent needs, you get a single API with built-in OAuth flows, credential management, tool pack permissions, and an evaluation suite. Perplexity uses it for enterprise connectors. Ramp uses it to add HRIS integrations by checking a box. It starts free with 2,000 monthly credits, and scales from there.

## The Problem

Building an AI agent that actually does something useful means connecting it to the tools your users already have. Salesforce. Slack. Jira. GitHub. HubSpot. Each one has its own API, its own OAuth flow, its own rate limits, its own token refresh logic, its own error codes that mean roughly the same thing in wildly different ways.

For a team building an internal productivity agent, this is a months-long integration slog. For a SaaS company building agent features into their product, it is existential. You cannot ship "AI-powered workflow automation" if your agent cannot authenticate against the customer's Salesforce instance without a developer writing custom OAuth plumbing for each connector, maintaining token lifecycles, and handling the inevitable breakages when APIs change.

The MCP ecosystem promised a cleaner abstraction. In practice, most MCP servers are community-maintained wrappers that lack production authentication, proper error handling, or any guarantee of reliability. As the Composio team's 2026 review put it plainly: MCP servers are often unmaintained and not designed for production use.

The gap between "demo-quality tool calling" and "production agent integration" is where most agent projects die.

## Merge Agent Handler

Merge's answer is a fully managed integration layer purpose-built for AI agents. The platform has two products: Merge Unified (a single API for hundreds of SaaS integrations) and Merge Agent Handler (the agent-facing tool-calling platform). Agent Handler is the product that matters for the AI API crowd.

### What It Actually Does

Agent Handler sits between your AI agent and the universe of third-party tools. When your agent needs to "create a Linear ticket for this bug," the handler manages the entire lifecycle:

1. **Authentication** -- The user connects their Linear account through a guided OAuth flow. Merge handles token storage, refresh, and re-authentication prompts when tokens expire.

2. **Tool discovery** -- Your agent does not need to know that Linear has 47 different API endpoints. It asks for available Linear operations and gets back LLM-optimized tool descriptions with proper schemas.

3. **Execution** -- The agent calls the tool. Merge routes the request, handles rate limits, and returns structured results.

4. **Security** -- Tool packs enforce least-privilege access. Custom rules prevent agents from accessing sensitive operations. Every tool call is logged for audit trails.

The connector list reads like a who's who of enterprise SaaS: Salesforce, HubSpot, Jira, GitHub, Slack, Asana, Notion, Google Workspace, Microsoft 365, BambooHR, QuickBooks, DocuSign, Figma, Datadog, PagerDuty, and hundreds more. They also support importing any public MCP server through their Connector Studio, which means you get the broadest possible tool surface without building anything yourself.

### The Authentication Problem, Solved

This is the part that matters most and the part that gets overlooked in agent demos. Every production integration requires end-user authentication. Your agent cannot access a customer's Salesforce data with a shared API key. It needs that specific customer's OAuth credentials, properly stored, properly refreshed, properly scoped.

Merge handles the full OAuth 2.0 lifecycle for every connector. When a user connects a tool, Merge guides them through authorization. When a token expires, Merge refreshes it. When re-authentication is needed, Merge surfaces it. Your application code never touches raw credentials.

This is not glamorous. It is, however, the difference between an agent that works in a demo and an agent that works in production.

### Tool Pack Management and Security

Agent Handler includes granular access controls that map well to enterprise security requirements:

**Tool packs** define which operations an agent can access. Instead of giving your agent the full Salesforce API surface, you restrict it to "read contacts" and "update opportunity stage." Least-privilege by default.

**Custom rules** add conditional logic. "Never delete records." "Require confirmation for any operation modifying financial data." "Block access to HR records outside the user's department."

**Evaluation suite** lets you test tool calls before deploying to production. You define expected outcomes, run test prompts, and verify the agent behaves correctly across scenarios.

**Audit logging** captures every tool call with full context. For regulated industries where agent actions need traceability, this is table stakes.

### Connector Studio

For connectors not in the pre-built catalog, Merge offers Connector Studio. Three options:

1. **Modify existing connectors** -- Adjust tool descriptions, add custom fields, or restrict operations on existing connectors.

2. **Import MCP servers** -- Drop in any public MCP server URL and Merge wraps it with authentication, logging, and security rules.

3. **Build new connectors with AI assistance** -- Describe the API, and Connector Studio generates a connector. Human engineers validate it before it goes to production.

This matters because no pre-built catalog, no matter how comprehensive, will cover every tool an enterprise uses. The ability to extend is the difference between a platform and a product.

## Pricing

Merge Agent Handler uses credit-based pricing with three tiers:

- **Free** -- 2,000 monthly credits, unlimited users, unlimited tool packs, pre-built connectors. Good for prototyping.
- **Pro** -- Starts at $1,000/month for 25,000 credits, scaling up to 100,000 credits at higher tiers. Includes new connector builds and email support. Unused credits roll over.
- **Enterprise** -- Custom pricing for on-prem deployments, custom connectors, dedicated support engineers, and custom SLAs.

Credits are consumed per tool call. Simple operations like ID lookups cost 1 credit. Complex operations like batch requests or multi-object writes cost 10 credits. FDE services for custom connector builds are scoped per project.

## How It Compares

The competitive landscape for agent integration platforms breaks into three categories:

**MCP-native platforms** like Composio focus on building LLM-optimized tools with managed authentication and event-driven triggers. Composio's "agent-first" approach includes intelligent tool routing to solve the tool explosion problem, but requires more developer setup for authentication flows.

**Unified API providers** like Apideck and Apideck CLI offer programmatic interfaces for tool discovery. Apideck's CLI approach, in particular, solves the context window bloat problem by letting agents discover tools on demand rather than loading schemas upfront.

**Merge occupies the enterprise middle ground.** The pre-built connector catalog is broader than either alternative. The managed authentication is deeper. The tradeoff is that Merge is a hosted service with credit-based pricing, not an open-source tool you self-host. For teams building production agent features into SaaS products, that tradeoff tilts heavily in Merge's favor.

The key differentiator is the Perplexity validation. When an AI-native company with strict data security requirements trusts a platform for production agent integrations, that carries weight. Frank te Pas, Head of Enterprise Product at Perplexity, stated that Merge allows them to "bring a broader set of data connectors to our users faster" while maintaining their security standards.

## Getting Started

Merge Agent Handler offers a free signup at [ah.merge.dev](https://ah.merge.dev). The documentation walks through connector setup, tool pack configuration, and agent integration patterns. A monthly webinar covers live demos and Q&A with the product team.

For teams evaluating the platform, the free tier provides enough credits to test core integration flows without committing to a paid plan.

## The Bigger Picture

The AI agent ecosystem is converging on a shared infrastructure problem: how do agents safely and reliably interact with the world outside their context window? The answer is not going to be a single protocol or a single vendor. It will be a layered stack with MCP as a transport protocol, managed platforms handling authentication and reliability, and specialized tool interfaces optimized for different agent architectures.

Merge Agent Handler positions itself at the authentication and reliability layer, the part of the stack that enterprise customers care about most and that demo-stage agent builders consistently underestimate. Whether that positioning holds as MCP matures and competitors invest more heavily in production-grade infrastructure remains an open question. For now, Merge is the most complete option for teams that need agent integrations to work reliably at scale, today, without building the plumbing themselves.
