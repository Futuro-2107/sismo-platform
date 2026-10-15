import React from 'react';

export const ConfiguracionModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Configuración del Sistema</h1>
      
      <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-4">
        <h2 className="font-semibold text-slate-800">Parámetros Globales</h2>
        <p className="text-sm text-slate-600">Ajuste de tiempos de retención de datos, variables de entorno y políticas de seguridad generales.</p>
      </div>
    </div>
  );
};

export default ConfiguracionModule;