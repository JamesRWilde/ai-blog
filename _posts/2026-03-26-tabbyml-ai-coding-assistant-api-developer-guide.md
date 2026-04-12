---
title: "TabbyML API: The Self-Hosted AI Coding Assistant for Privacy-First Developers"
excerpt: "TabbyML delivers GitHub Copilot-quality code completions via a self-hosted, open-source API that keeps your codebase on your own hardware."
coverImage: "/assets/blog/tabbyml-cover.png"
date: 2026-03-26T12:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/tabbyml-cover.png"
categories:
  - Developer Tools
  - Code Generation
tags:
  - TabbyML
  - AI Coding Assistant
  - Self-Hosted AI
  - Open Source
  - Code Completion API
  - IDE Integration
keywords:
  - TabbyML API
  - self-hosted AI coding assistant
  - open source code completion
  - TabbyML developer guide
  - local AI code assistant
metaTitle: "TabbyML API Guide - Self-Hosted AI Coding Assistant for Developers"
metaDescription: "Learn how to integrate TabbyML's self-hosted AI coding assistant via API. Open-source, privacy-first, runs on consumer GPUs."
ogTitle: "TabbyML API: Self-Hosted AI Coding Assistant"
ogDescription: "Deploy your own AI coding assistant with TabbyML's API. Open-source, runs locally, supports 20+ code models."
canonicalUrl: ""
authorWebsite: ""
authorTwitter: ""
progress: completed
---

# TabbyML API: The Self-Hosted AI Coding Assistant for Privacy-First Developers

GitHub Copilot changed how developers write code, but it comes with a catch: your codebase gets shipped to OpenAI's servers. For teams working with sensitive intellectual property, regulated data, or simply wanting control over their AI infrastructure, that tradeoff is a dealbreaker.

TabbyML fills that gap. It is an open-source, self-hosted AI coding assistant that runs entirely on your own hardware. Think Copilot-quality completions, chat, and code search, but your code never leaves your machine.

## What Is TabbyML?

TabbyML is a lightweight, self-contained AI coding assistant built by a team out of the Bay Area. It ships as a single binary (or Docker container) with no external dependencies, no cloud database, and no telemetry by default. You point it at a GPU, feed it code models, and it provides an OpenAPI-compatible interface that IDE extensions talk to.

The project is open-source under the Apache 2.0 license and has accumulated over 35,000 stars on GitHub.

## Key Features

### Code Completion

The core feature. TabbyML provides inline code completions as you type, using models trained specifically on code. It supports repository-level context, meaning it can reference other files in your project to make smarter suggestions.

Supported completion models include:

- StarCoder (1B, 3B, 7B)
- StarCoder2 (3B, 7B)
- DeepSeek-Coder (1.3B, 6.7B)
- CodeLlama (7B, 13B)
- CodeGemma (2B, 7B)
- CodeQwen (7B)
- Qwen2.5-Coder (0.5B through 14B)
- Codestral (22B)

The model registry is extensive and growing. Benchmarks are published at leaderboard.tabbyml.com so you can make informed choices about quality versus hardware requirements.

### Answer Engine

TabbyML includes an Answer Engine that lets developers ask natural language questions about their codebase directly in the IDE. It retrieves relevant context from your repository and generates explanations, examples, or debugging suggestions. Think of it as ChatGPT that actually understands your specific code.

### Inline Chat

Beyond the answer engine, TabbyML supports inline chat for real-time collaboration. Developers can highlight code, ask for refactoring suggestions, request explanations, or generate tests without leaving their editor.

### OpenAPI-Compatible Interface

This is the part that matters for integration. TabbyML exposes a REST API following the OpenAPI specification. That means you can build custom tooling, integrate it into CI pipelines, connect it to Cloud IDEs, or plug it into any system that can make HTTP requests.

The API endpoints cover:

- `/v1/completions` - Code completions
- `/v1/chat/completions` - Chat interactions
- `/v1/answers` - Answer Engine queries
- `/v1/experimental/generate` - Experimental generation

### Data Connectors

TabbyML can pull context from external data sources including documentation sites, configuration files, and APIs. This enriches the AI's understanding of your project beyond just the source code.

### Enterprise Features

For teams, TabbyML offers LDAP authentication, usage analytics, GitLab and GitHub integration for indexing merge requests and issues, role-based access control, and background job processing. The admin UI provides visibility into team usage patterns.

## Integration & Compatibility

### IDE Support

TabbyML provides extensions for:

- **VS Code** (most mature)
- **JetBrains** (IntelliJ, PyCharm, WebStorm, GoLand, and others)
- **Neovim**
- **Eclipse**

### Deployment

The simplest deployment is a single Docker command:

```bash
docker run -it \
  --gpus all -p 8080:8080 -v $HOME/.tabby:/data \
  tabbyml/tabby \
  serve --model StarCoder-1B --device cuda --chat-model Qwen2-1.5B-Instruct
```

TabbyML supports NVIDIA CUDA, Apple Metal (M1/M2/M3), and CPU inference. For cloud deployment, it integrates with SkyPilot for multi-cloud orchestration.

### Hardware Requirements

- **1B to 3B models**: NVIDIA T4, 10-series, 20-series, or Apple Silicon (M1+)
- **7B to 13B models**: NVIDIA V100, A100, 30-series, or 40-series GPUs

### Authentication

TabbyML supports token-based API authentication and LDAP for enterprise deployments. GitHub and GitLab SSO are available in team and enterprise plans.

## Pricing

TabbyML operates on a three-tier model:

- **Community Plan** - Free and open-source. Self-hosted, self-onboarding, full feature set for individual developers.
- **Team Plan** - Paid tier with enhanced features for collaboration, usage analytics, and priority support.
- **Enterprise Plan** - Custom pricing with LDAP/SSO, advanced security controls, flexible deployment options, and dedicated support.

The community plan is genuinely free, no credit card required. You can run TabbyML on your own hardware indefinitely at zero cost beyond electricity and GPU wear.

## Why TabbyML Matters

The AI coding assistant space is dominated by cloud-first products: Copilot, Cursor, Cody, and Amazon CodeWhisperer all require sending code to remote servers. That creates real problems for teams in finance, healthcare, defense, and other regulated industries where data sovereignty is a legal requirement, not a preference.

TabbyML solves this without asking developers to sacrifice quality. The model registry includes state-of-the-art code models like Qwen2.5-Coder and Codestral that rival the proprietary models powering commercial alternatives.

The self-hosted approach also means you control versioning. When a cloud provider changes their model silently (and they do), your completions can shift without warning. With TabbyML, you pin specific models and upgrade on your schedule.

## Frequently Asked Questions

**Q: How does TabbyML compare to GitHub Copilot in completion quality?**

A: TabbyML supports many of the same underlying models (CodeLlama, StarCoder, Codestral) that power commercial code assistants. Completion quality depends on which model you choose and your hardware. For most tasks, the 7B models deliver comparable results to Copilot. Larger models like Codestral-22B push further ahead.

**Q: Can I use TabbyML with my existing IDE setup?**

A: If you use VS Code, JetBrains, Neovim, or Eclipse, TabbyML has an extension. The setup is straightforward, install the extension, point it at your TabbyML server URL, and authenticate.

**Q: Does TabbyML work with private repositories?**

A: That is the entire point. Since TabbyML runs locally, your code never leaves your infrastructure. It indexes your repositories for context without any external network calls.

**Q: What about data privacy?**

A: TabbyML collects no telemetry by default. The community plan does not phone home. Your queries, completions, and code context stay on your hardware. Enterprise deployments can enable optional usage reporting for admin dashboards.

**Q: Can TabbyML index GitLab merge requests?**

A: Yes. Since version 0.30, TabbyML supports indexing GitLab Merge Requests as context. GitHub integration for issues and PRs arrived in earlier versions.

**Q: Is there an API I can build on?**

A: TabbyML exposes a full OpenAPI-compatible REST interface. You can build custom integrations, connect it to internal tooling, or use it as a backend for your own AI-powered developer tools.

## Conclusion

TabbyML is not trying to be the flashiest AI coding assistant. It is trying to be the most practical one for teams that need control. The API is clean, the model selection is broad, the deployment is simple, and the license is permissive.

For developers and organizations that want AI-powered code assistance without the privacy compromises of cloud-based alternatives, TabbyML is the most mature option available today. Start with the Docker command, try it on your own code, and see if the completions hold up against what you are currently using.
