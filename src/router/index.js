import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Subreddits from '../views/Subreddits.vue';
import Subreddit from '../views/Subreddit.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/subreddits',
    name: 'subreddits',
    component: Subreddits
  },
  {
    path: '/subreddit/:name',
    name: 'subreddit',
    component: Subreddit
  }
];

const router = new VueRouter({
  routes
});

export default router;
