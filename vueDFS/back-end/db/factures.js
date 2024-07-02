module.exports = 
   [
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
  ]

