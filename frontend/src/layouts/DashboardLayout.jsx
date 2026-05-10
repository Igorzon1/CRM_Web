import React, { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { LayoutDashboard, Users, Activity, LogOut, Settings, Bell, Search } from 'lucide-react';

export default function DashboardLayout() {
  const { signOut, user } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    { name: 'Visão Geral', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Meus Clientes', path: '/customers', icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* Sidebar Glassmorphism */}
      <aside className="w-64 flex flex-col bg-white/60 backdrop-blur-xl border-r border-slate-200/50 shadow-sm z-20">
        <div className="h-20 flex items-center px-8 border-b border-slate-200/50">
          <div className="flex items-center gap-2">
            <Activity className="w-7 h-7 text-blue-600" />
            <span className="text-xl font-extrabold tracking-tight text-slate-800">
              CRM<span className="text-blue-600">Pro</span>
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Navegação Principal</p>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 translate-x-1'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-slate-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-200/50">
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
            Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Decorative Background for Main Content */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-300/10 blur-[100px] pointer-events-none" />
        
        {/* Header / Navbar */}
        <header className="h-20 flex items-center justify-between px-8 bg-white/40 backdrop-blur-md border-b border-slate-200/50 z-10 sticky top-0">
          <div className="relative w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Busca global (ex: clientes, relatórios...)"
              className="glass-input block w-full pl-10 pr-3 py-2.5 rounded-full text-slate-900 placeholder-slate-400 outline-none text-sm shadow-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Settings className="w-6 h-6" />
            </button>
            <div className="h-8 w-px bg-slate-300 mx-2"></div>
            <div className="flex items-center gap-3">
              <img className="w-10 h-10 rounded-full shadow-sm border-2 border-white" src="https://i.pravatar.cc/150?img=11" alt="Avatar User" />
              <div className="hidden md:block text-sm">
                <p className="font-semibold text-slate-800 leading-none">{user?.name || 'Carregando...'}</p>
                <p className="text-slate-500 text-xs mt-1">{user?.email || 'Nível de Acesso: Padrão'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content inside Outlet */}
        <div className="flex-1 overflow-auto p-8 relative z-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
