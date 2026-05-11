import React, { useState, useEffect } from 'react';
import { X, Building2, Briefcase, DollarSign, ListOrdered } from 'lucide-react';
import { customerService } from '../services/customerService';
import { dealService } from '../services/dealService';

export default function DealModal({ isOpen, onClose, onDealCreated, initialStage = 'LEAD' }) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    stage: initialStage,
    customerId: ''
  });
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadCustomers();
      setFormData(prev => ({ ...prev, stage: initialStage }));
    } else {
      // Reset form
      setFormData({ name: '', amount: '', stage: initialStage, customerId: '' });
      setError(null);
    }
  }, [isOpen, initialStage]);

  const loadCustomers = async () => {
    try {
      const data = await customerService.getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error('Error loading customers:', err);
      setError('Erro ao carregar lista de clientes.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        amount: parseFloat(formData.amount),
        stage: formData.stage,
        customerId: formData.customerId
      };

      await dealService.createDeal(payload);
      onDealCreated();
      onClose();
    } catch (err) {
      console.error('Error creating deal:', err);
      setError(err.response?.data?.detail || 'Erro ao criar oportunidade de negócio.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const stages = [
    { value: 'LEAD', label: 'Lead' },
    { value: 'PROPOSAL', label: 'Proposta' },
    { value: 'NEGOTIATION', label: 'Negociação' },
    { value: 'WON', label: 'Ganho' },
    { value: 'LOST', label: 'Perdido' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Nova Oportunidade</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form id="deal-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Nome do Negócio */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Nome do Negócio
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Projeto CRM Web"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm"
                />
              </div>
            </div>

            {/* Valor */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Valor Estimado (R$)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="amount"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Cliente */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Cliente Vinculado
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    name="customerId"
                    required
                    value={formData.customerId}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm appearance-none bg-white"
                  >
                    <option value="" disabled>Selecione um cliente...</option>
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Estágio */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Estágio Atual
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ListOrdered className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    name="stage"
                    required
                    value={formData.stage}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm appearance-none bg-white"
                  >
                    {stages.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            form="deal-form"
            type="submit"
            disabled={loading}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Salvando...' : 'Salvar Negócio'}
          </button>
        </div>
      </div>
    </div>
  );
}
