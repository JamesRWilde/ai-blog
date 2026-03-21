---
layout: post
title: "DeepL API: The AI Translation Platform That Finally Does Multilingual Right"
date: 2026-03-21T23:07:00
excerpt: "DeepL has quietly built one of the most capable AI language APIs on the market, spanning text translation, document processing, writing assistance, and real-time voice translation. Here's what developers need to know about its full API suite."
coverImage: "/assets/blog/deepl-api-cover.svg"
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/deepl-api-cover.svg"
---

DeepL is not the loudest name in AI. It does not ship flashy foundation models or make splashy AGI claims. What it does is translate text between languages with an accuracy that consistently embarrasses Google Translate, and it does it through an API that any developer can integrate in under ten minutes. In 2026, with the general availability of its Voice API and a document translation service that handles everything from PDFs to image files, DeepL has quietly assembled a full-spectrum language AI platform that deserves serious attention.

## TL;DR

- **What it is:** DeepL API is a suite of language AI services covering text translation, document translation, writing enhancement, glossary management, and real-time voice transcription and translation.
- **Supported languages:** 30+ languages with regional variants (EN-US, EN-GB, PT-BR, ZH-HANS, etc.), covering most major world languages.
- **API style:** RESTful HTTP endpoints with JSON responses, plus WebSocket for voice streaming. Official client libraries in Python, Node.js, .NET, PHP, Ruby, and Java.
- **Pricing:** Free tier with 500,000 characters per month; Pro plans starting around $5.49/month with tiered character allotments; Enterprise plans available on request.
- **Standout features:** Custom glossaries, formality controls, context-aware translations, HTML/XML tag handling, document translation (Word, PDF, PowerPoint, Excel, images), and real-time multilingual voice translation.
- **Security:** SOC 2 Type II, ISO 27001, GDPR compliant. Text is deleted from servers immediately after translation.
- **Who it is for:** Developers building multilingual apps, enterprise teams localizing content at scale, and anyone tired of shipping machine-translated copy that reads like a ransom note.

## What Is DeepL API?

DeepL API is the programmatic interface to DeepL's proprietary neural machine translation engine. Founded in Cologne, Germany in 2009, DeepL built its reputation by focusing narrowly on one problem, translation, and solving it better than anyone else. The API extends that capability to developers, letting them embed high-quality translation, text improvement, document processing, and voice translation into any application.

Unlike general-purpose LLM APIs from OpenAI or Anthropic, DeepL's service is specialized. It does not try to be a chatbot, a code assistant, or a reasoning engine. It translates, it rewrites, and it transcribes, and it does all three at a level that generalist models struggle to match in production.

## Key Features

### Text Translation

The core of the platform is the `/v2/translate` endpoint. Send an array of text strings with a target language code, and you get back translated text with automatic source language detection. Up to 50 texts can be batched in a single request, and the total request body must stay under 128 KiB.

Key parameters developers can use:

- **source_lang** — Optional. If omitted, DeepL auto-detects the language.
- **target_lang** — Required. Supports codes like DE, FR, EN-US, EN-GB, ZH-HANS, PT-BR.
- **formality** — Set to `more` or `less` to control whether translations use formal or informal registers. Not every language supports this, but major European languages do.
- **context** — Pass additional context (product descriptions, article summaries) that influences translation without being translated itself. This is genuinely useful for ambiguous terms and UI strings.
- **glossary_id** — Apply a custom glossary to enforce brand terms and domain-specific terminology.
- **model_type** — Choose between model versions, including next-gen models for highest quality.
- **split_sentences** — Control how sentence boundaries are handled.
- **preserve_formatting** — Keep whitespace and formatting intact.

### Document Translation

DeepL can translate entire documents without requiring developers to extract text first. Supported formats include `.docx`, `.pptx`, `.xlsx`, `.pdf`, `.html`, `.txt`, `.xlf`/`.xliff`, `.srt`, and image formats (`.jpg`, `.png`) in beta. The document is uploaded via multipart form data, processed server-side, and returned as a translated file.

This is not a token-by-token passthrough through a general LLM. DeepL's document pipeline understands document structure, preserves formatting, and handles embedded images, tables, and metadata. For teams automating localization workflows, this is the difference between a usable translation and a rebuild.

### DeepL Write (Rephrase API)

The `/v2/rephrase` endpoint provides writing enhancement for English, German, French, Italian, Spanish, Japanese, Portuguese, and Korean. It is not just grammar correction. DeepL Write adjusts tone, clarity, and style while preserving the original meaning. Developers can use it to normalize user-generated content, improve support responses, or polish translated text that needs a final pass.

### DeepL Voice (Voice API)

Generally available in 2026, the Voice API is the newest addition. It provides real-time voice transcription and translation over a WebSocket connection. The flow is straightforward: make a POST request to `/v3/voice/realtime` to get a streaming URL and auth token, then open a WebSocket connection and stream audio.

Supported audio formats include PCM (256 kbps, 16kHz recommended), OPUS (32 kbps for low-bandwidth scenarios), AAC, FLAC, and MP3. The API transcribes the source language and can translate into multiple target languages simultaneously from a single audio stream.

Source languages for voice include Chinese, Czech, Dutch, English, French, German, Indonesian, Italian, Japanese, Korean, Polish, Portuguese, Romanian, Russian, Spanish, Swedish, Turkish, and Ukrainian. Target languages extend to all DeepL-supported languages including Arabic, Hebrew, Thai, and Vietnamese.

For conference interpretation, real-time customer support, or live event captioning, this API eliminates the need to chain separate speech-to-text and translation services.

### Glossary Management

DeepL's glossary system lets developers define explicit source-to-target term mappings. This matters enormously for domains where terminology must be exact, legal, medical, technical, financial. Create a glossary via the API, reference its ID in translation requests, and DeepL will enforce your term mappings within the translation pipeline.

Glossaries support all DeepL languages except Thai. The maximum glossary size is 10 MiB, with up to 1,000 glossaries per account. The v3 glossary API adds multilingual glossary support and the ability to edit existing glossaries, a feature the older v2 endpoints lack.

## Getting Started

### Authentication

Every request requires an API key passed via the `Authorization` header:

```sh
curl -X POST 'https://api-free.deepl.com/v2/translate' \
  --header 'Authorization: DeepL-Auth-Key YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "text": ["Hello, world!"],
    "target_lang": "DE"
  }'
```

Free API keys end with the suffix `:fx` and use the `api-free.deepl.com` endpoint. Pro keys use `api.deepl.com`. The difference is character limits and rate limits, not translation quality.

### Python Client

The official Python library abstracts the HTTP layer entirely:

```python
import deepl

auth_key = "YOUR_API_KEY"
deepl_client = deepl.DeepLClient(auth_key)

result = deepl_client.translate_text(
    "The product integrates seamlessly with existing workflows.",
    target_lang="DE"
)
print(result.text)
# "Das Produkt lässt sich nahtlos in bestehende Arbeitsabläufe integrieren."
```

### Document Translation

Translating a document requires a multipart upload:

```sh
curl -X POST 'https://api-free.deepl.com/v2/document' \
  --header 'Authorization: DeepL-Auth-Key YOUR_API_KEY' \
  --form 'file=@/path/to/report.pdf' \
  --form 'source_lang=EN' \
  --form 'target_lang=DE'
```

The response includes a document ID and status. Poll the status endpoint to retrieve the translated file when processing completes.

### Voice Translation

The two-step WebSocket flow:

```sh
# Step 1: Request a streaming session
curl -X POST 'https://api.deepl.com/v3/voice/realtime' \
  --header 'Authorization: DeepL-Auth-Key YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "source_media_content_type": "audio/pcm",
    "target_langs": ["DE", "FR"]
  }'
```

The response provides a `streaming_url` and `token`. Open a WebSocket to the streaming URL, send audio chunks, and receive transcriptions and translations in real time.

## Pricing

DeepL offers a straightforward tiered model:

- **Free:** 500,000 characters per month. No credit card required. Limited to text translation and glossary management. Voice API is not available on the free tier.
- **API Pro plans:** Start at approximately $5.49/month for 1,000,000 characters, scaling up through tiers of 5M, 10M, 50M, 100M, and 500M characters per month. Higher tiers unlock the Voice API and document translation features.
- **Enterprise:** Custom pricing with dedicated support, enhanced security agreements, and volume discounts. Contact DeepL sales for details.

Character counting is straightforward: only the characters in the `text` parameter are counted toward billing. The `context` parameter, which can significantly improve translation quality, does not incur charges.

This pricing model is competitive with general-purpose LLM APIs for translation tasks. GPT-4o charges per token, which includes both input and output text, and the per-character cost adds up quickly for bulk translation. DeepL's flat character-based pricing is simpler to predict and significantly cheaper at volume.

## How It Compares

### vs. Google Cloud Translation API

Google's translation API is the incumbent, and it supports far more languages, 130+ versus DeepL's 30+. But language count is not the whole story. For the languages DeepL does support, independent benchmarks consistently rate its translation quality higher, particularly for European languages. DeepL's glossary system and formality controls are also more developer-friendly than Google's equivalent features. Google wins on breadth; DeepL wins on depth.

### vs. OpenAI / Anthropic LLM APIs

Using GPT-4o or Claude for translation is viable and sometimes useful when you need cultural adaptation rather than strict translation. But for production translation workflows, general-purpose LLMs have significant drawbacks: unpredictable latency, per-token pricing that scales poorly, occasional hallucinations in technical terminology, and no built-in glossary enforcement. DeepL is faster, cheaper for translation-specific workloads, and more consistent in output quality for its supported languages.

### vs. Amazon Translate

Amazon Translate is cost-effective and integrates well with AWS infrastructure, but its translation quality generally trails DeepL for European and Asian languages. Amazon does offer real-time translation and batch translation, but the quality gap is noticeable for content where nuance matters.

## When to Use DeepL API

DeepL API is the right choice when:

- You need high-quality translation for the languages it supports and do not care about the 100+ niche languages it does not.
- Glossary enforcement is critical, legal documents, technical manuals, branded content.
- You want to translate entire documents without building a text extraction pipeline.
- Real-time voice translation is a requirement and you want a single API instead of chaining speech-to-text with translation.
- You need predictable, volume-friendly pricing rather than per-token billing.

DeepL API is not the right choice when:

- You need languages DeepL does not support, Swahili, Icelandic, Welsh, etc.
- You want cultural adaptation rather than translation, rewriting idioms, localizing humor, adjusting tone for regional audience. Use an LLM for that.
- You need a model that does more than language tasks. DeepL is a specialist, not a generalist.

## The Bottom Line

DeepL's API does not try to be everything. It translates, it writes, it transcribes and translates voice, and it does all of these things at a level that generalist AI platforms cannot consistently match for production workloads. The glossary system solves a problem that LLM-based translation workflows still struggle with, and the Voice API eliminates the need to wire together separate speech and translation services.

For developers building multilingual products, DeepL API is not just another translation service to evaluate. It is the one you should try first.

---

*Published March 21, 2026. Pricing and feature information current as of publication date.*
