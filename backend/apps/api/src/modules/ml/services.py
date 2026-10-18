from sqlalchemy.orm import Session
from .models import MLExperimentModel
from src.modules.datasets.models import DatasetModel

def get_all_experiments(db: Session):
    return db.query(MLExperimentModel).all()

def create_sample_experiment(db: Session):
    # Buscar el dataset más reciente para enlazarlo de forma trazable
    latest_dataset = db.query(DatasetModel).order_by(DatasetModel.created_at.desc()).first()
    dataset_id = latest_dataset.id if latest_dataset else None

    new_exp = MLExperimentModel(
        name="Random Forest v1.1",
        task_type="Clasificación por Rangos",
        algorithm="RandomForestClassifier",
        dataset_id=dataset_id,  # <- Ahora enlaza dinámicamente al dataset existente
        feature_spec={"features": ["latitude", "longitude", "depth_km"]},
        target_name="magnitude_range",
        params={"n_estimators": 100, "max_depth": 10},
        metrics={"f1_score": 0.84, "accuracy": 0.89},
        validation_spec={"method": "k-fold", "folds": 5},
        status="completed",
        artifact_uri="s3://sismo-artifacts/models/rf_v1.1.pkl"
    )
    db.add(new_exp)
    db.commit()
    db.refresh(new_exp)
    return new_exp