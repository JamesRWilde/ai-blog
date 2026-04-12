---
title: "NVIDIA Nemotron 3 Super: The GPU Giant Enters the Open-Weight Race"
excerpt: "NVIDIA's Nemotron 3 Super is a 120B parameter open-weight model built for agentic AI, available through NIM APIs with Mamba-Transformer architecture and 1M token context."
coverImage: "/assets/blog/nvidia-nemotron-cover.jpg"
date: 2026-03-16T16:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/nvidia-nemotron-cover.jpg"
---

## TL;DR

NVIDIA released Nemotron 3 Super on March 11, 2026, an open-weight 120B parameter LLM with only 12B active parameters thanks to a Mixture-of-Experts architecture. It supports 1M token context, ships under a permissive open model license, and is available through NVIDIA's NIM APIs at build.nvidia.com, Hugging Face, and major cloud platforms. This is NVIDIA's most aggressive move yet to own the full stack — from silicon to model to API.

## The Problem

Developers building agentic AI systems face a frustrating trade-off: proprietary frontier models from OpenAI and Anthropic deliver strong reasoning and tool-use capabilities, but lock you into closed APIs with opaque pricing and zero portability. Open-weight alternatives from Meta and Mistral offer freedom, but often lag on agentic benchmarks, long-context performance, and production-grade tool calling.

Nobody has delivered a model that nails all three: open weights, frontier-level agentic performance, and production infrastructure to serve it. Until now, NVIDIA was the company that sold the picks and shovels. Nemotron 3 Super is NVIDIA claiming a stake in the gold rush itself.

## What Nemotron 3 Super Actually Is

Nemotron 3 Super is not a dense model. It uses a hybrid architecture NVIDIA calls **LatentMoE** — an interleaved stack of Mamba-2 state-space layers, Mixture-of-Experts layers, and standard attention layers. Out of 120 billion total parameters, only 12 billion are active at any given time.

The architecture choices are deliberate:

- **Mamba-2 layers** handle the bulk of sequence processing efficiently, replacing transformer attention where possible
- **MoE layers** activate only relevant expert subnetworks per token, keeping compute costs proportional to task complexity rather than model size
- **Attention layers** are reserved for positions requiring full bidirectional context — a surgical use rather than the default
- **Multi-Token Prediction (MTP)** enables native speculative decoding, generating multiple tokens per step for faster inference

The result: a model that benchmarks within striking distance of Qwen 3.5 122B and significantly outperforms GPT-OSS-120B on most agentic tasks, while running with a fraction of the active compute.

## Benchmark Performance

The numbers tell a nuanced story. Nemotron 3 Super is not the absolute best at everything — but it's remarkably competitive across the board, especially on agentic and long-context tasks where most open-weight models stumble.

| Benchmark | Nemotron 3 Super | GPT-OSS-120B | Qwen 3.5-122B |
|---|---|---|---|
| AIME25 (math reasoning) | 90.21 | 92.50 | 90.36 |
| LiveCodeBench | 81.19 | 88.00 | 78.93 |
| SWE-Bench (code agents) | 60.47 | 41.90 | 66.40 |
| RULER @ 1M context | 91.75 | 22.30 | 91.33 |
| Arena-Hard-V2 (chat) | 73.88 | 90.26 | 75.15 |

A few things jump out:

**Long-context performance is outstanding.** At 1M tokens, Nemotron 3 Super scores 91.75 on RULER — nearly matching Qwen 3.5 and completely destroying GPT-OSS-120B's 22.30. For applications like document analysis, codebase understanding, or long-running agent sessions, this is a serious differentiator.

**SWE-Bench performance is solid.** 60.47% on SWE-Bench verified (using OpenHands scaffolding) places it firmly in production-quality territory for code agents. Not quite Qwen 3.5's 66.40, but dramatically better than GPT-OSS-120B's 41.90.

**Math reasoning is competitive.** 90.21 on AIME25 is within 2 points of both competitors. Combined with tool-use capabilities (94.73 on HMMT with tools), it handles the kind of multi-step reasoning that agentic workflows demand.

**Chat quality lags slightly.** At 73.88 on Arena-Hard-V2 versus GPT-OSS-120B's 90.26, raw conversational quality isn't its strongest suit. This is a model optimized for agents, not chatbots.

## The NIM API Layer

NVIDIA serves Nemotron 3 Super through **NIM** (NVIDIA Inference Microservices), their managed API platform at build.nvidia.com. NIM provides:

- **OpenAI-compatible endpoints** — swap your base URL and API key, keep your existing code
- **Optimized inference containers** — NVIDIA pre-tunes the serving stack for each model, handling quantization, batching, and KV-cache optimization
- **Cloud deployment** — NIM containers run on any NVIDIA GPU cluster, including major cloud providers (Google Cloud Vertex AI, Oracle Cloud) and on-premises infrastructure
- **Enterprise support** — for organizations that need SLAs and compliance guarantees

For developers who don't want to self-host, Nemotron 3 Super is also already available on **OpenRouter** and **Perplexity**, with the model routing handled automatically.

The practical advantage of NIM over raw Hugging Face deployment: you get NVIDIA's inference optimizations (speculative decoding via MTP, NVFP4 quantization, continuous batching) without tuning the serving stack yourself.

## How to Use It

Getting started is straightforward across all access methods:

**Via NIM API:**
```python
from openai import OpenAI

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="your-nvidia-api-key"
)

response = client.chat.completions.create(
    model="nvidia/nemotron-3-super-120b-a12b",
    messages=[{"role": "user", "content": "Explain the Mamba-2 architecture"}],
    temperature=1.0,
    top_p=0.95
)
```

**Via OpenRouter:**
```python
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="your-openrouter-key"
)

response = client.chat.completions.create(
    model="nvidia/nemotron-3-super-120b-a12b",
    messages=[{"role": "user", "content": "Analyze this codebase..."}]
)
```

**Self-hosted via Hugging Face:**
```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained(
    "nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16",
    device_map="auto",
    torch_dtype="auto"
)
```

Self-hosting requires a minimum of **8x H100-80GB GPUs** for the BF16 variant, though the NVFP4 quantized version can run on a single B200 or DGX Spark.

NVIDIA recommends `temperature=1.0` and `top_p=0.95` across all tasks, including reasoning, tool calling, and general chat — unusual advice that suggests the model was trained to work best at higher temperatures.

## Reasoning Mode

The model includes a configurable reasoning mode. When enabled (`enable_thinking=True` in the chat template), the model generates an internal reasoning trace before producing its final response — similar to how o1-style reasoning models work, but toggle-able rather than always-on.

This matters for agentic workflows where you might want fast, direct responses for simple tool calls and deeper reasoning for complex multi-step tasks. The ability to switch between modes without changing models reduces latency and cost in production systems.

## Licensing and Commercial Use

Nemotron 3 Super ships under the **NVIDIA Nemotron Open Model License** — a permissive license that allows commercial use, modification, and redistribution. This is not the restrictive "research-only" license some "open" models carry.

The license covers the weights, and NVIDIA has also released the pre-training and post-training datasets separately on Hugging Face. For organizations that want full reproducibility, NVIDIA published a [detailed technical report](https://research.nvidia.com/labs/nemotron/files/NVIDIA-Nemotron-3-Super-Technical-Report.pdf) and [evaluation configs](https://github.com/NVIDIA-NeMo/Evaluator/tree/main/packages/nemo-evaluator-launcher/examples/nemotron/nemotron-3-super) on GitHub.

## The Strategic Play

Nemotron 3 Super is not just a model release — it's a strategic signal. NVIDIA is the only company that controls the full vertical: they design the GPUs, they optimize the serving stack (NIM), and now they ship the models. This gives them unique leverage:

- **Hardware-software co-optimization.** The model is trained using NVFP4 quantization (NVIDIA's proprietary 4-bit format), and the MTP layers are designed for NVIDIA's inference stack. No other vendor can replicate this optimization.
- **Ecosystem lock-in in reverse.** By making Nemotron open-weight and permissively licensed, NVIDIA encourages adoption. Every Nemotron deployment runs best on NVIDIA hardware. Free model, profitable GPU sales.
- **GTC timing.** The release landed March 11, just five days before NVIDIA's annual GTC conference on March 16. The model served as an appetizer for the main keynote — a proof point that NVIDIA's AI ambitions extend far beyond silicon.

This is the same playbook Intel used with x86: own the architecture, make the software ecosystem so compelling that switching costs become prohibitive, and let third parties build on your foundation.

## What's Missing

A few gaps worth noting:

- **No multimodal capabilities.** Nemotron 3 Super is text-only. For image, audio, or video understanding, you still need models like GPT-4o or Gemini.
- **Seven languages only.** English, French, German, Italian, Japanese, Spanish, and Chinese cover most commercial use cases, but developers targeting other markets will need alternatives.
- **Heavy hardware requirements.** The BF16 variant needs 8x H100 GPUs. Even the quantized NVFP4 version requires a B200 or DGX Spark. This is not a model you run on consumer hardware.
- **NIM API pricing not published.** Unlike OpenRouter or Together AI, NVIDIA doesn't publish transparent per-token pricing for NIM. Enterprise pricing appears to be quote-based, which creates friction for developers comparing costs.

## Bottom Line

Nemotron 3 Super is the strongest open-weight model for agentic AI workloads available today. Its long-context performance (91.75 at 1M tokens) and SWE-Bench scores put it in production-quality territory, and the permissive commercial license removes the adoption friction that plagues research-only releases.

For developers already on NVIDIA hardware, the NIM integration makes it the path of least resistance. For everyone else, OpenRouter and Hugging Face provide platform-agnostic access.

The model's weaknesses — no multimodal, limited language support, chat quality below GPT-OSS-120B — are real but narrow. This is not a general-purpose chatbot model. It's an agent engine, and on that specific axis, it delivers.

NVIDIA just proved they can do more than sell GPUs. Whether that's exciting or concerning depends on how you feel about one company controlling silicon, serving infrastructure, and frontier models simultaneously.
