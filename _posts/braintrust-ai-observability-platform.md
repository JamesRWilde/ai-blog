---
title: "Braintrust: The AI Observability Platform That Just Raised $80M to Fix What Breaks in Production"
excerpt: "Braintrust combines tracing, evaluation, and a purpose-built database to help teams measure, debug, and improve AI applications — from prototyping to agents running at scale."
coverImage: "/assets/blog/braintrust-cover.jpg"
date: 2026-03-21T18:43:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/braintrust-cover.jpg"
---

## TL;DR

Braintrust is an AI observability and evaluation platform built for teams shipping AI into production. It provides end-to-end tracing across multi-step agent workflows, automated evaluations to catch regressions before deployment, and collaborative datasets with human feedback — all underpinned by Brainstore, a purpose-built database designed for the volume and complexity of AI interaction data. The company recently closed an $80M Series B led by ICONIQ, with existing investors Andreessen Horowitz and Greylock returning. Customers include Notion, Replit, Cloudflare, Ramp, and Dropbox.

## The Problem

AI applications have moved from notebooks to production, but the tools to keep them working haven't kept pace. When a chatbot gives a wrong answer, a search agent hallucinates a source, or a coding assistant produces buggy output — most teams have no systematic way to understand why. Traditional APM tools were built for request/response APIs with predictable behavior. AI applications are different: they involve non-deterministic model outputs, multi-step reasoning chains, tool calls that branch unpredictably, and interaction traces that can run to hundreds of megabytes per session.

The gap is especially painful for agents. When an agent with five tool calls and two reasoning steps produces garbage output, teams need to trace back through each step, identify which prompt or model decision caused the failure, and validate that a fix actually improves quality without introducing regressions elsewhere. Spreadsheets and ad-hoc testing don't scale to that problem.

## What Braintrust Actually Does

Braintrust positions itself as the observability layer for AI — not a model provider, not a hosting platform, not a prompt management tool. It sits across three core capabilities:

### 1. Tracing and Instrumentation

Braintrust captures detailed traces of every AI interaction — model calls, function/tool executions, latency, token counts, input/output content. It integrates with the major AI providers (OpenAI, Anthropic, Gemini) and frameworks (LangChain, Vercel AI SDK, LlamaIndex), plus custom instrumentation through its Python, TypeScript, Go, Ruby, Java, and C# SDKs.

The traces aren't simple log entries. Each trace captures a tree of spans representing the full execution graph of a multi-step AI interaction. For an agent, that means you can see the initial prompt, each tool call, intermediate reasoning, and final output — all linked and searchable.

Key trace features:
- **Full content capture** — inputs, outputs, and intermediate steps, not just metadata
- **Real-time streaming** — traces appear as operations execute, not in batch
- **Search and filtering** — query traces by latency, cost, model, user, error type, or custom metadata
- **MCP integration** — Braintrust exposes an MCP server so AI coding assistants (Claude Code, Cursor, VS Code Copilot) can query and understand your traces directly

### 2. Evaluation Framework

Evals are where Braintrust distinguishes itself from generic observability tools. The platform provides a structured framework for measuring AI quality:

- **Datasets** — versioned collections of test cases with inputs and expected outputs
- **Tasks** — the AI function being tested (a prompt, a chain, an agent)
- **Scores** — scoring functions that measure output quality (exact match, LLM-as-judge, custom scorers)

The evaluation workflow is explicit: define your data, run your task, score the outputs, compare across model versions or prompt changes. Braintrust includes the `autoevals` library with built-in scorers (ExactMatch, CosineSimilarity, Levenshtein, LLM-based), plus support for custom scoring functions.

A notable feature is **Loop**, their collaborative eval system. Loop lets teams annotate traces with human feedback, then use that feedback to automatically build evaluation datasets. Instead of hand-crafting test cases, you capture real production failures and turn them into regression tests.

### 3. Brainstore — The Database Layer

This is the piece most people miss. Braintrust built its own database (called Brainstore) specifically for AI observability data. The problem: traditional databases weren't designed to store and query millions of traces, each containing nested JSON structures, large text blobs, and high-dimensional embeddings.

Brainstore handles:
- **High-volume ingestion** — traces from production at scale without sampling
- **Semantic search** — embedding-based similarity search across trace content
- **Structured queries** — filter by any trace field (latency, model, cost, custom metadata)
- **Data retention policies** — configurable storage windows, S3 export, and custom deletion rules

This is the engineering justification for the Series B. Traditional observability backends (ClickHouse, Elasticsearch) strain under AI trace volume and don't natively support the embedding-based queries that make debugging AI failures practical.

## Pricing Structure

Three tiers:

- **Starter** (Free) — 1 GB processed data/month, 10K scores/month, 1 human review score per project, 14-day data retention. Unlimited users, projects, playgrounds, experiments, and datasets.
- **Pro** ($249/month) — 5 GB processed data/month, 50K scores/month, unlimited human review, 30-day retention. Adds custom charts, environments, and priority support.
- **Enterprise** (Custom) — custom data volumes, SSO (SAML), RBAC, DPA/BAA, uptime SLA, shared Slack channel, S3 export, custom retention policies.

Overages on data are billed at $3-4/GB depending on tier. Score overages at $1.50-2.50 per 1,000 scores.

The free tier is generous enough for prototyping and small-scale usage. The jump to Pro ($249/month) is where teams with production workloads land — the included 5 GB covers moderate traffic, and the retention and custom chart features become necessary once you're debugging real issues.

## The Honest Assessment

**What works well:**

- Unified tracing + evaluation in a single platform eliminates the typical "build your own eval pipeline" tax
- SDK coverage across six languages is unusually broad for this category
- The Loop feature (turning production failures into eval datasets) solves a real workflow gap
- Brainstore as a purpose-built database is a defensible technical moat, not just a branding exercise
- MCP integration means your AI coding assistant can query your observability data directly — this is the kind of developer experience that compounds
- SOC 2 Type II compliance, hybrid deployment options, and self-hosting on AWS/Azure/GCP for regulated industries

**What's uncertain:**

- The free tier's 14-day retention is limiting for teams that need to analyze trends over time — you'll hit the Pro tier fast
- At $249/month base, plus data overages, costs can escalate with high-volume production traffic
- The platform is opinionated about workflow structure (instrument → observe → annotate → evaluate → deploy) — teams with unusual pipelines may find friction
- LLM-as-judge scoring introduces its own reliability questions — you're using AI to measure AI, which requires careful calibration
- The database moat is real, but competitors like LangSmith, Weights & Biases, and Phoenix are all building similar infrastructure

**Who it's for:**

Teams shipping AI features into production who need systematic quality measurement, not just "watch the logs and hope." Especially strong for agent-heavy workflows where trace complexity makes manual debugging impractical. The sweet spot is probably mid-size engineering teams (5-50 developers) building AI products where a regression in output quality directly impacts users.

## Timeline

Braintrust was founded by Ankur Goyal, who previously co-founded Impira and was an early engineer at Figma. The company raised a $5M seed in December 2023, a $36M Series A in October 2024, and the recent $80M Series B in February 2026. The funding trajectory reflects the broader market shift: AI observability has gone from "nice to have" to infrastructure-level investment as production AI deployments scale.

