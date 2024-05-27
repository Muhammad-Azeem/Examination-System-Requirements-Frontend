<template>
  <div v-if="loading" className="loader">
    <span>Loading...</span>
  </div>
</template>

<script>
export default {
  name: 'LoaderD',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.loader {
  text-align: center;
  font-size: 18px;
  color: #007bff;
}
</style>
