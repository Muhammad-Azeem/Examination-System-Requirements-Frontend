<template>
  <div class="paper-form">
    <h2>{{ paper ? 'Edit' : 'Add' }} Paper</h2>
    <loader :loading="loading" />
    <form @submit.prevent="savePaper">
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <div class="form-group">
          <label for="title">Title</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input v-model="formData.title" type="text" id="title" class="form-control" />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label for="duration">Duration (minutes)</label>
          <ValidationProvider rules="required|integer|min_value:1" v-slot="{ errors }">
            <input v-model="formData.duration" type="number" id="duration" class="form-control" />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-actions">
          <button type="submit" :disabled="invalid" class="btn btn-primary">
            {{ paper ? 'Update' : 'Add' }}
          </button>
          <button type="button" @click="$emit('close')" class="btn btn-secondary">
            Cancel
          </button>
        </div>
      </ValidationObserver>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, integer, min_value } from 'vee-validate/dist/rules';
import Loader from './Loader.vue';
import { API_BASE_URL } from '../constants/index';

extend('required', required);
extend('integer', integer);
extend('min_value', min_value);

export default {
  name: 'PaperForm',
  components: {
    ValidationObserver,
    ValidationProvider,
    Loader,
  },
  props: {
    subjectId: {
      type: Number,
      required: true,
    },
    paper: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formData: {
        subject_id: this.subjectId,
        title: this.paper ? this.paper.title : '',
        duration: this.paper ? this.paper.duration : '',
      },
      loading: false,
    };
  },
  methods: {
    async savePaper() {
      this.loading = true;
      try {
        if (this.paper) {
          await axios.put(`${API_BASE_URL}/papers/${this.paper.id}`, this.formData);
        } else {
          await axios.post(`${API_BASE_URL}/papers`, this.formData);
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
