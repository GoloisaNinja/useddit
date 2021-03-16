<template>
  <section>
    <div id="app">
      <nav
        class="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="nav-helper-flex">
          <div class="navbar-brand">
            <!-- <router-link :to="{ name: 'Home' }"
              ><img class="logo-robot" src="@/assets/harvey.png"
            /></router-link> -->
            <router-link :to="{ name: 'Home' }">
              <img class="logo-robot" v-if="light" src="@/assets/harvey.png"/>
              <img
                class="logo-robot"
                v-if="!light"
                src="@/assets/darkharvey.png"
            /></router-link>

            <a class="navbar-item" href="/#/subreddits">
              <strong><span class="branding">Useddit</span></strong>
            </a>
          </div>

          <div class="flex-end">
            <div class="navbar-start">
              <div class="navbar-item">
                <div class="buttons">
                  <div class="theme">
                    <button class="theme-button" @click="light = !light">
                      <img
                        v-if="light"
                        class="theme-img"
                        src="@/assets/sun.png"
                        alt="sun image"
                      />
                      <img
                        v-if="!light"
                        class="theme-img"
                        src="@/assets/moon-phase.png"
                        alt="sun image"
                      />
                    </button>
                  </div>
                  <div class="login-button" v-if="!isLoggedIn">
                    <a class="my button is-success is-rounded" @click="login()">
                      <span
                        ><img
                          class="gLogo"
                          src="@/assets/gLogo.png"
                          alt="google"/></span
                      ><strong>Login</strong>
                    </a>
                  </div>

                  <div class="avatar-container" v-if="isLoggedIn">
                    <div class="avatar">
                      <span>
                        <figure>
                          <img
                            class="avatar-img"
                            :src="user.image"
                            alt="avatar"
                          />
                        </figure>
                      </span>
                    </div>
                    <div class="logout-button">
                      <a
                        class="my button is-danger is-rounded"
                        @click="logout()"
                      >
                        <span
                          ><img
                            class="logout-img"
                            src="@/assets/logout.png"
                            alt="logout"
                        /></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div class="main-contain">
        <router-view />
      </div>
    </div>
    <footer class="useddit">
      <div class="footer-div">
        <div class="footer-sec-one">
          <img class="footer-logo" src="@/assets/harvey.png" alt="cute-robot" />
          <p>
            Useddit uses Icons made by
            <a
              class="footer-tag"
              href="https://www.freepik.come"
              title="Freepik"
              >Freepik!</a
            >
          </p>
        </div>
        <div class="footer-sec-two">
          <p>Creator is not responsible for:</p>
        </div>
        <div class="footer-sec-list">
          <div class="footer-list">
            <ul>
              <li>Content on platform</li>
              <li>Wizards</li>
              <li>Fighting</li>
              <li>Fighting Wizards</li>
            </ul>
          </div>
          <div class="footer-list">
            <ul>
              <li>Ridiculous colors</li>
              <li>Bad advice</li>
              <li>Marriages on platform</li>
              <li>Kids from marriages</li>
            </ul>
          </div>
          <div class="footer-list">
            <ul>
              <li>Business failure</li>
              <li>Chronic useddit addiction</li>
              <li>Use of lists</li>
              <li>A sense of emptiness</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-last">
        <p>
          Useddit was created by
          <a href="https://joncollins-dev.netlify.app"
            ><span class="green-span">Jon Collins</span></a
          >
          copyright
          {{ footerDate() }}
        </p>
      </div>
    </footer>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data: () => ({
    light: true
  }),
  mounted() {
    this.scrollToTop();
    this.checkForTheme();
  },
  watch: {
    light() {
      this.setTheme(this.light);
    }
  },
  computed: mapState('auth', ['user', 'isLoggedIn']),
  methods: {
    ...mapActions('auth', ['login', 'logout']),
    footerDate() {
      const date = new Date();
      return date.getFullYear();
    },
    scrollToTop() {
      window.scroll(0, 0);
      return null;
    },
    checkForTheme() {
      if (localStorage.getItem('theme') === 'dark') {
        this.light = false;
      } else {
        this.light = true;
      }
    },
    setTheme(theme) {
      const page = document.getElementById('main-html');
      if (theme) {
        page.className = 'theme-light';
        localStorage.setItem('theme', 'light');
      } else {
        page.className = 'theme-dark';
        localStorage.setItem('theme', 'dark');
      }
    }
  }
};
</script>

<style lang="scss">
.theme-light {
  --bg-color-primary: #fff;
  --bg-color-secondary: #f5f5f5;
  --text-color-primary: #4a4a4a;
  --text-color-secondary: #7a7a7a;
  --text-color-light: #e3e3e3;
  --menu-label-color-primary: #7a7a7a;
}
.theme-dark {
  --bg-color-primary: #2c3747;
  --bg-color-secondary: #3a485e;
  --text-color-primary: #ededed;
  --text-color-secondary: #e6e6e6;
  --text-color-light: #e3e3e3;
  --menu-label-color-primary: #fafafa;
}
.theme-button {
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
}
.my.button.is-danger.is-rounded {
  background: none;
  padding: 0;
  margin: 0;
}
.my.button.is-success.is-rounded {
  padding-left: 0.75em;
  padding-right: 0.75em;
  background-color: #28afbb;
  transition: all 1s ease-in-out;
  &:hover {
    background-color: lighten(#28afbb, 20%);
  }
}
.gLogo {
  width: 25px;
  margin-right: 0.35em;
  margin-top: 0.25em;
}
.green-span {
  color: #3fccbc;
}
.useddit {
  background-color: #653ccb;
  padding-top: 2em;
  padding-bottom: 2em;
  color: #fff;
}
.footer-div {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 0.75em;
}
.footer-sec-one {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5em;
}
.footer-sec-two {
  @extend .footer-sec-one;
  flex-direction: column;
}
.footer-sec-list {
  font-size: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
div.footer-list:not(:last-child) {
  margin-right: 2em;
}
.footer-last {
  font-size: 0.75em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
}
.footer-logo {
  width: 50px;
  height: 50px;
  margin-right: 0.5em;
}
.footer-tag {
  color: #3fccbc;
}
.avatar-container {
  display: flex;
  align-items: center;
}
.avatar {
  margin-right: 0.5em;
}
.avatar-img {
  border-radius: 50px;
}
.theme-img {
  margin-right: 0em;
  margin-bottom: 0.14em;
}
.nav-helper-flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-robot {
  margin-top: 0.5em;
  margin-left: 0.5em;
  height: 35px;
  width: 35px;
}
.branding {
  //color: #3fccbc;
  letter-spacing: 5px;
}
</style>
