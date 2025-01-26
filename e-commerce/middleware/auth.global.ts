export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  const productsStore = useProductsStore();

  productsStore.loading = false;

  if (to.path === '/') {
    productsStore.getListProduct();
  }

  if (to.params.id && to.name === 'detail-id') {
    const productId = to.params.id;
    if (typeof productId === "string") {
      productsStore.getDetailProduct(productId);
    }
  }

  const publicRoutes = ['/login', '/register'];

  if (!auth.token && !publicRoutes.includes(to.path)) {
    return navigateTo('/login');
  }

  if (auth.token && publicRoutes.includes(to.path)) {
    return navigateTo('/');
  }
});
