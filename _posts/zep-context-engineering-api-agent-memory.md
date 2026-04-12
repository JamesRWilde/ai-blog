---
title: "Zep: The Context Engineering API That Gives AI Agents Real Memory"
excerpt: "Zep builds a unified context graph from chat history, business data, and user interactions, delivering sub-200ms context retrieval for AI agents across any framework."
coverImage: "/assets/blog/zep-cover.png"
date: 2026-03-16T20:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/zep-cover.png"
---

## TL;DR

Zep is a context engineering platform that gives AI agents persistent, evolving memory by building a unified context graph from chat history, business data, and user interactions. Three lines of code to integrate, sub-200ms retrieval, and works with any agent framework.

## The Problem

Most AI agents are effectively amnesiacs. They operate within a single conversation window, losing all context the moment a session ends. When you bring them back, they start from scratch, no memory of who the user is, what they care about, or what happened last Tuesday.

Developers trying to fix this typically fall into one of three traps. Chat memory solutions store conversation transcripts but remain blind to business data, app events, and behavioral signals. Static RAG pipelines retrieve chunks from a vector store but the data is stale and doesn't reflect real-time changes. Tool calling lets the LLM reach out for context on demand, but the model often guesses wrong about when to call and what to retrieve, adding unpredictable latency.

The fundamental issue is that context lives in silos. CRM data in one system, chat logs in another, app events in a third. Your agent sees fragments instead of the full picture.

## Enter Zep

Zep approaches this as a context engineering problem rather than a memory problem. The platform ingests data from multiple sources, chat messages, JSON business data, documents, user interactions, and builds what they call a unified context graph. This graph evolves continuously, extracting entities and relationships automatically, and critically, invalidating facts when they change.

The pipeline is straightforward. Data flows in through a simple API. Zep extracts entities, relationships, and facts, populating a temporal graph that tracks how information changes over time. When an agent needs context, Zep retrieves what's relevant and formats it for the LLM, optimized for token efficiency.

## Three Lines of Code

The integration story is deliberately minimal. Here's what it looks like in practice:

```python
response = client.thread.add_messages(
    thread_id=thread_id,
    messages=messages,
    return_context=True
)
print(response.context)
```

The returned context isn't raw text chunks. It's a structured summary that includes user profiles, relevant facts with validity date ranges, and entities ranked by relevance. The example from their docs shows a user profile with facts like "Account Emily0e62 has a suspended status due to payment failure" tracked with temporal bounds, so agents can reason about what was true then versus what is true now.

## Graph RAG Under the Hood

Zep builds on what they call Graph RAG, a knowledge graph approach to retrieval rather than simple vector similarity search. The graph structure lets the system understand relationships between entities, not just semantic similarity between text chunks.

This matters for agent reliability. When a user says "I used to love Adidas but now I'm switching to Nike," a vector store might retrieve both statements as equally relevant. Zep's temporal graph tracks that the Adidas preference is superseded by the Nike preference, so the agent gets the current picture rather than contradictory fragments.

## Beyond Chat Memory

What separates Zep from chat memory products is its appetite for non-conversational data. The platform ingests from three broad categories: chat history, business data (CRM records, transaction logs, support tickets), and user interactions (app events, behavioral signals). All of these feed into the same graph.

This means an agent handling a support request doesn't just see the conversation. It sees the user's account status, recent transactions, past issues, and behavioral patterns, all assembled into a context block optimized for LLM consumption.

## Performance and Pricing

Zep claims P95 retrieval latency under 200ms, which is fast enough for real-time voice and video agents, not just text-based chat. They cite the LoCoMo benchmark to back accuracy claims.

Pricing is credit-based. The Flex plan starts at $25/month for 20,000 credits, with Flex Plus at $475/month for 300,000 credits. Free tier gets 1,000 credits monthly. Enterprise options include managed cloud, bring-your-own-key, bring-your-own-model, and bring-your-own-cloud deployments, with SOC 2 Type II and HIPAA BAA compliance.

## Who's Using It

Zep lists customers including WebMD, Swiggy, and AWS among others. The use cases span healthcare (where conversational context and compliance matter), customer support (where agents need to know account history), and any application where AI agents interact with the same users repeatedly.

## The Landscape

Zep sits in an emerging category between pure chat memory (Mem0, typical conversation storage) and full agent frameworks (LangGraph, CrewAI). It doesn't try to be an agent orchestrator. It's infrastructure for agent context, designed to work alongside whatever framework a developer already uses.

This positioning is smart. The agent framework market is fragmented and fast-moving, but every framework needs reliable context. By being framework-agnostic, Zep avoids the churn of picking winners while still delivering core value.

## Open Questions

A few things worth watching. The credit pricing model with auto-topup at 20% threshold could surprise teams with spiky usage patterns, though rollover for 60 days softens this. The quality of entity extraction depends heavily on their underlying models, and the docs are thin on how well this works across domains beyond customer support. And while the graph approach is more sophisticated than vector search, it also means more infrastructure to reason about when debugging context quality.

The broader question is whether "context engineering" becomes its own discipline the way prompt engineering did. Zep is betting that assembling the right context at the right time is the bottleneck for agent reliability, not model quality. Given how many agent failures trace back to missing or stale information, that bet looks reasonable.
