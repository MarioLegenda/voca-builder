import firebase from 'firebase';

class Firebase {
  private static instance: Firebase;

  public firebase: firebase.app.App;

  constructor() {
    if(!Firebase.instance) {
      Firebase.instance = this;

      const firebaseConfig = {
        apiKey: "AIzaSyDvZYDEOCzsJJ_lGM9WhmEmgpuZdOubtBs",
        authDomain: "voca-builder-c03cc.firebaseapp.com",
        databaseURL: "https://voca-builder-c03cc.firebaseio.com",
        projectId: "voca-builder-c03cc",
        storageBucket: "voca-builder-c03cc.appspot.com",
        messagingSenderId: "178176789313",
        appId: "1:178176789313:web:0c1e1482ca643b60c5efc0",
        measurementId: "G-EXKSZ7F3G6"
      };

      firebase.initializeApp(firebaseConfig);

      this.firebase = firebase;

      this.firebase.database();
    }

    return Firebase.instance;
  }
}

const instance = new Firebase();
Object.freeze(instance);

export default instance as Firebase;