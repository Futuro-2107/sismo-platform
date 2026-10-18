import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapaProps {
  isDarkMode: boolean;
}

export const MapaModule: React.FC<MapaProps> = ({ isDarkMode }) => {
  // Puntos de prueba (Lima y Arequipa)
  const events = [
    { id: 1, lat: -12.046374, lng: -77.042793, title: 'Lima (EV-001)', mag: '4.2 Mw' },
    { id: 2, lat: -16.409047, lng: -71.537491, title: 'Arequipa (EV-002)', mag: '5.1 Mw' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Mapa Sísmico Geoespacial
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Exploración espacial de eventos y zonas reportadas.
          </p>
        </div>
        <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold rounded-full">
          Capa Activa: Sismos Observados (IGP)
        </span>
      </div>

      {/* Contenedor del Mapa */}
      <div className={`p-1 rounded-xl shadow-sm border transition-colors overflow-hidden ${
        isDarkMode ? 'bg-[#0a0f1d] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="h-[500px] w-full rounded-lg overflow-hidden relative">
          <MapContainer 
            center={[-9.19, -75.015]} 
            zoom={5} 
            style={{ height: '100%', width: '100%' }}
            className={isDarkMode ? 'dark-leaflet-map' : ''}
          >
            {/* TileLayer estándar gratuito de OpenStreetMap */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {events.map((ev) => (
              <Marker key={ev.id} position={[ev.lat, ev.lng]}>
                <Popup>
                  <div className="text-xs">
                    <strong>{ev.title}</strong><br />
                    Magnitud: {ev.mag}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Estilos CSS para oscurecer OpenStreetMap cuando isDarkMode sea verdadero */}
      <style>{`
        .dark-leaflet-map .leaflet-tile-container img {
          filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3);
        }
        .dark-leaflet-map .leaflet-container {
          background: #090d16 !important;
        }
      `}</style>

      {/* Aviso Cartográfico */}
      <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
        isDarkMode 
          ? 'bg-amber-950/20 border-amber-900/40 text-amber-300' 
          : 'bg-amber-50 border-amber-200 text-amber-800'
      }`}>
        <strong>AVISO CARTOGRÁFICO:</strong><br />
        Las ubicaciones representan eventos reportados por fuentes oficiales. No deben interpretarse como zonas de impacto predictivo ni áreas de riesgo deterministas sin validación geofísica previa.
      </div>
    </div>
  );
};

export default MapaModule;