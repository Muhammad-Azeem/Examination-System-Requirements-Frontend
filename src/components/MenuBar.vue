<template>
  <nav class="menu-bar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/subjects">Subjects</router-link></li>
      <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
      <li v-if="!isAuthenticated"><router-link to="/register">Register</router-link></li>
      <li v-if="isAuthenticated"><a href="#" @click.prevent="logout">Logout</a></li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MenuBar',
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['logout']),
  },
};
</script>

<style scoped>
.menu-bar {
  background-color: #333;
  overflow: hidden;
}

.menu-bar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu-bar li {
  float: left;
}

.menu-bar li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.menu-bar li a:hover {
  background-color: #111;
}
</style>
