import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Authentication from "./Components/AuthenticationPage/Authentication";
import Notes from "./Components/Notes/Notes";
import Edit from "./Components/Edit/Edit";

// Firebase imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getDocs } from "@firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "./firebase";

export default function App() {

    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    let [notes, setNotes] = useState([""]);
    const [noteEdit, setNoteEdit] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updateNote, setUpdateNote] = useState([]);

    useEffect(()=>{

      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);

        if (currentUser == null) {
          setLoggedIn(false);
          console.log("logged out");
        } else {
          setLoggedIn(true);
          console.log("logged in");
        }

        const getNotes = async (user) => {
          try {
            const data = await getDocs(collection(db, user.uid));
            setNotes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));   
            setLoading(true);
          } catch(error) {
              console.log(error.message);
          }
        }
        
        if (loggedIn === true) {
          getNotes(user);
        }
      });

    },[loggedIn, user])
    

    return (
      <Router>
        <Routes>

          <Route path="/home"
          exact
          element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />} 
          />

          <Route path="/notes"
          exact
          element={<Notes loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} notes={notes} noteEdit={noteEdit} setNoteEdit={setNoteEdit} loading={loading}/>}
          />

          <Route path="/edit"
          exact
          element={<Edit loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} noteEdit={noteEdit} />}
          />

          <Route path="/"
          exact
          element={<Authentication loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          
        </Routes>
      </Router>
    )
}