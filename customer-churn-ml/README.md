# 📉 Customer Churn Prediction

A reproducible classification study that generates a synthetic customer dataset and compares multiple models for predicting churn.

> **Dataset note:** The customer records are synthetically generated for portfolio/learning purposes. They are not sourced from a real company or customer database.

## 🎯 Objective

Identify customer characteristics associated with churn and compare baseline classification models using metrics that are useful for an imbalanced classification problem.

## 🔬 Workflow

```text
Synthetic customer data
        ↓
Feature preparation + one-hot encoding
        ↓
Stratified train/test split
        ↓
Model training + probability scoring
        ↓
Accuracy / Precision / Recall / F1 / ROC-AUC
        ↓
Confusion-matrix + model comparison export
```

## 🤖 Models

- Logistic Regression with feature scaling
- Random Forest
- Gradient Boosting

The script generates 1,500 records and uses a fixed random seed for reproducibility.

## 📊 Result Snapshot

The synthetic dataset has a **13.8% churn rate**, so accuracy alone can be misleading. The current deterministic run reports:

| Model | Accuracy | Precision | Recall | F1 | ROC-AUC |
|---|---:|---:|---:|---:|---:|
| Logistic Regression | 0.867 | 0.600 | 0.073 | 0.130 | **0.743** |
| Random Forest | 0.870 | 1.000 | 0.049 | 0.093 | 0.699 |
| Gradient Boosting | 0.857 | 0.400 | 0.098 | **0.157** | 0.682 |

![F1 comparison](results/f1-comparison.svg)

Full metrics and confusion matrices are available in [`results/model-results.json`](results/model-results.json).

## 💡 Analytics Takeaway

The baseline models show why **class imbalance and decision thresholds matter** in churn work: the models achieve high accuracy while missing many churn cases. A production system should therefore tune thresholds and evaluate recall, F1, ROC-AUC and business cost rather than selecting a model by accuracy alone.

## 📊 Features

- Age
- Tenure in months
- Monthly charge
- Support tickets
- Usage score
- Contract type
- Churn target

## 🛠️ Tech Stack

`Python` `Pandas` `NumPy` `Scikit-learn` `Logistic Regression` `Random Forest` `Gradient Boosting`

## 🚀 Run Locally

```bash
cd customer-churn-ml
python -m pip install -r requirements.txt
python train.py
```

The script prints classification reports, ROC-AUC and a model-comparison table, then refreshes `results/model-results.json`.

## 📁 Structure

```text
customer-churn-ml/
├── train.py
├── requirements.txt
├── results/
│   ├── model-results.json
│   └── f1-comparison.svg
└── README.md
```

## 📌 Limitations

- Synthetic data is used instead of real customer records.
- Model performance is illustrative and should not be treated as production performance.
- No claim is made that the generated relationships represent any specific business.
- Threshold tuning and cost-sensitive evaluation would be the next production-oriented step.
