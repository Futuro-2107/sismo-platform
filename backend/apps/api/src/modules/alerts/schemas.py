from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
from uuid import UUID

class AlertRuleCreate(BaseModel):
    name: str
    condition_json: Dict[str, Any]
    severity: str
    zone_spec: Dict[str, Any]
    channels: List[str]
    cooldown_seconds: int = 300
    enabled: bool = True

class AlertRuleResponse(AlertRuleCreate):
    id: UUID

    class Config:
        from_attributes = True

class AlertResponse(BaseModel):
    id: UUID
    event_id: UUID
    rule_id: UUID
    severity: str
    title: str
    message: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True