<template>
  <div class="register-container flex flex-col justify-center items-center gap-4">
    <h1 class="text-white p-5">Attract Partner with your Smell</h1>
    <Form style="width: 18rem" class="flex flex-col gap-5" @submit="handleRegister">
      <InputText v-model="email" type="email" placeholder="Email" required/>
      <div class="flex justify-between items-center">
        <InputText v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" required/>
        <Button icon="pi pi-eye" @click="togglePassword" raised/>
      </div>
      <Button type="submit"
              label="Register"
              size="small"
              raised
              style="width: 18rem; height: 2rem"
      />
    </Form>
    <Button
        style="height: 2rem"
        label="Login"
        @click="navigateToLogin"
        size="small"
        severity="secondary" raised
    />
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from '@/stores/auth';
import {useErrorHandler} from "@/composables/errorHandler";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import {Form} from '@primevue/forms';

const auth = useAuthStore();
const router = useRouter()

const email = ref('');
const password = ref('');
const showPassword = ref(false);

const handleRegister = async () => {
  try {
    const response = await auth.register(email.value, password.value);
    if (response) await router.push('/');
  } catch (err: any) {
    useErrorHandler(err);
  }
};

const navigateToLogin = () => {
  navigateTo('/login');
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
@media (min-width: 320px) {
  .register-container {
    width: 100vw;
    height: 100vh;
    background-image: url('https://media.istockphoto.com/id/157686698/photo/man-spraying-perfume.jpg?s=612x612&w=0&k=20&c=2SwOwkOLNcFIlEIrm0r2hqy4RFxF8gCV6DtiJ5hG7oc=');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}

@media (min-width: 1281px) {
  .register-container {
    width: 100vw;
    height: 100vh;
    background-image: url('https://png.pngtree.com/background/20211215/original/pngtree-perfume-spray-black-background-picture-image_1469294.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
