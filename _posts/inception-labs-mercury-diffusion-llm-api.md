---
title: "Inception Labs Mercury API: The Diffusion-Based LLM That Generates Text Like Stable Diffusion Generates Images"
excerpt: "Inception Labs took the diffusion model architecture that powers image generators and applied it to text. The result, Mercury 2, is one of the fastest reasoning LLMs on the market, available through an OpenAI-compatible API with aggressive pricing."
coverImage: "/assets/blog/inception-labs-cover.png"
date: 2026-03-22T08:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/inception-labs-cover.png"
---

## TL;DR

Inception Labs built Mercury 2, a reasoning LLM that uses diffusion-based text generation instead of traditional autoregressive token prediction. Instead of generating text left-to-right, Mercury starts with noisy output and iteratively refines it into coherent text. The API is OpenAI-compatible (drop-in replacement for existing clients), priced at $0.25 per million input tokens and $0.75 per million output tokens, with cached inputs at $0.025. Every new account gets 10 million free tokens. Mercury is available on the Inception Platform, AWS Bedrock, and Azure Foundry. The API supports tool calling, structured outputs, streaming, and a unique "diffusing" mode that lets you watch the denoising process in real time. The lineup also includes Mercury Edit, a specialized code-editing model with fill-in-the-middle, apply-edit, and next-edit endpoints.

## The Problem

The entire LLM industry runs on autoregressive generation. Every model — GPT-4, Claude, Gemini, Llama — produces text one token at a time, left to right, with each token conditioned on all previous tokens. This approach works, but it has fundamental limitations:

- **No global coherence planning.** The model can't go back and revise earlier text. If it paints itself into a corner mid-paragraph, it's stuck.
- **Sequential bottleneck.** Each token depends on the previous one, creating inherent latency that can't be fully parallelized.
- **Wasteful compute.** Early tokens in a generation are generated once and never revisited, even if better alternatives exist given the full context.

Image generation solved this years ago. Diffusion models (Stable Diffusion, DALL-E, Midjourney) start with random noise and iteratively denoise the entire image at once, refining it globally until it matches the prompt. The result is images with better composition, coherence, and quality than prior approaches. Nobody generates images pixel-by-pixel anymore.

Inception Labs asked: why are we still generating text pixel-by-pixel?

## What Inception Labs Actually Does

Inception Labs is a research company that adapted diffusion model techniques from image generation to text. Their flagship product, Mercury 2, is a reasoning LLM that uses iterative denoising to produce text. Instead of committing to one token at a time, Mercury starts with a noisy draft of the full output and progressively refines every part of it simultaneously.

This isn't a theoretical exercise. Mercury 2 is production-ready, available through a managed API, and benchmarks at 836 tokens per second on Artificial Analysis — making it the fastest output-speed model tracked on the platform as of early 2026.

### How Diffusion Text Generation Works

Traditional LLMs generate text like writing with a pen that only moves forward. Mercury generates text like sculpting — you start with a rough block and carve away the noise until the final shape emerges.

The process works like this:

1. The model produces a full-length output draft filled with noise tokens.
2. Multiple refinement iterations progressively replace noisy tokens with coherent text.
3. By the final iteration, the entire output has been refined globally — early tokens benefit from information in later tokens, and vice versa.

This gives Mercury a key architectural advantage: global coherence. The model can plan the structure of its response from the start and refine it holistically, rather than being locked into early decisions.

### The Model Lineup

Inception Labs offers two production models:

**Mercury 2** — The flagship reasoning model. Handles chat, tool calling, structured outputs, and general-purpose text generation. 128K context window. Available at `/v1/chat/completions`.

**Mercury Edit** — A code-specialized model designed for IDE integrations and code editing workflows. Three endpoints:

- `/v1/fim/completions` — Fill-in-the-middle autocomplete (32K context)
- `/v1/apply/completions` — Apply-edit: takes original code plus an update snippet and produces the merged result (32K context)
- `/v1/edit/completions` — Next-edit prediction: suggests the next edit the developer is likely to make (32K context)

Both models share the same pricing.

### Pricing

| | Mercury 2 | Mercury Edit |
|---|---|---|
| Input | $0.25 / 1M tokens | $0.25 / 1M tokens |
| Cached Input | $0.025 / 1M tokens | $0.025 / 1M tokens |
| Output | $0.75 / 1M tokens | $0.75 / 1M tokens |

At $0.25/$0.75, Mercury 2 is priced well below frontier proprietary models (GPT-4o is ~$2.50/$10, Claude Opus 4.6 is $15/$75). It sits closer to mid-tier open-source inference pricing from providers like Together AI or Fireworks, but with the unique diffusion architecture as its differentiator.

Every new account includes 10 million free tokens, which is enough to run meaningful tests before committing to paid usage.

### The Diffusing Effect: A Unique Feature

Mercury supports a streaming mode called "diffusing" that's unique to diffusion-based text generation. In standard streaming, tokens arrive one by one from left to right. In diffusing mode, the API returns the full output at each refinement iteration — you watch the text go from gibberish to coherent output through successive denoising passes.

This isn't just a visualization gimmick. It gives developers insight into how the model refines its output, which is useful for debugging, building trust in the model's reasoning process, and creating compelling user experiences where users can see AI "thinking" in real time.

```bash
curl https://api.inceptionlabs.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $INCEPTION_API_KEY" \
  -d '{
    "model": "mercury-2",
    "messages": [{"role": "user", "content": "Explain quantum computing"}],
    "max_tokens": 1000,
    "stream": true,
    "diffusing": true
  }'
```

## OpenAI Compatibility and Integrations

Mercury's API is a drop-in OpenAI replacement. The endpoint structure, request format, and response schema all follow the OpenAI spec. Any client that works with OpenAI's API works with Inception with a single line change — just swap the `base_url` and API key.

This means existing integrations work immediately:

- **OpenAI Python client:** Set `base_url="https://api.inceptionlabs.ai/v1"`
- **LangChain:** Use `ChatOpenAI` with the Inception base URL
- **LiteLLM:** Prefix the model as `openai/mercury-2`
- **Vercel AI SDK:** Use `createOpenAICompatible` with the Inception config
- **AISuite:** Register Inception as a provider

The docs also list first-party integration guides for IDE tools: Cursor, Cline, Roo Code, Kilo Code, OpenCode, and Zed — making Mercury Edit a viable backend for AI-powered code completion.

## Enterprise Deployment

Mercury is available through three channels:

1. **Inception Platform** (direct API) — Self-serve, instant access, 10M free tokens
2. **AWS Bedrock** — Available through Amazon's managed AI service for teams already on AWS
3. **Azure Foundry** — Available through Microsoft's AI platform for Azure-native deployments

Inception guarantees 99.5%+ uptime SLAs on paid plans, with custom SLAs available for enterprise customers. Private deployments and fine-tuning are also available for organizations with specific requirements.

## How It Compares

| Feature | Inception Mercury 2 | Groq | Together AI | Fireworks AI |
|---|---|---|---|---|
| Architecture | Diffusion-based text | Custom LPU chips | Standard GPU | Optimized GPU |
| Output speed (t/s) | ~836 | ~500+ | ~100-200 | ~100-200 |
| Input price / 1M | $0.25 | $0.05-0.50 | $0.20-1.20 | $0.10-0.90 |
| Output price / 1M | $0.75 | $0.08-0.80 | $0.20-1.20 | $0.10-0.90 |
| Cached input discount | 90% off | 75% off | 50% off | 50% off |
| Tool calling | Yes | Yes | Yes | Yes |
| Structured outputs | Yes | Yes | Yes | Yes |
| Code editing endpoints | Yes (FIM, Apply, Next Edit) | No | No | No |
| Diffusing mode | Yes | No | No | No |
| Cloud marketplace | AWS Bedrock, Azure | AWS, GCP | AWS | AWS |

Groq wins on custom silicon and raw throughput for supported models, but Mercury's diffusion architecture offers a fundamentally different approach to text generation that produces higher coherence. Together AI and Fireworks offer broader model catalogs but lack Mercury's unique diffusing capability and specialized code-editing endpoints.

The most interesting comparison point is price-to-speed. Mercury 2 at $0.75 per million output tokens generating at 836 t/s is a strong value proposition for latency-sensitive applications. Groq is cheaper per token, but Mercury's reasoning capabilities via diffusion may offer better quality for complex tasks.

## The Bigger Picture

Inception Labs is making a bet that diffusion-based text generation is the next architectural step for LLMs. The argument is compelling: diffusion won in images, won in audio generation, and the same global-refinement advantages should apply to text.

The practical implications matter:

- **Better planning.** A model that refines entire outputs at once can plan ahead in ways that autoregressive models cannot.
- **Potential for revision.** Future diffusion models could revisit and improve earlier parts of their output based on later context.
- **Hardware efficiency.** Diffusion models can potentially be parallelized more aggressively than autoregressive models, making better use of GPU compute.

Whether this architecture eventually overtakes autoregressive generation remains to be seen. But Mercury 2 is a credible product today, with real performance numbers, enterprise-grade infrastructure, and aggressive pricing that makes it worth evaluating against established alternatives.

## Getting Started

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["INCEPTION_API_KEY"],
    base_url="https://api.inceptionlabs.ai/v1"
)

response = client.chat.completions.create(
    model="mercury-2",
    messages=[{"role": "user", "content": "Write a haiku about diffusion models"}],
    max_tokens=100
)
print(response.choices[0].message.content)
```

Sign up at [platform.inceptionlabs.ai](https://platform.inceptionlabs.ai) for 10 million free tokens. Documentation lives at [docs.inceptionlabs.ai](https://docs.inceptionlabs.ai).

---

**Sources:**

- [Inception Labs Documentation](https://docs.inceptionlabs.ai)
- [Inception Labs Models & Pricing](https://docs.inceptionlabs.ai/get-started/models.md)
- [Inception Labs Streaming & Diffusion](https://docs.inceptionlabs.ai/capabilities/streaming.md)
- [Inception Labs Homepage](https://www.inceptionlabs.ai)
- [Artificial Analysis Model Comparison](https://artificialanalysis.ai/models)
