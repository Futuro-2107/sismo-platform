import React from 'react';

export const DashboardModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Panel Ejecutivo / Dashboard</h1>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
          Estado del Sistema: Operativo
        </span>
      </div>

      {/* Tarjetas KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
          <p className="text-sm text-slate-500">Sismos (Últimas 24h)</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">24</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
          <p className="text-sm text-slate-500">Magnitud Máxima</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">5.4 Mw</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
          <p className="text-sm text-slate-500">Fuentes Activas</p>
          <p className="text-2xl font-bold text-cyan-600 mt-1">IGP / Observatorio</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
          <p className="text-sm text-slate-500">Alertas Enviadas</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">2</p>
        </div>
      </div>

      {/* Panel Informativo de Advertencia Científica */}
      <div className="bg-cyan-50 border-l-4 border-cyan-600 p-4 text-cyan-900 text-sm">
        <p className="font-semibold">Nota Metodológica:</p>
        <p>El sistema diferencia estrictamente los eventos observados de las estimaciones estadísticas experimentales. Ninguna salida probabilística se emite como alerta automática sin validación oficial.</p>
      </div>
    </div>
  );
};