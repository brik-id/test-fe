<template>
  <div class="flex flex-col drop-shadow-md py-3" :style="{ backgroundColor: 'var(--background-color)' }">
    <div class="flex justify-end h-auto px-6">
      <NuxtLink to="/">
        <Button severity="secondary" text>
          <span class="icon" :class="currentRoute === '/' ? 'material-icons active' : 'material-icons-outlined'">home</span>
          <span class="font-semibold" :class="{ active: currentRoute === '/' }">Home</span>
        </Button>
      </NuxtLink>
      <NuxtLink to="/shipping">
        <Button severity="secondary" text>
          <span class="icon" :class="currentRoute === '/shipping' ? 'material-icons active' : 'material-icons-outlined'">local_shipping</span>
          <span class="font-semibold" :class="{ active: currentRoute === '/shipping' }">Shipping</span>
        </Button>
      </NuxtLink>
      <NuxtLink to="/saved">
        <Button severity="secondary" text>
          <span class="icon material-icons" :class="currentRoute === '/saved' ? 'active' : ''">
            {{ currentRoute === '/saved' ? 'favorite' : 'favorite_border' }}
          </span>
        </Button>
      </NuxtLink>
      <NuxtLink to="/profile">
        <Button severity="secondary" text>
          <span class="icon" :class="currentRoute === '/profile' ? 'material-icons active' : 'material-icons-outlined'">person</span>
        </Button>
      </NuxtLink>
    </div>

    <div class="flex justify-center items-center gap-5 h-auto px-6">
      <h2>Discover</h2>
      <div class="flex justify-center items-center gap-2" :style="{border: '1px solid var(--primary-color)', borderRadius: '0.5rem', padding: '0.2rem 1rem'}">
        <i class="pi pi-search" :style="{fontSize: '1.2rem', color: 'var(--primary-color)'}"></i>
        <AutoComplete v-model="selectedBrand" optionLabel="name" :suggestions="filteredBrands" @complete="search" placeholder="Search"
                      :input-style="{width: '30rem', border: 'none', boxShadow: 'none'}"/>
      </div>
      <button class="flex relative">
        <span class="material-icons-outlined p-overlay-badge" :style="{fontSize: '2rem'}">shopping_bag</span>
        <Badge class="badge-shopping-bag" value="2" severity="secondary"></Badge>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import AutoComplete from 'primevue/autocomplete';

interface PerfumeBrand {
  name: string;
  country: string;
}

const brands = ref<PerfumeBrand[]>([
  {name: "Chanel", country: "France"},
  {name: "Dior", country: "France"},
  {name: "Tom Ford", country: "United States"},
  {name: "Gucci", country: "Italy"},
  {name: "Yves Saint Laurent", country: "France"},
  {name: "Calvin Klein", country: "United States"},
  {name: "Jo Malone", country: "United Kingdom"},
  {name: "Hermès", country: "France"},
  {name: "Creed", country: "United Kingdom"},
  {name: "Dolce & Gabbana", country: "Italy"},
  {name: "Versace", country: "Italy"},
  {name: "Burberry", country: "United Kingdom"},
  {name: "Lancôme", country: "France"},
  {name: "Montblanc", country: "Germany"},
  {name: "Armani", country: "Italy"},
  {name: "Bvlgari", country: "Italy"},
  {name: "Givenchy", country: "France"},
  {name: "Prada", country: "Italy"},
  {name: "Hugo Boss", country: "Germany"},
  {name: "Estee Lauder", country: "United States"}
]);

const route = useRoute();
const currentRoute = computed(() => route.path);

const selectedBrand = ref<PerfumeBrand | null>(null);
const filteredBrands = ref<PerfumeBrand[]>([]);

const search = (event: { query: string }) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredBrands.value = [...brands.value];
    } else {
      filteredBrands.value = brands.value.filter((brand) =>
          brand.name.toLowerCase().startsWith(event.query.toLowerCase())
      );
    }
  }, 250);
};
</script>

<style scoped>
.icon {
  font-size: 2rem;
}

.active {
  color: var(--text-color);
}

.badge-shopping-bag {
  position: absolute;
  top: -0.8rem;
  right: -0.8rem;
}
</style>
