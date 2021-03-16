<template>
  <section>
    <div class="disclaimer">
      <p class="lead-text">Browse as Visitor</p>
      <small>Login to contribute - Purple text is clickable!</small>
    </div>
    <div class="main-contain">
      <div class="main-div">
        <aside class="menu">
          <p class="menu-label">
            Useddit Communities
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
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  mounted() {
    this.init();
    this.scrollToTop();
  },
  computed: mapState('subreddits', ['subreddits']),
  methods: {
    scrollToTop() {
      window.scroll(0, 0);
      return null;
    },
    ...mapActions('subreddits', ['init'])
  }
};
</script>
<style lang="scss" scoped>
section {
  background-color: var(--bg-color-primary);
}
.menu-label {
  color: var(--menu-label-color-primary);
}
.menu-list a {
  color: var(--text-color-primary);
  &:hover {
    color: var(--text-color-secondary);
    background-color: var(--bg-color-secondary);
  }
}
.main-contain {
  min-height: 100vh;
  padding: 1.25em;
}
.disclaimer {
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  color: #fff;
  background-color: #3fccbc;
  margin-bottom: 0.25em;
  & small {
    text-align: center;
    color: #fff;
    margin-bottom: 1em;
    font-weight: 700;
  }
}
.lead-text {
  font-size: 1.4em;
  font-weight: 700;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  margin-top: 0.5em;
}
</style>
