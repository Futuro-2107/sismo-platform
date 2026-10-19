const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function getDashboardSummary() {
  const response = await fetch(`${API_URL}/dashboard/summary`);
  if (!response.ok) {
    throw new Error('Error al obtener el resumen ejecutivo');
  }
  return await response.json();
}