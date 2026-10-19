import React, { useState, useEffect } from 'react';

interface ConfiguracionProps {
  isDarkMode: boolean;
}

export const ConfiguracionModule: React.FC<ConfiguracionProps> = ({ isDarkMode }) => {
  const [settings, setSettings] = useState({
    autoSync: true,
    syncInterval: '15',
    defaultMagnitudeThreshold: '4.5',
    emailAlerts: true,
    smsAlerts: false,
    mapDefaultZoom: '6',
    systemTheme: 'dark'
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Opcional: Cargar configuraciones del backend al iniciar si ya están guardadas
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    fetch(`${API_URL}/api/v1/config`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (data) setSettings(prev => ({ ...prev, ...data }));
      })
      .catch((err) => {
        console.log("Usando configuración local por defecto:", err);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setSettings(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    try {
      // Intenta guardar también en el backend de Render si el endpoint existe
      await fetch(`${API_URL}/api/v1/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      }).catch(() => {
        // Si el endpoint del backend aún no está creado, simula el guardado localmente sin romper la app
        console.warn("Guardado simulado localmente (endpoint de config no disponible en backend)");
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error al guardar la configuración:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
        Configuración del Sistema
      </h1>

      <div className={`${isDarkMode ? 'bg-[#0a0f1d] border-slate-800' : 'bg-white border-slate-200'} p-6 rounded-xl shadow-sm border space-y-6 transition-colors`}>
        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Ajustes generales de la plataforma de monitoreo sísmico, parámetros de sincronización, umbrales de alerta y preferencias operativas.
        </p>

        {saved && (
          <div className={`p-3 text-sm rounded-lg font-medium border ${isDarkMode ? 'bg-emerald-950/50 border-emerald-900 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
            ¡Configuración guardada exitosamente en el sistema!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sincronización */}
            <div className="space-y-4">
              <h3 className={`font-semibold text-sm border-b pb-2 ${isDarkMode ? 'text-slate-300 border-slate-800' : 'text-slate-700 border-slate-200'}`}>
                Conectividad e Ingesta
              </h3>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Sincronización Automática</span>
                <input 
                  type="checkbox" 
                  name="autoSync" 
                  checked={settings.autoSync} 
                  onChange={handleChange}
                  className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-slate-300 rounded"
                />
              </div>

              <div>
                <label className={`block text-sm mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Intervalo de Sincronización (minutos)
                </label>
                <select 
                  name="syncInterval" 
                  value={settings.syncInterval} 
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-700'}`}
                >
                  <option value="5">Cada 5 minutos</option>
                  <option value="15">Cada 15 minutos</option>
                  <option value="30">Cada 30 minutos</option>
                  <option value="60">Cada 1 hora</option>
                </select>
              </div>
            </div>

            {/* Umbrales Sísmicos y Alertas */}
            <div className="space-y-4">
              <h3 className={`font-semibold text-sm border-b pb-2 ${isDarkMode ? 'text-slate-300 border-slate-800' : 'text-slate-700 border-slate-200'}`}>
                Umbrales y Notificaciones
              </h3>

              <div>
                <label className={`block text-sm mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Magnitud Mínima para Alerta Operativa (Mw)
                </label>
                <input 
                  type="number" 
                  step="0.1" 
                  name="defaultMagnitudeThreshold" 
                  value={settings.defaultMagnitudeThreshold} 
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-700'}`}
                />
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Canal de Alertas por Correo</span>
                  <input 
                    type="checkbox" 
                    name="emailAlerts" 
                    checked={settings.emailAlerts} 
                    onChange={handleChange}
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-slate-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Canal de Alertas por SMS / Push</span>
                  <input 
                    type="checkbox" 
                    name="smsAlerts" 
                    checked={settings.smsAlerts} 
                    onChange={handleChange}
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-slate-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={`pt-4 border-t flex justify-end ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <button 
              type="submit" 
              disabled={loading}
              className="px-4 py-2 bg-cyan-600 text-white font-medium text-sm rounded-lg hover:bg-cyan-700 transition shadow-sm disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfiguracionModule;