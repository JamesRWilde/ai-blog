---
title: "Comet ML API: The AI Developer Platform for Experiment Tracking, LLM Evaluation, and Production Monitoring"
excerpt: "Comet ML combines experiment tracking, LLM observability, and model monitoring in a single platform trusted by over 150,000 developers. Here's how its API works and why it matters for teams shipping AI in production."
coverImage: ""
date: 2026-03-27T05:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: ""
---

## TL;DR

Comet ML is an AI developer platform that provides experiment tracking for traditional ML, LLM observability and evaluation through its open-source Opik tool, and production model monitoring. Its Python SDK integrates with virtually every major ML framework and LLM provider, letting teams log metrics, parameters, visualizations, traces, and model artifacts through a few lines of code. With 150,000-plus users, 18,000 GitHub stars, and a generous free tier, it occupies a specific niche: teams that want a single platform spanning the full model lifecycle from first experiment to production drift detection.

## The Problem

Machine learning teams working in production face a fragmented toolchain problem. Experiment tracking lives in Weights & Biases or MLflow. LLM observability goes to Langfuse, Arize, or Braintrust. Production monitoring lands in a separate service entirely. Each tool has its own SDK, its own data model, its own pricing, and its own dashboard.

The result is a patchwork where tracing the lineage from a production model failure back to the specific training run, hyperparameter set, or prompt version that caused it requires manual stitching across systems. For teams building LLM-powered applications on top of traditional ML pipelines, the fragmentation is even worse. The experiment tracking tools do not understand traces, spans, and eval metrics, while the LLM observability tools do not track training runs or model versions.

Comet ML tackles this by building both sides into one platform. Its MLOps product handles experiment tracking, model versioning, dataset management, and production monitoring. Its Opik product handles LLM tracing, evaluation, and prompt optimization. Both run on the same underlying infrastructure.

## What Comet ML Does

Comet ML's platform is organized around a four-tier hierarchy: Organization, Workspace, Project, and Experiment. Each code execution of an ML or LLM workflow is logged as an experiment within a project, and the SDK handles the plumbing automatically once initialized.

The platform has two product families that work together:

**MLOps (Experiment Management)** covers the traditional ML lifecycle. You log metrics, parameters, system info, confusion matrices, model weights, and dataset versions. The SDK auto-logs framework-specific data for PyTorch, TensorFlow, Keras, XGBoost, LightGBM, scikit-learn, and Hugging Face without additional instrumentation.

**Opik (GenAI Observability)** is the newer product, available as both open-source and cloud-hosted. It handles LLM-specific observability: tracing across complex multi-step agents, evaluation with built-in metrics for hallucination, relevance, and context precision, automated prompt optimization, and production monitoring of LLM outputs.

Both products share the same authentication, workspace, and billing infrastructure, so a single API key and SDK installation covers both use cases.

## Key Capabilities

### Experiment Tracking

The core API is dead simple. Install the SDK, authenticate, and start logging:

```python
import comet_ml

comet_ml.login()
exp = comet_ml.start(project_name="my-project")

exp.log_parameters({"batch_size": 32, "learning_rate": 0.0001})
exp.log_metrics({"accuracy": 0.82, "loss": 0.012})
```

The SDK auto-captures Git commit info, installed packages, CPU/GPU metrics, and conda environment details without any extra code. For framework-specific logging (PyTorch model graphs, TensorFlow training curves, sklearn confusion matrices), it happens automatically when you import the framework after importing comet_ml.

### LLM Observability with Opik

Opik provides tracing for LLM applications by logging every call, chain, and agent step as a trace with nested spans. It integrates directly with LangChain, LlamaIndex, LangGraph, OpenAI, Anthropic, and other SDKs through auto-instrumentation:

```python
import opik
opik.configure(use_local=True)  # or use the cloud endpoint

@opik.track
def my_rag_pipeline(query):
    docs = retrieve(query)
    response = generate(query, docs)
    return response
```

Traces appear in the platform nearly instantly, even at high volumes. Each trace captures the full input-output pair, latency, token counts, cost estimates, and any custom metadata you attach.

### Evaluation Metrics

Opik ships with over 20 built-in evaluation metrics, including hallucination detection, answer relevance, context precision, context recall, moderation, summarization coherence, trajectory accuracy, and agent tool correctness. You can run evaluations programmatically against datasets:

```python
from opik.evaluation import evaluate

results = evaluate(
    dataset=my_dataset,
    scoring_metrics=[hallucination_metric, answer_relevance_metric],
    experiment_name="my-eval"
)
```

The platform also supports LLM-as-judge scoring through G-Eval and LLM Juries (ensemble judges that combine multiple model opinions for more reliable scoring).

### Prompt Optimization

Opik's automated prompt optimization feature generates and tests prompt variants for multi-step agentic systems. Given a dataset and desired metrics, it automatically iterates through prompt configurations, scores them, and recommends the top performers. This is not simple template rotation. It uses reflective evolution to understand why certain prompts fail and iterates toward better ones.

### Model Registry and Production Monitoring

On the MLOps side, Comet provides a model registry for versioning trained models, artifact tracking for datasets and model weights, and production monitoring with drift detection. Teams can register models from experiment runs, deploy them through their existing compute environment, and monitor for data drift and performance degradation over time.

### REST API and SDKs

Beyond the Python SDK, Comet exposes a REST API for programmatic access to all platform features. There are also TypeScript SDKs for the Opik side, CLI tools for data import/export, and an MCP (Model Context Protocol) server for integrating experiment analysis into Cursor and other AI-powered IDEs.

## Getting Started

### Setup

1. **Install the SDK:** `pip install comet_ml`
2. **Authenticate:** Run `comet login` from the command line, or call `comet_ml.login()` in Python with your API key
3. **Start an experiment:** `exp = comet_ml.start(project_name="your-project")`
4. **Log data:** Use `exp.log_metrics()`, `exp.log_parameters()`, `exp.log_artifact()` as needed

For Opik specifically, install with `pip install opik`, run `opik configure`, and use the `@opik.track` decorator around your LLM functions.

### Practical Example

Here is a realistic example combining traditional ML experiment tracking with LLM evaluation in a single project:

```python
import comet_ml
from comet_ml import start

# Track a training run
exp = start(project_name="document-classifier")
exp.log_parameters({
    "model": "bert-base-uncased",
    "epochs": 5,
    "learning_rate": 2e-5
})

# ... training loop with exp.log_metrics() calls ...

exp.log_model("classifier", "models/classifier-v1.pt")
exp.log_dataset_metadata()

# Now evaluate the LLM post-processor
import opik
from opik.evaluation import evaluate
from opik.metrics import AnswerRelevance

eval_results = evaluate(
    dataset=validation_set,
    scoring_metrics=[AnswerRelevance(model="openai/gpt-5-mini")]
)
```

Everything lives in the same workspace. The model training experiment and the LLM evaluation experiment are linked by project, giving you full lineage from training data to production output.

## Use Cases

**RAG pipeline optimization** is a natural fit. Log every retrieval-generation step as a trace, evaluate outputs against a labeled dataset with Opik's built-in metrics, then use automated prompt optimization to improve the system prompts and few-shot examples.

**Multi-model comparison** benefits from Comet's experiment diffing. Train the same task with different architectures, compare learning curves and final metrics side by side, and share the comparison via a URL.

**LLM agent debugging** leverages Opik's trace visualization. Complex agents with tool use, multi-hop reasoning, and memory can have their execution paths visualized as graphs. When an agent fails, you can drill into the specific span where the tool call went wrong.

**Production monitoring** catches model drift and performance degradation. The platform monitors input distributions, output quality metrics, and latency patterns, alerting teams when something shifts.

## Pricing

Comet offers a generous free tier with no credit card required. The free plan includes unlimited experiment tracking for individuals, basic LLM evaluation through Opik's open-source version, and standard community support.

Enterprise plans add VPC and on-premises deployment options, SSO, role-based access control, audit logs, and dedicated support. The Opik open-source product can be self-hosted entirely, with the cloud option providing managed infrastructure for teams that do not want to run their own stack.

## Alternatives

**Weights & Biases** is the closest competitor for experiment tracking, with a mature product and strong community. However, W&B's LLM observability story is less developed than Opik's, and it comes at a higher price point for teams.

**MLflow** is the leading open-source alternative for experiment tracking, but it lacks built-in LLM observability and evaluation. Teams often pair MLflow with a separate LLM tool, reintroducing the fragmentation problem.

**Langfuse** focuses purely on LLM observability and is a strong option if you only need tracing for LangChain-based applications. It does not cover traditional ML experiment tracking or production model monitoring.

**Arize Phoenix** is another open-source LLM observability tool with strong evaluation capabilities. Like Langfuse, it does not address the ML experiment tracking side.

Comet's differentiation is the combination. If you need both ML experiment tracking and LLM observability in one platform, it is one of the few options that covers both without requiring separate vendors.

## FAQs

**Does Comet ML support local and self-hosted deployments?**
Yes. Opik is fully open-source and can be self-hosted. The MLOps platform supports VPC and on-premises deployment for enterprise customers.

**What LLM providers does Opik integrate with?**
Opik auto-instruments calls to OpenAI, Anthropic, Google Gemini, AWS Bedrock, LiteLLM, LangChain, LlamaIndex, and any OpenAI-compatible endpoint. Custom integrations are straightforward with the Python SDK.

**Can I use Opik without the MLOps experiment tracking?**
Yes. Opik works as a standalone open-source product. You do not need the MLOps platform to use LLM tracing and evaluation.

**Is there a TypeScript or JavaScript SDK?**
Yes. Opik provides TypeScript SDKs for the LLM observability side. The MLOps experiment tracking is Python-only.

**How does Comet handle data security?**
Comet is SOC 2 Type II compliant. Data is encrypted in transit and at rest. Enterprise customers can deploy entirely within their own infrastructure.

## Bottom Line

Comet ML is not trying to be everything for everyone. It is built for teams that need to track ML experiments, evaluate LLM applications, and monitor models in production on a single platform. The API is simple, the SDK integrations are broad, and the free tier is actually usable. If your team is currently juggling separate tools for experiment tracking and LLM observability, Comet is worth evaluating as a unified alternative.

## Sources

- [Comet ML Documentation](https://www.comet.com/docs/v2/)
- [Opik Documentation](https://www.comet.com/docs/opik/)
- [Opik GitHub Repository](https://github.com/comet-ml/opik)
- [Comet ML Quickstart Guide](https://www.comet.com/docs/v2/guides/quickstart/)
- [Comet ML Pricing](https://www.comet.com/site/pricing/)
