"""Generate a synthetic retail dataset and report business KPIs."""

import numpy as np
import pandas as pd

RANDOM_STATE = 7
OUTPUT_FILE = "monthly_revenue.csv"


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
    """Generate KPI summaries and export monthly revenue."""
    df = build_dataset()

    print("\nEXECUTIVE KPIs")
    print(f"Revenue: ${df['revenue'].sum():,.2f}")
    print(f"Units: {df['quantity'].sum():,}")
    print(f"Orders: {len(df):,}")
    print(f"Average order value: ${df['revenue'].mean():,.2f}")

    print("\nCATEGORY PERFORMANCE")
    print(
        df.groupby("category")
        .agg(revenue=("revenue", "sum"), units=("quantity", "sum"))
        .sort_values("revenue", ascending=False)
        .round(2)
    )

    print("\nSTORE PERFORMANCE")
    print(df.groupby("store")["revenue"].sum().sort_values(ascending=False).round(2))

    monthly = df.groupby("month", as_index=False)["revenue"].sum()
    monthly.to_csv(OUTPUT_FILE, index=False)
    print(f"\nSaved {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
