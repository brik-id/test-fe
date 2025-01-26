<template>
  <div class="flex justify-between h-auto py-2 px-4 border-t border-gray-200" :style="{ backgroundColor: 'var(--background-color)' }">
    <NuxtLink to="/">
      <Button severity="secondary" text>
        <span class="icon" :class="currentRoute === '/' ? 'material-icons active' : 'material-icons-outlined'">home</span>
      </Button>
    </NuxtLink>
    <NuxtLink to="/shipping">
      <Button severity="secondary" text>
        <span class="icon" :class="currentRoute === '/shipping' ? 'material-icons active' : 'material-icons-outlined'">local_shipping</span>
      </Button>
    </NuxtLink>
    <NuxtLink to="/saved">
      <Button severity="secondary" text>
        <span class="icon material-icons" :class="currentRoute === '/saved' ? 'active' : ''">{{ currentRoute === '/saved' ? 'favorite' : 'favorite_border' }}</span>
      </Button>
    </NuxtLink>
    <NuxtLink to="/profile">
      <Button severity="secondary" text>
        <span class="icon" :class="currentRoute === '/profile' ? 'material-icons active' : 'material-icons-outlined'">person</span>
      </Button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

const route = useRoute();
const currentRoute = computed(() => route.path);
</script>

<style scoped>
.icon {
  font-size: 2rem;
}

.active {
  color: var(--text-color);
}
</style>
