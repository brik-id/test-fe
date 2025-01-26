<template>
  <div class="flex justify-between items-center px-3 py-2 drop-shadow-md" :style="{ backgroundColor: 'var(--background-color)', width: '100%' }">
    <button @click="$router.back()" class="flex items-center">
      <span class="material-icons icon">arrow_back</span>
    </button>
    <h3>Details Product</h3>
    <button class="flex items-center">
      <span class="material-icons icon">share</span>
    </button>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
