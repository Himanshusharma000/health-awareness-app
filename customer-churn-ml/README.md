# 📉 Customer Churn Prediction

A reproducible classification study that generates a synthetic customer dataset and compares multiple models for predicting churn.

> **Dataset note:** The customer records are synthetically generated for portfolio/learning purposes. They are not sourced from a real company or customer database.

## 🎯 Objective

Identify customer characteristics associated with churn and compare baseline classification models using standard evaluation metrics.

## 🔬 Workflow

```text
Synthetic customer data
        ↓
Feature preparation + one-hot encoding
        ↓
Stratified train/test split
        ↓
Model training
        ↓
Accuracy / Precision / Recall / F1
        ↓
Model comparison
```

## 🤖 Models

- Logistic Regression with feature scaling
- Random Forest
- Gradient Boosting

The script generates 1,500 records and uses a fixed random seed for reproducibility.

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

The script prints classification reports and a model-comparison table sorted by F1-score.

## 📁 Structure

```text
customer-churn-ml/
├── train.py
├── requirements.txt
└── README.md
```

## 📌 Limitations

- Synthetic data is used instead of real customer records.
- Model performance is illustrative and should not be treated as production performance.
- No claim is made that the generated relationships represent any specific business.
