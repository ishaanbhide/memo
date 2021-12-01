import React, { useEffect, useState, Link } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "./firebase";
import { db } from "./firebase";
import Home from "./Components/Home/Home";
import Authentication from "./Components/AuthenticationPage/Authentication";


export default function App() {

    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser != null) {
        setLoggedIn(true);
        console.log("Logged in");
      } else {
        console.log("Logged out");
      }
    });

    const [notes, setNotes] = useState([]);
    const notesCollectionRef = collection(db, "Notes");

    useEffect(() => {
        const getNotes = async () => {
        const data = await getDocs(notesCollectionRef);
        setNotes(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };

    getNotes();

    }, []);

    let categories = [];
    notes.forEach(function (note) {
      categories.push(note.category);
    })
    
    return (
      <Router>
        <Routes>

          <Route path="/home"
          exact
          element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user}/>}/>

          <Route path="/"
          exact
          element={<Authentication loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
          />

        </Routes>
      </Router>
    )
}