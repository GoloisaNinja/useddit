<template>
  <div id="app">
    <nav
      class="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="nav-helper-flex">
        <div class="navbar-brand">
          <img class="logo-robot" src="@/assets/harvey.png" />
          <a class="navbar-item" href="/#/subreddits">
            <strong><span class="branding">Useddit</span></strong>
          </a>
        </div>

        <div class="flex-end">
          <div class="navbar-start">
            <div class="navbar-item">
              <div class="buttons">
                <div class="login-button" v-if="!isLoggedIn">
                  <a class="button is-warning is-rounded" @click="login()">
                    <strong>Google Login</strong>
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
                    <a class="button is-danger is-rounded" @click="logout()">
                      Log Out
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
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: mapState('auth', ['user', 'isLoggedIn']),
  methods: mapActions('auth', ['login', 'logout'])
};
</script>

<style lang="scss">
.avatar-container {
  display: flex;
  align-items: center;
}
.avatar {
  margin-right: 1em;
}
.avatar-img {
  border-radius: 50px;
}
.nav-helper-flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-robot {
  margin-top: 0.5em;
  margin-left: 0.35em;
  height: 35px;
  width: 35px;
}
.branding {
  //color: #3fccbc;
  letter-spacing: 5px;
}
</style>
