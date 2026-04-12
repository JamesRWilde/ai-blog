---
title: "Langdock API: The Enterprise-Grade AI Platform That Finally Gets Compliance Right"
excerpt: "Langdock's API consolidates multiple LLM providers behind a single, GDPR-compliant endpoint with SOC 2 certification and dedicated EU hosting."
coverImage: "/assets/blog/langdock-cover.jpg"
date: 2026-03-27T07:30:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/langdock-cover.jpg"
---

## TL;DR

Langdock is a Frankfurt-based enterprise AI platform that offers a unified API for accessing models from OpenAI, Anthropic, Google, and Mistral. The company has quietly grown to over 5,000 enterprise customers, including Merck, The Economist, and Babbel. Its pitch: run AI across your organization with GDPR-compliant EU hosting, SOC 2 certification, and a single API key that replaces four separate provider contracts. Pricing runs on a per-seat model with no public free tier for API access.

## The Problem Langdock Actually Solves

Most companies using AI APIs at scale are dealing with a mess. They have contracts with OpenAI for GPT, Anthropic for Claude, Google for Gemini, and maybe Mistral for European compliance needs. Each provider has different billing, different rate limits, different data processing agreements, and different security postures. The legal and procurement overhead alone can be staggering.

Langdock consolidates this. One API endpoint, one contract, one set of rate limits, one compliance framework. Instead of managing separate relationships with four AI providers, a company gets a single integration point that routes requests to whatever model the user selects.

The key claim: **your data never leaves the EU** if you use their EU-hosted endpoints. Requests are routed through Azure OpenAI's European regions, which matters enormously for companies operating under GDPR and unwilling to accept the legal uncertainty of US-based data processing.

---

## The API in Practice

Langdock's API follows the OpenAI specification closely. If you can call the OpenAI Chat Completions endpoint, you can call Langdock's with a URL swap. The base URL changes from `https://api.openai.com/v1` to `https://api.langdock.com/openai/eu/v1`. That's it.

### Quick Start with Python

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.langdock.com/openai/eu/v1",
    api_key="<YOUR_LANGDOCK_API_KEY>"
)

completion = client.chat.completions.create(
    model="gpt-5-mini",
    messages=[
        {"role": "user", "content": "Write a short poem about cats."}
    ]
)

print(completion.choices[0].message.content)
```

### Node.js with Vercel AI SDK

```typescript
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const langdockProvider = createOpenAI({
  baseURL: "https://api.langdock.com/openai/eu/v1",
  apiKey: "<YOUR_LANGDOCK_API_KEY>",
});

const result = await streamText({
  model: langdockProvider("gpt-5-mini"),
  prompt: "Write a short poem about cats",
});

for await (const textPart of result.textStream) {
  process.stdout.write(textPart);
}
```

Because the interface is OpenAI-compatible, existing SDKs like the OpenAI Python library and Vercel AI SDK work without modification. No new dependencies, no proprietary client libraries.

---

## What Sets It Apart

### Multi-Model Access, One Endpoint

The API provides access to models from four major providers through a unified interface:

- **OpenAI**: GPT models and reasoning models
- **Anthropic**: Claude models
- **Google**: Gemini models
- **Mistral**: Mistral models

The available models depend on your workspace configuration. Admins control which models are exposed to users. If an organization wants to restrict access to only Claude models for compliance reasons, that's a configuration toggle, not a new integration.

### Agent API

Beyond raw chat completions, Langdock exposes an Agent API for creating and managing custom AI agents programmatically. Agents can be configured with specialized knowledge bases, attached documents via the Knowledge Folder API, and shared with API keys for programmatic access. This is where the platform moves beyond being a simple proxy.

### Knowledge Folder API

Documents uploaded to knowledge folders are indexed and searchable, enabling RAG applications without building your own vector store. The API supports file uploads, semantic search, and folder sharing. For enterprises, this means internal documentation can be exposed to AI agents without third-party data exposure.

### Enterprise Security Features

- **SOC 2 Type II certified** infrastructure
- **GDPR compliant** with EU data processing
- **End-to-end encryption** and audit logging
- **BYOK (Bring Your Own Key)** option for organizations that want to use their own OpenAI/Anthropic API keys through Langdock's interface
- **Browser-origin requests are blocked** intentionally to prevent API key exposure

---

## Rate Limits and Pricing

Rate limits are defined at the **workspace level**, not per API key:

- **500 RPM** (requests per minute)
- **60,000 TPM** (tokens per minute)

Pricing is not publicly listed on the website. Langdock operates on an enterprise sales model with per-seat licensing. There is no public free tier for API access. Organizations need to contact sales for pricing, which is a red flag for individual developers but standard practice for enterprise SaaS.

---

## The Competitive Landscape

Langdock competes in a growing category of **LLM orchestration platforms** alongside OpenRouter, Portkey, and others. Here's where it differs:

**vs. OpenRouter**: OpenRouter is developer-focused, self-serve, with transparent pay-per-token pricing. Langdock is enterprise-focused with per-seat licensing and compliance certifications. Different audiences.

**vs. Direct API access**: Langdock adds a compliance and governance layer on top of raw model access. If your organization's legal team requires SOC 2, GDPR, and audit trails, Langdock bundles these. If you're a developer building a side project, it's overkill.

**vs. AWS Bedrock / Azure OpenAI**: These cloud-native options provide similar multi-model access within their respective ecosystems. Langdock's advantage is provider neutrality: you're not locked into Azure or AWS infrastructure, and you get a consistent API across all model providers rather than navigating each cloud's native AI services.

---

## Limitations

The platform has real constraints worth noting:

- **No public pricing**: Enterprise sales cycle required. Individual developers and small teams are not the target audience.
- **Not self-serve**: You can't sign up and start making API calls in five minutes like you can with OpenAI or OpenRouter.
- **Vendor dependency**: Langdock sits between you and the model providers. If Langdock has an outage, your integration goes down regardless of provider status.
- **Rate limits are workspace-level**: At 500 RPM and 60,000 TPM, high-throughput applications may hit ceilings that direct provider access wouldn't.
- **Model availability depends on workspace config**: Admins control model access, which adds governance but also friction.

---

## Verdict

Langdock solves a real problem for mid-to-large organizations that need to use multiple AI models without the procurement, compliance, and security overhead of managing four separate API contracts. The OpenAI-compatible API means migration is low-friction for teams already using OpenAI's SDK.

But this is not a product for individual developers or startups. The lack of public pricing, the enterprise sales model, and the absence of a free tier make it clear: Langdock is selling to CISOs and procurement departments, not to developers on weekend projects.

If your company's legal team has been blocking AI API adoption because of data residency concerns or compliance requirements, Langdock is worth a serious evaluation. If you just want to build a chatbot, stick with the direct APIs.

**Pricing**: Contact sales (no public tiers)
**Free tier**: None for API access
**Docs**: [docs.langdock.com](https://docs.langdock.com)

---

## Sources

- [Langdock API Documentation](https://docs.langdock.com/api-endpoints/api-introduction)
- [Langdock Product Overview](https://langdock.com/)
- [OpenAI Chat Completions API Specification](https://platform.openai.com/docs/api-reference/chat/create)
- [Langdock Agent API Guide](https://docs.langdock.com/api-endpoints/agent/agent-api-guide)
