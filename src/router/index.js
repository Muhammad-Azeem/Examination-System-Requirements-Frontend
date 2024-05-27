import Vue from 'vue';
import VueRouter from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import SubjectList from '../components/StudentSubject.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/subjects' },
    { path: '/login', component: UserLogin },
    { path: '/register', component: UserRegister },
    { path: '/subjects', component: SubjectList },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
