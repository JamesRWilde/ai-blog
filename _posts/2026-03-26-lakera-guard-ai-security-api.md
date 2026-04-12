---
title: "Lakera Guard: Real-Time AI Security for LLM Applications"
excerpt: "Lakera Guard screens LLM interactions for prompt injections, data leakage, and content violations in under 50ms — and it just got acquired by Check Point."
coverImage: "/assets/blog/lakera-guard-cover.jpg"
date: 2026-03-26T23:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/lakera-guard-cover.jpg"
---

## TL;DR

Lakera Guard is an API-first security layer for generative AI applications. It screens both user inputs and model outputs in real time, flagging prompt injections, jailbreaks, data leakage, and malicious links — all through a single API call with sub-50ms latency. The platform is now part of Check Point Software Technologies, giving it enterprise-grade distribution. For developers shipping LLM-powered products into production, Lakera Guard solves a problem most teams only think about after something goes wrong: how to actually keep the thing safe.

## The Problem

Most teams building with LLMs follow the same pattern: get the model working, tune the prompt, ship it. Security is an afterthought — something to address "once we have users." Then someone jailbreaks your chatbot on Twitter, or PII leaks through an overlooked input field, and suddenly you're doing incident response on a product you launched three days ago.

Traditional web application firewalls do not understand how LLMs behave. Regex rules cannot catch prompt injection. Rate limiting does not prevent data exfiltration through cleverly crafted prompts. And building your own detection system means maintaining a growing attack database that needs constant updates as new techniques emerge.

This is the gap Lakera Guard fills. It acts as a security middleware layer between your users and your LLM, screening every interaction before it reaches the model — and screening the output before it goes back to the user.

---

## What Lakera Guard Does

Lakera Guard provides a single API endpoint (`POST https://api.lakera.ai/v2/guard`) that screens content for four categories of threat:

**Prompt Attacks** — Prompt injections, jailbreaks, and manipulation attempts in user inputs or external reference materials (RAG documents, web results, etc.). This is the category most teams underestimate. Prompt injection is essentially the XSS of AI: it is trivially easy to write, hard to defend against, and constantly evolving.

**Data Leakage** — Detection of Personally Identifiable Information (PII) and sensitive data appearing in prompts or model outputs. If your LLM is processing user-generated content, this catches credit card numbers, social security numbers, emails, and phone numbers leaking through the system.

**Content Violations** — Offensive, hateful, sexual, violent, or vulgar content in either direction of the conversation. Useful for customer-facing applications where output quality directly impacts brand perception.

**Malicious Links** — Detection of URLs that fall outside an allowlist, preventing your chatbot from inadvertently serving phishing links or malicious downloads to users.

Each category can be configured independently through policies, so you can tune sensitivity per application.

## How the API Works

The integration is straightforward. You make a POST request to the Guard endpoint for each user interaction, passing the message history and a project ID. The response includes a `flagged` boolean and detailed detection results.

```python
import os
import requests

response = requests.post(
    "https://api.lakera.ai/v2/guard",
    json={
        "messages": [{"content": user_input, "role": "user"}],
        "project_id": "project-XXXXXXXXXXX"
    },
    headers={"Authorization": f"Bearer {os.getenv('LAKERA_GUARD_API_KEY')}"}
)

if response.json()["flagged"]:
    # Block the interaction, log the threat, do not call the LLM
    print("Threat detected:", response.json())
else:
    # Safe to proceed with your LLM call
    pass
```

That is the entire integration. JavaScript and cURL examples are available in their docs. The response includes the specific categories flagged, a confidence score, and the individual detection results that triggered the alert.

Key technical details:

- **Latency**: Under 50ms per screening request, even for large prompts and context windows
- **Model agnostic**: Works with OpenAI, Anthropic, Cohere, open-source models, or fine-tuned custom models
- **Multilingual**: Detects threats in 100+ languages
- **Scalable**: Designed to scale from zero to hundreds of prompts per second

## Lakera Red: Pre-Deployment Security

Beyond the runtime Guard API, Lakera also offers Lakera Red — their red-teaming service for assessing AI application security before deployment. This comes in two flavors:

1. **Expert-led red teaming** — Human AI security experts probe your system for vulnerabilities
2. **Automated red teaming** — An adaptive AI attack engine runs comprehensive risk evaluations against your agents and models

The idea is that Guard handles the runtime layer while Red catches vulnerabilities during development. The two products integrate: findings from Lakera Red can feed directly into Guard policy configurations.

## The Check Point Acquisition

Lakera was acquired by Check Point Software Technologies, a publicly traded cybersecurity company. This matters for several reasons. First, it validates the product category — AI security is now considered a real enterprise need, not a theoretical concern. Second, it gives Lakera access to Check Point's distribution, infrastructure, and enterprise sales channels. Third, and most practically for existing customers, it means the product is unlikely to disappear.

The company is now branded as "Lakera, a Check Point company" and continues to operate from San Francisco.

## Deployment Options

Lakera Guard is available in two deployment modes:

**SaaS** — The standard cloud-hosted option. Web UI for policy management, automated model calibration, daily threat model updates, and SIEM integration for logging.

**Self-hosted** — On-premises deployment for organizations with strict data residency or compliance requirements. Uses S3-compatible storage for policy configuration, supports structured logging to stdout for integration with existing observability stacks (Grafana, ELK, etc.).

Both options support the same API interface, so switching between SaaS and self-hosted does not require code changes.

## Pricing

Lakera offers a free tier to get started, with paid plans scaling based on usage volume. Enterprise pricing is available through their sales team, with options for both SaaS and self-hosted deployments.

## Who Should Use This

Lakera Guard is most relevant for teams that have moved past the prototype stage and are deploying LLM applications into production with real users. Specifically:

- **Customer-facing chatbots** — Where prompt injection could lead to brand damage or data exposure
- **Enterprise AI agents** — Where multi-step agent workflows create larger attack surfaces
- **RAG applications** — Where external documents might contain hidden prompt injections
- **Regulated industries** — Where PII leakage creates compliance liability

The API-first design means you can integrate it into existing applications without restructuring your stack. It sits between your application and the LLM, not as a replacement for either.

## Worth Knowing

- Lakera runs **Gandalf** (gandalf.lakera.ai), a popular prompt injection game that doubles as a public demonstration of their detection capabilities. It is worth playing if you want to understand the threat landscape.
- The platform's threat intelligence database contains tens of millions of attack data points and grows by approximately 100,000 entries per day, sourced from Gandalf players, the Lakera red team, and public threat research.
- Lakera Guard is OWASP-aligned and supports the OWASP Top 10 for LLM Applications framework.

---

**Docs**: [docs.lakera.ai](https://docs.lakera.ai)  
**API**: `POST https://api.lakera.ai/v2/guard`  
**Free tier**: [platform.lakera.ai](https://platform.lakera.ai)  
**Gandalf game**: [gandalf.lakera.ai](https://gandalf.lakera.ai)
