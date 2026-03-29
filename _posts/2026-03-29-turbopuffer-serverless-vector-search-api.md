---
title: "Turbopuffer: Serverless Vector Search Engine Built on Object Storage"
excerpt: "Turbopuffer combines vector and full-text search on object storage, delivering in-memory speeds at a fraction of the cost with support for billions of documents."
coverImage: "/assets/blog/turbopuffer-cover.png"
date: 2026-03-29T09:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/turbopuffer-cover.png"
---

## TL;DR

Turbopuffer is a serverless search engine that combines approximate nearest neighbour (ANN) vector search and BM25 full-text search on top of object storage like S3. It caches actively searched data on NVMe SSD while keeping everything else in low-cost object storage, enabling competitive pricing at massive scale. The platform handles 2.5 trillion+ documents in production, with warm query latencies of p50=8ms and cold queries around p50=343ms for 1 million vectors. Clients are available for Python, TypeScript, Go, Java, and Ruby.

## The Problem

Running vector search at scale is expensive. Traditional in-memory search engines like Elasticsearch or Redis require replicated disk systems that duplicate data across nodes, driving up costs linearly with dataset size. For AI applications doing retrieval-augmented generation (RAG), semantic search, or recommendation systems, this means infrastructure bills that scale painfully with document volume.

Most vector databases solve the speed problem but not the cost problem. They keep everything in memory or on fast SSD, which works fine for datasets that fit in a single node but becomes prohibitive when you need to search across billions of documents. The alternative, cold storage, typically means multi-second query times that kill real-time application UX.

## How Turbopuffer Works

Turbopuffer's architecture inverts the traditional search engine cost model. Instead of provisioning replicated disks, it uses object storage (S3) as the primary data store. Only actively searched data gets cached on NVMe SSD with memory acceleration. The rest sits in cheap object storage, ready to be loaded on demand.

The system uses a Rust-based binary (`./tpuf`) that handles both indexing and querying. When a query arrives, the namespace's data is loaded from object storage into the SSD cache. Subsequent queries to that cached namespace run at p50=8ms latency. First-time cold queries take longer, around p50=343ms for 1 million documents, because they need to pull data from S3.

For vector search, turbopuffer uses a centroid-based ANN index derived from [SPFresh research](https://dl.acm.org/doi/10.1145/3600006.3613166). Unlike graph-based indexes like HNSW or DiskANN, centroid-based indexes minimize roundtrips to object storage and reduce write amplification. On a cold query, the centroid index downloads from S3, the nearest centroids are located, then each cluster's offset is fetched in a single large roundtrip.

Full-text search uses a BM25 inverted index optimized for object storage. Turbopuffer supports hybrid search combining both vector and text queries in a single request, which is critical for RAG applications where semantic similarity and keyword matching both matter.

Writes go through a write-ahead log (WAL) for consistency. Each write adds a file to the WAL directory, and data is asynchronously indexed for efficient retrieval. This design delivers approximately 10,000+ vectors per second write throughput with strong consistency guarantees. You can optionally configure queries for eventual consistency to get lower warm latency.

## Key Features

**Billion-Scale Architecture**

Turbopuffer handles 2.5 trillion+ documents and 10 million+ writes per second in production. Per-namespace limits sit at 500 million documents, with unlimited global document counts and namespace counts. This is infrastructure designed for the largest AI applications.

**Hybrid Search**

A single query can combine vector similarity search with BM25 full-text search and metadata filtering. This matters for production RAG pipelines where you want semantic understanding plus keyword precision plus structured filtering, all without making multiple API calls.

**SDK Support**

Official clients exist for Python, TypeScript, Go, Java, and Ruby. There is also a community-maintained Rust client. All SDKs follow OpenAI-style conventions where possible, making migration from other vector databases straightforward.

**Multi-Tenancy and Security**

The platform supports SOC 2 compliance, GDPR-ready DPAs, HIPAA-ready BAAs, single sign-on (SSO), customer-managed encryption keys (CMEK) per namespace, and private networking. Enterprise customers can deploy on single-tenancy clusters or bring their own cloud (BYOC).

**Cost Model**

Pricing starts at a $64/month minimum on the Launch tier, which includes all database features. Query prices have been reduced by up to 94% according to their pricing log. The object-storage-first architecture means you are not paying for replicated SSD across multiple nodes. Enterprise and Scale tiers are available for higher volumes with dedicated infrastructure.

## API Example

Here is a basic Python example showing how to create a namespace, write documents, and run a hybrid search:

```python
import turbopuffer

tpuf = turbopuffer.Turbopuffer()

# Create namespace and write documents
namespace = tpuf.namespace("articles")
namespace.write(
    upsert=[
        {"id": "1", "vector": [0.1, 0.2, ...], "text": "How transformers work"},
        {"id": "2", "vector": [0.3, 0.4, ...], "text": "RAG pipeline design"},
    ]
)

# Hybrid search: vector + text + metadata filter
results = namespace.query(
    vector=[0.1, 0.2, ...],
    top_k=10,
    query="transformer architecture",
    filter={"year": {">=": 2024}},
    hybrid_alpha=0.5,  # Balance between vector and BM25
)
```

The API is REST-based under the hood, but the SDKs handle authentication, retries, and pagination automatically. For TypeScript users, the SDK is generated by Stainless, the same tool that powers OpenAI's and Anthropic's official SDKs.

## When to Use Turbopuffer

Turbopuffer is built for first-stage retrieval, the job of narrowing millions or billions of documents down to tens or hundreds of candidates. It is not a full replacement for Elasticsearch if you need complex aggregations, faceting, or query-time scoring. But for AI workloads, RAG pipelines, semantic search, and recommendation systems, it delivers the right tradeoff between speed and cost.

The serverless model means you do not need to manage clusters, provision nodes, or worry about data replication. You write documents, run queries, and pay for what you use. For teams building on top of LLMs that need fast, cheap retrieval, turbopuffer is worth evaluating.

## Pricing Summary

| Tier | Minimum | Features |
|------|---------|----------|
| Launch | $64/month | All database features, multi-tenancy, SOC2/GDPR |
| Scale | Custom | Single-tenancy, private networking, dedicated support |
| Enterprise | Custom | BYOC, CMEK, SSO, HIPAA BAA, support SLA |

---

**Links:**
- [Website](https://turbopuffer.com)
- [Documentation](https://turbopuffer.com/docs)
- [Python SDK](https://github.com/turbopuffer/turbopuffer-python)
- [TypeScript SDK](https://github.com/turbopuffer/turbopuffer-typescript)
- [Go SDK](https://github.com/turbopuffer/turbopuffer-go)
