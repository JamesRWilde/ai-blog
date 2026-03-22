---
title: "E2B Sandbox API: Secure Code Execution Infrastructure for AI Agents"
excerpt: "E2B provides isolated cloud sandboxes that let AI agents safely execute code, process data, and run tools at scale — trusted by 88 percent of Fortune 100 companies."
coverImage: "/assets/blog/e2b-dev-cover.png"
date: 2026-03-21T20:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/e2b-dev-cover.png"
---

## TL;DR

E2B is an open-source sandbox-as-a-service platform purpose-built for AI agent developers. It lets you spin up isolated Linux VMs via API, execute AI-generated code safely, and tear them down in seconds. With Python and JavaScript/TypeScript SDKs, OpenAI-compatible tool integration, and pay-per-second pricing starting at $0.000014/s per vCPU, E2B handles the infrastructure side of running untrusted agent code so you do not have to.

---

## What Is E2B?

E2B provides ephemeral, isolated cloud sandboxes designed specifically for AI agents. Think of each sandbox as a temporary, secure Linux virtual machine that your agent can use to run code, process files, call shell commands, or interact with a graphical desktop environment. Sandboxes are created on demand via API, live as long as you need them, and are destroyed when done.

The platform targets three core use cases:

- **Coding agents** that need to execute AI-generated code safely
- **Deep research agents** that process large datasets in isolated environments
- **Computer-use agents** that interact with virtual desktops

E2B has been adopted at scale, reporting 88 percent of Fortune 100 companies as users, over 2 million monthly downloads, and more than 500 million sandboxes started since launch.

---

## The Problem

Building AI agents that can execute code introduces a serious security question: what happens when the model generates something dangerous? Running LLM-produced code on your own infrastructure is a vector for data exfiltration, dependency confusion, and sandbox escapes. Developers have historically cobbled together Docker containers, custom sandboxing logic, and ad hoc cleanup routines to manage this risk.

E2B addresses this with infrastructure purpose-built for agent code execution. Each sandbox is an isolated microVM, not a Docker container, which provides stronger isolation guarantees. The SDK handles session lifecycle, file I/O, package installation, and cleanup automatically, removing the operational overhead that teams otherwise spend weeks building.

---

## Core API and SDK

E2B offers SDKs for Python, JavaScript, and TypeScript. The Python SDK is installed via pip and the JS/TS SDK via npm. Both follow a straightforward pattern: create a sandbox, execute code or commands, and optionally upload or download files.

### Quick Start (Python)

```python
from e2b import Sandbox

sandbox = Sandbox.create()
result = sandbox.commands.run('echo "Hello from E2B!"')
print(result.stdout)
```

### Quick Start (JavaScript)

```javascript
import { Sandbox } from 'e2b'

const sandbox = await Sandbox.create()
const result = await sandbox.commands.run('echo "Hello from E2B!"')
console.log(result.stdout)
```

Both SDKs require an `E2B_API_KEY` environment variable, obtainable from the E2B dashboard after signing up.

### Code Interpreter SDK

Beyond the core SDK, E2B maintains a dedicated `e2b-code-interpreter` package for Jupyter-style code execution. This is the primary integration point for LLM tool use. Here is how it works with the OpenAI SDK:

```python
from openai import OpenAI
from e2b_code_interpreter import Sandbox

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Calculate how many r's are in strawberry"}]
)

code = response.choices[0].message.content
if code:
    with Sandbox() as sandbox:
        execution = sandbox.run_code(code)
        print(execution.text)
```

The same pattern works with Anthropic, Mistral, and any model that supports tool use or code generation.

---

## Key Building Blocks

### Sandbox

A sandbox is an isolated Linux VM created on demand. Each sandbox includes a filesystem, network access, and a shell. Sandboxes can be configured with custom CPU and RAM allocations, support file upload and download, and allow installing third-party packages during the session.

### Templates

Templates define the environment a sandbox starts with. E2B provides base templates, and you can customize them with your own dependencies, pre-installed packages, and configuration. This means your sandbox does not waste time installing the same libraries on every creation.

### Desktop Sandbox

E2B also offers a Desktop Sandbox variant that provides a graphical Linux desktop environment. This is designed for computer-use agents — agents that see, understand, and control a virtual desktop via screenshots and input events. The open-source [Surf](https://github.com/e2b-dev/surf) project demonstrates this with an OpenAI-powered agent navigating a desktop entirely through E2B.

---

## Use Cases

### Reinforcement Learning

E2B supports running tens of thousands of concurrent sandboxes for reinforcement learning workloads. Each sandbox executes a reward function, reports results, and is destroyed. The parallelism and isolation make it suitable for large-scale training evaluation loops.

### CI/CD with GitHub Actions

E2B integrates into GitHub Actions workflows for running tests, validation, and AI-powered code reviews in ephemeral environments. This avoids polluting CI runners with test dependencies and provides a clean state for every run.

### Data Analysis Agents

Connect an LLM to E2B and let it explore datasets in a sandboxed environment. The agent can generate and execute Python code, produce charts and visualizations, and return results — all without risking the host system.

### Vibe Coding

E2B serves as the runtime for AI-generated applications. Projects like [Fragments](https://github.com/e2b-dev/fragments) (with 6,200+ GitHub stars) use E2B sandboxes to preview and run apps generated by LLMs in real time.

---

## Pricing

E2B uses per-second billing based on sandbox configuration:

- **Hobby (Free):** Includes $100 of one-time usage credits, up to 20 concurrent sandboxes, 1-hour max session length, and 10 GiB free storage. Community support.
- **Pro ($150/mo):** Everything in Hobby, plus customizable CPU and RAM, up to 100 concurrent sandboxes, 24-hour max session length, and 20 GiB free storage.
- **Ultimate (Enterprise):** Custom pricing and SLAs. Contact E2B for details.

Per-second vCPU costs range from $0.000014/s (1 vCPU) to $0.000112/s (8 vCPU). Memory is billed at $0.0000045/GiB/s across both plans. There are no idle costs — you only pay while sandboxes are actively running.

---

## Developer Experience

Several things stand out about E2B's developer experience:

- **Open source.** The core SDK (11,400+ GitHub stars), Code Interpreter, Desktop, and cookbook examples are all open source under the Apache 2.0 license.
- **LLM-agnostic.** Works with OpenAI, Anthropic, Mistral, Ollama, and any model that can generate code or use tools.
- **Fast cold starts.** Sandboxes spin up in under a second, which matters for real-time agent workflows.
- **File system access.** Upload and download files to/from the sandbox programmatically, enabling data pipelines that move information between the sandbox and external systems.
- **Package installation.** Install custom packages at runtime via `sandbox.packages.install()` or shell commands.

---

## Limitations

- **Language support.** The Code Interpreter SDK is currently optimized for Python and JavaScript. Other languages work through the shell but lack the structured output integration.
- **Pricing at scale.** At high concurrency, per-second billing adds up quickly. Teams running thousands of concurrent sandboxes should model costs carefully before committing.
- **Enterprise features.** Custom templates, dedicated infrastructure, and SLAs are gated behind the Ultimate tier, which requires contacting sales.

---

## Bottom Line

E2B occupies a specific niche in the AI infrastructure stack: secure, ephemeral code execution for agents. It does not try to be an LLM provider, a vector database, or a model gateway. It solves one problem well and provides clean SDKs to integrate with whatever LLM or agent framework you are already using. For teams building coding agents, research agents, or computer-use agents, E2B eliminates a significant chunk of infrastructure work that would otherwise sit between "our agent generates code" and "our agent can safely run it."
