import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { LogOut, LayoutDashboard } from 'lucide-react';

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar simples */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
        </div>
        
        <button 
          onClick={signOut}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sair do Sistema
        </button>
      </header>

      {/* Conteúdo */}
      <main className="p-8">
        <div className="glass-panel p-8 rounded-2xl animate-slide-up">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Parabéns! Você está logado.</h2>
          <p className="text-slate-600">A integração do Frontend (React) com o Backend (Spring Boot JWT) foi um sucesso.</p>
        </div>
      </main>
    </div>
  );
}
