import React, { useEffect, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, ScatterChart, Scatter 
} from 'recharts';

interface AnalisisProps {
  isDarkMode?: boolean;
}

export const AnalisisModule: React.FC<AnalisisProps> = ({ isDarkMode = true }) => {
  const [zonaFiltro, setZonaFiltro] = useState('Peru-Nacional');
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    fetch(`${API_URL}/api/v1/analytics/summary`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al consultar el servicio de analítica');
        return res.json();
      })
      .then((data) => {
        setAnalyticsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar datos analíticos:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Análisis Estadístico e Histórico
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
            Evaluación descriptiva de patrones, frecuencias y distribuciones sísmicas
          </p>
        </div>
        <div className="flex space-x-2">
          <select 
            value={zonaFiltro} 
            onChange={(e) => setZonaFiltro(e.target.value)}
            className={`${
              isDarkMode 
                ? 'bg-[#0a0f1d] border-slate-800 text-slate-300' 
                : 'bg-white border-slate-200 text-slate-700'
            } border text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-600 transition-colors`}
          >
            <option value="Peru-Nacional">Zona: Cobertura Nacional (Perú)</option>
            <option value="Lima">Zona: Lima Metropolitana</option>
            <option value="Arequipa">Zona: Sur (Arequipa/Moquegua)</option>
          </select>
        </div>
      </div>

      {/* Grid de Gráficas Estadísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Eventos a lo largo del tiempo (Serie Temporal) */}
        <div className={`${
          isDarkMode ? 'bg-[#0a0f1d] border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900'
        } border p-5 rounded-xl shadow-lg space-y-4 transition-colors`}>
          <div className="flex justify-between items-center">
            <h3 className={`text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Eventos Sísmicos a lo Largo del Tiempo
            </h3>
            <span className="text-[10px] bg-blue-950 text-blue-400 border border-blue-800 px-2 py-0.5 rounded">
              Fuente: IGP (UTC)
            </span>
          </div>
          <div className="h-64 w-full">
            {loading ? (
              <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                Cargando serie temporal...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData?.temporalData || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} />
                  <XAxis dataKey="fecha" stroke={isDarkMode ? '#64748b' : '#94a3b8'} fontSize={11} />
                  <YAxis stroke={isDarkMode ? '#64748b' : '#94a3b8'} fontSize={11} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#070b14' : '#ffffff', 
                      borderColor: isDarkMode ? '#1e293b' : '#e2e8f0', 
                      borderRadius: '8px', 
                      fontSize: '12px',
                      color: isDarkMode ? '#fff' : '#000'
                    }} 
                  />
                  <Line type="monotone" dataKey="eventos" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* 2. Distribución por Rangos de Magnitud */}
        <div className={`${
          isDarkMode ? 'bg-[#0a0f1d] border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900'
        } border p-5 rounded-xl shadow-lg space-y-4 transition-colors`}>
          <div className="flex justify-between items-center">
            <h3 className={`text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Distribución por Rangos de Magnitud
            </h3>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
              Frecuencia Relativa
            </span>
          </div>
          <div className="h-64 w-full">
            {loading ? (
              <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                Calculando frecuencia...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData?.magnitudeData || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} />
                  <XAxis dataKey="rango" stroke={isDarkMode ? '#64748b' : '#94a3b8'} fontSize={11} />
                  <YAxis stroke={isDarkMode ? '#64748b' : '#94a3b8'} fontSize={11} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#070b14' : '#ffffff', 
                      borderColor: isDarkMode ? '#1e293b' : '#e2e8f0', 
                      borderRadius: '8px', 
                      fontSize: '12px',
                      color: isDarkMode ? '#fff' : '#000'
                    }} 
                  />
                  <Bar dataKey="cantidad" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* 3. Relación Magnitud vs. Profundidad */}
        <div className={`${
          isDarkMode ? 'bg-[#0a0f1d] border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900'
        } border p-5 rounded-xl shadow-lg space-y-4 lg:col-span-2 transition-colors`}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className={`text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                Relación Magnitud vs. Profundidad (km)
              </h3>
              <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Distribución de registros observados (sin atribuir causalidad directa)
              </p>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
              Dataset Verificado ({analyticsData?.total_sample || 0} sismos)
            </span>
          </div>
          <div className="h-64 w-full">
            {loading ? (
              <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                Generando diagrama de dispersión...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} />
                  <XAxis type="number" dataKey="profundidad" name="Profundidad" unit=" km" stroke={isDarkMode ? '#64748b' : '#94a3b8'} fontSize={11} />
                  <YAxis type="number" dataKey="magnitud" name="Magnitud" unit=" Mw" stroke={isDarkMode ? '#64748b' : '#94a3b8'} fontSize={11} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#070b14' : '#ffffff', 
                      borderColor: isDarkMode ? '#1e293b' : '#e2e8f0', 
                      borderRadius: '8px', 
                      fontSize: '12px',
                      color: isDarkMode ? '#fff' : '#000'
                    }} 
                  />
                  <Scatter name="Sismos Registrados" data={analyticsData?.depthMagnitudeData || []} fill="#3b82f6" />
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalisisModule;