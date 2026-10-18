from sqlalchemy.orm import Session
from .models import ReportJobModel

def get_report_jobs(db: Session, limit: int = 50):
    return db.query(ReportJobModel).order_by(ReportJobModel.created_at.desc()).limit(limit).all()