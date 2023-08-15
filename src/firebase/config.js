// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8QBdaoTFWfVXw7017BMFRTSIB02m-q-A",
  authDomain: "rn-social-42564.firebaseapp.com",
  projectId: "rn-social-42564",
  storageBucket: "rn-social-42564.appspot.com",
  messagingSenderId: "86374494716",
  appId: "1:86374494716:web:172ac8d642244b407a0279",
  measurementId: "G-X44ZMGK329",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
