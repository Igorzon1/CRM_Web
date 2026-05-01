import React, { useState, useContext } from 'react';
import { Mail, Lock, User, ArrowRight, Activity, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp({ name, email, password });
      alert('Conta criada com sucesso! Você pode fazer login agora.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 blur-[120px] animate-fade-in" />
      
      <div className="flex w-full max-w-md m-4 glass-panel rounded-3xl overflow-hidden shadow-2xl relative z-10 animate-slide-up">
        <div className="w-full flex flex-col justify-center p-8 sm:p-10 bg-white/40">
          
          <div className="flex items-center gap-2 justify-center mb-8 animate-fade-in">
            <Activity className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold tracking-tight text-slate-800">CRM<span className="text-blue-600">Enterprise</span></span>
          </div>

          <div className="mb-8 text-center animate-slide-up delay-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Crie sua conta</h2>
            <p className="text-slate-500 text-sm">Preencha os dados para começar a vender mais.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 animate-fade-in text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up delay-200">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block uppercase tracking-wide">Nome Completo</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  className="glass-input block w-full pl-10 pr-3 py-2.5 rounded-xl text-slate-900 placeholder-slate-400 outline-none text-sm"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block uppercase tracking-wide">E-mail</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  className="glass-input block w-full pl-10 pr-3 py-2.5 rounded-xl text-slate-900 placeholder-slate-400 outline-none text-sm"
                  placeholder="voce@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block uppercase tracking-wide">Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="glass-input block w-full pl-10 pr-10 py-2.5 rounded-xl text-slate-900 placeholder-slate-400 outline-none text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? 'Criando...' : 'Criar Conta'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-600 animate-slide-up delay-300">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Faça login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
