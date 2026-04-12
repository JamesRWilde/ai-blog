---
title: "Fish Audio S2: The Voice AI API That Lets You Clone Any Voice in 10 Seconds"
excerpt: "Fish Audio's S2 voice engine brings studio-quality text-to-speech, instant voice cloning, and transcription to developers through a clean REST API with transparent pricing at $15 per million UTF-8 bytes."
date: 2026-03-22T03:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
coverImage: "/assets/blog/fish-audio-cover.png"
ogImage:
  url: "/assets/blog/fish-audio-cover.png"
---

## TL;DR

Fish Audio is a voice AI platform offering text-to-speech (TTS), instant voice cloning, and automatic speech recognition (ASR) through a straightforward REST API. Their latest S2 model line delivers expressive, human-quality speech in 20+ languages. Pricing is transparent and pay-as-you-go: $15 per million UTF-8 bytes for TTS, $0.36 per hour for transcription. No vendor lock-in, no minimum commitments. With 2 million community-uploaded voices and official Python and JavaScript SDKs, Fish Audio is positioning itself as the developer-friendly alternative to ElevenLabs and Cartesia.

## The Problem

Integrating voice AI into applications has traditionally meant choosing between two bad options: expensive, inflexible enterprise solutions or cheap but robotic-sounding open-source models. ElevenLabs popularized browser-based voice cloning but its API pricing scales aggressively with usage. Cartesia offers low-latency inference but focuses on enterprise contracts rather than indie developer accessibility. Meanwhile, most cloud TTS services from AWS Polly, Google Cloud TTS, and Azure Cognitive Services still produce recognizable synthetic voices that immediately break immersion.

The gap in the market is a voice AI API that sounds genuinely human, lets developers clone voices without hours of reference audio, and charges transparent per-usage pricing without minimums. That is exactly the space Fish Audio is trying to fill.

---

## What Is Fish Audio?

Fish Audio is a voice AI platform founded in 2023 that provides three core capabilities through API:

- **Text-to-Speech (TTS)** — Convert text into expressive, natural-sounding speech using their S2 Pro and S1 models. Supports 20+ languages including English, Japanese, Korean, Chinese, French, German, Arabic, and Spanish.

- **Instant Voice Cloning** — Create a digital voice model from as little as 10 seconds of reference audio. The cloned voice captures tone, pitch, and speaking style, and can speak in any supported language.

- **Automatic Speech Recognition (ASR)** — Transcribe audio files with their transcribe-1 model at $0.36 per hour of audio.

The platform hosts over 2 million community-uploaded voice models, making it one of the largest voice marketplaces available to developers.

## How the API Works

Fish Audio provides a standard REST API with API key authentication. The developer experience is intentionally minimal:

### Text-to-Speech

```
curl https://api.fish.audio/v1/tts \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Welcome to Fish Audio. This voice was generated in real time.",
    "model": "s2_pro"
  }' --output speech.mp3
```

### Voice Cloning

```
curl https://api.fish.audio/v1/voice/clone \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "audio=@reference_sample.mp3" \
  -F "name=My Custom Voice"
```

### Speech-to-Text

```
curl https://api.fish.audio/v1/asr \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "audio=@recording.mp3" \
  -F "model=transcribe-1"
```

## SDK Support

Fish Audio provides official SDKs for Python and JavaScript (TypeScript):

- **Python SDK** — Full async support with streaming capabilities and comprehensive type hints. Install with `pip install fish-audio`.

- **JavaScript/TypeScript SDK** — Node.js compatible with streaming support and a simple API. Install with `npm install @fish-audio/sdk`.

Both SDKs mirror the REST API surface closely, so developers comfortable with raw HTTP requests will find the SDKs familiar rather than abstract.

## Pricing Breakdown

Fish Audio uses a straightforward pay-as-you-go model with no minimum commitments:

| Model | Type | Price |
|-------|------|-------|
| S2 Pro | TTS | $15.00 / million UTF-8 bytes |
| S1 | TTS | $15.00 / million UTF-8 bytes |
| transcribe-1 | ASR | $0.36 / hour |

The TTS pricing model based on UTF-8 bytes rather than characters is unusual but not unheard of. For English text, one UTF-8 byte equals one character. For CJK languages (Chinese, Japanese, Korean), characters typically consume 3 bytes, making TTS proportionally more expensive for those languages.

To put this in perspective: generating a 1,000-word English voiceover (roughly 6,000 bytes) costs approximately $0.09. A full hour of narrated audiobook text at 250 words per minute would run roughly $1.35 in TTS output costs, not including the voice cloning setup.

Compared to ElevenLabs, which charges $0.30 per 1,000 characters for their highest-tier voice, Fish Audio's per-byte pricing is competitive for bulk usage but requires careful calculation for CJK content.

## Competitive Position

The voice AI API market has several established players. Here is where Fish Audio fits:

**vs. ElevenLabs** — ElevenLabs offers a broader voice marketplace and stronger brand recognition. Fish Audio matches on quality with S2 Pro while offering lower cost at scale. ElevenLabs requires paid plans for commercial usage; Fish Audio offers a free tier for personal use with commercial rights available on paid plans.

**vs. Cartesia** — Cartesia emphasizes ultra-low latency for real-time conversational AI. Fish Audio's strength is in voice cloning fidelity and marketplace breadth rather than sub-50ms inference. Choose Cartesia for real-time agents; choose Fish Audio for media production and voice-over pipelines.

**vs. Murf AI** — Murf targets enterprise marketing teams with a polished UI. Fish Audio is more developer-first, with an API-first approach rather than a drag-and-drop studio.

**vs. OpenAI TTS** — OpenAI provides high-quality TTS through their API but does not support custom voice cloning. Fish Audio's voice cloning capability fills this gap for developers who need bespoke voices.

## Use Cases

- **Audiobook production** — Clone a narrator's voice from a short sample, then generate chapter recordings from text manuscripts. The 2M+ voice library means you can audition dozens of narrators before committing.

- **Content localization** — Generate voiceovers in multiple languages using a single cloned voice, maintaining brand voice consistency across markets.

- **In-app voice responses** — Replace robotic TTS in customer service bots, gaming NPCs, or educational apps with expressive, personality-driven speech.

- **Podcast automation** — Convert written articles into podcast episodes using a consistent host voice.

## Limitations and Caveats

No review is complete without the honest caveats:

- **Voice cloning ethics** — Fish Audio allows cloning from minimal audio samples, which raises obvious misuse risks. Their terms of service require consent from the voice owner, but enforcement at scale is an open question for any voice cloning platform.

- **CJK pricing premium** — At 3 bytes per character for Chinese, Japanese, and Korean, TTS costs roughly 3x compared to English for equivalent text length. Developers building for CJK markets should factor this into budget calculations.

- **Newer platform** — Fish Audio is younger than ElevenLabs, Murf, and the hyperscaler TTS offerings. The ecosystem, documentation, and community support are still maturing.

- **Free tier restrictions** — The free tier is personal-use only. Commercial applications require a paid plan upgrade.

## Getting Started

Sign up at [fish.audio](https://fish.audio), generate an API key in settings, and start with the Python SDK:

```python
from fish_audio import FishAudio

client = FishAudio(api_key="YOUR_API_KEY")

# Generate speech
audio = client.tts.create(
    text="Hello from Fish Audio.",
    model="s2_pro"
)

with open("output.mp3", "wb") as f:
    f.write(audio.read())
```

The free tier includes monthly generations for testing, so you can evaluate quality and latency before committing to paid usage.

---

Fish Audio is not trying to replace GPT-4 or compete in the reasoning model arms race. It is focused on a single problem: making voice AI sound genuinely human and making it accessible to developers who want to ship voice features without enterprise procurement cycles. For teams building voice-first products, it is worth adding to the evaluation shortlist.

? Confidence level: Medium. Pricing and feature details verified against Fish Audio's developer documentation as of March 2026. Voice quality comparisons are based on platform claims and third-party benchmarks; independent audio quality testing would strengthen these claims.
