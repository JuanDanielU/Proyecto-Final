// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbSSAPy_imYqBPP9I0_vywkJ5I5scWHxY",
  authDomain: "watchem-42dca.firebaseapp.com",
  databaseURL: "https://watchem-42dca-default-rtdb.firebaseio.com",
  projectId: "watchem-42dca",
  storageBucket: "watchem-42dca.appspot.com",
  messagingSenderId: "1084187948844",
  appId: "1:1084187948844:web:b63732b0f270d7d927de89",
  measurementId: "G-FV1CS6NWB5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);