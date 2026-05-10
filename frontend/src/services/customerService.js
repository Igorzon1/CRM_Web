import { api } from './api';

export const customerService = {
  getCustomers: async (nameFilter = '') => {
    const params = nameFilter ? { name: nameFilter } : {};
    const response = await api.get('/customers', { params });
    return response.data;
  },

  createCustomer: async (customerData) => {
    const response = await api.post('/customers', customerData);
    return response.data;
  }
};
