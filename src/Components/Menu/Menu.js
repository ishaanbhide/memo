import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

export default function Menu() {

    return (
        <div className="menu">
            <div className="menu-items">
                <Link to="/home">New</Link>
                <Link to="/notes">Notes</Link>
            </div>
        </div>
    )
}