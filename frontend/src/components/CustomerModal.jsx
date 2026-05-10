import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, FileText, Briefcase, ArrowRight, AlertCircle } from 'lucide-react';
import { customerService } from '../services/customerService';

export default function CustomerModal({ isOpen, onClose, onCustomerCreated, customerToEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    document: '',
    type: 'PJ' // Default to PJ
  });

  useEffect(() => {
    if (customerToEdit) {
      setFormData({
        name: customerToEdit.name || '',
        email: customerToEdit.email || '',
        phone: customerToEdit.phone || '',
        document: customerToEdit.document || '',
        type: customerToEdit.type || 'PJ'
      });
    } else {
      setFormData({ name: '', email: '', phone: '', document: '', type: 'PJ' });
    }
    setError('');
  }, [customerToEdit, isOpen]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (customerToEdit) {
        await customerService.updateCustomer(customerToEdit.id, formData);
      } else {
        await customerService.createCustomer(formData);
      }
      onCustomerCreated();
      onClose(); // Fechar o modal após criar/editar
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        const msg = data.invalid_params || data.detail || data.title || (typeof data === 'string' ? data : "Erro ao cadastrar cliente");
        setError(msg);
      } else {
        setError("Erro de conexão com o servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop (Glassmorphism) */}
      <div 
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl w-full max-w-lg relative z-10 animate-slide-up overflow-hidden">
        
        <div className="flex justify-between items-center p-6 border-b border-slate-200/60 bg-white/50">
          <h2 className="text-xl font-bold text-slate-800">
            {customerToEdit ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 animate-fade-in text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Nome */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Razão Social / Nome Completo</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  className="glass-input block w-full pl-10 pr-3 py-2.5 rounded-xl text-slate-900 placeholder-slate-400 outline-none text-sm"
                  placeholder="Nome do cliente"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email e Telefone em 2 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">E-mail de Contato</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    className="glass-input block w-full pl-10 pr-3 py-2.5 rounded-xl text-slate-900 placeholder-slate-400 outline-none text-sm"
                    placeholder="email@empresa.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Telefone</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500">
                    <Phone className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    className="glass-input block w-full pl-10 pr-3 py-2.5 rounded-xl text-slate-900 placeholder-slate-400 outline-none text-sm"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Tipo e Documento em 2 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Tipo de Cliente</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <select
                    name="type"
                    className="glass-input block w-full pl-10 pr-3 py-2.5 rounded-xl text-slate-900 outline-none text-sm appearance-none bg-white/70"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="PJ">Pessoa Jurídica (PJ)</option>
                    <option value="PF">Pessoa Física (PF)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Documento (CPF/CNPJ)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500">
                    <FileText className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    name="document"
                    required
                    className="glass-input block w-full pl-10 pr-3 py-2.5 rounded-xl text-slate-900 placeholder-slate-400 outline-none text-sm"
                    placeholder="00.000.000/0001-00"
                    value={formData.document}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-70"
              >
                {loading ? 'Salvando...' : (customerToEdit ? 'Salvar Alterações' : 'Cadastrar Cliente')}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
