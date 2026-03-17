---
title: "Arcade: The MCP Runtime That Makes AI Agents Production-Ready"
excerpt: "Arcade is an MCP runtime platform that solves the hardest problem in AI agent development: secure, reliable authorization and tool execution across real business systems, with enterprise governance built in from day one."
coverImage: "/assets/blog/arcade-dev-cover.jpg"
date: 2026-03-17T00:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/arcade-dev-cover.jpg"
---

## TL;DR

Arcade is the runtime layer that sits between AI agents and the real world. While most platforms focus on model performance or prompt engineering, Arcade solves the problem that actually kills production agent deployments: getting agents to securely authenticate, authorize, and execute actions across business systems like Gmail, Slack, Salesforce, and Microsoft Office 365. It provides an MCP (Model Context Protocol) runtime with managed OAuth, agent-optimized tool catalogs, an open-source framework for building custom tools, and enterprise governance features including audit logs. Trusted by LangChain, Snyk, Relevance AI, and Prosus, Arcade turns agent prototypes into multi-user production systems without the usual infrastructure headaches.

## The Problem

Building an AI agent that works in a demo is straightforward. Building one that securely acts on behalf of thousands of users across dozens of enterprise systems is a different challenge entirely.

The bottleneck isn't model intelligence. It's the plumbing. Every external service an agent touches requires its own authentication flow, its own permission model, its own error handling, and its own token refresh logic. OAuth 2.0 flows are complex enough for human users; for agents that need to act autonomously on behalf of specific users with scoped permissions, the complexity multiplies. Token refresh introduces race conditions. Service accounts bypass user-level permissions. And debugging why an agent failed to create a Salesforce opportunity at 3 AM requires observability that most teams haven't built.

Most developers building production agents end up in one of two traps: either they hardcode service account credentials and hope nothing breaks (it will), or they spend months building a custom auth and integration layer that becomes a maintenance burden rivaling the agent itself. Neither path is sustainable.

What's needed is a runtime purpose-built for agent-to-service interaction, something that handles the full lifecycle of authentication, authorization, tool execution, and governance, without requiring every team to reinvent the wheel.

## What Arcade Actually Does

Arcade positions itself as "the MCP runtime for secure agent authorization, reliable tools, and governance." That's a specific claim, so let's unpack it.

### MCP Runtime

At its core, Arcade is built around the Model Context Protocol, the open standard for connecting AI models to external tools and data sources. But Arcade isn't just an MCP client. It's a runtime that makes MCP enterprise-ready by adding the layers that the protocol itself doesn't provide: authentication orchestration, multi-user session management, tool governance, and execution sandboxing.

The distinction matters. An MCP server can expose tools, but it doesn't solve who can use those tools, under what permissions, or what happens when something goes wrong. Arcade fills that gap.

### Secure Agent Authorization

This is Arcade's primary differentiator. Instead of agents acting through shared service accounts, Arcade enforces user-specific permissions through real OAuth flows. When an agent needs to read a user's Gmail, Arcade initiates the actual Google OAuth flow for that specific user, stores and refreshes tokens securely, and ensures the agent only acts within the scopes the user approved.

This approach satisfies security teams because agents never hold broad credentials. Every action is tied to a specific user with specific permissions, and those permissions can be revoked at any time through the user's existing identity provider.

### Agent-Optimized Tool Catalog

Arcade maintains a catalog of pre-built MCP tools across major business systems. Recent additions include a significantly expanded Salesforce MCP server (growing from 3 tools to 17, covering the full CRM workflow from lead to closed deal) and Microsoft Office 365 MCP servers with over 30 production-grade tools spanning Word, Excel, PowerPoint, OneDrive, and SharePoint.

These aren't thin API wrappers. The tools are designed for agent consumption, with structured inputs and outputs that LLMs can reliably parse. They handle binary file formats, session management, and concurrent edits, the kind of unglamorous details that cause most agent integrations to fail in production.

### Open-Source MCP Framework

For use cases that Arcade's built-in catalog doesn't cover, the platform provides an open-source framework for building custom tools. The framework includes OAuth integration, evaluation tooling, and runtime compatibility out of the box. Developers can build in Python or JavaScript and deploy tools that plug directly into the Arcade runtime.

This is a pragmatic design choice. No catalog will ever cover every API, so giving developers the same framework Arcade uses internally means custom tools get the same auth, governance, and reliability guarantees as built-in ones.

## How It Works

The developer experience is built around a simple flow. Install the SDK, initialize a client, and manage authorization through Arcade's auth API.

In Python, a basic integration looks like this: you create an Arcade client, initiate an auth flow for a specific user and service (like Google with Gmail read scopes), and either complete it inline or redirect the user to authorize. Once authorized, the agent can call tools on behalf of that user through the same client.

The JavaScript SDK follows the same pattern with full type safety. Both SDKs integrate with the major AI frameworks, OpenAI, LangChain, Anthropic, Google Gemini, and others, so developers can plug Arcade into their existing agent stack without rewriting their orchestration logic.

The MCP integration path is equally straightforward. Arcade's tools appear as standard MCP tools to any MCP-compatible client, including Claude Desktop, Cursor, and custom implementations. This means teams already using MCP can adopt Arcade incrementally, starting with a single integration and expanding as needed.

## Enterprise Governance

For production deployments, Arcade provides features that go beyond individual developer tooling:

**Audit logs** track every tool call, authentication event, and agent action with full attribution to specific users. This is non-negotiable for compliance in regulated industries, and it's the kind of feature that most open-source MCP implementations simply don't have.

**Multi-tenant architecture** means each user's credentials are isolated. One user's Gmail tokens are completely separate from another's, with no possibility of cross-contamination.

**Identity provider integration** lets enterprises plug Arcade into their existing SSO and directory services, rather than managing a separate user directory for agent permissions.

**Scoped permissions** allow administrators to define which tools and services agents can access, at both the organization and user level. An agent might have access to Slack and Google Calendar for all users, but only specific users can grant Salesforce access.

## The Competitive Landscape

Arcade occupies a specific niche in the AI infrastructure stack. It's not a model provider, not an agent framework, and not a general-purpose API integration platform. It's the authorization and tool execution layer that sits between agents and services.

This positions it alongside platforms like Composio, Nango, and Pipedream Connect, but with a narrower and deeper focus. Where Composio provides a broad toolkit catalog with session-based tool resolution, Arcade focuses on the MCP runtime and authentication orchestration. Where Nango excels at code-first integration development with data syncs, Arcade prioritizes the security and governance layer that enterprises require.

The MCP-native approach is also a bet on where the ecosystem is heading. As MCP adoption grows, which it is rapidly, driven by adoption from Anthropic, OpenAI, and the broader open-source community, a runtime purpose-built for MCP becomes more valuable as the standard matures.

## What's Strong

The security model is Arcade's standout feature. User-specific OAuth with managed token refresh is genuinely difficult to build correctly, and Arcade's approach of tying every agent action to a specific user with scoped permissions addresses the primary concern that enterprise security teams have about AI agents.

The tool catalog quality is high. The Salesforce expansion from 3 to 17 tools and the Office 365 launch with 30+ tools show a commitment to depth over breadth. These aren't checkbox integrations; they handle the complex edge cases (binary formats, concurrent edits, Microsoft Graph's OAuth maze) that cause most agent integrations to fail.

The open-source framework for custom tools is a smart hedge against catalog limitations. By giving developers the same runtime that powers built-in tools, Arcade avoids the trap of forcing teams into workarounds when the catalog doesn't cover their specific API.

Backing from LangChain's CEO Harrison Chase, who calls Arcade "the best platform to facilitate secure and interactive MCP," provides meaningful signal about where the agent framework ecosystem sees the tool-calling layer heading.

## What to Watch

Arcade is still young, and the tool catalog, while deep in key areas, doesn't cover every API an enterprise might need. Teams with niche or legacy system requirements should evaluate whether the custom tool framework is sufficient before committing.

The MCP runtime bet assumes that MCP continues its current trajectory as the dominant standard for agent-tool interaction. While the trend is strong, the protocol is still evolving, and competing approaches could emerge.

The governance features are enterprise-oriented, which is appropriate for the target market, but smaller teams or solo developers might find the setup overhead higher than simpler alternatives. The free tier exists, but the real value proposition kicks in at the multi-user, multi-service scale where authorization complexity becomes a genuine pain point.

## The Bottom Line

Arcade addresses one of the most critical unsolved problems in AI agent development: how to let agents securely act on behalf of real users across real business systems. The MCP-native approach, combined with managed OAuth, an expanding tool catalog, and enterprise governance features, makes it a serious contender for teams moving agents from prototype to production. For organizations where agent security and user-level permissions are non-negotiable, Arcade is worth evaluating now, before the authorization debt from hand-rolled integrations becomes unmanageable.
