from __future__ import annotations
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.core.database import get_db
from .services import get_all_sources
from .schemas import DataSourceResponse
from typing import List

router = APIRouter(prefix="/sources", tags=["Fuentes de Datos"])

@router.get("/", response_model=List[DataSourceResponse])
def list_sources(db: Session = Depends(get_db)):
    """
    Lista todas las fuentes de datos y conectores oficiales configurados[cite: 6].
    """
    return get_all_sources(db)