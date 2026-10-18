from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID
from decimal import Decimal

class RiskEstimateResponse(BaseModel):
    id: UUID
    model_id: UUID
    area_code: str
    window_start: datetime
    window_end: datetime
    metric_name: str
    value: float  # Pydantic convierte automáticamente el tipo Numeric/Decimal a float para la API
    lower_bound: Optional[float] = None
    upper_bound: Optional[float] = None
    calculated_at: datetime
    disclaimer: str

    class Config:
        from_attributes = True