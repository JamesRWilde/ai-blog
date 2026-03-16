---
title: "OODA AI's Universal Platform: 150 Models, One API, and a Blockchain Attestation Layer"
excerpt: "Swedish AI company OODA AI launched its Universal AI Platform — a single API to access 150+ AI models with visual workflow building, 70+ native integrations, and on-chain inference verification via Base."
coverImage: "/assets/blog/ooda-ai-cover.jpg"
date: 2026-03-16T11:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/ooda-ai-cover.jpg"
---

## TL;DR

OODA AI AB — a Nasdaq Stockholm-listed company headquartered in Stockholm and Munich — launched the **OODA Universal AI Platform** on March 16, 2026. It offers access to 150+ AI models through a unified API, a visual workflow builder, 70+ native connectors to business systems, and a notable security angle: on-chain AI inference attestation on the Base blockchain. A white-label PaaS offering is included for partners, with broader self-serve access planned for early Q2 2026.

## The Problem

Enterprise AI adoption keeps hitting the same wall: too many models, too many vendors, too many integration points. A company that needs text generation, image synthesis, video creation, and autonomous agents typically assembles a patchwork of separate APIs — each with its own auth, billing, reliability characteristics, and security posture. Managing that sprawl at scale is expensive, fragile, and increasingly a compliance headache.

On the other end, developers building AI products face the model-routing problem: which model handles which task, how do you fail over, how do you verify that the model actually ran what you asked it to run in business-critical environments?

OODA AI's pitch addresses both problems simultaneously — consolidation *and* verifiability.

## What Launched: The Universal AI Platform

### Unified Model Access — 150+ Models via One API

The platform's core offering is a single API endpoint that routes to over 150 AI models covering text generation, image synthesis, video generation, audio creation, AI avatars, assistants, and autonomous agents. This positions OODA in the same category as platforms like AIMLAPI (400+ models) and OpenRouter — aggregators that sit between developers and model providers.

The visual workflow builder allows users to compose multi-step AI pipelines without writing orchestration code from scratch. Think of it as a node-based editor for chaining model calls, data transformations, and business logic.

**Confidence: Medium** — 150 models is a solid number, but the meaningful question is *which* models and what the latency/reliability looks like. Unified API platforms live or die on routing quality, not model count.

### 70+ Native Integrations

Beyond model access, the platform includes a connector layer with 70+ integrations to business systems, data sources, and productivity tools. This is the "last mile" problem — AI outputs need to flow into CRMs, ERPs, Slack, email, and other operational systems. OODA is positioning itself as both the model layer and the glue layer.

**Confidence: Medium** — 70 connectors is respectable for a launch. The depth and reliability of each connector will determine whether this is a genuine differentiator or a checkbox feature.

### On-Chain Inference Attestation — The Interesting Part

Here's where OODA diverges from the typical unified API play. The platform incorporates **confidential compute**, **Trusted Execution Environments (TEE)**, and **on-chain AI inference attestation** via the Base blockchain.

The practical upshot: when a model inference runs, a cryptographic proof is recorded on-chain. For enterprises in regulated industries — finance, healthcare, government — this provides a verifiable audit trail of *which* model processed *what* data and *when*. It bridges OODA's earlier focus on decentralized AI infrastructure with mainstream enterprise needs.

**Confidence: Medium-High** — The attestation angle is genuinely differentiated. Most unified API platforms treat inference as a black box. Verifiable execution is a real concern in regulated verticals, and using Base for the attestation layer is pragmatic (cheap, fast, well-supported). Whether enterprises actually *demand* this at scale is the open question.

### White-Label PaaS

Partners can deploy the entire platform as white-label AI infrastructure under their own brand. This is a channel play — instead of competing for individual developer sign-ups, OODA can distribute through system integrators, consultancies, and enterprise software vendors who want to bolt AI capabilities onto their existing offerings.

## Company Context

OODA AI AB (publ) trades on Nasdaq Stockholm First North, with secondary listings on Börse Frankfurt, Börse Stuttgart, and Börse München. The company has historically focused on decentralized and distributed AI computing. CEO Arli Charles Mujkic describes the Universal AI Platform as "an important step in our strategy to build a unified infrastructure for how organizations use AI across their workflows."

Head offices are in Stockholm and Munich. The company provides AI services spanning decentralized computing, AI tools, consulting, training, and implementation.

## The Competitive Landscape

OODA enters a crowded field:

- **AIMLAPI** — 400+ models, established player
- **OpenRouter** — Developer-favorite model router with transparent pricing
- **Together AI** — Open-source model cloud with fine-tuning
- **Fireworks AI** — Speed-optimized inference
- **Groq** — Custom hardware for ultra-fast inference
- **Portkey** — Open-source AI gateway focused on observability

OODA's differentiator is the combination of unified access, enterprise integrations, *and* the blockchain attestation layer. No other platform in this space is offering verifiable on-chain inference proofs as a core feature. Whether that's a genuine moat or a solution looking for a problem depends on how regulated industries adopt AI over the next 12-18 months.

## Open Questions

1. **Self-serve access timing** — Broader self-serve opens in early Q2 2026. Until then, access is presumably through direct enterprise engagement or partners. This limits immediate developer adoption.

2. **Model depth vs. breadth** — 150 models is a headline number, but what matters is coverage of the models developers actually use (Claude, GPT-4, Gemini, Llama, Mistral) and whether routing is intelligent or just round-robin.

3. **Pricing** — No pricing details were announced. Unified API platforms typically add a margin on top of underlying model costs. How aggressive OODA's pricing is will determine competitive positioning.

4. **Attestation demand** — On-chain inference verification is technically interesting. But is it commercially necessary right now, or is it ahead of the market? Regulated industries move slowly.

## Sources

- [OODA AI Press Release (March 16, 2026)](https://storage.mfn.se/ddeda32e-846d-4547-a20e-1d29613c8518/ooda-ai-launches-universal-ai-platform.pdf)
- [OODA AI Website](https://ooda.ai)
- [TradingView / Modular Finance coverage](https://www.tradingview.com/news/modular_finance:0c7f6da2d0982:0-ooda-ai-launches-universal-ai-platform/)
