---
title: "Arcee AI: Open-Weight Trinity Models With a Production API That Runs From Edge to Cloud"
excerpt: "Arcee AI's Trinity family ships sparse MoE models (Nano, Mini, Large) with open weights and a hosted API, promising the same capabilities whether you deploy on a phone or an H100 cluster."
coverImage: "/assets/blog/arcee-ai-trinity-cover.jpg"
date: 2026-03-18T12:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/arcee-ai-trinity-cover.jpg"
---

## TL;DR

Arcee AI builds open-weight sparse mixture-of-experts models under the Trinity brand, available in three sizes (Nano 6B, Mini 26B, Large 400B). All variants share the same skill profile, so you can prototype locally and deploy in the cloud without rewriting prompts. They offer a production API alongside downloadable weights, with an OpenAI-compatible endpoint at `api.arcee.ai`.

## The Problem

Most AI model providers force a choice: either use a hosted API with no control over your data, or self-host open models and do all the inference engineering yourself. The models that run well on a laptop rarely match the capabilities of frontier cloud models, and migrating between them means rebuilding prompts, tool definitions, and evaluation pipelines from scratch. Developers want a single model family that scales from edge devices to data centers without losing capabilities along the way.

## Enter Arcee AI

Arcee AI is a US-based open intelligence lab focused on sparse mixture-of-experts (MoE) architectures. Rather than training dense models and calling it a day, they've bet on sparsity as the path to efficient inference: only a fraction of the model activates for any given token, keeping compute costs predictable while maintaining frontier-class quality.

Their Trinity model family is the core product. Three releases in six months, all open-weight, all designed to share identical capabilities across sizes. The philosophy is simple: pick the footprint that fits your infrastructure, keep everything else the same.

### Trinity Nano (6B Total, 1B Active Per Token)

The smallest member of the family is built for edge deployment. With only 1 billion parameters active per token, it runs on consumer GPUs, edge servers, and mobile-class devices. Arcee tunes it specifically for offline operation and latency-sensitive voice or UI loops.

Key specs:
- **Total parameters:** 6B (sparse MoE)
- **Active parameters:** 1B per token
- **Context window:** 128K tokens
- **Deployment targets:** On-device, edge servers, mobile, kiosks
- **Use cases:** Privacy-critical apps, offline inference, real-time voice interfaces

If you need an AI that works without an internet connection and can't leak data because it never leaves the device, Nano is the target.

### Trinity Mini (26B Total, 3B Active Per Token)

Mini is the production workhorse. At 3 billion active parameters per token, it's designed for customer-facing applications, agent backends, and high-throughput services. You can deploy it on any major cloud provider or on-premises infrastructure.

Key specs:
- **Total parameters:** 26B (sparse MoE)
- **Active parameters:** 3B per token
- **Context window:** 128K tokens
- **Deployment targets:** AWS, GCP, Azure, on-prem (vLLM, SGLang, llama.cpp)
- **Use cases:** Multi-turn agents, tool orchestration, structured outputs, production APIs

Mini is where most developers will live. It's the sweet spot between capability and cost, and it's the model Arcee optimizes hardest for agent reliability.

### Trinity Large Preview (400B Total, 13B Active Per Token)

The flagship. Trinity Large is a 400 billion parameter sparse MoE with 256 experts, of which only 4 activate per token. That's a 1.56% routing fraction, which Arcee claims is among the highest sparsity ratios in the open model landscape (for comparison, DeepSeek-V3 uses 8-of-256 at 3.13%, and Qwen3-235B uses 8-of-128 at 6.25%).

Key specs:
- **Total parameters:** 400B (sparse MoE)
- **Active parameters:** 13B per token
- **Context window:** 512K tokens
- **Deployment:** Preview API (8-bit quantization)
- **Pricing:** Free on OpenRouter for a limited time

The model was trained on 2048 NVIDIA B300 GPUs, which Arcee states is the largest publicly disclosed pretraining run on that hardware. The base model was trained on 17 trillion tokens with a full recipe, and Arcee ships three variants: Preview (lightly post-trained, chat-ready), Base (full pretraining checkpoint), and TrueBase (early checkpoint at 10T tokens with no instruct data or LR anneals).

## The API

Arcee offers a production API compatible with the OpenAI SDK. Point any OpenAI client at `https://api.arcee.ai/api/v1` and you're running Trinity models. Here's the minimal Python setup:

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="https://api.arcee.ai/api/v1"
)

response = client.chat.completions.create(
    model="trinity-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "What is 25 + 37?"},
    ],
    stream=False
)

print(response.choices[0].message.content)
print(response.choices[0].message.reasoning)
```

JavaScript and curl examples follow the same pattern. API keys are created through the Arcee Platform dashboard at `chat.arcee.ai`, with a wallet-based pricing model for paid usage.

## What Makes Arcee Different

Three things stand out in a crowded inference market:

1. **Same skills across sizes.** This is Arcee's most interesting design choice. Nano, Mini, and Large all share the same capability profile. Tool calling, structured outputs, multi-turn coherence, JSON schema adherence, error recovery. If it works on Mini in your cloud deployment, it works on Nano at the edge. You don't rebuild prompts or tool definitions when switching sizes. For teams shipping products across heterogeneous hardware, this eliminates an entire class of engineering headaches.

2. **Extreme sparsity.** Trinity Large's 4-of-256 expert routing means you're activating 13 billion parameters out of 400 billion. That's 3.25% of the model doing work on any given token. The practical effect: frontier-class output quality at inference costs closer to a mid-size model. Arcee increased their dense layers (from 3 to 6) during training specifically to keep routing stable at this sparsity level, which suggests they've done real engineering work on the gating mechanism rather than just throwing more experts at the problem.

3. **Open weights with a hosted option.** You can download the model weights and run everything yourself, or use Arcee's API for convenience. Unlike some "open" providers who release weights but make self-hosting impractical, Arcee supports standard deployment stacks (vLLM, SGLang, llama.cpp) and publishes documentation for each model size.

## The Honest Assessment

Arcee is a smaller lab competing against well-funded players. The Trinity Large Preview is genuinely impressive on paper, but preview means preview. Training on B300 GPUs is bold (they're brand new hardware), and scaling to 2048 of them for a single run shows ambition, but the model hasn't had the extensive post-training and safety evaluation that more mature offerings have.

The Nano-to-Mini-to-Large consistency promise is compelling, but it needs more third-party validation. "Same capabilities across sizes" is easy to claim and hard to verify without extensive independent benchmarking across real-world workloads.

Pricing is where Arcee could win or lose. Trinity Large Preview is free on OpenRouter right now, which is a clear customer acquisition play. The wallet-based API pricing suggests they'll compete on cost-per-token once the free period ends, but published rates would help developers plan.

## The Bottom Line

Arcee AI is building something worth watching: open-weight sparse MoE models that scale from phone to data center with consistent capabilities, wrapped in an OpenAI-compatible API. The architecture choices (extreme sparsity, online RL for continuous improvement) are technically sound, and the three-model family covers real deployment scenarios.

Whether they can maintain quality and pace against better-funded competitors is the open question. But for developers who want a single model family they can run anywhere, with weights they can inspect and an API they can use today, Arcee is one of the more interesting options in the 2026 landscape.

**Try it:** [Arcee Platform](https://chat.arcee.ai) | [API Docs](https://docs.arcee.ai) | [Trinity on OpenRouter](https://openrouter.ai/arcee-ai/trinity-large-preview)
