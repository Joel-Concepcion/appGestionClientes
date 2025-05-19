// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTva697Y2RSIWxrX6fxuS5WnzHVF0TgYs",
  authDomain: "appgestionclientes-21e20.firebaseapp.com",
  projectId: "appgestionclientes-21e20",
  storageBucket: "appgestionclientes-21e20.firebasestorage.app",
  messagingSenderId: "423344384327",
  appId: "1:423344384327:web:49d51d5f83fc7002748462"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;