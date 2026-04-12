---
title: "Ultravox API: Open-Weight Voice AI That Skips the Transcription Step"
excerpt: "Ultravox is a multimodal LLM that processes speech directly without a separate ASR stage, delivering real-time voice AI at 5 cents per minute with 26 languages supported."
coverImage: "/assets/blog/ultravox-api-cover.jpg"
date: 2026-03-22T15:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/ultravox-api-cover.jpg"
---

## TL;DR

Ultravox is a speech-native voice AI platform built on open-weight models (Llama 3.3 70B, with an 8B variant) that processes audio directly without converting speech to text first. It scores 97% on Big Bench Audio (with reasoning enabled), supports 26 languages, and offers REST APIs plus SDKs for building real-time voice agents. Pricing starts free with 30 minutes included, then 5 cents per minute including TTS.

---

## The Problem with Most Voice AI

The standard voice AI pipeline is: **microphone → ASR (transcription) → LLM → TTS → speaker**. This works, but it creates two fundamental issues that are hard to engineer around.

First, transcribing speech to text before the language model can process it adds latency. Every millisecond of ASR processing pushes the conversation further from real-time. Second, paralinguistic signals like tone, cadence, pitch, and pauses carry meaning that pure text transcription discards. A sarcastic "great job" and a genuine "great job" look identical as text.

Most voice AI products today accept this tradeoff. Ultravox does not.

## What Ultravox Actually Is

Ultravox is a multimodal LLM that extends open-weight models (Llama, Mistral, Gemma) with a multimodal projector that converts audio directly into the high-dimensional embedding space that the LLM uses. No intermediate transcription step. The model "hears" speech the way it "reads" text.

The platform is built by Fixie AI (now operating as Ultravox) and ships as both open-weight models on Hugging Face and a fully hosted API platform.

Key specs:
- **Model:** Ultravox v0.7, built on Llama 3.3 70B (8B variant also available)
- **Benchmark:** 91.8% on Big Bench Audio without reasoning; 97% with thinking enabled
- **Languages:** 26 spoken languages including English, Chinese, Japanese, Spanish, Hindi, Arabic, and more
- **Latency:** Real-time streaming with sub-second response times (they claim performance competitive with GPT-4o and Gemini Live when latency is factored in)
- **Open source:** Models available on Hugging Face under open weights

## The API

Ultravox exposes a REST API at `https://api.ultravox.ai/api/` with straightforward authentication via an `X-API-Key` header. API keys are 41 characters (two alphanumeric parts separated by a period).

### Core Endpoints

- **Create a call** — POST to `/api/calls` to start a real-time voice session
- **List calls** — GET `/api/calls` to retrieve call history
- **Get call messages** — Retrieve full text transcripts and audio recordings
- **Agent management** — Configure prompts, tools, and voice settings

### What You Get

- **Function calling (Tools):** Connect your agent to external APIs and data sources during calls
- **RAG / Knowledge:** Feed custom knowledge bases so agents can answer domain-specific questions
- **Call Stages:** Advanced branching and conversation flows
- **Voice Cloning:** Create custom voices for your agents
- **Telephony integrations:** Built-in connections to major telephony providers
- **Webhooks:** Real-time event notifications for call state changes
- **Conversation history:** Full audio recordings and text transcripts stored automatically

### SDKs

Ultravox provides SDKs for web and mobile platforms, making it straightforward to integrate voice AI into JavaScript, iOS, and Android applications.

## Pricing

| Plan | Cost | Concurrency | Notes |
|------|------|-------------|-------|
| Free | $0 (30 min included) | 5 calls | Good for prototyping |
| Pay-as-you-go | $0.05/min (includes TTS) | 5 calls | No upfront cost |
| Pro | $100/month (billed annually) | No hard cap | For scaling teams |
| Enterprise | Custom | No cap + priority | Dedicated infrastructure |

The 5-cent-per-minute price includes both the speech model inference and text-to-speech generation, which is competitive when you factor in what separate ASR + LLM + TTS services would cost.

## Rate Limits

- **API requests:** 500/second per account, 200/second per API key
- **Call creation (Free/PAYGO):** 5/second, 30/minute
- **Call creation (Pro):** 10/second, 120/minute
- **Call creation (Scale):** 30/second, 360/minute

## Who This Is For

Ultravox targets developers building voice AI agents that need to feel genuinely conversational. The main use cases:

- **Customer service bots** that handle complex, multi-turn conversations
- **Voice assistants** for apps that need real-time responsiveness
- **Telephony integrations** for call centers and automated phone systems
- **Multimodal applications** where understanding tone and timing matters

The open-weight nature of the model also makes it suitable for teams that need self-hosted or on-premise deployment options.

## Technical Architecture

What makes Ultravox architecturally different is the multimodal projector approach. Instead of the standard ASR → LLM → TTS pipeline, Ultravox:

1. Takes raw audio input
2. Converts it through a multimodal projector directly into the LLM's embedding space
3. Processes it natively alongside text within a single model forward pass
4. Emits streaming text output (speech generation is noted as "coming soon")

This is based on research from AudioLM, SeamlessM4T, Gazelle, and SpeechGPT. The direct coupling means the model can eventually understand paralinguistic cues (timing, emotion) that separate ASR systems lose.

The open-source model on Hugging Face (v0.7) uses Llama 3.3 70B as the base. An 8B variant is also available for resource-constrained deployments.

## Getting Started

1. Sign up at [app.ultravox.ai](https://app.ultravox.ai) (free, 30 minutes included)
2. Get your API key from the dashboard
3. Hit the playground to test prompts and voices interactively
4. Use the REST API or SDKs to integrate into your application

The [API reference](https://docs.ultravox.ai/api-reference) is well-structured with interactive testing (paste your key directly into the docs). Quickstart guides cover agent setup in minutes.

---

## The Bottom Line

Ultravox represents a genuinely different approach to voice AI. By eliminating the ASR bottleneck and processing speech natively within the language model, it achieves lower latency and potentially better understanding of conversational nuance. The open-weight models on Hugging Face give teams flexibility, while the hosted API makes it easy to ship without managing infrastructure. At 5 cents per minute (TTS included), the pricing is straightforward and competitive.

If you're building voice agents and tired of the latency tax that comes with the standard ASR-LLM-TTS pipeline, Ultravox is worth serious evaluation.
