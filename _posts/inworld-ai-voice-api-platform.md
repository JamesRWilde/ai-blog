---
title: "Inworld AI API: The Voice-First Platform Powering Next-Gen Conversational Apps"
excerpt: "Inworld AI has quietly transformed from an NPC startup into one of the most comprehensive voice AI API platforms on the market. Here's what developers need to know."
coverImage: "/assets/blog/inworld-ai-cover.png"
date: 2026-03-21T16:58:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/inworld-ai-cover.png"
---

## TL;DR

Inworld AI started as a gaming NPC company. Today it runs a full-stack voice AI API platform serving 1 million daily active users, with the #1 ranked TTS engine globally, an intelligent model router spanning 220+ LLMs, and a realtime speech-to-speech API that costs a fraction of competitors. Pricing starts at $0.005 per minute for TTS.

---

## The Pivot Nobody Noticed

Inworld AI raised $50 million from investors like Intel Capital and Samsung to build AI NPCs for games. That was 2023. By 2025, the company had quietly reinvented itself as a voice-first AI infrastructure provider, and the results are genuinely impressive.

The company now brands itself as "top-ranked voice AI for realtime applications," which sounds like marketing fluff until you look at the actual product lineup. This is not a single-purpose TTS wrapper. Inworld runs four distinct API products, all accessible through a unified developer platform.

## The Four Pillars

**Inworld TTS** is the flagship. Their TTS-1.5 Max model holds the #1 global ranking for text-to-speech quality, according to independent benchmarks. It delivers sub-200ms latency with full emotional expression, and supports instant voice cloning. The cheaper TTS-1.5 Mini runs at half the cost ($0.005 per minute) for applications where quality can take a small hit on speed and price.

**Inworld STT** offers speech-to-text with semantic and acoustic voice activity detection. Unlike basic STT that just transcribes audio, Inworld's approach profiles speaker context, supports custom vocabulary, and provides word-level timestamps with diarization. It also aggregates multiple providers through a single API, including AssemblyAI and Whisper via Groq.

**Inworld Realtime API** is where things get interesting. This is a full-duplex speech-to-speech system over WebSocket or WebRTC. The assistant can call functions mid-conversation without breaking audio, and context management is dynamic, allowing developers to retrieve, truncate, or modify conversation history on the fly. The platform uses acoustic and metadata signals to condition not just what is said but how and when it is said.

**Inworld Router** sits above everything else as an intelligent LLM routing layer. One API call gets distributed across OpenAI, Anthropic, Google, Mistral, and dozens of other providers based on latency, cost, and quality requirements. Built-in A/B testing, failover, and analytics mean developers can swap models without changing code.

## Pricing That Makes Sense

Inworld uses credit-based, usage-based pricing with no subscriptions required for the On-demand tier.

- TTS-1.5 Mini: $5 per million characters (~$0.005/min)
- TTS-1.5 Max: $10 per million characters (~$0.01/min)
- STT: $0.28 per hour (Inworld's own), or pass-through rates for Groq Whisper ($0.111/hr) and AssemblyAI ($0.15/hr)
- Router and Realtime API: pass-through pricing based on the underlying model

For context, ElevenLabs charges $0.06 per minute for their standard TTS. Inworld's TTS-1.5 Max at $0.01 per minute is six times cheaper while holding a higher quality ranking. That gap matters at scale.

Enterprise pricing adds volume discounts, HIPAA compliance, BAA agreements, on-prem deployment, zero data retention, and EU/India data residency options.

## The Router Advantage

The Inworld Router deserves its own section because it is the piece that ties the platform together. Instead of integrating with OpenAI for text, Deepgram for speech-to-text, ElevenLabs for TTS, and a separate routing service like Portkey or LiteLLM, a developer can point everything at Inworld's single API surface.

The router currently lists 220+ models from providers including OpenAI (GPT-5.x series, o3, o4-mini), Anthropic (Claude Opus 4.6, Sonnet 4.6), Google (Gemini 2.5 Flash and Pro), Mistral, Groq, DeepInfra, and Fireworks. Inworld even runs a 50% credit-back promotion on all Mistral model usage through April 2026.

## Real Numbers, Real Traction

Inworld claims 1 million daily active users in 19 days for their OtherHalf companion app. That is a consumer application built on the same API infrastructure that developers access. It validates the platform's ability to handle scale, though the companion app market is crowded and volatile.

On the enterprise side, the compliance certifications tell a story: SOC 2 Type II certified, HIPAA compliant, GDPR compliant. These are table stakes for any serious voice AI platform serving healthcare, finance, or regulated industries.

## What's Missing

No platform is perfect. Inworld's documentation is scattered across their Mintlify-hosted docs and the marketing site, making it harder to get started than it should be. The Realtime API page returned a 404 during testing, which suggests the product is still being actively restructured.

There is no free tier. The On-demand plan is pay-as-you-go with no minimum, which is better than a credit card wall, but competitors like Google and OpenAI offer free credits to get started.

The STT pricing is also confusing. Inworld lists its own STT at $0.28/hour alongside pass-through pricing for AssemblyAI and Groq Whisper. It is unclear whether the Inworld STT-1 model is their own or a managed wrapper, and the documentation does not explain the quality differences between providers clearly.

## Who Should Use It

Inworld AI makes the most sense for developers building voice-first applications at scale, especially those who need both TTS and STT in a single integration. Gaming, companionship, customer service, and real-time translation are natural fit use cases.

For teams already juggling multiple AI API providers, the Router alone might justify the switch. Consolidating OpenAI, Anthropic, Google, and dozens of other models under a single billing account with built-in failover is a genuine operational win.

The pricing makes it one of the cheapest options for high-volume TTS, and the quality claims are backed by independent rankings. That combination is hard to ignore.

## Getting Started

Inworld offers API access through its On-demand plan with credit card billing. The platform supports standard OpenAI-compatible client libraries, and integration guides are available in their documentation. Python and JavaScript SDKs are the primary entry points.

For teams evaluating the platform, the practical test is straightforward: sign up, generate a voice sample with TTS-1.5 Max, then compare it side-by-side against ElevenLabs and OpenAI's TTS models. The quality difference at the price point is the pitch.

---

*Inworld AI is a commercial product. This article is based on publicly available information from the company's website and documentation as of March 2026. No compensation was received for this coverage.*
