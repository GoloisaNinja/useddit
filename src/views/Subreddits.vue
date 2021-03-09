<template>
  <section class="main-contain">
    <div class="main-div">
      <aside class="menu">
        <p class="menu-label">
          Useddits
        </p>
        <ul class="menu-list">
          <li v-for="subreddit in subreddits" :key="subreddit.id">
            <router-link
              :to="{ name: 'subreddit', params: { name: subreddit.name } }"
              >{{ subreddit.name }}</router-link
            >
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  mounted() {
    this.init();
  },
  computed: mapState('subreddits', ['subreddits']),
  methods: mapActions('subreddits', ['init'])
};
</script>
<style lang="scss" scoped>
.main-contain {
  padding: 1em;
}
</style>
