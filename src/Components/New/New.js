import React from "react";
import "./New.css";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function New({user, dropCategories, setDropCategories}) {

    const createNote = async () => {
        try {

            const noteTitle = document.getElementById("newTitle").value;
            const noteCategory = document.getElementById("newCategory").value;
            const noteMessage = document.getElementById("newMessage").value;

            setDropCategories([...dropCategories, noteCategory]);

            document.getElementById("newTitle").value = "";
            document.getElementById("newCategory").value = "";
            document.getElementById("newMessage").value = "";

            await addDoc(collection(db, user.uid), {
                title: noteTitle,
                category: noteCategory,
                message: noteMessage,
                date: new Date()
             });

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="new-note">
            <div className="note-box">
                <p className="note-p">Create New Note</p>
                <input id="newTitle" type="text" placeholder="Title" name="title"/>
                <input id="newCategory" type="text" placeholder="Category" name="category" list="category"/>

                <datalist id="category" name="category">
                    {dropCategories.map(category => {
                        return (
                            <option value={category}>{category}</option>
                        )
                    })}
                </datalist>
                <textarea id="newMessage" name="message"></textarea>
                <button className="note-button" onClick={createNote} type="submit">Create</button>
            </div>
        </div>
    )
}