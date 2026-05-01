import React from 'react';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center animate-slide-up">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Dashboard (Em Breve)</h1>
        <p className="text-slate-500">O layout do painel será construído na próxima fase.</p>
        <a href="/login" className="mt-8 inline-block text-blue-600 font-medium hover:underline">
          Voltar para o Login
        </a>
      </div>
    </div>
  );
}
