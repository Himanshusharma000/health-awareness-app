# 📊 Sales Analytics Workflow

A lightweight Python analytics workflow that generates a synthetic retail-sales dataset and produces executive KPIs plus category, store and monthly revenue analysis.

> **Dataset note:** The data is generated in code for demonstration and reproducibility; it is not real business data.

## 🎯 Objective

Demonstrate a compact analytics workflow from raw transaction-like records to decision-friendly summary metrics.

## 📈 Outputs

- Total revenue
- Units sold
- Order count
- Average order value
- Revenue by category
- Revenue by store/region
- Monthly revenue CSV export

## 🔬 Workflow

```text
Generate transaction data
        ↓
Create revenue metrics
        ↓
Derive monthly period
        ↓
Aggregate KPIs
        ↓
Compare categories and stores
        ↓
Export monthly revenue
```

## 🛠️ Tech Stack

`Python` `Pandas` `NumPy`

## 🚀 Run Locally

```bash
cd sales-analytics
python -m pip install -r requirements.txt
python analyze.py
```

A `monthly_revenue.csv` file is generated in the working directory.

## 📁 Structure

```text
sales-analytics/
├── analyze.py
├── requirements.txt
└── README.md
```

## 📌 Limitations

- Sales records are synthetic.
- No real company, customer or financial performance is represented.
- The workflow focuses on core aggregation/reporting rather than a production BI pipeline.
