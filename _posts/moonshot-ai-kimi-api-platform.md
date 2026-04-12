---
title: "Moonshot AI Kimi API: China's 1-Trillion Parameter Model Goes Global"
excerpt: "Moonshot AI's Kimi API delivers a 1-trillion-parameter multimodal model with 256K context, open-weight licensing, and aggressive pricing that undercuts Western rivals."
coverImage: "/assets/blog/moonshot-ai-cover.jpg"
date: 2026-03-22T12:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/moonshot-ai-cover.jpg"
---

## TL;DR

Moonshot AI, backed by Alibaba and Sequoia China, offers API access to its Kimi model family through platform.moonshot.ai. The flagship K2.5 is a 1-trillion-parameter Mixture-of-Experts model with native multimodal understanding, 256K-token context, and reasoning modes. It's open-weight under a modified MIT license, and its pricing sits well below comparable Western models. Developer adoption is growing fast, with integrations already live on Cloudflare Workers AI, OpenRouter, and multiple Chinese platforms.

## The Problem

Most Western developers default to OpenAI, Anthropic, or Google when shopping for LLM APIs. That habit leaves a blind spot. Chinese AI labs have been shipping competitive models at lower prices, and Moonshot AI's Kimi family is one of the most aggressive contenders.

Kimi K2, released in July 2025, outperformed ChatGPT and Claude on coding benchmarks while costing significantly less. The January 2026 K2.5 update added native multimodal capabilities, bringing visual understanding into the same model rather than bolting it on as a separate endpoint.

For developers building cost-sensitive applications, agentic workflows, or products that need both long-context reasoning and vision, Kimi's API deserves a hard look.

## What Kimi API Offers

### Model Lineup

- **Kimi K2.5** (January 2026) — 1 trillion total parameters, 32 billion active via MoE. Native multimodal (text + vision). 256K context. Supports thinking/non-thinking modes, ToolCalls, JSON Mode, and built-in web search. The current flagship.

- **Kimi K2 Turbo** — Same parameters as K2.5 but optimized for speed. Up to 60 tokens/sec output, with peaks hitting 100 tokens/sec. Designed for real-time interactive applications.

- **Kimi K2 Thinking** — Dedicated reasoning model for deep analytical tasks. Chain-of-thought reasoning with agentic capabilities.

- **Kimi K2 Thinking Turbo** — High-speed variant of the thinking model, for when you need reasoning without the wait.

- **Moonshot-v1** — Legacy text generation models, still available for lighter workloads.

### Technical Highlights

**Open-weight licensing.** Kimi K2 was released under a modified MIT license. Kimi-VL uses standard MIT. This matters for enterprises that want to self-host or fine-tune without the legal ambiguity that plagues some "open" models.

**Context caching.** The API automatically caches context, reducing costs on repeated prompts. Cached tokens are billed at a discounted rate visible in the console.

**Agentic architecture.** Kimi's "OK Computer" feature, released in September 2025, can build multi-page websites from prompts, process up to 1 million rows of data, and output text, audio, images, and video. The API exposes ToolCalls and web search as first-class features, making it straightforward to build agentic workflows.

**Global availability.** While Moonshot AI is Beijing-based, the international API at platform.moonshot.ai operates independently from the Chinese domestic platform (moonshot.cn). English documentation, OpenAI-compatible endpoints, and integration with platforms like Cloudflare Workers AI and OpenRouter make it accessible to Western developers.

### Pricing

Pricing is per 1M tokens, inclusive of tax. While exact figures fluctuate, Kimi K2.5 consistently undercuts GPT-4o and Claude Opus by a significant margin. File upload and extraction APIs are currently free of charge. File storage is also free during the current pricing period.

The OpenAI-compatible endpoint format means you can swap in a Kimi API key with minimal code changes if you're already using the OpenAI SDK.

## Who It's For

- **Cost-conscious developers** building production LLM applications who need frontier-tier quality without frontier-tier pricing.
- **Agentic AI teams** that need ToolCalls, web search, and long-context reasoning in a single model.
- **Enterprises** evaluating open-weight models for self-hosting or fine-tuning.
- **Multimodal applications** requiring vision + text in one API call rather than two separate models.

## The Caveats

Moonshot AI is a Chinese company, and that raises questions some teams will want to consider: data residency, regulatory exposure under evolving Chinese AI governance rules, and the geopolitical optics of depending on Chinese infrastructure for Western products. The international API endpoint mitigates some of these concerns, but the parent company's jurisdiction remains China.

The model documentation, while improving, still lags behind OpenAI and Anthropic in English-language depth. Some advanced features are better documented in the Chinese-language platform.

Performance on non-English tasks outside of Chinese and English is less well-tested in independent benchmarks.

## Getting Started

The API lives at [platform.moonshot.ai](https://platform.moonshot.ai/). You can sign up, generate an API key from the console, and hit the OpenAI-compatible `/v1/chat/completions` endpoint. The [quick start guide](https://platform.moonshot.ai/docs/guide/kimi-k2-5-quickstart) walks through basic setup.

For teams already using Vercel AI SDK, LangChain, or LiteLLM, Kimi is available as a provider in most major orchestration frameworks. It's also hosted on Cloudflare Workers AI if you want edge inference without managing API keys.

---

*Pricing and model availability verified as of March 2026. Moonshot AI is a private company; funding figures are based on publicly reported rounds.*
