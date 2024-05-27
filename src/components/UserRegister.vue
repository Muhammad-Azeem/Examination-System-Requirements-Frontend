<template>
  <div class="register-container">
    <h2>Register</h2>
    <loader :loading="loading" />
    <form @submit.prevent="register">
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <div class="form-group">
          <label>Name</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input v-model="name" type="text" />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label>Email</label>
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <input v-model="email" type="email" />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label>Password</label>
          <ValidationProvider rules="required|min:6" v-slot="{ errors }">
            <input v-model="password" type="password" />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <button type="submit" :disabled="invalid">Register</button>
      </ValidationObserver>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, email, min } from 'vee-validate/dist/rules';
import Loader from './Loader.vue';
import { API_BASE_URL } from '../constants/index';

extend('required', required);
extend('email', email);
extend('min', min);

export default {
  name: 'UserRegister',
  components: {
    ValidationObserver,
    ValidationProvider,
    Loader,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      loading: false,
    };
  },
  methods: {
    async register() {
      this.loading = true;
      try {
        await axios.post(`${API_BASE_URL}/register`, {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.error {
  color: red;
  font-size: 12px;
}
</style>
