from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from src.core.database import get_db
from .schemas import SeismicEventResponse
from .services import get_seismic_events

router = APIRouter(prefix="/events", tags=["Eventos Sísmicos"])

@router.get("/", response_model=List[SeismicEventResponse])
def list_events(
    skip: int = 0,
    limit: int = 50,
    min_magnitude: Optional[float] = Query(None, description="Filtrar por magnitud mínima"),
    db: Session = Depends(get_db)
):
    """
    Retorna el catálogo paginado de eventos sísmicos registrados con filtros opcionales.
    """
    events = get_seismic_events(db=db, skip=skip, limit=limit, min_magnitude=min_magnitude)
    return events