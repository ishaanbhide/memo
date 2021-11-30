import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCmbwK28EZhscs1dlfaNsDWqs_R1ULRUtQ",
    authDomain: "notes-97dd0.firebaseapp.com",
    projectId: "notes-97dd0",
    storageBucket: "notes-97dd0.appspot.com",
    messagingSenderId: "672446943637",
    appId: "1:672446943637:web:ec7308185610446f1b669c",
    measurementId: "G-BM7PJ03XCK"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);