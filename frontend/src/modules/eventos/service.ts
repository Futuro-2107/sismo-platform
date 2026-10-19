// Cliente HTTP para el módulo de Eventos Sísmicos
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function getSeismicEvents(minMagnitude?: number) {
  // Agregamos explícitamente /api/v1 aquí para que coincida con tu main.py de FastAPI
  let url = `${API_URL}/api/v1/events/`;
  if (minMagnitude !== undefined) {
    url += `?min_magnitude=${minMagnitude}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener los eventos sísmicos desde el backend');
  }
  return await response.json();
}