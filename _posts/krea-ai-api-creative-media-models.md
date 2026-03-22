---
title: "Krea AI API: 40+ Image and Video Models Through a Single REST Endpoint"
excerpt: "Krea AI offers a unified API to access 40+ generative AI models for image creation, video generation, upscaling, and LoRA training with serverless GPU inference and per-model compute pricing."
coverImage: "/assets/blog/krea-ai-api-cover.jpg"
date: 2026-03-17T17:41:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/krea-ai-api-cover.jpg"
---

## TL;DR

Krea AI provides a REST API aggregating 40+ generative models spanning image generation, video creation, upscaling to 22K resolution, and custom LoRA training. Instead of managing separate integrations with each provider, developers call a single endpoint and swap models per request. Pricing is compute-unit based, with individual model costs ranging from $0.03 to $0.51 per output.

## The Problem

The generative AI landscape has fractured into dozens of specialized model providers, each with their own API, SDK, billing system, and quirks. A creative pipeline that uses Flux for initial generation, Topaz for upscaling, Kling for video, and a custom LoRA for brand consistency means four separate accounts, four different authentication schemes, and four billing cycles. For teams building products on top of generative models, the integration tax alone is substantial. And the model landscape shifts fast: what was state-of-the-art last month may be obsolete today.

## What Krea Built

Krea operates as a model aggregation layer at [krea.ai](https://www.krea.ai). The core value proposition is straightforward: one API token, one endpoint pattern, access to the best generative models across providers without maintaining individual integrations.

### Text-to-Image API

The image generation endpoint covers 20+ models including Flux, Imagen 4, Nano Banana 2, Ideogram 3.0, Flux Kontext, Seedream, and ChatGPT Image. Developers hit a single POST endpoint and specify the model in the URL path:

```
curl -X POST https://api.krea.ai/generate/image/bfl/flux-1-dev \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "a serene mountain landscape at sunset", "width": 1024, "height": 576, "steps": 28}'
```

The response returns a job ID. Results are fetched via a polling endpoint or delivered via webhook when complete. This job-based pattern keeps the API responsive regardless of model inference time.

### Video Generation API

The video endpoint aggregates models that often have limited public API access elsewhere: Veo 3, Veo 3.1, Kling 2.6, Sora 2, Runway Gen-4.5, Hailuo 2.3, Wan 2.5, and others. Text-to-video and image-to-video workflows are supported, with pricing measured per second of generated video. This is notable because several of these models (Veo 3, Sora 2) do not offer straightforward public API access outside their native platforms.

### Image Upscaling API

Krea exposes three Topaz-powered upscaling modes via its API:

- **Standard** — Clean upscaling for general enhancement ($0.10 per image)
- **Bloom** — Stylized detail addition during upscale ($0.51 per image)
- **Generative** — Adds new detail at scale for maximum resolution ($0.27 per image)

The system supports output up to 22K resolution, aimed at print-ready and high-resolution product imagery use cases.

### LoRA Training API

For teams that need brand-specific output, Krea offers LoRA fine-tuning directly through the API. Upload a set of images, train a custom model on Flux, and reference it in generation requests. This closes the loop for production pipelines that need consistent visual identity across thousands of generated assets.

### Visual Workflow Editor

Krea also provides a node-based visual editor for chaining models together without writing code. Connect generation to upscaling, feed outputs into video, or run batch jobs with branching logic. Once a workflow is assembled visually, it can be deployed as a callable API endpoint.

## Model Pricing

Krea uses a compute-unit system, but each model has a listed per-output cost for straightforward budgeting:

**Image Models (per image):**
- Flux — $0.04
- Flux 1.1 Pro — $0.06
- Flux Kontext — $0.04
- Imagen 4 — $0.04
- Imagen 4 Ultra — $0.06
- Nano Banana 2 — $0.06
- Nano Banana Pro — $0.15
- ChatGPT Image — from $0.03
- Ideogram 3.0 — $0.06
- Seedream 5 Lite — $0.04

**Video Models (per second):**
- Wan 2.5 — from $0.05
- Kling 2.6 — $0.07
- Sora 2 — $0.10
- Runway Gen-4.5 — $0.12
- Veo 3 — $0.20
- Veo 3.1 — $0.20
- Hailuo 2.3 — from $0.28 per video
- Veo 2 — $0.50

**Enhancement Models (per image):**
- Topaz — $0.10
- Topaz Generative — $0.27
- Topaz Bloom — $0.51

The per-model pricing makes cost comparison straightforward, though the actual charge is in compute units that correspond to these rates.

## Developer Experience

Krea ships code examples in Python, Node.js, Go, and cURL, plus an OpenAPI spec for code generation. Multi-language SDKs are available. The API supports webhooks via an `X-Webhook-URL` header, eliminating polling loops in production. API tokens are managed at krea.ai/settings/api-tokens.

## Platform Context

Krea claims over 10 million users on its creative platform. The company positions itself as both a consumer-facing creative studio and an API-first provider. The platform includes tools beyond what the API exposes directly: real-time image generation, 3D object creation, motion transfer, frame interpolation, and video style transfer, many of which are available through the web interface.

The addition of Nano Banana 2 (Google DeepMind's latest image model, released February 2026) to Krea's API is worth noting. The model supports clean multilingual text rendering in images, holds up to five characters and fourteen objects in a single scene, and outputs up to 4K resolution, capabilities that were previously limited to closed platforms.

## What's Still Unclear

Several questions remain for developers evaluating the API:

- **Latency guarantees.** Published model response times range from 4 seconds (Flux) to 5 minutes (Veo 3), but there is no mention of SLA-backed uptime or latency commitments for the API gateway itself.
- **Rate limits.** The documentation does not specify per-minute or per-hour rate limits on API calls, which matters for production burst workloads.
- **Data handling.** No clear documentation on whether uploaded images for LoRA training or generated content are retained, used for model improvement, or automatically purged.
- **Enterprise terms.** Krea mentions a "Contact Sales" path for enterprise, but the specifics of custom pricing, dedicated capacity, or private model hosting are not published.

## The Bottom Line

Krea's API is positioned as a consolidation play for developers who want model diversity without integration overhead. The breadth of 40+ models spanning image, video, and upscaling is genuinely wide, and per-model transparent pricing makes it easier to budget than opaque compute-unit systems elsewhere. The weak spots are predictability: without published rate limits, SLAs, or clear data retention policies, it reads as a product better suited to prototyping and mid-scale production than mission-critical infrastructure. For teams building creative products that need to swap models frequently as the landscape evolves, the single-endpoint approach is pragmatic, just know what you are trading off in exchange for that convenience.
