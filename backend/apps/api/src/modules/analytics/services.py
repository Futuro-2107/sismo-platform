from sqlalchemy.orm import Session
from src.modules.events.models import SeismicEventModel

def get_analytics_summary(db: Session):
    events = db.query(SeismicEventModel).all()
    
    magnitude_distribution = {"3.0 - 3.9": 0, "4.0 - 4.9": 0, "5.0 - 5.9": 0, "6.0+": 0}
    temporal_counts = {}
    depth_magnitude_data = []
    
    for event in events:
        mag = float(event.magnitude)
        depth = float(event.depth_km) if event.depth_km else 0.0
        
        # Clasificación por rangos de magnitud
        if 3.0 <= mag < 4.0:
            magnitude_distribution["3.0 - 3.9"] += 1
        elif 4.0 <= mag < 5.0:
            magnitude_distribution["4.0 - 4.9"] += 1
        elif 5.0 <= mag < 6.0:
            magnitude_distribution["5.0 - 5.9"] += 1
        elif mag >= 6.0:
            magnitude_distribution["6.0+"] += 1
            
        # Agrupación temporal por fecha (YYYY-MM-DD)
        date_str = str(event.occurred_at)[:10] if event.occurred_at else "Desconocida"
        temporal_counts[date_str] = temporal_counts.get(date_str, 0) + 1
        
        # Dispersión profundidad vs magnitud
        depth_magnitude_data.append({
            "profundidad": depth,
            "magnitud": mag
        })
        
    # Formatear serie temporal ordenada
    temporal_data = [{"fecha": k, "eventos": v} for k, v in sorted(temporal_counts.items())]
    
    # Formatear distribución de magnitud
    magnitude_data = [{"rango": k, "cantidad": v} for k, v in magnitude_distribution.items()]

    return {
        "total_sample": len(events),
        "temporalData": temporal_data,
        "magnitudeData": magnitude_data,
        "depthMagnitudeData": depth_magnitude_data
    }