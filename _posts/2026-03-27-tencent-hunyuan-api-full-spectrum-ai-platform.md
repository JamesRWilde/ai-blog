---
title: "Tencent Hunyuan API: China's Cloud Giant Quietly Ships a Full-Spectrum AI Platform"
excerpt: "Tencent's Hunyuan API delivers a surprisingly complete AI model suite through OpenAI-compatible endpoints, spanning text generation, vision, translation, embeddings, and roleplaying."
coverImage: "/assets/blog/tencent-hunyuan-api-cover.jpg"
date: 2026-03-27T04:50:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/tencent-hunyuan-api-cover.jpg"
---

## TL;DR

Tencent offers a comprehensive AI model API called Hunyuan through Tencent Cloud. It supports OpenAI-compatible endpoints, a dozen model variants spanning text, vision, translation, embeddings, and roleplaying. Pricing starts at zero (free tier) and scales to competitive rates. It is one of the more complete single-vendor AI API platforms coming out of China, and most Western developers have never heard of it.

## What Is Hunyuan?

Hunyuan (混元, literally "primordial chaos") is Tencent's large language model family and the API platform that exposes it to developers. While Tencent is best known globally for WeChat and gaming, they have been investing heavily in AI infrastructure. Hunyuan is their answer to the "every tech company needs its own LLM" mandate.

The platform runs on Tencent Cloud, accessed through the endpoint `hunyuan.tencentcloudapi.com`. As of early 2026, it offers OpenAI-compatible interfaces, meaning you can swap your existing OpenAI SDK calls to target Hunyuan with only a base URL and API key change.

The OpenAI-compatible endpoint:
```
https://api.hunyuan.cloud.tencent.com/v1/chat/completions
```

## The Model Lineup

This is where Hunyuan stands out from the crowd. Rather than shipping one flagship model and calling it a day, Tencent ships a portfolio of specialized models, each tuned for different use cases:

### Text Generation Models

| Model | Best For | Max Input | Max Output | Notes |
|---|---|---|---|---|
| **Tencent HY 2.0 Think** | Complex reasoning | 128K | -- | Flagship thinking model |
| **Tencent HY 2.0 Instruct** | General instruction following | 128K | -- | High-performance generalist |
| **Hunyuan-T1** | Balanced performance | -- | -- | Strong all-rounder |
| **Hunyuan-TurboS** | Speed-sensitive applications | -- | -- | Fast, cheaper |
| **Hunyuan-a13b** | Broad compatibility | 224K | 32K | MoE structure (80B total, 13B active). Supports fast/slow thinking toggle via `/no_think` prefix. Strong on math, science, long context, and agent tasks. |
| **Hunyuan-lite** | Prototyping | -- | -- | Free, no usage cost |

### Specialized Models

- **Hunyuan-translation**: 33 languages plus 5 minority languages. Won WMT25 for 30 language pairs.
- **Hunyuan-large-role**: Purpose-built for character roleplay, AI companions, and digital twins. Trained on high-quality roleplay dialogue data to reduce "out of character" failures.
- **Hunyuan-embedding**: Vector embeddings for search and retrieval.

### Vision Models

- **Tencent HY Vision 1.5 Instruct**
- **Hunyuan-turbos-vision**
- **Hunyuan-t1-vision**
- **Hunyuan-turbos-vision-video**

The vision models handle image understanding and video analysis. Token cost for images scales with resolution: `token = h/32 * (w/32 + 1) + 2`.

## Pricing (Updated March 2026)

Pricing is in CNY per million tokens, split between input and output:

| Model | Input | Output |
|---|---|---|
| Tencent HY 2.0 Think (up to 32K) | ¥3.975 | ¥15.90 |
| Tencent HY 2.0 Think (32K-128K) | ¥5.30 | ¥21.20 |
| Tencent HY 2.0 Instruct (up to 32K) | ¥3.18 | ¥7.95 |
| Hunyuan-T1 | ¥1.00 | ¥4.00 |
| Hunyuan-TurboS | ¥0.80 | ¥2.00 |
| Hunyuan-a13b | ¥0.50 | ¥2.00 |
| Hunyuan-embedding | ¥0.70 | ¥0.70 |

**Free tier:** All registered users get 1 million shared tokens across Hunyuan-T1, TurboS, a13b, vision, and embedding models. Hunyuan-lite is completely free with no usage cap.

For reference, ¥1 is roughly $0.14 USD. At ¥0.50/million input tokens, Hunyuan-a13b is significantly cheaper than most Western equivalents.

**Concurrency:** Default 5 concurrent requests per account. Additional concurrency costs ¥800/concurrency/month.

## OpenAI Compatibility

Tencent has put real effort into making the API feel familiar. If you have existing OpenAI SDK code, switching to Hunyuan requires changing two things:

```python
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("HUNYUAN_API_KEY"),
    base_url="https://api.hunyuan.cloud.tencent.com/v1",
)

completion = client.chat.completions.create(
    model="hunyuan-turbos-latest",
    messages=[{"role": "user", "content": "Say this is a test."}],
    extra_body={"enable_enhancement": True},
)
```

Supported across Python, Node.js, Go, and cURL. The API supports streaming via SSE, function calling, tool use, web search augmentation, and media output (multimedia mode, currently whitelisted).

## Features Worth Noting

- **Search augmentation**: Models can be enhanced with web search results. The `EnableEnhancement` flag adds retrieval-augmented generation to responses. Newer models support "fast search" mode for lower latency.
- **Streaming moderation**: Content moderation can run in-stream, flagging sensitive content as it generates rather than blocking the whole response. This is a notable feature for production deployments in regulated markets.
- **Function calling**: Full tool/function call support on TurboS, T1, and functioncall-specialized models. Standard OpenAI-compatible tool schemas.
- **Thinking mode toggle**: The a13b model supports a fast/slow thinking switch. Prefix your query with `/no_think` for fast responses, or leave it enabled for deep reasoning.
- **Roleplay model**: The dedicated `hunyuan-large-role` model is unusual. Most providers offer generic models with roleplay prompting; Tencent built a standalone model trained specifically for character consistency.

## Who Is This For?

**Primary audience:** Developers building for the Chinese market or needing Chinese-language AI capabilities. Tencent Cloud's ecosystem (WeChat integration, Mini Programs, enterprise tools) makes Hunyuan a natural fit for China-focused applications.

**Secondary audience:** Cost-sensitive developers looking for competitive pricing. The free tier is genuinely useful for prototyping, and the paid rates undercut most Western providers.

**Caution:** Documentation is primarily in Chinese. The API supports English inputs and outputs, but onboarding requires navigating Chinese-language docs, a Tencent Cloud account with Chinese identity verification for some features, and a payment method that works with Tencent's billing system.

## Verdict

Hunyuan is a serious platform hiding in plain sight. The model lineup is unusually complete, the OpenAI compatibility is genuine, and the pricing is aggressive. The main barrier is the China-centric onboarding experience, which is a real obstacle for Western developers.

If you are already operating in the Tencent Cloud ecosystem, this is a no-brainer. If you are evaluating Chinese AI APIs for international projects, Hunyuan deserves a spot on your shortlist alongside Alibaba's QWEN API and Baidu's Wenxin.

---

## Quick Start

- **API Console**: https://hunyuan.cloud.tencent.com
- **API Docs**: https://cloud.tencent.com/document/product/1729
- **OpenAI-compat Docs**: https://cloud.tencent.com/document/product/1729/111007
- **Pricing**: https://cloud.tencent.com/document/product/1729/97731
- **SDK**: Available for Python, Node.js, Go, Java via Tencent Cloud SDK repositories
- **API Endpoint**: `hunyuan.tencentcloudapi.com` (Tencent Cloud API) or `api.hunyuan.cloud.tencent.com/v1` (OpenAI-compatible)
