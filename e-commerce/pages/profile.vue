<template>
  <div class="profile-container flex flex-col justify-start items-center gap-2">
    <div class="flex justify-between items-center w-full px-3">
      <h3>Profile</h3>
      <Button @click="logout" size="small" raised>
        Logout
      </Button>
    </div>

    <div class="flex flex-col w-full">
      <h3 class="px-3">Address</h3>
      <div class="address-container w-full">
        <Tabs value="0">
          <TabList>
            <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
          </TabList>
          <TabPanels class="flex justify-center">
            <TabPanel v-for="tab in tabs" :value="tab.value">
              <div v-if="tab.value === '0'">
                <Form style="width: 20rem" class="flex flex-col gap-4" @submit="handleCreateAddress">
                  <InputText v-model="address.first_name" placeholder="First Name" required/>
                  <InputText v-model="address.last_name" placeholder="Last Name" required/>
                  <InputText v-model="address.phone" placeholder="Phone" required/>
                  <InputText v-model="address.address_1" placeholder="Address" required/>
                  <InputText v-model="address.city" placeholder="City" required/>
                  <InputText v-model="address.postal_code" placeholder="Postal Code" required/>

                  <Button type="submit" label="Add" size="small" raised/>
                </Form>
              </div>
              <div v-if="tab.value === '1'">
                <div class="w-full">

                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>

  </div>
  <Toast/>
</template>

<script setup lang="ts">
import {useAuthStore} from '@/stores/auth';
import {useCustomerStore} from '@/stores/customers';
import {useToast} from "primevue/usetoast";
import Button from 'primevue/button';
import {useErrorHandler} from "@/composables/errorHandler";

const authStore = useAuthStore();
const customerStore = useCustomerStore();
const toast = useToast();

const tabs = ref([
  {title: 'Create', value: '0'},
  {title: 'List Adresses', value: '1'},
]);

const address = ref({
  first_name: '',
  last_name: '',
  phone: '',
  company: '',
  address_1: '',
  address_2: '',
  city: '',
  country_code: 'idr',
  province: '',
  postal_code: '',
  address_name: '',
  metadata: {}
});

const handleCreateAddress = async () => {
  console.log(address.value)
  console.log(authStore.token)
  try {
    const response = await customerStore.createAddress(address.value)
    if (response) {
      toast.add({severity: 'success', summary: 'Success', detail: 'New Address added', life: 3000})
    } else {
      toast.add({severity: 'error', summary: 'Failed', detail: 'New Address fail added', life: 3000})
    }
  } catch (err: any) {
    useErrorHandler(err);
  }
};


const logout = () => {
  authStore.logout();
};
</script>

<style scoped>
.profile-container {
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
}

.address-container {
  width: 100%;
  min-height: 30rem;
}

::v-deep(.p-tablist-tab-list) {
  display: flex;
  justify-content: center;
}
</style>
