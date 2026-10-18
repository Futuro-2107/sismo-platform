from sqlalchemy.orm import Session
from uuid import UUID
from .models import AlertRuleModel, AlertModel
from .schemas import AlertRuleCreate

def get_all_rules(db: Session):
    return db.query(AlertRuleModel).all()

def create_alert_rule(db: Session, rule_data: AlertRuleCreate):
    new_rule = AlertRuleModel(
        name=rule_data.name,
        condition_json=rule_data.condition_json,
        severity=rule_data.severity,
        zone_spec=rule_data.zone_spec,
        channels=rule_data.channels,
        cooldown_seconds=rule_data.cooldown_seconds,
        enabled=rule_data.enabled
    )
    db.add(new_rule)
    db.commit()
    db.refresh(new_rule)
    return new_rule

def get_recent_alerts(db: Session, limit: int = 50):
    return db.query(AlertModel).order_by(AlertModel.created_at.desc()).limit(limit).all()

def toggle_rule_status(db: Session, rule_id: UUID, enabled: bool):
    rule = db.query(AlertRuleModel).filter(AlertRuleModel.id == rule_id).first()
    if rule:
        rule.enabled = enabled
        db.commit()
        db.refresh(rule)
    return rule