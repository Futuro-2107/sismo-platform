import React, { useEffect, useState } from 'react';
import { getSeismicEvents } from './service';

interface SeismicEventItem {
  id: string;
  external_id: string;
  occurred_at: string;
  place: string;
  magnitude: number;
  depth_km: number;
  magnitude_type: string;
  review_status: string;
}

interface EventosProps {
  isDarkMode: boolean;
}

export const EventosModule: React.FC<EventosProps> = ({ isDarkMode }) => {
  const [events, setEvents] = useState<SeismicEventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSeismicEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('No se pudo conectar con el servidor backend.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={`p-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Cargando eventos sísmicos desde Supabase...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
        Catálogo de Eventos Sísmicos
      </h1>
      
      {/* Contenedor adaptable al tema */}
      <div className={`${isDarkMode ? 'bg-[#0a0f1d] border-slate-800' : 'bg-white border-slate-200'} shadow rounded-lg overflow-hidden border transition-colors`}>
        <table className={`min-w-full divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-slate-200'} text-left text-sm`}>
          <thead className={`${isDarkMode ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-700'}`}>
            <tr>
              <th className="px-6 py-3 font-semibold">ID / Proveedor</th>
              <th className="px-6 py-3 font-semibold">Fecha UTC</th>
              <th className="px-6 py-3 font-semibold">Ubicación</th>
              <th className="px-6 py-3 font-semibold">Magnitud</th>
              <th className="px-6 py-3 font-semibold">Profundidad</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800 bg-[#0a0f1d]' : 'divide-slate-200 bg-white'}`}>
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className={`px-6 py-4 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  No hay eventos registrados en la base de datos actualmente.
                </td>
              </tr>
            ) : (
              events.map((ev) => (
                <tr key={ev.id} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}>
                  <td className={`px-6 py-4 font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {ev.external_id} (IGP)
                  </td>
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {new Date(ev.occurred_at).toUTCString()}
                  </td>
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {ev.place}
                  </td>
                  <td className="px-6 py-4 font-bold text-amber-500">
                    {ev.magnitude} {ev.magnitude_type}
                  </td>
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {ev.depth_km} km
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventosModule;