import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

export default function Header({loggedIn, setLoggedIn, user}) {

    const logout = async () => {
        await signOut(auth);
        setLoggedIn(false);
      };


    return (
        <div className="header">
            <div className="header-left">
                <Link to="/"><h1>memo.</h1></Link>
            </div>
            
            <div className="header-right">
                <p>Logged in as {user.email}</p>
                <a href="/"><button className="logout-button" onClick={logout}>Log Out</button></a>
            </div>
        </div>
    )
}