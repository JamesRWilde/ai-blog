---
title: "Databricks Mosaic AI — The Full-Stack AI Platform That Wants to Be Your Entire ML Pipeline"
excerpt: "Databricks Mosaic AI bundles model serving, fine-tuning, vector search, AI agents, and governance into a single platform. Here's how the Foundation Model APIs actually work."
coverImage: "/assets/blog/databricks-mosaic-ai-cover.png"
date: 2026-03-22T02:30:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/databricks-mosaic-ai-cover.png"
---

## TL;DR

Databricks Mosaic AI is the rebranded umbrella for Databricks' AI and machine learning capabilities, consolidating model serving, fine-tuning, vector search, AI agents, and governance under one roof. Its Foundation Model APIs let you call hosted models like OpenAI's GPT-5.4 family, Anthropic Claude, Google Gemini, and Meta Llama through a unified OpenAI-compatible endpoint. Two pricing modes exist: pay-per-token for quick starts and provisioned throughput for production. It's not cheap, but if you already live in the Databricks ecosystem, it eliminates the need for a separate AI inference layer.

## The Problem

Building AI applications at enterprise scale means juggling a lot of moving parts. You need somewhere to host models, somewhere to store embeddings for RAG, a way to track experiments, governance controls to satisfy compliance teams, and a serving layer that can handle production traffic. Most teams stitch this together from five or six different vendors, each with its own pricing model, auth scheme, and failure mode. The result is a sprawling infrastructure that nobody fully understands and everyone is afraid to touch.

Databricks' answer is to pull all of it into a single platform. Whether that's a compelling proposition or a vendor lock-in play depends entirely on how much of the Databricks stack you're already willing to swallow.

## What Databricks Offers

### Foundation Model APIs

The headline feature for developers is the Foundation Model APIs, which provide hosted access to state-of-the-art open models through a unified endpoint. The API is fully OpenAI-compatible, meaning you can swap in the Databricks endpoint name and use the OpenAI client SDK with zero code changes beyond the base URL and API key.

Currently supported models include:

- **OpenAI GPT-5.4** — Flagship reasoning model with 400K token context and 128K max output tokens. Multimodal input support.
- **OpenAI GPT-5.4 mini** — Cost-optimized variant of the same architecture, built for reliable reasoning at lower latency.
- **OpenAI GPT-5.4 nano** — High-throughput variant for classification and simple instruction-following.
- **OpenAI GPT-5.3 Codex** — Advanced agentic coding model with tool use and long-running task support.
- **OpenAI GPT-5.2 Codex** — Previous-generation coding model still available for workloads that don't need the latest.
- **Anthropic Claude 3.7 Sonnet** — Being retired April 12, 2026, but still accessible in the interim.
- **Google Gemini 3 Flash and Pro** — Global endpoints with cross-geography routing requirements. Gemini 3 Pro is being retired March 26, 2026, with temporary redirects to Gemini 3.1 Pro.
- **Meta Llama 4 Maverick** — Available for provisioned throughput workloads in public preview.
- **Meta Llama 3.3 70B** — Replaced 3.1-70B for pay-per-token endpoints as of late 2024.

This is not a "bring your own model" story. These are specific, curated models hosted by Databricks within their security perimeter. You get the convenience of managed hosting, but you don't get to run arbitrary custom models on these pay-per-token endpoints.

### Model Serving Modes

Databricks offers two distinct modes:

**Pay-per-token** — Preconfigured, pre-deployed endpoints available in your workspace immediately. This is the "start here" option. No infrastructure to manage, just call the API. It's not designed for high-throughput production workloads, but it works for prototyping and light production use.

**Provisioned throughput** — This is the production mode. You get guaranteed performance, SLA-backed endpoints, support for fine-tuned models, and compliance certifications including HIPAA. You pay for the provisioned capacity rather than per token, which changes the economics significantly for high-volume workloads.

### Beyond the API

The Foundation Model APIs are just the serving layer. Mosaic AI bundles a much larger stack:

**Model Serving** — Deploy custom models and LLMs as scalable REST endpoints with automatic scaling and GPU support. Not just foundation models, any model you've trained or fine-tuned.

**Agent Bricks** — A high-level approach to building and optimizing domain-specific AI agent systems. Targets common use cases like customer support and document processing.

**Agent Framework** — A lower-level Python SDK for building production-quality agents, including RAG applications and multi-agent systems. More flexible than Agent Bricks but requires more engineering.

**Vector Search** — Store and query embedding vectors with automatic syncing to your knowledge base. This is the RAG layer, built directly into the platform so you don't need a separate vector database.

**AI Gateway** — Central governance layer for monitoring model access, tracking usage, logging payloads, and enforcing security controls. This is what the compliance team cares about.

**MLflow for GenAI** — Evaluation, monitoring, and observability across the GenAI application lifecycle. AI-powered metrics for output quality, not just latency and throughput.

**Foundation Model Fine-tuning** — Customize open-source foundation models with your own data, deployed through the same serving infrastructure.

**Unity Catalog** — Data, features, models, and functions governed under unified access control, lineage tracking, and discovery. This is Databricks' data governance layer, and it extends to AI models.

### Querying Options

You're not locked into a single way of calling models. Databricks supports:

- **OpenAI client** — `pip install -U databricks-openai`, set the base URL, call as normal. This is the recommended path for most developers.
- **SQL AI Functions** — Run `ai_query()` directly in SQL for batch inference workloads. Good for data teams already writing SQL.
- **Serving UI** — No-code interface for testing endpoints in the Databricks workspace.
- **REST API** — Direct HTTP calls to `POST /serving-endpoints/{name}/invocations`.
- **MLflow Deployments SDK** — `predict()` function for a Pythonic abstraction over the REST API.
- **Databricks Python SDK** — Higher-level Python wrapper handling auth and low-level details.

## Pricing

Databricks doesn't publish transparent per-model pricing the way OpenAI or Anthropic do. The Foundation Model APIs operate on two pricing structures:

- **Pay-per-token**: You pay based on tokens consumed (input and output). The actual rates are available within the Databricks workspace pricing page and vary by model. Because Databricks hosts the models, the per-token cost can differ from calling the same model directly from OpenAI or Anthropic.

- **Provisioned throughput**: You pay for reserved compute capacity, not per token. This is more predictable for budgeting at scale but requires upfront commitment. Capacity can be configured in units that map to expected tokens per second.

Databricks also charges separately for compute (clusters, serverless), storage, and other platform services. The AI API pricing is just one line item in what can become a significant overall Databricks bill.

## Limitations and Considerations

The Foundation Model APIs are region-dependent. Not all models are available in every region, and some (like Gemini) require cross-geography routing to be explicitly enabled. If you have data residency requirements, check the region support matrix before building on this.

Model retirement is a fact of life. Claude 3.7 Sonnet is being retired in April 2026. Gemini 3 Pro in March 2026. The Llama 3 series models are already gone. Databricks provides migration guidance, but you need to track deprecation notices actively. This is a trade-off of using hosted models rather than managing your own deployments.

Vendor lock-in is the elephant in the room. The OpenAI-compatible API is portable in theory, but the governance features, vector search, AI Gateway, and fine-tuning pipeline are all Databricks-specific. If you build deep into the Mosaic AI stack, extracting yourself later will be painful.

Cost at scale is hard to predict. The pay-per-token mode is straightforward, but provisioned throughput pricing, combined with cluster costs, storage, and workspace fees, makes the total cost of ownership a complex calculation. For teams already committed to Databricks for data and analytics, it's a natural extension. For teams starting from scratch, it's a heavyweight commitment.

## Who Should Use This

Mosaic AI makes the most sense if you're already a Databricks shop. If your data lives in Delta Lake, your governance is in Unity Catalog, and your data engineers already live in Databricks notebooks, adding AI capabilities through the same platform is pragmatic. You avoid the overhead of managing a separate inference infrastructure and get integrated governance without building it yourself.

If you're an AI-first startup or a team evaluating AI platforms from scratch, the friction of onboarding onto Databricks just for the Foundation Model APIs is hard to justify when OpenAI, Anthropic, and Google all offer direct API access with transparent pricing. The platform play is powerful, but it's not lightweight.

---

*Pricing and model availability current as of March 2026. Databricks regularly updates model support and regional availability. Check [Databricks Foundation Model APIs documentation](https://docs.databricks.com/en/machine-learning/foundation-model-apis/) for the latest details.*
