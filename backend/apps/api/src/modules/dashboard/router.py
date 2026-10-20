from __future__ import annotations
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.core.database import get_db
from .services import get_dashboard_summary

router = APIRouter(prefix="/dashboard", tags=["Dashboard Ejecutivo"])

@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db)):
    """
    Retorna los KPIs ejecutivos y el estado operativo de la plataforma.
    """
    return get_dashboard_summary(db)