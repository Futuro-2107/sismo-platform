import React, { useEffect, useState } from 'react';

interface DatosProps {
  isDarkMode?: boolean;
}

export const DatosModule: React.FC<DatosProps> = ({ isDarkMode = true }) => {
  const [datasets, setDatasets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDatasets = () => {
    setLoading(true);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    fetch(`${API_URL}/api/v1/datasets/`)
      .then((res) => res.json())
      .then((data) => {
        setDatasets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al conectar con datasets:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const handleCreateSnapshot = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    fetch(`${API_URL}/api/v1/datasets/snapshot?name=sismos_peru_v1.csv&version=v1.0`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then(() => {
        fetchDatasets();
      })
      .catch((err) => console.error(err));
  };

  const latestDataset = datasets[datasets.length - 1];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Preparación de Datos y Control de Calidad
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
            Auditoría de integridad, detección de nulos y versionado inmutable de datasets
          </p>
        </div>
        <button
          onClick={handleCreateSnapshot}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow transition-colors"
        >
          + Generar Snapshot Oficial
        </button>
      </div>

      {/* Panel de Dataset Activo */}
      <div className={`${isDarkMode ? 'bg-[#0a0f1d] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border p-6 rounded-xl shadow-xl space-y-4`}>
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <h3 className="text-sm font-bold">
            Dataset Activo: <span className="text-blue-400 font-mono">{latestDataset?.name || 'sismos_peru_v1.csv'}</span>
          </h3>
          <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-semibold rounded-full">
            Calidad Aprobada ({latestDataset?.quality_report?.completeness_score || 100}%)
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block uppercase">Registros Totales</span>
            <span className="text-xl font-bold text-slate-100">{loading ? '...' : (latestDataset?.row_count || 0)}</span>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block uppercase">Valores Nulos Detectados</span>
            <span className="text-xl font-bold text-slate-100">
              {loading ? '...' : (latestDataset?.quality_report?.null_depth_count || 0)}
            </span>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block uppercase">Versión del Snapshot</span>
            <span className="text-xl font-bold text-blue-400 font-mono">{loading ? '...' : (latestDataset?.version || 'v1.0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosModule;