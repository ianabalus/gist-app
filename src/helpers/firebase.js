import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDazUNwHCzwQmu68PDpaa8TioT5hnFG0R4",
    authDomain: "github-gist-app.firebaseapp.com",
    databaseURL: "https://github-gist-app.firebaseio.com/"
  });

// This is named export
export { firebaseApp };
