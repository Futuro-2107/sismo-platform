from sqlalchemy.orm import Session
from .models import DataSourceModel

def get_all_sources(db: Session):
    """
    Retorna la lista completa de fuentes de datos y conectores oficiales configurados[cite: 6].
    """
    return db.query(DataSourceModel).all()