import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: (token: string, user: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Credenciales inválidas');
      }

      // Guardar token y datos de sesión en localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user_info', JSON.stringify(data.user));

      onLoginSuccess(data.access_token, data.user);
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#070b14] text-slate-100 font-sans antialiased select-none">
      
      {/* MITAD IZQUIERDA: Información Institucional / Empresarial */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0a0f1d] via-[#070b14] to-[#04060a] p-12 flex-col justify-between border-r border-slate-800/80 relative overflow-hidden">
        {/* Luces decorativas de fondo */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Logo e Identidad Corporativa */}
        <div className="flex items-center space-x-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-950">
            S
          </div>
          <div>
            <h1 className="text-white font-extrabold text-base tracking-wider">SismoPlatform</h1>
            <span className="text-blue-400 text-[10px] font-semibold uppercase tracking-widest">MONITOREO & ANALÍTICA</span>
          </div>
        </div>

        {/* Panel Informativo Central */}
        <div className="space-y-6 z-10 max-w-lg">
          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">
            Plataforma Corporativa v1.0
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
            Sistema de Monitoreo Sísmico y Analítica Avanzada
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Supervisión en tiempo real de eventos telúricos, análisis de umbrales críticos mediante modelos predictivos de Machine Learning y gestión de alertas tempranas para organismos oficiales.
          </p>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <p className="text-2xl font-bold text-cyan-400">13 Módulos</p>
              <p className="text-xs text-slate-500">Operativos e integrados</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-400">24/7</p>
              <p className="text-xs text-slate-500">Sincronización activa</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-slate-500 z-10">
          © 2026 SismoPlatform Enterprise. Todos los derechos reservados.
        </div>
      </div>

      {/* MITAD DERECHA: Formulario Integrado con Fondo Oscuro */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#0a0f1d] border-l border-slate-800/50">
        <div className="w-full max-w-md bg-[#070b14] p-8 rounded-2xl shadow-2xl border border-slate-800 space-y-6">
          
          {/* Cabecera */}
          <div className="text-center space-y-2">
            <div className="inline-flex w-12 h-12 rounded-xl bg-cyan-600 items-center justify-center text-white font-bold text-xl shadow-md shadow-cyan-950 mb-2">
              S
            </div>
            <h1 className="text-2xl font-bold text-white">Iniciar Sesión</h1>
            <p className="text-xs text-slate-400">Ingrese sus credenciales corporativas para continuar</p>
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div className="p-3 bg-rose-950/50 border border-rose-900 text-rose-300 text-xs rounded-lg font-medium text-center">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ana.rodriguez@sismoplatform.com"
                className="w-full px-3.5 py-2.5 bg-[#0a0f1d] border border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-200 placeholder-slate-600 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-[#0a0f1d] border border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-200 placeholder-slate-600 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-cyan-600 text-white font-semibold text-sm rounded-lg hover:bg-cyan-500 transition shadow-lg shadow-cyan-600/30 disabled:opacity-50 mt-2"
            >
              {loading ? 'Iniciando Sesión...' : 'Ingresar a la Plataforma'}
            </button>
          </form>

          {/* Footer de Acceso Restringido */}
          <div className="text-center pt-4 border-t border-slate-800/80">
            <p className="text-xs text-slate-500">
              SismoPlatform v1.0 • Acceso Restringido
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;