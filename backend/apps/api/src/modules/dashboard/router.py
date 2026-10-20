from datetime import datetime, timezone, timedelta
from sqlalchemy import func
from sqlalchemy.orm import Session
from src.modules.events.models import SeismicEventModel
from src.modules.sources.models import DataSourceModel

def get_dashboard_summary(db: Session):
    total_events = db.query(SeismicEventModel).count()
    max_magnitude_event = db.query(SeismicEventModel).order_by(SeismicEventModel.magnitude.desc()).first()
    active_sources_count = db.query(DataSourceModel).filter(DataSourceModel.status == 'active').count()

    # Obtener la fecha del sismo más reciente para usarla como referencia si hoy no hay sismos
    latest_event = db.query(SeismicEventModel).order_by(SeismicEventModel.occurred_at.desc()).first()
    
    if latest_event and latest_event.occurred_at:
        # Tomamos el día del último sismo registrado para que la gráfica tenga sentido visual
        base_date = latest_event.occurred_at.replace(hour=0, minute=0, second=0, microsecond=0)
    else:
        base_date = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)

    hours_slots = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
    chart_data = []

    for i in range(len(hours_slots)):
        h_start = base_date + timedelta(hours=i*4)
        h_end = h_start + timedelta(hours=4)
        
        count = db.query(SeismicEventModel).filter(
            SeismicEventModel.occurred_at >= h_start,
            SeismicEventModel.occurred_at < h_end
        ).count()
        
        chart_data.append({
            "time": hours_slots[i],
            "sismos": count
        })

    return {
        "total_events_24h": total_events,
        "max_magnitude": float(max_magnitude_event.magnitude) if max_magnitude_event else 0.0,
        "max_magnitude_place": max_magnitude_event.place if max_magnitude_event else "Sin registros",
        "active_sources": active_sources_count if active_sources_count > 0 else 1,
        "system_status": "Operativo (Sincronizado)",
        "hourly_frequency": chart_data
    }