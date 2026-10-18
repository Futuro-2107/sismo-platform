from sqlalchemy.orm import Session
from .models import SystemSettingModel
from .schemas import SystemSettingCreate, SystemSettingUpdate

def get_all_settings(db: Session):
    return db.query(SystemSettingModel).all()

def get_setting_by_key(db: Session, key: str):
    return db.query(SystemSettingModel).filter(SystemSettingModel.setting_key == key).first()

def upsert_setting(db: Session, key: str, setting_data: SystemSettingUpdate):
    db_setting = get_setting_by_key(db, key)
    if db_setting:
        db_setting.setting_value = setting_data.setting_value
        if setting_data.description:
            db_setting.description = setting_data.description
    else:
        db_setting = SystemSettingModel(
            setting_key=key,
            setting_value=setting_data.setting_value,
            description=setting_data.description
        )
        db.add(db_setting)
    
    db.commit()
    db.refresh(db_setting)
    return db_setting