from sqlalchemy.orm import Session
from .models import AuditLogModel

def get_audit_logs(db: Session, limit: int = 100):
    return db.query(AuditLogModel).order_by(AuditLogModel.occurred_at.desc()).limit(limit).all()