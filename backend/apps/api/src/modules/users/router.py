from __future__ import annotations
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core.database import get_db

from .schemas import ProfileResponse, ProfileCreate
from .services import get_all_profiles, create_profile

router = APIRouter(prefix="/users", tags=["Usuarios y Roles"])

@router.get("/", response_model=List[ProfileResponse])
def list_users(limit: int = 50, db: Session = Depends(get_db)):
    """
    Lista los perfiles de usuario registrados en la plataforma.
    """
    return get_all_profiles(db, limit=limit)

@router.post("/", response_model=ProfileResponse)
def register_user_profile(profile: ProfileCreate, db: Session = Depends(get_db)):
    """
    Registra el perfil público de un usuario autenticado.
    """
    try:
        return create_profile(db, profile)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))