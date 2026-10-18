from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID

class SeismicEventResponse(BaseModel):
    id: UUID
    external_id: str
    source_id: UUID
    occurred_at: datetime
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    magnitude: float
    magnitude_type: str
    depth_km: float = Field(..., ge=0)
    place: str
    source_url: Optional[str] = None
    review_status: str

    class Config:
        from_attributes = True