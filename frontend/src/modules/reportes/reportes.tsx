import React, { useEffect, useState } from 'react';

interface ReportesProps {
  isDarkMode: boolean;
}

export const ReportesModule: React.FC<ReportesProps> = ({ isDarkMode }) => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Detecta la URL de Render en producción o usa localhost en desarrollo
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    fetch(`${API_URL}/api/v1/reports/`)
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar reportes:", err);
        setLoading(false);
      });
  }, []);

  // Función para formatear fechas de forma segura
  const formatDate = (dateString: any) => {
    if (!dateString) return '---';
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime()) ? String(dateString) : parsed.toLocaleDateString();
  };

  const formatDateTime = (dateString: any) => {
    if (!dateString) return '---';
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime()) ? String(dateString) : parsed.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Centro de Reportes y Exportaciones
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Historial y descarga de reportes ejecutivos, análisis sísmicos consolidados y exportaciones auditables.
          </p>
        </div>
      </div>

      {/* Contenedor en formato de Tabla Profesional con soporte para Dark Mode */}
      <div className={`${isDarkMode ? 'bg-[#0a0f1d] border-slate-800' : 'bg-white border-slate-200'} rounded-xl shadow-sm border overflow-hidden transition-colors`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${isDarkMode ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'} border-b text-xs font-semibold uppercase tracking-wider`}>
                <th className="py-3.5 px-6">Tipo de Reporte</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6">Archivo Referenciado</th>
                <th className="py-3.5 px-6">Expiración</th>
                <th className="py-3.5 px-6">Fecha de Creación</th>
                <th className="py-3.5 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'} text-sm`}>
              {loading ? (
                <tr>
                  <td colSpan={6} className={`py-8 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Cargando reportes generados...
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={6} className={`py-8 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    No hay tareas de reportes registradas en la base de datos.
                  </td>
                </tr>
              ) : (
                reports.map((report) => {
                  const isReady = report.status?.toLowerCase() === 'ready';
                  const isProcessing = report.status?.toLowerCase() === 'processing';

                  // Badges dinámicos para el estado con soporte dark mode
                  const statusBg = isReady
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900'
                    : isProcessing
                    ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900'
                    : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';

                  return (
                    <tr key={report.id} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}>
                      <td className={`py-4 px-6 font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'} flex items-center gap-2`}>
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span>
                        {report.report_type}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase ${statusBg}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs">
                        {report.file_ref ? (
                          <span className={`${isDarkMode ? 'text-cyan-300 bg-cyan-950/50 border-cyan-900' : 'text-cyan-700 bg-cyan-50 border-cyan-200'} border rounded px-2 py-1 inline-block`}>
                            {report.file_ref}
                          </span>
                        ) : (
                          <span className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'} italic`}>En proceso...</span>
                        )}
                      </td>
                      <td className={`py-4 px-6 text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {formatDate(report.expires_at)}
                      </td>
                      <td className={`py-4 px-6 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {formatDateTime(report.created_at)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {isReady ? (
                          <button className="px-3 py-1 bg-cyan-600 text-white text-xs font-medium rounded hover:bg-cyan-700 transition shadow-sm">
                            Descargar
                          </button>
                        ) : (
                          <button disabled className={`px-3 py-1 ${isDarkMode ? 'bg-slate-800 text-slate-500 border-slate-700' : 'bg-slate-100 text-slate-400 border-slate-200'} text-xs font-medium rounded cursor-not-allowed border`}>
                            Procesando
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportesModule;