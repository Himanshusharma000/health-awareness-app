"""Generate a synthetic retail dataset and export business KPI summaries."""

import json
from pathlib import Path

import numpy as np
import pandas as pd

RANDOM_STATE = 7
OUTPUT_DIR = Path(__file__).parent / "results"
OUTPUT_FILE = OUTPUT_DIR / "monthly_revenue.csv"


def build_dataset(n=2500):
    """Create reproducible transaction-like retail data."""
    rng = np.random.default_rng(RANDOM_STATE)
    dates = pd.date_range("2025-01-01", "2025-12-31", periods=n)
    categories = rng.choice(["Electronics", "Grocery", "Home", "Beauty", "Sports"], n)
    stores = rng.choice(["North", "South", "East", "West"], n)
    quantity = rng.integers(1, 8, n)
    unit_price = rng.uniform(8, 250, n)
    discount = rng.uniform(0, 0.25, n)

    df = pd.DataFrame(
        {
            "date": dates,
            "store": stores,
            "category": categories,
            "quantity": quantity,
            "unit_price": unit_price.round(2),
            "discount": discount.round(3),
        }
    )
    df["gross_sales"] = df["quantity"] * df["unit_price"]
    df["revenue"] = (df["gross_sales"] * (1 - df["discount"])).round(2)
    df["month"] = df["date"].dt.to_period("M").astype(str)
    return df


def main():
    """Generate KPI summaries and export machine-readable outputs."""
    df = build_dataset()
    OUTPUT_DIR.mkdir(exist_ok=True)

    category_summary = (
        df.groupby("category")
        .agg(revenue=("revenue", "sum"), units=("quantity", "sum"))
        .sort_values("revenue", ascending=False)
        .round(2)
    )
    store_summary = df.groupby("store")["revenue"].sum().sort_values(ascending=False).round(2)
    monthly = df.groupby("month", as_index=False)["revenue"].sum().round(2)

    print("\nEXECUTIVE KPIs")
    print(f"Revenue: ${df['revenue'].sum():,.2f}")
    print(f"Units: {df['quantity'].sum():,}")
    print(f"Orders: {len(df):,}")
    print(f"Average order value: ${df['revenue'].mean():,.2f}")

    print("\nCATEGORY PERFORMANCE")
    print(category_summary)

    print("\nSTORE PERFORMANCE")
    print(store_summary)

    monthly.to_csv(OUTPUT_FILE, index=False)

    payload = {
        "dataset": {"transactions": len(df), "period": "2025", "random_state": RANDOM_STATE},
        "kpis": {
            "revenue": float(df["revenue"].sum()),
            "units": int(df["quantity"].sum()),
            "orders": int(len(df)),
            "average_order_value": float(df["revenue"].mean()),
        },
        "top_category_by_revenue": category_summary.index[0],
        "top_store_by_revenue": store_summary.index[0],
        "monthly_revenue": dict(zip(monthly["month"], monthly["revenue"])),
    }
    (OUTPUT_DIR / "kpi-summary.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"\nSaved {OUTPUT_FILE}")
    print(f"Saved {OUTPUT_DIR / 'kpi-summary.json'}")


if __name__ == "__main__":
    main()
