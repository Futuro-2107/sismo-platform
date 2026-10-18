from __future__ import annotations
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.core.database import get_db
from .services import get_analytics_summary

router = APIRouter(prefix="/analytics", tags=["Análisis Estadístico"])

@router.get("/summary")
def analytics_summary(db: Session = Depends(get_db)):
    """
    Retorna datos estadísticos, distribución de magnitudes y series temporales para el análisis descriptivo.
    """
    return get_analytics_summary(db)