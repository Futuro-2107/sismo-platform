import React from 'react';

export const ReportesModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Generación de Reportes</h1>
      
      <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-4">
        <h2 className="font-semibold text-slate-800">Exportar Informes Operativos</h2>
        <p className="text-sm text-slate-600">Seleccione el formato y periodo para descargar reportes con trazabilidad de usuario y fuente de corte.</p>
        <div className="flex space-x-3 pt-2">
          <button className="px-4 py-2 bg-slate-800 text-white text-sm rounded font-medium hover:bg-slate-900">Exportar CSV</button>
          <button className="px-4 py-2 bg-slate-800 text-white text-sm rounded font-medium hover:bg-slate-900">Exportar PDF</button>
        </div>
      </div>
    </div>
  );
};

export default ReportesModule;