import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db';

const state = {
  subreddit: {},
  post: {},
  comments: []
};

const getters = {
  clickedPost: state => (state.post[0] ? state.post[0] : {})
};

const actions = {
  initPost: firestoreAction(({ bindFirestoreRef }, post_id) => {
    bindFirestoreRef('post', db.collection('posts').where('id', '==', post_id));
  })
};

export default {
  namespaced: true,
  state,
  actions,
  getters
};
