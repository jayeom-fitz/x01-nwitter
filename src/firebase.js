import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBJKAssKc7_77WdakuVWM-DQ0-eK_umBuk",
    authDomain: "nwitter-4227e.firebaseapp.com",
    databaseURL: "https://nwitter-4227e.firebaseio.com",
    projectId: "nwitter-4227e",
    storageBucket: "nwitter-4227e.appspot.com",
    messagingSenderId: "907932776513",
    appId: "1:907932776513:web:1c5c2e57aaf2b5687b2ec0"
};

export default firebase.initializeApp(firebaseConfig);