---
title: "LandingAI ADE API: Andrew Ng's Document Extraction Platform Gets Serious About Developers"
excerpt: "LandingAI's Agentic Document Extraction API parses complex documents into structured Markdown with visual grounding, using DPT-2 models that handle tables, forms, charts, and 30+ file types."
coverImage: "/assets/blog/landingai-cover.jpg"
date: 2026-03-22T13:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/landingai-cover.jpg"
---

If you have ever tried to extract structured data from a scanned bank statement, a messy invoice, or a contract buried in a PDF, you know the pain of document processing. Traditional OCR tools give you raw text with no understanding of layout, tables, or context. LandingAI, the company founded by AI pioneer Andrew Ng, is betting that a purpose-built document model can do better, and they have just released an API that makes that model accessible to any developer.

## TL;DR

LandingAI's Agentic Document Extraction (ADE) API parses documents and spreadsheets into structured Markdown, chunks, and metadata. It uses their DPT-2 family of Document Pre-Trained Transformer models to understand layout, tables, charts, forms, and equations, then outputs chunked content with visual grounding that traces results back to exact regions in the source document. The API supports 30+ file types including PDF, images, Word, PowerPoint, CSV, and XLSX. A Python library, TypeScript library, and playground are available. The free Explore tier starts with 1000 credits.

## The Problem Most Document APIs Get Wrong

Most document extraction tools treat OCR as a text problem. You feed in a PDF or image, and you get back a wall of text. Tables become garbled. Multi-column layouts collapse. Images and charts disappear entirely. If you need to extract specific fields like account numbers or contract dates, you are writing custom regex and hoping for the best.

LandingAI takes a different approach. DPT-2 is a vision-first model trained specifically on document understanding. It sees the page layout, recognizes tables as tables, understands that a chart caption belongs to the chart above it, and can render everything into clean Markdown with proper structure. The Extract endpoint then lets you define a JSON schema and pull out specific fields from the parsed output, complete with confidence scores and source references.

## How the API Works

ADE has two core endpoints: Parse and Extract.

Parse takes a document and converts it to structured Markdown. You send it a file or a URL, and it returns Markdown, chunks with bounding box grounding, and metadata. Extract takes the parsed Markdown and pulls out fields you define in a JSON schema.

Here is a quick cURL example parsing a bank statement:

```bash
curl -X POST 'https://api.va.landing.ai/v1/ade/parse' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -F 'document_url=https://docs.landing.ai/examples/bank-statement.pdf' \
  -F 'model=dpt-2-latest'
```

And extracting fields from the result:

```bash
curl -X POST 'https://api.va.landing.ai/v1/ade/extract' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -F 'schema={"type": "object", "properties": {"name": {"type": "string", "description": "Account holder name"}, "number_deposits": {"type": "integer", "description": "The number of deposits"}}, "required": ["name", "number_deposits"]}' \
  -F 'markdown=@markdown-bank-statement.md' \
  -F 'model=extract-latest'
```

The Python library wraps this cleanly:

```python
import json
from landingai_ade import LandingAIADE

client = LandingAIADE()

# Parse the document
parse_response = client.parse(
    document_url="https://docs.landing.ai/examples/bank-statement.pdf",
    model="dpt-2-latest"
)

print(parse_response.markdown)
print(parse_response.chunks)
print(parse_response.grounding)

# Extract fields
schema_dict = {
    "type": "object",
    "properties": {
        "name": {"type": "string", "description": "Account holder name"},
        "number_deposits": {"type": "integer", "description": "The number of deposits"}
    },
    "required": ["name", "number_deposits"]
}

extract_response = client.extract(
    schema=json.dumps(schema_dict),
    markdown=parse_response.markdown,
    model="extract-latest"
)

print(extract_response.extraction)
```

## File Support

ADE handles a wide range of file types. PDFs are the main use case, with support for up to 100 pages in the playground and configurable limits via the API. Images include the standard formats: JPEG, PNG, TIFF, BMP, GIF, WEBP, PSD, and more. Text documents like DOC, DOCX, and ODT are converted to PDF before parsing. Spreadsheets (CSV, XLSX) up to 50MB are supported natively. Even password-protected files can be parsed on accounts with Zero Data Retention enabled.

## DPT-2 Models: Two Tiers

LandingAI offers two parsing models: DPT-2 and DPT-2 mini. DPT-2 is the full model for maximum accuracy. DPT-2 mini is a faster, lighter variant for higher throughput use cases. Both are versioned with date-stamped snapshots, so you can pin to a specific version for consistent results or use the `-latest` alias to always get the newest improvements.

Recent updates in March 2026 brought improved table boundary detection, better large table accuracy, and proper Unicode character handling. DPT-2 mini also gained visual element captions for image-based chunks like figures, logos, and scan codes.

Model versioning is a detail that matters more than most developers expect. If you are building a production pipeline, pin your snapshots. If you want ongoing improvements, use `-latest`. LandingAI lets you do either.

## Visual Grounding

This is the underrated feature. Every chunk returned by Parse includes grounding information that traces it back to exact regions in the original document. If you extract a field, you can see precisely where on the page it came from. For compliance-heavy industries like finance, healthcare, and legal, this traceability is not optional.

## Splitting and Classification

Beyond parsing, ADE supports document splitting. You define document classes with names and descriptions, and the API automatically splits and classifies pages in a multi-document batch. For example, you could define "Bank Statement" and "Pay Stub" as classes, upload a mixed batch, and get each document separated and labeled automatically.

```python
split_class = [
    {
        "name": "Bank Statement",
        "description": "Document from a bank that summarizes all account activity over a period of time."
    },
    {
        "name": "Pay Stub",
        "description": "Document that details an employee's earnings, deductions, and net pay.",
        "identifier": "Pay Stub Date"
    }
]

split_response = client.split(
    split_class=json.dumps(split_class),
    markdown=parse_response.markdown,
    model="split-latest"
)
```

## Pricing

The Explore tier is pay-as-you-go at $1 per 100 credits, starting with 1000 free credits. Team plans range from $250 to $1000 per month for 27.5k to 110k credits. The Visionary tier goes up to $5000 per month for 650k credits and adds confidence scoring. Enterprise pricing is custom and includes VPC and on-prem deployment options, SLAs, and HIPAA compliance with BAA.

Overages are charged at $0.01 per credit across all paid tiers. Credits are consumed per parse and extract call, with the exact cost depending on document complexity and page count.

## Should You Use It

LandingAI is not the right tool if you are extracting plain text from simple documents. Standard OCR libraries will do that cheaper and faster. Where it earns its place is when you are dealing with complex layouts: multi-column reports, tables with merged cells, charts, forms, equations, or mixed document types in a single batch.

It is a strong fit for financial document processing, insurance claims, legal contracts, medical records, and procurement workflows where accuracy and traceability matter more than raw speed. The visual grounding and schema-based extraction make it easier to build audit-friendly pipelines compared to generic LLM-based extraction.

The free tier is generous enough to prototype with. The Python library is well-typed with async support, retries, and Pydantic models. And the playground at va.landing.ai lets you test documents without writing any code.

If your current pipeline involves feeding PDFs into a general-purpose LLM and hoping for structured output, ADE is worth evaluating as a purpose-built alternative.

## Key Links

- Website: [landing.ai](https://landing.ai)
- Documentation: [docs.landing.ai](https://docs.landing.ai)
- Python Library: [github.com/landing-ai/ade-python](https://github.com/landing-ai/ade-python)
- TypeScript Library: [github.com/landing-ai/ade-typescript](https://github.com/landing-ai/ade-typescript)
- Playground: [va.landing.ai](https://va.landing.ai)
