---
title: "Requesty: The Unified LLM Gateway That Raised $3M to Replace OpenRouter"
excerpt: "A EU-first AI gateway promising 40% cost cuts through prompt caching, 400+ model routing, and GDPR compliance — the infrastructure layer most teams didn't know they needed."
coverImage: "/assets/blog/requesty-cover.png"
date: 2026-03-15T06:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/requesty-cover.png"
---

## TL;DR

Requesty is a unified LLM gateway that sits between your application and every major AI provider — OpenAI, Anthropic, Google, Mistral, and 400+ models total. It recently closed a $3M seed round led by 20VC and is positioning itself as "the Cloudflare for AI." The pitch: one API key, intelligent routing, automatic failovers, and prompt caching that claims to cut token costs by up to 40%. For teams already burning five figures a month on scattered AI APIs, it's worth a serious look.

## The Problem Everyone Pretends Doesn't Exist

Most AI-native startups today look something like this: GPT-5 for chat completions, Claude Opus for code generation, Gemini for document parsing, and a sprinkling of open-source models for cost-sensitive tasks. Each one has its own SDK, its own billing, its own rate limits, and its own outage schedule.

When OpenAI went down for six hours in January 2026, thousands of applications simply stopped working. No fallback. No alerting. Just silence.

The cost problem is equally invisible. Teams routinely overpay by 30-50% because they're using expensive frontier models for tasks that smaller, cheaper models handle perfectly well. There's no easy way to see where the money goes, let alone optimise it.

Requesty was built to fix both problems at once.

## What It Actually Does

At its core, Requesty is a drop-in OpenAI-compatible proxy. You swap your base URL and API key, and suddenly you have access to 400+ models from every major provider through a single endpoint. But the value isn't just in the routing — it's in what happens between your request and the model.

### Smart Model Routing

Requesty analyses each incoming prompt — its type, complexity, and context — and routes it to the cheapest model that meets your quality bar. A simple classification task doesn't need Claude Opus. A creative writing prompt doesn't need GPT-5's extended thinking. The gateway handles this automatically.

In practice, this means teams that enable smart routing typically see a 30-50% reduction in monthly API spend within the first week.

### Semantic Prompt Caching

This is where Requesty gets interesting. Rather than just caching identical requests, it performs semantic matching — recognising that a slightly reworded prompt is asking the same thing and returning the cached response. Their dashboard reports a 37.2% cache hit rate across all traffic, which translates to real money. One customer reportedly saved $400,000 annually just from caching alone.

### Automatic Failover

When a provider goes down (and they do), Requesty automatically reroutes to the next best model in under 20 milliseconds. No code changes, no manual intervention. Their infrastructure handles 75 billion tokens per day with 99.99% uptime SLA — better than any single provider offers on their own.

## Why the EU Angle Matters

Most AI gateway competitors — OpenRouter, Portkey, LiteLLM — are US-based and treat GDPR as an afterthought. Requesty flipped this: it's EU-first, with data residency options that keep European data in European data centres.

This isn't just compliance theatre. For companies in finance, healthcare, or government — sectors where GDPR fines can reach 4% of global revenue — having a gateway that handles PII detection, data loss prevention, and audit logging out of the box removes a significant legal headache.

SOC 2 Type II compliance is reportedly in progress.

## How It Stacks Up

**vs OpenRouter:** OpenRouter pioneered the unified API concept, but Requesty adds enterprise features OpenRouter lacks — granular per-team spending limits, PII detection, and GDPR-compliant data residency. OpenRouter is great for individual developers; Requesty targets production teams.

**vs LiteLLM:** LiteLLM is open-source and excellent for self-hosters. But if you don't want to maintain your own infrastructure, Requesty offers the same functionality as a managed service with 24/7 support and SLAs.

**vs Portkey:** Portkey has solid observability, but Requesty claims 50ms average added latency versus Portkey's 200ms+, plus automatic prompt caching that Portkey doesn't offer.

**vs Vercel AI Gateway:** Vercel's offering is tightly coupled to the Vercel ecosystem with no platform markup. Requesty is provider-agnostic and adds value through optimisation rather than just routing.

## The Developer Experience

Integration is genuinely one line of code — swap your OpenAI base URL to `https://requesty.ai/v1` and you're live:

```python
from openai import OpenAI
client = OpenAI(
    base_url="https://requesty.ai/v1",
    api_key="your-requesty-key"
)
```

The dashboard is where the real power lives. Real-time cost breakdowns by model, department, and team member. Heatmaps showing usage patterns. Cache performance metrics. Budget alerts with hard limits that actually cut you off. For the first time, you can see exactly where your AI spend goes.

## Pricing

Requesty charges a small markup on top of provider rates — typically 10-20% — to cover infrastructure and features. There are no monthly fees or minimums. For most teams, the cost savings from smart routing and caching far outweigh the markup. Volume discounts are available for accounts exceeding 10 million tokens per month.

## The Bottom Line

Requesty isn't for everyone. If you're a solo developer making a few hundred API calls a day, OpenRouter's free tier is probably fine. But if you're running AI in production — with multiple teams, multiple providers, and a CFO who wants to know why the AI bill doubled last month — Requesty is one of the few tools that actually addresses the operational reality of building with LLMs at scale.

The $3M seed round and growing customer base of 50,000+ developers suggest the market agrees.
