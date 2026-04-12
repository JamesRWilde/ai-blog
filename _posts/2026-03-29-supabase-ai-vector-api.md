---
title: "Supabase AI and Vector API: The Database You Already Have Just Got Smarter"
excerpt: "Supabase turns Postgres into a full AI backend with pgvector, built-in embedding generation, and semantic search — no separate vector database required."
coverImage: "/assets/blog/supabase-ai-cover.jpg"
date: 2026-03-29T09:48:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/supabase-ai-cover.jpg"
---

## TL;DR

Supabase — the open-source Postgres platform — offers a full AI and vector toolkit built directly into its database layer. Using the `pgvector` extension, built-in Edge Function inference, and first-class integrations with OpenAI, Hugging Face, and LangChain, developers can add semantic search, recommendation systems, and retrieval-augmented generation (RAG) without spinning up a separate vector database. The AI features are free to use on all plans, including the generous free tier.

## The Problem

Adding AI capabilities to an application typically means stitching together a constellation of services: one for embeddings, one for vector storage, another for search, and yet another for the LLM itself. Each new dependency introduces latency, cost, operational complexity, and yet another vendor relationship to manage.

Vector databases like Pinecone, Weaviate, and Qdrant solve the storage and retrieval piece, but they are separate systems that need to be maintained, synchronized, and paid for alongside your primary database. For most teams, especially startups and mid-size companies, this overhead is disproportionate to the actual value delivered — at least initially.

Supabase's pitch is blunt: the best vector database is the database you already have.

## How Supabase AI Works

### pgvector: Vectors Inside Postgres

At the core of Supabase's AI offering is `pgvector`, a Postgres extension that adds a `vector` data type for storing and querying high-dimensional embeddings. It supports:

- **Euclidean distance** (`<->`), **inner product** (`<#>`), and **cosine distance** (`<=>`) operators
- **IVFFlat** and **HNSW** indexing for fast approximate nearest-neighbor search
- Standard SQL queries, meaning any Postgres client or ORM works without modification

You enable it with a single SQL command:

```sql
create extension vector with schema extensions;
```

Then you define vector columns in your existing tables alongside regular relational data:

```sql
create table documents (
  id serial primary key,
  title text not null,
  body text not null,
  embedding extensions.vector(384)
);
```

The dimension count (384 in this example) matches whatever your embedding model outputs. There is no separate vector store to provision, no new query language to learn, and no data synchronization to worry about.

### Edge Functions with Built-In Embedding Generation

Supabase Edge Functions — serverless TypeScript endpoints running on Deno — include a built-in AI inference API via `Supabase.ai.Session`. This lets you generate embeddings directly at the edge without calling out to OpenAI or another external provider.

```ts
const session = new Supabase.ai.Session('gte-small');

Deno.serve(async (req) => {
  const { input } = await req.json();
  const embedding = await session.run(input, {
    mean_pool: true,
    normalize: true,
  });
  return new Response(
    JSON.stringify({ embedding }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});
```

The built-in model is `gte-small` from Alibaba's GTE family, producing 384-dimensional embeddings. It costs nothing extra — the inference runs within your Edge Function allocation. For teams that need higher-quality embeddings from models like OpenAI's `text-embedding-3-small` or `text-embedding-3-large`, the same Edge Function can call those APIs instead.

### Three Flavors of Search

Supabase supports three search modes, all implemented in standard Postgres SQL:

**Keyword search** uses Postgres full-text search with `tsvector` and `tsquery` columns. It is the right choice when users need exact term matches, identifiers, or specific phrases.

**Semantic search** uses vector similarity (cosine distance) against `pgvector` columns. It understands meaning and context, so "increase text size on display" matches "How to adjust font size in settings" even though the words differ.

**Hybrid search** combines both using Reciprocal Ranked Fusion (RRF). Each method produces its own ranked result list, and RRF merges them into a single ranked output. This gives you the precision of keyword matching with the breadth of semantic understanding.

The hybrid approach is particularly useful for RAG pipelines, where you want both exact code/API reference matches and broader conceptual matches when feeding context to an LLM.

### Integrations

Supabase's AI toolkit integrates with the major frameworks and providers:

- **OpenAI** — call OpenAI embedding and chat APIs from Edge Functions, store the results in pgvector
- **Hugging Face** — use Transformers.js for client-side or Edge Function inference with any Hugging Face model
- **LangChain** — Supabase is a first-class vector store in LangChain's Python and JavaScript SDKs
- **LlamaIndex** — native document loaders and vector store integrations

The Python `vecs` client provides a higher-level API for managing collections of embeddings without writing raw SQL.

## Who It Is For

Supabase AI is most compelling for teams that already use (or are considering) Supabase as their primary database. The value proposition is straightforward: you avoid the operational overhead of a separate vector database while getting AI capabilities that are "good enough" for the vast majority of use cases.

It is less ideal for teams that need:
- Dedicated vector search at extreme scale (billions of vectors with sub-10ms p99 latency)
- Specialized vector features like filtering, payload storage, or multi-tenancy at the vector level
- Models beyond `gte-small` without external API calls

For most applications — chatbots over documentation, semantic search in SaaS products, content recommendations, RAG over internal knowledge bases — Supabase's built-in AI tools are more than sufficient.

## Pricing

The AI and vector features are not separately priced. They are included in every Supabase plan:

- **Free** — 2 projects, 500MB database, 50,000 Edge Function invocations/month
- **Pro** — $25/month per project, 8GB database, 2 million Edge Function invocations/month
- **Team** — $599/month, same compute as Pro with SOC 2 compliance and priority support
- **Enterprise** — custom pricing, SLA, dedicated support

The `gte-small` embedding model runs within your Edge Function allocation at no additional charge. External embedding APIs (OpenAI, etc.) are billed by those providers separately.

## The Bottom Line

Supabase has quietly built one of the most developer-friendly AI backends available, and the catch is that it does not feel like an "AI product" at all. It is just Postgres, with `pgvector` bolted on, serverless functions that can run models, and SQL for everything. No new infrastructure, no new query language, no new vendor.

The trade-off is that it will not outperform a purpose-built vector database at the bleeding edge of scale. But for the 95% of applications that need semantic search, RAG, or embeddings over a few million documents, Supabase does the job with less complexity and zero additional cost.

The best vector database really might be the database you already have.
