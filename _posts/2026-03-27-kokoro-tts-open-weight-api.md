---
title: "Kokoro TTS API: The 82M-Parameter Open-Weight Voice Synthesis Model Punching Way Above Its Size"
excerpt: "Kokoro is an Apache-licensed text-to-speech model with just 82 million parameters that rivals much larger systems in quality while costing under $1 per million characters. Here is why developers are paying attention."
coverImage: "/assets/blog/kokoro-tts-cover.png"
date: 2026-03-27T00:07:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/kokoro-tts-cover.png"
---

## TL;DR

Kokoro is an open-weight text-to-speech model with 82 million parameters that delivers voice quality comparable to models ten times its size. It runs on consumer GPUs, costs under $1 per million characters when served via API, supports 8 languages with 54 voice options, and ships under an Apache 2.0 license. Trained on just $1,000 worth of GPU compute, it represents a new benchmark for what small, efficiently trained models can achieve in speech synthesis.

## The Problem With Most TTS Solutions

The text-to-speech market has a bloat problem. ElevenLabs, OpenAI, and Google Cloud TTS all produce excellent output, but they lock you into per-character pricing, offer zero portability, and give you no insight into what your model actually learned. If the API changes its voice behavior overnight, you absorb the cost of adaptation.

Open-source alternatives have historically traded quality for freedom. Models like Piper and Coqui TTS run locally but sound noticeably synthetic compared to commercial offerings. The gap between "runs on my laptop" and "sounds like a professional voice actor" has been wide enough that most production systems default to paid APIs.

Kokoro closes that gap in a way that is hard to ignore.

## What Kokoro Actually Is

Kokoro is a text-to-speech model built on the StyleTTS 2 architecture with an iSTFTNet vocoder. It was created by a developer known as @rzvzn on Discord, trained on a few hundred hours of permissive and synthetic audio data. The v1.0 release landed in January 2025, and it has since been adopted across dozens of commercial APIs and open-source projects.

The model has 82 million parameters. For context, ElevenLabs' proprietary models are estimated in the hundreds of millions to low billions. Kokoro achieves competitive quality at a fraction of the size through efficient architecture choices and carefully curated training data.

Key technical facts:

- **Architecture:** StyleTTS 2 + iSTFTNet (no diffusion, decoder-only)
- **Training cost:** Roughly $1,000 total for 1,000 hours of A100 80GB GPU time
- **Output sample rate:** 24 kHz
- **G2P engine:** [Misaki](https://github.com/hexgrad/misaki), a phoneme-to-grapheme library also maintained by the author
- **License:** Apache 2.0 (weights and code)

## Language and Voice Support

As of the v1.0 release, Kokoro supports 8 languages with 54 pre-built voices:

| Language Code | Language | Voice Count |
|---|---|---|
| `a` | American English | Multiple |
| `b` | British English | Multiple |
| `e` | Spanish (es) | Available |
| `f` | French (fr-fr) | Available |
| `h` | Hindi (hi) | Available |
| `i` | Italian (it) | Available |
| `j` | Japanese | Requires `misaki[ja]` |
| `p` | Brazilian Portuguese (pt-br) | Available |
| `z` | Mandarin Chinese | Requires `misaki[zh]` |

Voice IDs follow a naming convention like `af_heart` for American female voices. You can also load custom voice tensors directly using PyTorch, which opens the door to voice cloning if you have the right source audio.

## API Pricing

This is where Kokoro genuinely disrupts the market. As of early 2025, the per-character cost of serving Kokoro over API is:

- **Replicate:** ~$0.65 per million characters
- **DeepInfra:** ~$0.80 per million characters

At roughly 1,000 characters per minute of audio output, that translates to approximately **$0.06 per hour of generated speech**. For comparison, ElevenLabs charges $0.30 per million characters on their starter tier, and OpenAI's TTS runs $15 per million tokens (roughly $15 per million characters).

Kokoro is not just cheaper. It is an order of magnitude cheaper, and you are not locked into a single provider.

## Getting Started With the API

Installation is straightforward. The `kokoro` package is available on PyPI:

```bash
pip install kokoro>=0.9.4 soundfile
apt-get install -qq -y espeak-ng
```

The basic usage pattern uses `KPipeline`, a generator-based interface that yields graphemes, phonemes, and audio tensors in a loop:

```python
from kokoro import KPipeline
import soundfile as sf

pipeline = KPipeline(lang_code='a')  # American English
text = "Your text goes here. Kokoro handles sentence splitting automatically."

generator = pipeline(text, voice='af_heart', speed=1)
for i, (gs, ps, audio) in enumerate(generator):
    sf.write(f'output_{i}.wav', audio, 24000)
```

The `split_pattern` parameter lets you control where the model breaks text into segments. By default, it splits on newlines.

For multilingual support, you simply change the `lang_code` and select an appropriate voice:

```python
# British English
pipeline = KPipeline(lang_code='b')
generator = pipeline("Hello there, old chap.", voice='bf_emma')

# Spanish
pipeline = KPipeline(lang_code='e')
generator = pipeline("Hola, ¿cómo estás?", voice='es_mx')
```

## Self-Hosting vs. Managed APIs

Because Kokoro is Apache-licensed and runs on consumer hardware, you have two realistic deployment paths:

**Self-hosting:** Run the model directly on a GPU with 4GB+ VRAM. The 82M parameter count means it fits comfortably on older cards. You can serve it behind FastAPI, deploy it in a Docker container, or embed it directly in a desktop application. There is no licensing fee and no usage cap.

**Managed APIs:** If you do not want to manage infrastructure, providers like Replicate, DeepInfra, and HuggingFace Inference Endpoints already host Kokoro. Pricing is pay-per-character with no minimum commitments.

The self-hosting path is particularly attractive for applications that process sensitive audio data or need to operate in air-gapped environments. You own the entire stack.

## Limitations To Know About

Kokoro is not perfect, and honest coverage requires noting where it falls short:

- **No diffusion or encoder release:** The model uses a decoder-only approach. This means it does not benefit from the quality gains that diffusion-based vocoders provide, and some audio artifacts are harder to smooth out.
- **Training data scope:** The v1.0 model was trained on a few hundred hours of audio. Larger commercial models train on thousands to tens of thousands of hours. Kokoro's voice diversity and accent coverage reflect this constraint.
- **Non-English quality varies:** English voices are the strongest. Other languages work but may not match the naturalness of language-specific commercial models.
- **Voice cloning is unofficial:** While the architecture supports loading custom voice tensors, there is no built-in voice cloning pipeline. Community tools exist but are not part of the official release.
- **Scam warning:** The author explicitly warns about fake websites like kokorottsai.com and kokorotts.net that attempt to profit from the model's name. These are not affiliated with the project.

## Who Should Use Kokoro

Kokoro makes the most sense for developers who need:

- **High-volume TTS** where per-character costs from ElevenLabs or OpenAI add up quickly
- **On-premise deployment** for privacy-sensitive applications like healthcare or legal transcription
- **Rapid prototyping** where you want to test TTS integration without committing to a paid API
- **Multilingual applications** that need decent (not necessarily best-in-class) voice output across several languages

It is less suitable for applications where voice quality is the primary product differentiator, such as audiobook production or premium voice assistants. In those cases, the quality gap between Kokoro and top commercial models is still noticeable.

## The Bigger Picture

Kokoro is part of a broader trend in AI where small, efficiently trained models are eating into capabilities that previously required massive compute and proprietary data. The fact that a community-trained model with $1,000 in GPU costs can produce TTS output that many users find indistinguishable from commercial alternatives says something about where the industry is headed.

It also underscores the power of open licensing. Because Kokoro is Apache-licensed, it has been integrated into dozens of projects within months of release. No legal review, no enterprise sales call, no usage caps. Just `pip install` and go.

The voice synthesis landscape will keep evolving, but Kokoro has set a new floor for what "good enough" TTS costs and how accessible it should be.

## Resources

- [Kokoro-82M on HuggingFace](https://huggingface.co/hexgrad/Kokoro-82M)
- [Kokoro GitHub Repository](https://github.com/hexgrad/kokoro)
- [Kokoro PyPI Package](https://pypi.org/project/kokoro/)
- [Misaki G2P Library](https://github.com/hexgrad/misaki)
- [Audio Samples](https://huggingface.co/hexgrad/Kokoro-82M/blob/main/SAMPLES.md)
- [Voice Catalog](https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md)
- [Evaluation Results](https://huggingface.co/hexgrad/Kokoro-82M/blob/main/EVAL.md)
