<template>
  <div class="question-list">
    <h2>Questions</h2>
    <loader :loading="loading" />
    <button @click="showAddQuestionModal = true" class="btn btn-primary">Add Question</button>
    <ul v-if="questions.length > 0">
      <li v-for="question in questions" :key="question.id">
        <div class="question-item">
          <div>
            <strong>Question Text:</strong> {{ question.question_text }}
          </div>
          <div>
            <strong>Type:</strong> {{ question.type }}
          </div>
          <div v-if="question.options && question.options.length > 0">
            <strong>Options:</strong>
            <ul>
              <li v-for="(option, index) in question.options" :key="index">{{ option }}</li>
            </ul>
          </div>
          <div class="actions">
            <button @click="viewQuestion(question)" class="btn btn-view">View</button>
            <button @click="editQuestion(question)" class="btn btn-edit">Edit</button>
            <button @click="deleteQuestion(question.id)" class="btn btn-delete">Delete</button>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <p>No questions available.</p>
    </div>
    <!-- Add Question Modal -->
    <div v-if="showAddQuestionModal" class="modal">
      <div class="modal-content">
        <span @click="showAddQuestionModal = false" class="close">&times;</span>
        <h3>Add New Question</h3>
        <form @submit.prevent="addQuestion">
          <div class="form-group">
            <label for="questionText">Question Text</label>
            <input type="text" v-model="newQuestionText" id="questionText" class="form-control" />
          </div>
          <div class="form-group">
            <label for="questionType">Question Type</label>
            <select v-model="newQuestionType" id="questionType" class="form-control">
              <option value="MCQ">Multiple Choice Question (MCQ)</option>
              <option value="Radio">Radio Button Question</option>
              <option value="TextInput">Text Input Question</option>
              <option value="DatePicker">Date Picker Question</option>
              <option value="ColorPicker">Color Picker Question</option>
              <option value="Textarea">Textarea Question</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Add Question</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Loader from './Loader.vue';
import { API_BASE_URL } from '../constants/index';

export default {
  name: 'QuestionList',
  components: {
    Loader,
  },
  props: {
    paperId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      questions: [],
      loading: false,
      showAddQuestionModal: false,
      newQuestionText: '',
      newQuestionType: 'MCQ', // Default question type
    };
  },
  methods: {
    async fetchQuestions() {
      this.loading = true;
      try {
        const response = await axios.get(`${API_BASE_URL}/papers/${this.paperId}/questions`);
        this.questions = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async addQuestion() {
      try {
        const response = await axios.post(`${API_BASE_URL}/questions`, {
          paper_id: this.paperId,
          question_text: this.newQuestionText,
          type: this.newQuestionType,
        });
        this.questions.push(response.data); // Add the new question to the list
        this.newQuestionText = ''; // Clear the input field
        this.newQuestionType = 'MCQ'; // Reset question type to default
        this.showAddQuestionModal = false; // Close the modal
      } catch (error) {
        console.error(error);
      }
    },
    viewQuestion(question) {
      // Log question details to console
      console.log('Viewing question:', question);
    },
    editQuestion(question) {
      // Emit event to parent component to handle editing
      this.$emit('editQuestion', question);
    },
    async deleteQuestion(questionId) {
      if (!confirm('Are you sure you want to delete this question?')) return;
      try {
        await axios.delete(`${API_BASE_URL}/questions/${questionId}`);
        this.questions = this.questions.filter(q => q.id !== questionId); // Remove the deleted question from the list
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchQuestions();
  },
};
</script>

<style scoped>
.question-list {
  padding: 20px;
}

.question-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.question-item div {
  margin-bottom: 5px;
}

.actions button {
  margin-right: 5px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
