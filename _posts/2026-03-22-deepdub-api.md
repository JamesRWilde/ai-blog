---
title: "Deepdub API: Emotive Text-to-Speech for AI Agents and Media"
excerpt: "Deepdub's API delivers Hollywood-grade, emotionally adaptive text-to-speech across 100+ languages with real-time streaming, voice cloning, and accent blending through REST and WebSocket endpoints."
coverImage: "/assets/blog/deepdub-cover.jpg"
date: 2026-03-22T09:01:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/deepdub-cover.jpg"
---

## TL;DR

Deepdub offers a Text-to-Speech API built around its proprietary eTTS (Emotive Text-to-Speech) engine, designed for real-time AI agent voice and media localization. The API supports REST and WebSocket endpoints, Python and JavaScript SDKs, voice cloning from short audio samples, accent blending between locales, and streaming delivery at under 250ms time-to-first-audio. It serves 1,000+ licensed voices across 100+ languages, with 40+ emotion styles per voice. Enterprise customers include Paramount and MHz Choice. The platform is TPN Gold, SOC 2, and GDPR-compliant and is now available through the AWS Marketplace AI Agents and Tools Storefront.

## The Problem

Voice is the bottleneck in two converging industries. Media companies sitting on vast content libraries need to dub thousands of hours into multiple languages, but traditional dubbing studios are slow, expensive, and produce inconsistent results. Meanwhile, the explosion of conversational AI agents (customer service bots, healthcare assistants, sales agents) has created demand for voices that sound genuinely human, not just passable. Most TTS APIs generate flat, monotonous speech. The ones that offer emotional range are expensive, difficult to tune, or come with strict rate limits that collapse under production workloads.

Neither use case is well-served by generic TTS engines. Media dubbing needs voice cloning, accent control, and emotional fidelity. AI agents need sub-250ms latency, WebSocket streaming, and zero rate-limit throttling. Building separate pipelines for each is wasteful.

## What Is Deepdub

Deepdub is an AI voice technology company originally focused on media localization, dubbing films, television, and documentary content for studios and distributors including Paramount, MHz Choice, and FilmRise. The company developed its proprietary eTTS (Emotive Text-to-Speech) engine to generate speech with natural emotional variation rather than the flat prosody typical of standard TTS models.

In 2025, Deepdub expanded beyond media dubbing to target the conversational AI market, launching a dedicated Voice API for AI Agents. The API exposes the same eTTS engine used in its media pipeline, now optimized for real-time interaction with low-latency streaming, WebSocket support, and fine-grained controls for accent, tempo, pitch, and emotional intensity.

The platform is available as a REST API, a WebSocket API for real-time streaming, and through official Python and JavaScript SDKs.

## How the Deepdub API Works

The API offers two integration methods, both authenticated with an API key:

**REST API** (`https://restapi.deepdub.ai/api/v1`) handles synchronous audio generation, voice management, and batch workflows. The Python SDK wraps this for straightforward use:

```python
from deepdub import DeepdubClient

client = DeepdubClient(api_key="dd-YOUR_KEY_HERE")

audio = client.tts(
    text="Welcome to Deepdub!",
    voice_prompt_id="bd1b00bb-be1c-4679-8eaa-0fcbfd4ff773",
    model="dd-etts-3.0",
    locale="en-US",
)

with open("output.mp3", "wb") as f:
    f.write(audio)
```

**WebSocket API** (`wss://wsapi.deepdub.ai`) enables real-time streaming with chunked audio delivery for conversational AI agents that need to begin speaking before the full response is generated. Time-to-first-audio sits under 250ms.

The JavaScript SDK supports the WebSocket path directly:

```javascript
const { DeepdubClient } = require("@deepdub/node");

async function main() {
  const deepdub = new DeepdubClient("dd-YOUR_KEY_HERE");
  await deepdub.connect();

  await deepdub.generateToFile("./output.wav", "Welcome to Deepdub!", {
    locale: "en-US",
    voicePromptId: "bd1b00bb-be1c-4679-8eaa-0fcbfd4ff773",
    model: "dd-etts-3.0",
  });
}

main();
```

### Voice Cloning

Upload a short audio sample (or pass a base64-encoded audio reference) and the system generates a voice clone that preserves the original speaker's tone, pacing, and character. Cloned voices can be used across languages and are available for both media dubbing and agent voice use cases.

### Accent Blending

Rather than selecting from fixed accent profiles, Deepdub allows ratio-based accent blending. You can specify, for example, an American English speaker with a 30% French accent, and the API will adjust the phonetic output accordingly. This is useful for creating regionally authentic voices for localized content or brand-specific agent personalities.

## Key Features

- **eTTS Engine**: Emotive Text-to-Speech that adapts emotional intensity and style to context, not just pitch and tempo adjustments.
- **1,000+ Licensed Voices**: Broadcast-ready voices available for commercial use across 100+ languages and dialects.
- **40+ Emotion Styles Per Voice**: Fine-grained emotional control ranging from calm and empathetic to energetic and authoritative.
- **Real-Time Streaming**: WebSocket-based audio delivery with under 250ms time-to-first-audio for conversational AI agents.
- **Voice Cloning**: Clone any voice from a short audio sample for consistent brand or character identity across content.
- **Accent Control**: Blend accents between locales with precise ratio control for regional authenticity.
- **Unlimited Scale**: No artificial rate limits or throttling, designed for high-concurrency production workloads.
- **Enterprise Compliance**: TPN Gold, SOC 2, and GDPR-compliant infrastructure with 24/7 support.
- **AWS Marketplace**: Available for deployment through the AWS AI Agents and Tools Storefront with unified billing.

## Pricing

Deepdub does not publish self-serve pricing on its website. The platform operates on an enterprise and usage-based model with custom pricing negotiated based on volume, use case, and integration requirements. A free trial API key is available in the documentation for testing (`dd-00000000000000000000000065c9cbfe`), which allows developers to evaluate the API without signing up.

For production access, pricing is typically structured around:

- **Media Dubbing**: Per-minute or per-project rates based on volume and language count.
- **Voice API for Agents**: Usage-based pricing tied to characters processed or audio minutes generated.
- **Enterprise Plans**: Custom SLAs, dedicated support, and volume discounts for large-scale deployments.

AWS Marketplace integration allows teams to provision the API using existing AWS accounts and billing.

## Authentication and Limits

API authentication uses a `dd-` prefixed API key passed as a Bearer token or client initialization parameter. The documentation provides a trial key for evaluation but production keys require account setup.

Rate limits are not artificially enforced for production accounts, which is a meaningful differentiator for high-throughput agent workloads where burst traffic is common. The platform is designed for high-concurrency production environments without latency degradation under load.

## Who Uses It

Deepdub's customer base spans media localization and conversational AI. Notable deployments include:

- **Paramount**: Using Deepdub for content localization and dubbing operations.
- **MHz Choice**: Dubbing international series into multiple languages with 75% reduction in turnaround time and 70% cost reduction.
- **FilmRise**: Dubbing documentary content (including Forensic Files) with 72% cost savings.
- **Reshet 13**: Localizing news content for FAST channel launch, dubbing 1,732 minutes of content across 30 episodes in two months.

The shift toward AI agent voice represents the company's newer growth vector, with use cases spanning customer service bots, healthcare assistants, financial agents, training coaches, outbound sales agents, and gaming voice agents.

## The Bottom Line

Deepdub occupies an interesting position in the AI voice market. It is not trying to be the cheapest TTS API or the one with the most models. Its pitch is emotional fidelity and enterprise reliability, backed by real production deployments in Hollywood and broadcast media. The eTTS engine produces voices that sound like they are performing rather than reading, which matters when the output is a dubbed film or a customer-facing AI agent representing a brand.

The move into the AI agent space is a natural extension. Companies that already trust Deepdub for high-stakes media dubbing are likely to evaluate it for agent voice as well, especially given the sub-250ms streaming latency and zero rate-limit positioning. The AWS Marketplace availability lowers the friction for teams already embedded in the AWS ecosystem.

The main limitation for smaller developers is the lack of self-serve pricing. If you need to spin up a side project in an afternoon and compare costs across five TTS providers, Deepdub's enterprise-first model will slow you down. But if you are deploying voice at scale, whether for a streaming platform or a fleet of AI agents, the combination of emotional range, compliance certifications, and production-grade infrastructure makes it a credible option.
