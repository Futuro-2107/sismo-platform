import React from 'react';

export const AnalisisModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Análisis Estadístico e Histórico</h1>
      <p className="text-sm text-slate-600">Estudio descriptivo de la distribución de eventos, frecuencias por magnitud y profundidad.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-3">
          <h2 className="font-semibold text-slate-800">Distribución por Rangos de Magnitud</h2>
          <div className="h-48 bg-slate-50 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-sm">
            Gráfica de Frecuencia (Recharts)
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-3">
          <h2 className="font-semibold text-slate-800">Relación Magnitud vs. Profundidad (km)</h2>
          <div className="h-48 bg-slate-50 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-sm">
            Dispersión de Eventos Registrados
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalisisModule;