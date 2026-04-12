---
title: "Scaleway Generative APIs: Europe's Answer to the AI Infrastructure Monopoly"
excerpt: "Scaleway's Generative APIs offer a sovereign, GDPR-compliant alternative to OpenAI and Azure, serving Llama, Mistral, Qwen, and DeepSeek models from French data centers with a 1M free token tier."
coverImage: "/assets/blog/scaleway-generative-apis-cover.jpg"
date: 2026-03-29T00:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/scaleway-generative-apis-cover.jpg"
---

## TL;DR

Scaleway Generative APIs provide serverless, OpenAI-compatible endpoints for popular open-weight models hosted entirely in European data centers. With a 1M free token tier, no credit card required, GDPR compliance, and drop-in SDK compatibility, it is a serious option for teams that need data sovereignty without sacrificing developer experience.

## The Problem

European companies building with AI APIs face a blunt choice: hand your data to US hyperscalers (OpenAI via Azure, AWS Bedrock, Google Vertex) or self-host open-weight models on infrastructure you manage. Neither option is attractive. The first raises data sovereignty and regulatory concerns under GDPR and the EU AI Act. The second demands DevOps expertise, GPU procurement, and ongoing maintenance that most teams cannot afford.

The inference API market has consolidated around a handful of US-based providers. Together AI, Fireworks AI, Groq, and Cerebras all offer excellent developer experiences, but their infrastructure sits in North America. For latency-sensitive European workloads and regulated industries (healthcare, finance, government), that geographic detail matters.

Scaleway, the Paris-headquartered cloud provider owned by Iliad Group, entered this gap with Generative APIs, a serverless model-as-a-service offering that keeps everything within EU borders.

---

## What Scaleway Generative APIs Actually Offers

At its core, Scaleway Generative APIs is straightforward: you send an API request, Scaleway runs inference on pre-configured models in its Paris data centers, and returns the response. No GPU provisioning, no container orchestration, no model serving boilerplate.

### Supported Models

The catalog is focused on open-weight models with commercial-friendly licenses:

**Chat / Text Generation:**
- Qwen 3.5 397B (250K context) - recommended for best accuracy and coding
- Mistral Small 3.2 24B (128K context) - recommended starting point
- Llama 3.3 70B (100K context)
- Llama 3.1 8B (128K context)
- Devstral 2 123B (200K context) - coding-focused
- Qwen 3 235B MoE (250K context)
- Qwen 3 Coder 30B (128K context)
- DeepSeek R1 Distill Llama 70B (16K context)
- GPT-OSS 120B (128K context) - OpenAI's open-weight model
- Mistral Nemo (128K context)
- Gemma 3 27B (40K context, preview)

**Vision:**
- Pixtral 12B (128K context) - accepts images up to ~8096x4048 resolution

**Audio:**
- Voxtral Small 24B - speech-to-speech and transcription (30-min max audio)
- Whisper Large V3 - transcription

**Embeddings:**
- Qwen3 Embedding 8B (32K context, 4096 dimensions)
- BGE Multilingual Gemma2 (8K context, 3584 dimensions)

This is not a grab bag of everything. Scaleway is curating models with open licenses that can be served at scale without vendor negotiations. The lineup skews heavily toward Mistral and Qwen, which makes sense given Mistral's French origins and Qwen's strong open licensing.

### OpenAI-Compatible API

The API endpoint follows the OpenAI chat completions specification. Existing code using the `openai` Python or Node SDKs works by changing the base URL:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.scaleway.ai/{project_id}/v1",
    api_key="your-scaleway-api-key"
)

response = client.chat.completions.create(
    model="mistral-small-3.2-24b-instruct-2506",
    messages=[{"role": "user", "content": "Explain quantum computing"}]
)
```

Scaleway also supports LangChain integration natively, plus JSON mode for structured outputs and function calling.

---

## Pricing

The pricing model is token-based with a generous free tier:

- **Free tier:** 1,000,000 tokens (combined input + output across all models)
- **No credit card required** to start
- **Paid pricing examples (per million tokens):**
  - Mistral Small 3.2: €0.15 input / €0.35 output
  - Llama 3.3 70B: €0.90 input / €0.90 output
  - Batches API: 50% discount on listed prices

The free tier covers real prototyping work. At 1M tokens, you can run roughly 750,000 words of input through Mistral Small before hitting the limit. For comparison, most "free tier" offerings from US providers cap out much lower or require a credit card on file.

Post-free-tier pricing is competitive with Together AI and Fireworks AI on equivalent models, though the EUR denomination means the effective USD cost fluctuates with exchange rates.

---

## The Data Sovereignty Angle

This is the part that matters for regulated industries, and it is not marketing fluff.

All inference runs in Scaleway's Paris data center operated by OPCORE. Data in transit stays within European networks. Scaleway states it does not collect, read, reuse, or analyze API content. The infrastructure is GDPR-compliant, and Scaleway holds SOC 2 Type II certification.

For EU companies subject to GDPR's data transfer restrictions, this eliminates the need for Standard Contractual Clauses (SCCs) or Transfer Impact Assessments (TIAs) when using AI APIs. That is a meaningful compliance shortcut.

The EU AI Act, which entered force in 2025, adds another regulatory layer. Companies deploying high-risk AI systems must demonstrate data governance, including where training and inference data resides. Running inference on European infrastructure simplifies that audit trail.

---

## Performance and Latency

Scaleway claims sub-200ms latency for European users. That refers to time-to-first-token on their serverless endpoints, which will vary by model size and load.

The practical reality: serverless inference on a 70B+ parameter model will not match Groq's LPU hardware for raw speed. Groq delivers 300+ tokens per second. Scaleway is running these models on standard GPU infrastructure in a serverless wrapper. Expect competitive but not record-breaking throughput.

For latency-critical applications (real-time chatbots, voice agents), Groq or Cerebras will likely remain faster. For batch processing, RAG pipelines, content generation, and most enterprise use cases, the difference is negligible, and the sovereignty benefit outweighs the speed delta.

---

## Limitations

Scaleway's offering has clear constraints compared to the broader AI API market:

1. **Model selection is narrow.** No GPT-4o, no Claude, no Gemini. If you need frontier proprietary models, you will not find them here. This is an open-weight-only platform.

2. **No fine-tuning on the serverless tier.** For custom model tuning, Scaleway offers Managed Inference (separate product, hourly billing), but Generative APIs are pre-configured endpoints only.

3. **Smaller ecosystem.** The tooling, community tutorials, and third-party integrations around Scaleway Generative APIs are thin compared to OpenAI or even Together AI. You will find fewer Stack Overflow answers and fewer pre-built templates.

4. **Regional latency.** Users outside Europe will see higher latency compared to US-based providers with edge points of presence. This is not a global inference network, it is a European one.

5. **Limited multimodal support.** Vision and audio capabilities exist but are restricted to specific models. There is no image generation, no video understanding, no speech synthesis on this API.

---

## Who Should Use This

**Strong fit:**
- EU-based companies with GDPR/data sovereignty requirements
- Regulated industries (healthcare, finance, government) needing auditable inference infrastructure
- Teams already in the Scaleway ecosystem looking to add AI capabilities
- Startups that want to avoid US hyperscaler lock-in from day one
- Developers who want a generous free tier without handing over a credit card

**Weak fit:**
- Teams requiring frontier proprietary models (GPT-5, Claude Opus)
- Applications needing the absolute lowest latency (Groq, Cerebras)
- Global teams distributed across multiple continents
- Projects requiring fine-tuning on the serverless tier

---

## Getting Started

1. Create a Scaleway account at console.scaleway.com (no credit card needed)
2. Navigate to Generative APIs in the console
3. Get your API credentials
4. Point your OpenAI SDK at `api.scaleway.ai/{project_id}/v1`
5. Start building

There is also a web-based Playground in the console for testing models without writing code.

---

## The Bigger Picture

Scaleway Generative APIs is part of a broader European push for digital sovereignty in AI. The EU has invested heavily in open-weight model development (Mistral, BLOOM) and sovereign cloud infrastructure. Scaleway is positioning itself as the API layer that connects the two.

Whether this gains traction depends on whether enough developers prioritize sovereignty over the convenience and model breadth of US providers. The technology is solid, the pricing is competitive, and the regulatory tailwinds are real. But the AI API market moves fast, and Scaleway needs to keep expanding its model catalog and performance to remain relevant against well-funded competitors.

For now, it is one of the most practical options available for teams that need AI inference inside European borders. The free tier makes it low-risk to evaluate, and the OpenAI-compatible API means the migration cost is measured in changing a base URL, not rewriting your application.

---

**Key Links:**
- [Scaleway Generative APIs](https://www.scaleway.com/en/generative-apis/)
- [Documentation](https://www.scaleway.com/en/docs/generative-apis/)
- [Supported Models](https://www.scaleway.com/en/docs/generative-apis/reference-content/supported-models/)
- [Pricing](https://www.scaleway.com/en/pricing/model-as-a-service/)
