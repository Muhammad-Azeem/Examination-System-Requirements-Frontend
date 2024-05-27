import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '../constants/index';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        user: {},
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        },
        logout(state) {
            state.token = '';
            state.user = {};
        },
    },
    actions: {
        async register(_, userData) {
            await axios.post(`${API_BASE_URL}/register`, userData);
        },
        async login({ commit }, userData) {
            const response = await axios.post(`${API_BASE_URL}/login`, userData);
            const token = response.data.token;
            localStorage.setItem('token', token);
            commit('setToken', token);
            // Optionally fetch user data here
        },
        async logout({ commit }) {
            await axios.post(`${API_BASE_URL}/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            localStorage.removeItem('token');
            commit('logout');
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user,
    },
});
