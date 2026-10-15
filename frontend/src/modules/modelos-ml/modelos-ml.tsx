import React from 'react';

export const ModelosMlModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Modelos de Machine Learning (Experimentos)</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-6 py-3 font-semibold">Modelo / Algoritmo</th>
              <th className="px-6 py-3 font-semibold">Tarea / Objetivo</th>
              <th className="px-6 py-3 font-semibold">Métrica Clave</th>
              <th className="px-6 py-3 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            <tr>
              <td className="px-6 py-4 font-medium text-slate-900">Random Forest v1.1</td>
              <td className="px-6 py-4 text-slate-600">Clasificación por Rangos</td>
              <td className="px-6 py-4 text-slate-600">F1-Score: 0.84</td>
              <td className="px-6 py-4"><span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded font-semibold">Aprobado</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModelosMlModule;