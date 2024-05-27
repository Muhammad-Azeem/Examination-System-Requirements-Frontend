import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { API_BASE_URL } from './constants/index';
import './assets/style.css';


Vue.config.productionTip = false;

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
