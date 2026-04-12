---
title: "Instructor: The Python Library That Makes LLM Outputs Actually Usable"
excerpt: "Instructor wraps any LLM provider with Pydantic-powered structured extraction, automatic retries, and streaming. 3M+ monthly downloads and growing."
coverImage: "/assets/blog/instructor-ai-api-cover.png"
date: 2026-04-02T03:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/instructor-ai-api-cover.png"
---

## TL;DR

Instructor is an open-source library that extracts structured, validated data from any LLM using Pydantic models. Instead of parsing raw JSON and handling retries yourself, you define a Python class and get typed objects back. It supports 15+ LLM providers through a unified interface, streams partial results, and retries automatically when validation fails. Over 100,000 developers use it, with 3 million monthly PyPI downloads and 11,000+ GitHub stars.

## The Problem

Getting structured output from an LLM is deceptively simple in theory and miserable in practice. You prompt the model to return JSON, it gives you something almost-but-not-quite valid. A missing field here, a string where you expected an integer there. Your parsing code grows nested try-except blocks. Your error handling becomes a second application.

Most developers solve this by writing custom JSON schemas, adding validation layers, and implementing retry logic that looks different in every project. The [OpenAI structured outputs](https://platform.open/docs/guides/structured-outputs) feature helps, but it only works with OpenAI models and has quirks around schema nesting. If you need to switch providers, extract complex nested objects, or handle validation failures gracefully, you are back to writing glue code.

## What Instructor Does

Instructor flips the model. Instead of prompting LLMs to produce JSON and then parsing the result, you define a Pydantic model describing the data you want, and Instructor handles the rest. It constructs the schema, sends it to the LLM, validates the response, retries if validation fails, and returns a properly typed Python object.

A basic extraction looks like this:

```python
import instructor
from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int
    occupation: str

client = instructor.from_provider("openai/gpt-4o-mini")

user = client.chat.completions.create(
    response_model=User,
    messages=[{"role": "user", "content": "John is a 30-year-old software engineer"}],
)

print(user)  # User(name='John', age=30, occupation='software engineer')
```

No JSON parsing. No manual validation. No retry logic. The `user` object is a real Pydantic model with full IDE autocompletion and type checking.

## How It Works Under the Hood

Instructor uses the LLM's function-calling or tool-casing capability (depending on the provider) to constrain the output format. When you pass a Pydantic model as `response_model`, Instructor:

1. Converts your model into a JSON schema
2. Sends that schema to the LLM as a tool/function definition
3. Receives the LLM's response and attempts to parse it into your model
4. If validation fails, it sends the error back to the LLM and asks for a correction
5. Returns the validated, typed object

The retry mechanism is the part that makes this genuinely useful in production. LLMs are probabilistic. Even with structured output modes, they occasionally produce invalid data. Instructor catches these failures and retries, typically succeeding on the second or third attempt without any developer intervention.

## Multi-Provider Support

One of Instructor's strongest selling points is its provider abstraction. The same code works with different LLM providers by changing a single string:

```python
# OpenAI
client = instructor.from_provider("openai/gpt-4o")

# Anthropic
client = instructor.from_provider("anthropic/claude-3-5-sonnet")

# Google
client = instructor.from_provider("google/gemini-pro")

# Ollama (local)
client = instructor.from_provider("ollama/llama3.2")

# Groq
client = instructor.from_provider("groq/llama-3.1-8b-instant")
```

Every provider uses the same `client.chat.completions.create()` interface. This means you can A/B test models, switch providers for cost optimization, or run local models for development without rewriting your extraction logic.

Supported providers include OpenAI, Anthropic, Google, Mistral, Cohere, Groq, Ollama, DeepSeek, and others. API keys can be passed directly or read from environment variables.

## Features Beyond Basic Extraction

### Streaming Partial Objects

For long extractions or real-time UIs, Instructor supports streaming. You get progressively more complete objects as the model generates tokens:

```python
from instructor import Partial

for partial_user in client.chat.completions.create(
    response_model=Partial[User],
    messages=[{"role": "user", "content": "Extract user info from..."}],
    stream=True,
):
    print(partial_user)
    # User(name=None, age=None)
    # User(name="John", age=None)
    # User(name="John", age=30)
```

### Nested Objects and Complex Schemas

Real-world data is rarely flat. Instructor handles nested models, lists, and complex relationships:

```python
from typing import List

class Address(BaseModel):
    street: str
    city: str
    country: str

class User(BaseModel):
    name: str
    age: int
    addresses: List[Address]

user = client.chat.completions.create(
    response_model=User,
    messages=[{"role": "user", "content": "John lives at 123 Main St, London, UK and has a summer house at 456 Beach Rd, Barcelona, Spain"}],
)
```

### Custom Validation with Pydantic

Pydantic validators carry through to Instructor, letting you enforce business rules at the extraction level:

```python
from pydantic import BaseModel, field_validator

class Product(BaseModel):
    name: str
    price: float
    
    @field_validator('price')
    def price_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('Price must be positive')
        return v

# Instructor retries with the validation error message
product = client.chat.completions.create(
    response_model=Product,
    messages=[{"role": "user", "content": "Widget, free"}],
    max_retries=3,
)
```

## Beyond Python

While Python is the primary implementation, Instructor now supports multiple languages:

- **TypeScript** (js.useinstructor.com)
- **Go** (go.useinstructor.com)
- **Ruby** (ruby.useinstructor.com)
- **Elixir** (Hex.pm package)
- **Rust** (rust.useinstructor.com)

The API is consistent across languages, so teams with mixed stacks can use the same extraction patterns regardless of their primary language.

## When to Use Instructor vs. Alternatives

**Use Instructor when** you need structured data extraction from LLMs with validation and retries. It excels at ETL pipelines, data processing, content analysis, and any workflow where you are pulling structured information from unstructured text.

**Use PydanticAI when** you need a full agent runtime with tool calling, observability, and production dashboards. The Instructor team explicitly recommends PydanticAI for agent workflows while positioning Instructor as the focused tool for extraction.

**Use raw JSON mode or structured outputs** when you only need one provider and want the simplest possible setup. Instructor adds value through its retry mechanism, provider abstraction, and Pydantic integration.

**Avoid LangChain/LlamaIndex for this** if structured extraction is your primary use case. Instructor is lighter, faster, and more focused. Those frameworks are better suited for RAG pipelines and complex agent orchestration.

## Pricing and Availability

Instructor is fully open source under the MIT license. The library itself is free. You only pay for the LLM provider you choose to use. Install via pip:

```bash
pip install instructor
```

The project is maintained by Jason Liu and a community of over 1,000 contributors. It has been adopted by teams at OpenAI, Google, Microsoft, and AWS, alongside hundreds of YC startups and independent developers.

## The Bottom Line

Instructor solves a specific problem very well: getting reliable, validated, typed data out of LLMs without writing boilerplate. It does not try to be an agent framework, a RAG pipeline, or an observability platform. It takes your Pydantic model, talks to whatever LLM you point it at, and gives you back a valid object. If you are building anything that extracts structured information from text using LLMs, it is worth trying. The 3 million monthly downloads suggest most developers who try it, keep it.

## Sources

- [Instructor Python Documentation](https://python.useinstructor.com)
- [Instructor GitHub Repository](https://github.com/instructor-ai/instructor)
- [Instructor TypeScript Documentation](https://js.useinstructor.com)
- [PydanticAI Documentation](https://ai.pydantic.dev)
