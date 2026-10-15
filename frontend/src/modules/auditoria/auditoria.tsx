import React from 'react';

export const AuditoriaModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Bitácora de Auditoría</h1>
      
      <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
        <p className="text-sm text-slate-600">Registro inmutable de cambios de configuración, aprobaciones de modelos ML y ejecución de alertas críticas.</p>
      </div>
    </div>
  );
};

export default AuditoriaModule;