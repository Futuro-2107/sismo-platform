from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.core.database import get_db
from .services import get_all_experiments, create_sample_experiment

router = APIRouter(prefix="/ml", tags=["Modelos de Machine Learning"])

@router.get("/experiments")
def list_experiments(db: Session = Depends(get_db)):
    """Retorna la lista de experimentos y modelos registrados."""
    experiments = get_all_experiments(db)
    if not experiments:
        # Si está vacío, sembramos uno por defecto para visualización inmediata
        create_sample_experiment(db)
        experiments = get_all_experiments(db)
    return experiments