import React, { useEffect, useState, Link } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Home from "./Components/Home/Home";
import Authentication from "./Components/AuthenticationPage/Authentication";
import Category from "./Components/Category/Category";

export default function App() {

    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [notes, setNotes] = useState([]);
    let categories = [];

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

    if (currentUser != null) {
      setLoggedIn(true);
      console.log("Logged in");
    } else {
      console.log("Logged out");
    }
  });

  
    /*if (loggedIn == true) {
        const notesCollectionRef = collection(db, user.uid);

        const getNotes = async () => {
          const data = await getDocs(notesCollectionRef);
          setNotes(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };

        getNotes();

        notes.forEach(function (note) {categories.push(note.category)});
        console.log(categories)
      }*/

    
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
          
          {categories.map((c) => {
                return <Route path={"/" + c} exact element={<Category loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user}/>} />
            })}

        </Routes>
      </Router>
    )
}