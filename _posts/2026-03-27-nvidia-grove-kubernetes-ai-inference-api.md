---
title: "NVIDIA Grove: The Open-Source Kubernetes API That Orchestrates AI Inference at Scale"
excerpt: "NVIDIA's open-source Grove API replaces dozens of YAML files and manual scripts with a single declarative Kubernetes custom resource for orchestrating complex, multi-node AI inference workloads."
coverImage: "/assets/blog/nvidia-grove-cover.jpg"
date: 2026-03-27T10:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/nvidia-grove-cover.jpg"
---

## TL;DR

NVIDIA Grove is an open-source Kubernetes API purpose-built for orchestrating AI inference workloads. Instead of stitching together dozens of YAML manifests, custom controllers, and scheduling hacks to deploy disaggregated serving systems (prefill, decode, routing), Grove lets you describe the entire stack as a single Custom Resource. It handles hierarchical gang scheduling, topology-aware GPU placement, multi-level autoscaling, and startup ordering out of the box. It works as part of NVIDIA Dynamo or standalone.

## The Problem

Running AI inference in production has gotten complicated. A few years ago, deploying a model meant spinning up a pod and calling it a day. Now, modern inference systems are multi-component architectures: separate prefill workers, decode leaders, KV-cache routers, vision encoders, and often entire agentic pipelines where multiple model instances collaborate.

Kubernetes was not built for this. Its native scaling unit is a single pod. It has no concept of gang scheduling where 8 pods must all start together or none of them are useful. It has no way to express "start the workers first, then the leader." It does not understand that placing prefill and decode pods on the same NVLink domain dramatically cuts KV-cache transfer latency.

The result? Teams cobble together custom operators, Helm charts layered on Helm charts, dozens of YAML files, and brittle scripts to make it work. Scaling is manual. Recovery from partial failures is a headache. Rolling updates break topology.

Grove exists to kill all of that.

---

## What NVIDIA Grove Actually Does

Grove introduces a small set of Kubernetes Custom Resource Definitions (CRDs) that let you describe a full inference system declaratively. Three core primitives do the heavy lifting:

**PodCliques** represent groups of pods with a specific role. A prefill leader is one clique. Its workers are another. A frontend service is a third. Each clique has independent configuration and scaling logic.

**PodCliqueScalingGroups** bundle tightly coupled cliques that must scale together. The prefill leader and its workers, for instance, scale as a unit. You cannot accidentally scale one without the other.

**PodCliqueSets** are the top-level object. This is where you define the entire workload, including startup order, scaling policies, and gang-scheduling constraints. One PodCliqueSet replaces what used to require a small army of custom resources and scripts.

When you create a PodCliqueSet, the Grove operator automatically generates all the underlying Kubernetes resources, creates PodGang scheduling constraints, and tells the scheduler to enforce them. The scheduler (Grove works with NVIDIA's open-source KAI Scheduler) then ensures all components either schedule together or not at all, with network topology awareness baked in.

## Why This Matters for AI Inference

### Hierarchical Gang Scheduling

Traditional gang scheduling is binary: all pods start or none do. Grove adds hierarchy. You can guarantee that at least one prefill worker and one decode worker are always scheduled (forming a functional pipeline), while allowing either side to scale independently beyond that minimum. This matters because prefill and decode have fundamentally different compute profiles and often need to scale at different ratios.

### Topology-Aware Placement

On hardware like NVIDIA GB200 NVL72, where NVLink domains connect groups of GPUs at massive bandwidth, placement matters enormously. Grove places related components (prefill leader + workers) within the same NVLink domain to minimize communication latency, while simultaneously spreading full replicas across the cluster for availability.

### Multi-Level Autoscaling

Grove supports autoscaling at three levels: individual components (more prefill workers when traffic spikes), component groups (scaling leaders and workers together), and entire service replicas (adding full pipeline copies for capacity). These levels are interdependent, and Grove manages the relationships. If scaling prefill workers triggers a need for more decode capacity, the system handles it.

### Startup Ordering

MPI-based workloads need workers ready before the leader starts. Routing components need backends live before they can forward requests. Grove lets you specify explicit startup ordering within a PodCliqueSet, eliminating race conditions and startup failures.

### System-Level Recovery and Rolling Updates

When a prefill worker crashes, Grove understands that it needs to reconnect to its leader after restart, not just restart in isolation. Rolling updates preserve network topology and component relationships, so you do not break inference performance while deploying new versions.

---

## Getting Started

Grove installs via Helm charts onto any Kubernetes cluster. It requires the Grove operator and a compatible scheduler (KAI Scheduler is the reference implementation).

```bash
# Quick local setup with kind
cd operator && make kind-up
make deploy

# Deploy your first inference workload
kubectl apply -f samples/simple/simple1.yaml

# Verify
kubectl get pcs,pclq,pcsg,pg,pod -o wide
```

A local kind cluster gets you from zero to running disaggregated inference in about five minutes.

## Where Grove Fits in the NVIDIA Stack

Grove is a modular component of NVIDIA Dynamo, the open-source inference operating system for AI factories. Dynamo handles the runtime layer (TensorRT-LLM integration, disaggregated serving logic, KV-cache management). Grove handles the orchestration layer (scheduling, scaling, placement, lifecycle). Together, they provide a full stack from inference framework to cluster management.

Grove also works standalone. If you are running your own inference framework and just need better Kubernetes orchestration for multi-component workloads, you can use Grove independently.

---

## Who Should Care

If you are running LLM inference at any meaningful scale on Kubernetes, Grove is relevant. Specifically:

- Teams deploying disaggregated serving (separate prefill/decode) for throughput optimization
- Operators managing multi-node model serving for large models like DeepSeek-R1 or Llama-4-Maverick
- Anyone building agentic pipelines where multiple model instances need coordinated scaling
- Platform engineers tired of maintaining custom operators for inference workload orchestration

If you are running a single model on a single GPU and scaling replicas linearly, Kubernetes native tooling is probably fine. Grove's value proposition kicks in when your inference architecture has multiple moving parts that need to move together.

## The Open Source Angle

Grove is fully open source under Apache 2.0. The code lives at `ai-dynamo/grove` on GitHub. NVIDIA has set up a Discord server and a mailing list for community engagement. The project welcomes contributions, and the architecture is designed to be framework-agnostic, meaning it does not force you into Dynamo or any other specific inference stack.

---

## Bottom Line

NVIDIA Grove is a focused tool for a specific, growing pain: orchestrating complex AI inference workloads on Kubernetes without drowning in YAML and custom scripting. It does not try to be everything. It does scheduling, scaling, topology awareness, and lifecycle management for multi-component inference systems, and it does it through a clean set of CRDs that sit naturally in the Kubernetes ecosystem.

The fact that it is open source and framework-agnostic means it could become a standard piece of infrastructure for anyone running serious inference at scale. Worth watching, and worth trying if multi-node inference is currently causing you headaches.
