import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { dealService } from '../services/dealService';
import DealModal from '../components/DealModal';
import DealDetailsModal from '../components/DealDetailsModal';
import { Plus, GripVertical, Trash2 } from 'lucide-react';

const COLUMNS = [
  { id: 'LEAD', title: 'Lead', color: 'bg-slate-100', borderColor: 'border-slate-200', titleColor: 'text-slate-700' },
  { id: 'PROPOSAL', title: 'Proposta', color: 'bg-blue-50', borderColor: 'border-blue-200', titleColor: 'text-blue-700' },
  { id: 'NEGOTIATION', title: 'Negociação', color: 'bg-yellow-50', borderColor: 'border-yellow-200', titleColor: 'text-yellow-700' },
  { id: 'WON', title: 'Ganho', color: 'bg-green-50', borderColor: 'border-green-200', titleColor: 'text-green-700' },
  { id: 'LOST', title: 'Perdido', color: 'bg-red-50', borderColor: 'border-red-200', titleColor: 'text-red-700' }
];

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialStage, setInitialStage] = useState('LEAD');
  
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      setLoading(true);
      const data = await dealService.getDeals();
      setDeals(data);
    } catch (err) {
      console.error('Error loading deals:', err);
      setError('Erro ao carregar oportunidades.');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const draggedDeal = deals.find(d => d.id === draggableId);
    if (!draggedDeal) return;

    // Optimistic UI update
    const newDeals = Array.from(deals);
    const dealIndex = newDeals.findIndex(d => d.id === draggableId);
    newDeals[dealIndex] = { ...draggedDeal, stage: destination.droppableId };
    setDeals(newDeals);

    try {
      // Backend update
      await dealService.updateDealStage(draggableId, destination.droppableId);
    } catch (err) {
      console.error('Error updating deal stage:', err);
      // Revert on error
      setDeals(deals);
      alert('Erro ao atualizar estágio do negócio.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta oportunidade?')) return;
    
    try {
      await dealService.deleteDeal(id);
      setDeals(deals.filter(d => d.id !== id));
    } catch (err) {
      console.error('Error deleting deal:', err);
      alert('Erro ao excluir oportunidade.');
    }
  };

  const openNewDealModal = (stage = 'LEAD') => {
    setInitialStage(stage);
    setIsModalOpen(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Funil de Vendas</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie suas oportunidades arrastando entre as colunas.</p>
        </div>
        <button
          onClick={() => openNewDealModal('LEAD')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-5 h-5" />
          Nova Oportunidade
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-6 h-full min-w-max items-start">
            {COLUMNS.map(column => {
              const columnDeals = deals.filter(d => d.stage === column.id);
              const columnTotal = columnDeals.reduce((sum, d) => sum + d.amount, 0);

              return (
                <div key={column.id} className="flex flex-col w-80 max-h-full">
                  {/* Column Header */}
                  <div className={`mb-3 px-4 py-3 rounded-xl border ${column.color} ${column.borderColor}`}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`font-bold ${column.titleColor}`}>{column.title}</h3>
                      <span className="text-xs font-semibold px-2 py-1 bg-white/60 rounded-full text-slate-600">
                        {columnDeals.length}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-slate-600">
                      {formatCurrency(columnTotal)}
                    </div>
                  </div>

                  {/* Drop Zone */}
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 overflow-y-auto rounded-xl p-2 transition-colors border-2 ${
                          snapshot.isDraggingOver ? 'bg-blue-50/50 border-blue-200 border-dashed' : 'bg-slate-50/50 border-transparent'
                        }`}
                        style={{ minHeight: '150px' }}
                      >
                        {columnDeals.map((deal, index) => (
                          <Draggable key={deal.id} draggableId={deal.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                onClick={() => {
                                  setSelectedDeal(deal);
                                  setIsDetailsOpen(true);
                                }}
                                className={`group mb-3 p-4 bg-white rounded-xl border shadow-sm transition-all cursor-pointer ${
                                  snapshot.isDragging ? 'shadow-lg border-blue-300 rotate-2 scale-105' : 'border-slate-200 hover:border-blue-200 hover:shadow-md'
                                }`}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <div {...provided.dragHandleProps} className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing">
                                      <GripVertical className="w-4 h-4" />
                                    </div>
                                    <h4 className="font-semibold text-slate-800 line-clamp-2 leading-snug">
                                      {deal.name}
                                    </h4>
                                  </div>
                                  <button
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(deal.id);
                                    }}
                                    className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10 relative"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="pl-6">
                                  <p className="text-sm font-bold text-slate-700 mb-2">
                                    {formatCurrency(deal.amount)}
                                  </p>
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                                      {deal.customerName.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-xs text-slate-500 truncate" title={deal.customerName}>
                                      {deal.customerName}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        
                        {/* Quick add button at the bottom of the column */}
                        <button
                          onClick={() => openNewDealModal(column.id)}
                          className="w-full py-2 mt-2 flex items-center justify-center gap-1 text-sm font-medium text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                        >
                          <Plus className="w-4 h-4" /> Adicionar
                        </button>
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </div>
      </DragDropContext>

      <DealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDealCreated={loadDeals}
        initialStage={initialStage}
      />

      <DealDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        deal={selectedDeal}
      />
    </div>
  );
}
