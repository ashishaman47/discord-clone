import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGbQHvmQ0y7Z60dXloJySVF1xTvEbqbeg",
    authDomain: "discord-clone-b727f.firebaseapp.com",
    databaseURL: "https://discord-clone-b727f.firebaseio.com",
    projectId: "discord-clone-b727f",
    storageBucket: "discord-clone-b727f.appspot.com",
    messagingSenderId: "957890241066",
    appId: "1:957890241066:web:6ccad026da089b2f9f5953",
    measurementId: "G-FWMYDMLLQE"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;