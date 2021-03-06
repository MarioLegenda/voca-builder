import firebase from 'firebase';

class Firebase {
  public firebase: firebase.app.App;
  public database: firebase.database.Database;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.GATSBY_FIREBASE_API_KEY,
      authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
      projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
      storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.GATSBY_FIREBASE_APP_ID,
      measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
    };

    firebase.initializeApp(firebaseConfig);

    this.firebase = firebase.app();
    this.database = firebase.database();
  }
}

const instance = new Firebase();
Object.freeze(instance);

export default instance as Firebase;
