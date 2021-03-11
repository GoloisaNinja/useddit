<template>
  <div class="home">
    <section class="section-one">
      <div class="group first">
        <div class="welcome">
          <img class="arrow" src="@/assets/curve-arrow.png" alt="arrow" />
          <small class="theme-notice">tap robot to change theme!</small>
          <p class="hero-text wide">
            Wecome to Useddit!
          </p>
          <small>A community for misfits by misfits</small>
        </div>
        <div class="flex-contain">
          <img class="hero-img" src="@/assets/wizard.png" />
          <p class="hero-text">
            "Useddit gave me a community to post my stupid pics AND post my
            ideas about city wizards!" - actual user
          </p>
        </div>
        <div class="flex-contain">
          <p class="hero-text">
            "The setup was soooo easy. I think it's because there was nothing to
            install and I literally never even tried it." - actual nonuser
          </p>
          <img class="hero-img" src="@/assets/programming.png" />
        </div>
      </div>
      <div class="flex-column-contain">
        <div class="group second">
          <div class="flex-contain">
            <img class="hero-img" src="@/assets/smartphone.png" />
            <p class="hero-text dark">
              "It's amazing all the stuff you can't do with Useddit. It's almost
              like the jerks that made it didn't want me to use it. And I love
              that!" - actual user
            </p>
          </div>
          <router-link
            class="button is-danger is-rounded"
            :to="{ name: 'subreddits' }"
            >Browse Useddits</router-link
          >
        </div>
      </div>
    </section>
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
<style lang="scss" scoped>
.home {
  background-color: blue;
}
.welcome {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  background-color: #3fccbc;
  margin-bottom: 0.25em;
  & small {
    text-align: center;
    color: #fff;
    margin-bottom: 1em;
    font-weight: 700;
  }
}
.arrow {
  position: absolute;
  top: 0;
  left: 30px;
  width: 18px;
}
.theme-notice {
  position: absolute;
  font-size: 0.75em;
  text-transform: uppercase;
  top: 5px;
  left: 55px;
}
.flex-contain {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1em;
  margin-top: 1em;
  padding: 1em;
}
.group {
  height: 100%;
  min-height: 50vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: var(--text-color-secondary);
  background-color: var(--bg-color-primary);
  &.second {
    background-color: #0000e0;
    color: var(--text-color-secondary);
    padding-bottom: 1.2em;
  }
}

.hero-img {
  width: 35%;
  margin-right: 1.2em;
  margin-left: 1.2em;
}
.hero-text {
  width: 40%;
  font-size: 1.2em;
  font-weight: 500;
  &.dark {
    color: var(--text-color-light);
  }
  &.wide {
    width: 90%;
    font-size: 1.4em;
    font-weight: 700;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    margin-top: 1em;
    //margin-bottom: 1em;
  }
}
@media (max-width: 400px) {
  .hero-text {
    font-size: 1em;
    width: 80%;
  }
  .hero-img {
    width: 25%;
  }
}
</style>
