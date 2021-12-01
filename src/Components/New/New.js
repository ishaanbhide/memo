import React, { useState } from "react";
import "./New.css";

export default function New() {

    const [message, setMessage] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className="new-note">
            <h4>New Note</h4>
            <input type="text" placeholder="Title" name="title"/>
            <input type="text" placeholder="Category" name="category"/>
            <textarea name="message"></textarea>
            <button onclick={handleSubmit} type="submit">Send</button>
            {message && <span>Saved.</span>}
        </div>
    )
}