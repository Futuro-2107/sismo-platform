from sqlalchemy.orm import Session
from src.modules.events.models import SeismicEventModel

def get_seismic_geojson(db: Session):
    events = db.query(SeismicEventModel).all()
    
    features = []
    for event in events:
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [float(event.longitude), float(event.latitude)]
            },
            "properties": {
                "id": event.id,
                "external_id": event.external_id,
                "magnitude": float(event.magnitude),
                "magnitude_type": event.magnitude_type,
                "depth_km": float(event.depth_km),
                "place": event.place,
                "occurred_at": str(event.occurred_at),
                "review_status": event.review_status
            }
        }
        features.append(feature)
        
    return {
        "type": "FeatureCollection",
        "features": features
    }