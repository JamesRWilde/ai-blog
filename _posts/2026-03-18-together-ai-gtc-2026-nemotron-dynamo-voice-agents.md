---
title: "Together AI Unveils Voice Agents, Nemotron 3 Super, and NVIDIA Dynamo Integration at GTC 2026"
excerpt: "Together AI goes big at NVIDIA GTC 2026 with Nemotron 3 Super on dedicated inference, Parakeet-powered voice agents, and NVIDIA Dynamo 1.0 integration for production-scale AI."
coverImage: "/assets/blog/together-ai-gtc-2026-cover.jpg"
date: 2026-03-18T11:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/together-ai-gtc-2026-cover.jpg"
---

## TL;DR

Together AI timed its biggest platform push yet for NVIDIA GTC 2026 (March 16-19, San Jose), announcing NVIDIA Dynamo 1.0 integration, Nemotron 3 Super deployment on dedicated endpoints, and Parakeet TDT 0.6B V3 for real-time voice agents. The company's model library now tops 200, and its inference stack is getting tighter NVIDIA integration from silicon to software.

## The Problem

Running large AI models in production is still a patchwork affair. Developers stitch together inference providers, fine-tuning pipelines, GPU clusters, and storage, each with its own billing, latency characteristics, and failure modes. Meanwhile, the models keep getting bigger and more capable, Nemotron 3 Super alone is 120B parameters, and the industry is pivoting from single-turn chatbots toward multi-agent workflows that need sustained, reliable infrastructure. If your agent needs to reason across a million-token context window while coordinating with other agents, a hobby-grade inference endpoint is not going to cut it.

## Together AI's GTC 2026 Announcements

### NVIDIA Dynamo 1.0 Integration

NVIDIA launched Dynamo 1.0 as open-source infrastructure for generative and agentic inference at scale. Together AI has already baked Dynamo into its inference stack, which means customers get the benefit of NVIDIA's latest serving optimizations without having to manage the plumbing themselves. The pitch is straightforward: better throughput and lower latency on the same hardware.

### NVIDIA OpenShell and NemoClaw

Together AI is partnering with NVIDIA on NemoClaw, an open-source stack for running always-on AI assistants with a single command. The NVIDIA OpenShell runtime provides a secure sandbox for autonomous agents, and Together AI's model library, over 150 optimized models, plugs directly into it. For developers building agent-based systems, this is a notable simplification: secure runtime plus optimized inference in one integration.

### Nemotron 3 Super on Dedicated Endpoints

NVIDIA Nemotron 3 Super is the headline model announcement. It is a hybrid Mamba-Transformer mixture-of-experts architecture with 120B total parameters (12B active per token) and a 1M-token context window. The model is purpose-built for multi-agent workflows, long-horizon reasoning, and complex coordination tasks. Together AI is offering it through its Dedicated Model Inference service, which gives teams isolated, reserved compute rather than fighting for shared serverless capacity.

The use cases NVIDIA is targeting are specific: software development agents, financial analysis pipelines, and cybersecurity automation. These are domains where sustained reasoning matters more than raw tokens-per-second.

### Voice AI with Parakeet TDT 0.6B V3

NVIDIA's Parakeet TDT 0.6B V3 automatic speech recognition model is now available in Together AI's model library. Combined with Together's inference infrastructure, this is aimed at developers building production voice agents that need low-latency transcription. Together AI launched its voice solutions offering recently, and Parakeet is the ASR backbone for it.

### The Model Library: 200+ and Counting

Together AI's model library now lists over 200 models, and the recent additions show breadth across modalities:

- **Text/Chat**: Qwen 3.5 (up to 397B), GLM-5 (744B), Kimi K2.5 (1T params), DeepSeek V3.1 and V3.2-Exp, Llama 4 Maverick, Ministral 3
- **Image**: FLUX.2 Pro, GPT Image 1.5, Wan 2.6 Image, Nano Banana Pro (Gemini 3 Pro Image)
- **Video**: Google Veo 3.0, Sora 2 Pro
- **Audio**: MiniMax Speech 2.6 Turbo, Rime Arcana V3, Parakeet
- **Code**: Qwen3-Coder-Next, DeepSeek V3.2-Exp

Pricing ranges from $0.03/1M input tokens (LFM2 24B A2B) to $1.00/1M input tokens (GLM-5), with image generation starting at $0.03 per image and video at $1.60 per clip.

### Deployment Flexibility

Together AI offers three inference modes: serverless (auto-scaling, pay-per-token), batch (async processing up to 30B tokens at up to 50% cost reduction), and dedicated endpoints (reserved, isolated compute for teams that need guaranteed latency and throughput). The dedicated option is where Nemotron 3 Super lands.

## The Bigger Picture

Together AI's GTC positioning is clear: it wants to be the default inference and deployment layer for teams building serious AI systems, not just spinning up chatbots. The NVIDIA partnerships signal deep infrastructure alignment, Dynamo for serving efficiency, OpenShell for agent security, and the Nemotron/Mamba-Transformer architecture for long-context reasoning.

For developers, the practical takeaway is that Together AI is consolidating a lot of the infrastructure complexity that currently fragments across multiple providers. Whether that consolidation comes at the cost of vendor lock-in is the question every engineering team should be asking before committing.

The company's research output is also worth noting. FlashAttention-4, cache-aware prefill-decode disaggregation (claiming up to 40% faster long-context serving), consistency diffusion language models for 14x faster inference, and CoderForge for training coding agents. This is not a reseller slapping an API on top of someone else's model, they are doing genuine systems research and shipping it.

## Sessions at GTC

Together AI has four sessions scheduled at GTC 2026, with participation from customers like Cursor and Decagon covering production inference, open-source AI in research, and scaling AI-native applications. Percy Liang (co-founder, Stanford professor) is presenting on open-source AI's role in research.

---

*Together AI's model library and API are available at [together.ai](https://www.together.ai). Nemotron 3 Super requires dedicated inference; other models are available on serverless endpoints.*
