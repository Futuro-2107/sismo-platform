from sqlalchemy.orm import Session
from .models import SeismicEventModel

def get_seismic_events(db: Session, skip: int = 0, limit: int = 50, min_magnitude: float = None):
    query = db.query(SeismicEventModel)
    
    if min_magnitude is not None:
        query = query.filter(SeismicEventModel.magnitude >= min_magnitude)
        
    return query.order_by(SeismicEventModel.occurred_at.desc()).offset(skip).limit(limit).all()