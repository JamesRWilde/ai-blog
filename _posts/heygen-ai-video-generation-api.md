---
title: "HeyGen API: AI Video Generation With Digital Twins and Instant Translation"
excerpt: "HeyGen's API turns text prompts into full avatar videos, supports real-time video translation across 175+ languages, and offers digital twin creation for scalable content production."
coverImage: "/assets/blog/heygen-api-cover.jpg"
date: 2026-03-21T15:30:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/heygen-api-cover.jpg"
---

## TL;DR

HeyGen is an AI video generation platform with a public API that handles the entire pipeline, from text prompt to finished avatar video. Their Video Agent endpoint takes a single prompt and produces a complete video with voiceover, avatar, and scene composition. Beyond that, they offer video translation with lip sync across 175+ languages, digital twin creation, text-to-speech, and MCP integration for AI agents. Pay-as-you-go starts at $5, with enterprise tiers available.

## The Problem

Video production is expensive, slow, and requires specialized talent. A single corporate training video can take days to script, film, and edit. Multiply that across multiple languages, and you are looking at a production nightmare that most teams simply cannot afford. HeyGen targets this bottleneck directly by making video generation programmatic and API-driven.

## What HeyGen Offers

HeyGen provides several distinct API endpoints, each tackling a different part of the video production workflow.

### Video Agent API

The headline feature. Send a single text prompt to `POST /v1/video_agent/generate` and get back a finished video. The endpoint accepts optional configuration for avatar selection, video duration (minimum 5 seconds), and orientation (portrait or landscape). You can also attach assets via asset IDs for the agent to reference in the generated video.

This is the fastest path from idea to video. No template selection, no timeline editing, no voiceover recording. Just a prompt.

### Video Generation API

For teams that need granular control, the traditional video generation endpoint lets you specify avatars, voices, backgrounds, and layouts individually. This is the path for building custom video workflows where you want to control each element separately.

### Video Translation API

Upload or reference an existing video and specify a target language. The API returns the same video dubbed and lip-synced to the new language. As of early 2026, HeyGen supports 175+ languages and dialects. This is particularly powerful for companies localizing training content or marketing videos across markets without re-shooting anything.

### Text-to-Speech (Starfish)

HeyGen's TTS engine, branded as Starfish, converts text to natural-sounding speech. This can be used independently of video generation for voiceover work or audio content creation.

### MCP Integration

For AI agent developers, HeyGen offers Model Context Protocol integration. Connect HeyGen to Claude, OpenAI, or other agents via OAuth. The agent can then create and manage videos conversationally. Usage here is billed against your web plan's premium credits, separate from the API balance.

## Authentication and Pricing

Authentication uses a straightforward API key passed via the `X-Api-Key` header. You generate the key from your HeyGen dashboard under Space Settings, API tab.

Pricing has two billing tracks:

- **API Direct / Skills:** Billed against an API dashboard balance. Pay-as-you-go starts at $5 top-up with no monthly commitment.
- **MCP:** Billed against your web plan's premium credit balance. Requires an active HeyGen web subscription.

On the consumer side, HeyGen's plans range from Free (3 videos/month, 720p) to Creator at $29/month (unlimited avatar videos, 1080p) to Pro at $99/month (4K export, faster processing, 10x premium feature access).

## Digital Twins

One of HeyGen's differentiating features is digital twin creation. Film a short video of yourself, and HeyGen generates a realistic digital clone that can produce new videos without you ever being on camera again. The API supports both photo avatars (from a single static image) and full video digital twins. Digital Twin creation API access is available on Enterprise plans.

## Key Stats

HeyGen reports over 113 million videos generated, 87 million avatars created, and 15 million videos translated on the platform. These are substantial numbers that suggest real production usage, not just hobbyist experimentation.

## Developer Experience

The API follows standard REST conventions with JSON payloads. A minimal video generation request looks like this:

```bash
curl -X POST "https://api.heygen.com/v1/video_agent/generate" \
  -H "X-API-KEY: $HEYGEN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "A presenter explaining our product launch in 30 seconds"}'
```

The response returns a `video_id` that you can poll or track via webhooks for completion status. HeyGen also provides a Postman collection for quick testing.

## Limitations and Considerations

HeyGen is not a general-purpose video generation tool like Sora or Kling. It is specifically optimized for avatar-based, presenter-style videos. If you need cinematic B-roll or abstract generative video, you will want a different tool. HeyGen integrates with Sora, Veo, and Kling models inside its own platform for those use cases, but the API itself is avatar-centric.

Video processing times vary by plan tier. Free accounts get standard processing, while Pro and Enterprise get priority queueing.

## Bottom Line

HeyGen fills a specific niche in the AI API landscape: programmatic, avatar-based video production with built-in localization. The Video Agent endpoint is the real draw, offering genuinely one-shot video generation from a text prompt. For teams producing training content, product demos, or multilingual marketing at scale, it removes the need for cameras, actors, and translation workflows. The API is straightforward, pricing is reasonable, and the MCP integration makes it accessible to AI agent builders who want video as a tool capability.
