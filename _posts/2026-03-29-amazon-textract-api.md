---
title: "Amazon Textract API: AI-Powered Document OCR and Data Extraction"
excerpt: "Amazon Textract goes beyond basic OCR to automatically extract text, handwriting, tables, and structured data from scanned documents using machine learning."
coverImage: "/assets/blog/amazon-textract-api.png"
date: 2026-03-29T09:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/amazon-textract-api.png"
---

## TL;DR

Amazon Textract is an ML-powered document processing API that extracts text, handwriting, tables, forms, and structured data from scanned documents and images. It goes beyond traditional OCR by understanding document layout and extracting key-value pairs, table cells, and specific data points via a query-based interface. Pricing starts at $0.0015 per page for basic text detection and scales down at volume.

## What Amazon Textract Actually Does

Most OCR tools give you a wall of text. Amazon Textract gives you structure. It identifies where text sits in a document, distinguishes typed text from handwriting, extracts table rows and columns as structured data, and pulls key-value pairs from forms. It also offers specialized APIs for invoices, receipts, identity documents, and mortgage lending packages.

The service processes JPEG, PNG, and PDF files. It supports synchronous operations for single-page documents where latency matters and asynchronous operations for multi-page processing. No ML expertise required, just an AWS account and API calls.

## Key API Operations

Textract offers several distinct API endpoints, each targeting a different document processing workflow:

**DetectDocumentText** is the basic OCR operation. It returns every word and line of text detected in a document, along with bounding box coordinates and confidence scores. At $0.0015 per page for the first million pages, it is the cheapest option and handles straightforward text extraction.

**AnalyzeDocument** is where Textract separates itself from traditional OCR. It supports three feature types: **Tables** (extract structured tabular data), **Forms** (extract key-value pairs), and **Queries** (ask specific questions about the document content). You can combine these features in a single API call. Tables cost $0.015 per page, forms cost $0.05 per page, and queries cost $0.015 per page. Layout analysis is included free when used with tables.

**AnalyzeExpense** processes invoices and receipts, extracting vendor names, dates, line items, totals, and other financial data fields. Priced at $0.01 per page.

**AnalyzeID** handles identity documents like US driver's licenses and passports, extracting names, dates of birth, document numbers, and other ID fields. Priced at $0.025 per page for the first 100,000 pages, dropping to $0.01 per page after.

**AnalyzeLending** processes mortgage lending document packages, automatically classifying pages into document types (pay stubs, tax forms, bank statements) and extracting relevant data from each. Priced at $0.07 per page.

**AnalyzeDocument with Signatures** detects signature locations and extracts the surrounding text. Priced at $0.0035 per page.

## Pricing Breakdown

Textract uses tiered per-page pricing that decreases at volume. Here is the core pricing structure:

| API | First 1M Pages | After 1M Pages |
|-----|---------------|----------------|
| DetectDocumentText | $0.0015/page | $0.0006/page |
| AnalyzeDocument (Tables) | $0.015/page | $0.010/page |
| AnalyzeDocument (Forms) | $0.05/page | $0.04/page |
| AnalyzeDocument (Queries) | $0.015/page | $0.015/page |
| AnalyzeDocument (Signatures) | $0.0035/page | $0.0014/page |
| AnalyzeExpense | $0.01/page | $0.008/page |
| AnalyzeID | $0.025/page (first 100K) | $0.01/page |
| AnalyzeLending | $0.07/page | $0.055/page |

A real-world example: processing 100,000 pages of research reports with basic text detection costs $150 per month. Processing 2 million pages with tables and forms extraction runs approximately $115,000 per month. AWS offers a free tier of 1,000 pages per month for the first three months for new accounts.

Volume discounts kick in after 1 million pages, with reductions ranging from 33% to 60% depending on the API. The pricing model is purely pay-per-page with no minimum fees or upfront commitments.

## Custom Queries: The Standout Feature

The Queries feature is Textract's most powerful capability for structured extraction. Instead of writing regex patterns or post-processing logic to find specific fields, you ask questions about the document in natural language.

For example, on a mortgage application you can query: "What is the applicant's annual income?" or "What is the property address?" Textract uses these queries to locate and extract the relevant data, returning structured results with confidence scores.

Custom Queries extends this further by allowing you to fine-tune the pretrained Queries model with your own labeled data. This is particularly valuable for domain-specific forms where standard field names vary between organizations. You train a custom adapter, and it becomes available as a query feature in the AnalyzeDocument API.

## Integration and Developer Experience

Textract integrates with the AWS SDK across all major languages (Python, JavaScript, Java, .NET, Go, Ruby, PHP). The API accepts base64-encoded image data or S3 references. Results come back as JSON with bounding box coordinates, confidence scores, and relational data linking form fields to their values.

For document processing pipelines, Textract integrates with:

- **Amazon S3** for document storage and triggering
- **Amazon SNS** for asynchronous job completion notifications
- **Amazon SQS** for job queue management
- **AWS Lambda** for serverless processing workflows
- **Amazon Comprehend** for downstream NLP analysis of extracted text

Synchronous operations handle single pages with sub-second latency for basic text detection. Asynchronous operations process multi-page documents, returning a job ID you poll or receive via SNS notification when complete.

## Supported Languages and Limitations

Textract supports English, Spanish, German, French, Italian, Portuguese, and Dutch. It handles typed text in all supported languages and handwriting detection for English only. Maximum file size is 300 MB for synchronous operations and 500 MB for asynchronous. PDF pages are limited to 3000 pages per document.

The service operates in all commercial AWS regions. Document images should have a minimum resolution of 150 DPI for reliable extraction, with 300 DPI recommended for handwritten text.

## When to Use Textract vs. Alternatives

Textract makes sense when you are already in the AWS ecosystem and need structured document extraction at scale. The per-page pricing is competitive for high-volume processing, especially with the volume discounts after 1 million pages.

Consider Textract over general-purpose OCR libraries (like Tesseract) when you need table extraction, form field parsing, or the Queries feature. Traditional OCR gives you raw text. Textract gives you structured data with relational links between fields and values.

For teams already using AWS services like Comprehend, Rekognition, or SageMaker, Textract integrates natively into existing pipelines without additional infrastructure.

The main limitations: language support is narrower than some competitors, and the pricing for specialized features (forms, lending) adds up quickly at volume. If you only need basic text extraction from clean digital documents, simpler and cheaper options exist.

## Quick Start Example

Here is a basic Python example for text detection using boto3:

```python
import boto3

client = boto3.client('textract')

with open('document.pdf', 'rb') as document:
    response = client.detect_document_text(
        Document={'Bytes': document.read()}
    )

for block in response['Blocks']:
    if block['BlockType'] == 'LINE':
        print(block['Text'])
```

For form and table extraction, switch to `analyze_document` with the appropriate feature types:

```python
response = client.analyze_document(
    Document={'Bytes': document.read()},
    FeatureTypes=['TABLES', 'FORMS']
)
```

For query-based extraction:

```python
response = client.analyze_document(
    Document={'Bytes': document.read()},
    FeatureTypes=['QUERIES'],
    QueriesConfig={
        'Queries': [
            {'Text': 'What is the total amount?', 'Alias': 'TOTAL'},
            {'Text': 'What is the invoice date?', 'Alias': 'DATE'}
        ]
    }
)
```

---

Amazon Textract is a mature, production-ready document processing API that has been available since 2018 and continues to add features. It is not the cheapest OCR option for simple text extraction, but for structured document processing with tables, forms, and query-based extraction, it remains one of the most capable cloud APIs available. The Custom Queries feature in particular makes it worth evaluating for any organization processing standardized forms at scale.
