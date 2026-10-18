from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from uuid import UUID

class ReportJobResponse(BaseModel):
    id: UUID
    requested_by: Optional[UUID] = None
    report_type: str
    filters_json: Dict[str, Any]
    status: str
    file_ref: Optional[str] = None
    created_at: datetime
    expires_at: datetime

    class Config:
        from_attributes = True