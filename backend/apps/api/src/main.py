from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware  # <--- 1. Importar
from sqlalchemy.orm import Session
from sqlalchemy import text
from src.core.database import get_db

from src.modules.events.router import router as events_router
from src.modules.dashboard.router import router as dashboard_router
from src.modules.sources.router import router as sources_router
from src.modules.map.router import router as map_router
from src.modules.analytics.router import router as analytics_router
from src.modules.datasets.router import router as datasets_router
from src.modules.ml.router import router as ml_router
from src.modules.alerts.router import router as alerts_router
from src.modules.audit.router import router as audit_router
from src.modules.estimates.router import router as estimates_router
from src.modules.reports.router import router as reports_router
from src.modules.auth.router import router as auth_router
from src.modules.users.router import router as users_router
from src.modules.settings.router import router as settings_router

app = FastAPI(
    title="SismoPlatform API",
    version="1.0.0",
    docs_url="/api/v1/docs",
    redoc_url="/api/v1/redoc"
)

# --- 2. Configurar CORS corporativo para permitir el frontend ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PREFIX = "/api/v1"

app.include_router(events_router, prefix=PREFIX)
app.include_router(dashboard_router, prefix=PREFIX)
app.include_router(sources_router, prefix=PREFIX)
app.include_router(map_router, prefix=PREFIX)
app.include_router(analytics_router, prefix=PREFIX)
app.include_router(datasets_router, prefix=PREFIX)
app.include_router(ml_router, prefix=PREFIX)
app.include_router(alerts_router, prefix=PREFIX)
app.include_router(audit_router, prefix=PREFIX)
app.include_router(estimates_router, prefix=PREFIX)
app.include_router(reports_router, prefix=PREFIX)
app.include_router(auth_router, prefix=PREFIX)
app.include_router(users_router, prefix=PREFIX)
app.include_router(settings_router, prefix=PREFIX)

@app.get(f"{PREFIX}/health", tags=["Salud del Sistema"])
def test_connection(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {
            "status": "success",
            "message": "¡Conexión exitosa a Supabase / PostgreSQL!",
            "database": "Conectado y operativo"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": "Fallo al conectar con la base de datos",
            "details": str(e)
        }