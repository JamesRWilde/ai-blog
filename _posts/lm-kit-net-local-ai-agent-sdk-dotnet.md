---
title: "LM-Kit.NET: The Local AI Agent SDK That Lets .NET Developers Ditch the Cloud"
excerpt: "LM-Kit.NET brings a complete on-device AI stack to C# and VB.NET developers. Local inference, agentic orchestration, RAG pipelines, and MCP tool calling all in one SDK with zero cloud dependency."
coverImage: "/assets/blog/lm-kit-net-cover.jpg"
date: 2026-03-22T12:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/lm-kit-net-cover.jpg"
---

## TL;DR

LM-Kit.NET is a full-stack AI SDK for .NET that runs entirely on-device. No cloud API calls, no data leaving your machine, no vendor lock-in. It combines a native inference engine supporting CPU/GPU/Vulkan/Metal, agent orchestration with six reasoning strategies, 70+ built-in tools, full Model Context Protocol (MCP) support, RAG pipelines, document intelligence, and Whisper-powered speech-to-text. All in a single NuGet package. The Community tier is free.

## The Problem

.NET developers have been stuck in a frustrating binary when it comes to AI integration. Either you ship your users' data to a third-party cloud API and eat the per-token costs, or you cobble together a patchwork of Python bindings, separate embedding services, external vector databases, and inference wrappers that never quite feel production-ready.

The AI industry has largely optimized for the Python-first, cloud-native workflow. Enterprise developers who need HIPAA compliance, air-gapped deployments, or simply want to avoid unpredictable API bills have been left to figure it out themselves.

LM-Kit.NET is built to solve exactly this.

---

## What LM-Kit.NET Actually Is

At its core, LM-Kit.NET is a native .NET SDK that runs open-weight language models locally on your machine. But calling it an "inference library" undersells what it does. Think of it as a complete AI operating system for .NET applications:

**Inference Engine:** Native backends for CUDA, Vulkan, Metal, and CPU. No Python runtime, no foreign bindings. You get 100+ pre-configured model cards spanning text, vision, embeddings, and speech. Dynamic LoRA hot-swapping lets you customize models at runtime without reloading.

**Agent Orchestration:** This is where things get interesting. LM-Kit.NET ships with a full agent framework: Agent, AgentBuilder, AgentExecutor, AgentRegistry. You can compose agents into pipeline, parallel, router, and supervisor orchestration patterns. Each agent can reason independently using one of six built-in strategies:

- Chain of Thought (step-by-step)
- ReAct (reason + act)
- Plan and Execute (upfront planning)
- Reflection (self-critique)
- Tree of Thought (branch exploration)
- None (direct response)

**MCP and Tool Calling:** Full Model Context Protocol client implementation. Connect to any MCP server via HTTP/SSE or Stdio transport. Import entire tool catalogs from community MCP servers. 70+ built-in tools across 8 categories: Data, Document, Text, Numeric, Security, Utility, I/O, and Net.

**RAG and Knowledge:** Semantic chunking, hybrid search, reranking, and a built-in vector store (with a Qdrant connector for scale). Multimodal RAG with image embeddings. Agent memory that persists across sessions using vector search.

**Document Intelligence:** PDF, DOCX, XLSX, PPTX, and image processing. VLM-powered OCR. Structured data extraction with JSON schema validation. Named entity recognition, PII extraction, and document classification. All running locally.

**Speech:** Whisper-powered transcription with hallucination suppression, voice activity detection, real-time streaming, and multi-language support.

---

## Why This Matters for Developers

The pitch isn't just "privacy" or "no cloud" (though both are real advantages). The practical value is in three areas:

**1. Predictable costs.** Once you run a model locally, inference is free beyond hardware. No per-token billing surprises. For applications with high-volume inference (document processing, real-time agents, batch analysis), this eliminates the single largest variable cost in AI-powered software.

**2. Latency.** Network round-trips add hundreds of milliseconds per interaction. For conversational agents or real-time document analysis, local inference cuts latency to the minimum your hardware allows.

**3. Compliance.** HIPAA, GDPR, SOX, air-gapped environments. When data never leaves your device, entire categories of compliance headaches disappear. LM-Kit.NET is positioned squarely at enterprise developers who need audit trails and data sovereignty.

## Platform Support

Windows, macOS, Linux, and ARM64. Compatible with .NET Framework 4.6.2 through .NET 10. MAUI support for cross-platform mobile/desktop apps. OpenTelemetry GenAI semantic conventions for observability built in from day one.

## The Agent Skills Ecosystem

One detail worth highlighting: LM-Kit.NET supports portable Agent Skills via SKILL.md bundles. These are self-describing skill packages that include instructions, tools, and guardrails. You can load them from local folders, remote URLs, or the agentskills.io marketplace. Hot-reload support means you can update agent capabilities without restarting your application.

This is similar to how MCP servers work in the broader AI ecosystem, but tailored for the on-device, .NET-first workflow.

## Pricing

The Community tier is free, including the ability to build and distribute commercial applications (with an acknowledgment on your product page). For enterprise use without the acknowledgment requirement, licensing is per unique application at $1,000/year with unlimited developers and unlimited end-user distribution. Each application license covers all updates and patches.

---

## Who Should Look at This

LM-Kit.NET is not for everyone. If you're building a simple chatbot that calls the OpenAI API, this is overkill. But if you're a .NET shop building:

- Document processing pipelines that handle sensitive data
- Multi-agent systems that need to run offline or on-premises
- Enterprise applications where API costs scale unpredictably
- Applications requiring compliance with data sovereignty regulations
- Real-time conversational AI where cloud latency is unacceptable

Then LM-Kit.NET is worth a serious look. It's the only solution in the .NET ecosystem that unifies inference, agent orchestration, RAG, document intelligence, and tool calling in a single SDK. The fact that it runs entirely on-device makes it particularly relevant for regulated industries.

The .NET AI landscape has been fragmented for a long time. LM-Kit.NET is trying to be the single SDK that ends the stitching-together phase.
