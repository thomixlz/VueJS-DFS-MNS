<template>
  <div class="container">
    <div class="row">
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <h1 class=""><i class="fa-solid fa-chevron-down"></i> LISTES DES CLIENTS</h1>
        </div>
        <div class="d-flex">
          <router-link to="/add-client" class="btn btn-primary mb-3">
            <i class="fas fa-user-plus"></i> Ajouter un client
          </router-link>
        </div>
      </div>
    </div>
   
    <div class="row">
      <div class="col-12">
        <table class="mt-3 table table-striped">
          <thead>
            <tr>
              <th class="col-5">Nom</th>
              <th class="col-3">Entreprise</th>
              <th>Date d'ajout</th>
              <th class="d-flex justify-content-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in clients" :key="client.id">
              <td>
                <i class="fas fa-user"></i> {{ client.nom }}
              </td>
              <td>{{ client.entreprise }}</td>
              <td>{{ client.dateAjout }}</td>
              <td class="d-flex justify-content-center">
                <button @click="handleDeleteClient(client.id)" class="btn btn-danger btn-sm me-2">
                  <i class="fas fa-trash-alt"></i> Supprimer
                </button>
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
</template>

<script>
import { useClientsStore } from '@/stores/clients';
import { computed } from 'vue';

export default {
  setup() {
    const clientsStore = useClientsStore();
    const clients = computed(() => clientsStore.clients);

    const handleDeleteClient = (id) => {
      clientsStore.deleteClient(id);
    };

    return {
      clients,
      handleDeleteClient
    };
  }
};
</script>
