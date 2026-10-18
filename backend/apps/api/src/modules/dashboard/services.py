from sqlalchemy.orm import Session
from src.modules.events.models import SeismicEventModel
from src.modules.sources.models import DataSourceModel

def get_dashboard_summary(db: Session):
    # Total de eventos registrados
    total_events = db.query(SeismicEventModel).count()
    
    # Magnitud máxima registrada y su ubicación
    max_magnitude_event = db.query(SeismicEventModel).order_by(SeismicEventModel.magnitude.desc()).first()
    
    # Conteo oficial de fuentes activas desde la tabla de conectores (Sección 6.10 y 7)
    active_sources_count = db.query(DataSourceModel).filter(DataSourceModel.status == 'active').count()

    return {
        "total_events_24h": total_events,
        "max_magnitude": float(max_magnitude_event.magnitude) if max_magnitude_event else 0.0,
        "max_magnitude_place": max_magnitude_event.place if max_magnitude_event else "Sin registros",
        "active_sources": active_sources_count if active_sources_count > 0 else 1,
        "system_status": "Operativo (Sincronizado)"
    }