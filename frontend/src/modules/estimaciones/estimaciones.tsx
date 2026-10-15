import React from 'react';

export const EstimacionesModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Estimaciones Experimentales (Machine Learning)</h1>
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-amber-900 text-sm">
        <span className="font-bold">Advertencia:</span> Estos resultados provienen de modelos estadísticos y de regresión experimentales. No equivalen a una predicción exacta ni constituyen una alerta oficial[cite: 2, 7, 8].
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">Modelo Activo: Regresión Múltiple Regional v1.2</h2>
        <p className="text-sm text-slate-600">Ventana temporal de análisis: Últimos 30 días operativas.</p>
        <div className="p-4 bg-slate-50 rounded border border-slate-200">
          <p className="text-xs text-slate-500 uppercase font-bold">Indicador de Riesgo Calculado</p>
          <p className="text-xl font-bold text-slate-800 mt-1">Nivel Moderado (Probabilidad estimada: 18.4%)</p>
        </div>
      </div>
    </div>
  );
};