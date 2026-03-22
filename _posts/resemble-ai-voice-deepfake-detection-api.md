---
title: "Resemble AI: Voice Generation and Deepfake Detection in One API"
excerpt: "Resemble AI combines open-source text-to-speech with enterprise deepfake detection, offering a unified platform for voice generation and audio security."
coverImage: "/assets/blog/resemble-ai-voice-api.jpg"
date: 2026-03-22T12:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/resemble-ai-voice-api.jpg"
---

## TL;DR

Resemble AI offers a dual-purpose API platform combining Chatterbox, an MIT-licensed open-source text-to-speech model that outperforms ElevenLabs in blind evaluations, with DETECT-3B Omni, a multimodal deepfake detection system covering audio, video, and images. The platform targets developers building voice agents, media workflows, and content authentication systems.

## The Problem

Two related problems have emerged in the generative AI era. First, most high-quality text-to-speech APIs are locked behind proprietary walls with limited customization. Second, as synthetic media becomes indistinguishable from real content, organizations need reliable ways to detect manipulated audio, video, and images before they spread.

Resemble AI addresses both problems from a single platform, pairing generative voice tools with detection capabilities.

## What Resemble AI Offers

The platform centers on two core products:

**Chatterbox TTS** is the company's open-source text-to-speech model, released under an MIT license. Key features include:

- Zero-shot voice cloning from 5 seconds of reference audio
- Emotion exaggeration control, adjusting speech from monotone to dramatically expressive via a single parameter
- 23+ language support
- Paralinguistic tags for non-speech sounds like laughter, sighs, and gasps
- Built-in PerTh watermarking that embeds imperceptible audio markers using psychoacoustic masking
- Sub-200ms inference latency

Resemble conducted blind evaluations through Podonos comparing Chatterbox against ElevenLabs. In those tests, 63.75% of evaluators preferred Chatterbox output. The model has accumulated over 22,500 GitHub stars.

**DETECT-3B Omni** is their multimodal deepfake detection model:

- Covers audio, video, and image analysis
- Claims 99.8% accuracy against 160+ generative AI models
- Real-time detection capabilities
- Audio source tracing for identifying which model generated a clip
- Speaker verification and biometric voice authentication

Beyond these two, the API includes speech-to-text transcription, audio enhancement (noise removal and clarity boost), audio editing, voice agents with phone number integration, and the PerTh watermarking system as standalone services.

## API Structure

The API follows standard REST patterns with:

- Text-to-speech available via synchronous, HTTP streaming, and WebSocket streaming endpoints
- Voice cloning with rapid (from short samples) and professional (from larger datasets) tiers
- SSML support for fine-grained speech control
- Agent framework with tool integration, webhooks, and knowledge base attachment
- Deepfake detection as async job submission with result retrieval

Authentication uses standard API keys. Rate limits and error handling follow conventional patterns.

## Pricing

Resemble uses a pay-as-you-go Flex Plan with credits that never expire:

- **Text-to-Speech:** $0.0005/second (~$0.03/minute)
- **Voice Agents:** $0.001/second (~$0.06/minute)
- **Deepfake Detection (Audio):** $0.04/second
- **Deepfake Detection (Video):** $0.07/second
- **Speech-to-Text:** $0.001/second
- **Audio Enhancement:** $0.002/second
- **Watermark Encode/Decode:** $0.0005/$0.0002 per second

Additional per-seat costs: team seats at $20/month per user, voice cloning at $2-5/month per voice depending on tier. Enterprise plans offer volume discounts up to 80% plus SOC 2 compliance, SSO/SAML, and on-premise deployment.

## How It Compares

**Against ElevenLabs:** Chatterbox is MIT-licensed and self-hostable, while ElevenLabs remains cloud-only and closed-source. Pricing is free for self-hosted Chatterbox versus $0.15/1000 characters for ElevenLabs. The trade-off is that Chatterbox requires GPU infrastructure for self-hosting.

**Against OpenAI TTS:** OpenAI's API charges $15/1M characters with no voice cloning or emotion control. Chatterbox offers more expressive control and zero-shot cloning at lower effective cost when self-hosted.

**Against dedicated deepfake detection:** Most deepfake detection services focus on either audio or video. Resemble combines both in a single API, plus adds watermark detection and audio source tracing.

## The Catch

The self-hosted Chatterbox model requires GPU resources and setup, which adds operational overhead that cloud-only APIs avoid. The deepfake detection pricing ($0.04-0.07/second) adds up quickly for high-volume use cases. And while the blind evaluation results favor Chatterbox, those were conducted by Resemble's own methodology, not an independent third party.

The platform's breadth (TTS, deepfake detection, voice agents, audio editing, watermarking) is a strength for integration but means individual components may trail specialized competitors in depth.

## Who It's For

Resemble fits best for teams that need both voice generation and content authentication in the same workflow, organizations with data residency requirements that demand on-premise deployment, and developers who prefer open-source foundations with commercial API options for scale.

The voice agent API with phone number management also positions it for customer service and telephony use cases where voice quality and synthetic speech detection both matter.

---

**Pricing:** Free self-hosted (Chatterbox) / Pay-as-you-go API starting at $0
**Website:** [resemble.ai](https://www.resemble.ai)
**Docs:** [docs.resemble.ai](https://docs.resemble.ai)
**GitHub:** [github.com/resemble-ai/chatterbox](https://github.com/resemble-ai/chatterbox) (22.5k+ stars)
