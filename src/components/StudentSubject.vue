<template>
  <div class="container">
    <div class="subject-list">
      <h2>Subjects</h2>
      <loader :loading="loading" />
      <button class="btn btn-add" @click="showAddForm = true">Add Subject</button>
      <table class="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="subject in subjects" :key="subject.id">
          <td>{{ subject.id }}</td>
          <td>{{ subject.name }}</td>
          <td>
            <button class="btn btn-edit" @click="editSubject(subject)">Edit</button>
            <button class="btn btn-delete" @click="deleteSubject(subject.id)">Delete</button>
            <button class="btn btn-view-papers" @click="viewPapers(subject.id)">View Papers</button>
          </td>
        </tr>
        </tbody>
      </table>
      <subject-form v-if="showAddForm" @close="showAddForm = false" @save="fetchSubjects" />
      <subject-form v-if="currentSubject" :subject="currentSubject" @close="currentSubject = null" @save="fetchSubjects" />
      <paper-list v-if="currentSubjectId" :subject-id="currentSubjectId" @close="currentSubjectId = null" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Loader from './Loader.vue';
import SubjectForm from './SubjectForm.vue';
import PaperList from './PaperList.vue';
import { API_BASE_URL } from '../constants/index';

export default {
  name: 'SubjectList',
  components: {
    Loader,
    SubjectForm,
    PaperList,
  },
  data() {
    return {
      subjects: [],
      loading: false,
      showAddForm: false,
      currentSubject: null,
      currentSubjectId: null,
    };
  },
  methods: {
    async fetchSubjects() {
      this.loading = true;
      try {
        const response = await axios.get(`${API_BASE_URL}/subjects`);
        this.subjects = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    editSubject(subject) {
      this.currentSubject = subject;
    },
    async deleteSubject(id) {
      this.loading = true;
      try {
        await axios.delete(`${API_BASE_URL}/subjects/${id}`);
        this.fetchSubjects();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    viewPapers(subjectId) {
      this.currentSubjectId = subjectId;
    },
  },
  created() {
    this.fetchSubjects();
  },
};
</script>

<style scoped>
/* Add any scoped styles here if necessary */
</style>
