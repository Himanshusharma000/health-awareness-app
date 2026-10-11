"""Synthetic classification study with PCA and model comparison."""

import numpy as np
from sklearn.datasets import make_classification
from sklearn.decomposition import PCA
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

RANDOM_STATE = 42


def main():
    """Generate data, train models and print evaluation metrics."""
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

    for name, model in models.items():
        model.fit(X_train, y_train)
        predictions = model.predict(X_test)
        precision, recall, f1, _ = precision_recall_fscore_support(
            y_test, predictions, average="binary", zero_division=0
        )
        print(
            f"{name}: accuracy={accuracy_score(y_test, predictions):.3f}, "
            f"precision={precision:.3f}, recall={recall:.3f}, f1={f1:.3f}"
        )


if __name__ == "__main__":
    main()
