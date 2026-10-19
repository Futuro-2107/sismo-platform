import React, { useEffect, useState } from 'react';

interface FuentesProps {
  isDarkMode: boolean;
}

export const FuentesModule: React.FC<FuentesProps> = ({ isDarkMode }) => {
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

    fetch(`${API_URL}/api/v1/sources/`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener las fuentes de datos');
        return res.json();
      })
      .then((data) => {
        setSources(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Administración de Fuentes de Datos
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
            Gestión de conectores y confiabilidad de la ingesta oficial
          </p>
        </div>
        <span className="px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-semibold rounded-full">
          Total Conectores: {sources.length}
        </span>
      </div>

      {/* Listado de Fuentes */}
      <div className="space-y-4">
        {loading ? (
          <div className={`${isDarkMode ? 'bg-[#0a0f1d] text-slate-300' : 'bg-white text-slate-600'} border p-6 rounded-xl shadow text-sm`}>
            Cargando conectores oficiales...
          </div>
        ) : sources.length === 0 ? (
          <div className={`${isDarkMode ? 'bg-[#0a0f1d] text-slate-400' : 'bg-white text-slate-500'} border p-6 rounded-xl shadow text-sm`}>
            No hay fuentes de datos registradas en la base de datos.
          </div>
        ) : (
          sources.map((source) => (
            <div
              key={source.id}
              className={`${
                isDarkMode ? 'bg-[#0a0f1d] border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900'
              } border p-5 rounded-xl shadow-lg flex justify-between items-center transition-colors`}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-base text-blue-500">{source.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                    {source.source_type}
                  </span>
                </div>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Organización: <strong className="text-slate-200">{source.organization}</strong> | URL Base: {source.base_url}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-semibold rounded-full flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                  <span>Estado: {source.status}</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Nota de seguridad exigida por el PDF */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-slate-400 text-xs">
        <strong className="block font-semibold mb-1 text-slate-300 uppercase tracking-wider">Seguridad de Credenciales:</strong>
        Los secretos de API y credenciales de conexión se gestionan mediante referencias cifradas y variables de entorno seguras, nunca en texto plano.
      </div>
    </div>
  );
};

export default FuentesModule;