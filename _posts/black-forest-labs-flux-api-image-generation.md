---
title: "Black Forest Labs FLUX API: Production-Grade AI Image Generation for Developers"
excerpt: "Black Forest Labs offers the FLUX family of image generation models via API, from sub-second Klein to maximum-quality Max, with multi-reference editing and real-time grounding search."
coverImage: "/assets/blog/bfl-flux-cover.jpg"
date: 2026-03-16T22:31:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/bfl-flux-cover.jpg"
---

## TL;DR

Black Forest Labs provides API access to their FLUX image generation models, spanning sub-second inference at $0.014 per image to maximum-quality output with web-grounded generation. The platform covers text-to-image, image editing, inpainting, outpainting, and multi-reference composition.

## The Problem

Most image generation APIs force developers into a binary choice: fast and cheap but mediocre quality, or stunning output that takes forever and costs a fortune. There is rarely a clean upgrade path. You pick one model, live with its tradeoffs, and bolt on separate services when you need editing, inpainting, or reference-guided generation. The fragmentation is real, and it gets worse at scale.

## What Black Forest Labs Built

Black Forest Labs (BFL), founded by researchers who previously worked on Stable Diffusion, launched the FLUX model family to cover the full spectrum of image generation needs through a single API. Their current lineup includes two major generations: FLUX.1 and FLUX.2.

### FLUX.2: The Current Flagship

FLUX.2 splits into four tiers, each tuned for a different use case:

- **[klein] 4B** -- A 4-billion parameter model designed for real-time, high-volume generation. Starts at $0.014 per image with megapixel-based pricing. Ideal for applications where latency matters more than perfection: live previews, interactive tools, rapid prototyping.
- **[klein] 9B** -- The 9-billion parameter sibling, balanced between speed and quality at $0.015 per image. A solid default for production workloads.
- **[pro]** -- The production workhorse at $0.03 per image for text-to-image, $0.045 for editing. Designed for fast turnaround with consistent, reliable quality.
- **[flex]** -- Fine-grained control over generation parameters at $0.05 per image. When you need to dial in specifics beyond a prompt.
- **[max]** -- Maximum quality with grounding search. This model can search the web in real-time to generate images of current events, live weather conditions, or recent sports results. The standout feature that separates BFL from most competitors.
- **[dev]** -- Free for local development and non-commercial use. Open-weight, available on Hugging Face.

### FLUX.1: The Proven Generation

The FLUX.1 models remain available and well-documented:

- **FLUX 1.1 [pro]** at $0.04 per image, the standard text-to-image baseline.
- **FLUX 1.1 [pro] Ultra** at $0.06 for up to 4MP resolution output.
- **FLUX 1.1 [pro] Raw** at $0.06 for candid photography aesthetics.
- **FLUX.1 Kontext [pro]** and **[max]** at $0.04 and $0.08 respectively, combining text and image inputs for creation and editing.
- **FLUX.1 Fill [pro]** at $0.05 for text-driven inpainting with mask support.

## Key Capabilities

**Multi-Reference Editing.** FLUX.2 can reference up to 10 source images simultaneously while maintaining identity consistency across compositions. This is useful for generating ad variants with consistent faces, product mockups in new contexts, or editorial content where character appearance must remain stable.

**Inpainting and Outpainting.** The Fill models support mask-based editing. You supply an image and either use its alpha channel or submit a separate mask, then describe what should fill the masked region. The Expand endpoint adds pixels to any side of an image while maintaining visual coherence.

**Grounding Search.** FLUX.2 [max] can query the web during generation. Ask it to generate an image of "yesterday's Champions League score" or "the current weather in Berlin" and it pulls real-time data to produce an accurate visual. This is a genuinely unusual capability in the image generation space.

## Getting Started

The setup is straightforward:

1. Create an account at [dashboard.bfl.ai](https://dashboard.bfl.ai).
2. Add credits (1 credit = $0.01 USD) via Stripe.
3. Generate an API key from your project's API > Keys section.
4. Set `BFL_API_KEY` in your environment.
5. Make your first call to any model endpoint.

The API is REST-based with straightforward POST requests. Each generation returns a polling URL; you check the result asynchronously. This pattern is standard for image generation APIs where processing time varies.

## Developer Experience

BFL provides organizations and projects for team management, usage tracking per project, and credit-based billing shared across all projects in an org. Batch pricing is available for high-volume workloads. The playground at [playground.bfl.ai](https://playground.bfl.ai) lets you test FLUX.2 [max], [pro], and [flex] before committing to an API integration.

The documentation is clean, hosted on Mintlify, and includes an LLM-friendly text index at `docs.bfl.ml/llms.txt` for AI-assisted development workflows.

## Pricing Summary

| Tier | Model | Price per Image |
|------|-------|----------------|
| Real-time | FLUX.2 [klein] 4B | from $0.014 |
| Balanced | FLUX.2 [klein] 9B | from $0.015 |
| Production | FLUX.2 [pro] | from $0.03 |
| Control | FLUX.2 [flex] | $0.05 |
| Quality | FLUX.2 [max] | Variable |
| Editing | FLUX.1 Kontext [pro] | $0.04 |
| Inpainting | FLUX.1 Fill [pro] | $0.05 |

Klein models use megapixel-based pricing: the first megapixel is a flat rate, each additional MP adds incrementally.

## The Competitive Landscape

BFL sits in a crowded market alongside Stability AI, Midjourney (limited API), OpenAI's DALL-E, and various inference providers. Their differentiators are the grounding search capability in FLUX.2 [max], the multi-reference editing pipeline, and the open-weight [dev] model for local experimentation. The pricing is competitive, especially at the Klein tier where per-image costs drop below two cents.

The main question for developers is whether the grounding search and multi-reference editing justify BFL over simpler, cheaper alternatives. For production applications that need more than basic text-to-image, the answer is probably yes.

## Sources

- [BFL Documentation](https://docs.bfl.ml)
- [BFL Dashboard](https://dashboard.bfl.ai)
- [BFL Playground](https://playground.bfl.ai)
- [BFL Pricing](https://bfl.ai/pricing)
