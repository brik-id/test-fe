<template>
  <Card @click="goToDetail" class="custom-card" style="height: auto;">
    <template #header>
      <div class="flex justify-center items-center p-1 p-2">
        <img style="height: 12rem; object-fit: contain;" alt="product-imag"
             :src="product.thumbnail"/>
      </div>
    </template>
    <template #content>
      <div class="content flex flex-col justify-between">
        <div class="flex flex-col justify-between">
          <div class="flex justify-between items-start gap-2">
            <span class="brand-item">{{ product.title }}</span>
            <button @click="toggleFavorite" class="flex items-center">
              <span :class="['icon', 'material-icons', isFavorite ? 'text-red-500' : '']">{{ isFavorite ? 'favorite' : 'favorite_border' }}</span>
            </button>
          </div>
          <span class="name-item">{{ product.subtitle }}</span>
        </div>

        <div class="flex justify-between items-center">
          <span class="size-item">{{ product.options[0].values[0].value }}</span>
          <span class="price-item">{{ formattedPriceIDR }}</span>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const {product} = props;

const isFavorite = ref<boolean>(false);

const goToDetail = () => {
  navigateTo(`/detail/${product.id}`);
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const formattedPriceIDR = computed(() => {
  const price = product.variants[0].calculated_price.calculated_amount;
  return new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(price);
});

</script>

<style scoped>
@media (min-width: 320px) {
  ::v-deep(.p-card-body) {
    padding: 0.7rem;
  }

  .content {
    min-height: 6rem;
  }

  .brand-item {
    font-size: 0.9rem;
    font-weight: bold;
    line-height: 1.2rem;
  }

  .name-item {
    font-size: 0.9rem;
  }

  .size-item {
    font-size: 0.8rem;
  }

  .price-item {
    font-size: 0.8rem;
    font-weight: bold;
  }
}

@media (min-width: 1281px) {
  ::v-deep(.p-card-body) {
    padding: 1.5rem;
  }

  .custom-card {
    padding-top: 3rem;
    padding-bottom: 1rem;
  }

  .content {
    min-height: 9rem;
  }

  .brand-item {
    font-size: 1.6rem;
    font-weight: bold;
    line-height: 2rem;
  }

  .name-item {
    font-size: 1.3rem;
  }

  .size-item {
    font-size: 1.2rem;
  }

  .price-item {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>
