from sqlalchemy.orm import Session
from .models import RiskEstimateModel

def get_risk_estimates(db: Session, limit: int = 50):
    return db.query(RiskEstimateModel).order_by(RiskEstimateModel.calculated_at.desc()).limit(limit).all()