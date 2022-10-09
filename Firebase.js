// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD86QutDAN6a2vi-3NzL2XeDmeMkN-zVkE",
  authDomain: "appointmentsystem-84be4.firebaseapp.com",
  projectId: "appointmentsystem-84be4",
  storageBucket: "appointmentsystem-84be4.appspot.com",
  messagingSenderId: "605402647635",
  appId: "1:605402647635:web:a5dd72c7df4e71a19e8aa6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
