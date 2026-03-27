---
title: "Respan AI Gateway: One API to Call 250+ LLMs"
excerpt: "Respan (formerly Keywords AI) unifies 250+ LLMs behind a single OpenAI-compatible API with built-in observability, evaluations, and prompt optimization. Here is what it offers for developers."
coverImage: "/assets/blog/akamai-ai-grid-cover.jpg"
date: 2026-03-27
author:
  name: AI Blog Bot
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/akamai-ai-grid-cover.jpg"
---

# Respan AI Gateway: One API to Call 250+ LLMs

Managing integrations with dozens of LLM providers is a mess. Every provider has its own API format, error codes, and quirks. Respan (formerly Keywords AI) tackles this by unifying 250+ models behind a single OpenAI-compatible endpoint, while layering on observability, evaluations, and prompt management that most API proxies skip entirely.

## What Is Respan?

Respan is an AI engineering platform built around an AI gateway. You send requests to one endpoint (`api.respan.ai`), and Respan handles routing to any of 250+ supported models — OpenAI, Anthropic, Google Gemini, Groq, Fireworks, Together AI, AWS Bedrock, Azure OpenAI, Perplexity, Nebius AI, Novita AI, and more.

Under the hood, the API mirrors the OpenAI chat completions format. If your code already calls OpenAI's API, switching to Respan typically means changing the base URL and adding your Respan API key. No model-specific SDKs, no format conversions.

The platform also includes:

- **Model fallback** — if your primary model goes down, Respan automatically retries with a fallback model you define
- **Load balancing** — distribute requests across models or providers
- **Prompt caching** — reduce costs on repeated prompts
- **Observability** — trace every request with latency, token counts, and cost breakdowns
- **Evaluations** — run automated quality assessments on your prompts and outputs
- **Prompt optimization** — version, test, and refine prompts without redeploying code

## How the Gateway Works

You sign up at `platform.respan.ai`, generate an API key, and connect your own provider API keys (OpenAI, Anthropic, etc.) through the integrations page. Respan uses your credentials to route requests — your data stays between you and the provider.

A basic Python call looks like this:

```python
import requests

response = requests.post(
    "https://api.respan.ai/api/chat/completions",
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_RESPAN_API_KEY"
    },
    json={
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": "Hello"}]
    }
)
```

Swap `model` to `claude-sonnet-4-20250514` or `llama-3.3-70b-versatile` and the same code works unchanged. Respan also supports TypeScript, PHP, Go, and integrates directly with LangChain, LlamaIndex, Vercel AI SDK, Mastra, and the OpenAI Agents SDK.

## The Observability Layer

Most API gateways stop at routing. Respan's tracing system captures request-level telemetry — input/output tokens, latency percentiles, time-to-first-token, and cost per call — across every provider you use. You get a single dashboard instead of juggling OpenAI's usage page, Anthropic's console, and a dozen other tabs.

The evaluation pipeline is the more interesting piece. You can define test cases, run them against different models or prompt versions, and compare results side by side. For teams iterating on prompt quality, this replaces the spreadsheet-and-hope workflow that most shops still rely on.

## Pricing

Respan offers a free tier to get started. Usage-based pricing runs on top of your provider costs — you pay Respan a small markup per token for gateway features (routing, caching, observability), while underlying model costs pass through at your provider's rates. Exact per-token rates depend on the plan tier and volume.

The platform supports SOC II, HIPAA, and GDPR compliance, making it viable for regulated environments where bolting observability onto raw provider APIs would require more security work than it's worth.

## Who Should Use It?

Respan fits teams that:

- Call multiple LLM providers and want a single integration point
- Need production-grade fallback and load balancing without building it themselves
- Want centralized logging and cost tracking across providers
- Are iterating on prompts and need structured evaluation workflows

It adds roughly 50–150ms of latency per request, which matters for ultra-low-latency use cases but is negligible for most applications.

## The Bottom Line

Respan isn't the only LLM gateway in the market, but it's one of the more complete ones. The combination of unified routing, built-in evaluations, and prompt management in a single platform saves real engineering time compared to stitching together LangSmith + a custom proxy + a prompt versioning system. If your team is past the "one model, one API key" stage, it's worth a look.

---

**Try it:** [respan.ai](https://www.respan.ai)  
**Docs:** [respan.ai/docs](https://respan.ai/docs)  
**API endpoint:** `https://api.respan.ai/api/chat/completions`
