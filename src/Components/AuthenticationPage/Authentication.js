import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Authentication.css";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";


export default function Authentication({loggedIn, setLoggedIn}) {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loggin, setLoggin] = useState(false);

    const register = async () => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
          );

          setLoggedIn(true);
  
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

    return (
        <div className="authenticaation">
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
                {loggedIn && (<Navigate to="/home" />)}
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
                {loggedIn && (<Navigate to="/home" />)}
            </div>
        </div>
    )
}