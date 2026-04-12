---
title: "Superwise AI Governance API: Enterprise Control Plane for AI Guardrails and Observability"
excerpt: "Superwise provides a unified API-first platform for real-time AI guardrails, observability, and policy enforcement across 50+ LLM providers with sub-10ms latency."
coverImage: "/assets/blog/superwise-ai-governance-api-cover.jpg"
date: 2026-03-29T08:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/superwise-ai-governance-api-cover.jpg"
---

## TL;DR

Superwise is an AI governance platform that sits between your applications and LLM providers as a control plane. It offers runtime guardrails (sub-10ms policy evaluation), full observability across 50+ metrics, and Agent Studio for visual agent deployment. The platform integrates via SDK wrapping without code rewrites, supports OpenAI, Anthropic, AWS Bedrock, Google Vertex AI, Mistral, and dozens more. Free tier available; Professional starts at $299/month.

## The Problem

Teams deploying AI agents into production face a grim reality. Governance is bolted on as an afterthought. PII leaks through chat outputs. Drift goes undetected for weeks. Auditors ask for compliance evidence that does not exist. Most organizations solve this by building internal tooling that never quite works, or by simply hoping nothing goes wrong.

Superwise takes the position that governance without visibility is not governance at all. Their platform acts as middleware that intercepts every model call, evaluates policies in real time, and logs the full audit trail for compliance.

## Platform Architecture

Superwise operates as a control plane with three evaluation stages:

**Configuration-Time** is where you define policies, schemas, access controls, and monitoring rules. This is governance setup before anything goes to production.

**Runtime** is where guardrails evaluate every request in under 10ms. Policies get enforced. Events get tracked. The platform claims 99.99% uptime and 99.9% detection accuracy across 10 billion-plus inferences protected.

**Post-Runtime** aggregates analytics, generates compliance reports, and provides dashboards for drift detection and audit trails.

The integration model is a SDK wrapping pattern. You wrap existing LLM calls with the Superwise SDK rather than rewriting your application code. The platform supports 50+ LLM providers, major frameworks like LangChain, LlamaIndex, CrewAI, AutoGen, and Haystack, and vector databases including Pinecone, Weaviate, Chroma, and Qdrant.

## Core API Capabilities

### Guardrails

The guardrails engine provides three layers of protection:

- **Input Validation** scans incoming prompts for injection attacks, PII, and policy violations before they reach models.
- **Runtime Evaluation** checks AI outputs against defined policies in real time, blocking, modifying, or flagging violations.
- **Continuous Learning** improves guardrail effectiveness based on feedback and emerging threat patterns.

Built-in guardrail types include PII detection, toxicity filtering, data leakage prevention, hallucination checking, and custom policy definitions. Here is what the Python SDK looks like:

```python
response = sw.chat.complete(
    model="gpt-4",
    messages=messages,
    guardrails=[
        "pii",
        "toxicity",
        "data_leakage",
        "hallucination",
        {
            "type": "custom",
            "policy": "no_competitor_mentions"
        }
    ]
)

print(response.guardrails)
# { "passed": true, "checks": [...], "latency_ms": 8 }
```

The latency overhead for guardrail evaluation consistently measures under 10ms per request according to Superwise benchmarks.

### Observability

Observability is enabled with a single flag during agent creation:

```python
agent = sw.agent.create(
    name="customer-support-agent",
    observability_enabled=True
)

response = agent.chat(
    messages=[{"role": "user", "content": "..."}]
)
```

Once enabled, the platform automatically captures inputs, outputs, latency, tokens, and metadata. Over 50 built-in metrics are available out of the box, including accuracy, precision, recall, F1 score, latency percentiles (p50/p95/p99), and token usage tracking.

Dashboards update in under one second. Alerting integrates with Slack, PagerDuty, OpsGenie, email, and webhooks. Data export supports S3, BigQuery, Snowflake, and REST API. Visualization tools include Datadog, New Relic, and Grafana.

### Agent Studio

Agent Studio provides a visual workflow designer for building, testing, and deploying AI agents. Automated testing runs before deployment to catch failures. Policies and guardrails apply directly within the studio environment.

### Policies

Policies define what to monitor, when to alert, and how to respond. They work across the full lifecycle from configuration through runtime enforcement to post-runtime analysis. Policy rules get enforced automatically across all governed models.

## Pricing

| Tier | Price | Agents & Datasets | API Calls | Data Retention |
|------|-------|-------------------|-----------|----------------|
| Starter | $0/month | 5 | Community support | Limited |
| Professional | $299/month | 20 | 5,000/month | 1 year |
| Enterprise | Custom | Unlimited | Unlimited | Full |

The free Starter tier includes runtime guardrails, policies, and real-time observability. Professional adds email support and technical sessions. Enterprise brings SSO (SAML or OIDC), custom contracts (BAA, DPA), 24/7 dedicated support, and private deployment options (SaaS, Isolated SaaS, or Private SaaS).

## Integration Points

Superwise provides multiple integration patterns:

- **SDK wrapping** for adding governance to existing LLM calls without code changes
- **REST API** for programmatic control of governance configuration
- **CI/CD integration** for automating governance deployment
- **Framework integrations** for LangChain, LlamaIndex, CrewAI, AutoGen, Flowise, Haystack, and Semantic Kernel

## Who This Is For

Superwise targets engineering and platform teams deploying AI agents in production, particularly in regulated industries where compliance evidence is non-negotiable. The free tier makes it accessible for prototyping. The $299 Professional tier is reasonable for teams running a small number of agents at moderate volume. Enterprise pricing is where the platform likely makes sense for organizations with complex compliance requirements across multiple business units.

The gap Superwise fills is real. Most teams either build their own governance layer (expensive, incomplete) or operate without one (risky). A dedicated control plane with sub-10ms overhead is a pragmatic middle ground.

## Sources

- [Superwise Platform Overview](https://superwise.ai/platform/)
- [Superwise Guardrails](https://superwise.ai/guardrails/)
- [Superwise Observability](https://superwise.ai/observability/)
- [Superwise Pricing](https://superwise.ai/pricing/)
- [Superwise Quickstart Documentation](https://docs.superwise.ai/docs/quickstart)
