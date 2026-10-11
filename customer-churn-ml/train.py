"""Synthetic customer churn modeling and evaluation."""

import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    f1_score,
    precision_score,
    recall_score,
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

RANDOM_STATE = 42


def build_dataset(n=1500):
    """Create a reproducible synthetic customer dataset."""
    rng = np.random.default_rng(RANDOM_STATE)
    age = rng.integers(18, 75, n)
    tenure = rng.integers(1, 72, n)
    monthly = rng.normal(75, 25, n).clip(20, 180)
    support = rng.poisson(2, n)
    usage = rng.normal(55, 18, n).clip(5, 100)
    contract = rng.choice(
        ["Month-to-month", "One year", "Two year"], n, p=[0.55, 0.25, 0.20]
    )

    logit = (
        -1.8
        + 0.025 * (monthly - 70)
        + 0.35 * (contract == "Month-to-month")
        + 0.08 * support
        - 0.018 * tenure
        - 0.025 * (usage - 50)
        + 0.003 * (age - 40)
    )
    probability = 1 / (1 + np.exp(-logit))
    churn = rng.binomial(1, probability)

    return pd.DataFrame(
        {
            "age": age,
            "tenure_months": tenure,
            "monthly_charge": monthly.round(2),
            "support_tickets": support,
            "usage_score": usage.round(2),
            "contract": contract,
            "churn": churn,
        }
    )


def main():
    """Prepare data, compare models and print evaluation results."""
    df = build_dataset()
    X = pd.get_dummies(df.drop(columns="churn"), columns=["contract"], drop_first=True)
    y = df["churn"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, stratify=y, random_state=RANDOM_STATE
    )

    models = {
        "Logistic Regression": Pipeline(
            [("scale", StandardScaler()), ("model", LogisticRegression(max_iter=1000))]
        ),
        "Random Forest": RandomForestClassifier(
            n_estimators=250, max_depth=10, random_state=RANDOM_STATE
        ),
        "Gradient Boosting": GradientBoostingClassifier(random_state=RANDOM_STATE),
    }

    print(f"Dataset shape: {df.shape} | churn rate: {y.mean():.2%}\n")
    results = []

    for name, model in models.items():
        model.fit(X_train, y_train)
        predictions = model.predict(X_test)
        results.append(
            [
                name,
                accuracy_score(y_test, predictions),
                precision_score(y_test, predictions, zero_division=0),
                recall_score(y_test, predictions, zero_division=0),
                f1_score(y_test, predictions, zero_division=0),
            ]
        )
        print(name)
        print(classification_report(y_test, predictions, digits=3))

    comparison = pd.DataFrame(
        results, columns=["Model", "Accuracy", "Precision", "Recall", "F1"]
    ).sort_values("F1", ascending=False)
    print(comparison.to_string(index=False))


if __name__ == "__main__":
    main()
