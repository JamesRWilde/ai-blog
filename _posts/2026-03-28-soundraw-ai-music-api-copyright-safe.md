---
title: "SOUNDRAW API: The AI Music Engine That Powers Canva, Captions, and Filmora"
excerpt: "SOUNDRAW's AI music API generates unlimited, copyright-safe tracks trained exclusively on in-house compositions. Used by 300M+ creators across Canva, Filmora, and Captions, it offers a legally defensible alternative to scraping existing music for AI training."
coverImage: "/assets/blog/soundraw-api-cover.png"
date: 2026-03-28T23:30:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/soundraw-api-cover.png"
---

## TL;DR

SOUNDRAW is a Tokyo-based AI music generation platform with a developer API that creates unlimited royalty-free tracks across 250+ genres. Unlike most AI music tools, SOUNDRAW trains its models exclusively on music produced in-house by its own team of professional musicians, meaning every generated track is fully copyright-safe with no third-party licensing risk. The API starts at $300/month and is used by Canva (175M+ monthly users), Filmora (100M+ users), and Captions (100K+ daily active users) to embed music generation directly into their products.

## The Problem

Adding music to video content, games, podcasts, or commercial apps is a minefield. Copyright law does not distinguish between "I found this track on a royalty-free site" and "I actually own the rights," and a single Content ID claim on YouTube can demonetize an entire channel. Most developers solve this by licensing tracks from libraries like Epidemic Sound or Artlist, but those catalogs are finite, expensive at scale, and come with usage restrictions that vary by platform and territory.

For platforms building video editors, social media tools, or game engines, the problem compounds. Their users expect background music to be available instantly, unique to their project, and legally bulletproof. Stock libraries cannot deliver uniqueness, and in-house music production does not scale.

The remaining option, AI-generated music, introduces its own risk. If the model was trained on copyrighted songs, every output carries an undisclosed taint. The training data question is not hypothetical: the EU AI Act, US Copyright Office guidance, and ongoing litigation against Suno and Udio have made it clear that provenance matters. A platform that deploys an AI music API trained on scraped tracks is one lawsuit away from a licensing crisis.

## What Is SOUNDRAW

SOUNDRAW is an AI music generation platform founded in 2018 and headquartered in Tokyo. The company builds its own AI models, trains them exclusively on original compositions produced by its in-house team of professional musicians, and offers the resulting system through a web application and a REST API for developers.

The platform generates full-length musical tracks, not just short loops or samples. Each track is assembled bar by bar, with adjustable genre, mood, tempo, key, and length. The AI does not output a single fixed file; it constructs an editable composition where individual instrument layers can be toggled, volume levels adjusted, and sections rearranged through a browser-based mixer.

SOUNDRAW's core differentiator is its training data. Every piece of music used to train the AI was composed and recorded by SOUNDRAW's own production team. The company owns both the master recordings and publishing rights for all training material. This means there is no third-party content involved, no scraping of Spotify or YouTube, and no reliance on Creative Commons or public domain works that might have questionable provenance.

### Key facts

- Founded: 2018, Tokyo, Japan
- API pricing: $300/month (API Plan)
- Enterprise pricing: $199/month (direct generation), $19/month (store BGM)
- Genre coverage: 250+ styles
- Output formats: WAV, MP3, MIDI, stems
- Major API clients: Canva, Filmora, Captions

## How the SOUNDRAW API Works

The SOUNDRAW API is a REST-based service that accepts generation parameters and returns downloadable audio files. Developers specify genre, mood, tempo, and track length, and the API returns a set of unique tracks generated in real time. No two requests produce the same output, even when identical parameters are submitted.

### Generation flow

1. **Send a request** with parameters: genre (e.g., "Hip Hop," "Ambient," "Lo-Fi"), mood (e.g., "Hopeful," "Dark," "Laid Back"), tempo (low/normal/high), and duration.
2. **Receive generated tracks** as downloadable audio files in WAV, MP3, or MIDI format.
3. **Access stems** for advanced mixing, allowing individual instrument layers to be separated and edited.
4. **Deploy commercially** with perpetual licensing, no content ID risk, and no usage restrictions per platform.

The API is designed for integration into existing products. Video editing platforms, game engines, podcast tools, and ad tech systems call the API when a user needs background music, and the response is immediately playable or downloadable.

### Code example

Here is a representative example of how the API integration works conceptually:

```python
import requests

API_KEY = "your_soundraw_api_key"
BASE_URL = "https://api.soundraw.io/v1"

# Generate a track
response = requests.post(
    f"{BASE_URL}/generate",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={
        "genre": ["Hip Hop", "Lo-Fi"],
        "mood": ["Laid Back"],
        "tempo": "normal",
        "length": 180,  # seconds
        "format": "wav"
    }
)

tracks = response.json()["tracks"]
for track in tracks:
    download_url = track["download_url"]
    # Use the track in your application
```

This is illustrative. The actual endpoint structure and parameters should be confirmed against SOUNDRAW's official API documentation at `https://discover.soundraw.io/api`.

## Copyright Safety and Training Data

The most consequential aspect of SOUNDRAW's architecture is its training data provenance. While companies like Suno and Udio face lawsuits over alleged unauthorized use of copyrighted music for training, SOUNDRAW sidesteps this entirely by composing its own material.

Every track used in training was:
- Written by SOUNDRAW's in-house musicians
- Recorded in controlled studio sessions
- Licensed under SOUNDRAW's own master and publishing rights
- Never distributed to external platforms before training

This creates a closed loop: the AI learns from music SOUNDRAW owns, and every output is a derivative of that owned catalog, not of any third-party work. For developers integrating the API, this means:

- **No Content ID claims**: Generated tracks will not trigger automated copyright detection on YouTube, Spotify, Twitch, or other platforms.
- **Perpetual licensing**: Tracks remain licensed for commercial use even after a SOUNDRAW contract ends.
- **No attribution required**: Enterprise and API users do not need to credit SOUNDRAW.
- **EU AI Act compliance**: Training data provenance is documented and auditable.

This is not a theoretical advantage. The company is a signatory to the AI for Music (aiformusic.info) initiative, alongside Roland and Universal Music Group, which establishes principles for responsible AI use in music creation.

## Pricing

| Plan | Price | Use Case | API Access |
|------|-------|----------|------------|
| Free | 0 | Non-commercial, personal | No |
| Standard | 11 EUR/month | YouTube, Twitch, TikTok, Instagram | No |
| Pro | 33 EUR/month | Full monetization, all platforms | No |
| Store BGM | $19/month | Retail background music | No |
| Enterprise | $199/month | Corporate, production teams | No |
| API | $300/month | Developer integration | Yes |

The API plan includes dedicated technical support, copyright-safe output cleared for perpetual commercial use, and integration assistance. Enterprise plans with custom rate limits and SLA guarantees are available by contacting sales.

## Major Integrations

SOUNDRAW's API powers music generation for several of the largest creator platforms in the market:

**Canva** — 175M+ monthly users can add background music to presentations, videos, and designs. The API handles selection and generation automatically based on the user's content context.

**Filmora** — 100M+ users access SOUNDRAW's API directly inside the video editor, generating and editing original tracks without leaving the application.

**Captions** — 100K+ daily active users add music to short-form videos through a few taps, with the API handling generation, format conversion, and delivery in real time.

These integrations demonstrate the API's target use case: embedding music generation as a feature inside a larger product, rather than using SOUNDRAW as a standalone tool.

## Strengths and Limitations

### Strengths

- **Copyright provenance is airtight**: Training only on in-house music eliminates the biggest legal risk in AI music generation.
- **API-first architecture**: Designed for product integration, not just individual creator use.
- **Stem separation**: Full multitrack output allows advanced audio editing workflows.
- **250+ genre coverage**: Sufficient range for most commercial applications.
- **Perpetual licensing**: Tracks remain usable even after contract termination.

### Limitations

- **No vocal generation**: SOUNDRAW produces instrumental tracks only. No singing, voice synthesis, or lyrics.
- **Price floor**: The $300/month API plan is higher than many competing options, and the lack of a free API tier means prototyping requires a paid commitment.
- **Limited customization depth**: While genre and mood selection is broad, there is no way to specify exact chord progressions, key changes, or instrument configurations through the API (though the web mixer allows post-generation editing).
- **Japanese team, English-first docs**: The company is based in Tokyo, and while the product is English-language, some support channels and documentation may have localization gaps.

## The Bottom Line

SOUNDRAW occupies a specific niche in the AI API landscape: legally defensible, enterprise-grade music generation for product integration. If you are building a video editor, game engine, podcast platform, or ad tech system and need to offer users instant background music without copyright risk, this is one of the few options where the training data provenance actually holds up under scrutiny.

It is not the cheapest option, and it does not generate vocals. But for the use case it targets, it is battle-tested at massive scale by Canva, Filmora, and Captions, and its copyright safety story is more credible than any competitor trained on scraped audio.

For developers evaluating AI music APIs, the question is not whether the music sounds good enough (SOUNDRAW's output is indistinguishable from human-composed background tracks for most commercial use). The question is whether you can defend the legal risk. With SOUNDRAW, the answer is yes.
