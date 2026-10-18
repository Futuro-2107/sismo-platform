from sqlalchemy import Column, String, DateTime, JSON, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from src.core.database import Base

class MLExperimentModel(Base):
    __tablename__ = "ml_experiments"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=func.uuid_generate_v4())
    name = Column(String, nullable=False)
    task_type = Column(String, nullable=False)
    algorithm = Column(String, nullable=False)
    dataset_id = Column(UUID(as_uuid=True), ForeignKey("datasets.id"), nullable=True)
    feature_spec = Column(JSON, nullable=False)
    target_name = Column(String, nullable=False)
    params = Column(JSON, nullable=False)
    metrics = Column(JSON, nullable=False)
    validation_spec = Column(JSON, nullable=False)
    status = Column(String, default="completed")
    artifact_uri = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.timezone('utc', func.now()), nullable=False)