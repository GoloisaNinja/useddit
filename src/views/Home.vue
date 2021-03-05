<template>
  <div class="home">
    <router-link class="button is-primary" :to="{ name: 'subreddits' }"
      >Useddits</router-link
    >
  </div>
</template>
<script>
import router from '../router';
import { mapState } from 'vuex';
export default {
  watch: {
    isLoggedIn() {
      if (this.isLoggedIn) {
        router.push('/subreddits');
      }
    }
  },
  computed: mapState('auth', ['isLoggedIn'])
};
</script>
