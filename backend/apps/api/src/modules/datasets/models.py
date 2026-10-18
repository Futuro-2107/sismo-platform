from sqlalchemy import Column, String, DateTime, Integer, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from src.core.database import Base

class DatasetModel(Base):
    __tablename__ = "datasets"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=func.uuid_generate_v4())
    name = Column(String, nullable=False)
    version = Column(String, nullable=False)
    query_spec = Column(JSON, nullable=True)
    period_start = Column(DateTime(timezone=True), nullable=False)
    period_end = Column(DateTime(timezone=True), nullable=False)
    row_count = Column(Integer, nullable=False)
    quality_report = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.timezone('utc', func.now()), nullable=False)