---
title: "Cloudflare Workers AI: Serverless GPU Inference on the Edge"
excerpt: "Cloudflare Workers AI lets you run 50+ open-source AI models on a global serverless GPU network — no infrastructure to manage, pay-per-neuron pricing, and response times measured in tens of milliseconds from the nearest edge node."
coverImage: "/assets/blog/cloudflare-workers-ai-cover.jpg"
date: 2026-03-16T16:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/cloudflare-workers-ai-cover.jpg"
---

## TL;DR

Cloudflare Workers AI runs open-source machine learning models on Cloudflare's global network of serverless GPUs. You get 50+ models (text generation, image generation, embeddings, speech-to-text, translation, and more), a free tier of 10,000 Neurons per day, and pricing at $0.011 per 1,000 Neurons beyond that. It integrates natively with the rest of Cloudflare's developer platform — Workers, Pages, Vectorize, R2, D1 — making it possible to build full-stack AI applications without leaving the ecosystem.

## The Problem

Deploying AI models has historically meant choosing between two uncomfortable options. Option one: use a dedicated API like OpenAI or Anthropic, accept vendor lock-in, and pay per-token with zero control over where inference runs. Option two: self-host open-source models on rented GPUs, handle scaling, cold starts, and multi-region deployment yourself, and pray your GPU bill doesn't give you a heart attack at month's end.

Neither option is great for developers who want fast, globally distributed inference without the operational burden. If your user is in Tokyo and your GPU cluster is in Virginia, you're adding 150+ milliseconds of network latency before the model even starts thinking.

Cloudflare's bet is that the edge is the natural place for AI inference. They already run one of the world's largest networks — 330+ cities, millions of servers. Adding GPUs to those locations and offering them serverless is the logical next step.

## What Workers AI Actually Does

Workers AI is a serverless AI inference platform. You send a request to a model endpoint, Cloudflare routes it to the nearest GPU-equipped data center, runs the inference, and returns the result. No containers to deploy, no auto-scaling groups to configure, no GPU capacity to pre-purchase.

### Three Ways to Call It

1. **Workers Bindings** — the native approach. Bind the AI service to your Cloudflare Worker and call it like any other binding:
```javascript
const response = await env.AI.run("@cf/meta/llama-3.2-3b-instruct", {
  messages: [{ role: "user", content: "Explain edge computing" }]
});
```

2. **REST API** — for use outside the Cloudflare ecosystem:
```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-3.2-3b-instruct \
  -H "Authorization: Bearer {token}" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'
```

3. **Dashboard** — a web UI for quick testing without writing code.

## The Model Catalog

This is where Workers AI has grown significantly. The catalog includes models across several categories:

### Text Generation (LLMs)
- **OpenAI** — gpt-oss-120b, gpt-oss-20b (open-weight models)
- **Meta** — Llama 4 Scout 17B, Llama 3.3 70B, Llama 3.1 8B (multiple quantizations)
- **Mistral** — Mistral 7B, Mistral Small 3.1 24B
- **DeepSeek** — DeepSeek-R1 Distill Qwen 32B
- **Qwen** — QwQ 32B, Qwen 2.5 Coder 32B, Qwen3 30B-A3B
- **Google** — Gemma 3 12B
- **NVIDIA** — Nemotron 3 120B (MoE)
- **IBM** — Granite 4.0 H-Micro
- **Zhipu AI** — GLM-4.7-Flash

### Image Generation
- **Black Forest Labs** — FLUX.2 Klein (4B and 9B), FLUX.2 Dev
- **Leonardo** — Lucid Origin, Phoenix 1.0
- **Stability AI** — Stable Diffusion variants

### Speech and Audio
- **Deepgram** — Aura-2 (TTS, English and Spanish), Flux (speech recognition)

### Embeddings
- **BAAI** — BGE Small, Base, Large, M3
- **Qwen** — Qwen3 Embedding 0.6B
- **Google** — EmbeddingGemma 300M
- **Preferred Networks** — PLaMo (Japanese)

### Translation
- **AI4Bharat** — IndicTrans2 (22 Indian languages)

That's a genuinely broad catalog covering text, images, speech, embeddings, and translation. Not every provider can claim that range.

## Pricing: The Neuron Model

Workers AI introduces its own unit called the "Neuron" — a measure of GPU compute that normalizes across different model architectures. All billing is in Neurons at $0.011 per 1,000.

### Free Tier
- **10,000 Neurons per day** — available on both Free and Paid Workers plans
- That's enough for meaningful prototyping and low-traffic applications

### Paid Usage (Workers Paid plan required)
Here are some representative per-million-token rates:

| Model | Input | Output |
|-------|-------|--------|
| Llama 3.2 1B | $0.027 | $0.201 |
| Llama 3.2 3B | $0.051 | $0.335 |
| Llama 3.1 8B (fp8 fast) | $0.045 | $0.384 |
| Llama 3.3 70B (fp8 fast) | $0.293 | $2.253 |
| DeepSeek-R1 Qwen 32B | $0.497 | $4.881 |
| Qwen3 30B-A3B | $0.051 | $0.335 |

The small models are aggressively priced. Llama 3.2 1B at $0.027/M input tokens undercuts most dedicated providers. The 70B and DeepSeek models are more expensive but still competitive given that you're paying for globally distributed inference.

For image generation, FLUX.2 Klein runs at about $0.00005 per 512x512 tile per step, which is notably cheap for what it produces.

## The Cloudflare Ecosystem Advantage

Workers AI doesn't exist in isolation. It's part of a developer platform that includes:

- **AI Gateway** — observability, caching, rate limiting, request retries, and model fallback for your AI calls. Think of it as a reverse proxy specifically tuned for LLM traffic.
- **Vectorize** — Cloudflare's vector database, purpose-built for semantic search and RAG workflows.
- **Workers** — the serverless compute runtime where your application logic lives.
- **R2** — object storage with zero egress fees, useful for storing generated images or training data.
- **D1** — serverless SQLite for structured data.
- **Durable Objects** — strongly consistent, globally distributed coordination.

This means you can build a complete RAG pipeline entirely within Cloudflare: store documents in R2, generate embeddings via Workers AI, index them in Vectorize, query with a Worker, generate a response with an LLM, and cache the result through AI Gateway. No cross-vendor networking, no egress fees, no separate accounts.

## Practical Considerations

### What's Good
- **Latency** — inference runs at the edge, close to your users. No round-trip to a single regional data center.
- **Zero ops** — genuinely serverless. No GPU fleets to manage, no capacity planning.
- **Free tier** — 10K Neurons/day is generous for prototyping and personal projects.
- **Model variety** — 50+ models covering major modalities, including some hard-to-find options like Japanese embeddings and Indian language translation.
- **Ecosystem** — if you're already on Cloudflare, the integration is seamless.

### What to Watch
- **Neuron pricing opacity** — converting Neurons to real costs requires checking the per-model conversion table. It's not as intuitive as per-token pricing.
- **Model freshness** — the catalog is curated, not exhaustive. If you need the absolute latest model on day one, you might wait for Cloudflare to add it.
- **Cold starts** — while Cloudflare minimizes these, serverless GPU inference can still have latency spikes on first invocation.
- **No fine-tuning** — Workers AI is inference-only. If you need custom model weights, you'll need to look elsewhere (or use the custom requirements form).

## Who Should Use This

Workers AI makes the most sense for:

- **Developers already on Cloudflare** who want AI capabilities without adding a new vendor
- **Edge-first applications** where latency matters (chatbots, real-time translation, content moderation)
- **Startups and side projects** that want to prototype with AI without committing to GPU infrastructure costs
- **Teams building RAG applications** who want inference, vector storage, and compute in one platform

If you're running high-throughput batch processing or need cutting-edge models with full fine-tuning control, dedicated inference providers like Groq, Together AI, or self-hosted setups might serve you better.

## The Bottom Line

Cloudflare Workers AI isn't trying to be the cheapest inference provider or to offer the most models. It's trying to make AI inference as easy to use as a CDN — globally distributed, serverless, and integrated into the platform where your application already runs. For the growing number of developers building on Cloudflare, it removes the need for a separate AI inference vendor entirely. That's a compelling proposition, and the model catalog has grown enough to cover most common use cases without feeling like a toy.

---

*Cloudflare Workers AI is available on Free and Paid Workers plans. [Documentation](https://developers.cloudflare.com/workers-ai/). [Model catalog](https://developers.cloudflare.com/workers-ai/models/).*
