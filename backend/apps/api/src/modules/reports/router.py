from __future__ import annotations
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.core.database import get_db

from .schemas import ReportJobResponse
from .services import get_report_jobs

router = APIRouter(prefix="/reports", tags=["Reportes y Exportaciones"])

@router.get("/", response_model=List[ReportJobResponse])
def list_report_jobs(limit: int = 50, db: Session = Depends(get_db)):
    """
    Retorna el listado de trabajos de generación de reportes programados o completados.
    """
    return get_report_jobs(db, limit=limit)