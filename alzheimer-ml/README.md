# 🧠 Cognitive Risk Classification — Machine Learning Study

A reproducible educational ML workflow inspired by my earlier Alzheimer’s-detection portfolio work. The implementation uses **synthetic, non-clinical data** to demonstrate a complete classification pipeline without presenting the output as medical evidence.

## 🔬 Workflow

1. Generate reproducible synthetic feature data
2. Split data into training and test sets
3. Standardize numeric features
4. Apply PCA for dimensionality reduction
5. Train Logistic Regression, Random Forest and Gradient Boosting models
6. Compare accuracy, precision, recall and F1

## 🛠️ Tech Stack

`Python` `Pandas` `NumPy` `Scikit-learn` `PCA`

## 🚀 Run Locally

```bash
pip install -r requirements.txt
python train.py
```

## 📁 Structure

```text
alzheimer-ml/
├── train.py
├── requirements.txt
└── README.md
```

## ⚠️ Transparency

This is a **learning/portfolio demonstration**, not a medical diagnostic system. The dataset is synthetic and the generated metrics must not be interpreted as clinical accuracy.
