---
title: "Soniox Speech-to-Text API: Real-Time Transcription Across 60+ Languages"
excerpt: "Soniox delivers production-grade speech-to-text and translation via a single API, with sub-200ms latency, speaker detection, and native accuracy across 60+ languages."
coverImage: "/assets/blog/soniox-speech-api-cover.jpg"
date: 2026-03-27T05:41:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/soniox-speech-api-cover.jpg"
---

## TL;DR

Soniox is a real-time speech-to-text and translation API built for developers building voice agents, live transcription systems, and multilingual applications. It supports 60+ languages with native-speaker accuracy, handles mid-sentence language switching, detects speakers, and offers both REST and WebSocket APIs. Pricing starts at $1.50 per million tokens for async transcription (roughly $0.10 per hour of audio).

## The Problem

Most speech-to-text APIs treat English as the default and everything else as an afterthought. Accuracy drops sharply when accents, dialects, or mixed-language speech enters the picture. Real-time applications like voice agents need sub-200ms latency and word-by-word streaming, but many platforms still buffer at sentence boundaries. And for regulated industries like healthcare and finance, data residency requirements make it impossible to use a single-region service.

Soniox tackles all three problems head-on: multilingual accuracy, true real-time streaming, and region-deployable infrastructure.

## How Soniox Works

Soniox provides a single global API for speech-to-text, translation, and conversational understanding. Two integration paths exist:

- **REST API** for async file transcription (upload audio, get results)
- **WebSocket API** for real-time streaming (process speech word by word as it is spoken)

Both use the same underlying models, so there is no accuracy gap between batch and streaming modes.

### Key Capabilities

**Multilingual Transcription** — 60+ languages with native-speaker accuracy, including dialect recognition and mixed-language handling. A sentence that starts in Korean and switches to English mid-phrase gets transcribed correctly in both languages.

**Real-Time Streaming** — Sub-200ms latency. Audio is processed word by word, not after pauses or sentence boundaries. End-of-speech detection uses tone, meaning, and conversational flow to know when a speaker has finished, not just silence thresholds.

**Speaker Detection** — Identifies and separates speakers in real-time across all supported languages, keeping transcripts organized and searchable.

**Speech Translation** — 3,600 language pairs supported. True real-time any-to-any translation that streams mid-sentence, not after complete sentences.

**Domain Context** — Provide domain, topic, or participant names and Soniox adapts its recognition to use the right terminology for healthcare, law, finance, or other fields.

**Alphanumeric Recognition** — Phone numbers, email addresses, license plates, reference IDs — captured exactly as spoken across any language.

## Pricing

Token-based pricing, straightforward to calculate:

| | Async (File) | Real-Time (Streaming) |
|---|---|---|
| Input Audio | $1.50 / 1M tokens | $2.00 / 1M tokens |
| Input Text (context) | $3.50 / 1M tokens | $4.00 / 1M tokens |
| Output Text | $3.50 / 1M tokens | $4.00 / 1M tokens |

Reference: 1 hour of audio ≈ 30,000 input audio tokens. That works out to roughly $0.10/hour for async and $0.12/hour for real-time streaming.

## Getting Started with the API

Sign up at the [Soniox Console](https://console.soniox.com/signup/) and generate an API key. The console also provides usage logs, billing details, and SDK access.

### Async Transcription (File Upload)

Upload an audio file and receive a transcription job:

```bash
curl -X POST "https://api.soniox.com/transcriptions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@audio_sample.mp3" \
  -F "model=soniox-1" \
  -F "language=en"
```

### Real-Time Streaming (WebSocket)

Stream audio from a microphone or live source for word-by-word transcription:

```python
import websockets
import json
import asyncio

async def transcribe_stream():
    async with websockets.connect(
        "wss://api.soniox.com/transcriptions/stream",
        additional_headers={"Authorization": "Bearer YOUR_API_KEY"}
    ) as ws:
        # Send configuration
        await ws.send(json.dumps({
            "model": "soniox-1",
            "language_hints": ["en"]
        }))
        
        # Stream audio chunks
        with open("live_audio.raw", "rb") as f:
            while chunk := f.read(4096):
                await ws.send(chunk)
                # Receive transcription tokens
                response = await ws.recv()
                data = json.loads(response)
                for token in data.get("tokens", []):
                    print(token["text"], end="", flush=True)

asyncio.run(transcribe_stream())
```

## Compliance and Data Residency

Soniox processes and stores audio entirely within the selected region. Current regions: US, EU, Japan. Additional regions (Korea, Australia, Canada, India, Saudi Arabia, UK, Brazil) are in the pipeline.

Certifications:
- SOC 2 Type 2
- ISO/IEC 27001:2022
- HIPAA compliant
- GDPR compliant

Audio is never stored or saved — everything is processed in real-time and discarded.

## Where Soniox Fits in the Stack

Soniox is not trying to be an all-in-one AI platform. It does one thing: understand speech. That narrow focus is its advantage. Teams building voice agents, meeting transcription tools, or multilingual customer support systems can integrate Soniox through a single API without juggling separate services for transcription, translation, and speaker diarization.

The [Agora](https://www.agora.io/) partnership is telling — Agora's infrastructure powers real-time communications for millions of users, and they chose Soniox for speech accuracy. That kind of integration-level trust says more about production reliability than any benchmark.

## Alternatives Worth Comparing

| Feature | Soniox | Google Speech-to-Text | OpenAI Whisper | Deepgram |
|---|---|---|---|---|
| Languages | 60+ | 125+ | 99+ | 30+ |
| Real-time streaming | Yes (sub-200ms) | Yes | No (async only) | Yes |
| Mid-sentence translation | Yes | No | No | Limited |
| Speaker detection | Yes | Yes | No | Yes |
| Domain context hints | Yes | Custom models | No | Yes |
| Regional data residency | US, EU, Japan | Global | N/A | US |
| Pricing (async/hr) | ~$0.10 | ~$0.024-$0.036 | Free (self-hosted) | ~$0.0125 |

Soniox's edge is real-time streaming accuracy and multilingual handling. Google wins on raw language count and price. Deepgram is cheaper for high-volume English workloads. Whisper is free if you self-host and latency does not matter.

## Bottom Line

Soniox is built for the developers who need speech understanding that works in production, across languages, in real time. It is not the cheapest option, and it is not the most feature-bloated. But if your voice agent needs to handle a customer switching between Spanish and English mid-sentence, or your meeting platform needs live translation with speaker attribution, Soniox solves problems that most speech APIs still fumble.

The token-based pricing is transparent, the compliance story is solid, and the API surface is minimal enough that integration takes hours, not weeks.

---

**Links:**
- [Soniox API Documentation](https://soniox.com/docs)
- [Soniox Console](https://console.soniox.com/)
- [Pricing](https://soniox.com/pricing)
- [Benchmarks](https://soniox.com/benchmarks)
- [Voice Agent Use Case](https://soniox.com/use-cases/voice-agents)
