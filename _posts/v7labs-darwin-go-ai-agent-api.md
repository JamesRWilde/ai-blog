---
title: "V7 Labs: The AI Agent API That Actually Understands Documents"
excerpt: "V7 Labs combines Darwin's data annotation platform with Go's document-focused AI agents to deliver API-driven automation for finance, insurance, and legal workflows."
coverImage: "/assets/blog/v7labs-cover.jpg"
date: 2026-03-27T06:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/v7labs-cover.jpg"
---

## TL;DR

V7 Labs is a London-based AI company that operates two distinct but connected API products: Darwin, a data labeling platform for computer vision training data, and Go, an AI agent platform purpose-built for document-heavy enterprise workflows. Founded in 2018, backed by Air Street Capital and investors including the inventor of Transformers (Ashish Vaswani), V7 has carved out a niche in verticals that most AI API companies ignore, namely finance, insurance, and legal operations.

## The Problem

The AI API landscape is saturated with general-purpose LLM endpoints. What it lacks is specialized tooling for enterprises drowning in unstructured documents, complex contracts, and image-heavy datasets. Insurance underwriters still manually review claims. Legal teams spend weeks redlining term sheets. Real estate analysts compare private placement memoranda by hand.

Most AI APIs give you a text box in, text box out model. That is useless when your workflow involves 60-page PDFs, DICOM medical images, and multi-step approval chains with human review gates.

---

## What V7 Actually Does

V7 splits its offering into two products, each with its own API and documentation.

### Darwin: Data Annotation API

Darwin is the older product, launched in 2019 as a competitor to Labelbox and Scale AI's annotation tools. It is specifically designed for computer vision training data, supporting images, video, DICOM medical scans, and other specialized formats.

The Darwin API lets you:

- Upload and manage datasets programmatically
- Create annotation workflows with multi-stage review pipelines
- Integrate auto-annotation models (SAM2 and V7's own models) to pre-label data
- Export annotations in formats compatible with TensorFlow, PyTorch, and other ML frameworks
- Manage team permissions and track labeling progress via REST endpoints

The Python SDK (`darwin-py`) is open source on GitHub with 116 stars and active development. You can automate entire labeling pipelines from dataset ingestion to model-ready export without touching the UI.

Key Darwin API capabilities include auto-annotation (claiming 10x speedup over manual labeling), video auto-tracking for temporal segmentation, and model-in-the-loop integration where you can plug your own models into the annotation pipeline for quality comparison.

### Go: Document AI Agent API

Go, launched in April 2024, is the newer and arguably more interesting product. It is an AI agent platform specifically designed for document-heavy workflows in finance, insurance, real estate, and legal sectors.

Unlike general-purpose LLM APIs, Go agents are pre-built logic systems that chain together AI models, Python scripts, web search, and human review steps. Each agent is designed for a specific business process, covenant extraction from credit agreements, operational due diligence analysis, tear sheet generation, zoning code review, and dozens more.

The agent model works like this:

1. Input arrives (documents, emails, files)
2. AI extracts structured data fields
3. Logic branches route based on content (if fraud risk is high, send to human)
4. Python scripts run calculations and validations
5. Output is structured data, reports, or CRM entries

Go supports 300+ pre-built tools and agents across finance, insurance, real estate, and operations verticals. The most recent addition, "AI Skills," launched in February 2026, extends the platform with reusable AI capabilities that can be embedded into existing workflows.

---

## API Integration

### Darwin REST API

Darwin exposes a standard REST API for dataset management, annotation, and export. Authentication is API key-based. Here is a basic example using the Python SDK:

```python
from darwin.client import Client

client = Client(api_key="your-api-key")

# List available datasets
datasets = client.list_datasets()

# Upload images to a dataset
dataset = client.get_dataset("my-dataset")
dataset.upload_images(["/path/to/image1.jpg", "/path/to/image2.jpg"])

# Export annotations
dataset.export("coco_json", "/path/to/output/")
```

The SDK supports filtering by file status, managing annotations, and automating review workflows.

### Go Agent API

Go agents are configured through a visual builder but can be triggered and managed programmatically. The platform supports webhook integrations for event-driven workflows, meaning you can trigger an agent from an incoming email, a CRM event, or a custom application.

Each agent processes documents, extracts structured properties (text, numbers, dates, single-select classifications), and outputs machine-readable results suitable for pipeline integration.

---

## Pricing

**Darwin** uses a per-seat model with three tiers:

- Starter: $650/month (1 annotator seat)
- Team: $1,450/month (5 seats)
- Enterprise: Custom pricing with SSO, HIPAA compliance, and dedicated support

**Go** pricing is not publicly listed. V7 offers a "pay-per-completion" model for one-off usage and volume-based pricing for production deployments. You need to book a demo for specific numbers.

Both products offer a 14-day free trial.

---

## Who Uses V7

V7's customer roster reads like a who's who of companies that need precision over speed:

- **Paige** (digital pathology) uses Darwin for medical image annotation
- **Roche** uses it for clinical imaging workflows
- **Sony** uses it for detection automation
- **Miovision** uses it for traffic analysis video annotation
- **Boston Scientific** uses it for radiology annotation
- **Raft** uses it for document workflow automation in logistics

The company reports 95% platform uptime, SOC 2 Type II and HIPAA compliance, and support for over 50 data types including specialized medical formats.

---

## Security and Compliance

This is where V7 stands out from generic AI API providers. The platform is SOC 2 Type II certified, HIPAA compliant, and offers granular access controls with detailed audit logs. For industries like healthcare and financial services where data handling is regulated, this is not optional.

Darwin supports private cloud deployments across AWS, Google Cloud, and Azure. Go inherits the same security posture with additional emphasis on data residency and access control for document processing workflows.

---

## The Bottom Line

V7 is not trying to compete with OpenAI or Anthropic on general intelligence. It is building specialized AI infrastructure for industries that have specific, high-value document and image processing needs that general-purpose APIs cannot address.

Darwin solves the training data problem for computer vision teams. Go solves the document automation problem for financial services, insurance, and legal operations. Together, they offer an API-driven approach to AI workflows that most general-purpose platforms simply do not cover.

If your AI pipeline involves anything beyond text-in, text-out, V7 is worth evaluating.

---

## Links

- **Website:** [v7labs.com](https://v7labs.com)
- **Darwin API Docs:** [docs.v7labs.com](https://docs.v7labs.com)
- **Go Agent Docs:** [docs.go.v7labs.com](https://docs.go.v7labs.com)
- **GitHub:** [github.com/v7labs](https://github.com/v7labs)
- **Pricing:** [v7labs.com/pricing](https://v7labs.com/pricing)
- **About:** [v7labs.com/about-v7](https://v7labs.com/about-v7)
