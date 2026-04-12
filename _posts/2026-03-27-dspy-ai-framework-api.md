---
title: "DSPy API: Stanford's Framework for Programming Language Models Instead of Prompting Them"
excerpt: "DSPy replaces brittle prompt engineering with composable Python modules and automatic optimization. Here's how this Stanford-born framework works and why it matters for production AI systems."
coverImage: "/assets/blog/dspy-cover.png"
date: 2026-03-27T03:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/dspy-cover.png"
---

## TL;DR

DSPy (Declarative Self-improving Python) is an open-source framework from Stanford NLP that treats LLM interactions as programmable modules rather than hand-tuned prompt strings. Instead of writing prompts, you define signatures (input-output contracts) and modules (reusable LM call patterns), then let DSPy's optimizers automatically compile those into effective prompts and weights. It has surpassed 31 million PyPI downloads and supports every major LLM provider through a unified API.

## The Problem

Most LLM applications today are built on a shaky foundation: hand-crafted prompt strings. A typical RAG pipeline might involve five or six separately maintained prompts across retrieval, generation, and self-reflection stages. Change the underlying model, and those prompts break. Change the task slightly, and the entire prompt engineering cycle starts over. For production teams managing dozens of LLM-powered features, this approach does not scale.

Prompt engineering is, fundamentally, string manipulation with high stakes. There is no type checking, no composability, and no automatic way to know if a prompt change actually improves output quality. Teams end up maintaining fragile prompt libraries that work with one model but not another, or work on their test set but degrade on real data.

## What DSPy Does

DSPy reframes the entire workflow. Instead of crafting prompts, you write three things:

**Signatures** define what your LM call should do, in terms of inputs and outputs. A signature like `"question -> answer"` or `"context, question -> grounded_answer"` tells DSPy the contract, not the implementation. You specify the task declaratively and let DSPy handle how to phrase it for the model.

**Modules** are reusable building blocks that implement specific LM invocation strategies. `dspy.Predict` does a straightforward call. `dspy.ChainOfThought` adds reasoning steps. `dspy.ReAct` enables tool use and agent loops. Each module takes a signature and expands it into the actual prompt sent to the model.

**Optimizers** are the genuinely novel piece. Given a small set of training examples and a metric, DSPy's teleprompters (like BootstrapFewShot, COPRO, and the newer GEPA) automatically search for the best prompts, few-shot examples, and even fine-tuned weights for your pipeline. This is not theoretical. The framework routinely demonstrates 10 to 30 percent accuracy improvements over hand-written prompts on benchmarks like HotpotQA and MMLU.

## How It Works in Practice

Setting up a basic DSPy program takes a few lines:

```python
import dspy

lm = dspy.LM("openai/gpt-5-mini", api_key="YOUR_KEY")
dspy.configure(lm=lm)

math = dspy.ChainOfThought("question -> answer: float")
result = math(question="Two dice are tossed. What is the probability that the sum equals two?")
```

That `ChainOfThought` module automatically generates a reasoning chain before producing the answer. But the key is what happens next. You can compile it:

```python
from dspy.teleprompt import BootstrapFewShot

optimizer = BootstrapFewShot(metric=my_accuracy_metric)
optimized_math = optimizer.compile(math, trainset=train_examples)
```

The optimizer runs your program against training data, evaluates outputs with your metric, and searches for the prompt configuration that maximizes performance. What you get back is a compiled program that has been auto-tuned for your specific task and data.

## Model and Provider Support

DSPy is model-agnostic. It supports OpenAI (GPT-5 and earlier), Anthropic Claude, Google Gemini, Databricks endpoints, Ollama for local models, SGLang servers, and anything OpenAI-compatible via a custom base URL. The `dspy.LM` class wraps [LiteLLM's provider list](https://docs.litellm.ai/docs/providers), so any backend LiteLLM supports works out of the box.

For local inference, you can point DSPy at an Ollama or SGLang server running open-weight models like Llama or Qwen. This makes it viable for privacy-sensitive deployments where data cannot leave your infrastructure.

## Key Capabilities

**RAG pipelines** are DSPy's most documented use case. The framework provides a `dspy.Retrieve` module for search, composable with `ChainOfThought` or `ReAct` for generation. Multi-hop retrieval (where the answer to one search informs the next) is first-class.

**Agents** are built with `dspy.ReAct`, which supports tool calling, iterative reasoning, and memory. DSPy agents can use MCP (Model Context Protocol) tools, giving them access to a growing ecosystem of external capabilities.

**GEPA optimizer** is the newest addition, offering reflective prompt evolution. Rather than just trying different prompt variants, GEPA reflects on why certain prompts fail and iterates toward better ones. Early results on AIME math problems and enterprise extraction tasks show meaningful gains over previous optimizers.

**Structured output** is handled through adapters. DSPy includes ChatAdapter, JSONAdapter, XMLAdapter, and TwoStepAdapter, each parsing model output into typed Python objects based on your signature definitions.

## Pricing and Availability

DSPy is fully open-source under the MIT license. There is no platform fee, no hosted service, and no vendor lock-in. You pay only for the underlying LLM API calls through whichever provider you choose. The project is maintained by Stanford NLP and a growing community of contributors, with active development ongoing (the framework is currently on the path to a v1.0 release).

## Who Should Use It

DSPy makes the most sense for teams building compound AI systems, multi-step pipelines, or any application where the quality of prompts directly affects product metrics. If you are managing more than a handful of LLM calls across a codebase and spending significant time on prompt tuning, DSPy offers a systematic alternative.

It is less relevant for simple single-call use cases where a straightforward API call to an LLM provider suffices. The framework's value compounds with pipeline complexity.

## Bottom Line

DSPy is not another LLM wrapper. It is a compiler for AI programs that treats prompts as something to be optimized, not manually authored. Born from Stanford research, battle-tested across thousands of production pipelines, and freely available under MIT, it represents a genuine paradigm shift from prompt engineering to prompt programming. For teams serious about building reliable, model-portable AI systems, it deserves a hard look.

## Sources

- [DSPy Documentation](https://dspy.ai/)
- [GitHub Repository](https://github.com/stanfordnlp/dspy)
- [PyPI Statistics](https://pepy.tech/projects/dspy)
- [DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines (ICLR 2024)](https://arxiv.org/abs/2310.03714)
- [Demonstrate-Search-Predict: Composing Retrieval and Language Models for Knowledge-Intensive NLP (2022)](https://arxiv.org/abs/2212.14024)
