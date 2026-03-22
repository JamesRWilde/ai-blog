---
title: "SGLang: The Open-Source LLM Serving Engine Powering 400,000+ GPUs Worldwide"
excerpt: "Born at UC Berkeley and backed by a16z, SGLang has quietly become the backbone of high-performance LLM inference for teams deploying everything from DeepSeek to diffusion models."
coverImage: "/assets/blog/sglang-cover.png"
date: 2026-03-22T12:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/sglang-cover.png"
---

## TL;DR

SGLang is an open-source serving framework for large language models and multimodal models, developed by the LMSYS team at UC Berkeley. It delivers high-throughput, low-latency inference through innovations like RadixAttention, zero-overhead scheduling, and prefill-decode disaggregation. With OpenAI-compatible APIs, support for NVIDIA, AMD, Intel, Google TPUs, and Ascend NPUs, and day-zero support for frontier open models, SGLang has become the go-to inference engine for teams running serious production workloads.

## The Problem

Deploying large language models in production is hard. The gap between "running a model in a notebook" and "serving millions of tokens per second with sub-second latency" is enormous. Most teams hit one of three walls:

**Inference is too slow.** Standard Hugging Face Transformers are not optimized for serving at scale. Continuous batching, KV cache management, and attention kernel optimization require deep systems expertise that most ML teams do not have.

**Hardware fragmentation.** NVIDIA dominates, but AMD MI300X and MI355 GPUs, Google TPUs, and Ascend NPUs are gaining traction. Each requires different software stacks, and maintaining compatibility across them multiplies engineering effort.

**The model treadmill moves too fast.** DeepSeek-V3, Llama 4, Mistral Large 3, Qwen 3, GPT-OSS — new frontier models ship weekly. Serving frameworks that take weeks to add support leave teams stranded on outdated versions.

The traditional solutions each carry trade-offs. Hugging Face TGI is now officially in maintenance mode, with the team recommending vLLM and SGLang as successors. vLLM is strong on simplicity but lacks some of the distributed inference features that large-scale deployments demand. Cloud provider APIs (OpenAI, Anthropic, Bedrock) abstract the problem away but lock you into proprietary pricing and vendor dependency.

## SGLang

### What It Is

SGLang is a high-performance serving framework for large language models and multimodal models. It was created by the LMSYS research group at UC Berkeley, the same team behind the Chatbot Arena leaderboard. It is open-source under the Apache 2.0 license and powers over 400,000 GPUs worldwide, processing trillions of tokens daily.

The framework provides an OpenAI-compatible API out of the box, meaning most applications can switch to SGLang by changing a base URL. It also offers an offline engine API for Python-native batch inference and Ollama-compatible endpoints for local development.

### Key Technical Innovations

SGLang's performance advantage comes from several systems-level innovations:

**RadixAttention** is an automatic caching system that treats KV cache management like a radix tree. Instead of recomputing prefixes for every request, SGLang reuses cached attention states across requests that share common prefixes. This is especially powerful for chat applications, RAG pipelines, and agentic workflows where system prompts are reused across thousands of calls.

**Zero-overhead CPU scheduler.** Most inference servers spend meaningful CPU cycles on request scheduling and batching logic. SGLang moves this overhead to near-zero by batching scheduling decisions into the GPU computation itself, keeping the hardware saturated without waste.

**Prefill-decode disaggregation.** SGLang separates the prefill phase (processing input tokens) from the decode phase (generating output tokens) onto different hardware. Prefill is compute-bound and benefits from different parallelism strategies than decode, which is memory-bandwidth-bound. Splitting them lets each phase run on optimal hardware, boosting throughput by 2.7x to 3.8x in SGLang's published benchmarks on NVIDIA GB200 NVL72.

**Speculative decoding.** A smaller "draft" model generates candidate tokens, and the larger model verifies them in parallel. When the draft model guesses correctly, you get multiple output tokens for the cost of one verification pass. This can speed up inference by 2x or more for models with strong draft-model agreement.

**Expert parallelism.** For mixture-of-experts models like DeepSeek-V3 and Mixtral, SGLang distributes individual experts across GPUs, enabling massive throughput without requiring the full model to fit on each device.

### Hardware Breadth

SGLang runs on NVIDIA GPUs across the full stack, from consumer-grade Spark cards up through GB200 and GB300 NVL72 racks. It also supports AMD Instinct MI300X and MI355 GPUs, Intel Xeon CPUs, Google TPUs via the SGLang-Jax backend, and Huawei Ascend NPUs. This hardware flexibility is unusual for an inference framework — most tools pick a side and stay there.

In February 2026, SGLang published benchmarks showing 25x inference performance improvement on NVIDIA GB300 NVL72 compared to baseline configurations, driven by large-scale expert parallelism and disaggregated serving.

### Beyond Text: SGLang Diffusion

In late 2025, the team expanded SGLang beyond language models to serve diffusion models for video and image generation. The same framework that handles DeepSeek inference can now serve models like WAN for video generation and Qwen-Image. This unification matters because teams running multimodal pipelines no longer need separate infrastructure for text generation and image/video synthesis.

### The Post-Training Connection

SGLang is not just an inference tool. It serves as the rollout backend for reinforcement learning and post-training systems. Frameworks including AReaL, verl, and slime use SGLang to generate the rollouts that drive RLHF and GRPO training loops. This dual role, inference engine and training backbone, means teams that adopt SGLang get a unified stack from development through production deployment.

### How It Compares

| Feature | SGLang | vLLM | TGI (maintenance mode) |
|---|---|---|---|
| Status | Actively developed | Actively developed | Maintenance mode only |
| RadixAttention / prefix caching | Yes (radix tree) | Yes (basic) | Limited |
| Prefill-decode disaggregation | Yes | Experimental | No |
| Speculative decoding | Yes | Yes | Limited |
| Multi-LoRA batching | Yes | Yes | Yes |
| AMD GPU support | Yes | Yes | Limited |
| TPU support | Yes (SGLang-Jax) | No | No |
| Diffusion model serving | Yes | No | No |
| RL/post-training integration | Yes (AReaL, verl) | No | No |
| OpenAI-compatible API | Yes | Yes | Yes |

### Getting Started

SGLang is pip-installable and runs as a single command:

```
pip install sglang[all]
python -m sglang.launch_server --model meta-llama/Llama-3.1-70B-Instruct
```

For production deployments, it supports tensor parallelism, pipeline parallelism, and expert parallelism across multi-node clusters. The API is compatible with the OpenAI Python SDK, so existing client code works with minimal changes.

The project is backed by the a16z Open Source AI Grant (awarded June 2025), has joined the PyTorch ecosystem, and maintains an active community with weekly developer meetings and a public Slack workspace.

### Limitations to Know

SGLang is a systems-level tool. Teams without infrastructure experience may find the tuning parameters overwhelming — server arguments, attention backend selection, quantization choices (FP4, FP8, INT4, AWQ, GPTQ), and parallelism strategies all require understanding the underlying hardware. It is not a managed service, so you bring your own GPUs and handle operations.

The framework is optimized for open-weight models. If your production stack relies entirely on proprietary APIs (GPT-5, Claude Opus), SGLang is not the right tool unless you are self-hosting open-weight models.

---

## Bottom Line

SGLang has emerged as the most feature-complete open-source LLM serving framework available today. With TGI entering maintenance mode and vLLM focused on simplicity, SGLang occupies the high-performance tier with innovations that actually move the needle on throughput and latency. The breadth of hardware support, the expansion to diffusion models, and the tight integration with RL training pipelines make it the default choice for teams building serious AI infrastructure in 2026.

If you are self-hosting any LLM inference workload, SGLang deserves a benchmark run.
