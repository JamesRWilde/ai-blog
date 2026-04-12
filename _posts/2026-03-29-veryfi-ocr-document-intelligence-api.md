---
title: "Veryfi API: Multi-Modal Document Intelligence for Developers"
excerpt: "Veryfi provides specialized OCR APIs that extract structured data from invoices, receipts, checks, and dozens of other document types with 99%+ accuracy, supporting 91+ currencies and 38+ languages."
coverImage: "/assets/blog/veryfi-api-ocr-cover.jpg"
date: 2026-03-29T09:30:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/veryfi-api-ocr-cover.jpg"
---

## TL;DR

Veryfi is a document intelligence platform built around a suite of purpose-built OCR APIs. Where most AI API platforms treat document parsing as a side feature of a general-purpose model, Veryfi has spent years training specialized models for specific document types: invoices, receipts, bank statements, driver's licenses, insurance cards, bills of lading, and over 50 other document categories. The result is 99%+ accuracy on structured field extraction, support for 91+ currencies and 38+ languages, and processing times measured in seconds. Available as RESTful APIs with SDKs in Python, Node.js, Ruby, and PHP, plus mobile capture SDKs for iOS and Android.

## The Problem

Enterprise document processing is one of those problems that looks simple until you actually try to solve it. Every industry generates mountains of semi-structured documents: invoices with different layouts, receipts crumpled in pockets, bank statements from hundreds of institutions, insurance cards with varying formats across 50 states. The data trapped in these documents is critical for automation, but extracting it programmatically has historically meant one of two painful options.

Option one: hire teams of humans to manually enter data. This works but does not scale, introduces errors, and costs a fortune. A mid-size accounts payable team processing 5,000 invoices per month spends roughly 10-15 minutes per document on manual data entry. That is 800 to 1,200 hours of labor per month just for one document type.

Option two: use generic OCR engines and hope for the best. Standard OCR converts images to raw text, but raw text is not structured data. You still need custom parsers for every document format, every vendor layout, every currency, every language. Building and maintaining these parsers is an endless engineering project that breaks every time a vendor changes their invoice template.

Veryfi takes a third approach: purpose-trained machine learning models for each document category that go directly from image to structured JSON, no intermediate text parsing required.

## What Veryfi Actually Offers

The platform is organized around three core products: API endpoints for document processing, mobile SDKs for on-device capture, and webhooks for workflow automation.

### Document OCR APIs

Veryfi currently supports 50+ specialized OCR endpoints, each trained on a specific document type. The most commonly used ones:

**Financial Documents**
- **Invoices OCR** -- Extracts vendor details, line items (with quantities, unit prices, and totals), tax breakdowns, payment terms, PO numbers, and shipping information. Supports 91+ currencies with automatic currency detection. Handles invoices from 38+ languages with field-level confidence scores.
- **Receipts OCR** -- Processes both printed and handwritten receipts. Extracts merchant name, date, line items, payment method, tip amount, subtotal, tax, and total. Handles crumpled, faded, and partial captures through the mobile SDK.
- **Bank Statements OCR** -- Parses transaction lists, account balances, running totals, and statement periods. Useful for loan underwriting, account verification, and financial analysis automation.
- **Bank Checks OCR** -- Extracts routing numbers, account numbers, check amounts, payee names, dates, and MICR data for payment processing and fraud detection.
- **Credit Cards OCR** -- Captures card numbers, expiration dates, cardholder names, and issuing banks for payment onboarding flows.

**Identity Documents**
- **Driver's License OCR** -- Processes licenses from all 50 US states plus federal IDs and UK documents. Extracts name, address, DOB, license number, restrictions, and expiration.
- **Health Insurance Cards OCR** -- Captures member IDs, group numbers, plan details, copay amounts, and insurer information for patient registration and claims processing.
- **Indian Passport OCR** -- Extracts biographical data, passport numbers, and machine-readable zone data for immigration and KYC workflows.
- **Latin American Passport OCR** -- Standardizes identity extraction across Mexico, Brazil, Argentina, Colombia, and Chile.

**Industry-Specific**
- **Bill of Lading OCR** -- Extracts cargo details, shipment tracking numbers, carrier information, and freight charges for logistics automation.
- **Airway Bill OCR** -- Parses flight details, shipper/consignee information, cargo specifications, and AWB numbers for air freight operations.
- **Hotel Folio OCR** -- Captures guest information, room charges, service fees, taxes, and payment details for hospitality revenue management.
- **Lab Test Request Forms OCR** -- Extracts patient demographics, diagnosis codes, and provider details for healthcare workflow automation.
- **Diploma OCR** -- Verifies academic credentials by extracting institution names, degree types, graduation dates, and GPA data.

### Mobile SDKs (Veryfi Lens)

Veryfi Lens is the mobile capture component, available for iOS and Android. It handles the hard part of mobile document capture: automatic edge detection, perspective correction, glare removal, and image quality optimization before the document ever hits the API.

The Lens SDK can be embedded into existing apps for use cases like:
- Expense management apps that capture receipts at point of sale
- Insurance apps that scan policy documents in the field
- Real estate platforms that digitize lease agreements on-site

The SDK processes images on-device before upload, reducing transfer times and enabling offline capture with deferred processing.

### Webhooks and Workflow Integration

Veryfi supports synchronous and asynchronous processing modes. For high-volume workflows, the async API returns a tracking ID immediately and delivers results via webhook when processing completes. This integrates naturally with RPA platforms, ERP systems, and custom automation pipelines.

```python
from veryfi import Client

client = Client(client_id="YOUR_CLIENT_ID", 
                client_secret="YOUR_CLIENT_SECRET",
                username="YOUR_USERNAME",
                api_key="YOUR_API_KEY")

# Process an invoice
document = client.process_document_url(
    document_url="https://example.com/invoice.pdf",
    categories=["invoice"]
)

# Extract structured data
vendor = document["vendor"]["name"]
total = document["total"]
line_items = document["line_items"]

for item in line_items:
    print(f"{item['description']}: ${item['amount']}")
```

## Key Technical Details

**Accuracy**: Veryfi claims 99%+ accuracy on structured field extraction across supported document types. This is achieved through purpose-trained models rather than general-purpose OCR. Each document category has its own model trained on hundreds of thousands of examples specific to that format.

**Processing Time**: Typical processing takes 3-7 seconds per document for standard invoices and receipts. Complex multi-page documents take proportionally longer.

**Security and Compliance**: Veryfi holds SOC 2 Type II certification and complies with GDPR, HIPAA, CCPA, and ITAR. Documents are processed in SOC 2 certified data centers. The platform supports both cloud processing and on-premise deployment for organizations with strict data residency requirements.

**Custom Model Training**: Enterprise customers can train custom models for proprietary document formats. Veryfi's ML pipeline supports fine-tuning on customer-specific templates, field definitions, and document layouts.

**Language Support**: 38+ languages for document processing, with automatic language detection. Currency detection covers 91+ currencies with automatic conversion capabilities.

## Pricing

Veryfi operates on a per-document-processing model:

- **Free Tier**: Available for testing and evaluation with limited document volume
- **Pay-as-you-go**: Per-document pricing that scales with volume, with discounts at higher tiers
- **Enterprise**: Custom pricing for high-volume processing, on-premise deployment, and custom model training

The free account provides access to all OCR endpoints during the evaluation period, allowing developers to test accuracy on their specific document types before committing to a paid plan.

## Who Uses It

Veryfi's customer base spans fintech startups, CPB brands, insurance companies, healthcare providers, and real estate platforms. The platform's focus on specific document categories rather than general-purpose text extraction makes it particularly suited for industries where document processing accuracy directly impacts financial operations, compliance, or customer experience.

## Open-Source SDKs and Developer Experience

Veryfi provides SDKs in Python, Node.js, Ruby, and PHP on GitHub, along with Postman collections and sample projects. The API follows standard REST conventions with JSON request/response bodies, making it straightforward to integrate with any HTTP client in any language.

The mobile SDKs for iOS (Swift) and Android (Kotlin/Java) handle document capture optimization and integrate with the REST API for processing. The server-side SDKs handle authentication, request signing, and response parsing automatically.

Documentation is available at docs.veryfi.com with interactive API reference, getting started guides, and field-level documentation for every supported document type.
