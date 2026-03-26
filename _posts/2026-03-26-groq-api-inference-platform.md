---
title: "Groq API: The Blazing-Fast Inference Platform Powered by Custom Silicon"
excerpt: "Groq's LPU-based API delivers sub-second LLM inference with OpenAI-compatible endpoints, serving 3 million developers at costs as low as $0.05 per million input tokens."
coverImage: "/assets/blog/groq-cover.png"
date: 2026-03-26T20:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/groq-cover.png"
---

## TL;DR

Groq is an AI inference platform built around its custom Language Processing Unit (LPU) chip, delivering LLM responses at speeds that make GPU-based competitors look sluggish. With OpenAI-compatible API endpoints, a model catalog spanning open-source and proprietary models, and pricing that starts at $0.05 per million input tokens, Groq has positioned itself as the speed-first choice for developers shipping AI products at scale. The platform serves over 3 million developers and recently raised $750 million in funding.

## The Problem

Most AI inference runs on GPUs. That is not a criticism of GPUs in general, but it is a specific problem for LLM workloads. GPUs were designed for parallel computation like graphics rendering and scientific simulation. Language models do something different, and the mismatch shows up as latency. When a developer builds a real-time chat application or a voice agent that needs to respond in under a second, GPU-based inference often hits a wall. Queuing, batching, cold starts, and memory contention all conspire to make response times unpredictable.

The pricing problem compounds this. Many inference providers use elastic pricing models that spike under load. A chatbot that costs pennies during testing can generate surprise bills when users show up. Developers building production applications need two things that GPU-centric platforms struggle to deliver simultaneously: consistent speed and predictable costs.

## Groq's Approach: Custom Silicon Built for Inference

Groq was founded in 2016 with a single focus: inference. Unlike companies that retrofit general-purpose hardware for AI workloads, Groq designed its LPU (Language Processing Unit) chip from the ground up for running language models. The result is a deterministic architecture that eliminates the scheduling and memory management overhead inherent in GPU-based systems.

The practical difference shows up in the numbers. Groq's pricing page lists current throughput figures that would be aspirational for most competitors:

- **Llama 3.1 8B Instant**: 840 tokens per second at $0.05/M input tokens
- **Qwen3 32B**: 662 tokens per second at $0.29/M input tokens
- **Llama 4 Scout (17Bx16E)**: 594 tokens per second at $0.11/M input tokens
- **GPT OSS 120B**: 500 tokens per second at $0.15/M input tokens
- **Llama 3.3 70B Versatile**: 394 tokens per second at $0.59/M input tokens

For context, 840 tokens per second means a 500-word response generates in roughly half a second. That is fast enough for real-time voice agents and interactive applications where latency is a dealbreaker.

## GroqCloud: The Developer Platform

The API layer is called GroqCloud, and it is built to be familiar. The endpoints are OpenAI-compatible, which means switching typically requires changing two lines of Python:

```python
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ.get("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)

response = client.responses.create(
    input="Explain the importance of fast language models",
    model="openai/gpt-oss-20b",
)
print(response.output_text)
```

That is it. Existing OpenAI SDK integrations work with minimal modification, which dramatically lowers the switching cost for teams evaluating Groq as an alternative provider.

### Model Catalog

Groq hosts a mix of open-source and partner models, including:

- **OpenAI GPT OSS** (20B and 120B variants)
- **Meta Llama** (3.1 8B, 3.3 70B, 4 Scout)
- **Qwen3 32B**
- **Kimi K2** (1T parameter model from Moonshot AI)
- **Whisper** (V3 Large and V3 Turbo) for speech-to-text
- **Orpheus** (Canopy Labs) for text-to-speech

The inclusion of speech models means developers can build full-stack voice applications without integrating separate ASR and TTS providers.

### Built-In Tools

Groq has added compound AI system capabilities with built-in tools:

- **Basic Search**: $5 per 1,000 requests (web_search parameter)
- **Advanced Search**: $8 per 1,000 requests
- **Visit Website**: $1 per 1,000 requests
- **Code Execution**: $0.18 per hour (code_interpreter parameter)
- **Browser Automation**: $0.08 per hour

These tools let models search the web and execute code server-side, which extends what a single API call can accomplish without the developer building custom toolchains.

### Prompt Caching

Groq offers automatic prompt caching with a 50% discount on cached input tokens. For example, GPT OSS 120B drops from $0.15/M to $0.075/M on cache hits. This is relevant for applications with repetitive system prompts or knowledge base contexts.

### Batch API

For asynchronous workloads, Groq's Batch API processes requests with a 50% cost reduction and a processing window of 24 hours to 7 days. Rate limits on standard API calls are not affected by batch submissions, which makes it viable for background data processing alongside real-time applications.

## Pricing Breakdown

Groq's pricing model is linear and predictable, a deliberate contrast to competitors with elastic or surge pricing:

| Model | Input ($/M tokens) | Output ($/M tokens) | Speed (TPS) |
|-------|-------------------|---------------------|-------------|
| Llama 3.1 8B Instant | $0.05 | $0.08 | 840 |
| GPT OSS 20B | $0.075 | $0.30 | 1,000 |
| Llama 4 Scout | $0.11 | $0.34 | 594 |
| GPT OSS 120B | $0.15 | $0.60 | 500 |
| Qwen3 32B | $0.29 | $0.59 | 662 |
| Llama 3.3 70B | $0.59 | $0.79 | 394 |
| Kimi K2 1T | $1.00 | $3.00 | 200 |

The free tier offers a generous starting point for development, with paid tiers scaling linearly. Groq states there are no hidden costs, no idle infrastructure charges, and no surge pricing.

## Who Is Using It

Groq has landed some notable customers. The McLaren Formula 1 Team uses Groq globally for real-time decision-making and analysis. Fintool reported a 7.41x increase in chat speed and an 89% cost reduction after switching from their previous infrastructure. Opennote, an education platform, uses Groq to keep costs low for their premium student plans.

The platform has raised $750 million (announced September 2025) and reports 3 million developers and teams on the platform.

## Limitations and Considerations

Groq's focus on speed comes with tradeoffs worth noting. The model catalog, while solid, does not include every model available on broader platforms. If your application requires a specific proprietary model not hosted by Groq, you may need a secondary provider. The LPU architecture excels at inference but does not handle training, so teams fine-tuning models still need GPU infrastructure elsewhere.

The built-in search and browser tools are priced per request, which can add up at scale. A high-traffic application making thousands of web searches daily should model those costs carefully.

## Getting Started

New developers can grab a free API key at the Groq developer console. The OpenAI-compatible endpoints mean most teams can port existing integrations in under an hour. Documentation is available at the developer portal, and there is an active community forum.

For enterprise deployments with custom requirements, Groq offers an enterprise access program covering dedicated infrastructure and custom model hosting.

---

**Key Links:**
- [GroqCloud Platform](https://groq.com/)
- [Developer Console](https://console.groq.com/)
- [API Documentation](https://console.groq.com/docs/overview)
- [Pricing](https://groq.com/pricing/)
- [LPU Architecture](https://groq.com/lpu-architecture)
