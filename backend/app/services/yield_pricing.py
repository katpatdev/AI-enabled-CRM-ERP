"""Simple demand-based yield pricing for onboard / shore offers."""


def yield_price(base: float, demand: float, booked: int, capacity: int) -> float:
    if base <= 0:
        return 0.0
    fill = booked / capacity if capacity else 0
    # Lift price when demand and fill are high (up to +35%)
    uplift = 1.0 + 0.2 * demand + 0.15 * fill
    return round(base * uplift, 2)
