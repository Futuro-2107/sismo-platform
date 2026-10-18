from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.core.database import get_db
from .services import get_all_datasets, generate_dataset_snapshot

router = APIRouter(prefix="/datasets", tags=["Preparación de Datos"])

@router.get("/")
def list_datasets(db: Session = Depends(get_db)):
    """Endpoint GET para listar los datasets registrados."""
    return get_all_datasets(db)

@router.post("/snapshot")
def create_snapshot(name: str = "sismos_peru_v1.csv", version: str = "v1.0", db: Session = Depends(get_db)):
    """Endpoint POST para generar una nueva instantánea de calidad de datos."""
    return generate_dataset_snapshot(db, name, version)