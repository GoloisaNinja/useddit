import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import subreddits from './subreddits';
import subreddit from './subreddit';
import users from './users';
import { vuexfireMutations } from 'vuexfire';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: vuexfireMutations,
  modules: {
    auth,
    subreddits,
    subreddit,
    users
  }
});
