---
title: "Vespa Cloud API: The Enterprise-Grade AI Search Platform You Should Know About"
excerpt: "Vespa Cloud combines vector search, text search, and machine-learned ranking into a single, fully managed API that scales to billions of documents with sub-100ms latency."
coverImage: "/assets/blog/vespa-ai-cover.jpg"
date: 2026-03-27T08:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/vespa-ai-cover.jpg"
---

## TL;DR

Vespa Cloud is Yahoo's battle-tested AI search platform, now available as a fully managed API for developers. It combines vector search, full-text search, structured queries, and real-time machine-learned ranking into one unified system. Used by Spotify, Yahoo, Perplexity, AlphaSense, and Vinted, Vespa lets you build RAG pipelines, recommendation engines, and intelligent search applications that scale to billions of documents with latencies under 100 milliseconds. Pricing starts at $0.05/vCPU per hour on the Startup plan.

## The Problem

Building search-powered AI applications today usually means stitching together multiple services. You need a vector database for embeddings, a text search engine for keyword matching, a separate inference layer for running ML models at ranking time, and then some glue code to coordinate it all. Each component has its own API, its own scaling behavior, and its own failure modes. The result is fragile architectures that are expensive to run and hard to reason about.

RAG applications make this worse. You chunk documents, embed them, store them, retrieve them, and feed them to an LLM. But the retrieval step is often the weak link because pure vector similarity search misses critical context. Hybrid search (combining vectors with BM25 text matching) helps but introduces yet another system to manage. And when you want to rerank results with a cross-encoder model? That is another service call with its own latency budget.

Vespa Cloud takes a different approach. It is a single engine that handles all of these tasks natively, which eliminates the need to orchestrate a dozen separate services.

## What Vespa Cloud Actually Is

Vespa is an open-source search engine and vector database originally built by Yahoo in 2004. It has been powering search and recommendation at web scale for over two decades. Vespa Cloud is the fully managed version that runs on AWS and GCP, handling provisioning, scaling, upgrades, and security automatically.

The platform exposes a straightforward REST API for document operations and queries. You define schemas, feed documents, and run queries that can combine text search, vector search, structured filtering, and ML model inference in a single request.

### Document API

Documents are fed through the `/document/v1/` endpoint using standard JSON over HTTP:

```bash
curl -X POST -H "Content-Type:application/json" --data '{
  "fields": {
    "title": "Understanding RAG Pipelines",
    "body": "Retrieval-augmented generation combines search with LLMs...",
    "embedding": [0.12, 0.85, 0.34, ...],
    "category": "ai"
  }
}' \
https://myapp.example.com/document/v1/myapp/docs/docid/rag-pipeline-guide
```

The same API supports GET, PUT (partial updates), and DELETE operations. Upserts (insert-or-update) are supported via the `create=true` parameter. Conditional writes with test-and-set semantics let you build conflict-free concurrent workflows.

### Query API

Queries are sent as HTTP GET or POST to `/search/` or `/document/v1/` endpoints. Vespa's query language (YQL) lets you combine text, vector, and structured queries in a single request:

```bash
curl -X POST -H "Content-Type:application/json" --data '{
  "query": "select * from sources * where userQuery() and category == \"ai\" limit 10",
  "query": "ai search pipelines",
  "ranking": {
    "profile": "relevance"
  }
}' \
https://myapp.example.com/search/
```

Nearest-neighbor search for vector similarity uses the `nearestNeighbor()` operator and can be combined with text filters and structured conditions. This is critical for hybrid search scenarios where you need both semantic matching and precise filtering.

## Key Features for Developers

### Native Hybrid Search

Vespa supports vector search, BM25 text search, and structured queries in a single engine. No need to maintain separate Elasticsearch and Pinecone instances. Queries can combine all three types with boolean operators, and Vespa's query planner optimizes execution automatically.

### Machine-Learned Ranking at Scale

This is where Vespa stands out. You can deploy ONNX, TensorFlow, XGBoost, or LightGBM models directly in Vespa and use them for ranking at query time. Cross-encoder transformer models can rerank the top candidates without an external API call. The two-phase ranking architecture first evaluates a lightweight model on all candidates, then runs a heavier model on the top results, all within the same sub-100ms latency budget.

### RAG Built In

Vespa has first-class support for RAG applications. You can store document chunks with their embeddings, run nearest-neighbor retrieval, and even call external LLMs (or run local ones) from within the Vespa application layer. Document enrichment pipelines can generate embeddings and augment documents at ingestion time.

### Real-Time Updates

Unlike batch-oriented vector databases, Vespa handles continuous writes and updates without requiring reindexing. Documents can be added, updated, or deleted through the Document API, and indexes update in real time. This matters for recommendation systems and news search where content freshness is critical.

### Auto-Scaling

Vespa Cloud automatically scales clusters horizontally (more data) and vertically (more traffic). Cluster sizes can change without downtime, and data redistribution happens in the background. The platform also supports auto-scaling on the Cloud plans, so you are not over-provisioning during low-traffic periods.

## Pricing

Vespa Cloud uses resource-based pricing with four tiers:

| Plan | vCPU/hour | Memory/GB/hour | Disk/GB/hour | GPU Memory/GB/hour |
|------|-----------|----------------|--------------|---------------------|
| Startup | $0.05 | $0.005 | $0.0002 | $0.03 |
| Basic | $0.10 | $0.01 | $0.0004 | $0.07 |
| Commercial | $0.145 | $0.0145 | $0.0005 | $0.10 |
| Enterprise | $0.18 | $0.018 | $0.0007 | $0.125 |

The Startup plan runs on shared resources with community support only and no redundancy. It is fine for development and prototyping but experiences downtime during Vespa upgrades (approximately 15 minutes per day). The Commercial plan includes 24/7 operational support with a 1-hour production response time.

Volume discounts reduce unit prices by up to 50% based on total allocated resources. Committed spend (annual) adds an additional 15% discount.

There is also a Self Managed option for running Vespa on your own infrastructure, which eliminates per-resource charges while still including support.

## Who Uses Vespa

Vespa powers search and recommendation at some of the largest platforms in the world:

- **Spotify** uses Vespa for music search and recommendation, serving queries for hundreds of millions of listeners.
- **Perplexity** uses Vespa as part of their AI search infrastructure.
- **AlphaSense** relies on Vespa for AI-powered market intelligence search.
- **Yahoo** has used Vespa as the backbone of its search and advertising platforms for over 20 years.
- **Vinted** uses Vespa for product search on Europe's largest second-hand marketplace.
- **OkCupid** and **Otto** also build on Vespa for personalization and search.

## Getting Started

The fastest way to start with Vespa Cloud is through the developer console at [cloud.vespa.ai](https://cloud.vespa.ai). You create a tenant, deploy an application with a schema definition, and start feeding documents through the REST API.

Vespa provides sample applications for common use cases including semantic search, RAG with external LLMs, recommendation systems, and multimodal search. The documentation at [docs.vespa.ai](https://docs.vespa.ai) is thorough, covering everything from basic CRUD operations to advanced topics like tensor expressions and cross-encoder reranking.

The project is open source at [github.com/vespa-engine/vespa](https://github.com/vespa-engine/vespa), so you can also self-host if that fits your deployment model better.

## The Bottom Line

Vespa Cloud is not trying to be everything. It is focused on one thing: being the best platform for building search-powered AI applications at scale. If you are currently running separate vector databases, text search engines, and ML inference services, Vespa offers a compelling alternative that simplifies the stack without sacrificing capability. The pricing is transparent and resource-based rather than per-query, which makes cost forecasting straightforward for production workloads.

The learning curve is real because Vespa's schema system, rank profiles, and tensor expressions are more powerful than a typical vector database API. But for teams building serious search, recommendation, or RAG applications that need to scale, that investment pays off in architectural simplicity and operational reliability.

---

**Pricing:** Startup plan from $0.05/vCPU/hour, Commercial from $0.145/vCPU/hour
**Docs:** docs.vespa.ai
**API:** REST (Document v1, Query API, YQL query language)
**GitHub:** github.com/vespa-engine/vespa
**Cloud:** cloud.vespa.ai
