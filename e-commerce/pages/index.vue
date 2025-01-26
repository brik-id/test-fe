<template>
  <div class="card-container" @scroll="handleScroll">
    <ProductCard v-for="product in productsStore.products" :key="product.id" :product="product" />
  </div>
  <div class="flex justify-center items-center">
    <ProgressSpinner v-if="productsStore.loading" style="width: 2rem; height: 2rem; margin: 0.5rem" strokeWidth="8" fill="transparent" animationDuration=".5s" />
  </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/ui/product-card.vue';
import { useProductsStore } from '@/stores/products';
import ProgressSpinner from 'primevue/progressspinner';

const productsStore = useProductsStore();

const handleScroll = (event: any) => {
  const container = event.target;
  if (container.scrollHeight - container.scrollTop <= container.clientHeight + 10) {
    productsStore.getListProduct();
  }
};
</script>

<style scoped>
@media (min-width: 320px) {
  .card-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-height: 100vh;
    overflow-y: auto;
    padding: 1rem;
  }
}

@media (min-width: 1281px) {
  .card-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    max-height: 100vh;
    overflow-y: auto;
    padding: 1rem 20rem;
  }
}
</style>
