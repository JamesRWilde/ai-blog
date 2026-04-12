---
title: "Google Lyria 3 API: Full-Song Music Generation Now Available for Developers"
excerpt: "Google's Lyria 3 Pro and Lyria 3 Clip are now in public preview via the Gemini API and Google AI Studio, offering full songs up to 3 minutes with tempo control, time-aligned lyrics, and image-to-music input."
coverImage: "/assets/blog/lyria-3-api-cover.png"
date: 2026-03-29T05:45:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/lyria-3-api-cover.png"
---

## TL;DR

Google has launched Lyria 3, its newest music generation model family, in public preview for developers through the Gemini API and Google AI Studio. Two variants are available: Lyria 3 Pro for full-length songs (up to 3 minutes) and Lyria 3 Clip for fast 30-second clips. The API supports tempo conditioning, time-aligned lyrics, multimodal image-to-music input, and realistic vocals across multiple languages and genres. Enterprise access is available via Vertex AI.

## The Problem

Music generation APIs have historically forced developers into a tradeoff:要么 short clip-only outputs with limited structural awareness,要么 extremely slow generation times unsuitable for interactive applications. Previous Lyria models and competitors like MusicGen or Suno's API either lacked vocal quality, had limited runtime, or offered no granular control over song structure. Developers building music apps, video soundtracks, or game audio needed something that could produce coherent, multi-section compositions without sounding like a looping sample.

## Lyria 3: What's Actually Shipping

Google announced two model variants on March 25, 2026:

**Lyria 3 Pro** (`lyria-3-pro-preview`) generates full songs up to approximately 3 minutes. It understands musical structure: intros, verses, choruses, bridges. The model maintains coherence from start to finish, which is the key differentiator from clip-based generators that fall apart when extended.

**Lyria 3 Clip** (`lyria-3-clip-preview`) is optimized for speed and high-volume use. It generates 30-second clips, targeting rapid prototyping, background loops, and social media content.

Both variants support realistic vocals with expressive nuance, improved audio clarity, and multilingual/multigenre output.

### Developer Controls

The API gives developers three notable control mechanisms:

- **Tempo conditioning** — specify tempo (fast, slow, or specific BPM ranges) through natural language prompts with high accuracy.
- **Time-aligned lyrics** — outline the progression of a song in your prompt and control when lyrics start and end within a track.
- **Multimodal image-to-music** — provide an image to influence the mood, style, and atmosphere of generated audio. This goes beyond text-only prompting.

### Access Points

Lyria 3 is available through three routes:

1. **Google AI Studio** — free experimentation, new audio interface at `aistudio.google.com/new_music`
2. **Gemini API** — direct API calls via `ai.google.dev/gemini-api/docs/music-generation`
3. **Vertex AI** — enterprise-grade access with on-demand scaling for production workloads

The Gemini API documentation and cookbook are available for integration guidance.

## Pricing and Availability

Lyria 3 is in **public preview**. Google has not published final per-generation pricing, but Vertex AI access follows standard Vertex AI billing patterns. Google AI Studio offers free experimentation credits for developers getting started.

The model adds a **digital watermark** (SynthID) to all generated tracks, ensuring transparency about AI-generated content.

## Competitive Landscape

Lyria 3 enters a market with several established players:

- **Suno** and **Udio** offer consumer-facing music generation with API access, but neither has matched Google's multilingual vocal quality or image-to-music capability at this scale.
- **Stability AI's Stable Audio** provides open-weight music generation but lacks vocal synthesis.
- **MusicGen (Meta)** is open-source but structurally limited to shorter outputs.
- **ElevenLabs** covers voice and sound but not full song composition.

Google's advantage is infrastructure: Vertex AI scaling, Gemini API ecosystem integration, and distribution across YouTube (Google Vids), Workspace, and the Gemini app. The ProducerAI collaboration tool, built for musicians, suggests Google is serious about the creative professional market, not just developer tooling.

## Key Takeaways

- Two model tiers: Pro for full songs, Clip for fast short-form content
- Multimodal input (text + images) is a genuine differentiator
- Multilingual vocals and multi-genre support out of the box
- SynthID watermarking on all outputs
- Public preview now, with Vertex AI enterprise access available

## Sources

- [Build with Lyria 3 — Google Developers Blog](https://blog.google/innovation-and-ai/technology/developers-tools/lyria-3-developers/)
- [Lyria 3 Pro — Google Blog](https://blog.google/innovation-and-ai/technology/ai/lyria-3-pro/)
- [Gemini API Music Generation Docs](https://ai.google.dev/gemini-api/docs/music-generation)
- [Google AI Studio — New Music Experience](https://aistudio.google.com/new_music)
