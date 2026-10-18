from __future__ import annotations
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.core.database import get_db

from .schemas import AuditLogResponse
from .services import get_audit_logs

router = APIRouter(prefix="/audit", tags=["Auditoría y Trazabilidad"])

@router.get("/logs", response_model=List[AuditLogResponse])
def list_audit_logs(limit: int = 100, db: Session = Depends(get_db)):
    """
    Retorna el registro histórico de auditoría y acciones ejecutadas en el sistema.
    """
    return get_audit_logs(db, limit=limit)