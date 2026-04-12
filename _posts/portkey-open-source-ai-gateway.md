---
title: "Portkey: The Open-Source AI Gateway That Routes, Observes, and Guards Your LLM Stack"
excerpt: "Portkey is an open-source AI gateway providing unified access to 200+ models with built-in observability, guardrails, caching, and automatic failover — a production-grade control plane for teams shipping AI at scale."
coverImage: "/assets/blog/portkey-cover.png"
date: 2026-03-15T22:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/portkey-cover.png"
---

## TL;DR

Portkey is an open-source AI gateway that sits between your application and 200+ LLM providers. It handles routing, load balancing, retries, fallbacks, guardrails, caching, and observability — all through a single unified API. Think of it as the "Cloudflare for AI APIs." Integration takes under 2 minutes, and the gateway runs anywhere: cloud, Kubernetes, Docker, or Cloudflare Workers.

## The Problem

If you're building with AI APIs in 2026, you know the pain. You're likely hitting OpenAI, Anthropic, maybe Groq or Together AI — each with their own API keys, billing dashboards, rate limits, and failure modes. When one provider goes down at 3 AM, your app breaks. When you want to switch models, it's a code change. When your team scales to 10 engineers, API key management becomes a security nightmare.

The typical response is duct tape: environment variables, try-catch blocks, maybe a Redis cache bolted on. It works until it doesn't.

Portkey's thesis is simple — the AI gateway should be infrastructure, not a weekend project.

## What Portkey Actually Does

At its core, Portkey is a proxy. You point your SDK at Portkey instead of OpenAI's endpoint, and Portkey handles the rest. But the "rest" is substantial.

### Unified API Across 200+ Models

One API key, one interface, 200+ models. OpenAI, Anthropic, Google, AWS Bedrock, Azure, Groq, Mistral, Cohere, and dozens more. Portkey normalizes the request/response format, so switching from GPT-4o to Claude Sonnet 4.6 to Llama 3.3 is a config change, not a rewrite.

### Routing Intelligence

This is where it gets interesting. Portkey supports:

- **Load balancing** — distribute requests across multiple API keys or providers to avoid rate limits
- **Automatic retries** — configurable retry logic with exponential backoff
- **Fallbacks** — if Provider A fails, automatically try Provider B. Specify which error codes trigger a fallback
- **Conditional routing** — route requests based on model type, user tier, or custom headers
- **Canary deployments** — send 10% of traffic to a new model, compare results

### Guardrails

Portkey ships with 50+ guardrail templates out of the box. These run before (input) and after (output) your LLM calls:

- **Content filtering** — block specific words, phrases, or patterns in inputs/outputs
- **PII detection** — catch social security numbers, emails, phone numbers
- **Topic restrictions** — prevent the model from discussing certain subjects
- **Format validation** — ensure JSON outputs match a schema
- **Custom hooks** — plug in your own validation logic

If a guardrail triggers, Portkey can retry the request (up to N attempts), fall back to another provider, or return an error. This is not theoretical — the retry logic runs the guardrail check against every attempt.

### Observability

Every request through Portkey gets logged with full metadata: model, tokens used, latency, cost, cache hit/miss, guardrail status, and the actual request/response payloads. The dashboard shows real-time metrics, and you can export logs to your data warehouse.

For teams shipping AI features, this answers the "why did this cost $500 yesterday?" question with data instead of speculation.

### Caching

Semantic caching stores and re-serves identical (or semantically similar) prompts. Portkey claims this can cut API costs by 20-40% for applications with repetitive prompt patterns — think chatbots answering the same questions, or batch processing jobs with overlapping inputs.

## How It Works (Technically)

Install via npm or pip:

```bash
# Node
npm install @portkey-ai/gateway

# Python
pip install portkey-ai
```

Three lines to integrate:

```python
from portkey_ai import Portkey

client = Portkey(
    api_key="YOUR_PORTKEY_API_KEY",
    provider="openai"
)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

Or use it as a drop-in proxy with your existing OpenAI SDK:

```python
from openai import OpenAI
from portkey_ai import PORTKEY_GATEWAY_URL, createHeaders

client = OpenAI(
    api_key="YOUR_OPENAI_API_KEY",
    base_url=PORTKEY_GATEWAY_URL,
    default_headers=createHeaders(
        provider="openai",
        api_key="YOUR_PORTKEY_API_KEY"
    )
)
```

For self-hosted deployments:

```bash
npx @portkey-ai/gateway
# Gateway runs on http://localhost:8787/v1
# Console at http://localhost:8787/public/
```

## MCP Gateway — The New Angle

With the rise of MCP (Model Context Protocol) in 2026, Portkey added an MCP Gateway that provides centralized management for MCP servers across an organization:

- **Single authentication layer** — users authenticate once; MCP servers receive verified requests
- **Access control** — granular permissions on which teams access which servers and tools
- **Full observability** — every tool call logged with who, what, parameters, response, and latency
- **Identity forwarding** — automatically pass user email, team, and roles to MCP servers

This works with Claude Desktop, Cursor, VS Code, and any MCP-compatible client.

## Pricing

Portkey offers a free tier for getting started. The paid tiers unlock enterprise essentials: SSO, RBAC, custom retention periods, private cloud deployment, SOC2/GDPR/HIPAA compliance, custom BAAs, and dedicated support. Pricing is usage-based, scaled by recorded logs.

The open-source gateway can be self-hosted for free under the MIT license, which makes it viable for startups and teams with strict data residency requirements.

## Context: The Gateway Layer

Portkey isn't alone in the AI gateway space. LiteLLM offers similar multi-provider routing (also open-source). Kong has added AI gateway features to its API management platform. AWS, Azure, and GCP all have native routing for their respective model catalogs.

Portkey differentiates on two axes: the depth of its guardrails (50+ templates vs. barebones elsewhere) and the MCP Gateway play, which positions it as the control plane for agentic AI workflows — not just simple chat completions.

The Series A funding (confirmed in 2026) and the 2.0 gateway merge of enterprise features into open-source signal serious intent. Whether the market will sustain a dedicated AI gateway layer or absorb it into existing API management remains an open question.

## Open Questions

- **Latency overhead** — every proxy adds latency. Portkey claims edge deployment minimizes this, but benchmarks vs. direct API calls are hard to find independently
- **Guardrail accuracy** — template-based guardrails are useful but imperfect. How often do they produce false positives in production?
- **Vendor lock-in** — switching TO a gateway is easy; switching FROM one (if you've built configs and guardrails around it) may not be
- **MCP Gateway adoption** — MCP is still maturing. The gateway play is forward-looking but depends on MCP becoming the standard for agent-tool interactions

## Bottom Line

Portkey is doing for AI APIs what API gateways did for REST: abstracting away the plumbing so teams can focus on building. If you're hitting multiple LLM providers in production and losing sleep over reliability, cost tracking, or compliance — this is worth evaluating. The open-source option removes most adoption risk.

---

*Sources: [Portkey Documentation](https://docs.portkey.ai), [Portkey GitHub (Gateway)](https://github.com/Portkey-ai/gateway), [Portkey.ai](https://portkey.ai)*
