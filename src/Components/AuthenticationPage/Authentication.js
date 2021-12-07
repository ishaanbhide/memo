import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Authentication.css";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
import { auth } from "../../firebase";

export default function Authentication({loggedIn, setLoggedIn}) {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerClicked, setRegisterClicked] = useState(false);

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

    const registerIsClicked = e => {
        setRegisterClicked(!registerClicked);
    }

    return (
        <div className="authentication">
            {loggedIn && (<Navigate to="/home" />)}
            <div className="surround-box">
                <div className="auth-box">
                    <div className="login">
                        <input
                            className="auth-input"
                            placeholder="Email"
                            onChange={(event) => {
                            setLoginEmail(event.target.value);
                            }}
                        />
                        <input
                            className="auth-input"
                            placeholder="Password"
                            type="password"
                            onChange={(event) => {
                            setLoginPassword(event.target.value);
                            }}
                        />
                        <div className="login-or-register">
                            <button className="auth-button" onClick={login}> Login</button>
                            <p>or</p>
                            <p className="auth-p" onClick={registerIsClicked}>Register</p>
                        </div>
                    </div>
                    
                    {registerClicked && (
                        <div className="register">
                            <h3>Sign Up</h3>
                            <input
                                className="auth-input"
                                placeholder="Email"
                                onChange={(event) => {
                                setRegisterEmail(event.target.value);
                                }}
                            />
                            <input
                                className="auth-input"
                                placeholder="Password"
                                type="password"
                                onChange={(event) => {
                                setRegisterPassword(event.target.value);
                                }}
                            />
                            <button className="reg-button" onClick={register}>Register</button>
                            {loggedIn && (<Navigate to="/home" />)}
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}