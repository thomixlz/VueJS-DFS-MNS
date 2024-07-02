<template>
  <div class="container py-4">

    <PageHeader />

    

    <div class="border p-4 rounded">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'

export default {
  components: {
    PageHeader,
    // RouterLink,
    RouterView
  }
}
</script>

<style scoped></style>
