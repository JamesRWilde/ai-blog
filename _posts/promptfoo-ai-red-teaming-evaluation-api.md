---
title: "Promptfoo: The Open-Source AI Security Testing Platform Now Backed by OpenAI"
excerpt: "Promptfoo, the open-source red teaming and LLM evaluation platform used by 300,000+ developers, has joined OpenAI while remaining MIT-licensed and fully open source."
coverImage: ""
date: 2026-03-26T20:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: ""
---

## TL;DR

Promptfoo is an open-source CLI and library for evaluating and red-teaming LLM applications. It supports 60+ AI providers, tests for 50+ vulnerability types, and integrates with CI/CD pipelines. On March 16, 2026, the company announced it has joined OpenAI while keeping the product open source under the MIT license.

---

## What Is Promptfoo

Promptfoo is a developer-first security testing platform for AI applications. Think of it as a penetration testing suite purpose-built for large language models. Instead of manually probing your chatbot for prompt injection weaknesses or hoping your guardrails hold up, Promptfoo automates the entire process with context-aware attack generation.

The platform serves two primary functions:

1. **Model Evaluation** — Compare prompts and models side-by-side across providers like OpenAI, Anthropic, Google, Azure, Bedrock, and Ollama. Test prompt quality, measure latency and cost, and grade outputs using automated assertions or LLM-based rubrics.

2. **Red Teaming** — Simulate adversarial attacks against your AI applications to uncover vulnerabilities before production. This includes prompt injections, jailbreaks, data exfiltration, PII leaks, toxic content generation, system prompt overrides, and tool exploitation in agent architectures.

The tool runs entirely locally by default. Your prompts and data never leave your machine unless you opt into cloud features.

---

## Who Uses Promptfoo

The adoption numbers are notable. According to Promptfoo's own materials, 127 of the Fortune 500 companies use the platform. The open-source project has over 18,000 GitHub stars and a Discord community exceeding 18,000 members. Both OpenAI and Anthropic are listed as users on the project's GitHub page, which makes the March 2026 acquisition by OpenAI feel like a natural progression rather than a surprise.

The platform targets three audiences:

- **Security teams** running compliance checks against OWASP, NIST, and EU AI Act frameworks
- **Developers** integrating LLM testing into CI/CD pipelines and pull request workflows
- **AI engineers** comparing model performance, prompt variants, and RAG pipeline configurations

---

## Key Features

### Red Teaming and Vulnerability Scanning

Promptfoo's red teaming module generates custom attacks tailored to your specific application. Rather than relying on static jailbreak lists, it uses ML-trained agents to produce dynamic, context-aware attack vectors. The platform tests for over 50 vulnerability categories:

- Direct and indirect prompt injections
- Jailbreaks designed to bypass your specific guardrails
- RAG document exfiltration (extracting sensitive data from your knowledge base)
- System prompt override attempts
- Server-side request forgery (SSRF) via malicious tool calls
- PII leaks across sessions and APIs
- Unauthorized data access and broken object-level authorization (BOLA)
- Toxic, illegal, or dangerous content generation
- Unauthorized business or legal commitments made by the AI

### Prompt and Model Evaluation

The evaluation engine runs structured tests against your prompts and models using YAML configuration files. A basic config defines prompts with variable placeholders, specifies providers to test, and sets assertion rules:

```yaml
prompts:
  - 'Classify the following customer support ticket as urgent or normal: {{ticket}}'
providers:
  - openai:gpt-5.2
  - anthropic:messages:claude-opus-4-6
  - google:gemini-3-pro-preview
tests:
  - vars:
      ticket: "My account was charged three times and I cannot access my data"
    assert:
      - type: contains
        value: urgent
  - vars:
      ticket: "Can I change my display name?"
    assert:
      - type: contains
        value: normal
```

Assertions support exact matching, regex, JSON schema validation, JavaScript expressions, and LLM-based rubric grading. You can also set cost and latency thresholds to catch performance regressions alongside quality issues.

### CI/CD Integration

Promptfoo runs as a CLI tool, which makes it straightforward to embed in existing pipelines. GitHub Actions integration can flag LLM-related security and compliance issues directly in pull requests, with remediation guidance pushed back to developers.

### MCP Proxy

A newer addition, the MCP Proxy provides a secure proxy layer for Model Context Protocol communications, adding a security boundary between your application and the models it calls.

### Code Scanning

Promptfoo scans your codebase for LLM vulnerabilities in the IDE and CI/CD environments, catching insecure patterns like missing input validation, exposed API keys, or unsafe prompt construction before they reach production.

---

## Pricing

Promptfoo operates on a freemium model:

- **Open Source (MIT)** — Full CLI, evaluation engine, and red teaming capabilities available free forever
- **Enterprise** — Cloud dashboards, team collaboration, advanced compliance reporting, and dedicated support
- **Self-hosted** — On-premises deployment for organizations with strict data residency requirements

The open-source tier is not a restricted trial. It includes the core evaluation and red teaming functionality that most teams need.

---

## The OpenAI Acquisition

On March 16, 2026, Promptfoo announced it has joined OpenAI. The company confirmed the product remains open source under the MIT license with no changes to the licensing terms. The GitHub repository continues to be maintained publicly, and the Discord community remains active.

The acquisition makes strategic sense. OpenAI runs one of the largest AI platforms in the world and needs robust security testing tools for its own models and for the applications built on top of them. Promptfoo was already listed as a tool used by OpenAI before the acquisition, so this appears to formalize an existing relationship.

The potential risk is obvious: a security testing tool owned by one of the model providers it tests could face conflicts of interest. Whether Promptfoo maintains genuine independence in testing coverage and methodology will be the key question watching the next few quarters.

---

## Getting Started

Installation is straightforward via npm, pip, or brew:

```bash
npx promptfoo@latest init --example getting-started
```

This generates a configuration file with sample prompts and test cases. Running evaluations is a single command:

```bash
npx promptfoo@latest eval
npx promptfoo@latest view
```

The web viewer opens locally to display results side-by-side across models and test cases, with filtering, sorting, and export options.

For red teaming specifically:

```bash
npx promptfoo@latest redteam setup
npx promptfoo@latest redteam run
```

This generates a vulnerability report with severity ratings and remediation recommendations mapped to compliance frameworks.

---

## Bottom Line

Promptfoo fills a gap that most AI development teams eventually hit: testing LLM applications beyond "does it look right when I try it manually." The combination of open-source availability, 60+ provider support, CI/CD integration, and automated red teaming makes it one of the more practical tools in the AI security space. The OpenAI acquisition adds uncertainty about long-term independence, but the MIT license and active open-source community provide meaningful protection against that risk.

If you are building applications on top of LLMs and have not yet formalized your testing process, Promptfoo is probably the lowest-friction place to start.

---

## Sources

- [Promptfoo Official Website](https://www.promptfoo.dev)
- [Promptfoo GitHub Repository](https://github.com/promptfoo/promptfoo)
- [Promptfoo Red Teaming Documentation](https://www.promptfoo.dev/red-teaming/)
- [Promptfoo Joining OpenAI Announcement](https://www.promptfoo.dev/blog/promptfoo-joining-openai/)
