import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Authentication from "./Components/AuthenticationPage/Authentication";
import Edit from "./Components/Edit/Edit";

// Firebase imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function App() {


  // States

  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState([]);
  const [reloadNotes, setReloadNotes] = useState(false);

  // Detecting logged in user

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);

    if (currentUser == null) {
      setLoggedIn(false);
      console.log("Logged off");
    } else {
      setLoggedIn(true);
      console.log("Logged in");
    }
  });

  return (
    <div className="app">
      
      <Router>
        <Routes>

          <Route path="/home"
          exact
          element={<Home loggedIn={loggedIn} 
          setLoggedIn={setLoggedIn} 
          user={user}
          notes={notes}
          setNotes={setNotes}
          setNoteToEdit={setNoteToEdit}
          setReloadNotes={setReloadNotes}
          reloadNotes={reloadNotes} />} 
          />

          <Route path="/edit/:id"
          exact
          element={<Edit loggedIn={loggedIn} 
          setLoggedIn={setLoggedIn} 
          user={user}
          noteToEdit={noteToEdit}
          setNoteToEdit={setNoteToEdit} />}
          />

          <Route path="/"
          exact
          element={<Authentication loggedIn={loggedIn} 
          setLoggedIn={setLoggedIn} />}
          />
          
        </Routes>
      </Router>
    </div>
  )
}