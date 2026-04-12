---
title: "Sarvam AI API: India's Sovereign AI Platform for Multilingual Language Processing"
excerpt: "Sarvam AI delivers a full-stack API suite purpose-built for 22+ Indian languages, combining free LLM chat completion with production-grade speech-to-text, text-to-speech, translation, and transliteration endpoints."
date: 2026-03-27T02:35:00+00:00
slug: sarvam-ai-api-indian-language-platform
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
coverImage: "/assets/blog/sarvam-ai-api-cover.png"
ogImage:
  url: "/assets/blog/sarvam-ai-api-cover.png"
---

## TL;DR

Sarvam AI is an Indian sovereign AI platform offering a comprehensive REST API suite covering chat completion, speech-to-text, text-to-speech, translation, transliteration, and language identification across 22+ Indian languages. Their flagship models (Sarvam 105B and 30B) are free to use via API, while speech and translation services follow a transparent pay-per-use model starting at Rs 30 per hour of audio transcription.

## The Problem

India has 22 officially recognized languages and hundreds of millions of speakers across linguistic communities that are chronically underserved by mainstream AI APIs. Most global LLM providers optimize for English and a handful of European languages. Speech-to-text engines butcher Indian language audio. Translation tools treat Indian languages as an afterthought.

For developers building products for the Indian market, this creates a painful gap: you either accept poor multilingual quality from Western providers or build custom NLP pipelines from scratch. Neither option scales.

## What Sarvam AI Offers

Sarvam AI addresses this gap with a purpose-built API stack optimized for Indian linguistic diversity. The platform is built on sovereign compute infrastructure operated entirely within India, which matters for data residency compliance under India's DPDP Act.

### API Endpoints

The platform exposes seven core API endpoints:

- **Chat Completion** (`/v1/chat/completions`) - OpenAI-compatible interface supporting Sarvam 105B, 30B, and Sarvam-M models with tool calling and function execution. The 105B and 30B models are free of charge.
- **Speech to Text** (`/speech-to-text`) - Audio transcription using the Saarika model, optimized for Indian language audio. Supports real-time, batch, and streaming modes.
- **Speech to Text Translate** (`/speech-to-text-translate`) - Combined speech recognition and translation in a single pass, converting spoken Indian language audio directly into English or other target language text.
- **Text to Speech** (`/text-to-speech`) - Natural-sounding voice synthesis via the Bulbul engine (v2 and v3 available) across 10 languages.
- **Translate** (`/translate`) - Text translation between 22 Indic languages and English, powered by the Mayura translation model.
- **Transliterate** (`/transliterate`) - Script conversion between different writing systems while preserving the same language.
- **Language Identification** (`/detect-language`) - Automatic detection of the input language from text, covering all major Indian languages.

### Model Lineup

Sarvam offers several proprietary models:

- **Sarvam 105B / 105B-32K** - The flagship large language model with standard and extended context variants. Free to use.
- **Sarvam 30B / 30B-16K** - A smaller, faster model for latency-sensitive applications. Also free.
- **Sarvam-M** - A multimodal variant.
- **Saarika** - Speech-to-text model for Indian languages.
- **Bulbul v2/v3** - Text-to-speech voice synthesis engines.
- **Mayura** - Translation model for Indic language pairs.

All chat completion models expose an OpenAI-compatible API, which means you can swap in Sarvam with minimal code changes if you already use the OpenAI SDK.

## Pricing

Sarvam's pricing is aggressively positioned for the Indian market:

| Service | Rate |
|---|---|
| Sarvam 105B Chat | Free |
| Sarvam 30B Chat | Free |
| Sarvam Vision | Rs 1.50 per page |
| TTS Bulbul v3 | Rs 30 per 10K characters |
| TTS Bulbul v2 | Rs 15 per 10K characters |
| Speech to Text | Rs 30 per hour of audio |
| STT + Diarization | Rs 45 per hour |
| STT + Translate | Rs 30 per hour |
| STT + Translate + Diarization | Rs 45 per hour |
| Text Translation | Rs 20 per 10K characters |
| Transliteration | Rs 20 per 10K characters |
| Language Identification | Rs 3.50 per 10K characters |

Three tiers are available: a free Starter plan with 60 requests per minute rate limit, a Pro tier at Rs 10,000 (approximately $120) with 1,000 bonus credits and 200 requests per minute, and a Business tier at Rs 50,000 with 7,500 bonus credits, 1,000 requests per minute rate limit, and dedicated Slack support with a solutions engineer.

The free chat completion models are the real draw here. No other major provider offers a 100B+ parameter LLM at zero cost through an API.

## Developer Experience

The API follows OpenAI conventions for chat completion, which reduces onboarding friction. Authentication uses a standard Bearer token plus an `api-subscription-key` header. Getting a key requires signing up at Sarvam's dashboard.

The documentation at docs.sarvam.ai is clean and organized by endpoint, with OpenAPI specifications for each route. A Meta Prompt feature lets developers use any AI model (including Gemini or Claude) to understand how to structure requests to Sarvam's APIs, which is a clever approach to developer onboarding.

Python and JavaScript SDKs are available, and the platform integrates with LangChain, Pipecat, and the Vercel AI SDK as a community provider.

## Deployment Options

Sarvam offers three deployment modes:

1. **Sarvam Cloud** - Fully managed SaaS with automatic scaling.
2. **Private Cloud (VPC)** - Deployed within the customer's security perimeter.
3. **On-Premises** - Air-gapped deployment for regulated industries and government.

This flexibility matters for government and enterprise customers with strict data sovereignty requirements.

## Who Is This For

Sarvam AI is built for developers and organizations building for the Indian market. Use cases include:

- Customer service voicebots in Hindi, Tamil, Telugu, Bengali, and other Indian languages
- Document processing and digitization for government forms
- Educational content localization across Indian languages
- Voice-enabled apps for low-literacy populations
- Multilingual chatbots for Indian businesses

Tata Capital is among the referenced customers, using Sarvam's APIs for multilingual consumer lending conversations.

## Limitations

A few things to note. The platform is specifically optimized for Indian languages, so developers targeting global language coverage will still need complementary providers. The free tier's rate limit of 60 requests per minute may be tight for production workloads. And the chat completion models, while free, may not match the reasoning depth of frontier models from OpenAI or Anthropic on general-purpose English tasks.

The pricing page is listed as an API pricing page but is actually at `/api-pricing`, which is a minor discoverability issue.

## Getting Started

To start using the Sarvam AI API:

1. Sign up at sarvam.ai and obtain your API key from the dashboard.
2. Install the SDK or use direct HTTP calls with your Bearer token.
3. Start with the free Sarvam 105B chat completion endpoint to test.
4. Add speech-to-text or TTS as needed for voice workflows.

The API is OpenAI-compatible, so existing code using the OpenAI SDK can be adapted by changing the base URL to `https://api.sarvam.ai` and updating the model parameter.

---

Sarvam AI fills a real gap in the global AI API landscape. While Western providers optimize for English, Sarvam has built an entire platform around linguistic diversity that most Western developers don't even think about. Whether it becomes a global competitor or stays India-focused, the approach of building sovereign AI infrastructure for underrepresented languages is worth watching.
