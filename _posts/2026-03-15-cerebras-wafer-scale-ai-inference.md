---
title: "Cerebras: Wafer-Scale AI Inference at 3,000 Tokens Per Second"
excerpt: "Cerebras builds custom wafer-scale chips that deliver AI inference up to 20x faster than GPU competitors — with a free tier and OpenAI-compatible API."
coverImage: "/assets/blog/cerebras-cover.jpg"
date: 2026-03-15T20:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.jpeg"
ogImage:
  url: "/assets/blog/cerebras-cover.jpg"
---

## TL;DR

Cerebras is an AI inference platform built on custom wafer-scale silicon (the WSE-3) rather than off-the-shelf GPUs. It delivers up to 3,000+ tokens per second — roughly 15–20× faster than GPU-based providers — with an OpenAI-compatible API, a free tier, and support for leading open-weight models including OpenAI's GPT-OSS-120B, Llama, Qwen, and GLM-4.7.

## The Problem

GPU inference has become the default for serving large language models, but it comes with structural bottlenecks. Memory bandwidth limits token generation speed. Multi-GPU sharding introduces latency and engineering complexity. And costs scale poorly — even at a few dollars per million tokens, high-throughput applications (agentic workflows, real-time code generation, interactive chat) burn through budgets fast.

Most inference providers differentiate on price or model selection, but the underlying hardware constraint remains: you're renting slices of commodity GPU clusters.

## How Cerebras Is Different

Cerebras took the opposite approach — they built the hardware. The Wafer-Scale Engine 3 (WSE-3) is the largest chip ever manufactured. Instead of networking hundreds of small GPU dies together, the entire wafer is one chip, with 4 trillion transistors, 900,000 AI cores, and 44 GB of on-chip SRAM.

The practical result: no GPU-style memory bandwidth bottleneck. Model weights live on-chip, and inference runs at speeds that sound made up until you benchmark them.

| Model | Size | Speed (tokens/sec) |
|---|---|---|
| Llama 3.1 8B | 8B | ~2,200 |
| OpenAI GPT-OSS-120B | 120B | ~3,000 |
| Qwen 3 235B Instruct | 235B (22B active) | ~1,400 |
| GLM-4.7 | 355B (32B active) | ~1,000 |

For context, a typical GPU deployment of GPT-OSS-120B might yield 150–300 tokens/sec. Cerebras is getting 3,000.

## The API

The integration path is deliberately frictionless. Cerebras provides an OpenAI-compatible API endpoint at `https://api.cerebras.ai/v1`, meaning you can swap it into existing code by changing the base URL and API key:

```python
from cerebras.cloud.sdk import Cerebras

client = Cerebras(api_key="your-key")
response = client.chat.completions.create(
    model="gpt-oss-120b",
    messages=[{"role": "user", "content": "Explain wafer-scale computing"}]
)
```

SDKs are available for Python and Node.js, and the standard REST/cURL pattern works for anything else.

## Pricing

Cerebras offers a three-tier structure:

- **Free** — Access to all models with community support via Discord. Rate limits are lower, but enough for prototyping and experimentation.
- **Developer** — Starting at $10 for self-serve payment. 10× higher rate limits than free, with higher processing priority.
- **Enterprise** — Custom rate limits, dedicated queue priority, support for custom model weights, fine-tuning/training services, and SLAs.

They also offer **Cerebras Code** subscriptions ($50/mo for Pro, $200/mo for Max) aimed at developers using AI for coding workflows, with daily token allowances of 24M and 120M tokens respectively.

## Models and Precision

Cerebras serves all models unpruned — no parameter reduction tricks. They use selective weight-only quantization (FP16/FP8 for storage, with sensitive layers kept at full precision), dequantizing on the fly so activations and KV caches remain in higher precision.

Current production models:
- **Llama 3.1 8B** (FP16) — ~2,200 tok/s
- **OpenAI GPT-OSS-120B** (FP16/FP8 weights) — ~3,000 tok/s

Preview models:
- **Qwen 3 235B Instruct** — ~1,400 tok/s
- **GLM-4.7** (Z.ai) — ~1,000 tok/s

## Infrastructure

Cerebras is scaling aggressively: 6 new data centers across the US and Europe, powered by thousands of CS-3 systems. Their stated target is 40 million+ tokens per second of total serving capacity by end of 2025.

## The Honest Assessment

**What's genuinely impressive:**
- The speed numbers are real and independently verifiable. This isn't marketing fluff — the wafer-scale architecture delivers.
- The OpenAI-compatible API means near-zero migration cost.
- Free tier with no credit card is a credible developer acquisition strategy.
- Serving full-parameter models without pruning or aggressive quantization preserves output quality.

**What to watch:**
- Model selection is still narrow compared to Together AI or Fireworks. If you need niche fine-tuned models or image generation, this isn't your platform yet.
- The "preview" model designation on Qwen 235B and GLM-4.7 means they could disappear with short notice.
- Enterprise pricing isn't transparent — standard enterprise sales process.
- Cerebras is a hardware company selling inference. If their chip manufacturing hits supply constraints, the inference business suffers.

**Who should care:**
If you're building latency-sensitive AI applications — real-time coding assistants, interactive agents, high-throughput summarization pipelines — Cerebras is worth benchmarking against your current provider. The speed differential is large enough that it could change architectural decisions, not just save money.

If you're doing batch processing where latency doesn't matter, the speed advantage is less relevant and model breadth from other providers may be more useful.

---

*Sources: [Cerebras Inference](https://www.cerebras.ai/inference), [Cerebras Pricing](https://www.cerebras.ai/pricing), [Cerebras API Docs](https://inference-docs.cerebras.ai/), [Cerebras Models](https://inference-docs.cerebras.ai/models/overview)*
