<template>
  <div class="detail-container flex flex-col justify-start items-center overflow-x-hidden"
       :style="{ backgroundColor: 'var(--background-color)', width: '100%' }">
    <div v-if="productsStore.detailProduct" class="flex flex-col justify-center items-center">
      <div class="image-detail flex justify-center items-center" :style="{ backgroundColor: 'var(--background-color)'}">
        <img style="height: 100%; width: 100%; object-fit: contain;" alt="product-imag"
             :src="productsStore.detailProduct.thumbnail"/>
      </div>
      <div class="content-top flex flex-col justify-between w-full">
        <div class="flex justify-between items-start gap-2">
          <span class="brand-item">{{ productsStore.detailProduct.title }}</span>
          <button @click="toggleFavorite" class="flex items-center">
            <span :class="['icon', 'material-icons', isFavorite ? 'text-red-500' : '']">{{ isFavorite ? 'favorite' : 'favorite_border' }}</span>
          </button>
        </div>
        <span class="name-item">{{ productsStore.detailProduct.subtitle }}</span>
      </div>

      <div class="content-middle flex justify-between items-center w-full">
        <div class="flex flex-col">
          <span class="price-item">{{ formattedPriceIDR }}</span>
          <span class="size-item">varinat: {{ productsStore.detailProduct.options[0].values[0].value }}</span>
        </div>

        <div class="quantity-selector flex justify-between items-center gap-2" style="width: auto">
          <Button style="width: 2rem" @click="decreaseQuantity" severity="contrast" size="small">
            <span class="material-icons">remove</span>
          </Button>
          <InputNumber v-model="quantity" :useGrouping="false" :inputStyle="{width: '4rem', textAlign: 'center', fontWeight: 'bold'}"/>
          <Button style="width: 2rem" @click="increaseQuantity" severity="contrast" size="small">
            <span class="material-icons">add</span>
          </Button>
        </div>

      </div>

      <div class="content-bottom w-full">
        <Tabs value="0">
          <TabList>
            <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel v-for="tab in tabs" :value="tab.value">
              <div v-if="tab.value === '0'">{{ productsStore.detailProduct?.description }}</div>
              <div v-if="tab.value === '1'">
                <div>
                  <h3>Perfume Information</h3>
                  <p>Fragrance Family: Floral</p>
                  <p>Top Notes: Lavender, Lemon</p>
                  <p>Middle Notes: Rose, Jasmine</p>
                  <p>Base Notes: Sandalwood, Vanilla</p>
                  <p>About: This perfume is a timeless blend of floral and citrus notes, perfect for any occasion.</p>
                </div>
              </div>
              <div v-if="tab.value === '2'">
                <div>
                  <h3>Customer Reviews</h3>
                  <div v-if="reviews.length > 0">
                    <div v-for="review in reviews" :key="review.id">
                      <p><strong>{{ review.userName }}</strong> (Rating: {{ review.rating }} stars)</p>
                      <p>{{ review.comment }}</p>
                      <hr/>
                    </div>
                  </div>
                  <div v-else>
                    <p>No reviews available for this product.</p>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

    </div>




    <div v-if="productsStore.loading" class="flex justify-center items-center w-full h-full">
      <ProgressSpinner style="width: 2rem; height: 2rem; margin: 0.5rem" strokeWidth="8" fill="transparent" animationDuration=".5s"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const productsStore = useProductsStore();
const route = useRoute();
const productId = String(route.params.id);

const isFavorite = ref<boolean>(false);
const quantity = ref<number>(1);

const tabs = ref([
  {title: 'Detail', value: '0'},
  {title: 'Additional Information', value: '1'},
  {title: 'Reviews', value: '2'}
]);

const reviews = ref([
  {id: 1, userName: 'John Doe', rating: 5, comment: 'Great perfume, lasts all day!'},
  {id: 2, userName: 'Jane Smith', rating: 4, comment: 'Lovely scent, but a bit too strong for me.'},
  {id: 3, userName: 'Mark Johnson', rating: 3, comment: 'It\'s okay, but not my favorite.'},
  {id: 4, userName: 'Emily Davis', rating: 5, comment: 'Amazing! The scent is subtle yet long-lasting.'}
]);

onMounted(() => {
  productsStore.getDetailProduct(productId)
})

onUnmounted(() => {
  productsStore.detailProduct = null
})

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const formattedPriceIDR = computed(() => {
  const price = productsStore.detailProduct.variants[0].calculated_price.calculated_amount;
  return new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(price);
});

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};
</script>

<style scoped>
@media (min-width: 320px) {
  .detail-container {
    width: 100vw;
    height: 100vh;
  }

  .image-detail {
    width: 100vw;
    height: 20rem;
  }

  .content-top {
    padding: 1rem 2.5rem;
  }

  .content-middle {
    padding: 1rem 2.5rem;
    background-color: var(--secondary-color);
  }

  .content-bottom {
    padding: 1rem 2rem;
    min-height: 20rem;
  }

  .brand-item {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.4rem;
  }

  .name-item {
    font-size: 1.1rem;
  }

  .size-item {
    font-size: 1rem;
  }

  .price-item {
    font-size: 1.2rem;
    font-weight: bold;
  }

}

@media (min-width: 1281px) {
  .detail-container {
    width: 100vw;
    height: 100vh;
  }

  .image-detail {
    width: 100vw;
    height: 40rem;
  }

  .content-top {
    padding: 1rem 25rem;
  }

  .content-middle {
    padding: 1rem 25rem;
  }

  .content-bottom {
    padding: 1rem 25rem;
  }

  .brand-item {
    font-size: 2em;
    font-weight: bold;
    line-height: 1.2rem;
  }

  .name-item {
    font-size: 1.5rem;
  }

  .size-item {
    font-size: 1.2rem;
  }

  .price-item {
    font-size: 1.5rem;
    font-weight: bold;
  }
}

::v-deep(.p-tablist-tab-list) {
  display: flex;
  justify-content: center;
}

.icon {
  font-size: 2rem;
}
</style>
