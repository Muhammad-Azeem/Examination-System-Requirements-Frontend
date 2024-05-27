<template>
  <div class="container">
    <div class="subject-form">
      <h2>{{ subject ? 'Edit' : 'Add' }} Subject</h2>
      <loader :loading="loading" />
      <form @submit.prevent="saveSubject">
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <div class="form-group">
            <label for="name">Name</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input v-model="formData.name" type="text" id="name" class="form-control" />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-actions">
            <button type="submit" :disabled="invalid" class="btn btn-primary">
              {{ subject ? 'Update' : 'Add' }}
            </button>
            <button type="button" @click="$emit('close')" class="btn btn-secondary">
              Cancel
            </button>
          </div>
        </ValidationObserver>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import Loader from './Loader.vue';
import { API_BASE_URL } from '../constants/index';

extend('required', required);

export default {
  name: 'SubjectForm',
  components: {
    ValidationObserver,
    ValidationProvider,
    Loader,
  },
  props: {
    subject: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formData: {
        name: this.subject ? this.subject.name : '',
      },
      loading: false,
    };
  },
  methods: {
    async saveSubject() {
      this.loading = true;
      try {
        if (this.subject) {
          await axios.put(`${API_BASE_URL}/subjects/${this.subject.id}`, this.formData);
        } else {
          await axios.post(`${API_BASE_URL}/subjects`, this.formData);
        }
        this.$emit('save');
        this.$emit('close');
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
/* Add any scoped styles here if necessary */
</style>
