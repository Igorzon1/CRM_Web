import React, { useState, useEffect } from 'react';
import { customerService } from '../services/customerService';
import { dealService } from '../services/dealService';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeDealsValue: 0,
    conversionRate: 0
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [customers, deals] = await Promise.all([
          customerService.getCustomers(),
          dealService.getDeals()
        ]);

        const totalCustomers = customers.length;
        
        const activeDeals = deals.filter(d => !['WON', 'LOST'].includes(d.stage));
        const activeDealsValue = activeDeals.reduce((acc, curr) => acc + curr.amount, 0);
        
        const wonDeals = deals.filter(d => d.stage === 'WON').length;
        const totalCompletedDeals = deals.filter(d => ['WON', 'LOST'].includes(d.stage)).length;
        const conversionRate = totalCompletedDeals > 0 
          ? Math.round((wonDeals / totalCompletedDeals) * 100) 
          : 0;

        setStats({ totalCustomers, activeDealsValue, conversionRate });
      } catch (err) {
        console.error('Erro ao carregar dados da visão geral', err);
      }
    }
    loadData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Visão Geral</h1>
        <p className="text-slate-500 text-sm mt-1">Bem-vindo ao CRM Enterprise. Aqui está o resumo das suas vendas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-2xl animate-slide-up">
          <p className="text-sm font-semibold text-slate-500 uppercase">Clientes Totais</p>
          <h2 className="text-4xl font-extrabold text-blue-600 mt-2">{stats.totalCustomers}</h2>
        </div>
        <div className="glass-panel p-6 rounded-2xl animate-slide-up delay-100">
          <p className="text-sm font-semibold text-slate-500 uppercase">Negócios em Andamento</p>
          <h2 className="text-4xl font-extrabold text-emerald-600 mt-2">{formatCurrency(stats.activeDealsValue)}</h2>
        </div>
        <div className="glass-panel p-6 rounded-2xl animate-slide-up delay-200">
          <p className="text-sm font-semibold text-slate-500 uppercase">Taxa de Conversão</p>
          <h2 className="text-4xl font-extrabold text-indigo-600 mt-2">{stats.conversionRate}%</h2>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl animate-slide-up delay-300 min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 font-medium">O gráfico de vendas será exibido aqui na próxima Sprint.</p>
        </div>
      </div>
    </div>
  );
}
