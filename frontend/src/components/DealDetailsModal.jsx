import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Send, Clock } from 'lucide-react';
import { dealService } from '../services/dealService';

export default function DealDetailsModal({ isOpen, onClose, deal }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && deal) {
      loadNotes();
    } else {
      setNotes([]);
      setNewNote('');
    }
  }, [isOpen, deal]);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await dealService.getNotes(deal.id);
      setNotes(data);
    } catch (err) {
      console.error('Error loading notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      setSubmitting(true);
      const note = await dealService.addNote(deal.id, newNote);
      setNotes([note, ...notes]);
      setNewNote('');
    } catch (err) {
      console.error('Error adding note:', err);
      alert('Erro ao salvar anotação.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (!isOpen || !deal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{deal.name}</h2>
            <p className="text-sm text-slate-500 mt-1">Cliente: <span className="font-medium text-slate-700">{deal.customerName}</span></p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-6 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Histórico e Notas
          </h3>

          {loading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center p-8 bg-white border border-slate-100 rounded-xl">
              <p className="text-slate-500">Nenhuma anotação registrada ainda.</p>
              <p className="text-xs text-slate-400 mt-1">Adicione a primeira anotação abaixo.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {notes.map((note) => (
                <div key={note.id} className="relative pl-6 border-l-2 border-blue-100">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-slate-700 whitespace-pre-wrap text-sm">{note.content}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                      <span className="font-medium text-slate-600">{note.authorName}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(note.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-100 bg-white flex-shrink-0">
          <form onSubmit={handleAddNote} className="flex gap-3">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Digite uma nota ou resumo da interação..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm outline-none"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting || !newNote.trim()}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2 font-medium text-sm shadow-sm"
            >
              <Send className="w-4 h-4" />
              Enviar
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
