from sqlalchemy import Column, String, DateTime, Text
from sqlalchemy.sql import func
from src.core.database import Base

class DataSourceModel(Base):
    __tablename__ = "data_sources"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    organization = Column(String, nullable=False)
    base_url = Column(String, nullable=False)
    source_type = Column(String, nullable=False) # e.g. 'api', 'rss', 'websocket'
    status = Column(String, nullable=False, default="active") # 'active', 'degraded', 'offline'
    last_sync_at = Column(DateTime(timezone=True), server_default=func.now())
    config_ref = Column(Text, nullable=True)