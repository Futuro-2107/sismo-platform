import React from 'react';

export const AlertasModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Centro de Alertas y Reglas Operativas</h1>
      
      <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-slate-800">Reglas Activas Configuradas</h2>
          <button className="px-3 py-1.5 bg-cyan-600 text-white text-sm rounded font-medium hover:bg-cyan-700">Nueva Regla</button>
        </div>
        <p className="text-sm text-slate-600">Gestión de umbrales por magnitud mínima, zona geográfica y canales de distribución verificados.</p>
      </div>
    </div>
  );
};

export default AlertasModule;