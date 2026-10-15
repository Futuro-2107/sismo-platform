import React, { useState } from 'react';

interface SeismicEventItem {
  id: string;
  occurredAt: string;
  place: string;
  magnitude: number;
  depthKm: number;
  source: string;
}

export const EventosModule: React.FC = () => {
  const [events] = useState<SeismicEventItem[]>([
    { id: 'EV-001', occurredAt: '2026-10-14 15:20:10 UTC', place: '15km al S de Lima, Perú', magnitude: 4.2, depthKm: 45, source: 'IGP' },
    { id: 'EV-002', occurredAt: '2026-10-14 12:05:40 UTC', place: '30km al O de Arequipa, Perú', magnitude: 5.1, depthKm: 60, source: 'IGP' },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Catálogo de Eventos Sísmicos</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-6 py-3 font-semibold">ID / Proveedor</th>
              <th className="px-6 py-3 font-semibold">Fecha UTC</th>
              <th className="px-6 py-3 font-semibold">Ubicación</th>
              <th className="px-6 py-3 font-semibold">Magnitud</th>
              <th className="px-6 py-3 font-semibold">Profundidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {events.map((ev) => (
              <tr key={ev.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{ev.id} ({ev.source})</td>
                <td className="px-6 py-4 text-slate-600">{ev.occurredAt}</td>
                <td className="px-6 py-4 text-slate-600">{ev.place}</td>
                <td className="px-6 py-4 font-bold text-amber-600">{ev.magnitude} Mw</td>
                <td className="px-6 py-4 text-slate-600">{ev.depthKm} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};