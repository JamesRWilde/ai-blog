---
title: "Vapi: Build Voice AI Agents with a Single API"
excerpt: "Vapi is a developer-first platform for building voice AI agents that make and receive phone calls, with support for custom STT, LLM, and TTS pipelines and sub-600ms response times."
coverImage: "/assets/blog/vapi-cover.jpg"
date: 2026-03-16T17:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/vapi-cover.jpg"
---

## TL;DR

Vapi is an API-first platform for building voice AI agents that can make and receive phone calls, embed into web applications, and orchestrate complex multi-step conversations. It abstracts the messy plumbing between speech-to-text, large language models, and text-to-speech into a single configurable pipeline, and has already processed over 300 million calls for 500,000+ developers.

## The Problem

Building a voice AI agent from scratch is a multi-vendor integration nightmare. You need a speech-to-text engine (Deepgram, AssemblyAI, Whisper), an LLM for reasoning (OpenAI, Anthropic, Google), a text-to-speech provider (ElevenLabs, PlayHT, Cartesia), plus telephony infrastructure (Twilio, Vonage), real-time streaming handling, interruption detection, latency management, and error recovery across all of these.

Each provider has its own API, authentication model, rate limits, and failure modes. Getting sub-second end-to-end latency — the bar for natural conversation — requires careful orchestration at every layer. Most teams spend months on infrastructure before writing their first business logic prompt.

## How Vapi Works

Vapi sits as a unified orchestration layer on top of all these providers. You configure three core components for each assistant:

- **Speech-to-Text (STT):** Converts caller speech to text — supports Deepgram, Gladia, Whisper, and others
- **Large Language Model (LLM):** Processes the conversation and generates responses — supports OpenAI, Anthropic, Google, and any OpenAI-compatible endpoint
- **Text-to-Speech (TTS):** Converts responses back to natural speech — supports ElevenLabs, PlayHT, Cartesia, and more

You can also mix and match: bring your own API keys for any provider, or use Vapi's managed infrastructure. The platform handles real-time streaming between all three stages, manages interruptions (barge-in), noise filtering, and keeps end-to-end latency under 600ms.

## Two Building Blocks

Vapi offers two primitives for different complexity levels:

**Assistants** are single-agent configurations with a system prompt, tools, and structured outputs. Best for:
- Customer support and lead qualification
- Appointment scheduling and routing
- FAQ handling with knowledge base integration

**Squads** orchestrate multiple Assistants with context-preserving transfers. Think of it as a team of specialized agents that hand off conversations cleanly. Best for:
- Medical triage (emergency routing + scheduling)
- E-commerce (orders, returns, VIP handling)
- Property management (maintenance, leasing, billing)

## Developer Experience

The API is designed for developers who want code, not dashboards (though a dashboard exists). Here's the core pattern in TypeScript:

```typescript
import { VapiClient } from '@vapi-ai/server-sdk';

const vapi = new VapiClient({
  token: 'YOUR_PRIVATE_API_KEY'
});

const call = await vapi.calls.create({
  phoneNumberId: 'YOUR_PHONE_NUMBER_ID',
  customer: { number: '+1234567890' },
  assistant: {
    model: {
      provider: 'openai',
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: 'You are a helpful AI assistant. Keep responses concise.'
      }]
    }
  }
});
```

SDKs are available for TypeScript, Python, Flutter, React Native, iOS, and a vanilla JS script tag. There's also a React Web SDK for embedding voice directly in web apps, and a CLI for terminal-first workflows.

Key developer features:
- **OpenAI Realtime API support** for ultra-low latency speech-to-speech
- **Function calling / tools** for connecting to external APIs, databases, and CRMs
- **Code tool** for executing TypeScript directly in the assistant without a server
- **Knowledge bases** for RAG-powered responses
- **Multilingual support** with automatic language detection
- **Pronunciation dictionaries** for domain-specific terminology
- **Voicemail detection** and handling
- **Background speech denoising**

## Use Cases and Adoption

Vapi reports some substantial numbers: 300M+ calls processed, 2.5M+ assistants launched, 500K+ developers on the platform. Their customer list includes Unity, Intuit, NY Life, Instawork, and Housecall Pro.

The most common use cases they highlight:
- **Inbound support:** Automating phone-based customer service with knowledge base access and human escalation
- **Outbound sales:** Lead qualification, appointment setting, follow-up calls
- **Healthcare:** Medical triage, appointment scheduling, prescription refill coordination
- **Logistics:** FleetWorks reportedly saves hundreds of engineering hours monthly using Vapi for their dispatch operations

## Pricing

Vapi operates on a usage-based model where you pay for the underlying provider costs plus Vapi's orchestration fee. The platform itself charges a per-minute rate for call processing, and you separately pay for your chosen STT, LLM, and TTS providers.

This model has an advantage: if you already have API keys for OpenAI, Deepgram, and ElevenLabs, you plug them in and only pay Vapi's platform fee. No vendor lock-in on the AI providers themselves.

Enterprise plans include custom rate limits, dedicated support, and SLA guarantees.

## The Honest Assessment

**What's genuinely impressive:**
- The abstraction is clean. One API replaces what would otherwise be 4-5 separate integrations with custom orchestration logic.
- Provider flexibility is real — you're not locked into Vapi's preferred vendors for any of the three core components.
- The numbers (300M+ calls, 500K+ developers) suggest this isn't a demo-stage product.
- Squads for multi-assistant orchestration is a thoughtful answer to complex real-world workflows that a single prompt can't handle.

**What to watch:**
- Per-minute pricing on top of provider costs means high-volume use cases need careful cost modeling. A 10-minute call involves STT + LLM + TTS + telephony + Vapi's margin.
- The platform is only as reliable as its least reliable provider dependency. If Deepgram has an outage, your voice agent struggles regardless of Vapi's uptime.
- "Bring your own keys" sounds great until you're debugging why your ElevenLabs voice is stuttering — is it Vapi, the provider, or your configuration? Multi-vendor debugging is inherently harder.
- Telephony quality depends on carrier infrastructure, which is outside Vapi's control for most regions.

**Who should care:**
If you're building anything that involves phone-based AI conversations — support lines, appointment booking, outbound sales, internal routing — Vapi saves months of integration work. The developer experience is solid, the API is well-documented, and the provider flexibility means you can optimize for cost, quality, or latency independently.

If you're doing pure text-based AI (chatbots, document processing, code generation), this isn't for you. Vapi is purpose-built for voice.

---

*Sources: [Vapi](https://vapi.ai), [Vapi Docs](https://docs.vapi.ai), [Vapi GitHub](https://github.com/VapiAI), [Vapi Blog](https://vapi.ai/blog)*
