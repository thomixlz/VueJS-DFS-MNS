<template>
  <div class="container">
    <h1 class="my-4">Éditer une facture</h1>
    <form @submit.prevent="updateFacture">
      <div class="row mb-3">
        <div class="col-md-4">
          <label for="factureNumber" class="form-label">Facture N°:</label>
          <input type="text" class="form-control" id="factureNumber" v-model="facture.factureNumber">
        </div>
        <div class="col-md-8">
          <label for="description" class="form-label">Description:</label>
          <input type="text" class="form-control" id="description" v-model="facture.description">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-4">
          <label for="dateEmise" class="form-label">Émise le:</label>
          <input type="date" class="form-control" id="dateEmise" v-model="facture.dateEmise">
        </div>
        <div class="col-md-8">
          <label for="client" class="form-label">Client:</label>
          <select class="form-select" id="client" v-model="facture.client">
            <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option>
          </select>
        </div>
      </div>
      <h4 class="my-4">Prestations</h4>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Actions</th>
            <th scope="col">Prestation</th>
            <th scope="col">Quantité</th>
            <th scope="col">Montant unitaire</th>
            <th scope="col">Montant total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prestation in facture.prestations" :key="prestation.id">
            <td>
              <button @click="addPrestation" type="button" class="btn btn-success btn-sm me-2">
                <i class="fas fa-plus"></i>
              </button>
              <button @click="() => removePrestation(prestation.id)" type="button" class="btn btn-danger btn-sm">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
            <td><input type="text" class="form-control" v-model="prestation.description"></td>
            <td><input type="number" class="form-control" v-model.number="prestation.quantite" @input="updateMontantTotal(prestation)"></td>
            <td><input type="number" class="form-control" v-model.number="prestation.montantUnitaire" @input="updateMontantTotal(prestation)"></td>
            <td>{{ prestation.montantTotal.toFixed(2) }} €</td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label for="remises" class="form-label">Remises</label>
            <input type="text" class="form-control" id="remises" v-model="facture.remises">
          </div>
          <div class="mb-3">
            <label for="dejaPaye" class="form-label">Déjà payé</label>
            <input type="text" class="form-control" id="dejaPaye" v-model="facture.dejaPaye">
          </div>
        </div>
        <div class="col-md-6 text-end">
          <div class="mb-3">
            <label for="totalHT" class="form-label">Total HT</label>
            <input type="text" class="form-control" id="totalHT" v-model="totalHT" readonly>
          </div>
          <div class="mb-3">
            <label for="tva" class="form-label">TVA (20%)</label>
            <input type="text" class="form-control" id="tva" v-model="tva" readonly>
          </div>
          <div class="mb-3">
            <label for="totalTTC" class="form-label">Montant TTC</label>
            <input type="text" class="form-control" id="totalTTC" v-model="totalTTC" readonly>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-6">
          <label class="form-label">Montant HT</label>
          <p>{{ totalHT }} €</p>
        </div>
        <div class="col-md-6">
          <label class="form-label">Montant TTC</label>
          <p>{{ totalTTC }} €</p>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">
        <i class="fas fa-save"></i> Enregistrer
      </button>
      <button @click="deleteFacture" type="button" class="btn btn-danger ms-2">
        <i class="fas fa-trash-alt"></i> Supprimer
      </button>
      <router-link to="/factures" class="btn btn-secondary ms-2">
        <i class="fas fa-arrow-left"></i> Retour
      </router-link>
    </form>
  </div>
</template>

<script>
import { useFacturesStore } from '@/stores/factures';
import { useRouter, useRoute } from 'vue-router';
import { reactive, onMounted, computed } from 'vue';

export default {
  setup() {
    const facturesStore = useFacturesStore();
    const router = useRouter();
    const route = useRoute();
    const factureId = parseInt(route.params.id);

    const facture = reactive({
      factureNumber: '',
      description: '',
      dateEmise: '',
      client: null,
      prestations: [],
      remises: '0,00 €',
      dejaPaye: '0,00 €',
    });

    onMounted(() => {
      const existingFacture = facturesStore.factures.find(f => f.id === factureId);
      if (existingFacture) {
        Object.assign(facture, existingFacture);
        facture.prestations.forEach(prestation => {
          prestation.montantTotal = prestation.quantite * prestation.montantUnitaire;
        });
      }
    });

    const updateFacture = () => {
      facturesStore.updateFacture({ ...facture, id: factureId });
      router.push('/factures');
    };

    const deleteFacture = () => {
      facturesStore.deleteFacture(factureId);
      router.push('/factures');
    };

    const addPrestation = () => {
      facture.prestations.push({ id: Date.now(), description: '', quantite: 0, montantUnitaire: 0, montantTotal: 0 });
    };

    const removePrestation = (id) => {
      facture.prestations = facture.prestations.filter(p => p.id !== id);
    };

    const updateMontantTotal = (prestation) => {
      prestation.montantTotal = prestation.quantite * prestation.montantUnitaire;
    };

    const totalHT = computed(() => {
      return facture.prestations.reduce((acc, prestation) => acc + prestation.montantTotal, 0).toFixed(2);
    });

    const tva = computed(() => {
      return (parseFloat(totalHT.value) * 0.2).toFixed(2);
    });

    const totalTTC = computed(() => {
      return (parseFloat(totalHT.value) + parseFloat(tva.value)).toFixed(2);
    });

    return {
      facture,
      updateFacture,
      deleteFacture,
      addPrestation,
      removePrestation,
      updateMontantTotal,
      clients: facturesStore.clients,
      totalHT,
      tva,
      totalTTC
    };
  }
};
</script>
