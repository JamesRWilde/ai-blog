---
title: "Together AI API: The Full-Stack AI Native Cloud for Inference, Fine-Tuning, and GPU Clusters"
excerpt: "Together AI offers a research-driven cloud platform with serverless inference across 200+ open-source models, fine-tuning, dedicated GPU clusters, and generative media endpoints, all via a unified API."
coverImage: "/assets/blog/together-ai-cover.png"
date: 2026-03-29T03:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/together-ai-cover.png"
---

## TL;DR

Together AI is a full-stack AI cloud platform built around open-source models. Its serverless API runs over 200 models, from Llama 4 Maverick to DeepSeek-R1 to FLUX image generators, with per-token pricing starting at $0.10 per million tokens. Beyond inference, Together offers fine-tuning, dedicated GPU clusters with H100/H200/B200 hardware, batch processing, secure code sandboxes, and generative media endpoints for video and audio. The platform is grounded in proprietary research, including FlashAttention-4 and speculative decoding techniques, and claims 2x faster inference and 60 percent lower costs compared to standard GPU deployments.

## The Problem

Running AI models in production means navigating a fragmented landscape. Inference lives on one platform. Fine-tuning happens on another. GPU clusters are provisioned through a third vendor. Generative media models require yet another set of endpoints. Each integration means different APIs, different authentication patterns, different billing structures, and different failure modes.

For teams building AI-native applications, this fragmentation creates overhead that compounds. A startup building an AI agent might start with serverless inference from one provider, then discover they need fine-tuning from another, then realize their generative media workload requires a third. By the time the architecture is stitched together, the engineering cost rivals the model cost.

The deeper issue is that most cloud GPU providers treat inference as a generic workload. They allocate general-purpose hardware, apply generic scheduling, and pass generic costs to the customer. Models are not optimized for the hardware they run on, and the hardware is not optimized for the models it runs. The result is paying premium prices for mediocre throughput.

## What Together AI Does Differently

Together AI was founded in 2022 with a research-first approach to AI infrastructure. Rather than building a GPU cloud and bolting AI support onto it, Together started with the models and the math, then built infrastructure around what the research demanded.

The company's core thesis is that inference, fine-tuning, and pre-training each have fundamentally different computational signatures, and the infrastructure should reflect that. This shows up in three key areas.

### Research-Driven Performance

Together's engineering team publishes peer-reviewed research that directly improves platform performance. Notable contributions include:

- **FlashAttention-4**, co-developed with Princeton and NVIDIA, which co-designs algorithm and kernel pipelines for asymmetric hardware scaling.
- **Cache-Aware Prefill-Decode Disaggregation (CPD)**, delivering up to 40 percent faster long-context LLM serving by separating the prefill and decode phases across optimized hardware.
- **Speculative Decoding (ATLAS)**, a runtime-learning accelerator system that uses smaller draft models to predict outputs, achieving up to 2x speedups on production workloads.
- **Consistency Diffusion Language Models**, enabling up to 14x faster inference without quality degradation.

These are not theoretical papers sitting in arXiv queues. They are implemented in the production platform and available to every API user.

### Unified Product Surface

Together bundles inference, fine-tuning, compute, storage, and media generation into a single platform with a consistent API pattern. A developer can start with serverless inference, graduate to batch processing for large workloads, fine-tune a model on their data, and deploy the result on a dedicated GPU cluster, all without leaving the Together ecosystem.

### Open-Source Model Focus

Together is built around open-source models, not proprietary ones. The platform hosts hundreds of community and research models, from Meta's Llama series to Alibaba's Qwen to Moonshot's Kimi, and provides first-class support for custom or private models through dedicated deployments and fine-tuning.

## Platform Architecture

Together AI's product surface breaks down into three main pillars: Inference, Compute, and Model Shaping.

### Inference

The inference tier is where most developers start. It comes in four flavors:

**Serverless Inference** is the on-demand endpoint. You send a request, Together routes it to available capacity, and you pay per token. No infrastructure management, no minimum commitments. This handles the majority of use cases from prototyping to moderate production volumes.

**Batch Inference** processes large workloads asynchronously. It supports up to 30 billion tokens per model and works with any serverless model or private deployment. Batch pricing is discounted compared to real-time inference, making it suitable for bulk summarization, classification, or embedding generation.

**Dedicated Model Inference** deploys a model on single-tenant hardware with guaranteed performance. This is for production workloads where latency consistency and throughput guarantees matter more than flexibility.

**Dedicated Container Inference** targets generative media workloads. Video, audio, and image models run on GPU infrastructure optimized by Together's research team, with acceleration that generic inference endpoints don't provide.

### Compute

For teams that need raw GPU access:

**Accelerated Compute** offers instant GPU clusters from self-serve single-GPU instances to multi-thousand-GPU deployments, all optimized by Together Kernel Collection. Available hardware includes NVIDIA H100, H200, and B200 GPUs.

**Sandbox** provides fast, secure code execution environments at scale. Useful for AI agents that need to run code, build development environments, or execute user-submitted scripts.

**Managed Storage** delivers high-performance object storage and parallel filesystems optimized for AI workloads, with zero egress fees.

### Model Shaping

**Fine-Tuning** lets teams customize open-source models on their own data. Together supports the latest techniques including direct preference optimization (DPO) and reinforcement learning pipelines via TorchForge. The value proposition is improving model accuracy, reducing hallucinations, and controlling behavior without managing training infrastructure.

## API Pricing

Together's pricing is transparent and per-token, with significant variation across model tiers.

### Language Models (per million tokens)

| Model | Input | Output |
|---|---|---|
| Llama 3 8B Instruct Lite | $0.10 | $0.10 |
| Gemma 3n E4B Instruct | $0.02 | $0.04 |
| Llama 4 Maverick | $0.27 | $0.85 |
| Llama 3.3 70B | $0.88 | $0.88 |
| DeepSeek-V3.1 | $0.60 | $1.70 |
| GPT-OSS 120B | $0.15 | $0.60 |
| DeepSeek-R1-0528 | $3.00 | $7.00 |
| GLM-5 | $1.00 | $3.20 |
| Kimi K2.5 | $0.50 | $2.80 |

The floor is aggressive. Gemma 3n E4B at $0.02 per million input tokens is among the cheapest inference available anywhere. Meanwhile, premium reasoning models like DeepSeek-R1 command higher prices reflecting their compute intensity.

### Image Generation (per megapixel or per image)

| Model | Price |
|---|---|
| FLUX.1 [schnell] | $0.0027/mp |
| FLUX.2 [dev] | $0.0154/image |
| FLUX.2 [pro] | $0.03/image |
| FLUX.2 [max] | $0.070/mp |
| Google Imagen 4.0 Fast | $0.02/mp |
| Ideogram 3.0 | $0.06/mp |
| Stable Diffusion 3 | $0.0019/mp |

### Video Generation (per video)

| Model | Price |
|---|---|
| Google Veo 3.0 Fast | $0.80 |
| Google Veo 3.0 + Audio | $3.20 |
| Sora 2 | $0.80 |
| Kling 2.1 Master | $0.92 |
| ByteDance Seedance 1.0 Lite | $0.14 |

### Dedicated GPU Pricing (per hour)

| Hardware | On-Demand | Reserved |
|---|---|---|
| 1x H100 80GB | $3.99 | Contact |
| 1x H200 141GB | $5.49 | Contact |
| 1x B200 180GB | $9.95 | Contact |

Together also offers batch API discounts on language models, typically 20-50 percent off real-time pricing for non-latency-sensitive workloads.

## Integration

Together AI uses an OpenAI-compatible API format. Switching from OpenAI or any compatible provider requires changing the base URL and API key:

```python
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ.get("TOGETHER_API_KEY"),
    base_url="https://api.together.xyz/v1",
)

response = client.chat.completions.create(
    model="meta-llama/Llama-4-Maverick-17B-128E-Instruct-Turbo",
    messages=[{"role": "user", "content": "Explain mixture-of-experts architectures"}],
)
print(response.choices[0].message.content)
```

The OpenAI SDK handles the rest. No custom request formatting, no proprietary response parsing.

For image generation, the API follows a straightforward pattern:

```python
import together
import os

client = together.Together(api_key=os.environ.get("TOGETHER_API_KEY"))

response = client.images.generate(
    prompt="A photorealistic sunset over a mountain range",
    model="black-forest-labs/FLUX.2-pro",
    width=1024,
    height=768,
)
```

Embeddings, reranking, audio transcription, and moderation endpoints each follow their respective standard patterns.

## The Research Edge

What distinguishes Together from other API platforms is the depth of its research program. The company regularly publishes at top ML conferences and immediately ships improvements to production.

Recent research outputs include:

- **CoderForge-Preview**, a state-of-the-art open dataset for training coding agents.
- **DeepSWE**, a fully open-source coding agent trained by scaling reinforcement learning.
- **DSGym**, a holistic framework for evaluating and training data science agents.
- **Mixture-of-Agents Alignment**, using collective intelligence of open-source LLMs to improve post-training.
- **Open Deep Research**, an autonomous research agent framework.

This research-to-production pipeline means Together users benefit from cutting-edge optimizations months before they appear in competing platforms.

## Who Uses Together AI

Together serves a range of customers from individual developers to enterprise teams:

- **Hedra**, a generative media platform, reported 60 percent cost reduction after migrating to Together.
- **NVIDIA** partners with Together on kernel-level optimizations, including the HGX B200 deployment with Together Kernel Collection.
- The platform is widely used by startups building AI agents, RAG applications, and generative media products who need access to a wide model catalog without managing infrastructure.

Together has raised over $300 million in funding, with investors including Kleiner Perkins, Nvidia, and Salesforce Ventures, valuing the company at over $3 billion.

## Limitations and Considerations

Together is heavily weighted toward open-source models. If your workflow depends on GPT-4o, Claude, or other proprietary APIs, Together is not the replacement. It is an alternative ecosystem, not a mirror of OpenAI's catalog.

Fine-tuning, while supported, requires understanding the underlying techniques. The platform provides the tools, but not the expertise. Teams without ML engineering experience may need external support.

Dedicated GPU pricing, while competitive, still represents a meaningful commitment. A single H100 at $3.99 per hour runs roughly $2,900 per month. At scale, this adds up quickly.

The platform's breadth is both a strength and a complexity surface. Between serverless inference, batch, dedicated models, dedicated containers, fine-tuning, compute, sandboxes, and storage, the decision matrix for choosing the right product tier can be overwhelming for new users.

## The Bottom Line

Together AI occupies a distinctive position in the AI infrastructure landscape. It is neither a bare-metal GPU cloud nor a wrapper around proprietary models. It is a research-driven platform built specifically for open-source AI, with pricing, performance, and product design optimized around that focus.

For developers who want access to the broadest catalog of open-source models, competitive per-token pricing, and infrastructure that improves through active research, Together AI is one of the strongest options available. The OpenAI-compatible API makes adoption low-friction, and the full-stack offering means teams can scale from prototype to production without fragmenting across multiple vendors.

---

### Sources

- [Together.ai](https://www.together.ai/) — official platform site and product documentation
- [Together AI Pricing](https://www.together.ai/pricing) — per-token pricing across all model categories
- [Together AI Documentation](https://docs.together.ai) — API reference, model catalog, and integration guides
- [Together AI Research](https://www.together.ai/research) — peer-reviewed publications including FlashAttention-4 and ATLAS
- [NVIDIA + Together Kernel Collection](https://www.together.ai/blog/nvidia-hgx-b200-with-together-kernel-collection) — hardware optimization partnership
- [Hedra Case Study](https://www.together.ai/customers/hedra) — 60 percent cost reduction report
