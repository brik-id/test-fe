import { defineStore } from 'pinia';

interface CustomerResponse {
  [key: string]: any;
}

interface FetchError {
  message: string;
}
export const useCustomerStore = defineStore('customer', {
  state: () => ({
    addresses: [] as any,
    token: useCookie('authToken').value || null
  }),
  getters: {},
  actions: {
    async createAddress(payload: any) {
      console.log(this.token, 'customer')
      try {
        const { data, error }: { data: Ref<CustomerResponse | null>; error: Ref<FetchError | null> } = await useFetch('/store/customers/me/addresses', {
          baseURL: useRuntimeConfig().public.baseUrl,
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-publishable-api-key': useRuntimeConfig().public.publishableApiKey
          },
          body: payload,
        });

        if (error.value) {
          throw new Error(error.value.message);
        }

        if (data.value) {
          const newData = JSON.parse(JSON.stringify(data.value));
          console.log(newData)
          return true;
        } else {
          return false
        }
      } catch (err) {
        throw err;
      }
    },
  },
});
