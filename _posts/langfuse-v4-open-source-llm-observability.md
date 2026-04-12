---
title: "Langfuse v4: The Open-Source LLM Observability Platform Rewrites Its Data Engine for Speed"
excerpt: "Langfuse overhauled its ClickHouse architecture with an observation-centric data model that delivers 10x faster dashboards and millisecond query times for large projects."
coverImage: "/assets/blog/langfuse-cover.png"
date: 2026-03-17T16:30:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/langfuse-cover.png"
---

## TL;DR

Langfuse, the open-source LLM engineering platform, rolled out a major architectural overhaul in March 2026 that replaces its two-table tracing model with a single, observation-centric ClickHouse table. The update eliminates expensive joins and deduplication, cutting dashboard load times by 10x or more for large projects and turning seconds-long API queries into milliseconds. New Observations API v2 and Metrics API v2 endpoints come with cursor-based pagination and selective field retrieval.

## The Problem

Every team building production LLM applications eventually hits the same wall: you cannot see what your models are actually doing. Debugging a hallucination means combing through raw JSON payloads. Explaining a cost spike means guessing which code path triggered it. Monitoring agent workflows with dozens of chained model calls becomes an exercise in connecting dots across scattered log files.

Traditional observability tools were designed for deterministic systems. Database queries either succeed or fail. API endpoints return predictable responses. LLM calls are different. They are stochastic, expensive, and variable. A single prompt can cost fractions of a cent or several dollars depending on context length and model choice. Latency varies with token generation speed. Quality varies with prompt engineering and model version. None of this fits neatly into dashboards built for monitoring HTTP status codes.

Langfuse launched in 2023 as an open-source answer to this problem. The platform traces every LLM call, tracks costs at the request level, manages prompt versions, and provides evaluation tools for testing model outputs. By late 2025, it had become one of the most widely adopted LLM observability platforms in the developer ecosystem, with integrations across OpenAI, Anthropic, Google, LangChain, LiteLLM, and the broader model provider landscape.

But scale has a way of exposing architectural shortcuts.

## Growing Pains

Langfuse's original design carried over Postgres access patterns into ClickHouse when it migrated its tracing data in December 2024. The model split data across two tables: `traces` for shared metadata and `observations` for individual operations within a trace. Answering "What is the total cost for this user?" or "How many LLM calls happened in this session?" required joining two tables with billions of records.

At lower volumes, this was manageable. By the second half of 2025, it was not. Langfuse grew 19x in terms of data processed during the year. ClickHouse node sizes grew 15 times to compensate. Some queries on longer durations produced out-of-memory terminations. Adding more compute was not a viable long-term strategy.

The update mechanism made things worse. Early LLM calls had high latency, so the SDKs sent multiple events: one for the API invocation, another for the response, and potentially more for metadata updates. In ClickHouse, this was handled with a ReplacingMergeTree that required full-row replacements rather than field-level updates. ClickHouse pushed deduplication to background merges, so to guarantee correctness the system had to scan billions of records to surface only the latest version of each row before returning a single result. This consumed massive CPU and memory.

S3 costs compounded the problem. To support updates, Langfuse stored raw events on S3, then listed, fetched, and merged files on read. The S3 API calls scaled linearly with throughput, becoming expensive for both the hosted platform and self-hosting users.

## What v4 Actually Does

Langfuse v4 collapses the two-table model into a single, observation-centric ClickHouse table. The new table is wide and mostly immutable, which eliminates joins and deduplication at read time.

**The data model shift** is the headline change. Trace-level attributes like `user_id`, `session_id`, `metadata`, and `tags` now propagate automatically to individual observations. This denormalization removes the need to join `traces` and `observations` at query time. The result is that initial table loads for large data sets go from seconds to milliseconds. Dashboard load times for large projects improve by at least 10x for longer time ranges.

**OpenTelemetry as the ingestion backbone.** Roughly 60% of all observations in Langfuse Cloud now arrive via the OpenTelemetry endpoint. Since OpenTelemetry spans are immutable, the system can skip deduplication entirely on the observations table. The proprietary SDK update path that required multiple events has been replaced: `update_current_trace()` and `updateActiveTrace()` are gone. In their place, `propagate_attributes()` automatically pushes trace-level metadata to all child observations.

**New API endpoints** target programmatic access at scale. The Observations API v2 and Metrics API v2 support cursor-based pagination for consistent performance regardless of result set size, selective field retrieval so you request only the data you need, and optimized querying built on the immutable events table with no joins required.

**Faster evaluations.** Observation-level LLM-as-a-judge evaluations now execute in seconds. The previous approach required a ClickHouse query per evaluation. The new architecture eliminates that overhead.

**Reduced S3 costs.** Because observations are immutable under the new model, entire batches can be written as single objects and fetched as single reads. No merging required. This cut S3 costs significantly for both Langfuse Cloud and self-hosted deployments.

## SDK Migration

The update requires SDK upgrades for the best experience. Langfuse Python SDK moves to v4, and the JS/TS SDK moves to v5. The key behavioral change is the shift from explicit trace updates to attribute propagation. Teams running older SDK versions will still see their data in the UI, but new data may be delayed by up to 10 minutes in the v4 preview. Direct OpenTelemetry exporters can opt into the new model by setting the `x-langfuse-ingestion-version: 4` header.

## Self-Hosting and Availability

The v4 preview is currently live on Langfuse Cloud across all regions. A toggle in the UI lets users switch between the old and new experience. Self-hosted and open-source deployments are still pending the migration path. Langfuse has committed to sharing updates through its changelog and a dedicated GitHub Discussion thread.

The core platform remains open source under the MIT license. Self-hosting via Docker or Kubernetes is supported, and the open-source codebase gives teams the option to evaluate the platform without routing production traffic through a third party.

## The Numbers

Langfuse has not published specific performance benchmarks for the v4 release beyond the 10x dashboard improvement claim. The technical blog post documents the architectural reasoning in detail, including the specific ClickHouse patterns that motivated the change. The team reports that the new data model resolves the out-of-memory issues that large projects experienced under the previous architecture.

## Who Should Care

If you are running LLM applications in production and your observability strategy is "hope the model behaves and check costs when the bill arrives," Langfuse is worth evaluating. The open-source license means you can self-host and test without vendor lock-in. The proxy-based and OpenTelemetry-native ingestion means you do not need to rewrite your application to get started.

For teams running agentic workflows with multi-step reasoning chains, the observation-centric model maps naturally to how agents actually work. Each tool call, each LLM invocation, and each decision point becomes an observation with full trace context attached. This is the kind of visibility that turns a black-box agent into something you can debug, optimize, and explain.

The v4 update is a platform bet. Langfuse is betting that observation-level data, denormalized at write time and immutable by design, will scale further than the traditional trace-and-observation split. Early performance numbers support that bet. Whether the architecture holds up as LLM workloads continue to grow at 19x per year is the open question.

