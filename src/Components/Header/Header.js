import React from "react";
import "./Header.css";

export default function Header(props) {
    return (
        <div className="header">
            <div className="header-left">
                <h1>My Notes</h1>
            </div>
            
            <div className="header-right">
                <p>Logged in as {props.email}</p>
            </div>
        </div>
    )
}