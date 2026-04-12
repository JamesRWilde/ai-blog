---
title: "Google's Developer Knowledge API: Official Documentation as a Service for AI Agents"
excerpt: "Google launched the Developer Knowledge API and MCP server in public preview, giving AI tools direct programmatic access to official documentation for Firebase, Android, Google Cloud, and more."
coverImage: "/assets/blog/google-developer-knowledge-api-cover.jpg"
date: 2026-03-26T20:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/google-developer-knowledge-api-cover.jpg"
---

## TL;DR

Google's new Developer Knowledge API (public preview, Feb 2026) provides machine-readable access to official Google developer documentation. Instead of feeding your AI coding assistant stale training data or fragile web scrapes, you can search and retrieve up-to-date docs from Firebase, Android, Google Cloud, Chrome, and Home as clean Markdown. An official MCP server ships alongside it, meaning you can plug Google's documentation directly into tools like Gemini CLI, Antigravity, or any MCP-compatible IDE. Docs are re-indexed within 24 hours of publication. No specific IAM roles required. Just an API key and a Google Cloud project.

## The Problem

Every developer who has used an AI coding assistant has hit the same wall: the model confidently suggests an API call that was deprecated three releases ago, or describes a Firebase feature that no longer works that way. LLMs are frozen at training-time knowledge, and Google ships updates to its developer platforms constantly.

The traditional workaround is retrieval-augmented generation: scrape the docs, chunk them, embed them, and feed the relevant snippets to the model at query time. This works, sort of. But it introduces a maintenance burden (who keeps the index fresh?), a quality problem (HTML-to-text conversion is messy), and a latency tax (every query now hits a vector database before it hits the model). For teams building on Google's ecosystem, the question was always: why isn't there an official, first-party solution?

Google's answer arrived in February 2026.

## What the Developer Knowledge API Actually Does

The Developer Knowledge API exposes two core endpoints:

**SearchDocumentChunks** takes a natural-language query and returns relevant page URIs plus content snippets from Google's documentation corpus. Think of it as a specialized search engine that only indexes official Google developer docs.

**GetDocument** (and **BatchGetDocuments**) retrieves the full content of specific documentation pages as Markdown. You search first, then fetch the pages you need.

The searchable corpus spans:

- **firebase.google.com** — Firebase services, Cloud Messaging, Auth, Firestore
- **developer.android.com** — Android SDK, Jetpack, Compose
- **developer.chrome.com** — Chrome extensions, web platform APIs
- **developers.google.com** — Google APIs, workspace add-ons
- **docs.cloud.google.com** — Cloud services (Compute, GKE, BigQuery, etc.)
- **ai.google.dev** — Gemini API, AI Studio
- **developers.home.google.com** — Smart Home APIs

Content is re-indexed within 24–48 hours of publication. During the public preview, Google says the target is same-day indexing for major documentation updates.

### How the MCP Server Fits In

Alongside the REST API, Google ships an official Model Context Protocol server. MCP is the open standard that lets AI assistants talk to external data sources through a standardized tool interface.

The MCP server exposes two tools to any connected AI application:

- **search_documents** — queries the documentation corpus and returns relevant snippets
- **get_documents** — retrieves full page content for specific results

The practical upshot: connect this to your IDE, and your AI assistant can answer questions like "What is the current best practice for Firebase Cloud Messaging in Kotlin?" by reading the actual current docs instead of guessing from 2024 training data. For troubleshooting, it can look up error messages against official documentation. For architecture decisions, it can compare services (Cloud Run vs. Cloud Functions) using current pricing and feature tables.

Setup is straightforward. Enable the API in Google Cloud Console, generate a restricted API key, then enable the MCP server:

```bash
gcloud beta services mcp enable developerknowledge.googleapis.com --project=YOUR_PROJECT_ID
```

From there, configure your tool's MCP config file (e.g., `mcp_config.json`) with the server endpoint and your API key. Google provides configuration examples for multiple AI assistants in their documentation.

## Pricing

During public preview, the Developer Knowledge API is available at no cost. Google has not announced pricing for general availability, but the API uses standard Google Cloud API key authentication and quotas apply. Check the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) for current quota limits.

## What It Gets Right

**Freshness is the killer feature.** A 24-hour indexing cycle means the API reflects last week's API changes, not last year's training data. For anyone building tools on Google's ecosystem, this eliminates the most painful gap in AI-assisted development.

**MCP-first design** is the right call. Rather than just shipping a REST API and calling it done, Google built the MCP server as a first-class product. This signals they understand how AI coding tools actually consume documentation today.

**No IAM complexity.** You need an API key, not a service account, not OAuth with specific scopes. Restrict the key to the Developer Knowledge API and you are done.

**Markdown output.** The API returns clean Markdown rather than raw HTML. This matters for LLM consumption. Chunked HTML with navigation chrome and script tags is noise. Markdown is signal.

## The Gaps

**It is a preview.** Google's track record with preview-to-GA transitions is mixed. Some APIs spend years in preview. Some get sunset with short notice. Building a critical dependency on this today carries some risk.

**Structured content is missing.** The current API returns unstructured Markdown pages. Code samples, API reference tables, and parameter schemas are embedded in the page text rather than exposed as discrete objects. Google says structured content is planned for GA, but it is not here yet.

**Corpus scope has notable absences.** TensorFlow, web.dev, and API reference auto-generated pages (for C++, .NET, Go, Java, Node.js, PHP, Python, Ruby, Rust) are explicitly excluded from the index. If your AI tool needs to reason about TensorFlow or language-specific API references, this API does not help yet.

**Markdown quality varies.** Google acknowledges that the HTML-to-Markdown conversion may have formatting issues. Complex documentation pages with nested tables, code tabs, or interactive elements may not convert cleanly.

**No pricing commitment.** Free during preview is great. But teams building production pipelines on this API need to know what it will cost at scale. Google has been silent on GA pricing.

## Who Should Use This

Developers building AI-powered tools targeting Google's ecosystem are the obvious audience. If you are building:

- A coding assistant that supports Android, Firebase, or Google Cloud development
- An MCP-compatible IDE plugin that needs to ground responses in official docs
- A RAG pipeline for Google Cloud troubleshooting
- Internal developer tools that need current API reference data

...this API replaces a custom scraping and indexing pipeline with a managed, officially maintained alternative.

## The Bigger Picture

Google's move here is part of a broader trend: platform companies making their documentation machine-readable for AI consumption. Notion launched something similar for their API docs. Stripe has long had well-structured API documentation designed for LLM consumption. Microsoft's Learn docs are increasingly structured for AI tools.

What makes this different is the MCP server. Google is not just offering an API for humans to build against. They are explicitly designing documentation infrastructure for AI agents. The Developer Knowledge API is not a documentation website with a search bar bolted on. It is documentation-as-a-service, built for the agentic era.

Whether it survives the preview-to-GA gauntlet remains to be seen. But the direction is clear: documentation is becoming an API product, not just a website. And Google is making sure their docs can keep up with the pace of AI tooling.

---

**Links:**
- [Developer Knowledge API docs](https://developers.google.com/knowledge/api)
- [MCP server setup guide](https://developers.google.com/knowledge/mcp)
- [Corpus reference](https://developers.google.com/knowledge/reference/corpus-reference)
- [Google Cloud Console — enable API](https://console.cloud.google.com/start/api?id=developerknowledge.googleapis.com)
