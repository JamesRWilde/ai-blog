---
title: "LTX-2: Lightricks Goes All-In on Open-Source AI Video Generation"
excerpt: "Lightricks releases LTX-2, an open-source AI video generation model that produces synchronized audio and video at up to 4K resolution, with API access starting at $0.04 per second."
coverImage: "/assets/blog/ltx-video-cover.jpg"
date: 2026-03-22T05:36:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/ltx-video-cover.jpg"
---

## TL;DR

Lightricks, the company behind Facetune and Videoleap, has released LTX-2 — a 22-billion-parameter open-source video generation model that generates synchronized audio and video in a single pass. It supports native 4K at 50 FPS, runs on consumer GPUs, and offers a paid API starting at $0.04 per second. The model weights are open-source under Apache 2.0, making it one of the most capable freely available video generation systems available to developers.

---

## What LTX-2 Actually Is

LTX-2 is a Diffusion Transformer (DiT) that generates video and audio simultaneously, not as separate passes stitched together. The 22-billion-parameter model takes text prompts, static images, or existing video as input and outputs MP4 files with synchronized motion and sound.

This is the third generation of Lightricks' LTX-Video line, and the jump from the previous LTXV 0.9.8 is significant. Where the earlier model handled video-only generation, LTX-2 adds audio synthesis that aligns with the visual content — dialogue timing, ambient sound, and music all flow from the same forward pass.

Key specifications:

- **Architecture:** Diffusion Transformer (DiT) with sparse Mixture-of-Experts
- **Parameters:** 22 billion total
- **Max resolution:** Native 4K (3840x2160) at 50 FPS
- **Max duration:** 10 seconds with synchronized audio
- **Input types:** Text prompts, images, video, depth maps, reference footage
- **Output:** MP4 video with embedded audio
- **License:** Open-source (Apache 2.0 for model weights)

## The API: Three Tiers of Quality

LTX-2 offers API access through `api.ltx.video` with three model tiers:

**ltx-2-fast** — Speed-optimized for previews and high-throughput use cases. Generates 1080p video at $0.04 per second of output. Best for rapid prototyping, mobile apps, and batch content generation.

**ltx-2-pro** — Balanced quality and speed. Same resolutions available, priced at $0.06 per second at 1080p. The target for marketing teams and daily production workflows.

**ltx-2-3-pro / ltx-2-3-fast** — The latest model variants that add vertical video support (portrait orientation). Same pricing structure, with the added flexibility of 1080x1920 and 2160x3840 output.

The **Ultra** tier for maximum fidelity is listed as "coming soon" — this is expected to deliver full 4K at 50 FPS with synchronized audio for cinematic production.

### Pricing at a Glance

| Model | 1080p | 1440p | 4K |
|-------|-------|-------|-----|
| ltx-2-fast | $0.04/sec | $0.08/sec | $0.16/sec |
| ltx-2-pro | $0.06/sec | $0.12/sec | $0.24/sec |
| ltx-2-3-fast | $0.04/sec | $0.08/sec | $0.16/sec |
| ltx-2-3-pro | $0.06/sec | $0.12/sec | $0.24/sec |

A 5-second 1080p video costs $0.20 on fast or $0.30 on pro. That undercuts Runway and Pika on a per-second basis for comparable quality.

## Getting Started: The Developer Experience

Authentication works via API key from the developer console at `console.ltx.video`. A text-to-video call is straightforward:

```bash
curl -X POST https://api.ltx.video/v1/text-to-video \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A majestic eagle soaring through clouds at sunset",
    "model": "ltx-2-3-pro",
    "duration": 8,
    "resolution": "1920x1080"
  }' \
  -o video.mp4
```

The API returns the MP4 directly in the response body — no polling, no job IDs, no separate download step. Image-to-video follows the same pattern, accepting an image URL plus a text prompt describing the desired motion.

Additional endpoints include **extend** (lengthen an existing clip), **retake** (re-generate a section), and **audio-to-video** (generate visuals from an audio track).

## Open-Source: The Real Differentiator

The paid API is only half the story. Lightricks has released the full model weights and code on GitHub under Apache 2.0, which means:

- **Self-hosting:** Run LTX-2 on your own infrastructure without per-second API charges
- **Fine-tuning:** LoRA adapters, IC-LoRA for image conditioning, and full training scripts are available
- **ComfyUI integration:** Built into ComfyUI core for node-based visual workflows
- **Community extensions:** Control models for depth, pose, and canny edge guidance are already released

The 2B distilled variant runs on an iPhone with 4GB of RAM. The full 13B model requires a high-end GPU but produces substantially better output. The multi-scale pipeline lets you run a fast low-res preview (3 seconds on an H100) and then upscale to full quality.

## How It Compares

LTX-2 enters a crowded field. Here's how it stacks up against the major competitors on API pricing and capabilities:

**Runway Gen-3:** Higher quality for cinematic work, but closed-source and more expensive. No synchronized audio generation. API pricing is roughly 2-3x LTX-2 for comparable durations.

**Pika 2.0:** Strong at short stylized clips but limited to shorter durations. No native audio. LTX-2's 10-second clips with audio give it a clear edge for narrative content.

**Kling AI:** Competitive on video quality but proprietary. LTX-2's open-source availability makes it more attractive for developers who want customization control.

**Stability AI (Stable Video):** Also open-source, but LTX-2's integrated audio generation and 4K output represent a generational step forward.

The audio sync is the genuine novelty here. Most video generation models treat audio as a separate post-processing step. LTX-2 generates both simultaneously, which eliminates timing drift between dialogue and lip movement or between music and visual pacing.

## What's Missing

Intellectual honesty time. LTX-2 has real limitations:

- **Duration cap:** 10 seconds maximum. For longer-form content, you need to chain extensions, which introduces visible seams.
- **Ultra tier:** Not yet available. The highest quality tier (4K at 50 FPS) is still in rollout.
- **Consistency:** Like all current video generation models, character and object consistency across multiple generations remains imperfect.
- **Audio quality:** The synchronized audio is functional but not production-grade for music or complex dialogue scenes. It works best for ambient sound and simple narration.

The open-source community is moving fast on these gaps, but nobody in the space has fully solved them yet.

## Bottom Line

LTX-2 is the most credible open-source video generation API available right now. The combination of synchronized audio, 4K output, and Apache 2.0 licensing makes it a serious option for developers building video-focused applications. The API pricing is competitive, the self-hosting option eliminates cost concerns at scale, and the ComfyUI integration lowers the barrier for creative professionals.

For developers evaluating video generation APIs, LTX-2 is worth a serious look — particularly if you need audio-visual output without paying Runway prices.

**Try it:** [ltx.studio](https://ltx.studio) | **API docs:** [docs.ltx.video](https://docs.ltx.video) | **GitHub:** [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video)
