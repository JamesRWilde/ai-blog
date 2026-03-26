---
title: "Supermemory API: The Context Infrastructure That Gives AI Agents Perfect Recall"
excerpt: "Supermemory provides a unified memory, RAG, and context management API that claims state-of-the-art performance on every major long-term memory benchmark."
coverImage: "/assets/blog/supermemory-cover.png"
date: 2026-03-27T12:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/supermemory-cover.png"
---

## TL;DR

Supermemory is a context infrastructure API for AI agents that bundles long-term memory, user profiles, content extraction, and managed RAG into a single SDK. It claims state-of-the-art results on LongMemEval (85.2%), LoCoMo, and ConvoMem benchmarks, with sub-300ms p95 latency at scale. The platform processes over 100 billion tokens per month and supports TypeScript, Python, and REST. Pricing starts with a free tier for developers.

## The Problem

Every developer building an AI agent runs into the same wall eventually. The model is smart. The tools are wired up. The prompts are tuned. But the agent still has the memory of a goldfish. It does not remember what the user said five conversations ago. It cannot connect a preference mentioned on Tuesday to a request made on Friday. And the developer is left stitching together vector databases, session stores, and ad hoc summarization pipelines just to fake continuity.

RAG partially solves retrieval. But raw retrieval is not memory. A vector similarity search on chunked documents does not handle evolving user preferences, temporal updates, or the difference between a fact that was true last month and one that is true now. Teams end up using three or four separate services, one for storage, one for extraction, one for retrieval, and one for user profiles, each with its own API, its own latency, and its own failure modes.

Supermemory aims to collapse all of that into one API call.

## What Supermemory Actually Is

Supermemory positions itself as the full context stack for AI agents, not just a vector database with a nicer marketing page. The platform is built around five integrated layers:

**Memory Graph Engine.** Not a standard vector store. Supermemory maps real relationships between memories using ontology-aware edges, so the system understands how knowledge connects, not just which chunks are vaguely similar. Facts evolve on top of existing context in real time, handling knowledge updates, temporal changes, and even deliberate forgetfulness.

**User Profiles.** Every user gets a profile that splits into static facts, information the agent should always know, and dynamic facts, episodic information from recent conversations. This is not a simple key-value store. The profile is constructed automatically from conversations and updated as new information arrives.

**Content Extraction.** Supermemory ingests text, conversations, PDFs, images, documents, and even video. The extraction is handled server-side, so developers do not need to build their own parsing and chunking pipelines.

**Managed RAG.** Alongside the memory engine, developers get full RAG-as-a-service with advanced metadata filtering, contextual chunking, and integration with the memory graph. The memory and RAG layers share the same context pool, so you can mix and match without managing separate indexes.

**Connectors.** Built-in syncing from external data sources, allowing agents to pull context from tools the user already uses.

## How the API Works

The developer experience is deliberately minimal. After signing up at the Supermemory console and generating an API key, integration looks like this:

```python
from supermemory import Supermemory

client = Supermemory()
USER_ID = "user-123"

# Store a memory
client.add(
    content="User prefers dark mode and works primarily in Python",
    container_tag=USER_ID,
)

# Retrieve relevant context for a query
profile = client.profile(container_tag=USER_ID, q="What IDE should I recommend?")

context = f"""Static profile:
{chr(10).join(profile.profile.static)}

Dynamic profile:
{chr(10).join(profile.profile.dynamic)}

Relevant memories:
{chr(10).join(r.get("memory", "") for r in profile.search_results.results)}"""
```

The `container_tag` parameter is the key abstraction. It represents an entity, a user, a document, a project, an organization, and all memories, profiles, and retrieved context are scoped to it. You can use one container for a user's personal memory or multiple containers for different projects within the same account.

TypeScript follows the same pattern:

```typescript
import Supermemory from "supermemory";

const client = new Supermemory();

const profile = await client.profile({
  containerTag: "user-123",
  q: "What does the user prefer?",
});

const context = `Static profile:
${profile.profile.static.join("\n")}

Dynamic profile:
${profile.profile.dynamic.join("\n")}

Relevant memories:
${profile.searchResults.results.map((r) => r.memory).join("\n")}`;
```

The SDKs also include a Vercel AI SDK integration via `@supermemory/tools/ai-sdk` for teams building on Next.js.

## Benchmarks and Performance

Supermemory publishes its benchmark numbers and leads on several key evaluations:

- **LongMemEval:** 85.2% accuracy on long-term memory evaluation
- **LoCoMo:** Number one on long conversation memory
- **ConvoMem:** Number one on conversational memory

They also built MemoryBench, an open evaluation platform specifically for memory systems, which is available on GitHub.

On the infrastructure side, the company claims sub-300ms p95 latency at any scale and processes over 100 billion tokens per month in production. They offer a self-hosted option for enterprise deployments that need to run inside a VPC.

## How It Compares

Supermemory positions itself against two main categories of competitors:

**Memory-specific tools like Mem0 and Zep.** Supermemory claims to offer five context layers where competitors typically offer one or two. The comparison table on their site lists memory graphs, user profiles, document retrieval, connectors, document extractors, sub-300ms latency, self-hosting, consumer plugins, and an open evaluation platform as differentiators against both Mem0 and Zep.

**Raw vector databases.** The pitch here is that a vector store gives you similarity search, while Supermemory gives you understanding. The graph engine connects memories by relationship, not just embedding proximity, and the system handles temporal updates and knowledge evolution automatically.

## Pricing and Availability

Supermemory offers a free tier for developers getting started. Enterprise plans support self-hosting and custom SLAs. The full pricing breakdown was not publicly listed at the time of writing, but the developer console at console.supermemory.ai provides API key management and usage dashboards.

## Who Should Use This

Supermemory is built for developers shipping AI agents that need to remember things across sessions. That includes customer support bots, personal assistants, coding agents, and any application where user context accumulates over time. If you are currently maintaining a separate vector store, a session store, and a user profile database just to give your agent a sense of continuity, Supermemory is worth evaluating as a drop-in replacement for all three.

The API is clean, the SDKs are thin, and the benchmark claims are specific enough to be testable. Whether it actually delivers sub-300ms at your scale is something you will need to verify yourself, but the architecture makes sense and the traction, 100 billion tokens processed monthly, suggests real production usage.

---

**Quick Links:**

- **Website:** [supermemory.ai](https://supermemory.ai)
- **Documentation:** [supermemory.ai/docs](https://supermemory.ai/docs/intro.md)
- **Developer Console:** [console.supermemory.ai](https://console.supermemory.ai)
- **MemoryBench:** [github.com](https://supermemory.ai/research)
