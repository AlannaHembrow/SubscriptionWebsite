import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCuoc0FnBVEvGh64Ms3IGHsBJlh-nbAmaA",
    authDomain: "subtracker-3be72.firebaseapp.com",
    projectId: "subtracker-3be72",
    storageBucket: "subtracker-3be72.appspot.com",
    messagingSenderId: "663098749757",
    appId: "1:663098749757:web:d493fb11de44304866cb54",
    measurementId: "G-5RVE91EFSW"
  };

const app = initializeApp(firebaseConfig);

export default app