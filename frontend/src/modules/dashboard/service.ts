const API_URL = 'http://127.0.0.1:8000/api/v1';

export async function getDashboardSummary() {
  const response = await fetch(`${API_URL}/dashboard/summary`);
  if (!response.ok) {
    throw new Error('Error al obtener el resumen ejecutivo');
  }
  return await response.json();
}