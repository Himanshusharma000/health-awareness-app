"""Synthetic classification study with PCA, model comparison and saved results."""

import json
from pathlib import Path

import numpy as np
from sklearn.datasets import make_classification
from sklearn.decomposition import PCA
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, precision_recall_fscore_support
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

RANDOM_STATE = 42
OUTPUT_DIR = Path(__file__).parent / "results"


def main():
    """Generate data, train models, print metrics and save reproducible results."""
    X, y = make_classification(
        n_samples=1600,
        n_features=24,
        n_informative=12,
        n_redundant=4,
        class_sep=1.1,
        random_state=RANDOM_STATE,
    )

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, stratify=y, random_state=RANDOM_STATE
    )

    models = {
        "PCA + Logistic Regression": Pipeline(
            [
                ("scale", StandardScaler()),
                ("pca", PCA(n_components=0.90, random_state=RANDOM_STATE)),
                ("model", LogisticRegression(max_iter=2000)),
            ]
        ),
        "Random Forest": RandomForestClassifier(
            n_estimators=250, max_depth=10, random_state=RANDOM_STATE
        ),
        "Gradient Boosting": GradientBoostingClassifier(random_state=RANDOM_STATE),
    }

    results = []
    for name, model in models.items():
        model.fit(X_train, y_train)
        predictions = model.predict(X_test)
        precision, recall, f1, _ = precision_recall_fscore_support(
            y_test, predictions, average="binary", zero_division=0
        )
        row = {
            "model": name,
            "accuracy": accuracy_score(y_test, predictions),
            "precision": precision,
            "recall": recall,
            "f1": f1,
            "confusion_matrix": confusion_matrix(y_test, predictions).tolist(),
        }
        results.append(row)
        print(
            f"{name}: accuracy={row['accuracy']:.3f}, "
            f"precision={precision:.3f}, recall={recall:.3f}, f1={f1:.3f}"
        )

    OUTPUT_DIR.mkdir(exist_ok=True)
    payload = {
        "dataset": {
            "samples": int(len(X)),
            "features": int(X.shape[1]),
            "test_size": 0.20,
            "random_state": RANDOM_STATE,
        },
        "models": results,
    }
    (OUTPUT_DIR / "model-results.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Saved {OUTPUT_DIR / 'model-results.json'}")


if __name__ == "__main__":
    main()
