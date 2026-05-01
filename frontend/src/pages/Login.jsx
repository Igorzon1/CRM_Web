import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Activity, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder para a próxima Sprint
    console.log("Login tentado", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      
      {/* Background Decorativo e Dinâmico */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px] animate-fade-in" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-500/20 blur-[120px] animate-fade-in delay-200" />
      
      <div className="flex w-full max-w-6xl h-[85vh] m-4 glass-panel rounded-3xl overflow-hidden shadow-2xl relative z-10 animate-slide-up">
        
        {/* Painel Esquerdo: Branding Majestic */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
          {/* Padronagem geométrica suave */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:40px_40px]" />
          
          <div className="relative z-10 animate-fade-in">
            <div className="flex items-center gap-3 text-2xl font-bold tracking-tight mb-2">
              <Activity className="w-8 h-8 text-blue-300" />
              <span>CRM<span className="text-blue-300">Enterprise</span></span>
            </div>
            <p className="text-blue-200/80 text-sm tracking-wide uppercase font-semibold">Plataforma de Gestão Definitiva</p>
          </div>
          
          <div className="relative z-10 mb-10 animate-slide-up delay-200">
            <h1 className="text-5xl font-bold leading-[1.1] mb-6">Acelere suas vendas.<br/>Eleve seus resultados.</h1>
            <p className="text-lg text-blue-100/90 max-w-md font-light leading-relaxed">
              O ecossistema completo para gerir clientes, otimizar funis e garantir segurança máxima de ponta a ponta.
            </p>
            
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-4">
                <img className="w-10 h-10 rounded-full border-2 border-blue-800" src="https://i.pravatar.cc/100?img=1" alt="User 1" />
                <img className="w-10 h-10 rounded-full border-2 border-blue-800" src="https://i.pravatar.cc/100?img=2" alt="User 2" />
                <img className="w-10 h-10 rounded-full border-2 border-blue-800" src="https://i.pravatar.cc/100?img=3" alt="User 3" />
              </div>
              <p className="text-sm text-blue-200">Junte-se a +2.000 vendedores de sucesso.</p>
            </div>
          </div>
        </div>

        {/* Painel Direito: Formulário Glassmorphism */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-16 lg:p-24 bg-white/40">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-10 text-center lg:text-left animate-slide-up delay-100">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Bem-vindo de volta</h2>
              <p className="text-slate-500">Insira suas credenciais para acessar seu painel.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up delay-200">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 block">Endereço de E-mail</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    required
                    className="glass-input block w-full pl-10 pr-3 py-3 rounded-xl text-slate-900 placeholder-slate-400 outline-none"
                    placeholder="voce@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-700 block">Senha</label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">Esqueceu a senha?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    required
                    className="glass-input block w-full pl-10 pr-3 py-3 rounded-xl text-slate-900 placeholder-slate-400 outline-none"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Entrar no Sistema
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-sm animate-fade-in delay-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Acesso seguro e criptografado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
