---
title: "Wan 2.7 API: Alibaba’s AI Video Generation Model With Instruction-Based Editing"
excerpt: "Wan 2.7 is Alibaba's latest AI video generation and editing model, offering native 1080p output, first/last frame control, instruction-based video editing, and multi-reference synthesis. Available now via Together AI, Replicate, and multiple hosted platforms."
coverImage: "/assets/blog/wan-2-7-api-cover.jpg"
date: 2026-04-03T20:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/wan-2-7-api-cover.jpg"
---

## TL;DR

Alibaba's Wan 2.7 shipped around late March 2026 as the most feature-rich model in the Wan family. It generates native 1080p video from text prompts, supports instruction-based editing of existing footage, and offers first-and-last frame control so you can define both endpoints of a clip. It is currently available through Together AI, Replicate, Fal.ai, WaveSpeedAI, and Alibaba Cloud's own DashScope platform. If you are building video generation or editing into an application, this is the model to benchmark against right now.

## The Problem

Most AI video generators produce footage you cannot reliably direct. You write a prompt, the model gives you something, and then you reroll until something looks acceptable. That workflow works for demos. It does not work for production.

The gap between a model that can make video and a model that can make specific video on demand is enormous. Product teams need to generate clips with defined start and end states. Post-production teams need to edit existing footage without re-compositing everything manually. Creative agencies need character and voice consistency across batches. Until recently, every one of these use cases required either a different model or a manual workaround.

Wan 2.7 attempts to collapse all of those control surfaces into a single model rather than requiring a separate checkpoint for each capability.

## What Is Wan 2.7?

Wan 2.7 is Alibaba's latest generation of video and image models, developed by the Wan-AI research group. It continues the Diffusion Transformer architecture that underpins earlier Wan releases, but consolidates several capabilities that previously shipped as separate endpoints into a single unified model.

The family spans two modalities:

**Video models:**
- **Wan 2.7 T2V** — Text-to-Video generation at 720p or native 1080p
- **Wan 2.7 VideoEdit** — Instruction-based editing of existing video clips
- **Wan 2.7 Reference-to-Video** — Multi-reference image-to-video synthesis

**Image models:**
- **Wan 2.7 Text-to-Image** — Generation up to 2048x2048
- **Wan 2.7 Text-to-Image Pro** — Generation up to 4K (4096x4096)
- **Wan 2.7 Image Edit / Edit Pro** — Instruction-based image editing

This article focuses on the video models. The image models share the same underlying architecture and are worth reading about separately.

## Text-to-Video: Native 1080p With Audio Input

The T2V endpoint generates 720p or native 1080p video clips from text prompts, with durations ranging from 2 to 15 seconds. The model accepts optional audio input and will auto-generate background audio when none is provided.

What distinguishes this from earlier Wan releases is multi-shot narrative control through prompt language. Instead of a single continuous shot, you can describe sequences and the model attempts to structure the output accordingly. Think of it less as a camera simulator and more as a first-pass storyboarding tool that produces watchable footage.

On Together AI, the endpoint is `Wan-AI/Wan2.7-T2V`:

```bash
curl --request POST \
  --url https://api.together.xyz/v2/videos \
  --header "Authorization: Bearer $TOGETHER_API_KEY" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "Wan-AI/Wan2.7-T2V",
    "prompt": "some penguins building a snowman"
  }'
```

The model runs on serverless infrastructure across multiple providers, so there is no local deployment requirement unless you choose to run the open weights yourself.

## First-Frame and Last-Frame Control

This was previously available as a separate model checkpoint in the Wan 2.1 series. In 2.7, it is baked into the main model.

You provide two images: one for the opening frame, one for the closing frame. The model generates the intermediate content, guided by your text prompt. It does not simply interpolate between pixels. It uses CLIP semantic features and cross-attention mechanisms to inject structural features from both control frames into the generation process.

For product teams, this is the single most useful feature. You have a product at rest and then the same product in use. You define the endpoints and the model animates the transition. The motion path between frames is inferred rather than specified, which means your prompt is doing important work. A prompt like "the product rotates slowly to reveal its front face" produces a very different result than a bare prompt with no motion guidance.

Input frames should be PNG or high-quality JPEG at approximately the target output aspect ratio. Compression artifacts in your control frames will be interpreted as intentional visual information, which almost never works out.

## Instruction-Based Video Editing

Wan 2.7 VideoEdit changes existing footage based on natural language instructions. You upload a video clip, describe what you want changed, and the model outputs the edited version while preserving the original motion.

Capabilities include:
- Background replacement
- Lighting changes
- Color and style adjustments
- Clothing and appearance modifications
- Scene element additions or removals

On Replicate, the model accepts mp4 or mov files from 2 to 10 seconds, with 720p or 1080p output. Optional reference images can guide the edit toward a specific target look.

This is a meaningful shift from generation to editing. Previous models forced you to regenerate from scratch if you needed changes. VideoEdit lets you iterate on existing footage step by step, which is closer to how actual post-production pipelines operate.

The limitation you should plan around: complex spatial rearrangements, such as moving objects to different positions within a frame, do not work reliably. Focused, singular edits on short clips produce the cleanest results.

## Multi-Reference Image-to-Video

The reference-to-video endpoint accepts up to nine input images as a structured 3x3 grid for a single generation call. This is substantially different from single-frame image-to-video, where the model anchors everything to one starting image and drifts from there.

For character-consistent content across varied angles or lighting conditions, the grid approach gives the model multiple reference points to synthesize from. It reduces the one-shot randomness that makes image-to-video batch jobs expensive to quality-check.

The practical application here is product photography, character consistency for animation pipelines, and any workflow where you need visual continuity across multiple takes from different perspectives.

## Subject and Voice Reference

Building on capabilities introduced in Wan 2.6, the 2.7 generation integrates visual subject reference with voice reference to produce videos where both appearance and voice match your inputs. This matters most for teams building character-driven short-form content, localization pipelines, or any application where identity consistency across clips is a hard requirement.

The voice reference handling is the variable quality here. Single calls tend to produce clean results, but batch call stability remains something to test with your own workloads before committing a production pipeline to this feature.

## Architecture and Open-Source Context

Wan 2.7 builds on a Transformer-based DiT architecture with Full Attention, designed to capture long-range spatiotemporal dependencies across video frames. The model processes video as continuous sequences of spatio-temporal patches in a compressed latent space, which keeps memory usage manageable at 1080p resolution.

The Wan series has a genuine open-source precedent. Wan 2.1 and Wan 2.2 are available on the official Wan-AI Hugging Face organisation, with both 5B and 14B parameter variants. Wan 2.7 has not been confirmed as an open-weight release at the time of writing, though the pattern of earlier generations makes it plausible for the future.

For teams running local inference on earlier versions, the GPU memory profile and quantization approach should not change dramatically. If your Wan 2.6 inference stack uses FP8 operations or multi-GPU sharding, that investment carries forward structurally.

## Pricing and API Availability

Wan 2.7 is available through multiple API platforms:

| Platform | Endpoint | Notes |
|---|---|---|
| **Together AI** | `Wan-AI/Wan2.7-T2V` | Serverless, cURL/Python/JS SDKs |
| **Replicate** | `wan-video/wan-2.7-videoedit` | Per-run pricing, playground available |
| **Fal.ai** | `fal-ai/wan/v2.7/reference-to-video` | ~$0.10 per second of output |
| **WaveSpeedAI** | Multiple endpoints | Both image and video models |
| **Alibaba Cloud DashScope** | Official API key | Primary official channel, regional availability varies |

Pricing varies by platform. Fal.ai lists approximately $0.10 per second for reference-to-video. Replicate charges per run. WaveSpeedAI lists text-to-image starting at $0.04 per generation. Alibaba Cloud DashScope pricing should be checked directly for the most current rates at launch.

If you are comparing across platforms, pay attention to cold start times, queue depth during peak hours, and whether the platform supports webhook callbacks for async job completion rather than polling. Those operational details matter more than headline pricing once you are running volume.

## Developer Considerations

The `Wan 2.7` model family represents an unusually comprehensive set of video capabilities in one lineage. But comprehensiveness is not the same as production readiness across every feature.

What works well today:
- Native 1080p text-to-video generation
- First/last frame controlled clips with good endpoint fidelity
- Instruction-based editing for focused, singular changes

What needs more validation:
- Multi-image 9-grid synthesis at production scale
- Batch call stability for voice reference features
- Long-clip temporal consistency beyond 10 seconds
- Video recreation/replication capabilities, which have not been fully confirmed in official Alibaba documentation

If you are evaluating this for a production build, start with the T2V endpoint and first/last frame control. Those are the most mature capabilities with the clearest value. The editing and multi-reference features are genuinely useful but require more iterative testing against your specific content types.

## How Wan 2.7 Compares

Against other video models in early 2026:

- **Google Veo 3.1** delivers higher maximum resolution, including 4K, but at higher cost. It excels at photorealism but does not offer the instruction-based editing path or first/last frame control as a single model.
- **OpenAI Sora 2 Pro** is positioned at the premium tier. The cost difference makes Wan 2.7 more compelling for high-volume applications where per-second pricing accumulates quickly.
- **Kling 3.0** and **LTX 2** are strong mid-tier alternatives. The Wan 2.7 advantage lies in the breadth of control features available through one model family rather than switching between separate tools.

## Verdict

Wan 2.7 is the most structurally interesting AI video model released this year. Not because it produces the objectively best-looking footage in every category. Because it consolidates more production-grade control surfaces into a single accessible model than anything else available through an API right now.

For developers and product teams that actually need to direct video output rather than just generate it, that distinction matters more than any benchmark score.
