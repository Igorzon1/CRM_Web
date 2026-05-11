import { api } from './api';

export const dealService = {
  getDeals: async () => {
    const response = await api.get('/deals');
    return response.data;
  },

  createDeal: async (dealData) => {
    const response = await api.post('/deals', dealData);
    return response.data;
  },

  updateDealStage: async (id, stage) => {
    const response = await api.patch(`/deals/${id}/stage`, { stage });
    return response.data;
  },

  deleteDeal: async (id) => {
    await api.delete(`/deals/${id}`);
  },

  getNotes: async (dealId) => {
    const response = await api.get(`/deals/${dealId}/notes`);
    return response.data;
  },

  addNote: async (dealId, content) => {
    const response = await api.post(`/deals/${dealId}/notes`, { content });
    return response.data;
  }
};
