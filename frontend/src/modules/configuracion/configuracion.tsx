import React, { useState } from 'react';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setSettings(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de guardado de preferencias en la plataforma
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
              className="px-4 py-2 bg-cyan-600 text-white font-medium text-sm rounded-lg hover:bg-cyan-700 transition shadow-sm"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfiguracionModule;