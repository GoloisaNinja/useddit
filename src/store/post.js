import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db';

const comments = db.collection('comments');

const state = {
  subreddit: {},
  post: {},
  comments: []
};

const getters = {
  clickedPost: state => (state.post[0] ? state.post[0] : {})
};

const actions = {
  async createComment({ getters }, comment) {
    const result = comments.doc();
    comment.id = result.id;
    comment.post_id = getters.clickedPost.id;
    comment.subreddit_id = getters.clickedPost.subreddit_id;
    comment.user_id = firebase.auth().currentUser.uid;
    comment.created_at = firebase.firestore.FieldValue.serverTimestamp();
    comment.updated_at = firebase.firestore.FieldValue.serverTimestamp();
    try {
      await comments.doc(comment.id).set(comment);
    } catch (error) {
      console.error(error);
    }
  },
  initPost: firestoreAction(({ bindFirestoreRef }, post_id) => {
    bindFirestoreRef('post', db.collection('posts').where('id', '==', post_id));
  }),
  initComments: firestoreAction(({ bindFirestoreRef }, post_id) => {
    bindFirestoreRef('comments', comments.where('post_id', '==', post_id));
  })
};

export default {
  namespaced: true,
  state,
  actions,
  getters
};
