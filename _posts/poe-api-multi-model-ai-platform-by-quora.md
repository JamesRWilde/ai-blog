---
title: "Poe API: Quora's Multi-Model Gateway to Hundreds of AI Models"
excerpt: "Poe's developer API delivers OpenAI-compatible access to hundreds of AI models across text, image, video, and audio — all through a single endpoint and one subscription."
coverImage: "/assets/blog/poe-api-cover.jpg"
date: 2026-03-21T18:13:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/poe-api-cover.jpg"
---

## TL;DR

Poe, Quora's AI platform, now offers a developer API that consolidates access to hundreds of models — Claude, Gemini, Grok, Imagen 4, Veo 3, Runway, ElevenLabs, and more — behind a single OpenAI-compatible endpoint. Existing Poe subscribers can power tools like Cursor, Cline, and Continue with their subscription points, and add-on purchases scale to whatever volume your application demands.

---

## What Poe Actually Is

Poe started as a consumer chatbot aggregator — think of it as a buffet where users could sample different AI models in one interface. Built by Quora and led by CEO Adam D'Angelo (a former Facebook CTO), the platform grew into something larger: a full ecosystem of text, image, video, and audio models, plus millions of community-created bots.

The API, launched in mid-2025, turns that consumer-facing buffet into a developer tool. Instead of juggling separate API keys for OpenAI, Anthropic, Google, Runway, ElevenLabs, and whoever else your workflow touches, you get one key and one base URL.

## How It Works

The interface is deliberately familiar. If you have used the OpenAI Python library, you already know how to use Poe's API:

```python
import openai

client = openai.OpenAI(
    api_key="YOUR_POE_API_KEY",
    base_url="https://api.poe.com/v1",
)

response = client.chat.completions.create(
    model="Claude-Sonnet-4",
    messages=[{"role": "user", "content": "Summarize this article"}],
    stream=True
)
```

Switching models is a one-line change. Replace `"Claude-Sonnet-4"` with `"Grok-4"`, `"Gemini-2.5-Pro"`, or any of the hundreds of available bots. That single-line model swap works across frontier LLMs, open-source models, and the community bot catalog.

## The Model Roster

This is where Poe's pitch gets concrete. The platform covers:

**Text:** Claude variants, Gemini models, Grok, GPT-4o family, Llama variants, Mistral, DeepSeek, and numerous open-source models.

**Image generation:** Imagen 4, GPT Image 1, Flux Kontext, Seedream 3.0, and community image bots.

**Video generation:** Veo 3, Runway Gen 4 Turbo, Kling 2.1.

**Audio:** ElevenLabs for voice synthesis, Lyria for music generation.

For developers building multi-modal pipelines — say, generate an image with Flux, animate it with Runway, add a voiceover with ElevenLabs — having all of that behind one API eliminates a lot of integration pain.

## Pricing and Points

Poe uses a points-based system. Your existing subscription includes a points pool that works identically in the API as it does in Poe's consumer chat interface. If your application needs more volume, you purchase add-on points at rates that Poe says are designed to match what the underlying model providers charge.

This is not the cheapest option for heavy single-model usage. If you only call GPT-4o all day, OpenAI's direct API will likely cost less. Poe's value proposition is in flexibility and breadth — the ability to route between models, run A/B comparisons, or build multi-model workflows without maintaining multiple billing relationships.

## Developer Experience

The API supports streaming, function calling (tool use), and log probabilities. It also works with standard tooling: Cursor, Cline, Continue, Roo, and the `llm` CLI tool all accept OpenAI-compatible endpoints, so switching to Poe is often just a configuration change.

For Python-first developers, Poe also offers a native SDK (`pip install fastapi-poe`) that provides better error handling and access to features like custom bot parameters (aspect ratios for image generation, size specifications, etc.).

There are limitations. Structured outputs with `json_schema` are not supported. Audio input is stripped. Private bots cannot be accessed through the API — only public ones. And some model-specific parameters pass through on a best-effort basis.

## Who Should Use This

**Multi-model experimenters** — Teams evaluating which model works best for a given task will appreciate the ability to swap providers without rewriting code.

**Media pipeline builders** — The combination of image, video, and audio models in one API is genuinely useful for content generation workflows.

**Existing Poe subscribers** — If you already pay for Poe, the API is essentially free to try. Your existing points work immediately.

**Not ideal for:** High-volume single-model production workloads where cost optimization matters more than flexibility.

## The Bigger Picture

Poe's API represents a category of AI infrastructure that is becoming more common: the model router or aggregator layer. Rather than betting on one provider, these platforms let developers treat models as interchangeable components, with the aggregator handling the plumbing.

OpenRouter (already covered on this blog) plays in a similar space. The key difference is that Poe bundles its consumer-facing chat product with the API, and includes access to media generation models that OpenRouter does not focus on.

Whether this model aggregator approach wins long-term depends on pricing pressure from the underlying providers and whether developers prefer the flexibility of a single endpoint over the cost efficiency of direct integrations. For now, Poe occupies a useful middle ground — one key, hundreds of models, no vendor lock-in.

---

**Getting started:** Generate an API key at [poe.com/api_key](https://poe.com/api_key). Documentation lives at [creator.poe.com/docs/api](https://creator.poe.com/docs/api).
