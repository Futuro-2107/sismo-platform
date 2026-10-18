from __future__ import annotations
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.core.database import get_db

from .schemas import RiskEstimateResponse
from .services import get_risk_estimates

router = APIRouter(prefix="/estimates", tags=["Estimaciones Experimentales"])

@router.get("/", response_model=List[RiskEstimateResponse])
def list_risk_estimates(limit: int = 50, db: Session = Depends(get_db)):
    """
    Retorna el listado de estimaciones de riesgo y modelos experimentales.
    """
    return get_risk_estimates(db, limit=limit)