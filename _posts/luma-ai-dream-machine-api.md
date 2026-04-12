---
title: "Luma AI Dream Machine API: Production-Grade AI Video and Image Generation"
excerpt: "Luma AI's Dream Machine API brings Ray2 video generation and Photon image models to developers through a clean REST interface, supporting resolutions up to 4K with camera controls, looping, and character consistency features."
coverImage: "/assets/blog/luma-ai-cover.jpg"
date: 2026-03-21T21:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/luma-ai-cover.jpg"
---

## TL;DR

Luma AI offers a developer API called Dream Machine that provides access to their frontier video generation models (Ray2, Ray2 Flash) and image generation models (Photon, Photon Flash). The API supports text-to-video, image-to-video, text-to-image, image references, style references, and character consistency. Resolutions range from 540p to 4K. Authentication is via a simple Bearer token, and SDKs are available for Python and JavaScript.

## The Problem

Generating high-quality AI video has historically required either using consumer-facing web apps with limited controls, running open-source models on your own GPU infrastructure, or cobbling together multiple tools for different stages of a pipeline. None of these approaches scale well for product teams building video or image features into their own applications. You need an API that handles model serving, queuing, and rendering while giving you granular control over motion, style, and composition.

## What Luma AI Offers

Luma AI is a San Francisco-based research lab focused on multimodal generative intelligence. Their flagship consumer product is Dream Machine, a video generation tool that gained significant traction after its initial release. The company has since built out a full API layer for developers who want to integrate Luma's generation capabilities into their own products.

The API centers around two model families:

**Ray2 (Video Generation)**
- Text-to-video from natural language prompts
- Image-to-video by providing a keyframe URL
- Supports resolutions at 540p, 720p, 1080p, and 4K
- Configurable duration (5 seconds standard)
- Aspect ratios: 16:9, 9:16, 1:1, 3:4, 4:3
- Loop generation for seamless repeating video
- Cinematic concepts (dolly zoom, tracking shots, etc.) via a concepts API
- Keyframe control at frame0 or frame1 for precise animation anchoring

**Photon / Photon Flash (Image Generation)**
- Text-to-image with full prompt control
- Image reference guidance (up to 4 reference images with adjustable weight)
- Style reference for applying specific aesthetic styles
- Character reference for maintaining consistent identity across generations (up to 4 reference photos per identity)
- Aspect ratios from 1:1 to 21:9
- Image-to-image modification support

## Getting Started

Getting an API key is straightforward. Head to the Dream Machine API keys page, grab your key, and start making requests. Authentication uses a standard Bearer token pattern:

```
Authorization: Bearer luma-xxxx
```

A basic image generation request looks like this:

```bash
curl --request POST \
  --url https://api.lumalabs.ai/dream-machine/v1/generations/image \
  --header 'accept: application/json' \
  --header 'authorization: Bearer luma-xxxx' \
  --header 'content-type: application/json' \
  --data '{
  "prompt": "A teddy bear in sunglasses playing electric guitar and dancing",
  "aspect_ratio": "3:4",
  "model": "photon-1"
}'
```

For video generation:

```bash
curl --request POST \
  --url https://api.lumalabs.ai/dream-machine/v1/generations \
  --header 'accept: application/json' \
  --header 'authorization: Bearer luma-xxxx' \
  --header 'content-type: application/json' \
  --data '{
  "prompt": "an old lady laughing underwater, wearing a scuba diving suit",
  "model": "ray-2",
  "resolution": "720p",
  "duration": "5s"
}'
```

Both image and video generation are asynchronous. You submit a request, receive a generation ID, then poll for completion. The response includes a URL to the finished asset when ready.

## SDKs and Integration

Luma provides official SDKs for Python and JavaScript, covering both image and video generation workflows. The Python SDK handles authentication, request construction, and polling, making it straightforward to integrate into server-side applications or data pipelines.

```
pip install lumaai
```

The JavaScript SDK works similarly for frontend or Node.js applications.

## Model Variants and Speed Tiers

Each model family includes a standard and a speed-optimized variant:

| Model | Type | Speed Tier |
|-------|------|------------|
| Ray 2 | Video | Standard quality |
| Ray 2 Flash | Video | Faster, lower cost |
| Photon 1 | Image | Standard quality |
| Photon Flash 1 | Image | Faster, lower cost |

The Flash variants trade a small amount of quality for significantly faster generation times and lower credit costs, making them suitable for high-throughput or latency-sensitive applications.

## Pricing

Luma uses a credit-based billing system. Each API call consumes credits based on the model, resolution, and duration selected. Exact credit costs are managed through the billing dashboard at lumalabs.ai/dream-machine/api/billing/overview. Two tiers are available:

- **Build tier**: Pay-as-you-go credit billing, suitable for prototyping and low-to-moderate volume.
- **Scale tier**: Monthly invoicing with higher rate limits and dedicated engineering support from the Luma team.

## Unique Features Worth Noting

**Character Reference**: This is one of Luma's strongest differentiators. By providing up to 4 photos of a person, you can generate consistent character representations across different scenes and prompts. For teams building character-driven content (advertising, storytelling, game assets), this eliminates the need for external identity consistency tools.

**Cinematic Concepts API**: The `/generations/concepts/list` endpoint exposes a catalog of pre-built camera movements and cinematic techniques that can be applied to video generations. Rather than describing "a slow zoom-out with slight camera shake" in a prompt, you can reference a named concept directly.

**Looping**: Video generations can be set to loop seamlessly, which is useful for social media content, website backgrounds, and interactive displays.

## Limitations

- Image inputs must be hosted on a CDN and passed as URLs. There is no direct file upload endpoint, so you need to handle that part of the pipeline yourself.
- The API is generation-focused only. There is no built-in editing, compositing, or post-processing pipeline. Those workflows need to happen externally.
- Video duration defaults to 5 seconds. Longer-form video requires stitching multiple generations together.

## Verdict

Luma's Dream Machine API occupies a specific and valuable niche: high-quality AI video generation with enough developer control to build real products around. The character reference and cinematic concepts features set it apart from more generic generation APIs. If your product needs AI-generated video with consistent characters and cinematic quality, this is one of the strongest options available today.

The API is clean, well-documented, and the SDKs lower the barrier to entry. The credit-based pricing is predictable enough for product planning, and the Scale tier handles the support needs of larger deployments.

- **Website**: [lumalabs.ai](https://lumalabs.ai)
- **API Docs**: [docs.lumalabs.ai](https://docs.lumalabs.ai)
- **API Keys**: [lumalabs.ai/dream-machine/api/keys](https://lumalabs.ai/dream-machine/api/keys)
- **Python/JavaScript SDKs**: Available via the documentation site
