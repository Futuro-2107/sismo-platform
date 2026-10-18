from sqlalchemy.orm import Session
from .models import ProfileModel, RoleModel
from .schemas import ProfileCreate

def get_all_profiles(db: Session, limit: int = 50):
    return db.query(ProfileModel).limit(limit).all()

def create_profile(db: Session, profile_data: ProfileCreate):
    db_profile = ProfileModel(
        id=profile_data.id,
        full_name=profile_data.full_name,
        email=profile_data.email,
        status=profile_data.status
    )
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile