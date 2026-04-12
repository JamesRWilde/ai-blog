---
title: "Dust AI Agent API: Building Custom AI Fleets for Enterprise Teams"
excerpt: "Dust's API lets developers build, deploy, and orchestrate custom AI agents connected to company data across Slack, Google Drive, Notion, and more, with SOC 2 compliance built in."
coverImage: "/assets/blog/dust-ai-agent-api-cover.png"
date: 2026-03-29T05:55:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/dust-ai-agent-api-cover.png"
---

## TL;DR

Dust is a Paris-based AI agent platform that lets teams build, deploy, and govern fleets of custom AI agents. Its developer API enables programmatic agent creation, conversation management, and data source integration across tools like Slack, Google Drive, Notion, Confluence, and GitHub. The platform supports multiple LLM providers (GPT-5, Claude Opus, Gemini, Mistral) through a single interface and is trusted by over 5,000 organizations. It is SOC 2 Type II certified, GDPR compliant, and offers zero data retention options for enterprise deployments.

## The Problem

Most teams adopting AI face a fragmented toolchain. They use ChatGPT for one thing, Claude for another, and a collection of internal scripts to connect those tools to company data. The result is a mess of disconnected AI interactions with no governance, no audit trail, and no way to give agents persistent access to organizational knowledge.

The gap between "we use AI" and "AI is integrated into our workflows" remains large. Individual employees adopt tools independently. Company knowledge stays siloed in docs and Slack channels. Agents cannot access the data they need to produce useful answers. And IT teams have no visibility into what is being asked or what data is being exposed to third-party model providers.

Dust addresses this by positioning itself as the operating layer between raw LLM APIs and enterprise workflows. Think of it as an orchestration layer, not just another chatbot.

## What the Dust API Actually Does

Dust exposes a REST API that covers three core capabilities: agent management, conversation handling, and data source integration.

### 1. Agent Management API

Developers can create, configure, and manage AI agents programmatically. Each agent has:

- **Custom instructions** that define its behavior and persona
- **Tool access** configured per agent (web search, data analysis, code execution)
- **Model selection** allowing different agents to run on different LLMs
- **Data source connections** that determine what company knowledge the agent can reference

Creating an agent via the API is straightforward:

```http
POST /api/v1/workspace/{wId}/agents HTTP/1.1
Host: dust.tt
Authorization: Bearer {API_KEY}
Content-Type: application/json

{
  "name": "EngineeringAssistant",
  "instructions": "You are an engineering support agent. Answer questions about the codebase, suggest best practices, and reference internal documentation.",
  "model": "gpt-5",
  "dataSources": ["github-main", "confluence-eng-wiki"],
  "tools": ["web_search", "code_interpreter"]
}
```

### 2. Conversation API

The conversation endpoint handles multi-turn interactions with full context management. Unlike a raw LLM call, Dust manages conversation history, retrieval augmentation from connected data sources, and model routing automatically.

```http
POST /api/v1/workspace/{wId}/agents/{aId}/conversations HTTP/1.1
Host: dust.tt
Authorization: Bearer {API_KEY}
Content-Type: application/json

{
  "message": "What is our authentication flow for the mobile API?",
  "context": {
    "channel": "slack",
    "threadId": "t_abc123"
  }
}
```

The response includes the agent's answer, source citations from connected data, and metadata about which data sources were queried.

### 3. Data Source Integration API

This is where Dust differentiates from a simple API wrapper around GPT or Claude. The platform connects to enterprise data sources and builds searchable indexes that agents can query at conversation time. Supported connectors include:

- **Slack** (channels, threads, DMs with permission controls)
- **Google Drive** (docs, sheets, presentations)
- **Notion** (pages, databases)
- **Confluence** (spaces, pages)
- **GitHub** (repositories, issues, pull requests)
- **Zendesk** (tickets, help center)

Data source management is available through the API, letting engineering teams automate connector setup as part of their infrastructure:

```http
POST /api/v1/workspace/{wId}/data_sources HTTP/1.1
Host: dust.tt
Authorization: Bearer {API_KEY}
Content-Type: application/json

{
  "name": "engineering-docs",
  "provider": "google_drive",
  "config": {
    "folderId": "folder_abc123",
    "syncFrequency": "hourly"
  }
}
```

### Programmatic Usage Modes

Beyond direct API calls, Dust supports three integration modes:

1. **REST API** for custom backends and services
2. **Google Sheets integration** for non-technical teams
3. **Zapier connector** for workflow automation without code

Each mode uses the same underlying agent infrastructure, meaning changes to agent instructions or data connections propagate across all usage surfaces.

## Pricing and Plans

Dust uses a per-seat model with the following tiers:

| Plan | Price | What you get |
|------|-------|-------------|
| Pro | Starting from 1 user | Advanced models (GPT-5, Claude, Gemini, Mistral), custom agents with tool execution, data source connections, native integrations (Zendesk, Slack, Chrome), SOC 2 and zero data retention, unlimited messages, free API credits |
| Enterprise | Custom | Everything in Pro plus SSO/SCIM, advanced access controls, dedicated support, custom data residency |

Programmatic API usage includes free credits on the Pro plan. Additional API usage is billed at a fixed rate, which makes cost predictable for teams building automated workflows on top of Dust.

## Security and Compliance

Dust takes enterprise security seriously, which matters for any team considering an AI agent platform that accesses internal data:

- **SOC 2 Type II certified** (not just Type I, which is a point-in-time audit)
- **GDPR compliant** with data residency options
- **Zero Data Retention (ZDR)** available, meaning your data is not stored by model providers
- **Encryption** at rest and in transit
- **Fine-grained access control** with Spaces, SSO/SCIM, and role-based permissions
- **Audit logs** for enterprise compliance tracking

The platform is model-agnostic by design. Teams can switch between OpenAI, Anthropic, Google, and Mistral models without changing their agent configurations or data connections. This provider flexibility is a practical hedge against vendor lock-in and pricing changes.

## Who Uses Dust

Dust reports over 5,000 organizations on the platform. The typical use case is a mid-size to large company that wants to:

- Give employees an AI assistant that knows internal documentation
- Build specialized agents for specific teams (engineering, support, sales)
- Automate workflows that combine AI reasoning with company data
- Maintain governance over what data AI agents can access

The platform originated in France and has a strong presence in European tech companies, which aligns with its emphasis on GDPR compliance and data residency.

## The Bottom Line

Dust is not another LLM wrapper. It is an orchestration layer that connects AI agents to enterprise data with governance controls baked in. The API is clean and well-structured, covering agent management, conversation handling, and data source integration without unnecessary complexity.

The platform makes sense for teams that have moved past the "let everyone use ChatGPT" phase and need structured, auditable AI access across the organization. The model-agnostic approach and SOC 2 compliance check the boxes that enterprise buyers care about. The main limitation is that it is a managed platform, so teams wanting full self-hosting control will need to look elsewhere.

For developers building AI-powered internal tools, Dust's API offers a pragmatic middle ground between raw LLM calls and fully custom agent infrastructure.
