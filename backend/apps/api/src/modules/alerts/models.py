import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, Integer, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from src.core.database import Base

class AlertRuleModel(Base):
    __tablename__ = "alert_rules"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    condition_json = Column(JSON, nullable=False)
    severity = Column(String, nullable=False)  # 'low', 'medium', 'high', 'critical'
    zone_spec = Column(JSON, nullable=False)
    channels = Column(JSON, nullable=False)    # ["email", "sms", "webhook"]
    cooldown_seconds = Column(Integer, default=300, nullable=False)
    enabled = Column(Boolean, default=True, nullable=False)


class AlertModel(Base):
    __tablename__ = "alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_id = Column(UUID(as_uuid=True), ForeignKey("seismic_events.id", ondelete="CASCADE"), nullable=False)
    rule_id = Column(UUID(as_uuid=True), ForeignKey("alert_rules.id", ondelete="CASCADE"), nullable=False)
    severity = Column(String, nullable=False)
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    status = Column(String, default="pending", nullable=False) # 'pending', 'approved', 'sent', 'failed'
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)