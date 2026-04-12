---
title: "Google Gemma 4: The Most Capable Open AI Models You Can Run Locally"
excerpt: "Google just released Gemma 4, a family of four open-weight models built on Gemini 3 architecture that deliver frontier-level reasoning on consumer hardware, from phones to workstations."
coverImage: "/assets/blog/gemma-4.jpg"
date: 2026-04-04T03:30:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/gemma-4.jpg"
---

## TL;DR

Google has released Gemma 4, the most capable family of open-weight AI models available under a commercially permissive Apache 2.0 license. Built on the same research foundation as Gemini 3, Gemma 4 spans from edge-optimized 2B-parameter models for phones to a 31B dense model that punches well above its weight, ranking as the #3 open model on the Arena AI text leaderboard.

If you have been paying $10,000 a month for API access to run tasks a $400 graphics card can now handle offline, you should probably sit down.

## What Changed

Gemma 4 is not a single model. It is a family of four purpose-built models, each optimised for a different class of hardware while sharing the same Gemini 3 architectural DNA.

There is something important happening here. Google is not trying to sell you cloud compute. They are giving you the weights. The entire family ships under Apache 2.0, which means commercial use, modification and redistribution are unrestricted.

Let me break down what the lineup looks like, because the sizing strategy is deliberate.

The **26B Mixture of Experts model** activates just 3.8 billion parameters per inference pass, making it exceptionally fast for token-per-second throughput. It ranks #6 on Arena AI. The **31B Dense model** is the quality-focused sibling designed as a foundation for fine-tuning. It ranks #3 on Arena AI and outperforms models twenty times its size.

Then you have the edge models: **E2B and E4B**, which activate effective 2B and 4B parameter footprints respectively. These run offline on phones, Raspberry Pi devices and NVIDIA Jetson Orin Nano hardware with near-zero latency. Yes, actually offline. No API call, no round trip to Google, no per-token invoice.

Gemma downloads have crossed 400 million since first generation launch. The Gemmaverse now contains over 100,000 community-built variants. The developer ecosystem for these models is not theoretical any more.

## Technical Capabilities

The capability set across the family is substantial and varies by model size.

Advanced reasoning receives significant improvement. The larger models demonstrate genuine multi-step planning capability on mathematics and instruction-following benchmarks that require deep logic chains. The edge models preserve multimodal competence while prioritising low-latency processing and battery efficiency.

Code generation quality is strong across all variants. The larger models effectively turn workstations into local-first AI coding assistants capable of offline operation without cloud connectivity.

Vision and audio processing are native across the family, not bolted on as afterthoughts. All models process images and video at variable resolutions and handle visual tasks including OCR and chart understanding out of the box. The E2B and E4B models add native audio input for speech recognition and speech understanding tasks.

Context windows stretch to 256,000 tokens on the larger models and 128,000 on the edge variants. You can pass entire code repositories or long documents into a single prompt without chunking or summarising first.

The models are natively trained on over 140 languages. This is not a post-finetuning bolt-on. The training corpus includes multilingual data from the start, which matters enormously for any team building applications for non-English-speaking users.

Agentic workflow support is native. Function calling, structured JSON output generation and system instruction support are all built in, enabling developers to construct autonomous agents that interact with external tools and APIs without glue code.

## Pricing and Availability

Here is the part that should trouble every proprietary API vendor in the market.

Gemma 4 on Google AI Studio is completely free for both input and output tokens. Context caching, context storage and tuning are all free in the free tier. The paid tier shows "Not available" for per-token pricing, which strongly suggests Google has not yet set a paid rate for Gemma 4 on the Gemini API itself, treating it as a free-tier incentive.

There is a catch, and it matters. Free-tier data is used to improve Google products. If you need data privacy for production workloads, you need the paid tier or you need to self-host the weights, which is the entire point of Apache 2.0.

Self-hosting the bfloat16 weights fits on a single 80GB NVIDIA H100 GPU. Quantised versions run on consumer-grade graphics cards. You are not locked into Google Cloud if you do not want to be.

Day-one support exists across the critical tooling ecosystem: Hugging Face (Transformers, TRL, Transformers.js, Candle), Ollama, vLLM, llama.cpp, MLX, NVIDIA NIM and NeMo, LM Studio, Unsloth, SGLang, Baseten, Docker and more. If your stack is not supported, you are probably using something that does not support most things.

## Why This Matters

Let me be clear about what is happening structurally here. Google is building a moat by giving the product away.

Every developer who builds on Gemma 4 is using Google architectures, Google training patterns, Google ecosystem tooling. When that developer inevitably needs scale, the natural migration path runs through Vertex AI and Google Cloud infrastructure. The models are open, but the gravity is toward Google.

This does not make the models less valuable to developers. Quite the opposite. The combination of frontier-level capability, open licensing and free API access removes every plausible reason to run a smaller, worse model behind a paywall.

For teams that operate under tight data governance, the option to self-host an Apache 2.0 model removes compliance friction. The models undergo the same infrastructure security protocols as Gemini, which means they are not cut-down or safety-compromised relative to the closed versions.

The Edge story matters too. E2B and E4B running on Android devices through AICore Developer Preview represents a genuine shift in what on-device AI can accomplish. If your application needs sub-100ms latency without any network dependency, this is now the most capable option available.

## How to Get Started

Google AI Studio provides instant access to the 31B and 26B models without any setup. Edge models are available through Google AI Edge Gallery. Models download from Hugging Face and Kaggle. If you want the simplest possible entry point, open Ollama and pull the gemma4 collection.

For production deployment, Vertex AI, Cloud Run and GKE all support Gemma 4 natively. NVIDIA TPU-accelerated serving is available for regulated workloads requiring the highest compliance guarantees.

Android developers have a specific path forward through Android Studio Agent Mode and the ML Kit GenAI Prompt API for production applications.

## The Honest Assessment

Gemma 4 is genuinely excellent. The intelligence-per-parameter ratio is the strongest in the open-weight ecosystem. The 31B model beating models twenty times larger on Arena AI is not marketing copy, it is a measurable benchmark result on a public leaderboard.

The pricing strategy is aggressive to the point of being disruptive. Free API access to models of this calibre, under Apache 2.0, forces every competing open-weight lab to justify why you should not just download Gemma instead.

The limitations are worth noting. Gemma 4 does not have access to Google Search grounding, which remains a Gemini API exclusive. The paid tier pricing is not yet published for Gemma 4, so teams that need the data privacy of paid-tier processing cannot price their production deployments yet. The E2B and E4B models, while impressive for edge deployment, have smaller context windows and will struggle with tasks that require the depth the larger family members bring.

None of these limitations undermine the core achievement. Gemma 4 is the strongest argument yet for why open-weight models will continue capturing market share from closed APIs. The gap is narrowing. For many workloads, it has already closed.

Gemini 3 Flash and Pro
Anthropic Claude 4.6 (Opus, Sonnet, Haiku)
DeepSeek V3.2 at $0.28/M tokens
OpenAI GPT-5.4 with native computer use

Gemma 4 does not directly compete with all of these. It competes with the ones that cost money per token. When your alternative is free and open, the value proposition of paid APIs gets harder to defend with each release cycle.
