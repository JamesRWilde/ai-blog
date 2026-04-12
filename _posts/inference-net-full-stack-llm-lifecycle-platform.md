---
title: "Inference.net: The Full-Stack LLM Lifecycle Platform That Wants to Own Your Entire AI Loop"
excerpt: "Inference.net bundles deploy, observe, train, and evaluate into a single API-first platform — complete with their own open-source models and a production data flywheel that auto-trains from traces."
coverImage: "/assets/blog/inference-net-cover.png"
date: 2026-03-16T11:24:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/inference-net-cover.png"
---

## TL;DR

Inference.net is a full-stack LLM lifecycle platform that combines model deployment, observability, fine-tuning, and evaluation into a single unified API. Rather than selling just inference or just monitoring, they're building a closed-loop system: production traces feed evals, evals surface training data, training produces better models, and deployment replaces the old version — all within one platform. They ship their own open-source models (Schematron, Cliptagger) alongside third-party frontier models, price competitively on B200 hardware, and claim SOC 2 compliance.

## The Problem

The modern LLM stack is fragmented in ways that actively hurt product quality. You deploy a model on one provider (Baseten, Together, Replicate), monitor it with another (Helicone, Langfuse), fine-tune with a third (OpenAI, Anyscale), and evaluate with yet another tool (Braintrust, Patronus) — or more likely, you skip half these steps entirely because stitching them together is a full-time job.

The real cost isn't the per-token pricing. It's the data leakage between stages. Your production traces contain gold — real user behavior, failure modes, edge cases — but that signal dies in a logging dashboard because nobody has time to manually curate it into training datasets, run evals against new model candidates, and promote winners through staging. The "flywheel" everyone talks about is a whiteboard drawing at most companies.

## What Inference.net Actually Does

Inference.net positions itself as the missing connective tissue across four stages of the LLM lifecycle:

### 1. Deploy

Serverless LLM inference via OpenAI-compatible API. The model catalog includes:

- **Nemotron 3 Super** (NVIDIA) — $2.50/$5.00 per 1M tokens, 1M context window
- **Google Gemma 3** — $0.15/$0.30 per 1M tokens, 125K context
- **Schematron 3B/8B** (their own models) — $0.02–$0.04/$0.05–$0.10 per 1M tokens
- **Cliptagger 12B** (their own VLM) — $0.30/$0.50 per 1M tokens, designed for video understanding

They also offer dedicated GPU hosting on B200 instances ($9.98/hr for 180 GiB VRAM) for models like Kimi K2.5, MiniMax-M2.5, GLM-5, and GPT-OSS 120B. Batch API and async inference with webhook support are available for throughput-oriented workloads.

### 2. Observe

"Catalyst" is their observability layer — a drop-in SDK that instruments any LLM pipeline in "5 minutes." It captures full request/response traces across any provider (not just Inference.net), tracking:

- Request volume, error rates, latency percentiles (p50/p75/p90/p99)
- Input/output payload sizes and cost breakdowns
- Full traces including prompts, tool calls, and downstream provider behavior

This is the critical data source for the flywheel. Every production signal becomes potential training data.

### 3. Train

This is where Inference.net differentiates from pure inference or pure observability plays. Their fine-tuning pipeline:

- **Auto-curates training data** from production traces and eval failures — no manual data wrangling
- **Validates before promoting** — new model variants are automatically evaluated against baseline behavior
- **Continuous retraining** — set up loops that retrain on fresh production data as usage patterns shift

The claim: train "private, GPT-5-quality models with 90% lower cost and 5x lower latency." That's a bold assertion — the "GPT-5 quality" part especially. They mention Cal AI and GravityAds as customers whose custom models cut latency by 50%+.

### 4. Evaluate

"Catalyst Evaluate" converts production traces into continuous eval datasets. It supports:

- Building evals directly from observed user behavior (not synthetic benchmarks)
- Automated scoring plus human review
- Regression detection before model promotion

## The Open-Source Models

Inference.net ships two proprietary model families:

- **Schematron** (3B and 8B) — focused on reasoning, structured output, and JSON generation. Priced aggressively at $0.02–$0.04/M input tokens.
- **Cliptagger 12B** — a vision-language model for video understanding with schema-consistent JSON outputs. Targets the video tagging/analysis use case at a fraction of closed-model pricing.

These aren't frontier models, but they're positioned as cost-efficient workhorses for production workloads where GPT-5-tier capability isn't required.

## The Architecture Question

Inference.net runs on an interesting architectural bet: that teams want one vendor across the entire LLM lifecycle rather than best-of-breed point solutions. The pitch makes sense for startups and mid-size teams who can't staff a platform engineering org. For enterprises already invested in Databricks, LangSmith, or custom ML platforms, switching costs are steep.

The OpenAI-compatible API is table stakes at this point. The real question is whether the Catalyst observability layer and auto-training pipeline are good enough to replace dedicated tools. Helicone, Langfuse, and Braintrust have years of head start on observability and eval tooling.

## Pricing & Positioning

| Feature | Inference.net | Typical Alternatives |
|---|---|---|
| Gemma 3 (125K ctx) | $0.15/$0.30/M | ~$0.15/$0.60 (Google AI Studio) |
| Nemotron 3 Super (1M ctx) | $2.50/$5.00/M | N/A (limited availability) |
| Own models (Schematron 8B) | $0.04/$0.10/M | $0.20/$0.20 (Llama 3.1 8B on Together) |
| B200 dedicated hosting | $9.98/hr | $12+/hr (various) |
| Observability | Included (Catalyst) | $0–$500+/mo (Helicone, Langfuse) |
| Fine-tuning | From traces (auto) | Manual pipeline (most platforms) |

The included observability and auto-training are the differentiators. Most inference providers charge separately for monitoring (or don't offer it), and fine-tuning typically requires manually curating datasets.

## Open Questions

- **Model quality**: Schematron and Cliptagger are positioned as "workhorse" models, but there's limited independent benchmarking. The "GPT-5 quality" fine-tuning claim needs verification.
- **Vendor lock-in**: The flywheel is most powerful when you run everything through Inference.net. Moving observability and training elsewhere breaks the loop.
- **Scale**: Cal AI and GravityAds are named as customers, but 8.3M requests on their dashboard screenshot suggests relatively early scale compared to Together AI or Groq.
- **Training provenance**: Auto-curating training data from production traces is powerful but raises questions about data quality filtering, PII handling, and overfitting to recent user patterns.

## Sources

- [Inference.net](https://inference.net)
- [Inference.net Docs](https://docs.inference.net)
- [Inference.net Models](https://inference.net/models)
- [Cal AI testimonial (via Inference.net homepage)](https://inference.net)
