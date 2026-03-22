---
title: "Hyperbolic: Serverless AI Inference API for Developers"
excerpt: "Hyperbolic is an open-access AI cloud offering serverless inference with 25+ open-source models, on-demand GPU rentals, and an OpenAI-compatible API at a fraction of legacy cloud costs."
coverImage: "/assets/blog/hyperbolic-ai-cover.jpg"
date: 2026-03-16T17:45:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/hyperbolic-ai-cover.jpg"
---

## TL;DR

Hyperbolic is an open-access AI cloud that gives developers instant access to 25+ open-source models through a serverless inference API, on-demand GPU rentals starting at $1.39/hr, and reserved clusters for dedicated workloads. The platform is fully OpenAI-compatible (swap the base URL and you're done), claims to be 3-10x cheaper than competitors, and has earned a public endorsement from Andrej Karpathy as his go-to platform for interacting with base models. Zero data retention, SOC2 compliance, and crypto payment support round out a developer-first approach.

## The Problem

Running AI inference at scale still sucks for most developers. You either pay premium rates to closed-API providers (OpenAI, Anthropic) where you have no control over the model weights, or you wrestle with GPU orchestration, container configs, and load balancers on a cloud provider. The middle ground, serverless inference for open-source models, is crowded but fragmented: different providers support different models, different pricing tiers, different API shapes, and wildly different latency characteristics.

Finding a platform that supports the latest open-source models quickly, charges transparently, and doesn't require a DevOps team to get started remains surprisingly difficult.

## What Hyperbolic Offers

Hyperbolic splits its platform into three services, each aimed at a different workload profile.

### Serverless Inference (The Main Attraction)

This is the product most developers will care about. Hit the API, get a response, pay per token. No GPU provisioning, no containers, no cold starts to worry about.

**Supported model categories:**

- **Text generation:** Llama 3.1 (8B, 70B, 405B), Qwen 2.5 (7B, 72B), DeepSeek V2.5, Hermes 3, Mistral 7B, and GPT-OSS-120B
- **Image generation:** Stable Diffusion XL, Stable Diffusion 3.5, FLUX.1 (schnell/dev), ControlNet, with custom LoRA support
- **Vision-language models:** Llama 3.2 Vision (11B, 90B), Qwen2-VL (2B, 7B)
- **Audio:** Melo TTS for text-to-speech, with Whisper speech-to-text coming soon

The API is OpenAI-compatible, which means migration is essentially two lines of code:

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_HYPERBOLIC_API_KEY",
    base_url="https://api.hyperbolic.xyz/v1"
)
```

Function calling works across 18+ models including DeepSeek, Llama, Qwen, Kimi, and GPT-OSS families. Structured output, JSON mode, and streaming are all supported natively.

### On-Demand GPUs

For training, fine-tuning, or custom deployments, Hyperbolic offers bare GPU access from $1.39/hr. H100 and H200 instances are available with InfiniBand interconnects, deployable in under 5 minutes. Full SSH access, no commitments.

### Reserved Clusters

For teams running steady-state workloads (24/7 inference, large-scale training), reserved clusters offer guaranteed availability with volume discounts up to 40%. Custom configurations, dedicated support channel, 3-12 month terms.

## Pricing

The serverless inference pricing is where Hyperbolic makes its case aggressively:

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|-----------------------|------------------------|
| Llama 3.1 70B | $0.10 | $0.10 |
| Llama 3.1 8B | $0.04 | $0.04 |
| Qwen 2.5 72B | $0.10 | $0.10 |

Image generation starts at $0.0025 per image. Audio at $0.001 per 1000 characters.

**Pricing tiers for API access:**

- **Basic:** Free to start, 60 RPM, community support
- **Pro:** $5 minimum deposit, 600 RPM, priority queue, email support
- **Enterprise:** Unlimited RPM, dedicated instances, SLA, 24/7 support

For context, the pricing calculator estimates roughly $0.15 for 1M tokens of Llama 3.1 70B, scaling to about $100 for 1B tokens.

## Developer Experience

The API surface is minimal and familiar. If you've used the OpenAI SDK or any OpenAI-compatible provider, there's nothing new to learn. The platform also publishes integration examples for LangChain, Vercel AI SDK, and Gradio.

A playground at app.hyperbolic.ai lets you test models before writing code. API keys are generated from the dashboard with no sales calls or wait times.

REST API access works from any language:

```bash
curl -X POST "https://api.hyperbolic.xyz/v1/chat/completions" \
  -H "Authorization: Bearer $HYPERBOLIC_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Meta-Llama-3.1-70B-Instruct",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## Security and Privacy

Hyperbolic advertises zero data retention, meaning your prompts and responses are not stored on their servers. TLS 1.3 encrypts all connections. SOC2 compliance is in place for enterprise customers. API key rotation is supported. The privacy posture is similar to what Groq and Fireworks AI offer, and notably stronger than what most closed providers guarantee.

## What Stands Out

**Model coverage speed.** Hyperbolic consistently deploys new open-source models quickly, including ones that are hard to find elsewhere. The Llama-3.1-405B-Base in BF16 (not quantized) is available here, which is rare.

**Karpathy's endorsement.** Andrej Karpathy, founding member of OpenAI, publicly called Hyperbolic his "favorite place to interact with the base models." For a platform competing in a crowded inference market, that kind of signal from someone who can access any infrastructure is notable.

**Crypto payments.** You can fund your account with USDC, USDT, or DAI in addition to credit cards. Not a feature most developers need, but it signals a certain anti-gatekeeping philosophy that aligns with the "open-access" branding.

## What to Watch

The platform is still relatively young compared to incumbents like Replicate, Together AI, or Fireworks AI. The model catalog, while growing fast, is narrower than some competitors (no fine-tuning API documented, limited audio models). Enterprise features like SLA guarantees and dedicated instances require a sales conversation.

The "3-10x cheaper" claim is worth testing with your own workload mix. Inference pricing varies dramatically by model size, context length, and batch size. Run your own benchmarks before committing.

## Bottom Line

Hyperbolic is a credible option for developers who want cheap, fast access to open-source models without infrastructure overhead. The OpenAI-compatible API means near-zero migration cost, the pricing is competitive, and the model selection covers the essentials. If you're building on open-source models and want a provider that moves fast on new releases, it's worth a look.

**Get started:** [app.hyperbolic.ai](https://app.hyperbolic.ai)
**Documentation:** [docs.hyperbolic.ai](https://docs.hyperbolic.ai)
**Pricing:** See the [inference overview](https://docs.hyperbolic.ai/inference/overview) for model-specific rates
