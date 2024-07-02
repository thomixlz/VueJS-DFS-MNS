<template>
  <div class="container">
    <h1 class="my-4">Éditer un client</h1>
    <form @submit.prevent="updateClient">
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="nom" class="form-label">Nom:</label>
          <input type="text" class="form-control" id="nom" v-model="client.nom">
        </div>
        <div class="col-md-6">
          <label for="entreprise" class="form-label">Entreprise:</label>
          <input type="text" class="form-control" id="entreprise" v-model="client.entreprise">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="dateAjout" class="form-label">Date d'ajout:</label>
          <input type="date" class="form-control" id="dateAjout" v-model="client.dateAjout">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">
        <i class="fas fa-save"></i> Enregistrer
      </button>
      <button @click="deleteClient" type="button" class="btn btn-danger ms-2">
        <i class="fas fa-trash-alt"></i> Supprimer
      </button>
      <router-link to="/clients" class="btn btn-secondary ms-2">
        <i class="fas fa-arrow-left"></i> Retour
      </router-link>
    </form>
  </div>
</template>

<script>
import { useClientsStore } from '@/stores/clients';
import { useRouter, useRoute } from 'vue-router';
import { reactive, onMounted } from 'vue';

export default {
  setup() {
    const clientsStore = useClientsStore();
    const router = useRouter();
    const route = useRoute();
    const clientId = parseInt(route.params.id);

    const client = reactive({
      nom: '',
      entreprise: '',
      dateAjout: ''
    });

    onMounted(() => {
      const existingClient = clientsStore.clients.find(c => c.id === clientId);
      if (existingClient) {
        Object.assign(client, existingClient);
      }
    });

    const updateClient = () => {
      clientsStore.updateClient({ ...client, id: clientId });
      router.push('/clients');
    };

    const deleteClient = () => {
      clientsStore.deleteClient(clientId);
      router.push('/clients');
    };

    return {
      client,
      updateClient,
      deleteClient
    };
  }
};
</script>
