from __future__ import annotations
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core.database import get_db

from .schemas import SystemSettingResponse, SystemSettingUpdate, GeneralSettingsSchema
from .services import get_all_settings, get_setting_by_key, upsert_setting

router = APIRouter(prefix="/settings", tags=["Configuración del Sistema"])

@router.get("/", response_model=List[SystemSettingResponse])
def list_settings(db: Session = Depends(get_db)):
    """
    Obtiene todas las configuraciones del sistema registradas.
    """
    return get_all_settings(db)

@router.get("/{key}", response_model=SystemSettingResponse)
def read_setting(key: str, db: Session = Depends(get_db)):
    """
    Obtiene una configuración específica por su clave identificadora.
    """
    setting = get_setting_by_key(db, key)
    if not setting:
        raise HTTPException(status_code=404, detail=f"Configuración '{key}' no encontrada.")
    return setting

@router.put("/{key}", response_model=SystemSettingResponse)
def update_setting(key: str, setting_data: SystemSettingUpdate, db: Session = Depends(get_db)):
    """
    Crea o actualiza la configuración asociada a una clave (ej. 'general_preferences').
    """
    return upsert_setting(db, key, setting_data)