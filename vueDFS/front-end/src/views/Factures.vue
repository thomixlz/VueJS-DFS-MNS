<template>
  <div class="container">
    <div class="row mb-5">
      <div class="d-flex justify-content-between">
        <h1><i class="fa-solid fa-chevron-down"></i> LISTES DES FACTURES</h1>
        <div class="d-flex justify-content-end">
          <router-link to="/add-factures" class="btn btn-primary mb-3">
            <i class="fas fa-user-plus"></i> Ajouter une facture
          </router-link>
        </div>
      </div>
    </div>
    <table class="table table-striped">
      <tbody>
        <tr v-for="facture in factures" :key="facture.id">
          <td>Facture n° {{ facture.factureNumber }}</td>
          <td>{{ facture.dateEmise }} | {{ facture.description }}</td>
          <td>{{ getClientName(facture.client) }}</td>
          <td>{{ getMontantHT(facture.id) }}€ HT</td>
          <td>{{ getMontantTTC(facture.id) }}€ TTC</td>
          <td>
            <button @click="handleDeleteFacture(facture.id)" class="btn btn-danger btn-sm me-2">
              <i class="fas fa-trash-alt"></i> Supprimer
            </button>
            <router-link :to="'/edit-factures/' + facture.id" class="btn btn-warning btn-sm">
              <i class="fa-solid fa-pen-to-square"></i> Éditer
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useFacturesStore } from '@/stores/factures';
import { computed } from 'vue';

export default {
  setup() {
    const facturesStore = useFacturesStore();

    const factures = computed(() => facturesStore.factures);
    const getMontantHT = (factureId) => facturesStore.getMontantHT(factureId);
    const getMontantTTC = (factureId) => facturesStore.getMontantTTC(factureId);
    const getClientName = (clientId) => facturesStore.getClientName(clientId);

    const handleDeleteFacture = (id) => {
      facturesStore.deleteFacture(id);
    };

    return {
      factures,
      getMontantHT,
      getMontantTTC,
      getClientName,
      handleDeleteFacture
    };
  }
};
</script>
