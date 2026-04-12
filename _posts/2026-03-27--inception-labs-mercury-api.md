---
title: "Inception Labs Mercury API: Diffusion LLMs That Generate 1,000+ Tokens Per Second"
excerpt: "Inception Labs is betting that diffusion, not autoregression, is the future of language models. Its Mercury API delivers 5x faster inference than GPT-5.2 at a fraction of the cost, and it just might change how we think about LLM speed."
coverImage: "/assets/blog/inceptionlabs-cover.png"
date: 2026-03-27T04:05:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/inceptionlabs-cover.png"
---

Every major LLM on the market today does the same thing: it generates text one token at a time, left to right. Autoregressive decoding has been the foundation of language models since the beginning, and it has a hard ceiling on speed. You can throw more GPUs at it, optimize kernels, quantize weights, but you cannot escape the fundamental constraint that every token must wait for the one before it.

Inception Labs thinks that is the wrong approach entirely.

## TL;DR

Inception Labs built Mercury, a family of diffusion-based large language models (dLLMs) that generate tokens in parallel rather than sequentially. Their flagship model, Mercury 2, delivers over 1,000 tokens per second on NVIDIA Blackwell GPUs, costs $0.25 per million input tokens and $0.75 per million output tokens, and claims quality competitive with GPT-5.2 mini and Claude Sonnet 4.5. The API is OpenAI-compatible, so switching is a matter of changing your base URL. Early customers are using it for coding agents, real-time voice, and agentic loops where latency compounds across dozens of inference calls.

---

## The Problem: Sequential Decoding Is a Speed Trap

Traditional LLMs are typewriters. They commit to each token one at a time and never go back. This design means latency scales linearly with output length. For single-shot prompts that is fine. For agents running multi-step loops, voice applications requiring sub-second response, or search pipelines stacking retrieval and reranking, the cost in latency compounds brutally.

You can throw more test-time compute at reasoning problems to get better answers, but that means even more tokens, which means even more waiting. The speed-quality trade-off in autoregressive models is essentially zero-sum.

## How Diffusion Language Models Work

Diffusion LLMs flip the script. Instead of writing left to right, they generate a rough draft of the entire output simultaneously and then refine it iteratively. Think of it less like a typewriter and more like an artist sketching the full composition first, then sharpening details with each pass.

The Mercury models use a coarse-to-fine process: they start with noisy, approximate tokens across the full sequence, then run a small number of refinement steps to converge on the final output. Parallel generation means the total inference time depends far less on output length, giving Mercury its characteristic speed advantage.

This is the same core idea that made diffusion models dominant in image generation (Stable Diffusion, DALL-E, Midjourney). Inception Labs is applying it to text, and their founders literally wrote the papers on it: Flash Attention, Direct Preference Optimization, and the original diffusion model architectures all trace back to this team.

## Mercury 2: What You Actually Get

Mercury 2 is the flagship model, and here is what the numbers look like:

- **Speed:** 1,009 tokens per second on NVIDIA Blackwell GPUs
- **Input pricing:** $0.25 per million tokens
- **Cached input pricing:** $0.025 per million tokens
- **Output pricing:** $0.75 per million tokens
- **Context window:** 128K tokens
- **Features:** tunable reasoning, native tool use, schema-aligned structured JSON output

For context, GPT-5.2 mini charges $0.15/$0.60 per million tokens. Claude Sonnet 4.5 charges $3/$15. Mercury 2 sits at the low end on price while claiming to be at least 5x faster than comparable speed-optimized models.

Mercury Edit, the second model in the lineup, is a smaller coding-focused dLLM built for autocomplete and next-edit suggestions where even Mercury 2's speed can be pushed further.

## OpenAI-Compatible: Drop-In Replacement

Inception made a deliberate integration decision: their API is fully OpenAI-compatible. That means every existing OpenAI client library works as-is. You swap the base URL and you are running Mercury.

```python
from openai import OpenAI

client = OpenAI(
    api_key="your_key",
    base_url="https://api.inceptionlabs.ai/v1"
)

response = client.chat.completions.create(
    model="mercury-2",
    messages=[{"role": "user", "content": "Explain quantum computing simply."}]
)
```

It also works with LangChain, LiteLLM, AISuite, and Vercel AI SDK. The integration surface is thin, which means less friction for teams evaluating a switch.

## Who Is Actually Using It

Inception has assembled an impressive list of early production customers:

- **Zed** (the code editor) uses Mercury for code completions that "land fast enough to feel like part of your own thinking"
- **Skyvern** (autonomous web agents) reports Mercury 2 is "at least twice as fast as GPT-5.2"
- **Viant** (advertising platform) uses it for real-time campaign optimization at scale
- **OpenCall** and **Happyverse AI** use it for voice applications where natural cadence demands sub-second response
- **Wispr Flow** (voice input) uses it for real-time transcript cleanup and interactive HCI

The pattern across these deployments is consistent: Mercury 2 is not winning on intelligence benchmarks, it is winning on the speed-quality intersection where you get "good enough" quality at speeds that make new categories of applications viable.

## Enterprise Deployment and Pricing Tiers

Three access tiers exist:

- **Free:** 10 million tokens to start, access to all models
- **Developer:** Usage-based pricing with priority support
- **Enterprise:** Custom rate limits, SLA guarantees, volume pricing, private deployments

Mercury is also available through AWS Bedrock and Azure Foundry for teams that need cloud-provider deployment rather than direct API access.

## The Bigger Picture

Inception Labs is not trying to be the smartest LLM. They are trying to be the fastest one that is smart enough. That is a meaningful distinction because the industry has spent two years optimizing for intelligence, pushing context windows longer and reasoning chains deeper, without solving the latency problem that makes those capabilities expensive to deploy at scale.

If your AI application involves one prompt and one answer, Mercury 2 is just a cheaper alternative. If your application involves agents chaining dozens of calls, voice requiring real-time response, or search pipelines stacking multiple model invocations, the speed difference is not incremental. It changes the economics and the user experience simultaneously.

The diffusion approach to language modeling is not new in theory, but Inception appears to be the first team to make it work at production scale with frontier-comparable quality. Their founding team invented the underlying techniques (Flash Attention, DPO, diffusion models) and the company is backed by Eric Schmidt, the Collison brothers, and Andrej Karpathy. That pedigree does not guarantee success, but it does mean the technical claims deserve serious attention.

## Getting Started

Sign up at [platform.inceptionlabs.ai](https://platform.inceptionlabs.ai), grab an API key, and you get 10 million free tokens. The docs at [docs.inceptionlabs.ai](https://docs.inceptionlabs.ai) walk through cURL, Python, JavaScript, LangChain, and LiteLLM integration. If your current LLM integration is OpenAI-compatible, you are roughly five minutes away from running Mercury 2.

---

**Inception Labs Mercury API** — [inceptionlabs.ai](https://www.inceptionlabs.ai)
