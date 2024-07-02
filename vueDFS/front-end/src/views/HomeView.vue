<template>
  <div class="container">
    <div class="d-flex justify-content-between mb-3">
      <div>
        <h1><i class="fa-solid fa-chevron-down"></i> DASHBOARD</h1>
      </div>
      <div>
        <router-link to="/add-client" class="btn btn-success me-2">
          <i class="fas fa-user-plus"></i> Ajouter un client
        </router-link>
        <router-link to="/add-factures" class="btn btn-info text-white">
          <i class="fas fa-file-invoice text-white"></i> Ajouter une facture
        </router-link>
      </div>
    </div>
   
    <div class="row">
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title"><span>{{ factures.length }}</span> factures en 2023</h5>
            <div class="chart-container">
              <canvas id="facturesChart"></canvas>
            </div>
            <h6 class="mt-4 text-end total-money">{{ totalTTC }} €</h6>
            <ul class="list-unstyled mt-3">
              <li class="d-flex justify-content-between">
                <div class="d-flex">
                  <div class="circle-pourcentage circle-pourcentage-1"></div> 
                  Total Encaissée TTC - {{ totalEncaisséePourcentage.toFixed(1) }} %
                </div>
                <div class="icon-part">
                  <span class="">{{ totalEncaisséeVariation.toFixed(1) }}%</span>
                  <i :class="totalEncaisséeVariation > 0 ? 'fa-solid fa-arrow-up text-success' : 'fa-solid fa-arrow-down text-danger'"></i>
                </div>
              </li>

              <li class="d-flex justify-content-between">
                <div class="d-flex">
                  <div class="circle-pourcentage circle-pourcentage-2"></div> 
                  Total Facturée TTC - {{ totalFacturéePourcentage.toFixed(1) }} %
                </div>
                <div class="icon-part">
                  <span>{{ totalFacturéeVariation.toFixed(1) }}%</span>
                  <i :class="totalFacturéeVariation > 0 ? 'fa-solid fa-arrow-up text-success' : 'fa-solid fa-arrow-down text-danger'"></i>
                </div>
              </li>

              <li class="d-flex justify-content-between">
                <div class="d-flex">
                  <div class="circle-pourcentage circle-pourcentage-3"></div> 
                  Dû à plus d'un mois TTC - {{ duPlusUnMoisPourcentage.toFixed(1) }} %
                </div>
                <div class="icon-part">
                  <span class="">{{ duPlusUnMoisVariation.toFixed(1) }}%</span>
                  <i :class="duPlusUnMoisVariation > 0 ? 'fa-solid fa-arrow-up text-success' : 'fa-solid fa-arrow-down text-danger'"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="d-flex col-md-8 flex-column">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title"><i class="fa-regular fa-file-lines"></i> Factures en cours :</h5>
            <table class="mt-4 table table-striped">
              <thead>
                <tr>
                  <th>Facture n°</th>
                  <th>Date & Description</th>
                  <th>Client</th>
                  <th>Montant HT</th>
                  <th>Montant TTC</th>
                  <th class="d-flex justify-content-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="facture in factures" :key="facture.id">
                  <td>Facture n° {{ facture.factureNumber }}</td>
                  <td>{{ facture.dateEmise }} | {{ facture.description }}</td>
                  <td>{{ getClientName(facture.client) }}</td>
                  <td>{{ getMontantHT(facture.id) }}€ HT</td>
                  <td>{{ getMontantTTC(facture.id) }}€ TTC</td>
                  <td class="d-flex justify-content-center">
                    <router-link :to="'/edit-factures/' + facture.id" class="btn btn-warning btn-sm">
                      <i class="fa-solid fa-pen-to-square"></i> Éditer
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
     
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title"><i class="fa-solid fa-person"></i> Clients :</h5>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Nom du contact</th>
                  <th>Entreprise</th>
                  <th>Date d'ajout</th>
                  <th class="d-flex justify-content-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="client in clients" :key="client.id">
                  <td>{{ client.nom }}</td>
                  <td>{{ client.entreprise }}</td>
                  <td>{{ client.dateAjout }}</td>
                  <td class="d-flex justify-content-center">
                    <router-link :to="'/edit-client/' + client.id" class="btn btn-warning btn-sm">
                      <i class="fa-solid fa-pen-to-square"></i> Éditer
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useFacturesStore } from '@/stores/factures';
import { useClientsStore } from '@/stores/clients';
import { computed, onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

export default {
  setup() {
    const facturesStore = useFacturesStore();
    const clientsStore = useClientsStore();

    const factures = computed(() => facturesStore.factures);
    const clients = computed(() => clientsStore.clients);
    const totalTTC = computed(() => 
      facturesStore.factures.reduce((total, facture) => total + facturesStore.getMontantTTC(facture.id), 0).toFixed(2)
    );

    // Compute percentages for the chart
    const totalEncaissée = ref(0); 
    const totalFacturée = ref(totalTTC);
    const duPlusUnMois = ref(0);  

    const totalEncaisséePourcentage = computed(() => (totalEncaissée.value / totalFacturée.value) * 100);
    const totalFacturéePourcentage = computed(() => (totalFacturée.value / totalTTC.value) * 100);
    const duPlusUnMoisPourcentage = computed(() => (duPlusUnMois.value / totalTTC.value) * 100);

    // Dummy variations
    const totalEncaisséeVariation = ref(2);  
    const totalFacturéeVariation = ref(8);  
    const duPlusUnMoisVariation = ref(-5);  

    const getClientName = (clientId) => {
      const client = clientsStore.clients.find(c => c.id === clientId);
      return client ? client.name : 'N/A';
    };

    const getMontantHT = (factureId) => facturesStore.getMontantHT(factureId);
    const getMontantTTC = (factureId) => facturesStore.getMontantTTC(factureId);

    onMounted(() => {
      renderChart();
    });

    const renderChart = () => {
      new Chart(document.getElementById('facturesChart'), {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [totalEncaisséePourcentage.value, totalFacturéePourcentage.value, duPlusUnMoisPourcentage.value],
            backgroundColor: ['#007bff', '#ffc107', '#dc3545'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1
        }
      });
    };

    return {
      factures,
      clients,
      totalTTC,
      getClientName,
      getMontantHT,
      getMontantTTC,
      totalEncaisséePourcentage,
      totalFacturéePourcentage,
      duPlusUnMoisPourcentage,
      totalEncaisséeVariation,
      totalFacturéeVariation,
      duPlusUnMoisVariation
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.card {
  min-height: 400px;
}
.chart-container {
  position: relative;
  height: 200px; 
}
</style>
