---
title: "Arize Phoenix: The Open-Source AI Observability Platform That Runs Anywhere"
excerpt: "Arize Phoenix is an open-source AI observability and evaluation platform built on OpenTelemetry, offering tracing, evaluations, prompt engineering, and experiments with zero vendor lock-in."
coverImage: "/assets/blog/arize-phoenix-cover.png"
date: 2026-03-22T09:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/arize-phoenix-cover.png"
---

## TL;DR

Arize Phoenix is an open-source AI observability platform built on OpenTelemetry that gives developers full visibility into their LLM applications. It provides tracing, evaluations, prompt engineering, and experiments in a single package you can run locally, in a container, or in the cloud. With 2.5 million monthly downloads and 8,900 GitHub stars, Phoenix is quickly becoming the default observability layer for AI teams who refuse to be locked into a proprietary vendor.

## The Problem

LLMs are black boxes by default. You send a prompt, get a response, and have no idea what happened in between. When something goes wrong (and it will), you are left guessing: Was it the retrieval step? The prompt template? The model hallucinating? A downstream tool call failing silently?

Most observability solutions for AI come in two flavors, and both have serious problems. The proprietary SaaS tools (LangSmith, Weights & Biases, Arize's own AX platform) charge based on trace volume and lock your data into their platform. The open-source options (early LangSmith, ad-hoc logging scripts) require you to build your own infrastructure and often lack the evaluation tooling needed to actually improve your application.

The gap in the market was an observability platform that was open-source, vendor-agnostic, production-ready, and free from feature gates.

## What Phoenix Actually Does

Phoenix is a single platform that covers four core workflows for AI application development: tracing, evaluation, prompt engineering, and experiments. Each piece works independently, but the real value comes from how they connect.

### Tracing

Tracing is the foundation. Phoenix uses OpenTelemetry (OTEL) to capture what happens during each run of your LLM application: model calls, retrieval steps, tool invocations, custom logic, and the timing of each span. Auto-instrumentation is available for OpenAI, Anthropic, Bedrock, LangChain, LlamaIndex, DSPy, CrewAI, Mastra, the Vercel AI SDK, and more. If your framework supports OpenTelemetry, Phoenix can trace it.

The tracing interface shows a waterfall view of each request, letting you pinpoint exactly where latency is introduced or where a step produced unexpected output.

### Evaluation

Evaluations let you measure output quality systematically. Phoenix ships with LLM-as-a-judge evaluators (response relevance, hallucination detection, toxicity) and code-based evaluators you can customize. Human annotations can be attached directly in the UI for ground-truth labels.

The key insight is that evaluations run on top of your traced data. You do not need to set up a separate pipeline to score outputs. Trace something, evaluate it, and see the scores attached to the spans.

### Prompt Engineering

The Prompt Playground lets you experiment with prompts and models side-by-side using real production examples. You can version prompts, compare variants, replay spans with different inputs, and sync prompt changes across environments via SDK. This replaces the typical workflow of juggling prompts across Jupyter notebooks and hoping for the best.

### Datasets and Experiments

Datasets let you group traces into curated sets of examples. Experiments run those datasets through different versions of your application and compare evaluation results. This is how you systematically confirm whether a change actually improved performance, rather than relying on vibes and a handful of test cases.

## How It Works (Architecture)

Phoenix follows a clean separation of concerns:

1. **Instrumentation**: The `openinference` packages add OTEL spans to your LLM framework calls. This works for Python and TypeScript, with Java support available.

2. **Collection**: Traces flow over OTLP (the standard OpenTelemetry protocol) to a Phoenix server.

3. **Storage and UI**: The Phoenix server stores traces and provides the web UI for exploration, evaluation, and prompt engineering.

4. **Analysis**: Evaluations, experiments, and dataset management run against stored traces.

The Phoenix server can run as a local process (`pip install arize-phoenix`), a Docker container, a Kubernetes deployment, or a managed cloud instance at `app.phoenix.arize.com`. The open-source version has zero feature gates and zero usage limits. You manage your own storage and compute.

## Key Features That Stand Out

**OpenTelemetry-native**: Unlike many AI observability tools that built their own proprietary telemetry format, Phoenix bets on the industry standard. This means you can correlate AI traces with application-level OTEL data (HTTP requests, database queries, etc.) in the same backend. No lock-in.

**Framework-agnostic**: Phoenix does not care whether you use LangChain, LlamaIndex, DSPy, CrewAI, the OpenAI SDK directly, or your own custom framework. The auto-instrumentation coverage is broad, and the OTLP ingestion means anything that speaks OpenTelemetry works.

**Self-hostable with no feature gates**: The open-source Phoenix server is not a limited preview. It includes tracing, evaluations, prompt management, datasets, and experiments. The commercial Arize AX platform adds SSO, RBAC, compliance certifications (SOC2, HIPAA), and Alyx (an AI agent for debugging), but the core functionality is fully open.

**Lightweight sub-packages**: The project ships modular packages (`arize-phoenix-otel`, `arize-phoenix-client`, `arize-phoenix-evals`) so you can pull in just what you need without dragging in the full server.

**TypeScript support**: Alongside the Python ecosystem, Phoenix has TypeScript packages (`@arizeai/phoenix-otel`, `@arizeai/phoenix-client`, `@arizeai/phoenix-evals`) and an MCP server for integration with Claude Code, Cursor, and other coding agents.

## Pricing

**Phoenix (Open Source)**: Free and self-hosted. Unlimited trace spans, ingestion volume, projects, and retention. You manage the infrastructure.

**AX Free**: Managed SaaS, free tier with 25k spans/month, 1 GB ingestion, 15-day retention.

**AX Pro**: $50/month, 50k spans/month, 10 GB ingestion, 30-day retention, email support.

**AX Enterprise**: Custom pricing, configurable everything, dedicated support, SOC2/HIPAA, self-hosting option.

The open-source tier is not a bait-and-switch. It includes the full platform. The paid tiers add managed infrastructure, compliance, and the Alyx AI agent.

## Who It Is For

Phoenix targets AI engineers and teams building production LLM applications. If you are running models in production (agents, RAG pipelines, chatbots, content generation), you need observability to debug failures, track quality regressions, and iterate on prompts with evidence rather than intuition.

The self-hosted option makes it particularly appealing to teams with data residency requirements or those who simply refuse to send production data to a third-party observability vendor.

## The Bottom Line

Arize Phoenix fills a real gap. It gives you the observability tooling that proprietary platforms lock behind paywalls, but in a fully open-source package built on industry standards. The OpenTelemetry foundation means it plays nicely with your existing monitoring stack, and the evaluation and experimentation features go beyond simple tracing into actual application improvement.

If you are building with LLMs and you cannot explain what happened in your last 100 requests, you have an observability problem. Phoenix is the most practical solution for fixing it.

**Links**: [Phoenix on GitHub](https://github.com/Arize-ai/phoenix) | [Documentation](https://arize.com/docs/phoenix) | [Arize AX (Managed)](https://www.arize.com)
