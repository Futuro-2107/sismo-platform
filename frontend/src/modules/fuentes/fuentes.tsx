import React from 'react';

export const FuentesModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Administración de Fuentes de Datos</h1>
      
      <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-bold text-slate-900">Instituto Geofísico del Perú (IGP)</h3>
            <p className="text-xs text-slate-500">API Oficial / Sincronización Automática cada 10 min</p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">Sincronizado (Latencia: 1.2s)</span>
        </div>
      </div>
    </div>
  );
};

export default FuentesModule;