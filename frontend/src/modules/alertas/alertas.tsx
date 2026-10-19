import React, { useEffect, useState } from 'react';

interface AlertasProps {
  isDarkMode: boolean;
}

export const AlertasModule: React.FC<AlertasProps> = ({ isDarkMode }) => {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Detecta dinámicamente la URL de Render en producción (Vercel) o localhost en desarrollo
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    fetch(`${API_URL}/api/v1/alerts/rules`)
      .then((res) => res.json())
      .then((data) => {
        setRules(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar las reglas de alertas:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          {/* Título dinámico según el tema */}
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Centro de Alertas y Reglas Operativas
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Gestión de umbrales por magnitud mínima, zona geográfica y canales de distribución verificados.
          </p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 text-white font-medium text-sm rounded-lg hover:bg-cyan-700 transition shadow-sm flex items-center gap-2">
          <span>+ Nueva Regla</span>
        </button>
      </div>

      {/* Contenedor de la Tabla adaptable */}
      <div className={`${isDarkMode ? 'bg-[#0a0f1d] border-slate-800' : 'bg-white border-slate-200'} rounded-xl shadow-sm border overflow-hidden transition-colors`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${isDarkMode ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'} border-b text-xs font-semibold uppercase tracking-wider`}>
                <th className="py-3.5 px-6">Nombre de la Regla</th>
                <th className="py-3.5 px-6">Severidad</th>
                <th className="py-3.5 px-6">Canales de Distribución</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'} text-sm`}>
              {loading ? (
                <tr>
                  <td colSpan={5} className={`py-8 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Cargando reglas operativas...
                  </td>
                </tr>
              ) : rules.length === 0 ? (
                <tr>
                  <td colSpan={5} className={`py-8 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    No hay reglas de alerta configuradas en la base de datos.
                  </td>
                </tr>
              ) : (
                rules.map((rule) => {
                  const severityBg = rule.severity === 'HIGH' || rule.severity === 'ALTA'
                    ? 'bg-rose-50 text-rose-700 border-rose-200' 
                    : 'bg-amber-50 text-amber-700 border-amber-200';

                  const channelsText = Array.isArray(rule.channels) 
                    ? rule.channels.join(', ') 
                    : rule.channels;

                  return (
                    <tr key={rule.id} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}>
                      <td className={`py-4 px-6 font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'} flex items-center gap-2`}>
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span>
                        {rule.name}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${severityBg}`}>
                          {rule.severity}
                        </span>
                      </td>
                      <td className={`py-4 px-6 font-mono text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {channelsText}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${rule.enabled ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                          {rule.enabled ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-slate-400 hover:text-cyan-600 font-medium text-xs px-2 py-1 transition">
                          Editar
                        </button>
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

export default AlertasModule;