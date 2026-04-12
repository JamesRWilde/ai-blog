---
title: "Descript API: Programmable Video Editing With AI Underlord"
excerpt: "Descript's new API lets developers automate video editing workflows — transcription, captions, filler word removal, dubbing, and AI-powered edits — through simple REST calls and natural language prompts."
coverImage: "/assets/blog/descript-api-cover.jpg"
date: 2026-03-22T09:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/descript-api-cover.jpg"
---

## TL;DR

Descript, the AI-powered video and podcast editor, has launched a public API in Early Access that lets developers programmatically create projects, import media, and run AI edits through REST calls. The standout feature is "Underlord," an AI editing agent you prompt with natural language — tell it to add captions, remove filler words, apply studio sound, or dub content in another language, and it handles the rest. API access is free for paying users during Early Access.

## The Problem

Video editing at scale is painful. Content teams producing dozens of videos per week hit the same wall: every edit cycle requires a human opening an editor, clicking through timelines, and manually applying the same repetitive improvements. Transcription, caption generation, filler word cleanup, audio enhancement — these are solved problems technically, but the workflow bottleneck remains. Most video APIs solve either the transcription side or the rendering side, but nothing bridges the full pipeline from raw footage to polished output.

Descript's API aims to close that gap.

## What the API Actually Does

The Descript REST API (base URL: `descriptapi.com/v1`) covers three core capabilities:

### 1. Project & Media Management

Create projects and import media files via API. The import endpoint accepts a media URL or file, returns a `job_id`, and supports webhooks — pass a `callback_url` and Descript notifies you when processing completes. The response includes composition IDs and media metadata like duration.

```
curl -X POST https://descriptapi.com/v1/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Video Project"}'
```

### 2. Underlord: The AI Editing Agent

This is the headline feature. The agent endpoint accepts a `project_id` and a natural language `prompt`. You describe the edit you want, and Underlord executes it. Descript recommends one-shot prompts with full context since the API is not conversational.

```
curl -X POST https://descriptapi.com/v1/jobs/agent \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "e2f89ce6",
    "prompt": "Add studio sound and captions, remove all filler words"
  }'
```

Supported operations through Underlord include:

- **Transcription** — convert audio/video to text
- **Studio Sound** — regenerative AI removes background noise and enhances voices
- **Filler word removal** — strips "ums," "uhs," and other verbal clutter
- **Caption generation** — burned-in subtitles with styling
- **Translation and dubbing** — multi-language content adaptation
- **Green screen** — AI background removal
- **Eye contact correction** — fixes gaze direction post-recording
- **AI video generation** — B-roll creation from text prompts
- **Voice regeneration** — fix mispronounced words by typing corrections

### 3. Job Status & Webhooks

All long-running operations return a `job_id`. Poll the job status endpoint or use callbacks. The response includes the job state, timing data, and a summary of what was accomplished.

## Developer Experience

Authentication uses Bearer tokens scoped to a specific Descript Drive. Tokens are created in the Descript web app under Settings → API Tokens. The OpenAPI spec is available for download, and the docs site includes working curl examples for every endpoint.

The workflow is straightforward:

1. Create a project via API
2. Import media (returns `job_id`)
3. Poll for import completion or wait for webhook
4. Send Underlord an edit prompt
5. Poll for completion, then review in Descript's web editor

One notable limitation: the API currently ends with a project ready for human review. Auto-publish is not yet available but is on the roadmap.

## Pricing

API access is included for all paying Descript users at no additional cost during Early Access. Usage draws from your plan's existing AI credits and media minutes. Plans range from the free tier (1 media hour/month) to Creator at $24/month (30 media hours/month) and a Team tier for collaborative workflows.

## Who This Is For

The obvious use case is **content teams** automating repetitive post-production. But the API also opens up some less obvious applications:

- **Podcast platforms** building automated enhancement pipelines
- **Course creators** batch-processing lecture recordings with captions and cleanup
- **Marketing teams** auto-generating social clips from longer videos
- **Localization workflows** combining transcription with translation and dubbing
- **Zapier-style automations** triggered by RSS feeds, file uploads, or CRM events

The natural language editing model is particularly interesting for teams that lack video editing expertise. Instead of hiring editors or learning timeline-based software, you describe what you want and Underlord handles it.

## Caveats

This is explicitly **Early Access**. The API surface is under active development and Descript warns that endpoints may change. The auto-publish gap means you still need human review in the loop. And the Underlord agent works best with detailed one-shot prompts — vague instructions produce unpredictable results.

The API is also tightly coupled to Descript's own editing engine. You cannot export raw processed output programmatically; everything routes through a Descript project that opens in their editor. For fully headless pipelines (API in, MP4 out), this is a limitation worth noting.

## The Bottom Line

Descript is making a credible play to become the "Stripe for video editing" — abstract away the complexity of AI-powered post-production behind a clean REST API and natural language prompts. The Early Access stage means production adoption requires caution, but for teams already using Descript, the API removes the last barrier to scaling video workflows.

**Key links:**

- API landing page: [descript.com/api](https://www.descript.com/api)
- Documentation: [docs.descriptapi.com](https://docs.descriptapi.com/)
- OpenAPI spec: Available for download from the docs site
