// src/stores/clients.js

import { defineStore } from 'pinia';

const convertDateToISO = (dateStr) => {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const convertDateToDisplay = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

export const useClientsStore = defineStore('clients', {
  state: () => ({
    clients: [
      { id: 1, nom: "Hervé Padilla", entreprise: "IFA Metz", dateAjout: "2021-01-15" },
      { id: 2, nom: "John Favreau", entreprise: "LucasFilms", dateAjout: "2021-01-15" },
      // Ajoutez plus de clients ici
    ]
  }),
  actions: {
    addClient(client) {
      client.dateAjout = convertDateToISO(client.dateAjout);
      this.clients.push(client);
    },
    deleteClient(clientId) {
      this.clients = this.clients.filter(client => client.id !== clientId);
    },
    updateClient(updatedClient) {
      updatedClient.dateAjout = convertDateToISO(updatedClient.dateAjout);
      const index = this.clients.findIndex(client => client.id === updatedClient.id);
      if (index !== -1) {
        this.clients[index] = updatedClient;
      }
    }
  }
});
