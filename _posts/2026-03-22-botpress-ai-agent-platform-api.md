---
title: "Botpress: The AI Agent Platform That Actually Ships to Production"
excerpt: "Botpress combines a visual drag-and-drop builder with a code-first API, LLMz inference engine, and multi-channel deployment to turn conversational AI ideas into production agents in hours instead of months."
coverImage: "/assets/blog/botpress-cover.jpg"
date: 2026-03-22T12:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/botpress-cover.jpg"
---

## TL;DR

Botpress is a complete AI agent platform that lets you build, deploy, and monitor AI agents across channels like webchat, WhatsApp, Slack, and Discord. Its custom inference engine called LLMz handles instruction following, tool execution, memory management, and code generation internally rather than relying on fragile external orchestration. The platform ships with a visual flow builder for non-technical builders, a TypeScript SDK for developers who want code-first control, and a cloud infrastructure that handles hosting, scaling, and observability. Pricing starts free with a monthly $5 AI credit, and LLM tokens are billed at provider cost with zero markup.

> The gap between "cool demo" and "production AI agent" is where most projects go to die. Botpress was built to close that gap.

---

## The Problem With Building AI Agents Today

Every team building AI agents hits the same wall eventually. The prototype works beautifully in a Jupyter notebook. It handles the happy path perfectly. Then you try to deploy it.

Suddenly you need: a way for users to interact with the agent across different channels, memory management so the agent remembers what happened three messages ago, fallback logic when an LLM call fails, monitoring to understand what the agent is actually doing in production, and integration with your existing CRM, ticketing system, or database. Each of these becomes its own engineering project.

Most teams cobble together five to eight separate tools: an orchestration framework, a vector database, a channel connector, a monitoring layer, and a hosting provider. The result is fragile, expensive to maintain, and nearly impossible to hand off to anyone who isn't deeply technical.

---

## How Botpress Solves This

Botpress takes an integrated approach. Everything you need to build and run an AI agent lives on one platform: the builder, the inference engine, the knowledge base, the channel integrations, the monitoring, and the hosting.

### The LLMz Inference Engine

The core of every Botpress agent is LLMz, a custom inference engine that runs everything internally. Unlike standard tool-calling frameworks that rely on prompting patterns and external orchestration, LLMz coordinates the agent's behavior directly:

- It interprets instructions and maps them to actions
- It manages memory across turns and sessions
- It selects and executes the right tools for each step
- It runs custom JavaScript code in a safe sandbox
- It generates structured responses without extra configuration

This matters because most agent failures happen at the seams between components. When your orchestrator calls an LLM, which calls a tool, which calls a database, each handoff is a potential failure point. LLMz reduces those seams by keeping more logic inside a single execution layer.

---

## Three Ways to Build With Botpress

> One platform, three building modes. Pick the one that fits your team and your project.

### Studio: Visual Builder for Rapid Prototyping

Botpress Studio is a drag-and-drop interface where you design agent flows visually. Each node in the flow represents an action: sending a message, calling an API, querying a knowledge base, or running custom code.

Studio is designed for speed. You can go from zero to a deployed agent with knowledge base integration in under an hour. It handles the conversational flow, personality, and logic without writing any code. The visual approach also makes it easy to collaborate with non-technical team members: designers, product managers, and customer support leads can all contribute to the agent's behavior.

### ADK: Agent Development Kit for Code-First Builders

For developers who prefer code, Botpress offers the ADK, a TypeScript library currently in beta. ADK lets you define agent behavior programmatically with full control over logic, tool definitions, and memory strategies.

The ADK integrates with standard development workflows: version control, CI/CD, testing frameworks. You can define agents as code, deploy them through your pipeline, and manage them like any other software artifact.

### Desk: Human-AI Team Workspace

Botpress Desk is a customer support workspace where human agents and AI agents work side by side. When the AI encounters something it can't handle, it hands off seamlessly to a human. The human agent sees the full conversation history and can jump in without the customer repeating anything.

Desk is included for teams that need human oversight: customer support, sales qualification, or any workflow where AI handles the first pass and humans handle the exceptions.

---

## The API and Developer Experience

Botpress provides a REST API and TypeScript SDK for programmatic access. The API covers three main areas:

### Messaging API

Send and receive messages through any connected channel:

```javascript
const options = {
  method: 'POST',
  headers: {
    'x-user-key': '<your-key>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    payload: { audioUrl: '<url>', type: 'audio' },
    conversationId: '<conversation-id>'
  })
};

fetch('https://chat.botpress.cloud/<webhookUrl>/messages', options)
  .then(res => res.json())
  .then(data => console.log(data));
```

### Data Tables API

Store and retrieve structured data that your agent needs:

```javascript
fetch('https://api.botpress.cloud/v1/tables', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'customer_orders',
    factor: 1,
    frozen: true,
    schema: {},
    tags: {},
    isComputeEnabled: true
  })
});
```

### Administration API

Manage bots, workspaces, and configurations programmatically:

```javascript
fetch('https://api.botpress.cloud/v1/admin/bots', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'support-agent',
    states: {},
    events: {},
    configuration: { data: {}, schema: {} },
    user: { tags: {} },
    conversation: { tags: {} },
    message: { tags: {} }
  })
});
```

---

## Knowledge Base and Data

Every Botpress agent includes a built-in vector database for knowledge retrieval. You can feed it documents, web pages, PDFs, images, and structured data, and the agent will automatically retrieve relevant information when answering questions.

The knowledge base supports:

- **Text documents**: PDFs, Word docs, plain text
- **Visual media**: Images, charts, and diagrams (available on Plus plans and above)
- **Web pages**: URLs are automatically crawled and indexed
- **Tables**: Structured data that the agent can query conversationally

The vector DB storage scales from 100MB on the free plan to 2GB on Team, with additional storage available as an add-on.

---

## Multi-Channel Deployment

> Build once, deploy everywhere. Botpress agents work across every major messaging channel out of the box.

Botpress agents can be deployed to:

- **Webchat**: Embeddable widget with customizable styling and proactive greetings
- **WhatsApp**: Full WhatsApp Business API integration
- **Slack**: Direct workspace integration
- **Discord**: Server bot deployment
- **Microsoft Teams**: Enterprise collaboration
- **Telegram**: Global messaging reach
- **And more**: SMS, email, custom channels via webhooks

Each channel integration handles the specifics of message formatting, attachments, and user identification automatically. Your agent's logic stays channel-agnostic.

---

## Pricing

Botpress uses a pay-as-you-go model with LLM tokens billed at provider cost and no markup:

- **Pay-as-You-Go**: Free tier includes 500 messages/month, 1 bot, 1 collaborator, 100MB vector storage, and a $5 monthly AI credit.
- **Plus**: Starts at $50/month (billed annually) with 5,000 messages/month, 2 bots, human handoff, conversation insights, watermark removal, and visual knowledge base indexing.
- **Team**: Starts at $125/month (billed annually) with 50,000 messages/month, 3 bots, real-time collaboration, custom analytics, role-based access, and priority support.
- **Managed**: Custom pricing. Botpress builds, deploys, and maintains your AI agent with ongoing optimization and a dedicated success manager.

Additional messages, bots, collaborators, and storage are available as add-ons.

---

## What Stands Out

- **LLMz Engine**: The custom inference engine is a genuine differentiator. Most agent platforms orchestrate external LLM calls; Botpress runs more of the agent logic internally, reducing failure points.
- **No LLM Markup**: Billing tokens at provider cost is a strong stance. Many platforms add 20-50% markup on LLM usage.
- **Dual Building Modes**: Having both a visual builder and a code-first SDK means the same platform works for different team compositions.
- **Integrated Infrastructure**: Knowledge base, monitoring, hosting, and channel integrations all included. No assembling a patchwork of tools.
- **Scale to Zero**: The free tier is genuinely useful for prototyping, and you only pay as your agent gains traction.

---

## Limitations to Consider

- **Bot Limits on Lower Tiers**: The free plan includes only 1 bot and 500 messages. You'll need Plus or Team for serious production use.
- **TypeScript-First**: The ADK is TypeScript-focused. Teams built entirely on Python will need to work through the REST API or use a JavaScript runtime.
- **Vendor Lock-in Risk**: While the ADK is code-first, the deep integration with Botpress cloud means migrating away would require rework of channel connections and knowledge base setup.
- **Learning Curve for Advanced Features**: The visual builder is intuitive, but getting the most out of LLMz, custom code nodes, and advanced memory strategies takes time.

---

## Who Should Use Botpress

Botpress is strongest for teams that need to ship AI agents quickly without building custom infrastructure. Customer support bots, sales qualification agents, internal helpdesks, and appointment booking systems are natural fits. The combination of a visual builder for rapid iteration and a code API for customization means it works for both non-technical teams validating ideas and engineering teams building production systems.

If you're already deep into a custom orchestration stack and it's working fine, switching to Botpress may not be worth the migration cost. But if you're starting a new agent project or tired of maintaining a patchwork of tools, it's worth evaluating.

---

## Key Links

- [Website](https://botpress.com)
- [Documentation](https://botpress.com/docs)
- [Studio Docs](https://botpress.com/docs/studio/introduction)
- [ADK Docs](https://botpress.com/docs/adk/introduction)
- [API Reference](https://botpress.com/docs/developers/api)
- [Discord Community](https://discord.gg/botpress)
- [Pricing](https://botpress.com/pricing)

---

## Key Specs at a Glance

| Feature | Detail |
| --- | --- |
| Custom Inference Engine | LLMz |
| Builder Options | Visual Studio + TypeScript ADK |
| Channels | Webchat, WhatsApp, Slack, Discord, Teams, Telegram, SMS |
| Knowledge Base | Built-in vector DB with document/visual indexing |
| Monitoring | Real-time logs, event data, custom analytics |
| LLM Markup | None (provider cost) |
| Free Tier | 500 messages, 1 bot, $5 AI credit |
| Compliance | SOC 2, DPA, BAA (HIPAA) |
| Founded | 2017 |
| Headquarters | Montreal, Canada |

---

## The Verdict

Botpress occupies a rare middle ground in the AI agent space. It's more capable than a simple chatbot builder but less overwhelming than assembling your own infrastructure from LangChain, Pinecone, and custom hosting. The LLMz engine is a genuine architectural bet on running agent logic efficiently, and the no-markup LLM pricing is a welcome contrast to platforms that quietly inflate token costs.

For teams that need to get an AI agent from concept to production without becoming infrastructure experts, Botpress delivers exactly what it promises.

---

This article was created to guide you on finding and using the tool covered here.
