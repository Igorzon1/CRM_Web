import React, { useState, useEffect } from 'react';
import { Plus, Search, Building2, User, MoreVertical, RefreshCw, Users, Phone, Mail, Edit2, Trash2 } from 'lucide-react';
import { customerService } from '../services/customerService';
import CustomerModal from '../components/CustomerModal';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);

  const fetchCustomers = async (nameFilter = '') => {
    setLoading(true);
    try {
      const data = await customerService.getCustomers(nameFilter);
      setCustomers(data);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customer) => {
    setCustomerToEdit(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setCustomerToEdit(null), 300);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await customerService.deleteCustomer(id);
        fetchCustomers(search);
      } catch (err) {
        alert('Erro ao excluir cliente.');
      }
    }
  };

  // Carregar ao abrir a tela
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Timer para debounce na pesquisa
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCustomers(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="h-full flex flex-col animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Gestão de Clientes</h1>
          <p className="text-slate-500 text-sm mt-1">Visualize e gerencie toda a sua carteira de contatos.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-input pl-9 pr-4 py-2 rounded-xl text-sm w-full md:w-64"
            />
          </div>
          
          <button 
            onClick={() => fetchCustomers(search)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button 
            onClick={() => { setCustomerToEdit(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Novo Cliente
          </button>
        </div>
      </div>

      {/* Main Content Area / Table */}
      <div className="flex-1 glass-panel rounded-2xl overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/60 text-xs uppercase tracking-wider font-semibold text-slate-500">
                <th className="px-6 py-4">Nome / Empresa</th>
                <th className="px-6 py-4">Contato</th>
                <th className="px-6 py-4 hidden md:table-cell">Documento</th>
                <th className="px-6 py-4 text-center">Tipo</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 text-sm">
              
              {loading && customers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-500 mb-2" />
                    Carregando clientes...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-slate-800 font-semibold mb-1">Nenhum cliente encontrado</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                      {search ? "Tente buscar por um nome diferente." : "Sua base de dados está vazia. Adicione o seu primeiro cliente clicando no botão acima."}
                    </p>
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{customer.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-slate-600">
                        <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400"/> {customer.email}</span>
                        {customer.phone && <span className="flex items-center gap-1.5 mt-1 text-xs"><Phone className="w-3.5 h-3.5 text-slate-400"/> {customer.phone}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-slate-600 font-mono text-xs">
                      {customer.document}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        customer.type === 'PJ' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {customer.type === 'PJ' ? <Building2 className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {customer.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(customer)}
                          className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(customer.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              
            </tbody>
          </table>
        </div>
        
        {/* Footer info */}
        {!loading && customers.length > 0 && (
          <div className="p-4 border-t border-slate-200/60 text-xs text-slate-500 text-center md:text-left bg-slate-50/50">
            Mostrando <span className="font-semibold text-slate-700">{customers.length}</span> clientes
          </div>
        )}
      </div>

      <CustomerModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onCustomerCreated={() => fetchCustomers(search)}
        customerToEdit={customerToEdit}
      />
    </div>
  );

}
