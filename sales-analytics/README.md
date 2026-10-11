# 📊 Sales Analytics Workflow

A lightweight Python analytics workflow that generates a synthetic retail-sales dataset and produces executive KPIs plus category, store and monthly revenue analysis.

> **Dataset note:** The data is generated in code for demonstration and reproducibility; it is not real business data.

## 🎯 Objective

Demonstrate a compact analytics workflow from transaction-like records to decision-friendly summary metrics and machine-readable outputs.

## 📈 Executive Snapshot

The current deterministic synthetic run produces:

| KPI | Value |
|---|---:|
| Revenue | **$1,094,590.14** |
| Units | 9,903 |
| Orders | 2,500 |
| Average order value | $437.84 |
| Top category | Sports |
| Top store/region | West |

![Monthly revenue](results/monthly-revenue.svg)

The complete KPI payload is available in [`results/kpi-summary.json`](results/kpi-summary.json).

## 🔬 Workflow

```text
Generate transaction data
        ↓
Create gross sales + discounted revenue
        ↓
Derive monthly period
        ↓
Aggregate executive KPIs
        ↓
Compare categories and stores
        ↓
Export CSV + JSON outputs
```

## 🧠 Analytics Skills Demonstrated

- KPI definition and aggregation
- Revenue and average-order-value calculation
- Category and regional performance comparison
- Monthly trend analysis
- Reproducible synthetic-data generation
- CSV/JSON output for downstream reporting or BI tools

## 🛠️ Tech Stack

`Python` `Pandas` `NumPy`

## 🚀 Run Locally

```bash
cd sales-analytics
python -m pip install -r requirements.txt
python analyze.py
```

The script refreshes `results/monthly_revenue.csv` and `results/kpi-summary.json`.

## 📁 Structure

```text
sales-analytics/
├── analyze.py
├── requirements.txt
├── results/
│   ├── kpi-summary.json
│   └── monthly-revenue.svg
└── README.md
```

## 📌 Limitations

- Sales records are synthetic.
- No real company, customer or financial performance is represented.
- The workflow focuses on core aggregation/reporting rather than a production BI pipeline.
- Revenue is a simulated metric, not audited financial data.
