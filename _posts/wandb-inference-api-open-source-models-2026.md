---
title: "Weights & Biases (W&B) Inference API: Open-Source Foundation Models with OpenAI Compatibility"
excerpt: "W&B Inference gives developers access to leading open-source foundation models like DeepSeek V3.1, Llama 4 Scout, and Qwen3 through an OpenAI-compatible API with built-in observability via W&B Weave."
coverImage: "/assets/blog/wandb-inference-cover.jpg"
date: 2026-03-22T08:40:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/wandb-inference-cover.jpg"
---

## TL;DR

Weights & Biases (W&B) has expanded beyond its roots as an ML experiment tracking platform into the inference API space. W&B Inference provides an OpenAI-compatible API that gives developers access to over 15 open-source foundation models, including DeepSeek V3.1, Llama 4 Scout, Moonshot Kimi K2.5, and Qwen3. The service integrates directly with W&B Weave, their observability and evaluation framework, making it a compelling option for teams that want inference and tracing in a single platform. Pricing is credit-based with a free tier of $100/month for starter accounts.

## The Problem

Building AI applications that rely on open-source foundation models typically requires teams to choose between multiple hosting providers, manage rate limits across different vendors, and bolt on separate observability tools to monitor performance. This fragmented approach creates engineering overhead, makes cost tracking difficult, and forces developers to write provider-specific code for each model they experiment with.

---

## What W&B Inference Actually Offers

W&B Inference is part of the broader W&B platform, which now includes four core products: **W&B Models** for experiment tracking, **W&B Weave** for LLM observability and evaluation, **W&B Inference** for model hosting, and **W&B Training** for serverless post-training. The inference product is the newest addition and the one most relevant to API-first developers.

The API itself is straightforward. It uses the OpenAI SDK format, which means you can swap your existing OpenAI calls to W&B Inference by changing the base URL:

```python
import openai

client = openai.OpenAI(
    base_url="https://api.inference.wandb.ai/v1",
    api_key="<your-wandb-api-key>",
)

response = client.chat.completions.create(
    model="meta-llama/Llama-3.1-8B-Instruct",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Tell me a joke."}
    ],
)
```

This compatibility extends to streaming, tool calling, JSON mode, structured output, and reasoning information display. If you have existing code built around the OpenAI Python or TypeScript SDK, switching to W&B Inference is a one-line change.

## The Model Catalog

W&B Inference currently supports a diverse set of models across text and multimodal categories:

| Model | Type | Parameters | Context Window |
|-------|------|------------|----------------|
| DeepSeek V3.1 | Text | 37B-671B (MoE) | 161K |
| Meta Llama 4 Scout | Text, Vision | 17B-109B (MoE) | 64K |
| Meta Llama 3.3 70B | Text | 70B | 128K |
| Moonshot Kimi K2.5 | Text, Vision | 32B-1T (MoE) | 262K |
| Qwen3 235B Thinking-2507 | Text | 22B-235B (MoE) | 262K |
| MiniMax M2.5 | Text | 10B-230B (MoE) | 197K |
| OpenAI GPT OSS 120B | Text | 5.1B-117B (MoE) | 131K |
| NVIDIA Nemotron 3 Super 120B | Text | 12B-120B (MoE) | 262K |
| Microsoft Phi 4 Mini 3.8B | Text | 3.8B | 128K |
| OpenPipe Qwen3 14B | Text | 14.8B | 32.8K |

The catalog skews heavily toward open-weight models, which is expected given W&B's historical ties to the open-source ML community. The inclusion of OpenAI's GPT OSS models (their open-weight MoE releases) and NVIDIA's Nemotron is notable. Llama 4 Scout with vision capabilities is available for multimodal workloads.

## Weave Integration: The Real Differentiator

The most interesting aspect of W&B Inference is not the inference service itself but its integration with W&B Weave. Weave is a Python and TypeScript library that provides:

- **Automatic tracing** of LLM calls (OpenAI, Anthropic, local models) with a simple `@weave.op()` decorator
- **LLM-as-judge evaluation** for automated quality scoring of model outputs
- **RAG evaluation** pipelines for measuring retrieval quality
- **Playground** for comparing different models and settings side by side

For developers, this means the same API key that handles inference also feeds into a complete observability pipeline. You do not need to wire up a separate tool like Langfuse or Langsmith to get traces and evaluations.

```python
import weave

weave.init("my-team/my-project")

@weave.op()
def generate_response(prompt: str):
    response = client.chat.completions.create(
        model="meta-llama/Llama-3.1-8B-Instruct",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
```

Every call to `generate_response` is automatically logged with inputs, outputs, latency, and token counts, all visible in the Weave dashboard.

## Pricing and Account Tiers

W&B Inference uses a credit-based pricing model with tiered spending caps:

| Account Tier | Default Monthly Cap |
|-------------|-------------------|
| Free | $100/month |
| Pro | $6,000/month |
| Enterprise | $700,000/year |

Free accounts can activate pay-as-you-go billing to continue beyond the initial credit allocation. Pro accounts are billed for overages monthly based on model-specific pricing. Exact per-model pricing is available on the W&B Inference pricing page.

Rate limits are applied per W&B project, so teams running multiple projects in a single account get separate quotas for each one.

## W&B Training: Serverless Post-Training

Beyond inference, W&B has launched **W&B Training** (currently in public preview) for serverless model post-training. This includes two capabilities:

- **Serverless RL (Reinforcement Learning):** Improve model reliability for multi-turn agentic tasks, with integration to ART (a fine-tuning framework) and RULER (a universal verifier).
- **Serverless SFT (Supervised Fine-Tuning):** Fine-tune models using curated datasets for distillation, output style/format training, or warm-up before RL.

Training runs on CoreWeave Cloud infrastructure and integrates with the same W&B Weave observability layer used for inference.

## How It Compares

W&B Inference enters a crowded inference API market alongside providers like Groq (speed-optimized), Together AI (broad model catalog), DeepInfra (cost-focused), and Fireworks AI (enterprise-grade). The key differentiators are:

- **Weave integration:** Built-in tracing and evaluation without third-party tools
- **Unified platform:** Inference, training, observability, and experiment tracking under one account
- **Open-weight focus:** Strong selection of open-source models including newer releases like DeepSeek V3.1 and Kimi K2.5
- **OpenAI compatibility:** Drop-in replacement for existing OpenAI SDK code

The trade-off is that W&B's inference catalog is smaller than dedicated providers like Together AI or Fireworks, and per-model pricing may not always be the lowest. For teams already using W&B for experiment tracking or model evaluation, the integration value likely outweighs the cost differences.

## Getting Started

1. Create a free account at [wandb.ai](https://wandb.ai/signup)
2. Generate an API key at [wandb.ai/settings](https://wandb.ai/settings)
3. Install the Weave library: `pip install weave`
4. Set the inference base URL to `https://api.inference.wandb.ai/v1`
5. Start building with any supported model

For teams evaluating the platform, W&B provides a free tier with $100 in monthly inference credits, Jupyter notebooks on Colab, and comprehensive documentation at [docs.wandb.ai/inference](https://docs.wandb.ai/inference).

---

## Sources

- [W&B Inference Documentation](https://docs.wandb.ai/inference)
- [W&B Weave Documentation](https://docs.wandb.ai/weave)
- [Available Models](https://docs.wandb.ai/inference/models)
- [Usage Information and Limits](https://docs.wandb.ai/inference/usage-limits)
- [W&B Training](https://docs.wandb.ai/training)
- [W&B Pricing](https://wandb.ai/site/pricing/)
