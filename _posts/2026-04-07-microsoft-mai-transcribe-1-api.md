---
title: "Microsoft MAI-Transcribe-1 API: State-of-the-Art Speech Recognition at $0.36/HR"
excerpt: "Microsoft has released MAI-Transcribe-1, a state-of-the-art speech-to-text model that achieves the lowest Word Error Rate on the FLEURS benchmark across 25 languages and is priced at $0.36 per hour of audio. It's now in public preview on Microsoft Foundry and powers Microsoft's own Copilot Voice and Teams."
coverImage: "/assets/blog/microsoft-mai-transcribe-cover.svg"
date: 2026-04-07T12:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/microsoft-mai-transcribe-cover.svg"
---

## TL;DR

Microsoft has released MAI-Transcribe-1, a state-of-the-art speech-to-text model that achieves the lowest Word Error Rate on the FLEURS benchmark across 25 languages and is priced at $0.36 per hour of audio. It's now in public preview on Microsoft Foundry and powers Microsoft's own Copilot Voice and Teams. For developers needing high-accuracy transcription with competitive pricing and Azure integration, MAI-Transcribe-1 is a strong new option.

## What Is MAI-Transcribe-1

Microsoft MAI-Transcribe-1 is the first in a new family of in-house AI models announced on April 2, 2026. It is a speech recognition model that converts audio to text with state-of-the-art accuracy. Microsoft is positioning it as a best-in-class alternative to OpenAI's Whisper, Google's Gemini transcription, and ElevenLabs Scribe.

The model uses a transformer-based architecture with a bi-directional audio encoder and a text decoder. It supports common audio formats (MP3, WAV, FLAC) up to 200MB per file. Microsoft claims batch transcription speed 2.5x faster than their previous Azure Fast offering.

## Accuracy and Performance

According to Microsoft's benchmarks on the FLEURS benchmark (the industry-standard multilingual test), MAI-Transcribe-1 achieves an average 3.8% Word Error Rate (WER) across the top 25 languages by Microsoft product usage. They state it ranks first in 11 core languages and beats OpenAI Whisper-large-v3 on all 25 languages and Google Gemini 3.1 Flash on 22 of 25.

For European languages in particular, Microsoft emphasizes strong performance. The model is designed for both offline (post-processing) and online (real-time) applications, with latency low enough for live captioning and meeting transcription.

Priced at $0.36 per hour of audio, MAI-Transcribe-1 is positioned as having the best price-to-performance among large cloud providers.

## Capabilities and Use Cases

MAI-Transcribe-1 supports a range of use cases:

- **Media**: subtitle generation, podcast transcription, video accessibility
- **Enterprise**: meeting archives, compliance recording, legal discovery
- **Analytics**: call center quality assurance, customer insight extraction, searchable audio libraries
- **Data pipelines**: processing large audio archives for ML training, search indexing, and summarization
- **Real-time**: live meeting transcription, video close captioning, dictation

For voice agent builders, MAI-Transcribe-1 serves as the foundational speech-to-text layer. Combined with MAI-Voice-1 (text-to-speech) and an LLM, developers can build end-to-end voice experiences.

## API Access and Pricing

MAI-Transcribe-1 is available through:

- **Microsoft Foundry** (the unified AI development platform, formerly Azure AI Foundry)
- **MAI Playground** (interactive web interface for testing, US only)

The API is in public preview, meaning it's generally available but may have some limitations. Microsoft is actively integrating it into their consumer products: Copilot's Voice mode and Microsoft Teams conversation transcription.

Pricing: $0.36 per hour of audio processed, with no upfront costs. This is pay-as-you-go. Enterprise features like diarization (speaker separation), contextual biasing, and streaming are listed as "coming soon."

## Should You Care

If you need reliable, high-accuracy transcription at scale, MAI-Transcribe-1 warrants evaluation. The claimed WER improvements, if they hold up in independent testing, represent a meaningful jump over existing models. The pricing is competitive, especially given the performance claims.

The tight integration with Microsoft's ecosystem (Foundry, Azure, Copilot, Teams) makes it a natural choice for organizations already invested in Microsoft. The same platform also hosts MAI-Voice-1 and MAI-Image-2, enabling a unified multimodal strategy.

For startups and developers not locked into Azure, the public preview on Foundry (which requires an Azure account) may be a barrier compared to directly hosted APIs like Whisper or ElevenLabs. However, the performance/price ratio could justify the integration effort.

## What I Cannot Verify Yet

- Independent replication of the FLEURS benchmark results across all 25 languages has not yet been published.
- Long-term reliability and uptime of the public preview service are still unproven.
- Details on data privacy and whether audio is stored or used for model training have not been explicitly confirmed.
- The "coming soon" features (diarization, contextual biasing, streaming) do not have announced timelines.

## Sources

- [Microsoft AI: State of the Art Speech Recognition with MAI-Transcribe-1](https://microsoft.ai/news/state-of-the-art-speech-recognition-with-mai-transcribe-1/)
- [Microsoft AI: 3 New World Class MAI Models Available in Foundry](https://microsoft.ai/news/today-were-announcing-3-new-world-class-mai-models-available-in-foundry/)
- [VentureBeat: Microsoft launches 3 new AI models in direct shot at OpenAI and Google](https://venturebeat.com/technology/microsoft-launches-3-new-ai-models-in-direct-shot-at-openai-and-google)
