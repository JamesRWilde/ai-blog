---
title: "Modular MAX: The AI Inference Stack That Wants to Replace Your Entire Serving Pipeline"
excerpt: "With one container under 700MB, an OpenAI-compatible API, and claims of 2x performance over vLLM across NVIDIA, AMD, and Apple Silicon, Modular is positioning MAX as the last inference engine you will need."
coverImage: "/assets/blog/modular-cover.jpg"
date: 2026-03-27T06:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/modular-cover.jpg"
---

## TL;DR

Modular is a unified AI inference platform that combines an open-source engine (MAX), a custom GPU programming language (Mojo), and a managed cloud service into a single stack. It serves 1000+ open-source models through an OpenAI-compatible API, runs on NVIDIA, AMD, Intel, ARM, and Apple Silicon, and claims 2x throughput over vLLM with 50% lower costs. The self-hosted community edition is free; cloud endpoints start with pay-per-token pricing.

## The Problem

Running AI models in production is a Frankenstein's monster. Most teams assemble inference stacks from parts that were never designed to work together: one tool for serving (vLLM, TGI), another for optimization (TensorRT, custom kernels), something else for scaling (Kubernetes, autoscalers), and a separate monitoring layer. Every integration point is a potential failure mode. Hardware migration means rewriting half the stack.

The result is that deploying a model typically takes weeks of infrastructure work before a single inference request is served. And if you want to switch from NVIDIA to AMD, or from cloud to on-premise, you start over.

Modular's pitch is straightforward: replace the entire stack with one unified platform that handles kernels, compilation, serving, and scaling. One container, one API, any hardware.

---

## What Modular Actually Is

Modular is three products wrapped into one platform:

**MAX Engine.** The open-source inference engine at the core. It compiles models into optimized programs using Modular's compiler, then serves them through a high-performance runtime. MAX supports text generation, image understanding, and video processing. It is the same engine that powers Modular's cloud endpoints.

**Mojo.** A systems programming language designed for GPU kernel programming. Mojo combines Python-like syntax with C-level performance and native CUDA/ROCm support. Developers use it to write custom GPU kernels for novel architectures or to optimize existing model operations. Mojo code interoperates directly with C++, CUDA, and ROCm.

**Modular Cloud.** The managed inference service running MAX on Modular's own NVIDIA and AMD GPU infrastructure. It offers shared endpoints (pay per token) and dedicated endpoints (pay per GPU minute), with forward-deployed engineers who tune deployments for specific workloads.

The self-hosted edition is entirely free and open source. The container runs under 700MB and deploys via Docker, pip, uv, pixi, or conda.

## Under the Hood

### The Inference Engine

MAX's core advantage is its compiler-based approach. Instead of running models through generic Python runtimes, MAX compiles model graphs into optimized programs tailored to the target hardware. This means the same model code produces different (and faster) binaries depending on whether it runs on an NVIDIA H100, an AMD MI300, or an Apple M-series chip.

The engine is OpenAI API compatible by design. Switching from OpenAI's API to MAX requires changing a single line:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="EMPTY"  # No API key needed for self-hosted
)

completion = client.chat.completions.create(
    model="google/gemma-3-27b-it",
    messages=[
        {"role": "user", "content": "Explain quantum computing simply."}
    ],
)

print(completion.choices[0].message.content)
```

Starting a model endpoint is equally straightforward:

```bash
max serve --model google/gemma-3-27b-it
```

The first run downloads, compiles, and starts the server. Subsequent runs skip the compilation step. Once the server is ready, you get a standard OpenAI-compatible endpoint at `localhost:8000`.

### Hardware Portability

This is where Modular differentiates itself from most inference platforms. Rather than optimizing for a single GPU vendor, the entire stack is designed for heterogeneous compute:

- **NVIDIA:** Full CUDA support from consumer RTX cards to datacenter B200s
- **AMD:** ROCm support including MI300 and MI355X accelerators
- **Intel, ARM, CPU inference:** Supported for smaller models or edge deployment
- **Apple Silicon:** MPS acceleration for development and small-scale inference

The same container, same codebase, same API runs across all of them. No recompilation, no vendor-specific toolchains, no code changes.

### Benchmarking

MAX ships with a built-in benchmarking tool that lets you measure performance against standard datasets:

```bash
max benchmark \
  --model google/gemma-3-27b-it \
  --backend modular \
  --endpoint /v1/chat/completions \
  --dataset-name sonnet \
  --num-prompts 500 \
  --sonnet-input-len 550 \
  --output-lengths 256
```

Modular claims 2x throughput compared to vLLM on the same hardware. These numbers come from Modular's own testing, so treat them with standard skepticism, but the compiler-based approach does have legitimate architectural advantages over interpreted runtime execution.

## Supported Models

MAX supports 1000+ models out of the box. Key categories include:

- **Google Gemma family:** Gemma 3 in 4B, 12B, 27B variants, including multimodal (image + text) inference
- **DeepSeek:** DeepSeek V3 and variants
- **Llama:** All Llama 3 and 3.1 variants
- **Kimi:** Moonshot's models
- **Custom models:** Bring your own fine-tuned models via Hugging Face or direct upload

For models not in the pre-compiled catalog, Modular's compiler can build optimizations for custom architectures. This is where Mojo comes in: if your model uses operations not covered by standard kernels, you write custom ones in Mojo rather than dropping down to raw CUDA.

## Getting Started

The self-hosted quickstart takes about five minutes:

1. Install the modular package (via pixi, uv, pip, or conda)
2. Start a model endpoint with `max serve --model <model-name>`
3. Send requests using the OpenAI Python SDK pointing at localhost:8000
4. Benchmark with `max benchmark`

For production deployments, the path depends on your needs:

- **Self-hosted:** Run the MAX container on your own GPUs. Free, full control, community support only
- **Modular's Cloud:** Shared or dedicated endpoints on Modular's infrastructure. Per-token or per-minute billing. Forward-deployed engineers included
- **Your Cloud (BYOC):** Modular deploys in your VPC. You bring cloud credits, compliance policies, and data stays in your environment. Enterprise pricing

## Pricing

| Tier | Cost | Support | Best For |
|------|------|---------|----------|
| Self-Hosted | Free | Discord + GitHub | Full control, any GPU |
| Our Cloud - Shared | Per token | Dedicated engineers | Quick start, variable load |
| Our Cloud - Dedicated | Per GPU minute | Dedicated engineers | Consistent performance |
| Your Cloud (BYOC) | Per minute deployed | Dedicated engineers + custom SLAs | Enterprise compliance |

The self-hosted community edition includes everything: MAX engine, Mojo compiler, the full model catalog. There is no feature gating between free and paid tiers, only the infrastructure management difference.

SOC 2 Type I certification is complete, with Type II in progress.

## Hands-On Impressions

The developer experience is noticeably polished compared to rolling your own vLLM deployment. The single-container approach means you go from zero to serving in minutes rather than hours. The OpenAI API compatibility means existing client code works without modification.

The compiler step on first model load can be slow (minutes for a 27B model), but subsequent loads are fast. This is a one-time cost per model version.

The built-in benchmarking tool is genuinely useful. Most inference platforms make you cobble together your own performance testing. Having it built into the CLI with standard datasets means you can actually compare platforms apples-to-apples.

The Mojo angle is interesting but not for everyone. If you never need custom GPU kernels, you can ignore it entirely. If you do, it eliminates the need to write raw CUDA or learn vendor-specific kernel languages.

## Pros and Cons

**Pros:**

- One container, one API, minimal configuration overhead
- Genuinely hardware-agnostic (NVIDIA, AMD, Apple Silicon, ARM)
- OpenAI API compatible, drop-in replacement for existing code
- Free self-hosted edition with full feature parity
- Built-in benchmarking and observability
- Mojo enables custom GPU kernels without vendor lock-in
- Fast time-to-deployment compared to assembling your own stack

**Cons:**

- Self-hosted edition requires Linux or WSL (no native macOS/Linux ARM server)
- First model compilation is slow (mitigated by caching)
- Mojo learning curve for teams unfamiliar with systems programming
- Cloud pricing details are not fully transparent without contacting sales
- Smaller community than vLLM or TGI (still growing)
- BYOC/enterprise features require paid tiers

## Conclusion

Modular fills a real gap in the AI infrastructure landscape. Most teams either use a managed API (convenient but expensive at scale) or build their own serving stack (flexible but time-consuming and vendor-dependent). MAX offers a middle path: self-hosted ease with production performance, hardware flexibility without code changes, and a managed cloud option when you want to offload infrastructure.

It is not the right choice for every workload. If you are deeply invested in vLLM's ecosystem or need specific features only available in TGI, switching has real costs. But for teams starting fresh or looking to consolidate a fragmented inference stack, Modular deserves serious evaluation.

The fact that the self-hosted community edition includes the full feature set, not a crippled free tier, makes it low-risk to try. One container, one command, one API. If it does not work out, you have lost nothing but an afternoon.

---

**Links:**

- [Modular Documentation](https://docs.modular.com/)
- [MAX Quickstart](https://docs.modular.com/max/get-started/)
- [Modular Pricing](https://www.modular.com/pricing)
- [MAX GitHub Repository](https://github.com/modular/modular)
- [Mojo Language Documentation](https://docs.modular.com/mojo/)
- [Modular Discord](https://discord.com/invite/modular)
