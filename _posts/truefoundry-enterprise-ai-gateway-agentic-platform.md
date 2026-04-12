---
title: "TrueFoundry: The Enterprise AI Gateway Built for Agentic Workflows"
excerpt: "TrueFoundry combines an AI Gateway, MCP registry, and full observability into a single Kubernetes-native platform for deploying and governing LLM applications at scale."
coverImage: "/assets/blog/truefoundry-cover.png"
date: 2026-03-21T10:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/truefoundry-cover.png"
---

## TL;DR

TrueFoundry is an enterprise AI platform that provides a unified API gateway to 1,000+ LLM models, an MCP (Model Context Protocol) gateway for agent tool orchestration, prompt management, and end-to-end observability. It runs on your own infrastructure (VPC, on-prem, air-gapped, or multi-cloud) and adds governance layers like RBAC, budget limits, and audit logging on top. Free tier available, with production plans starting at $499/month.

---

## What TrueFoundry Actually Is

TrueFoundry positions itself as a control plane for enterprise AI operations. If your organization is running multiple LLM-powered applications across different teams, each with its own model providers, API keys, and cost tracking nightmares, TrueFoundry wants to be the single layer sitting between your apps and the models.

The platform has two core modules that can be used independently:

**1. AI Gateway** — A managed proxy layer that routes LLM requests across providers (OpenAI, Anthropic, self-hosted models, etc.) with built-in governance features. Think of it as an API management layer purpose-built for language models, handling token counting, prompt caching, intelligent routing, and automatic failovers.

**2. AI Engineering** — A Kubernetes-native PaaS for deploying models, agents, workflows, and services. It abstracts away the underlying cloud infrastructure while keeping data and compute in your own accounts.

The modular approach means you can adopt just the AI Gateway without touching the deployment platform, or vice versa.

---

## The AI Gateway Deep Dive

The gateway is where TrueFoundry differentiates itself from generic API management tools. It handles LLM-specific concerns that platforms like Kong or traditional API gateways weren't designed for:

**Model Routing and Fallbacks.** Requests can be routed based on latency, priority, or weight across multiple model providers. If OpenAI goes down, traffic automatically shifts to your configured fallback. The gateway also supports virtual models, which present a single API endpoint while abstracting the underlying provider.

**Governance and Security.** Role-based access control (RBAC) applies at the model, team, and application level. You can set per-team budget caps and rate limits. OAuth 2.0, API key authentication, and audit logging are built in. For regulated industries, the platform supports PII masking and controlled logging to ensure sensitive data stays within your infrastructure boundaries.

**Observability.** Every request is traced from prompt to output with metrics on latency, token usage, and cost. Traces can be exported to external monitoring systems. The platform supports custom metadata on traces, which means you can tag requests by application, user segment, or experiment cohort and filter analytics accordingly.

**Prompt Management.** Prompts are version-controlled with support for variables and templating. Teams can maintain a centralized prompt library, reducing duplication and making it easier to roll out prompt changes across applications.

**Caching.** Both simple and semantic caching are available. Semantic caching is particularly interesting because it can serve cached responses for semantically similar prompts, reducing redundant API calls to expensive models.

---

## MCP Gateway: The Agent Orchestration Layer

This is the newer addition to the platform and arguably the most forward-looking piece. The MCP (Model Context Protocol) Gateway lets you:

- Deploy and register MCP servers from a centralized catalogue
- Apply RBAC to tool access, so different teams or agents can only invoke approved tools
- Set rate limits and quotas on tool calls
- Monitor all tool invocations with the same observability stack used for LLM calls

In practice, this means if you're building AI agents that call external APIs, databases, or internal tools via MCP, TrueFoundry becomes the governance layer for those interactions. You get visibility into which tools are being called, how often, by whom, and with what results.

---

## Deployment Flexibility

TrueFoundry runs on Kubernetes and is designed to sit on top of your existing infrastructure. You bring your own cloud account or on-prem hardware, and the platform connects to it. This "bring your own compute" model avoids vendor lock-in on the infrastructure side.

Deployment modes include:

- **SaaS** — Fully managed on TrueFoundry's cloud
- **Self-hosted VPC** — Control plane hosted by TrueFoundry, gateway plane in your VPC
- **Fully self-hosted** — Both planes on your infrastructure
- **Air-gapped** — For environments with no internet connectivity

All modes use the same policies, controls, and observability, so you can start with SaaS and migrate to self-hosted later without reconfiguring your applications.

---

## Pricing

The pricing tiers as of early 2026:

- **Developer** — Free. 50K requests/month, 3 users, 5 MCP server registrations. Solid for prototyping.
- **Pro** — $499/month. 1M requests/month, 10 users, advanced caching, semantic routing.
- **Pro Plus** — $2,999/month. 1M requests/month, 25 users, stricter data controls, priority SLAs.
- **Enterprise** — Custom pricing. 10M+ requests/month, dedicated support, full customization.

The free tier is generous enough to evaluate the platform, and the jump to Pro adds the governance features that matter for production use.

---

## How It Compares

TrueFoundry sits at the intersection of several categories, which makes direct comparison tricky. Here's how it stacks up against adjacent tools:

**vs. LiteLLM / OpenRouter** — These are excellent open-source/unified API gateways for LLM access, but they don't include the MCP registry, prompt management, or the full deployment platform. TrueFoundry is more of a complete platform play.

**vs. LangSmith** — LangSmith focuses on tracing, evaluation, and debugging for LangChain-based applications. TrueFoundry includes observability but adds model routing, governance, and deployment infrastructure on top.

**vs. Portkey / Helicone** — These are lighter-weight LLM gateway solutions focused on observability and routing. TrueFoundry matches those features and adds MCP support, self-hosted model deployment, and the broader engineering platform.

**vs. Traditional API Gateways (Kong, Apigee)** — These handle general API traffic but lack LLM-specific features like token counting, prompt caching, and semantic routing. TrueFoundry purpose-builds for AI workloads.

---

## Who Should Use It

TrueFoundry makes the most sense for mid-to-large organizations that have moved beyond the "one team, one OpenAI key" stage. If you're managing multiple LLM applications across teams, need compliance guardrails, want to self-host models alongside hosted ones, and require visibility into costs and usage, the platform addresses all of those needs in a single integration.

For solo developers or small startups with a single API key and straightforward needs, the free tier is worth trying, but the governance features won't matter until your team and usage grow.

---

## Bottom Line

TrueFoundry isn't trying to be the fastest inference provider or the cheapest API gateway. It's building the management layer for organizations that treat AI as critical infrastructure. The MCP Gateway support is a notable bet on the agent era, and the deployment flexibility (VPC, on-prem, air-gapped) gives it an edge with enterprises that can't send data to third-party APIs.

The platform is modular enough to adopt incrementally, the free tier lets you kick the tires, and the pricing scales predictably for teams that outgrow it. If governance and operational maturity are your current bottlenecks rather than raw model access, TrueFoundry is worth evaluating.

---

*TrueFoundry — [truefoundry.com](https://www.truefoundry.com) | [GitHub](https://github.com/truefoundry)*
