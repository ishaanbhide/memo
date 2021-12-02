import React, { useState } from "react";
import "./New.css";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function New({user}) {

    const createNote = async () => {
        try {
            await addDoc(collection(db, user.uid), {
                title: document.getElementById("newTitle").value,
                category: document.getElementById("newCategory").value,
                message: document.getElementById("newMessage").value
             });

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="new-note">
            <h4>New Note</h4>
            <input id="newTitle" type="text" placeholder="Title" name="title"/>
            <input id="newCategory" type="text" placeholder="Category" name="category"/>
            <textarea id="newMessage" name="message"></textarea>
            <button onClick={createNote} type="submit">Send</button>
        </div>
    )
}