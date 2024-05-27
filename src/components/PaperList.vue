<template>
  <div class="paper-list">
    <h2>Papers for Subject {{ subjectId }}</h2>
    <loader :loading="loading" />
    <button class="btn btn-add" @click="showAddForm = true">Add Paper</button>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Duration (minutes)</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="paper in filteredPapers" :key="paper.id">
        <td>{{ paper.id }}</td>
        <td>{{ paper.title }}</td>
        <td>{{ paper.duration }}</td>
        <td>
          <button class="btn btn-edit" @click="editPaper(paper)">Edit</button>
          <button class="btn btn-delete" @click="deletePaper(paper.id)">Delete</button>
          <button class="btn btn-view" @click="viewPaper(paper)">View</button>
        </td>
      </tr>
      <tr v-if="filteredPapers.length === 0">
        <td colspan="4">No papers available for this subject.</td>
      </tr>
      </tbody>
    </table>
    <paper-form v-if="showAddForm" :subject-id="subjectId" @close="showAddForm = false" @save="fetchPapers" />
    <paper-form v-if="currentPaper" :subject-id="subjectId" :paper="currentPaper" @close="currentPaper = null" @save="fetchPapers" />
    <div v-if="currentPaper">
      <h3>Viewing Paper: {{ currentPaper.title }}</h3>
      <!-- Display paper details here -->
    </div>
    <question-list v-if="currentPaper" :paper-id="currentPaper.id" @editQuestion="editQuestion" />
  </div>
</template>

<script>
import axios from 'axios';
import Loader from './Loader.vue';
import PaperForm from './PaperForm.vue';
import QuestionList from './QuestionList.vue';
import { API_BASE_URL } from '../constants/index';

export default {
  name: 'PaperList',
  components: {
    Loader,
    PaperForm,
    QuestionList,
  },
  props: {
    subjectId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      papers: [],
      loading: false,
      showAddForm: false,
      currentPaper: null,
    };
  },
  computed: {
    filteredPapers() {
      return this.papers.filter(paper => paper.subject_id === this.subjectId);
    },
  },
  methods: {
    async fetchPapers() {
      this.loading = true;
      try {
        const response = await axios.get(`${API_BASE_URL}/papers`);
        this.papers = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    editPaper(paper) {
      this.currentPaper = paper;
    },
    viewPaper(paper) {
      this.currentPaper = paper;
    },
    async deletePaper(id) {
      this.loading = true;
      try {
        await axios.delete(`${API_BASE_URL}/papers/${id}`);
        this.fetchPapers();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchPapers();
  },
};
</script>

<style scoped>
/* Add any scoped styles here if necessary */
</style>
