---
title: "OVHcloud AI Endpoints: The Sovereign AI API With Free Models and Zero Data Retention"
excerpt: "OVHcloud AI Endpoints offers 40+ open-weight models via OpenAI-compatible APIs from European data centers, with free-tier models, ISO/SOC certifications, and a strict zero-data-retention policy."
coverImage: "/assets/blog/ovhcloud-ai-endpoints-cover.png"
date: 2026-03-29T10:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/ovhcloud-ai-endpoints-cover.png"
---

## TL;DR

OVHcloud AI Endpoints is a serverless inference API serving 40+ open-weight models (Qwen, Llama, Mistral, Whisper, Stable Diffusion, and more) from European data centers. It offers OpenAI-compatible endpoints, free-tier models with no credit card required, zero data retention, and ISO 27001/SOC certifications. For teams that need GDPR-aligned AI infrastructure without vendor lock-in, it is one of the most privacy-forward options on the market.

## The Problem

AI inference APIs are dominated by US-based providers. OpenAI, Anthropic, Google, Together AI, Fireworks, Groq, and Cerebras all run infrastructure in North America. For European developers building applications in regulated sectors, this creates friction: data crosses borders, compliance documentation gets complicated, and the legal basis for transfers gets murkier with each new GDPR enforcement action.

Some teams work around this by self-hosting open-weight models on European infrastructure. That approach works for companies with the engineering capacity to manage GPU clusters, model updates, and inference optimization. For everyone else, there is a gap: an inference API that keeps data within EU jurisdiction, works with standard SDKs, and does not require a PhD in MLOps.

OVHcloud, France's largest cloud provider and the continent's leading bare-metal hosting company, built AI Endpoints to fill exactly that gap.

---

## What OVHcloud AI Endpoints Actually Offers

AI Endpoints is a serverless inference API. You send a request to an OpenAI-compatible endpoint, OVHcloud runs inference on a pre-configured model in its European data centers, and returns the result. No GPU provisioning. No container orchestration. No model serving pipeline to maintain.

### The Model Catalog

The catalog is not the largest in the market, but it is deliberately curated around open-weight models with permissive licenses:

**Chat and Text Generation:**
- Qwen 3 Coder 30B (256K context) - function calling, code assistant
- Qwen 3 32B (32K context) - function calling, reasoning
- Qwen 2.5 VL 72B (32K context) - multimodal, vision+text
- GPT-OSS 120B (131K context) - OpenAI's open-weight model, reasoning
- GPT-OSS 20B (131K context) - lighter variant
- Llama 3.3 70B (131K context) - function calling
- Mistral Small 3.2 24B (128K context) - multimodal, function calling
- Mistral 7B v0.3 (127K context) - fast, function calling
- Mistral Nemo 12B (118K context) - function calling
- Qwen Guard 8B and 0.6B - content moderation (free)

**Speech:**
- Whisper Large V3 - automatic speech recognition
- Whisper Large V3 Turbo - faster variant
- NVIDIA TTS models - English, German, Italian, Spanish text-to-speech (all free)

**Image Generation:**
- Stable Diffusion XL (3.5B parameters) - free

**Embeddings:**
- Qwen3 Embedding 8B (32K context, 4096 dimensions)
- BGE Multilingual Gemma2 (8K context)
- BGE M3 - multilingual embeddings

**Content Moderation:**
- Qwen Guard 8B (free)
- Qwen Guard 0.6B (free)

The standout here is the free tier. Several models, including Stable Diffusion XL, NVIDIA TTS in four languages, Whisper, and the Qwen Guard moderation models, are entirely free to use. No credit card required to start. For prototyping, testing, or low-volume production, this is genuinely useful.

### Pricing for Paid Models

Paid models use per-token pricing in euros:

| Model | Input (€/M tokens) | Output (€/M tokens) |
|-------|-------------------|---------------------|
| Qwen 3 Coder 30B | 0.06 | 0.22 |
| GPT-OSS 20B | 0.04 | 0.15 |
| GPT-OSS 120B | 0.08 | 0.40 |
| Qwen 3 32B | 0.08 | 0.23 |
| Mistral Small 3.2 24B | 0.09 | 0.28 |
| Mistral 7B v0.3 | 0.10 | 0.10 |
| Mistral Nemo 12B | 0.13 | 0.13 |
| Llama 3.3 70B | 0.67 | 0.67 |
| Qwen 2.5 VL 72B | 0.91 | 0.91 |

At current EUR/USD rates, GPT-OSS 20B at €0.04/M input tokens translates to roughly $0.043/M tokens. That is competitive with DeepInfra and cheaper than most US-based providers for comparable model sizes. The Qwen 3 Coder 30B at €0.06/M input is notably affordable for a code-capable model with 256K context.

### OpenAI-Compatible API

The API follows the OpenAI chat completions spec. Existing code using the `openai` Python or Node SDKs works by changing the base URL:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://endpoints.ai.cloud.ovh.net/v1",
    api_key="your-ovh-api-key"
)

response = client.chat.completions.create(
    model="qwen-3-coder-30b-a3b-instruct",
    messages=[{"role": "user", "content": "Write a Python function to parse CSV files"}]
)
```

No proprietary SDK required. No vendor-specific wrapper library. If your code talks to OpenAI's API today, it can talk to OVHcloud tomorrow with a base URL swap and a model name change.

---

## Data Privacy: Zero Retention, No Training

This is where OVHcloud's pitch differentiates most sharply from US-based competitors.

OVHcloud guarantees **zero data retention**. Your prompt data is used solely for inference. It is not stored, not logged beyond billing metrics, and never used to train or improve any model. This is not a privacy policy wording or a "we try our best" commitment. It is a contractual guarantee backed by their platform architecture.

For organizations subject to GDPR, the EU AI Act, or sector-specific regulations (healthcare data under GDPR Article 9, financial data under PSD2), this matters. You are not relying on Data Processing Agreements to explain away data transfers to Virginia or Oregon. Your inference requests stay in OVHcloud's European infrastructure, processed under European jurisdiction.

### Certifications

OVHcloud holds certifications relevant to regulated industries:
- ISO 27001 (information security management)
- SOC 2 Type II
- HDS (Health Data Host certification for French healthcare data)
- C5 (German cloud computing compliance catalog)
- SecNumCloud qualification (French ANSSI)

---

## The European Angle: Sovereignty Without Self-Hosting

OVHcloud is not a startup pivoting to AI. It is Europe's largest hosting company, founded in 1999, with data centers across France, Germany, Poland, the UK, Canada, Singapore, Australia, and India. The company manufactures its own servers in its French factory. It builds its own OpenStack-based public cloud. It is not a thin wrapper around someone else's GPU cluster.

This matters for two reasons:

**Vendor lock-in:** OVHcloud explicitly markets reversibility. Models can be redeployed on your own infrastructure or migrated to another cloud provider. The API uses standard OpenAI formats, not proprietary schemas.

**Geopolitical risk:** As EU-US data transfer frameworks continue to face legal challenges (Privacy Shield was invalidated in 2020, its successor faces scrutiny), having inference infrastructure that never leaves EU jurisdiction eliminates an entire category of legal risk.

---

## Limitations

Honest assessment of where AI Endpoints falls short compared to the broader inference API market:

**Model selection:** 40+ models is a respectable catalog, but Together AI offers 200+, and platforms like OpenRouter aggregate 500+. If you need a specific niche model, OVHcloud may not carry it.

**No frontier closed models:** You will not find GPT-5, Claude, or Gemini here. OVHcloud serves open-weight models exclusively. If your use case requires the absolute latest proprietary model, you need a different provider.

**Smaller community:** The developer ecosystem around OVHcloud AI Endpoints is younger than OpenAI's, Together's, or Groq's. Documentation is solid but the Stack Overflow thread count is thin.

**Latency:** European routing adds latency for users in North America or Asia. This is a feature for data sovereignty, but a bug for latency-sensitive applications serving a global user base.

**No fine-tuning:** AI Endpoints provides inference only. For model customization, you need OVHcloud's AI Training product or another platform.

---

## When to Use It

**Good fit:**
- European companies processing personal data under GDPR
- Healthcare, finance, and government applications requiring data residency
- Prototyping with free-tier models (SDXL, Whisper, TTS, Qwen Guard)
- Cost-sensitive projects that benefit from euro-denominated pricing
- Teams that want OpenAI-compatible APIs without US data jurisdiction
- Organizations requiring ISO/SOC-certified AI infrastructure

**Poor fit:**
- Applications requiring GPT-5, Claude, or Gemini
- Teams that need the broadest possible model selection
- Latency-critical applications serving primarily non-European users
- Use cases requiring fine-tuning or model customization

---

## Getting Started

OVHcloud offers US$200 in free credit for new Public Cloud accounts. Combined with the free-tier models, you can prototype and test without spending anything.

1. Create an account at [ovhcloud.com](https://www.ovhcloud.com/en/public-cloud/ai-endpoints/)
2. Generate an API key in the Public Cloud console
3. Point your OpenAI SDK at `https://endpoints.ai.cloud.ovh.net/v1`
4. Start building

The playground interface lets you test models interactively before writing code. For teams evaluating European AI infrastructure options, it is one of the most frictionless entry points available.

---

## Alternatives Worth Comparing

| Provider | Data Location | Free Tier | OpenAI-Compatible | Models |
|----------|--------------|-----------|-------------------|--------|
| OVHcloud AI Endpoints | EU (France) | Yes (multiple models) | Yes | 40+ |
| Scaleway Generative APIs | EU (France) | Yes (1M tokens) | Yes | 20+ |
| Mistral API | EU (France) | Limited | Yes | Mistral models |
| Together AI | US | $5 credit | Yes | 200+ |
| Fireworks AI | US | $5 credit | Yes | 100+ |
| OpenRouter | US | Varies | Yes | 500+ (aggregated) |

OVHcloud's strongest differentiator is the combination of free models, zero retention, and European sovereignty. Scaleway is the closest competitor with a similar European pitch but a smaller free tier. Together and Fireworks offer more models but sit outside EU jurisdiction.

For developers and teams that view data privacy and jurisdiction as first-class requirements rather than afterthoughts, OVHcloud AI Endpoints deserves a spot on the shortlist.
