from __future__ import annotations
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.core.database import get_db
from .services import get_seismic_geojson

router = APIRouter(prefix="/map", tags=["Mapa Sísmico"])

@router.get("/geojson")
def seismic_geojson(db: Session = Depends(get_db)):
    """
    Retorna los eventos sísmicos en formato GeoJSON para representación espacial[cite: 5].
    """
    return get_seismic_geojson(db)