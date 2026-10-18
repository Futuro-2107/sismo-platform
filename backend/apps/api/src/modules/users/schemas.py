from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID
from typing import List, Optional

class RoleResponse(BaseModel):
    id: UUID
    name: str

    class Config:
        from_attributes = True

class ProfileResponse(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr
    status: str
    created_at: datetime
    roles: List[RoleResponse] = []

    class Config:
        from_attributes = True

class ProfileCreate(BaseModel):
    id: UUID  # El UUID que viene de Supabase Auth
    full_name: str
    email: EmailStr
    status: Optional[str] = "active"