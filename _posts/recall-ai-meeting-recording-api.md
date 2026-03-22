---
title: "Recall.ai — The API Behind 3000+ Meeting Recording Products"
excerpt: "Recall.ai provides the infrastructure layer for meeting recording across Zoom, Google Meet, Microsoft Teams, and Webex, powering thousands of conversation intelligence tools."
coverImage: "/assets/blog/recall-ai-cover.png"
date: 2026-03-22T03:26:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/recall-ai-cover.png"
---

## TL;DR

Recall.ai is an API-first infrastructure platform that handles the messy reality of recording meetings across every major video conferencing platform. Instead of building separate integrations for Zoom, Google Meet, Teams, and Webex, developers get a single API that sends bots into calls or captures via a desktop SDK, returning transcripts, recordings, and structured metadata. The platform now powers over 3,000 conversation intelligence products, and recently simplified pricing to $0.50 per recording hour.

## The Problem

If you've ever tried to build a meeting recording feature from scratch, you know the pain. Each platform has its own authentication model, SDK requirements, rate limits, and quirks. Zoom alone has multiple credential types (SDK keys, ZAK tokens, RTMS feeds), each with different behavior depending on whether the meeting is authenticated, whether the host is present, or whether real-time media streaming is enabled. Google Meet has its own API constraints. Microsoft Teams has separate integration paths. And Webex does its own thing entirely.

The result is that a startup building an AI notetaker or a conversation intelligence tool can easily spend six months just on meeting platform integrations before writing a single line of their actual product logic. Recall.ai exists to compress that timeline to days.

## How It Works

Recall.ai offers two primary integration methods:

**Meeting Bot API** — You programmatically spawn a bot that joins a meeting as a participant. The bot captures audio, video, and in some configurations, real-time transcription streams. This is the approach used when explicit recording consent mechanisms are needed or when building AI agents that need to listen to meetings in real time.

**Desktop Recording SDK** — A desktop-based SDK that records meetings directly from the user's machine without a visible bot in the call. This is the approach used by products like Granola, where the recording experience needs to be seamless and unobtrusive.

Both approaches feed into the same backend, which handles the platform-specific complexity of actually capturing and processing the media. The API returns structured data: transcripts (with speaker diarization), recordings (audio and video), participant information (including participant emails for speaker identification), and meeting metadata.

## Pricing

Recall.ai recently overhauled pricing for 2026:

- **$0.50 per recording hour**, billed to the second (so a 30-minute meeting costs $0.25)
- Built-in transcription at $0.15 per hour, or bring your own transcription provider
- 7 days of free storage per recording, then $0.05 per hour of recording retained for 30 days
- 500 hours/month recording limit on Pay As You Go, no limit on Launch and Enterprise plans
- First 5 hours of recording are free when signing up

The pricing model is platform-agnostic — a 1-hour Zoom recording costs the same as a 1-hour Teams recording, regardless of participant count.

## Platform Coverage

The API supports joining and recording from:

- Zoom (including Zoom SDK-based meetings, authenticated meetings via ZAK tokens)
- Google Meet
- Microsoft Teams
- Slack Huddles
- Webex
- GoTo Meeting

For mobile scenarios, Recall.ai is developing a Mobile SDK (noted as coming soon on their site).

## Why It Matters

The meeting recording infrastructure space is one of those boring-but-critical layers that enables entire categories of AI products. Nearly every AI notetaker, conversation intelligence platform, sales coaching tool, or compliance product relies on some form of meeting capture. Recall.ai has positioned itself as the picks-and-shovels provider for this category.

Their customer list tells the story: Brighthire, Fellow, Mindtickle, Mem, 15Five, Circle Medical, Flatfile, and hundreds of others. The pitch is straightforward — you focus on your product's intelligence layer, Recall.ai handles the plumbing.

## Notable Technical Details

A few things stand out about their engineering approach:

**Zoom RTMS support** — They've published detailed analysis of Zoom's Real-Time Media Streaming behavior, including edge cases around when RTMS starts, pauses, or stops based on meeting settings and participant behavior. This level of platform-specific knowledge is exactly what makes their API valuable — it's not just a wrapper, it's accumulated operational knowledge about how these platforms actually behave in production.

**Participant email identification** — A recent feature that provides participant emails for meetings, enabling precise speaker identification. This is a significant upgrade over generic "Speaker 1, Speaker 2" diarization.

**Postgres scaling insights** — Their engineering blog includes deep dives into production infrastructure issues like Postgres postmaster contention at scale, suggesting they're operating at genuine volume.

## Limitations and Considerations

The bot-based approach has inherent tradeoffs. Bots are visible meeting participants, which means they require meeting permissions to be configured correctly and they don't work in every scenario (some enterprise Zoom configurations block bots entirely). The desktop SDK sidesteps this but requires installing software on user machines, which introduces its own deployment complexity.

The platform also sits in a space where the underlying meeting platforms can change their APIs or policies at any time. Recall.ai's value proposition depends on their ability to absorb those changes so customers don't have to — but that's an ongoing operational commitment, not a one-time engineering effort.

---

**Pricing:** Pay As You Go from $0.50/hour | **Free tier:** First 5 hours free | [recall.ai](https://www.recall.ai)
