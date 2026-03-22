---
title: "Voyage AI — The Embedding and Reranker API Acquired by MongoDB"
excerpt: "Voyage AI builds state-of-the-art embedding models and rerankers for RAG pipelines, with a MoE-powered voyage-4 family that cuts compute costs by 75%."
coverImage: "/assets/blog/voyage-ai-cover.png"
date: 2026-03-16T15:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/voyage-ai-cover.png"
---

## TL;DR

Voyage AI is an embedding and reranker API focused on retrieval accuracy for RAG pipelines. Acquired by MongoDB in early 2025, its latest voyage-4-large model uses a Mixture of Experts architecture that delivers dense-model quality at 75% lower active compute cost.

## The Problem

Most AI APIs focus on generation: chat completions, image synthesis, code assistants. Retrieval, the other half of the RAG equation, gets treated as an afterthought. Generic embedding models from large labs are adequate but not optimised for domain-specific retrieval, and rolling your own fine-tuned embeddings is expensive and time-consuming. Developers building production RAG systems need embeddings and rerankers that are purpose-built for accuracy, not an afterthought bolted onto a text generation API.

## What Voyage AI Actually Does

Voyage AI provides two core API primitives:

- **Embedding models** that convert text (and multimodal inputs) into dense vector representations for semantic search.
- **Rerankers** that take a query and a set of candidate documents, then re-score them by relevance using cross-encoder architecture.

The workflow is straightforward: embed your documents into a vector store, retrieve candidates via nearest-neighbour search, then pass the top results through a reranker for a refined ranking before feeding context to a generative LLM.

## The Voyage 4 Model Family

The flagship release is the voyage-4 family, launched in January 2026 with three tiers:

| Model | Context | Dimensions | Optimised For |
|-------|---------|-----------|---------------|
| voyage-4-large | 32K tokens | 1024 (256-2048) | Maximum retrieval quality |
| voyage-4 | 32K tokens | 1024 (256-2048) | Balanced quality and cost |
| voyage-4-lite | 32K tokens | 1024 (256-2048) | Latency and cost efficiency |

All three share a compatible embedding space, meaning you can mix models without re-indexing.

## MoE Architecture: 75% Fewer Active Parameters

The headline technical achievement is voyage-4-large's Mixture of Experts design. Traditional dense embedding models activate every parameter for every token. MoE replaces the dense feed-forward layers with a sparse routing system: a gating network directs each token to a subset of specialist "expert" networks.

Voyage AI set the activation ratio at 1:10, following industry convention. Their internal scaling study showed that MoE matched dense model retrieval accuracy while using 75% fewer active parameters, effectively decoupling knowledge capacity from inference cost.

They also developed a novel "router freezing" technique for model merging: router parameters are fixed in the final training stage before merging, preventing instability from interpolation of routing decisions across source models.

## Domain-Specific Models

Beyond general-purpose embeddings, Voyage AI offers models fine-tuned for specific domains:

- **voyage-code-3**: Optimised for code retrieval with lower-dimensional, quantised embeddings.
- **voyage-finance-2**: Built for financial document retrieval and RAG.
- **voyage-law-2**: Tuned for legal document search.
- **voyage-multimodal-3.5**: Handles interleaved text, images, and video.

## Rerankers

The reranker line includes rerank-2.5 and rerank-2.5-lite, both with 32K token context, instruction-following capability, and multilingual support. Unlike embedding models that encode queries and documents independently, rerankers are cross-encoders that process query-document pairs jointly, producing more accurate relevance scores.

Voyage AI has argued (with benchmarks) that dedicated rerankers outperform using LLMs as rerankers, both in accuracy and cost efficiency.

## The MongoDB Acquisition

In February 2025, Voyage AI joined MongoDB. The strategic logic is clear: MongoDB Atlas already offers vector search, and Voyage's embedding models plug directly into that stack. Post-acquisition, Voyage continues to operate its standalone API and publish new models independently.

## API and Developer Experience

The Python SDK (`voyageai`) is minimal. Embedding a batch of documents:

```python
import voyageai

vo = voyageai.Client()  # uses VOYAGE_API_KEY env var
embeddings = vo.embed(documents, model="voyage-4-large", input_type="document").embeddings
```

Reranking candidates:

```python
results = vo.rerank(query, documents, model="rerank-2.5")
```

A Batch API (launched December 2025) handles large-scale asynchronous workloads. Context lengths are generous at 32K tokens across the current generation. Embedding dimensions are configurable (256, 512, 1024, 2048) to balance accuracy against storage costs.

## Pricing

Voyage AI offers a free tier with rate-limited access for experimentation. Paid usage is per-token, with pricing varying by model. The lite variants are significantly cheaper than the large models. Full pricing is on their docs page.

## Who Should Use This

Voyage AI is purpose-built for teams running retrieval-heavy workloads: RAG chatbots, semantic search engines, recommendation systems, and any pipeline where retrieval quality directly impacts output quality. If you are already on MongoDB Atlas, the integration is native. If you are on Pinecone, Weaviate, Qdrant, or any other vector store, the API is provider-agnostic.

The domain-specific models (code, finance, law) are a genuine differentiator. General-purpose embeddings plateau on specialised corpora, and Voyage's fine-tuned models consistently outperform them in their target domains.

## What's Still Unclear

Long-term pricing trajectory under MongoDB ownership remains to be seen. The free tier is generous today but acquisitions tend to tighten commercial terms over time. Also worth watching: whether MongoDB will eventually restrict the standalone API to push Atlas adoption.

## Sources

- [Voyage AI Documentation](https://docs.voyageai.com/)
- [Breaking the Dense Ceiling: voyage-4-large MoE (March 2026)](https://blog.voyageai.com/2026/03/03/moe-voyage-4-large/)
- [Voyage 4 Model Family Announcement (January 2026)](https://blog.voyageai.com/2026/01/15/voyage-4/)
- [Joining MongoDB (February 2025)](https://blog.voyageai.com/2025/02/24/joining-mongodb/)
