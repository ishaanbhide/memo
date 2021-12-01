import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "./firebase";
import { db } from "./firebase";
import "./App.css";
import Header from "./Components/Header/Header";
import New from "./Components/New/New";
import Menu from "./Components/Menu/Menu";


export default function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);

    if (currentUser != null) {
      setLoggedIn(true);
    }
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      
      setLoggedIn(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setLoggedIn(false);
  };

  //====================================================================

  const [notes, setNotes] = useState([]);
  const notesCollectionRef = collection(db, "Notes");

  useEffect(() => {
      const getNotes = async () => {
      const data = await getDocs(notesCollectionRef);
      setNotes(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  };

  getNotes();

  }, []);
  console.log(notes);

  let categories = [];
  notes.forEach(function (note) {
    categories.push(note.category);
  })
  
  //====================================================================

   if (loggedIn != true){
    return (
      <div className="App">
        <div>
          <h3> Register User </h3>
          <input
            placeholder="Email..."
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <input
            placeholder="Password..."
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />

          <button onClick={register}> Create User</button>
        </div>

        <div>
          <h3> Login </h3>
          <input
            placeholder="Email..."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            placeholder="Password..."
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />

          <button onClick={login}> Login</button>
        </div>

        <h4> User Logged In: </h4>
        {user?.email}

        <button onClick={logout}> Sign Out </button>

      </div>
    );
  } else {
    return (
      <>
        <Header email={user.email} />
        <Menu />
        <New />
      </>
    )
  }
}