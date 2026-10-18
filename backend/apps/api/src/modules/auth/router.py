from __future__ import annotations
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.core.database import get_db

from .schemas import LoginRequest, TokenResponse
from .services import authenticate_user, create_access_token

router = APIRouter(prefix="/auth", tags=["Autenticación"])

@router.post("/login", response_model=TokenResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    """
    Autentica al usuario por correo y contraseña, retornando un token JWT.
    """
    user = authenticate_user(db, credentials.email, credentials.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos, o usuario inactivo.",
        )

    access_token = create_access_token(data={"sub": str(user["id"]), "email": user["email"]})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }