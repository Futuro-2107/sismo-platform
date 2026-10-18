from __future__ import annotations
from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.core.database import get_db

from .schemas import AlertRuleCreate, AlertRuleResponse, AlertResponse
from .services import get_all_rules, create_alert_rule, get_recent_alerts, toggle_rule_status

router = APIRouter(prefix="/alerts", tags=["Centro de Alertas"])

@router.get("/rules", response_model=List[AlertRuleResponse])
def list_alert_rules(db: Session = Depends(get_db)):
    """
    Obtiene todas las reglas de alerta configuradas en el sistema.
    """
    return get_all_rules(db)

@router.post("/rules", response_model=AlertRuleResponse, status_code=status.HTTP_201_CREATED)
def add_alert_rule(rule: AlertRuleCreate, db: Session = Depends(get_db)):
    """
    Crea una nueva regla operativa de alerta.
    """
    return create_alert_rule(db, rule)

@router.get("/history", response_model=List[AlertResponse])
def list_recent_alerts(limit: int = 50, db: Session = Depends(get_db)):
    """
    Retorna el historial reciente de alertas emitidas por el sistema.
    """
    return get_recent_alerts(db, limit=limit)

@router.patch("/rules/{rule_id}/toggle", response_model=AlertRuleResponse)
def toggle_rule(rule_id: UUID, enabled: bool, db: Session = Depends(get_db)):
    """
    Habilita o deshabilita una regla de alerta específica.
    """
    updated_rule = toggle_rule_status(db, rule_id, enabled)
    if not updated_rule:
        raise HTTPException(status_code=404, detail="Regla de alerta no encontrada")
    return updated_rule