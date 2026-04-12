---
title: "Synthesia API: Programmatic AI Video Generation with Avatars at Scale"
excerpt: Synthesia's REST API lets developers generate studio-quality AI avatar videos in 160+ languages, automate bulk video personalization, and integrate video creation into existing workflows without production crews.
coverImage: "/assets/blog/synthesia-cover.jpg"
date: 2026-03-21T15:44:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/synthesia-cover.jpg"
---

# Synthesia API: Programmatic AI Video Generation with Avatars at Scale

If you have ever tried to produce corporate training videos, product demos, or multilingual marketing clips at scale, you already know the pain: booking talent, renting studios, scheduling editors, coordinating voiceover artists across languages. Synthesia, the London-based AI video platform, bets that most of that process can be replaced by a script and an API call. With over 50,000 companies reportedly using the platform and penetration into 90% of the Fortune 100, it is worth examining what the API actually offers developers.

## What Is Synthesia?

Synthesia is an AI video generation platform that converts text scripts into videos featuring synthetic avatars speaking in over 160 languages. The company was founded in 2017 and has positioned itself squarely at the enterprise end of the market, emphasizing compliance certifications (SOC 2 Type II, GDPR, ISO 42001) and integration with learning management systems via SCORM export.

The core value proposition is straightforward: type a script, choose an avatar and language, get a video. No cameras, no film crews, no editing suites.

## The API: What Developers Actually Get

The Synthesia REST API provides programmatic access to the video generation pipeline. Here is what matters:

### Video Creation

The primary endpoint accepts a JSON payload containing your script text, chosen avatar ID, voice selection, and output configuration. The API then queues a video render and returns a video ID. Once processing completes, you can retrieve the rendered MP4 file or an embeddable player URL.

```bash
curl -X POST "https://api.synthesia.io/videos" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "input": [
      {
        "script": "Welcome to our quarterly training update.",
        "avatar": "anna",
        "background": "office"
      }
    ],
    "test": false
  }'
```

### Bulk Personalization

This is where the API gets interesting for enterprise use cases. Synthesia supports bulk video generation from structured data (CSV or XLSX files). The API allows developers to:

- Feed a template video with placeholder variables
- Supply a data file with per-recipient personalization (names, roles, custom text)
- Generate hundreds or thousands of individualized video variants in a single batch

For organizations producing personalized onboarding videos, region-specific product walkthroughs, or individually addressed compliance updates, this eliminates what was previously a manual, error-prone process.

### Avatar and Voice Management

The API exposes endpoints for listing available avatars (240+ on Enterprise plans), configuring voice selections across 160+ languages, and pairing cloned voices with personal avatars. Voice cloning lets users record their voice once, then generate videos featuring that voice in any supported language.

### Video Metadata and Status

Since video rendering is asynchronous, the API provides endpoints to check render status, retrieve metadata (duration, resolution, format), and fetch completion notifications.

## Key Platform Features

### Express-2 Avatars

The latest avatar generation, Express-2, supports contextual gestures (waving, pointing, clapping) that adapt to the script content. These are not just lip-sync engines layered over static images; the avatars produce upper-body movements synchronized with speech.

### AI Video Assistant

Beyond raw API access, Synthesia offers an AI Video Assistant that can take a document (PDF, PowerPoint, Word), a URL, or a free-form prompt and automatically generate a structured video with scenes, script, and layout. This feature is powered by OpenAI under the hood, with prompts retained for up to 30 days for abuse monitoring.

### Localization Pipeline

The platform's 1-click translation converts a video into 80+ languages automatically. AI dubbing preserves the speaker's natural voice characteristics while achieving lip-sync alignment in the target language. For a company that needs the same training video in 30 regional languages, this collapses what used to be a multi-month localization project into minutes.

### Integrations

Synthesia integrates with SCORM-compliant LMS platforms, supports branded video pages, password-protected sharing, SSO access control, and video analytics (views, watch time, completion rates, drop-off points).

## Pricing Structure

The API is available across multiple plan tiers:

- **Free**: 10 minutes of video per month, 9 stock avatars, no API access
- **Starter**: 120 minutes/year, 125+ avatars, API access with 120 minutes/year included
- **Creator**: 360 minutes/year, 180+ avatars, API access with 360 minutes/year included
- **Enterprise**: Unlimited minutes, 240+ avatars, custom API limits, dedicated support

Studio avatars (high-fidelity, custom-designed digital twins) are a paid add-on at $1,000/year. Enterprise plans include bulk personalization, live collaboration, and priority content moderation.

## Who This Is For

The Synthesia API is most relevant for:

- **Learning and development teams** building automated training pipelines
- **Product companies** needing localized video content at scale
- **Marketing operations** producing personalized video outreach
- **Internal communications** teams replacing written updates with video
- **Agencies** offering white-label video production services

It is less relevant for creative filmmaking, short-form social content, or real-time interactive video. Synthesia is a production tool, not a creative sandbox.

## Practical Considerations

A few things to keep in mind:

**Content moderation applies to all videos.** Synthesia runs moderation on every video generated through the API. Enterprise plans get priority moderation; lower tiers may experience delays.

**The API has usage limits.** Even on paid plans, API minutes are drawn from your plan's total video generation budget. If you burn through 360 minutes of API-generated content, you have zero minutes left for manual editing in the web UI.

**Not all avatars are available via API.** Studio avatars (the custom-designed ones) require an add-on purchase. Personal avatars (your digital twin) are limited to 3-5 per account depending on plan.

**The render pipeline is not real-time.** Expect processing time proportional to video length. Short clips (under 60 seconds) typically render in minutes; longer videos take proportionally more.

## Bottom Line

Synthesia has carved out a defensible niche in enterprise video generation. The API is not trying to be a general-purpose video editing SDK; it is a focused tool for producing avatar-driven videos at programmatic scale, with the localization and compliance features that large organizations actually need. If your use case matches that profile, the API is well-documented and mature enough to build on. If you need creative freedom, real-time rendering, or consumer-grade simplicity, look elsewhere.
