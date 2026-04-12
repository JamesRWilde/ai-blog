---
title: "Fireworks AI API: The Inference Platform That Runs 100+ Open Source Models at Production Speed"
excerpt: "Fireworks AI offers serverless and dedicated GPU inference for over 100 open source models with fine-tuning, OpenAI compatibility, and pricing that starts at $0.10 per million tokens."
coverImage: "/assets/blog/fireworks-ai-cover.jpg"
date: 2026-03-27T08:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/fireworks-ai-cover.jpg"
---

## TL;DR

Fireworks AI is a high-performance inference and fine-tuning platform for open source AI models. It offers serverless access to 100+ models (Llama, DeepSeek, Qwen, Mixtral, FLUX, and more) with OpenAI-compatible APIs, meaning you can swap your base URL and start running. Pricing is pay-per-token with no cold starts on serverless, and dedicated GPU deployments start at $2.90 per hour. The platform supports fine-tuning up to 1T+ parameters, batch inference, structured outputs, function calling, and multimodal models including vision and speech-to-text.

---

## The Problem

Running open source AI models in production is harder than it looks. You can download weights from Hugging Face, but then you need GPUs, serving infrastructure, scaling logic, and someone on call when something breaks. Self-hosting gives you control, but the operational overhead is massive. And if you want to try different models to find the best fit for your use case, you are rebuilding pipelines every time.

Most teams end up choosing between two bad options: pay premium prices for closed APIs like OpenAI and Anthropic, or burn engineering time building and maintaining inference infrastructure that is not even their core product.

Fireworks AI sits in the middle. It gives you direct access to open source models through a managed API, with the speed of custom inference engines and the simplicity of a serverless endpoint.

## What Fireworks AI Actually Is

Fireworks AI is a cloud platform built specifically for generative AI inference and fine-tuning. It is not a model provider in the sense of training its own foundation models. Instead, it takes popular open source models, optimizes them with its proprietary FireAttention engine, and serves them through APIs that feel almost identical to OpenAI's.

The company was founded in 2022 by AI researchers from Google Brain, Meta, and Berkeley. As of late 2025, Fireworks raised a $250 million Series C and counts enterprises like Notion, DoorDash, and Vercel among its customers. It also recently announced a multi-year partnership bringing Fireworks to Microsoft Azure Foundry, and expanded its AWS alliance with GenAI Competency status.

### Core Offerings

**Serverless Inference** — The default entry point. You pick a model from their library, send API requests, and pay per token. No servers to manage, no cold starts. Models load on demand and scale to zero when unused.

**Dedicated Deployments** — For production workloads that need consistent latency and higher throughput. You reserve GPU instances (A100, H100, H200, B200) and deploy a model with autoscaling. Cold starts are minimal, and you get dedicated capacity.

**Fine-Tuning** — Supervised fine-tuning (SFT), Direct Preference Optimization (DPO), and Reinforcement Fine-Tuning (RFT) for models ranging from small 3B parameter models up to 1T+ parameter behemoths. Fine-tuned models deploy immediately to the same inference endpoints.

**Batch Inference** — Asynchronous inference jobs at scale, priced 50% cheaper than real-time serverless. Good for processing large datasets, running evaluations, or bulk content generation.

## The Model Library

The model catalog is broad and constantly updated. As of early 2026, the highlights include:

**Text and Code Models:**
- DeepSeek V3.1 and V3.2 (with thinking modes)
- Qwen3 Coder 480B A35B Instruct (262K context window)
- Kimi K2 and K2.5 (262K context, vision support)
- Llama 3.x series (8B, 70B, various instruct variants)
- OpenAI gpt-oss-20b and gpt-oss-120b (open source models from OpenAI)
- Mixtral, DBRX, Phi, Gemma, and dozens more

**Vision Models:**
- InternVL3 (8B, 38B, 78B)
- GLM-4.5V
- Devstral Small 2 (with vision)
- FLUX.1 Kontext Pro and Max for image generation

**Audio:**
- Whisper v3 large and v3 large turbo for speech-to-text
- Fireworks Streaming ASR (custom-built transcription)

**Embeddings and Reranking:**
- Qwen3 8B embeddings
- Various embedding models for RAG pipelines

Models range from small enough to run on a laptop (Gemma 2B at $0.10 per million tokens) to frontier-scale (GLM-5 at $1.00/$3.20 per million input/output tokens). Cached input tokens get a 50% discount across the board.

## API Compatibility

This is where Fireworks makes integration painless. The API is compatible with OpenAI's client libraries. You change the base URL to `https://api.fireworks.ai/inference/v1` and pass your Fireworks API key. Everything else stays the same.

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.fireworks.ai/inference/v1",
    api_key="YOUR_FIREWORKS_API_KEY"
)

response = client.chat.completions.create(
    model="accounts/fireworks/models/deepseek-v3p1",
    messages=[{"role": "user", "content": "Explain quantum entanglement"}]
)
```

This works for chat completions, embeddings, audio transcription, and the newer Responses API with MCP (Model Context Protocol) support. Teams already using OpenAI's SDK can switch models without rewriting code.

## Pricing Breakdown

Fireworks uses tiered per-token pricing based on model size:

| Model Size | Price per 1M Tokens |
|---|---|
| Under 4B parameters | $0.10 |
| 4B - 16B parameters | $0.20 |
| Over 16B parameters | $0.90 |
| MoE 0B - 56B (e.g. Mixtral 8x7B) | $0.50 |
| MoE 56.1B - 176B (e.g. DBRX, Mixtral 8x22B) | $1.20 |

Named models have their own pricing. DeepSeek V3.1 costs $0.56 per million input tokens and $1.68 per million output. OpenAI's gpt-oss-20b is surprisingly cheap at $0.07/$0.30. Kimi K2.5 runs $0.60 input and $3.00 output.

For dedicated GPU deployments, hourly rates are:

| GPU | Price per Hour |
|---|---|
| A100 80GB | $2.90 |
| H100 80GB | $6.00 |
| H200 141GB | $6.00 |
| B200 180GB | $9.00 |

Fine-tuning is priced per million training tokens, starting at $0.50 for SFT on models up to 16B, scaling up to $10.00 for models over 300B. DPO costs double the SFT rate. Reinforcement Fine-Tuning is billed per GPU hour at on-demand deployment rates.

## Getting Started

Setting up takes minutes:

1. Create an account at `console.fireworks.ai`
2. Generate an API key from the dashboard
3. Install the Fireworks SDK or use OpenAI's client library with the Fireworks base URL
4. Pick a model from the library and start sending requests

The docs recommend starting with their [model selection guide](https://docs.fireworks.ai/guides/recommended-models) to pick the right model for your use case, then prototyping on serverless before moving to dedicated deployments for production.

```bash
curl -X POST https://api.fireworks.ai/inference/v1/chat/completions \
  -H "Authorization: Bearer $FIREWORKS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "accounts/fireworks/models/llama-v3p3-70b-instruct",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## Fine-Tuning and Custom Models

Fireworks supports three fine-tuning approaches:

**Supervised Fine-Tuning (SFT)** — Train a model on labeled examples. Fireworks V2 supports LoRA and full-parameter tuning. You can train with reasoning traces by including `reasoning_content` in your dataset.

**Direct Preference Optimization (DPO)** — Train models using paired preference data without needing explicit reward models. Good for aligning model outputs with human preferences.

**Reinforcement Fine-Tuning (RFT)** — Train models using verifiable rewards. This is the most experimental approach but has shown impressive results. Vercel used RFT to make their code-fixing model 40x faster. Genspark used it to beat a frontier closed model while cutting costs by 50%.

Fine-tuned models deploy to the same inference endpoints as base models, with no additional per-token charges.

## Enterprise Features

Fireworks is SOC 2 and HIPAA certified with triple ISO certification. It supports private deployments, audit logging, and role-based access control. The platform integrates with AWS SageMaker and Microsoft Azure Foundry for organizations already embedded in those ecosystems.

The Hathora acquisition (March 2026) adds global compute orchestration, meaning workloads can be routed to data centers closer to end users for lower latency.

## When Fireworks AI Makes Sense

**Use it when:**
- You want open source model quality without managing infrastructure
- You need to benchmark multiple models quickly (serverless makes this trivial)
- Cost matters — DeepSeek V3.1 at $0.56/M input tokens is a fraction of GPT-4o pricing
- You want fine-tuning on the same platform as inference
- OpenAI compatibility is important for migration

**Think twice when:**
- You need guaranteed SLAs above what serverless provides (use dedicated deployments instead)
- Your models are proprietary and not in the library
- You need real-time streaming at extremely low latencies below what the model supports natively

## The Bottom Line

Fireworks AI fills a clear gap in the market. It is faster than self-hosting, cheaper than closed APIs, and more flexible than single-model providers. The OpenAI-compatible API means zero friction for teams switching from GPT-4, and the model library covers most mainstream use cases from code generation to image creation to speech transcription.

The platform is not trying to be everything. There is no built-in evaluation suite, no visual workflow builder, no prompt management layer. It does inference and fine-tuning very well, and leaves the rest to the ecosystem. For teams that want a focused, fast, and affordable API for open source models, that is exactly the right approach.

---

## Sources

- [Fireworks AI Documentation](https://docs.fireworks.ai)
- [Fireworks AI Pricing](https://fireworks.ai/pricing)
- [Fireworks AI Model Library](https://fireworks.ai/models)
- [Fireworks AI Blog](https://fireworks.ai/blog)
- [Fireworks Series C Announcement](https://fireworks.ai/blog/series-c)
- [Fireworks Azure Foundry Partnership](https://fireworks.ai/blog/fireworks-on-microsoft-foundry)
- [Hathora Acquisition](https://fireworks.ai/blog/fireworks-acquires-hathora)
