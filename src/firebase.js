import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA_xp8dYhVX9-wPxO6l3p5EOdAfYzPQ3oA",
    authDomain: "beit-f0e7e.firebaseapp.com",
    databaseURL: "https://beit-f0e7e.firebaseio.com",
    projectId: "beit-f0e7e",
    storageBucket: "beit-f0e7e.appspot.com",
    messagingSenderId: "238963768355"
}

export default firebase.initializeApp(config);