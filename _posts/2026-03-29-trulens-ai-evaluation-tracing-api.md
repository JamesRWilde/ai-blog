---
title: "TruLens API: Open-Source Evaluation and Tracing for AI Agents"
excerpt: "TruLens provides a Python SDK and OpenTelemetry-compatible instrumentation for systematically evaluating RAG pipelines, AI agents, and LLM applications with measurable metrics instead of vibe checks."
coverImage: "/assets/blog/trulens-ai-evaluation-api.jpg"
date: 2026-03-29T05:01:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/trulens-ai-evaluation-api.jpg"
---

## TL;DR

TruLens is an open-source Python library (backed by Snowflake) that lets developers instrument, trace, and evaluate AI agents and RAG applications with quantitative metrics. It integrates with LangChain, LlamaIndex, and LangGraph, emits OpenTelemetry traces for existing observability stacks, and provides a local UI for comparing experiment versions side by side.

## The Problem

Building an AI agent that "works" in a demo is easy. Proving it works reliably in production is something else entirely. Most teams ship LLM applications based on gut feeling, a few manual test cases, and prayer. When something goes wrong, they have no structured way to diagnose whether the retrieval failed, the prompt drifted, or the model hallucinated.

Traditional APM tools don't understand LLM execution flows. Custom eval scripts are brittle and don't scale. And commercial observability platforms lock your data behind enterprise pricing tiers.

TruLens tackles this gap head-on: it gives you a programmatic framework to define what "good" looks like for your AI application, measure it continuously, and iterate with confidence.

## What TruLens Actually Does

TruLens operates on three core ideas:

**Instrumentation** — Wrap your LLM application code (whether it uses LangChain, LlamaIndex, or custom Python) with TruLens decorators. Every retrieval call, every prompt construction, every model invocation gets traced with full input/output context.

**Feedback Functions** — Define quantitative metrics that evaluate each execution. Stock metrics include context relevance, groundedness, and answer relevance. You can also write custom feedback functions for domain-specific evaluation.

**Comparison Dashboard** — TruLens runs a local web server where you can compare different versions of your app across all defined metrics. No cloud account required.

The key differentiator is that TruLens doesn't just log what happened, it tells you whether what happened was any good.

## Getting Started

Installation is a single pip command:

```bash
pip install trulens
```

Basic usage with a RAG application looks like this:

```python
from trulens.core import Tru
from trulens.core import Feedback
from trulens.providers.openai import OpenAI

tru = Tru()
provider = OpenAI(model_engine="gpt-4o")

# Define a feedback function
f_context_relevance = Feedback(provider.context_relevance).on_input_output()

# Wrap your app and register feedback
from trulens.apps.basic import BasicApp
rag_app = BasicApp(app_fn=your_rag_function)
tru_rag = tru.BasicApp(
    app=rag_app,
    feedbacks=[f_context_relevance]
)

# Run and evaluate
response = trut_app.call_with_record("What is Seattle known for?")
```

TruLens automatically captures the retrieval context, the prompt sent to the LLM, and the final response, then runs your feedback functions against the recorded trace.

## Key Features for Production Use

**OpenTelemetry Integration** — TruLens emits standard OTel traces, so you can pipe evaluation data into Datadog, Grafana, Jaeger, or any existing observability stack without custom connectors.

**Multi-Provider Support** — Feedback functions work with Snowflake Cortex, LangChain, Amazon Bedrock, HuggingFace, LiteLLM, and OpenAI. You are not locked into a single LLM provider for evaluation.

**Guardrails Mode** — Beyond post-hoc evaluation, TruLens supports runtime guardrails that can block or redirect LLM outputs in real time based on feedback function thresholds.

**Persistent Logging** — Store evaluation results in Postgres or Snowflake for long-term trend analysis and regression detection across deployments.

**Stack-Agnostic Instrumentation** — Whether your agent uses LangGraph, LlamaIndex, CrewAI, or raw Python function calls, TruLens can trace and evaluate the execution flow.

## Pricing

TruLens is fully open source under the Apache 2.0 license. The Python package is free via PyPI. The evaluation dashboard runs locally. For teams that need managed logging and collaboration, Snowflake offers TruLens integration within its Cortex platform, but the core library has no paid tiers.

## Who Should Use This

TruLens fits best for teams that have moved past the prototype stage and need to:

- Quantify RAG quality before and after changes
- Compare different retriever configurations or embedding models
- Set objective quality gates for CI/CD pipelines on LLM apps
- Debug production failures by tracing execution step by step
- Document model performance for compliance or audit purposes

If you are still in the "try a prompt and see if it looks right" phase, TruLens is overkill. Once you are shipping LLM features to users, it becomes essential.

## Bottom Line

The AI evaluation space is crowded with commercial platforms that charge per-seat or per-trace. TruLens takes the opposite approach: open source, runs locally, integrates with your existing stack, and focuses on the metrics that actually matter for LLM quality. Backed by Snowflake's engineering resources and actively maintained, it is the most pragmatic choice for teams that want production-grade AI evaluation without vendor lock-in.
