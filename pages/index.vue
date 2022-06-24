<template>
  <v-container>
  <h1>HomePage</h1>
  <nuxt-link to="/login">Login</nuxt-link>
  <v-btn @click="logout">Logout</v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('users/logout')
    },
  },
}
</script>

<style>

</style>