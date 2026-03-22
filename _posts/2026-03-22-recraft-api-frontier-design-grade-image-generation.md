---
title: "Recraft API: Frontier Design-Grade Image Generation With Production Vector Output"
excerpt: "Recraft's API delivers designer-quality image generation across three model generations, from photorealistic raster to production-ready SVG vectors, all through an OpenAI-compatible endpoint."
coverImage: "/assets/blog/recraft-api-cover.png"
date: 2026-03-22T12:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/recraft-api-cover.png"
---

Most AI image APIs treat design as an afterthought. You get a raster square, a vague aesthetic, and prayers for usable text rendering. Recraft takes a different approach, and the numbers back it up.

The London-based company's API serves production image generation across three model generations, eight distinct models, and the only production-grade vector generation endpoint in the market. Their V3 models ranked first on the Hugging Face Text-to-Image leaderboard for five consecutive months. In February 2026, they shipped V4, a ground-up rebuild with 4MP output on the Pro tier.

## The Design Problem Nobody Talks About

The AI image space is crowded with API providers offering variations on the same theme: Stable Diffusion wrappers, DALL-E endpoints, Midjourney clones. The problem is not generation, it is generation that works in a production design pipeline. Most outputs fail on three counts: text rendering (broken labels, garbled logos), vector readiness (everything is a raster), and brand consistency (no way to lock a visual style programmatically).

Recraft was built for designers before it was built for developers. That origin story matters. The models were trained on design-centric data, not internet scrapes with design as a statistical minority.

## What the API Actually Offers

The endpoint structure is straightforward. `POST https://external.api.recraft.ai/v1/images/generations` is the primary generation call, and it is fully compatible with the OpenAI Python library. Swap the base URL, plug in your key, and you are running.

```python
from openai import OpenAI

client = OpenAI(
    base_url='https://external.api.recraft.ai/v1',
    api_key='YOUR_RECRAFT_API_TOKEN',
)

response = client.images.generate(
    prompt='minimalist product shot, ceramic mug on marble surface',
    model='recraftv4',
    size='1:1',
)
print(response.data[0].url)
```

The full endpoint list goes well beyond basic generation:

- **Generate Image** (POST `/v1/images/generations`) — raster and vector from a text prompt
- **Image to Image** (POST `/v1/images/imageToImage`) — transform an existing image with a prompt and strength parameter
- **Inpainting** (POST `/v1/images/inpainting`) — modify specific regions
- **Background Removal** (POST `/v1/backgrounds`) — automated background stripping
- **Background Generation** (POST `/v1/backgrounds`) — create new backgrounds
- **Style Creation** (POST `/v1/styles`) — upload reference images, get a reusable style ID
- **Image Vectorization** — convert raster to SVG
- **Upscaling** — crisp and creative variants
- **Erase Region** — targeted removal
- **Variate Image** — generate variations

## Model Matrix

Recraft organizes its models into three generations with both raster and vector variants:

| Model | Type | Resolution | Best For |
|-------|------|-----------|----------|
| Recraft V4 | Raster | 1MP (1024x1024) | Daily work, fast iteration |
| Recraft V4 Pro | Raster | 4MP (up to 2688x1536) | Print-ready, large-scale |
| Recraft V4 Vector | Vector (SVG) | Scalable | Logos, icons, scalable assets |
| Recraft V4 Pro Vector | Vector (SVG) | Scalable | Production vector, complex detail |
| Recraft V3 | Raster | 1MP | Photorealism, text rendering |
| Recraft V3 Vector | Vector (SVG) | Scalable | Line art, engraving, vector illustration |
| Recraft V2 | Raster | 1MP | General purpose |
| Recraft V2 Vector | Vector (SVG) | Scalable | Icons, doodles, basic vector |

V4 supports prompts up to 10,000 characters, a tenfold increase over V3 and V2 (1,000 characters). V3 and V2 models support negative prompts, style references, and the full controls parameter set. V4 does not yet support custom styles via the API.

## Pricing That Makes Sense

Recraft uses a prepaid API unit system at a fixed rate: 1,000 units per USD $1.00. No subscription required for API access, no monthly commitments. You buy units, they do not expire, and they are deducted per operation.

Key per-image costs:

| Service | Cost (USD) | API Units |
|---------|-----------|-----------|
| Raster V4 | $0.04 | 40 |
| Raster V4 Pro | $0.25 | 250 |
| Vector V4 | $0.08 | 80 |
| Vector V4 Pro | $0.30 | 300 |
| Raster V3 | $0.04 | 40 |
| Raster V2 | $0.022 | 22 |
| Background Removal | $0.01 | 10 |
| Image Vectorization | $0.01 | 10 |
| Upscale (Crisp) | $0.004 | 4 |

For context, Recraft V4 at $0.04 per raster image undercuts most competitors offering comparable quality. The vector generation at $0.08 for V4 Vector is the standout, given that no other major API provider offers native SVG output at this scale.

## Authentication and Rate Limits

Authentication is standard Bearer token. Generate your key in the Recraft profile dashboard (requires a positive API unit balance). Multiple tokens are allowed, all drawing from the same balance pool.

Rate limits are set at **100 images per minute** per user, with a secondary limit of **5 requests per second**. Generated images are stored for approximately 24 hours and are accessible via cryptographically signed URLs without authentication.

## The Vector Advantage

This is where Recraft occupies a genuine gap in the market. Every major image generation API (OpenAI, Stability, Midjourney) outputs raster. If you need SVG for a logo, icon, or scalable illustration, you are either hiring a designer or running your output through a vectorization tool, which produces mediocre results from AI-generated rasters.

Recraft's vector models generate SVG directly. The paths are clean, the shapes are intentional, and the output is immediately editable in Illustrator or Figma. For product teams building design tools, asset generators, or brand automation pipelines, this is a material shortcut.

## Styles and Brand Consistency

The style system works in two tiers. Curated styles are built into the model and accessible by name (Photorealism, Vector art, Hand-drawn, Punk Graphic, and dozens more). Custom styles are created by uploading 1 to 5 reference images, which Recraft uses to build a reusable style profile.

Custom style creation costs 40 API units per request and returns a style ID. That ID can be used in subsequent API calls to maintain visual consistency across generations. This is a practical approach for teams that need on-brand output without fine-tuning or prompt engineering a specific aesthetic into every request.

One caveat: custom styles are currently supported only on V3 and V3 Vector models. V4 styles are not yet available through the API.

## MCP Integration

Recraft also offers a Model Context Protocol (MCP) integration, allowing their generation capabilities to plug into MCP-compatible agents and workflows. The MCP server exposes the same generation, editing, and style tools, making it straightforward to wire Recraft into automated design pipelines or agentic systems that need visual output.

## How It Compares

| Feature | Recraft | OpenAI DALL-E | Stability API |
|---------|---------|---------------|---------------|
| Vector output (SVG) | Yes | No | No |
| Custom styles | Yes | No | Via fine-tuning |
| Background removal | Yes | No | No |
| Image-to-image | Yes | No | Yes |
| Inpainting | Yes | No | Yes |
| Price per image | $0.022-$0.30 | $0.04-$0.08 | $0.006-$0.03 |
| Max resolution | 4MP (Pro) | ~4MP | Varies |
| OpenAI lib compatible | Yes | Native | No |

The vector output alone differentiates Recraft from every major competitor. The style system and background tools round out a platform that covers significantly more of the design workflow than a pure generation endpoint.

## Who Should Use This

Product teams building design tools, e-commerce platforms needing automated asset generation, marketing teams requiring brand-consistent visuals at scale, and developers who need production-ready images they can actually hand to a designer without apology. The OpenAI-compatible interface means integration effort is minimal if you are already working with that pattern.

Recraft is not trying to be a general-purpose image API. It is a design-focused platform with a developer interface, and that specificity shows in the output quality.

---

*API documentation: [docs.recraft.ai](https://www.recraft.ai/docs)*  
*Swagger playground: [external.api.recraft.ai/doc](https://external.api.recraft.ai/doc/#/)*  
*Pricing calculator: [recraft.ai/pricing](https://www.recraft.ai/pricing?tab=api)*
