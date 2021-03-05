import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAxMomqKxysc3LsoSgDPYOix3pJgt1CIS4',
  authDomain: 'vue-reddit-df75d.firebaseapp.com',
  projectId: 'vue-reddit-df75d',
  storageBucket: 'vue-reddit-df75d.appspot.com',
  messagingSenderId: '614368483052',
  appId: '1:614368483052:web:f60458dde4fc0bf636b7c9'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
