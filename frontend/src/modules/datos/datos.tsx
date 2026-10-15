import React from 'react';

export const DatosModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Preparación de Datos y Control de Calidad</h1>
      
      <div className="bg-white shadow rounded-lg p-6 border border-slate-200 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-slate-800">Dataset Activo: sismos_peru_v1.csv</h2>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded border border-emerald-200">Calidad Aprobada (99.2%)</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm bg-slate-50 p-4 rounded border border-slate-200">
          <div><span className="text-slate-500 block">Registros Totales:</span> <strong className="text-slate-800">14,250</strong></div>
          <div><span className="text-slate-500 block">Duplicados Eliminados:</span> <strong className="text-slate-800">12</strong></div>
          <div><span className="text-slate-500 block">Valores Nulos:</span> <strong className="text-slate-800">0%</strong></div>
        </div>
      </div>
    </div>
  );
};

export default DatosModule;