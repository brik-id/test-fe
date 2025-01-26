<template>
  <div class="main-layout flex flex-col justify-between" :style="{ backgroundColor: 'var(--secondary-color)' }">
    <!-- Header desktop -->
    <HeaderDesktop v-if="showHeaderAndNavbar" class="header-desktop"/>

    <!-- Header mobile -->
    <HeaderMobile v-if="showHeaderAndNavbar && !hideHeaderMobile" class="header-mobile"/>

    <!-- Header detail mobile -->
    <HeaderDetailMobile v-if="hideHeaderMobile"/>

    <!-- Content -->
    <NuxtPage/>

    <!-- Navigation bar mobile -->
    <ButtonAddToCartContainer v-if="hideHeaderMobile"/>

    <!-- Navigation bar mobile -->
    <NavBarMobile v-if="showHeaderAndNavbar" class="navbar-mobile"/>
  </div>
</template>

<script setup lang="ts">
import HeaderDesktop from '@/components/layout/header-desktop.vue';
import HeaderMobile from '@/components/layout/header-mobile.vue';
import HeaderDetailMobile from '@/components/layout/header-detail-mobile.vue';
import ButtonAddToCartContainer from '@/components/layout/button-add-to-cart-container.vue';
import NavBarMobile from '@/components/layout/navbar-mobile.vue';

const route = useRoute();
const showHeaderAndNavbar = computed(() => !['/login', '/register'].includes(route.path));
const hideHeaderMobile = computed(() => route.path.startsWith('/detail/'));
</script>


<style scoped>
.main-layout {
  width: 100vw;
  height: 100vh;
}

@media (min-width: 320px) {
  .header-desktop {
    display: none;
  }

  .header-mobile {
    display: flex;
  }

  .navbar-mobile {
    display: flex;
  }
}

@media (min-width: 1281px) {
  .header-desktop {
    display: flex;
  }

  .header-mobile {
    display: none;
  }

  .navbar-mobile {
    display: none;
  }
}

</style>
