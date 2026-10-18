from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from uuid import UUID

class SystemSettingBase(BaseModel):
    setting_key: str
    setting_value: Dict[str, Any]
    description: Optional[str] = None

class SystemSettingCreate(SystemSettingBase):
    pass

class SystemSettingUpdate(BaseModel):
    setting_value: Dict[str, Any]
    description: Optional[str] = None

class SystemSettingResponse(SystemSettingBase):
    id: UUID
    updated_at: datetime

    class Config:
        from_attributes = True

# Esquema específico para la pantalla de preferencias operativas
class GeneralSettingsSchema(BaseModel):
    auto_sync: bool = True
    sync_interval_minutes: int = 15
    default_magnitude_threshold: float = 4.5
    email_alerts_enabled: bool = True
    sms_alerts_enabled: bool = False
    map_default_zoom: int = 6
    system_theme: str = "dark"