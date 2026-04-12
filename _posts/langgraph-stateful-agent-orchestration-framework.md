---
title: "LangGraph: The Stateful Agent Orchestration Framework"
excerpt: "LangGraph is a low-level orchestration framework and runtime for building, managing, and deploying long-running, stateful AI agents. Here is how it works and why teams like Klarna, Replit, and Elastic use it in production."
coverImage: "/assets/blog/langgraph-cover.png"
date: 2026-03-22T00:30:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/langgraph-cover.png"
---

## TL;DR

LangGraph is LangChain's open-source orchestration framework for building stateful AI agents as graphs. It gives developers low-level control over agent workflows with durable execution, human-in-the-loop interrupts, comprehensive memory, and production-ready deployment. It is framework-agnostic, works with any model provider, and can deploy on LangSmith Cloud, hybrid, or fully self-hosted.

## The Problem

Most agent frameworks abstract away too much. They handle simple chat loops fine, but the moment you need an agent that runs for hours, recovers from failures, pauses for human approval, or coordinates multiple sub-agents, those high-level wrappers collapse. Developers end up fighting the framework instead of building their application.

The specific gaps that LangGraph targets:

- **No durable execution** -- agents die on failure with no way to resume from where they left off
- **No human-in-the-loop** -- no clean mechanism to pause an agent mid-execution, let a human review or modify state, then continue
- **No real memory** -- agents are stateless between sessions, making long-running workflows impossible
- **No production deployment story** -- local prototyping works, but scaling stateful agents to production requires rebuilding half the stack

LangGraph was built to fill these gaps. It does not try to be a model router or a prompt library. It is laser-focused on agent orchestration.

## What LangGraph Does

### Graph-Based Agent Design

At its core, LangGraph models agents as state machines. You define a graph of nodes (functions that process state) and edges (conditions that route between nodes), then compile it into a runnable application. This is not a metaphor -- it draws from distributed computing frameworks like Pregel and Apache Beam, and its public API is inspired by NetworkX.

The graph abstraction gives you explicit control over agent behavior. You can define branching logic, loops, conditional routing, and parallel execution paths without working around a framework's assumptions about what an "agent" should look like.

A basic example looks like this:

```python
from langgraph.graph import StateGraph, MessagesState, START, END

def agent(state: MessagesState):
    # Your agent logic here
    return {"messages": [model.invoke(state["messages"])]}

graph = StateGraph(MessagesState)
graph.add_node("agent", agent)
graph.add_edge(START, "agent")
graph.add_edge("agent", END)
graph = graph.compile()
```

You do not have to use LangChain components. The framework works with any model provider and any tool definitions.

### Durable Execution

This is LangGraph's most important feature for production use. Agents built with LangGraph automatically persist their state at every step. If an agent crashes halfway through a 45-minute research task, it picks up exactly where it left off when restarted. No custom checkpointing logic, no state serialization headaches.

The durability works at the graph level. Every node execution is checkpointed, and the framework handles resuming from the correct checkpoint automatically. This is what makes long-running workflows viable.

### Human-in-the-Loop Interrupts

LangGraph lets you insert interrupt points into your agent graph. When execution hits an interrupt, it pauses, persists its current state, and waits for human input. The human can inspect the agent's current state, modify it if needed, then approve continuation.

This is critical for high-stakes workflows like financial transactions, content approval, or medical information where you need a human checkpoint before the agent takes an irreversible action.

The interrupt mechanism is not bolted on. It is a first-class primitive in the graph execution model, meaning you get full state persistence and resumption around interrupt points just like any other execution step.

### Comprehensive Memory

LangGraph separates two kinds of memory:

- **Short-term memory** -- working state within a single session, managed via the graph's state object and checkpointing
- **Long-term memory** -- persistent data across sessions, stored in configurable memory stores that can back to databases

Both are configurable. You control what gets stored, how long it persists, and what TTL policies apply. The framework provides semantic search over stored memories, so agents can retrieve relevant past context without loading everything into the prompt.

### Agent Composition

Deployed LangGraph agents can call other deployed agents using the same interface they use for local calls. A research agent can delegate to a search agent running on a different deployment, and the calling agent does not need to know whether the target is local or remote. LangGraph calls this `RemoteGraph`.

Native MCP and A2A protocol support means your agents can interoperate with the broader ecosystem of tools and agent platforms without custom integration code.

## Deployment Options

LangGraph offers three deployment paths, all running on the same runtime:

**Cloud** -- Fully managed by LangChain. Push from a git repo or deploy via the CLI. Requires a LangSmith Plus plan ($39/seat/month) or above.

**Hybrid** -- Runs in your cloud infrastructure with LangChain managing the control plane. Your data stays in your VPC.

**Self-hosted** -- Fully self-managed. You run the entire stack.

Pricing for the deployment layer breaks down into two components: uptime cost (per minute, varying by development vs production deployment) and deployment runs (per invocation). The open-source framework itself is free via `pip install -U langgraph`.

LangGraph Studio provides a visual interface for debugging and prototyping agents. You can connect it to any running Agent Server (local or deployed), inspect state at any checkpoint, step through runs, and modify state mid-execution.

## The Ecosystem

LangGraph is part of the broader LangChain ecosystem but can be used standalone:

- **LangSmith** adds observability, evaluation, and the deployment platform
- **LangChain** provides model integrations and composable components that work with LangGraph but are not required
- **LangChain Academy** offers free structured courses on building with LangGraph

The framework is MIT-licensed and available on PyPI. Community support runs through the LangChain Forum.

## Who Uses It

LangGraph's production user list includes Klarna, Replit, Elastic, LinkedIn, Uber, Home Depot, Workday, Coinbase, and others. Elastic's principal engineer Garrett Spong described it as setting "the foundation for how we can build and scale AI workloads."

The pattern these teams share: they need agents that run reliably for extended periods, handle complex branching logic, and can be debugged and iterated on without losing production visibility.

## What It Does Not Do

LangGraph is intentionally low-level. It does not provide:

- Pre-built agent templates or copilots out of the box (though LangChain's `create_agent` builds on top of it)
- Model routing or provider optimization
- Built-in prompt management (pair with LangSmith for that)

If you want a drop-in "chat with your docs" solution, LangGraph is the wrong starting point. If you need fine-grained control over complex agent behavior and want to own your architecture, it is one of the better options available.

## Bottom Line

LangGraph is the infrastructure layer for teams building serious AI agents. It is not flashy, and it requires you to think in graphs rather than chat loops. But for production agent workloads that need durability, human oversight, and scalable deployment, it fills a gap that higher-level frameworks do not address. The open-source foundation means you can start free and move to managed deployment when you are ready.
