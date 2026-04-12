---
title: "Helicone: The Open-Source LLM Observability API That Watched 14 Trillion Tokens Flow"
excerpt: "Helicone processed 14.2 trillion tokens across 16,000 organizations before joining Mintlify. Here's what their AI gateway and observability platform actually does."
coverImage: "/assets/blog/helicone-cover.png"
date: 2026-03-16T20:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/helicone-cover.png"
---

## TL;DR

Helicone is an open-source LLM observability platform that sits as a proxy in front of your AI API calls, giving you logging, cost tracking, prompt management, and intelligent routing across 100-plus models with a single line of code. Founded during YC W23, the company processed 14.2 trillion tokens across 16,000 organizations before being acquired by Mintlify in March 2026.

## The Problem

Every developer building with LLMs hits the same wall eventually. Your chatbot gives wrong answers, your costs spike overnight, your latency creeps upward, and you have no idea which model call failed or why. Traditional APM tools were built for REST endpoints and database queries, not stochastic token-by-token completions that can vary wildly in cost, speed, and quality from one request to the next.

The result is that most teams fly blind. They ship AI features, hope for the best, and scramble when users complain about hallucinations or slow responses. Debugging means grep through logs and squint at raw JSON payloads. There's no visibility into what prompts are actually being sent, what context the model received, or how costs break down across users and features.

## What Helicone Actually Does

Helicone's core mechanism is dead simple: it acts as a proxy. Your API calls route through Helicone's gateway instead of hitting OpenAI, Anthropic, or Google directly. One base URL swap and you get full observability without changing your application logic.

**AI Gateway** handles the routing layer. You get access to 100-plus models through a single API key, with automatic fallbacks when a provider goes down. If OpenAI is having a bad Tuesday, your requests fail over to Anthropic or Google without manual intervention. The gateway supports the OpenAI-compatible format, so switching providers doesn't require rewriting your integration.

**Observability and tracing** give you the visibility you actually need. Every request gets logged with its full prompt, response, latency breakdown, token counts, and cost. For agents and multi-step workflows, Helicone offers session tracing that chains related calls together, so you can see the entire decision tree, not just individual API hits.

**Cost and latency tracking** is where Helicone earns its keep for most teams. Costs are calculated per request at the provider and model level, so you know exactly what a specific user interaction cost to generate. You can break down spending by user, feature, or custom properties you define. When your bill doubles overnight, you can pinpoint exactly which code path is responsible.

**Prompt management** lets you version and iterate on prompts directly through the platform. Push updated prompts through the gateway without redeploying your app. Roll back to a previous version if a new prompt degrades quality. It treats prompts as deployable artifacts, not hardcoded strings scattered across your codebase.

**Playground and evaluation** provide a testing environment where you can run prompts against different models side by side, compare outputs, and evaluate quality before pushing changes to production.

## The Numbers

Helicone's scale, as reported in their acquisition announcement:

- **14.2 trillion tokens** processed through the platform
- **16,000 organizations** onboarded
- **33 million end users** tracked across customer applications
- **1 Product Hunt launch** that hit number one
- **Most-used LLM observability platform** among YC companies

## Integration

Integration is genuinely minimal. For OpenAI, it's a base URL change plus one header:

```
base_url = "https://oai.helicone.ai/v1"
headers = { "Helicone-Auth": "Bearer YOUR_API_KEY" }
```

Helicone supports OpenAI, Anthropic, Google Gemini, LangChain, Vercel AI SDK, and others. It also exports to PostHog for teams that want LLM metrics in their existing analytics dashboards.

## Open Source and Pricing

The core platform is open source under Apache 2.0 on GitHub. You can self-host it if you'd rather not route production traffic through a third party. The hosted version offers a free tier and a 7-day trial for paid plans. Zero markup on API calls means you pay the provider's rate, not an inflated proxy rate.

## The Mintlify Acquisition

In March 2026, Helicone announced it had been acquired by Mintlify, the documentation platform used by Anthropic, Microsoft, and Coinbase. The Helicone team is moving to San Francisco to join Mintlify. Services remain live in maintenance mode with security updates and bug fixes continuing.

The strategic logic is interesting. Mintlify sees documentation as the knowledge layer that AI agents pull from to make decisions. Helicone's founders argued that as models get better, the quality of context matters more, not less. A smarter model reading stale documentation produces more confident wrong answers. Mintlify owns the documentation layer; Helicone owns the observability layer that monitors what happens when AI systems consume that knowledge. Together, they have visibility across the full pipeline from source knowledge to model output.

Helicone was already powering the millions of AI interactions inside Mintlify's platform before the acquisition conversation started. The infrastructure was already integrated; the acquisition formalized the relationship.

## Who Should Care

If you're shipping AI features in production and your debugging strategy is "check the logs and pray," Helicone is worth a look. The open source option means you can evaluate it without vendor risk. The proxy-based architecture means you don't have to rewrite anything to try it out.

The cost tracking alone pays for itself if you've ever stared at a surprising LLM bill and had no idea what caused it. For teams running agents with multi-step reasoning chains, the session tracing is the kind of visibility that turns a black box into something you can actually debug.

Whether the Mintlify acquisition accelerates or stalls the product roadmap remains to be seen. For now, the platform is stable, the code is open, and the data speaks for itself.
