from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from uuid import UUID

class DataSourceResponse(BaseModel):
    id: UUID  # Cambiamos a UUID para que coincida exactamente con la base de datos
    name: str
    organization: str
    base_url: str
    source_type: str
    status: str
    last_sync_at: Optional[datetime] = None

    class Config:
        from_attributes = True