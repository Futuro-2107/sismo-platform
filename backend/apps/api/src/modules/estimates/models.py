import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import UUID
from src.core.database import Base

class RiskEstimateModel(Base):
    __tablename__ = "risk_estimates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    model_id = Column(UUID(as_uuid=True), ForeignKey("model_registry.id", ondelete="CASCADE"), nullable=False)
    area_code = Column(String, nullable=False)
    window_start = Column(DateTime(timezone=True), nullable=False)
    window_end = Column(DateTime(timezone=True), nullable=False)
    metric_name = Column(String, nullable=False)
    value = Column(Numeric, nullable=False)
    lower_bound = Column(Numeric, nullable=True)
    upper_bound = Column(Numeric, nullable=True)
    calculated_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    disclaimer = Column(String, nullable=False)