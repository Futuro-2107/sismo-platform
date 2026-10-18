import React, { useEffect, useState } from 'react';

interface UsuariosProps {
  isDarkMode: boolean;
}

export const UsuariosModule: React.FC<UsuariosProps> = ({ isDarkMode }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Petición al backend para obtener los perfiles y roles de usuario
    fetch('http://localhost:8000/api/v1/users/')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar usuarios:", err);
        setLoading(false);
      });
  }, []);

  // Función para formatear fechas de forma segura
  const formatDate = (dateString: any) => {
    if (!dateString) return '---';
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime()) ? String(dateString) : parsed.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Gestión de Usuarios y Roles
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Administración de cuentas corporativas, perfiles vinculados y asignación de permisos de acceso en la plataforma.
          </p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 text-white font-medium text-sm rounded-lg hover:bg-cyan-700 transition shadow-sm flex items-center gap-2">
          <span>+ Nuevo Usuario</span>
        </button>
      </div>

      {/* Contenedor en formato de Tabla Profesional con soporte para Dark Mode */}
      <div className={`${isDarkMode ? 'bg-[#0a0f1d] border-slate-800' : 'bg-white border-slate-200'} rounded-xl shadow-sm border overflow-hidden transition-colors`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${isDarkMode ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'} border-b text-xs font-semibold uppercase tracking-wider`}>
                <th className="py-3.5 px-6">Nombre Completo</th>
                <th className="py-3.5 px-6">Correo Electrónico</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6">Fecha de Registro</th>
                <th className="py-3.5 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'} text-sm`}>
              {loading ? (
                <tr>
                  <td colSpan={5} className={`py-8 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Cargando perfiles de usuario...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className={`py-8 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    No hay usuarios registrados en la base de datos.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isActive = user.status?.toLowerCase() === 'active';
                  // Badges de estado dinámicos adaptados al modo oscuro y claro
                  const statusBg = isActive
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900'
                    : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900';

                  return (
                    <tr key={user.id} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}>
                      <td className={`py-4 px-6 font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'} flex items-center gap-2`}>
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span>
                        {user.full_name}
                      </td>
                      <td className={`py-4 px-6 font-mono text-xs ${isDarkMode ? 'text-cyan-400' : 'text-cyan-700'}`}>
                        {user.email}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase ${statusBg}`}>
                          {user.status || 'ACTIVE'}
                        </span>
                      </td>
                      <td className={`py-4 px-6 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {formatDate(user.created_at)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className={`${isDarkMode ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-400 hover:text-cyan-600'} font-medium text-xs px-2 py-1 transition`}>
                          Editar / Roles
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsuariosModule;