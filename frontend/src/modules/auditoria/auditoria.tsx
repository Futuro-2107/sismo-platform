import React, { useEffect, useState } from 'react';

interface AuditoriaProps {
  isDarkMode: boolean;
}

export const AuditoriaModule: React.FC<AuditoriaProps> = ({ isDarkMode }) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Petición al endpoint del backend para obtener la bitácora de auditoría
    fetch('http://localhost:8000/api/v1/audit/logs')
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar los registros de auditoría:", err);
        setLoading(false);
      });
  }, []);

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
            Bitácora de Auditoría
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Registro inmutable de cambios de configuración, aprobaciones de modelos ML y ejecución de alertas críticas.
          </p>
        </div>
      </div>

      {/* Contenedor en formato de Tabla Profesional con soporte para Dark Mode */}
      <div className={`${isDarkMode ? 'bg-[#0a0f1d] border-slate-800' : 'bg-white border-slate-200'} rounded-xl shadow-sm border overflow-hidden transition-colors`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${isDarkMode ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'} border-b text-xs font-semibold uppercase tracking-wider`}>
                <th className="py-3.5 px-6">Acción</th>
                <th className="py-3.5 px-6">Tipo de Entidad</th>
                <th className="py-3.5 px-6">ID de Correlación</th>
                <th className="py-3.5 px-6">Fecha y Hora</th>
                <th className="py-3.5 px-6 text-right">Detalles</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'} text-sm`}>
              {loading ? (
                <tr>
                  <td colSpan={5} className={`py-8 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Cargando registros de auditoría...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className={`py-8 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    No hay registros de auditoría en la base de datos.
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr key={log.id || index} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className={`py-4 px-6 font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'} flex items-center gap-2`}>
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span>
                      {log.action}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-mono text-xs ${isDarkMode ? 'text-cyan-300 bg-cyan-950/50 border-cyan-900' : 'text-cyan-700 bg-cyan-50 border-cyan-200'} border rounded px-2 py-1 inline-block`}>
                        {log.entity_type}
                      </span>
                    </td>
                    <td className={`py-4 px-6 font-mono text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {log.correlation_id || 'N/A'}
                    </td>
                    <td className={`py-4 px-6 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {formatDateTime(log.occurred_at)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className={`${isDarkMode ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-400 hover:text-cyan-600'} font-medium text-xs px-2 py-1 transition`}>
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditoriaModule;