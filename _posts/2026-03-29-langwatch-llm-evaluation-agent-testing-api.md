---
title: "LangWatch API: The Open-Source Platform for LLM Evaluations and AI Agent Testing"
excerpt: "LangWatch combines LLM observability, real-time evaluations, and agent simulations into a single API-driven platform that helps teams ship reliable AI agents without building custom tooling."
coverImage: "/assets/blog/langwatch-cover.jpg"
date: 2026-03-29T07:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/langwatch-cover.jpg"
---

## TL;DR

LangWatch is an open-source, OpenTelemetry-native platform for LLM observability, evaluations, and AI agent testing. It lets developers trace LLM calls, run agent simulations, build custom evaluations, optimize prompts with DSPy, and enforce guardrails through a unified API. Available as a free cloud tier (50,000 logs/month) and self-hosted, it integrates with every major framework including LangChain, CrewAI, DSPy, Vercel AI SDK, and Pydantic AI.

---

## The Problem

Building an AI agent that works in a demo is one thing. Shipping one that stays reliable in production is something else entirely.

Teams deploying LLM-powered applications face a common set of pain points. You change a prompt and something breaks two steps later in the agent chain. A model upgrade silently degrades output quality. A multi-step agent fails at step three of seven and nobody notices until a customer complains. And when something does go wrong, tracing the exact sequence of tool calls, model decisions, and state changes that caused the failure feels like debugging a distributed system with no logging.

The typical response is to build bespoke infrastructure. One team wires up OpenTelemetry manually. Another writes custom evaluation scripts. A third builds a prompt versioning system in a spreadsheet. None of these talk to each other. The result is tool sprawl, duplicated effort, and gaps in visibility that let regressions slip through.

LangWatch targets this exact problem. Instead of stitching together five separate tools, you get observability, evaluations, agent simulations, prompt management, and guardrails in a single platform with an API-first design.

---

## What LangWatch Does

LangWatch provides three core capabilities through one API layer:

**1. LLM Observability and Tracing**

LangWatch captures full traces of LLM interactions, including input/output pairs, token counts, latency, and cost per request. It supports multi-agent graphs, so you can visualize how agents collaborate, delegate, and pass state. Thread tracking lets you follow entire conversation sessions across users and turns.

The platform is built on OpenTelemetry, which means it works with any language or framework that supports OTLP. Python, TypeScript, and Go SDKs are provided first-party. Java and custom integrations connect through standard OTel exporters.

**2. Evaluations and Agent Simulations**

This is where LangWatch differentiates itself from pure observability tools. You can run evaluations both offline (in CI/CD, notebooks, and workflows) and online (real-time on production traffic).

Agent simulations let you test multi-step agentic systems end-to-end. You define scenarios with simulated users, tools, and expected behaviors, then run thousands of simulated conversations to find where agents break and why. The platform supports LLM-as-judge evaluations, code-based evals, and session-level assessments.

Evaluations can be triggered through the API, the SDK, or the UI. Results feed into datasets that power regression testing and prompt optimization.

**3. Prompt Management and DSPy Optimization**

LangWatch includes a prompt management system with version control, GitHub integration, and the ability to link prompt versions directly to trace data. You can compare multiple prompts side by side in a playground environment, then use DSPy optimization to systematically improve prompt performance based on evaluation results.

---

## API Integration

Getting started requires a few lines of code. Here is a Python example using the LangWatch SDK:

```python
import langwatch

langwatch.setup()

@langwatch.trace()
def answer_question(question: str):
    with langwatch.span(type="llm", name="openai_call") as span:
        span.update(input=question)
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": question}]
        )
        span.update(output=response.choices[0].message.content)
        return response.choices[0].message.content
```

For TypeScript, the SDK provides the same pattern:

```typescript
import * as langwatch from "langwatch";

const trace = langwatch.trace({ name: "my-agent" });
const span = trace.span({ type: "llm", name: "openai_call" });
span.setInput("What is LangWatch?");
// ... call LLM
span.setOutput("LangWatch is...");
```

LangWatch also supports direct OpenTelemetry integration, so teams using Go, Java, or custom stacks can push traces to the LangWatch OTLP endpoint without a language-specific SDK.

Framework integrations are extensive: LangChain, LangGraph, CrewAI, AutoGen, DSPy, LlamaIndex, Haystack, Vercel AI SDK, Mastra, Pydantic AI, Spring AI, Google ADK, and Semantic Kernel all have dedicated instrumentation.

---

## Key Features

**Real-Time Guardrails**

LangWatch includes safeguards that run at inference time. These cover prompt injection detection, PII detection and auto-redaction, content moderation, competitor blocklist filtering, and off-topic evaluation. Custom guardrails can be defined through the API.

**Collaboration Workflows**

The platform supports annotation queues where domain experts can review and label LLM outputs. Engineers control production deployments while product managers and subject matter experts define what counts as good or bad behavior. Prompt versions can be linked to traces for full audit trails.

**Dataset Management**

Production traces can be converted into reusable test cases and golden datasets. These datasets power evaluations, regression tests, and fine-tuning workflows. The API supports batch operations for dataset creation and management.

**Analytics and Monitoring**

Beyond raw traces, LangWatch provides user analytics, topic detection, sentiment analysis, trend analysis, and cost tracking. Custom dashboards can be built on any metric available in the platform. Functional KPI tracking lets non-technical stakeholders monitor AI performance.

---

## Pricing

LangWatch uses a freemium model:

- **Developer (Free):** 50,000 logs per month, 14-day data retention, 2 users, 3 scenarios, 3 simulations, 3 custom evaluations. Community support via GitHub and Discord.

- **Growth (from €59/seat/month):** 200,000 events included plus pay-as-you-go at €0.0005 per additional event. 30-day retention. Unlimited lite-users, eval scores, simulations, and prompts. Private Slack or Teams support.

- **Enterprise:** Custom pricing with on-prem, hybrid, or air-gapped deployment. Custom SSO, RBAC, audit logs, SLA, ISO 27001 reports, GDPR compliance, and dedicated solution engineering.

Self-hosted deployment is available via Docker Compose or Helm chart for Kubernetes. On-prem options exist for AWS, Google Cloud, and Azure.

---

## Who It Is For

LangWatch is built for AI engineering teams shipping production LLM applications. The sweet spot is teams building multi-step agents, RAG pipelines, or conversational AI systems where reliability matters and debugging failures across multiple model calls is a real pain.

It is particularly useful for organizations that need to separate who defines quality (product managers, domain experts) from who implements it (engineers) while keeping both in the same workflow.

The open-source core and OpenTelemetry foundation make it a fit for teams that want to avoid vendor lock-in. Self-hosted deployment addresses data residency requirements common in regulated industries.

---

## Bottom Line

LangWatch fills a specific gap in the AI infrastructure stack. It is not a model provider, not an inference platform, and not an agent framework. It is the evaluation and observability layer that sits on top of whatever you are already building, giving you the feedback loop needed to ship AI agents with confidence rather than hope.

The combination of agent simulations, OpenTelemetry-native tracing, DSPy optimization, and collaborative evaluation workflows in a single platform is genuinely differentiated. Most alternatives require assembling two or three separate tools to cover the same surface area. The free tier is generous enough for prototyping, and the self-hosted option eliminates the data concerns that keep some teams off cloud observability platforms entirely.

If you are building agents that need to work reliably and you are tired of ad-hoc debugging and custom evaluation scripts, LangWatch is worth evaluating. Their 780,000+ monthly installs and 900,000+ daily evaluations suggest a growing community agrees.

---

**Learn more:**
- [LangWatch Documentation](https://docs.langwatch.ai)
- [GitHub Repository](https://github.com/langwatch/langwatch)
- [Free Developer Account](https://app.langwatch.ai)
- [Agent Simulations (Scenario)](https://langwatch.ai/scenario/)
