<template>
  <div id="app">
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/#/subreddits">
          Useddit
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <div class="login-button" v-if="!isLoggedIn">
                <a class="button is-primary" @click="login()">
                  <strong>Login with Google</strong>
                </a>
              </div>

              <div class="avatar-container" v-if="isLoggedIn">
                <div class="avatar">
                  <span>
                    <figure>
                      <img class="avatar-img" :src="user.image" alt="avatar" />
                    </figure>
                  </span>
                </div>
                <div class="logout-button">
                  <a class="button is-danger" @click="logout()">
                    Log Out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
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
.container {
  padding: 1em;
}
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
</style>
