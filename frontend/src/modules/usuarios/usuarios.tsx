import React from 'react';

export const UsuariosModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Gestión de Usuarios y Roles</h1>
      
      <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
        <p className="text-sm text-slate-600">Control de privilegios basado en roles mínimos necesarios para la operación segura de la plataforma.</p>
      </div>
    </div>
  );
};

export default UsuariosModule;