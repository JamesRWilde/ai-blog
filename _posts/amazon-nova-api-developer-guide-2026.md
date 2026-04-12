---
title: "Amazon Nova API: AWS's In-House AI Model Family for Developers"
excerpt: "Amazon Nova is AWS's proprietary family of multimodal AI models available through Bedrock, offering text, image, video, and speech capabilities at aggressive price points. Here's what developers need to know in 2026."
coverImage: "/assets/blog/amazon-nova-cover.png"
date: 2026-03-22T12:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/amazon-nova-cover.png"
---

## TL;DR

Amazon Nova is AWS's own model family within Bedrock, spanning text (Micro), multimodal understanding (Lite, Pro, Premier), image generation (Canvas), video generation (Reel), and conversational speech (Sonic). All are accessible via a single Bedrock API with cross-region inference, built-in guardrails, and aggressive pricing that undercuts most third-party models on the platform. In 2026, Nova Premier sits at the top as the most capable model with a 1 million token context window.

---

## The Problem

AWS Bedrock launched as a marketplace for third-party AI models from Anthropic, Meta, Mistral, Cohere, and others. But relying exclusively on external providers left AWS without full control over model pricing, capability roadmaps, or the ability to offer deep platform integration. Developers building on AWS wanted a first-party option that felt native to the ecosystem, with tighter IAM integration, regional availability guarantees, and pricing that didn't require negotiating with multiple vendors.

Amazon Nova was the answer.

---

## What Is Amazon Nova?

Amazon Nova is a family of foundation models built and maintained by AWS, exclusive to Amazon Bedrock. Unlike third-party models on the platform, Nova models are developed in-house and optimized for Bedrock's infrastructure, which means AWS controls the full stack from training to inference.

The family covers five distinct capability areas:

**Text and Multimodal Understanding**

- **Nova Micro** — Text-only, 128K context window. Fastest and cheapest option for straightforward NLP tasks like classification, extraction, and summarization.
- **Nova Lite** — Multimodal (text, images, video), 300K context window. Budget-friendly for developers who need vision capabilities without paying for top-tier reasoning.
- **Nova Pro** — Multimodal, 300K context window. High-capability workhorse for complex reasoning, code generation, and multi-step analysis.
- **Nova Premier** — Multimodal, 1 million token context window. The flagship model, designed for long-document analysis, complex agentic workflows, and tasks that require deep contextual understanding across massive inputs.

**Content Generation**

- **Nova Canvas** — Image generation and editing. Supports text-to-image, image editing, and image variation generation with configurable guardrails for content safety.
- **Nova Reel** — Video generation from text prompts and still images. Supports 6-second and 12-second video outputs at 720p/24fps.

**Speech**

- **Nova Sonic** — Bidirectional speech-to-speech model with native audio understanding and generation. Designed for conversational AI agents with streaming voice interfaces.

---

## How the API Works

Nova models are accessed through the standard Amazon Bedrock API — the same `InvokeModel` and `InvokeModelWithResponseStream` endpoints used for Claude, Llama, Mistral, and other Bedrock models. If you've already integrated Bedrock into your application, switching to Nova is a matter of changing the `modelId` parameter.

```python
import boto3

bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

response = bedrock.invoke_model(
    modelId='amazon.nova-pro-v1:0',
    body=json.dumps({
        "messages": [
            {"role": "user", "content": [{"text": "Analyze this quarterly report..."}]}
        ]
    })
)
```

Nova models support Converse API, which provides a unified interface across all Bedrock models with tool use, system prompts, and structured output.

### Cross-Region Inference

One advantage Nova has over most third-party Bedrock models is **cross-region inference**. Nova models can be routed across AWS regions automatically, which means you're not locked to a single region's capacity. This is critical for production applications that need high availability.

The Bedrock pricing page lists three routing tiers:

- **Global cross-region inference** — broadest routing, lowest cost
- **Geo cross-region inference** — routes within a geographic boundary (US, EU, APAC)
- **In-region** — fixed to a single region, lowest latency

### Built-In Tools

Nova models support several built-in tools directly through the Bedrock API:

- **Code interpretation** — The model can execute Python code in a sandboxed environment
- **Computer use** — Programmatic control of browser and file system interactions
- **Grounding with Knowledge Bases** — Connect Nova to your RAG pipeline through Bedrock's native Knowledge Bases integration
- **Guardrails** — Apply content filtering, PII redaction, and topic blocking at the API level

---

## Pricing (As of March 2026)

Nova is positioned as a cost-competitive option within Bedrock. Based on the latest published pricing:

| Model | Input (per 1M tokens) | Output (per 1M tokens) | Context |
|-------|----------------------|----------------------|---------|
| Nova Micro | $0.035 | $0.14 | 128K |
| Nova Lite | $0.06 | $0.24 | 300K |
| Nova Pro | $0.80 | $3.20 | 300K |
| Nova Premier | $2.50 | $12.50 | 1M |

Nova Micro at $0.035 per million input tokens makes it one of the cheapest viable models available on Bedrock, undercutting even Google's Gemma 3 4B in some regions. Nova Pro at $0.80/$3.20 positions it as a direct competitor to Claude 3.5 Sonnet and Mistral Large, while offering the advantage of Bedrock-native integration.

All Nova models support **batch inference at 50% off** the standard on-demand pricing, which is useful for offline processing jobs.

Custom fine-tuning is supported for Nova models at the same pricing as base inference, with custom model storage billed separately.

---

## How Nova Compares to Other Bedrock Models

Nova's closest competitors on Bedrock are:

- **Claude 3.5 Sonnet** (Anthropic) — Generally stronger at nuanced reasoning and creative writing. More expensive at $6/$30 per million tokens.
- **Llama 4 Scout** (Meta) — Open weights, supports fine-tuning. Available on Bedrock but requires provisioned throughput for production use.
- **Mistral Large 3** (Mistral AI) — Strong multilingual capabilities. Comparable pricing at $0.50/$1.50.

Nova's advantages are price, cross-region routing, and the tight integration with Bedrock's ecosystem (Guardrails, Knowledge Bases, Agents). Its weaknesses relative to Claude are in complex instruction following and long-form creative output.

For developers already deep in the AWS ecosystem, Nova Pro is the pragmatic choice. For tasks demanding the highest reasoning quality, Claude remains the benchmark.

---

## When to Use Nova

**Good fit:**

- High-volume production applications where cost per token matters
- Multimodal tasks combining text, images, and video
- Applications requiring cross-region availability and AWS-native integration
- Conversational voice agents (Nova Sonic)
- Content generation pipelines (Canvas for images, Reel for video)
- Long-document analysis where Nova Premier's 1M context is unmatched

**Not ideal:**

- Tasks requiring the absolute best reasoning quality (Claude still leads)
- Applications that need to run outside AWS (Nova is Bedrock-exclusive)
- Real-time interactive use cases requiring sub-second latency (Nova Pro adds overhead compared to smaller models)

---

## Bottom Line

Amazon Nova is AWS's play for vertical integration in the AI model layer. It's not the best model in every category, but it's good enough in most, and the pricing and platform integration make it the default choice for AWS-native applications. Nova Premier's 1M context window is genuinely impressive, and the family's coverage across text, vision, image generation, video, and speech makes it one of the most complete model families from any single provider.

If you're building on Bedrock and haven't tried Nova yet, start with Nova Pro for general tasks and Nova Micro for simple NLP. You'll save money, and you won't need to change a single line of your Bedrock integration code.

---

*Sources: AWS Bedrock documentation (docs.aws.amazon.com/nova), Amazon Bedrock pricing page, AWS re:Invent 2024 Nova announcement, StackSpend AI API pricing guide.*
