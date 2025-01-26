import {defineStore} from 'pinia';
import {useErrorHandler} from "@/composables/errorHandler";

interface ProductResponse {
  [key: string]: any;
}

interface FetchError {
  message: string;
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as any,
    loading: false as boolean,
    hasMore: true as boolean,
    count: 0 as number,
    limit: 8 as number,
    offset: 0 as number,
    detailProduct: null as any
  }),
  getters: {},
  actions: {
    async getListProduct() {
      if (this.loading || !this.hasMore) return;

      this.loading = true
      const params = {
        fields: '*variants.calculated_price',
        region_id: 'reg_01JJP35AM90CK17BCVB2VN923V',
        limit: this.limit,
        offset: this.offset
      }
      try {
        const {data, error}: { data: Ref<ProductResponse | null>; error: Ref<FetchError | null> } = await useFetch('/store/products', {
          baseURL: useRuntimeConfig().public.baseUrl,
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-publishable-api-key': useRuntimeConfig().public.publishableApiKey
          },
          params
        });

        if (error.value) {
          throw new Error(error.value.message);
        }

        if (data.value) {
          const newData = JSON.parse(JSON.stringify(data.value));
          this.products.push(...newData.products);
          this.offset += this.limit;
          this.count = newData.count;

          if (this.products.length >= this.count) {
            this.hasMore = false;
          }

          return newData;
        }
      } catch (err) {
        useErrorHandler(err)
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async getDetailProduct (id: string) {
      this.loading = true
      const params = {
        fields: '*variants.calculated_price',
        region_id: 'reg_01JJP35AM90CK17BCVB2VN923V',
      }
      try {
        const {data, error}: { data: Ref<ProductResponse | null>; error: Ref<FetchError | null> } = await useFetch(`/store/products/${id}`, {
          baseURL: useRuntimeConfig().public.baseUrl,
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-publishable-api-key': useRuntimeConfig().public.publishableApiKey
          },
          params
        });

        if (error.value) {
          throw new Error(error.value.message);
        }

        if (data.value) {
          const newData = JSON.parse(JSON.stringify(data.value));
          this.detailProduct = newData.product;
          return newData;
        }
      } catch (err) {
        useErrorHandler(err)
        throw err;
      } finally {
        this.loading = false;
      }
    }
  }
});
