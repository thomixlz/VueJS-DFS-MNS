<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-4">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/"><i class="fa-regular fa-lemon"></i> LE CITRON GOURMAND </RouterLink>

        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/"><i class="fa-solid fa-house"></i> Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/factures"><i class="fa-regular fa-file"></i> Factures</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/clients"><i class="fa-regular fa-user"></i> Clients</RouterLink>
          </li>   
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  }
}
</script>

<style scoped></style>
