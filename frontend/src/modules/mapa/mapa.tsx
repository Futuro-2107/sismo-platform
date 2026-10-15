import React from 'react';

export const MapaModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Mapa Sísmico Geográfico</h1>
        <span className="text-xs bg-slate-200 text-slate-700 px-3 py-1 rounded font-medium">Capa Activa: IGP - Perú</span>
      </div>

      <div className="bg-cyan-50 border-l-4 border-cyan-600 p-4 text-cyan-900 text-sm">
        <p className="font-semibold">Aviso de Visualización:</p>
        <p>Los puntos reflejan eventos sísmicos observados y reportados por fuentes oficiales. No representar como zona de impacto una estimación no validada.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-slate-200 h-[450px] flex flex-col items-center justify-center text-slate-400">
        <div className="text-center space-y-2">
          <svg className="w-16 h-16 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="text-sm font-medium text-slate-600">Contenedor del Mapa Interactivo (Leaflet / MapLibre)</p>
          <p className="text-xs text-slate-400">Filtros por magnitud, profundidad y ventana temporal disponibles próximamente.</p>
        </div>
      </div>
    </div>
  );
};

export default MapaModule;