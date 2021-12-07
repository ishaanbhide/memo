import React, { useEffect } from "react";
import "./EditCard.css";

export default function EditCard({noteEdit}) {

    useEffect(()=>{
        document.getElementById("newTitle").defaultValue = noteEdit.title;
        document.getElementById("newCategory").defaultValue = noteEdit.category;
        document.getElementById("newMessage").defaultValue = noteEdit.message;
    }, [])

    return (
        <div className="new-note">
            <div className="note-box">
                <p className="note-p">Edit Note</p>
                <input id="newTitle" type="text" placeholder="Title" name="title" />
                <input id="newCategory" type="text" placeholder="Category" name="category"/>
                <textarea id="newMessage" name="message"></textarea>
                <button className="note-button" type="submit">Update</button>
            </div>
        </div>
    )
}