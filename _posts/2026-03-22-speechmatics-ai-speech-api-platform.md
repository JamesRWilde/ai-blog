---
title: "Speechmatics API: Enterprise-Grade Speech-to-Text and Voice AI for Developers"
excerpt: "Speechmatics offers real-time and batch speech-to-text APIs across 55+ languages, plus a new text-to-speech engine and Flow voice agent platform."
date: 2026-03-22T11:30:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
coverImage: "/assets/blog/speechmatics-cover.png"
ogImage:
  url: "/assets/blog/speechmatics-cover.png"
---

## TL;DR

Speechmatics is a UK-based speech technology company offering developer APIs for real-time transcription, batch transcription, and text-to-speech. Its engine covers 55+ languages, supports on-premises deployment, and includes a new Voice SDK called Flow for building conversational AI agents. The free tier gives developers 480 minutes of transcription and 1 million TTS characters per month.

## The Problem

Voice is becoming the primary interface for AI agents, but most speech-to-text APIs share the same weaknesses: poor performance on accented English, limited language coverage, rigid cloud-only deployment, and per-minute pricing that punishes scale. Developers building voice agents, meeting transcription tools, or media workflows need a speech layer that works reliably across languages, runs where they need it, and doesn't break the budget at production volumes.

## What Speechmatics Actually Offers

Speechmatics provides four core API products:

**Batch Transcription** processes pre-recorded audio files via REST API. You submit a job, it queues, and you get structured JSON back with word-level timestamps, speaker diarization, and language identification. It supports 55+ languages and handles mixed-language audio, which is a real problem in multilingual environments that most competitors handle poorly.

**Real-Time Transcription** streams audio over WebSocket and returns partial and final transcripts with sub-second latency. This is the API that powers live captioning, voice agent middleware, and call center analytics pipelines. You get two concurrent sessions on the free tier and fifty on the paid plan.

**Text-to-Speech** is newer and currently English-only, with more languages planned. It's optimized for low latency, which makes it suited for voice agent responses where delays kill the user experience. The engine produces natural-sounding speech rather than the robotic monotone that cheaper TTS services often return.

**Flow** is their voice agent SDK, released in late 2025. It sits on top of the transcription and TTS APIs and lets developers build conversational agents with WebSocket connections. It handles the audio orchestration layer so you don't have to wire up STT, LLM, and TTS yourself.

## Pricing Breakdown

| Tier | Monthly Cost | STT Included | TTS Included | Concurrent Real-Time Sessions |
|---|---|---|---|---|
| **Free** | $0 | 480 minutes | 1M characters (~20hrs) | 2 |
| **Growth** | From $0.24/hr (usage-based) | 480 free minutes, then pay per hour | 1M free characters, then pay per character | 50 |
| **Enterprise** | Custom | Unlimited | Unlimited | Custom |

The free tier is genuinely usable for development and prototyping. Most competing platforms either cap free usage so aggressively it's barely functional, or require a credit card upfront. Speechmatics does neither.

The Growth tier starts at $0.24 per hour of audio processed, with volume discounts. For context, that's competitive with AssemblyAI and significantly cheaper than some of the premium options from OpenAI or Google for comparable accuracy.

Enterprise adds on-premises deployment, multi-region cloud options, custom model training, and custom voice and language development for TTS. This is where Speechmatics differentiates from cloud-only competitors like Deepgram or Rev AI.

## Developer Experience

The API surface is clean. You authenticate with an API key from the Speechmatics portal, submit audio via REST (for batch) or WebSocket (for real-time), and get structured JSON back. The docs are well-organized, the API reference is browsable, and there are quickstart guides for both batch and real-time workflows.

Batch transcription is straightforward: POST your audio URL or file, specify language, optionally enable diarization and punctuation, and poll for results or set a callback webhook. The real-time API requires more setup (WebSocket connection management, audio streaming), but the SDKs handle the handshake and parsing.

Language detection is automatic in batch mode, which is useful when you don't know the audio language in advance. Speaker diarization labels each segment with a speaker ID, which is essential for meeting transcription and call analysis.

## On-Premises and Edge Deployment

This is Speechmatics' strongest differentiator against cloud-only competitors. You can run their entire stack in your own infrastructure, which matters enormously for healthcare (HIPAA), legal (confidential recordings), and government sectors where audio data cannot leave your environment.

The on-prem option supports CPU-only containers, which means you don't need GPU clusters to run transcription. They also have an on-device deployment option in development, targeting battery-sensitive devices and offline scenarios.

Most competing APIs, including the major ones from OpenAI, Google, and Amazon, are cloud-only. If your compliance requirements prohibit sending audio to third-party servers, Speechmatics is one of few options with a production-ready on-prem story.

## 55+ Languages: How Real Is It?

Speechmatics claims 55+ languages, and based on third-party benchmarks, the coverage is genuinely broad. Unlike some providers that add language support as a checkbox exercise with mediocre quality, Speechmatics has historically invested in language-specific acoustic models.

The engine handles code-switching (mixing languages within a single audio stream), which is common in multilingual workplaces and nearly useless on most competing platforms. If you're building transcription for European, Asian, or African markets where multilingual speech is the norm, this matters more than peak accuracy on American English.

## Who Should Use It

Speechmatics is built for:

- **Voice agent developers** who need the STT-TTS layer without building their own audio pipeline
- **Media and broadcast companies** needing live captioning at scale
- **Contact centers** doing real-time call analytics and compliance monitoring
- **Healthcare and legal teams** that require on-premises deployment for sensitive audio
- **Meeting platform builders** who need multilingual transcription with speaker identification

It's less suited for developers who only need basic English transcription and want the absolute lowest price. For that, the free tier of Whisper or lower-cost providers might suffice.

## Key Specs at a Glance

| Feature | Detail |
|---|---|
| Languages | 55+ for STT, English for TTS (expanding) |
| Real-time latency | Sub-second partial results |
| Deployment | SaaS, on-prem, on-device (coming) |
| Audio formats | WAV, MP3, FLAC, OGG, WebM, and more |
| Max file size (batch) | 5GB per file |
| Speaker diarization | Yes, with speaker IDs |
| Language detection | Automatic in batch mode |
| Custom models | Available on Enterprise tier |
| API types | REST (batch), WebSocket (real-time, Flow) |
| Free tier | 480 min STT + 1M TTS chars/month |

## The Bottom Line

Speechmatics isn't the flashiest name in speech AI, but it's one of the most technically complete. The combination of broad language support, real-time and batch APIs, on-prem deployment, and a genuinely useful free tier makes it a serious option for developers building production voice applications. The Flow agent SDK is newer and less proven than alternatives like LiveKit Agents or Pipecat, but the underlying speech engine has decades of research behind it, originating from neural network speech recognition work at Cambridge University in the 1980s.

If you're evaluating speech APIs beyond the usual Big Three, Speechmatics belongs on your shortlist.
