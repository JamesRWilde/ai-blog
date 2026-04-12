---
title: "Seldon Core 2 API: The Open-Source MLOps Framework for Production AI at Scale"
excerpt: "Seldon Core 2 is a Kubernetes-native MLOps and LLMOps framework that deploys, manages, and scales AI models in production with data-centric pipelines, multi-model serving, and an LLM Module for GenAI applications."
coverImage: "/assets/blog/seldon-core-2-api.png"
date: 2026-03-27T07:15:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/seldon-core-2-api.png"
---

## TL;DR

Seldon Core 2 is an open-source Kubernetes framework for deploying, monitoring, and scaling ML and LLM workloads in production. It offers a modular, data-centric architecture with an Open Inference Protocol (OIP), composable pipelines via Kafka streaming, multi-model serving with memory overcommit, A/B testing through experiments, and a dedicated LLM Module that supports vLLM, DeepSpeed, and HuggingFace Transformers backends alongside hosted APIs like OpenAI and Gemini. It runs on any Kubernetes cluster, on-prem or in the cloud.

---

## The Problem

Deploying a single machine learning model to production is already hard. Deploying hundreds of them, each with different frameworks, resource profiles, monitoring needs, and traffic patterns, is where most teams hit a wall. The typical setup looks like a patchwork of custom FastAPI wrappers, bespoke Kubernetes manifests, manual autoscaling rules, and duct-taped monitoring dashboards that break the moment someone changes a model version.

LLMs made this worse. Now you are not just serving a scikit-learn classifier. You are orchestrating retrieval pipelines, prompt templates, conversational memory, vector database lookups, and multiple foundation models behind a single endpoint. The tooling for this is fragmented. Some teams cobble together LangChain for orchestration, vLLM for serving, Prometheus for metrics, and custom routing logic for A/B tests. It works, barely, until it does not.

Seldon Core 2 attacks this problem directly. Instead of assembling your own inference infrastructure from 12 different open-source projects, you get one framework that handles model serving, pipeline orchestration, traffic routing, autoscaling, monitoring, and data logging as first-class features.

## What Seldon Core 2 Actually Is

At its core, Seldon Core 2 is a Kubernetes operator that manages the full lifecycle of ML and LLM inference. You define what you want in YAML. The operator makes it happen.

The architecture revolves around three primitives:

**Servers** are compute backends that load and run models. A single server can host multiple models, sharing GPU memory to reduce costs. Seldon supports dedicated runtimes for TensorFlow Serving, TorchServe, MLflow, XGBoost, and the LLM Module's backends (vLLM, DeepSpeed, HuggingFace Transformers).

**Models** are the individual deployed artifacts. Each model runs inside a server and exposes the Open Inference Protocol, a standardized gRPC/REST interface that covers health checks, metadata queries, and inference requests. This means every model, regardless of its underlying framework, presents the same API surface.

**Pipelines** chain models and components together into composable data flows. A typical RAG pipeline might route a user query through a retrieval component, concatenate the retrieved context with the prompt, send it to an LLM, and post-process the output. All of this is defined declaratively and backed by Kafka for real-time streaming between stages.

## The LLM Module: GenAI Gets First-Class Treatment

The LLM Module is Seldon's answer to the GenAI deployment gap. It provides five components that cover the full lifecycle of LLM-based applications:

**API Runtime** wraps hosted models from providers like OpenAI and Gemini behind a unified interface. This is useful when you want to mix self-hosted and hosted models in the same pipeline without changing your client code.

**Local Runtime** deploys foundation models on your own infrastructure. It supports three backends:

| Backend | Strengths |
| --- | --- |
| **vLLM** | PagedAttention for memory efficiency, continuous batching, AWQ/GPTQ quantization, tensor parallelism across multiple GPUs |
| **DeepSpeed** | ZeRO optimization, multi-GPU serving, integration with the broader DeepSpeed ecosystem |
| **HuggingFace Transformers** | Broadest model coverage, simplest configuration, good for prototyping |

You configure everything through a `model-settings.json` file. Switching from vLLM to DeepSpeed is a config change, not a rewrite.

**Prompt Templates** decouple prompt logic from model deployment. You define templates using plain text or Jinja2, and the same underlying model can serve different prompt strategies without redeployment. This is a surprisingly practical feature for teams iterating on prompt engineering while running production traffic.

**Conversational Memory** stores and retrieves chat history within an application. It integrates directly into the pipeline, so your LLM endpoint does not need to manage session state externally.

**Retrieval** connects to vector databases and retrieves context given an embedding vector. This completes the RAG pattern without requiring a separate retrieval service.

## Open Inference Protocol: One API for Every Model

Seldon's Open Inference Protocol (OIP) deserves attention because it solves a real operational headache. In most production setups, every model type gets its own API shape. A TensorFlow model accepts different input formats than a PyTorch model, which differs from an XGBoost model. Your client code has to know what it is talking to.

OIP standardizes this into three endpoints:

- **Health API** - readiness and liveness checks
- **Metadata API** - model name, version, input/output schema
- **Inference API** - standardized request/response format for predictions

The protocol is transport-agnostic, supporting both REST/HTTP and gRPC. This means your monitoring, routing, and client code can treat every model identically, regardless of the framework underneath.

## Data-Centric Pipelines with Kafka

The shift to data-centric MLOps is Seldon's most interesting architectural bet. Instead of treating the model as the center of the universe, they treat the data flow as primary. Models become components in a larger data pipeline.

Pipelines are defined as directed acyclic graphs (DAGs) of components. Each component can be a model, a data transformer, a router, or a custom function. Kafka sits underneath, providing real-time streaming between stages. This means your inference pipeline is not just a request-response call chain. It is a streaming data system that can fan out, aggregate, and transform data as it flows through.

The practical implications:

- **A/B testing** is a pipeline routing decision, not a custom proxy layer
- **Shadow deployments** send traffic to candidate models without affecting responses
- **Data logging** captures inputs and outputs automatically for monitoring and retraining
- **Multi-model serving** consolidates models onto shared servers to reduce GPU costs

## Autoscaling and Memory Overcommit

Seldon provides autoscaling at two levels: model-level and pipeline-level. Model autoscaling adjusts the number of replicas based on inference load. Pipeline autoscaling adjusts the resources allocated to each component in a pipeline.

The memory overcommit feature is particularly interesting for teams with many models. It allows you to deploy more models than your cluster has memory for, loading and unloading models on demand. Models that are not receiving traffic get evicted from GPU memory and reloaded when needed. This is essentially a memory paging system for ML models, and it can cut infrastructure costs significantly for teams serving dozens or hundreds of models with uneven traffic patterns.

## Pricing and Deployment

Seldon Core 2 is open-source under the Business Source License. The core framework is free to use. Seldon offers commercial support and an enterprise platform (Seldon Core Platform) for organizations that need managed deployment, advanced monitoring dashboards, and enterprise-grade SLAs.

For self-hosted deployment, you need:

- A Kubernetes cluster (1.22+)
- kubectl access
- Helm 3 for installation
- Optional: NVIDIA GPU operators for GPU-accelerated models

The installation is straightforward:

```bash
helm install seldon-core seldon-charts/seldon-core \
  --namespace seldon-system --create-namespace
```

From there, deploying a model is a YAML definition pointing to a server runtime and a model artifact.

## When to Use Seldon vs. Alternatives

Seldon sits in a specific niche. It is not a serverless inference platform like Replicate or Modal. It is not a managed LLM API like OpenAI. It is a self-hosted framework for teams that need production-grade control over their inference infrastructure.

**Use Seldon when:**

- You are running on Kubernetes and need to manage multiple models in production
- You need multi-model serving with cost optimization features like overcommit
- You want standardized inference APIs across different model frameworks
- You need built-in A/B testing, shadow deployments, and experiment management
- Your LLM applications require RAG pipelines, prompt templating, and memory management

**Consider alternatives when:**

- You need a fully managed service without Kubernetes (try Replicate, Modal, or Fireworks AI)
- You only need to serve a single model type (a dedicated server like vLLM or TGI is simpler)
- You want a managed LLM API without self-hosting (try OpenAI, Anthropic, or Cohere APIs)

## Bottom Line

Seldon Core 2 is for teams that have moved past the "let's just call OpenAI" phase and need to run their own inference infrastructure at scale. The Kubernetes-native approach means a steeper learning curve than a simple API wrapper, but the payoff is a standardized, observable, and cost-efficient system for managing hundreds of models in production. The LLM Module closes the gap for GenAI workloads, and the data-centric pipeline architecture built on Kafka gives it an edge over simpler model-serving frameworks that treat inference as a stateless request-response problem.

---

## Key Features

- **Open Inference Protocol** for standardized model APIs across all frameworks
- **LLM Module** with vLLM, DeepSpeed, and HuggingFace Transformers backends
- **Composable pipelines** backed by Kafka for real-time data streaming
- **Multi-model serving** with memory overcommit for GPU cost optimization
- **A/B testing and experiments** with traffic routing and shadow deployments
- **Autoscaling** at both model and pipeline levels
- **Conversational memory and RAG** components for LLM application patterns

## Links

- **GitHub:** https://github.com/SeldonIO/seldon-core
- **Documentation:** https://docs.seldon.ai/seldon-core-2
- **LLM Module Docs:** https://docs.seldon.ai/llm-module
- **Seldon Website:** https://www.seldon.io
