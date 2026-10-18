from sqlalchemy.orm import Session
from src.modules.events.models import SeismicEventModel
from .models import DatasetModel

def get_all_datasets(db: Session):
    """Consulta todos los datasets versionados y sus reportes de calidad."""
    return db.query(DatasetModel).all()

def generate_dataset_snapshot(db: Session, name: str, version: str):
    """Calcula métricas de calidad sobre los sismos actuales y guarda un snapshot."""
    events = db.query(SeismicEventModel).all()
    row_count = len(events)
    
    # Auditoría de calidad de datos requerida por el estándar empresarial
    null_depths = sum(1 for e in events if e.depth_km is None)
    null_magnitudes = sum(1 for e in events if e.magnitude is None)
    
    quality_report = {
        "status": "PASSED" if (null_depths == 0 and null_magnitudes == 0) else "WARNING",
        "null_depth_count": null_depths,
        "null_magnitude_count": null_magnitudes,
        "total_checked": row_count,
        "completeness_score": 100.0 if row_count == 0 else ((row_count - null_depths) / row_count) * 100
    }
    
    periods = [e.occurred_at for e in events if e.occurred_at]
    period_start = min(periods) if periods else None
    period_end = max(periods) if periods else None

    new_dataset = DatasetModel(
        name=name,
        version=version,
        period_start=period_start or func.now(),
        period_end=period_end or func.now(),
        row_count=row_count,
        quality_report=quality_report
    )
    
    db.add(new_dataset)
    db.commit()
    db.refresh(new_dataset)
    return new_dataset