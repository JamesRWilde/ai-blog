---
title: "TwelveLabs API: When Your AI Actually Watches the Video Instead of Guessing"
excerpt: "TwelveLabs built a video understanding API that processes visuals, audio, speech, and text simultaneously. Their latest Marengo 3.0 model handles up to 4 hours of video and speaks 36 languages."
date: 2026-03-22T12:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
coverImage: "/assets/blog/twelvelabs-cover.webp"
ogImage:
  url: "/assets/blog/twelvelabs-cover.webp"
---

## TL;DR

TwelveLabs is a video understanding API platform that goes beyond simple transcription or frame analysis. Their models process video holistically, combining visual, audio, and textual information to understand what actually happens in footage. Two core models power the platform: **Marengo** for search and embeddings, **Pegasus** for video-to-text analysis. The latest Marengo 3.0 update supports 4-hour videos, 36 languages, and composed text-and-image queries. Free tier available with 600 minutes of indexing.

## The Problem

Video is the internet's largest untapped data format. We produce over 800 million hours of video content daily, but most of it sits in archives, media libraries, and surveillance systems with no meaningful way to search or analyze it. Traditional approaches pick one lane: OCR reads on-screen text, speech-to-text handles audio, object detection tags frames. None of them understand the *meaning* of a scene.

A sports highlight contains visual cues (player movement), audio (crowd reactions, commentary), and on-screen graphics (scoreboards, logos). A compliance video might have spoken instructions, visual demonstrations, and text overlays. Current tools force developers to stitch together multiple APIs and hope the outputs make sense when combined. They rarely do.

---

## The Platform

TwelveLabs tackles this with two foundation models purpose-built for video understanding.

### Marengo: Search and Embeddings

Marengo 3.0 (current stable release) is the search workhorse. It ingests video and generates embeddings that capture visual, audio, and textual information simultaneously. This enables:

- **Natural language search**: Query a video library with phrases like "the moment the goalkeeper dives left" and get timestamped results
- **Composed queries**: Combine text descriptions with reference images in a single search
- **Fine-grained detection**: Brand logos, on-screen text, objects as small as 10% of the video frame
- **Motion search**: Identify specific movements, camera techniques (zoom, pan, tracking shots)
- **Audio comprehension**: Find scenes based on music, lyrics, or specific sounds
- **Sports intelligence**: Recognized soccer, basketball, baseball, ice hockey, and American football actions

The 3.0 release represents a significant jump from 2.7 (which is being deprecated in March 2026). Key improvements: video duration doubled to 4 hours, text query length increased from 77 to 500 tokens, language support expanded from 12 to 36 languages, and embeddings optimized to 512 dimensions for faster processing.

### Pegasus: Video-to-Text

Pegasus is the analysis engine. Give it a video and it generates text output: summaries, captions, structured data extraction, event timelines. It integrates visual, audio, and speech information to produce contextually aware text rather than blind transcription.

Use cases include generating social media captions from raw footage, creating chapter summaries for long-form content, extracting key information from training videos, and producing compliance reports from surveillance footage.

---

## API Design

The API follows a straightforward workflow: create an index, upload videos, query or analyze.

### Core Endpoints

| Endpoint | Function |
|----------|----------|
| **Search API** | Find specific moments using text or image queries |
| **Analyze API** | Generate text from video content |
| **Embed API** | Create embeddings for custom ML pipelines |

### SDK Support

Python and Node.js SDKs are available, with interactive Google Colab notebooks for each capability (search, analyze, embed). The API is REST-based, so any HTTP client works.

### Index Architecture

Videos live inside indexes. Each index can hold multiple videos, and search queries run across the entire index. This design suits media libraries, surveillance archives, and content management systems where you need to search across a collection rather than individual files.

### Fine-Tuning

TwelveLabs offers model fine-tuning for enterprise customers. If your domain has specific visual or audio patterns (medical imaging, industrial inspection, sports analytics), they can adapt the base models to your data.

---

## Pricing

| Plan | Indexing Limit | Environment | Index Expiry |
|------|---------------|-------------|--------------|
| **Free** | 600 minutes (lifetime) | Shared | 90 days |
| **Developer** | Unlimited | Shared | Unlimited |
| **Enterprise** | Unlimited | Dedicated | Unlimited |

Free tier requires no credit card. Developer plan adds infrastructure fees and SSO/SAML support. Enterprise includes dedicated environments, fine-tuning, and dedicated support.

---

## Who It's For

- **Media companies**: Searchable archives of broadcast content, automated highlight generation, rights management
- **Sports analytics**: Player tracking, action recognition, game analysis across hours of footage
- **E-learning platforms**: Content indexing, automated chapter generation, searchable lecture libraries
- **Surveillance and security**: Event detection, anomaly identification, compliance monitoring
- **Social media and marketing**: Caption generation, content recommendations, brand monitoring

---

## Verdict

TwelveLabs isn't trying to be everything. They're focused on one problem, video understanding, and building the best possible foundation models for it. The Marengo 3.0 release shows real technical progress (longer videos, more languages, better embeddings), and the API design is clean enough that you can go from zero to search results in an afternoon.

The main limitation is that it's a specialized tool. You won't get text generation, image synthesis, or code assistance here. But if your product touches video at scale, and you need more than basic transcription or thumbnail generation, TwelveLabs is worth evaluating.

The free tier with 600 minutes is generous enough to validate whether the API handles your specific content before committing money. That's the right way to sell an API.

---

## Key Links

- **Website**: [twelvelabs.io](https://www.twelvelabs.io)
- **API Docs**: [docs.twelvelabs.io](https://docs.twelvelabs.io)
- **GitHub**: [github.com/twelvelabs-io](https://github.com/twelvelabs-io)
- **Pricing**: [twelvelabs.io/pricing](https://www.twelvelabs.io/pricing)
