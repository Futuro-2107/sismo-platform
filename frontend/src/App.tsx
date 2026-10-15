import React, { useState } from 'react';

// Importación de tus 13 módulos
import { DashboardModule } from './modules/dashboard/dashboard';
import { EventosModule } from './modules/eventos/eventos';
import { MapaModule } from './modules/mapa/mapa';
import { AnalisisModule } from './modules/analisis/analisis';
import { DatosModule } from './modules/datos/datos';
import { ModelosMlModule } from './modules/modelos-ml/modelos-ml';
import { EstimacionesModule } from './modules/estimaciones/estimaciones';
import { AlertasModule } from './modules/alertas/alertas';
import { FuentesModule } from './modules/fuentes/fuentes';
import { ReportesModule } from './modules/reportes/reportes';
import { UsuariosModule } from './modules/usuarios/usuarios';
import { AuditoriaModule } from './modules/auditoria/auditoria';
import { ConfiguracionModule } from './modules/configuracion/configuracion';

export function App() {
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [activeTitle, setActiveTitle] = useState<string>('1. EJECUTIVO / DASHBOARD');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const handleNavClick = (id: string, title: string) => {
    setActiveModule(id);
    setActiveTitle(title);
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <DashboardModule isDarkMode={isDarkMode} />;
      case 'eventos': return <EventosModule />;
      case 'mapa': return <MapaModule />;
      case 'analisis': return <AnalisisModule />;
      case 'datos': return <DatosModule />;
      case 'modelos-ml': return <ModelosMlModule />;
      case 'estimaciones': return <EstimacionesModule />;
      case 'alertas': return <AlertasModule />;
      case 'fuentes': return <FuentesModule />;
      case 'reportes': return <ReportesModule />;
      case 'usuarios': return <UsuariosModule />;
      case 'auditoria': return <AuditoriaModule />;
      case 'configuracion': return <ConfiguracionModule />;
      default: return <DashboardModule isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-[#070b14] text-slate-100' : 'bg-slate-100 text-slate-900'} font-sans antialiased overflow-hidden select-none transition-colors duration-200`}>
      
      {/* SIDEBAR */}
      <aside className={`w-72 ${isDarkMode ? 'bg-[#0a0f1d] border-slate-800/80 text-slate-300' : 'bg-slate-900 border-slate-700 text-slate-300'} border-r flex flex-col z-20`}>
        <div className={`p-5 ${isDarkMode ? 'border-slate-800/80 bg-slate-950/50' : 'border-slate-700 bg-slate-950'} border-b flex items-center space-x-3`}>
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-lg shadow-blue-950">
            S
          </div>
          <div>
            <h1 className="text-white font-extrabold text-sm tracking-wider">SismoPlatform</h1>
            <span className="text-blue-400 text-[10px] font-semibold uppercase tracking-widest">MONITOREO & ANALÍTICA</span>
          </div>
        </div>
        
        {/* Lista completa de los 13 Módulos */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-5 text-xs custom-scrollbar">
          
          {/* Ejecutivo y Operación */}
          <div className="space-y-1">
            <div className="text-slate-500 font-bold uppercase tracking-wider px-2 mb-1.5">1. Ejecutivo & Operación</div>
            <button
              onClick={() => handleNavClick('dashboard', '1. EJECUTIVO / DASHBOARD')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                activeModule === 'dashboard' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <span>1. Dashboard</span>
              <span className="text-[10px] bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded">Live</span>
            </button>
            <button
              onClick={() => handleNavClick('eventos', '2. OPERACIONES / EVENTOS SÍSMICOS')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                activeModule === 'eventos' ? 'bg-blue-600 text-white shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              2. Eventos Sísmicos
            </button>
            <button
              onClick={() => handleNavClick('mapa', '2. OPERACIONES / MAPA SÍSMICO')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                activeModule === 'mapa' ? 'bg-blue-600 text-white shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              3. Mapa Sísmico
            </button>
          </div>

          {/* Analítica e Inteligencia */}
          <div className="space-y-1">
            <div className="text-slate-500 font-bold uppercase tracking-wider px-2 mb-1.5">2. Analítica e Inteligencia</div>
            <button
              onClick={() => handleNavClick('analisis', '3. ANALÍTICA / ANÁLISIS ESTADÍSTICO')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                activeModule === 'analisis' ? 'bg-blue-600 text-white shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              4. Análisis Estadístico
            </button>
            <button
              onClick={() => handleNavClick('datos', '3. ANALÍTICA / PREPARACIÓN DE DATOS')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                activeModule === 'datos' ? 'bg-blue-600 text-white shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              5. Preparación de Datos
            </button>
            <button
              onClick={() => handleNavClick('modelos-ml', '3. ANALÍTICA / MODELOS ML')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                activeModule === 'modelos-ml' ? 'bg-blue-600 text-white shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              6. Modelos ML
            </button>
            <button
              onClick={() => handleNavClick('estimaciones', '3. ANALÍTICA / ESTIMACIONES EXP.')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                activeModule === 'estimaciones' ? 'bg-blue-600 text-white shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              7. Estimaciones Exp.
            </button>
          </div>

          {/* Seguridad y Difusión */}
          <div className="space-y-1">
            <div className="text-slate-500 font-bold uppercase tracking-wider px-2 mb-1.5">3. Seguridad y Difusión</div>
            <button
              onClick={() => handleNavClick('alertas', '4. GESTIÓN / CENTRO DE ALERTAS')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                activeModule === 'alertas' ? 'bg-blue-600 text-white shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              8. Centro de Alertas
            </button>
            <button
              onClick={() => handleNavClick('fuentes', '4. GESTIÓN / FUENTES DE DATOS')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                activeModule === 'fuentes' ? 'bg-blue-600 text-white shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              9. Fuentes de Datos
            </button>
            <button
              onClick={() => handleNavClick('reportes', '4. GESTIÓN / REPORTES')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                activeModule === 'reportes' ? 'bg-blue-600 text-white shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              10. Reportes
            </button>
          </div>

          {/* Administración */}
          <div className="space-y-1">
            <div className="text-slate-500 font-bold uppercase tracking-wider px-2 mb-1.5">4. Administración</div>
            <button
              onClick={() => handleNavClick('usuarios', '5. ADMIN / USUARIOS Y ROLES')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                activeModule === 'usuarios' ? 'bg-blue-600 text-white shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              11. Usuarios y Roles
            </button>
            <button
              onClick={() => handleNavClick('auditoria', '5. ADMIN / AUDITORÍA')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                activeModule === 'auditoria' ? 'bg-blue-600 text-white shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              12. Auditoría
            </button>
            <button
              onClick={() => handleNavClick('configuracion', '5. ADMIN / CONFIGURACIÓN')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                activeModule === 'configuracion' ? 'bg-blue-600 text-white shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              13. Configuración
            </button>
          </div>

        </nav>

        {/* Footer del usuario */}
        <div className={`p-4 ${isDarkMode ? 'bg-[#05080e] border-slate-800/80' : 'bg-slate-950 border-slate-800'} border-t flex items-center space-x-3`}>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
            AR
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">Administrador</p>
            <p className="text-[10px] text-slate-400">Rol: Analista</p>
          </div>
        </div>
      </aside>

      {/* CONTENEDOR PRINCIPAL */}
      <div className={`flex-1 flex flex-col min-w-0 overflow-hidden ${isDarkMode ? 'bg-[#070b14]' : 'bg-slate-100'}`}>
        
        {/* HEADER SUPERIOR */}
        <header className={`h-16 ${isDarkMode ? 'bg-[#0a0f1d] border-slate-800/80' : 'bg-white border-slate-200'} border-b flex items-center justify-between px-8 z-10 transition-colors`}>
          <div className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} tracking-wider`}>
            {activeTitle}
          </div>
          <div className="flex items-center space-x-3">
            <button className={`flex items-center space-x-2 ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'} px-3.5 py-1.5 rounded-lg text-xs font-medium border transition`}>
              <span>🔄 Sincronizar</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium shadow-lg shadow-blue-600/30 transition">
              <span>📄 Generar Reporte</span>
            </button>
            <div className={`w-px h-6 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-300'} mx-1`}></div>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'} rounded-lg transition`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            <button className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'} rounded-lg transition`}>
              🔔
            </button>
            <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-200 border-slate-300 text-slate-700'} border flex items-center justify-center text-xs font-bold`}>
              AR
            </div>
          </div>
        </header>

        {/* ÁREA DE CONTENIDO */}
        <main className={`flex-1 overflow-y-auto p-8 ${isDarkMode ? 'bg-[#070b14] text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
          <div className="max-w-7xl mx-auto space-y-6">
            {renderModule()}
          </div>
        </main>
      </div>

    </div>
  );
}

export default App;