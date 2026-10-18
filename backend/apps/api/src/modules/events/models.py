from sqlalchemy import Column, String, Numeric, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from src.core.database import Base
import datetime

class SeismicEventModel(Base):
    __tablename__ = "seismic_events"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default="uuid_generate_v4()")
    external_id = Column(String, nullable=False)
    source_id = Column(UUID(as_uuid=True), ForeignKey("data_sources.id"), nullable=False)
    occurred_at = Column(DateTime(timezone=True), nullable=False)
    latitude = Column(Numeric, nullable=False)
    longitude = Column(Numeric, nullable=False)
    magnitude = Column(Numeric, nullable=False)
    magnitude_type = Column(String, nullable=False)
    depth_km = Column(Numeric, nullable=False)
    place = Column(String, nullable=False)
    source_url = Column(Text, nullable=True)
    received_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)
    review_status = Column(String, default="observed")