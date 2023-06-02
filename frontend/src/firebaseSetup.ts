// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzbJzufzJ2DeFgOjxu472PBDGY_XDoU3k",
    authDomain: "potluck-planner-719aa.firebaseapp.com",
    projectId: "potluck-planner-719aa",
    storageBucket: "potluck-planner-719aa.appspot.com",
    messagingSenderId: "227076380926",
    appId: "1:227076380926:web:b4d73d4a46459fb2032daf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
