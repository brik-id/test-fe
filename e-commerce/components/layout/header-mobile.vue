<template>
  <div class="flex flex-col drop-shadow-md py-3" :style="{ backgroundColor: 'var(--background-color)' }">

    <div class="flex flex-col justify-center items-center h-auto" :style="{width: '100%'}">
      <div class="flex justify-between items-center px-6" :style="{width: '100%'}">
        <h3>Discover</h3>
        <button class="flex relative">
          <span class="material-icons-outlined p-overlay-badge" :style="{fontSize: '2rem'}">shopping_bag</span>
          <Badge class="badge-shopping-bag" value="2" severity="secondary"></Badge>
        </button>
      </div>

      <div class="flex justify-center items-center gap-1 py-1 px-3" :style="{width: 'auto', border: '1px solid var(--primary-color)', borderRadius: '0.5rem'}">
        <i class="pi pi-search" :style="{fontSize: '1.2rem', color: 'var(--primary-color)'}"></i>
        <AutoComplete v-model="selectedBrand" optionLabel="name" :suggestions="filteredBrands" @complete="search" placeholder="Search"
                      :input-style="{width: '21rem', border: 'none', boxShadow: 'none', height: '2rem'}"/>
      </div>
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
.badge-shopping-bag {
  position: absolute;
  top: -0.8rem;
  right: -0.8rem;
}
</style>
