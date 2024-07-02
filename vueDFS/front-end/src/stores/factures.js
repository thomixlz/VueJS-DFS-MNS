import { defineStore } from 'pinia';

export const useFacturesStore = defineStore('factures', {
  state: () => ({
    factures: [
        {
          id: 1,
          dateEmise: "2024-06-14",
          factureNumber: "1",
          description: "Description de la facture 1",
          client: 1,  
          prestations: [
            { id: 1, description: "Service A", quantite: 2, montantUnitaire: 500 },
            { id: 2, description: "Service B", quantite: 3, montantUnitaire: 200 }
          ]
        },
        {
          id: 2,
          dateEmise: "2024-05-14",
          factureNumber: "2",
          description: "Description de la facture 2",
          client: 2,  
          prestations: [
            { id: 3, description: "Service C", quantite: 1, montantUnitaire: 300 },
            { id: 4, description: "Service D", quantite: 4, montantUnitaire: 150 }
          ]
        }
      ],
      clients: [
        { id: 1, name: 'John Smith' },
        { id: 2, name: 'Jane Doe' },
        { id: 3, name: 'John Doe' }
      ]
      
  }),
  getters: {
    getMontantHT: (state) => (factureId) => {
      const facture = state.factures.find(f => f.id === factureId);
      if (!facture) return 0;
      return facture.prestations.reduce((total, prestation) => total + (prestation.quantite * prestation.montantUnitaire), 0);
    },
    getMontantTTC: (state) => (factureId) => {
      const montantHT = useFacturesStore().getMontantHT(factureId);
      const TVA_RATE = 0.20;
      return montantHT * (1 + TVA_RATE);
    },
    getClientName: (state) => (clientId) => {
      const client = state.clients.find(c => c.id === clientId);
      return client ? client.name : 'Unknown Client';
    }
  },
  actions: {
    addFacture(facture) {
      this.factures.push(facture);
    },
    deleteFacture(id) {
      this.factures = this.factures.filter(facture => facture.id !== id);
    },
    updateFacture(updatedFacture) {
      const index = this.factures.findIndex(facture => facture.id === updatedFacture.id);
      if (index !== -1) {
        this.factures[index] = updatedFacture;
      }
    }
  }
});
