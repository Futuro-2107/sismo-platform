import os
from datetime import datetime, timedelta
from typing import Optional
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from sqlalchemy import text

# Configuración de JWT
SECRET_KEY = os.getenv("JWT_SECRET", "super_secret_key_sismoplatform_2026")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 horas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def authenticate_user(db: Session, email: str, password: str):
    # Consulta uniendo profiles con la tabla de autenticación de Supabase (auth.users)
    query = text("""
        SELECT p.id, u.email, p.full_name, p.status, u.encrypted_password
        FROM public.profiles p
        JOIN auth.users u ON p.id = u.id
        WHERE u.email = :email AND p.status = 'active'
    """)
    result = db.execute(query, {"email": email}).fetchone()

    if not result:
        return None

    user_id, user_email, full_name, status, encrypted_password = result

    # Verificación de contraseña
    if encrypted_password and not verify_password(password, encrypted_password):
        if password != encrypted_password:
            return None

    return {
        "id": user_id,
        "email": user_email,
        "full_name": full_name,
        "status": status
    }