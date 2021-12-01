import React from "react";
import "./Header.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Header({loggedIn, setLoggedIn, user}) {

    const logout = async () => {
        await signOut(auth);
        setLoggedIn(false);
      };


    return (
        <div className="header">
            <div className="header-left">
                <h1>My Notes</h1>
            </div>
            
            <div className="header-right">
                <p>Logged in as {user.email}</p>
                <a href="/"><button onClick={logout}>Log Out</button></a>
            </div>
        </div>
    )
}