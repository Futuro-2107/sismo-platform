import React, { useEffect, useState } from 'react';

interface ModelosMLProps {
  isDarkMode?: boolean;
}

export const ModelosMlModule: React.FC<ModelosMLProps> = ({ isDarkMode = true }) => {
  const [experiments, setExperiments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Detecta la URL de Render en producción o usa localhost en desarrollo
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    fetch(`${API_URL}/api/v1/ml/experiments`)
      .then((res) => res.json())
      .then((data) => {
        setExperiments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar experimentos ML:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Modelos de Machine Learning (Experimentos)
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
            Seguimiento de entrenamiento, hiperparámetros y métricas de rendimiento en producción
          </p>
        </div>
      </div>

      {/* Tabla de Modelos y Experimentos */}
      <div className={`${isDarkMode ? 'bg-[#0a0f1d] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl shadow-lg overflow-hidden`}>
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-sm font-bold">Registro de Modelos Registrados</h3>
          <span className="text-xs text-slate-400">Total: {experiments.length} experimentos</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`${isDarkMode ? 'bg-slate-900/80 text-slate-400' : 'bg-slate-100 text-slate-600'} uppercase font-medium`}>
              <tr>
                <th className="px-4 py-3">Modelo / Algoritmo</th>
                <th className="px-4 py-3">Tarea / Objetivo</th>
                <th className="px-4 py-3">Métrica Clave</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-slate-400">Cargando experimentos...</td>
                </tr>
              ) : experiments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-slate-400">No hay experimentos registrados.</td>
                </tr>
              ) : (
                experiments.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      {exp.name} <span className="text-[10px] text-slate-400 block font-mono">Algoritmo: {exp.algorithm}</span>
                    </td>
                    <td className="px-4 py-3">{exp.task_type}</td>
                    <td className="px-4 py-3 font-mono text-blue-400">
                      F1-Score: {exp.metrics?.f1_score || 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-[10px] font-semibold">
                        Aprobado
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Exportamos también con mayúscula por si acaso
export const ModelosMLModule = ModelosMlModule;
export default ModelosMlModule;