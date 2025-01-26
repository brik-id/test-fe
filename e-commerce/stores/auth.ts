import { defineStore } from 'pinia';

interface AuthResponse {
  token: string;
}

interface FetchError {
  message: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie('authToken').value || null,
  }),
  getters: {},
  actions: {
    async login(email: string, password: string) {
      try {
        const { data, error }: { data: Ref<AuthResponse | null>; error: Ref<FetchError | null> } = await useFetch('/auth/customer/emailpass', {
          baseURL: useRuntimeConfig().public.baseUrl,
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: { email, password },
        });

        if (error.value) {
          throw new Error(error.value.message);
        }

        if (data.value) {
          const token = data.value.token;
          this.token = token;
          useCookie('authToken').value = token;
          return token;
        }
      } catch (err) {
        throw err;
      }
    },
    async register(email: string, password: string) {
      try {
        const { data, error }: { data: Ref<AuthResponse | null>; error: Ref<FetchError | null> } = await useFetch('/auth/customer/emailpass/register', {
          baseURL: useRuntimeConfig().public.baseUrl,
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: { email, password },
        });

        if (error.value) {
          throw new Error(error.value.message);
        }

        if (data.value) {
          const token = data.value.token;
          this.token = token;
          useCookie('authToken').value = token;
          return token;
        }
      } catch (err) {
        throw err;
      }
    },
    logout() {
      this.token = null;
      useCookie('authToken').value = null;
      return navigateTo('/login');
    },
  },
});
