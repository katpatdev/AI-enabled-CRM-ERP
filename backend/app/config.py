from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Mare Arabia CRM/ERP"
    database_url: str = "sqlite:///./mare_arabia.db"
    openai_api_key: str | None = None
    google_api_key: str | None = None
    seller_name: str = "Mare Arabia Cruises LLC"
    seller_vat: str = "310123456700003"
    ship_name: str = "MS Horizon Pearl"
    ship_lat: float = 21.4858  # approx Jeddah corridor
    ship_lon: float = 39.1925
    edge_online_default: bool = True

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
