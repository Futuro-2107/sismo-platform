import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, ScatterChart, Scatter 
} from 'recharts';

// Datos de muestra basados en la analítica sísmica del sistema
const temporalData = [
  { fecha: '01 Oct', eventos: 4 },
  { fecha: '03 Oct', eventos: 7 },
  { fecha: '05 Oct', eventos: 3 },
  { fecha: '07 Oct', eventos: 12 },
  { fecha: '09 Oct', eventos: 5 },
  { fecha: '11 Oct', eventos: 8 },
  { fecha: '13 Oct', eventos: 6 },
];

const magnitudeData = [
  { rango: '3.0 - 3.9', cantidad: 15 },
  { rango: '4.0 - 4.9', cantidad: 8 },
  { rango: '5.0 - 5.9', cantidad: 3 },
  { rango: '6.0+', cantidad: 1 },
];

const depthMagnitudeData = [
  { profundidad: 15, magnitud: 3.5 },
  { profundidad: 30, magnitud: 4.2 },
  { profundidad: 45, magnitud: 5.1 },
  { profundidad: 60, magnitud: 4.8 },
  { profundidad: 80, magnitud: 5.4 },
  { profundidad: 110, magnitud: 3.9 },
];

export const AnalisisModule: React.FC = () => {
  const [zonaFiltro, setZonaFiltro] = useState('Peru-Nacional');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Análisis Estadístico e Histórico</h1>
          <p className="text-xs text-slate-400 mt-0.5">Evaluación descriptiva de patrones, frecuencias y distribuciones sísmicas</p>
        </div>
        <div className="flex space-x-2">
          <select 
            value={zonaFiltro} 
            onChange={(e) => setZonaFiltro(e.target.value)}
            className="bg-[#0a0f1d] border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-600"
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
        <div className="bg-[#0a0f1d] border border-slate-800/80 p-5 rounded-xl shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-200">Eventos Sísmicos a lo Largo del Tiempo</h3>
            <span className="text-[10px] bg-blue-950 text-blue-400 border border-blue-800 px-2 py-0.5 rounded">Fuente: IGP (UTC)</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temporalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="fecha" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#070b14', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="eventos" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Distribución por Rangos de Magnitud */}
        <div className="bg-[#0a0f1d] border border-slate-800/80 p-5 rounded-xl shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-200">Distribución por Rangos de Magnitud</h3>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Frecuencia Relativa</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={magnitudeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="rango" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#070b14', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="cantidad" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Relación Magnitud vs. Profundidad */}
        <div className="bg-[#0a0f1d] border border-slate-800/80 p-5 rounded-xl shadow-lg space-y-4 lg:col-span-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-200">Relación Magnitud vs. Profundidad (km)</h3>
              <p className="text-[11px] text-slate-400">Distribución de registros observados (sin atribuir causalidad directa)</p>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">Dataset Verificado</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" dataKey="profundidad" name="Profundidad" unit=" km" stroke="#64748b" fontSize={11} />
                <YAxis type="number" dataKey="magnitud" name="Magnitud" unit=" Mw" stroke="#64748b" fontSize={11} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#070b14', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }} />
                <Scatter name="Sismos Registrados" data={depthMagnitudeData} fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalisisModule;