import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import "./EditCard.css";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function EditCard({noteEdit, setNoteEdit, user}) {

    const [doneEdit, setDoneEdit] = useState(false);

    useEffect(()=>{
        document.getElementById("newTitle").defaultValue = noteEdit.title;
        document.getElementById("newCategory").defaultValue = noteEdit.category;
        document.getElementById("newMessage").defaultValue = noteEdit.message;

        if (noteEdit.length !== 0) {
            setDoneEdit(false);
        }

    }, [noteEdit])


    const editNote = async () => {
        try {
            const noteTitle = document.getElementById("newTitle").value;
            const noteCategory = document.getElementById("newCategory").value;
            const noteMessage = document.getElementById("newMessage").value;

            await updateDoc(doc(db, user.uid, noteEdit.id), {
                title: noteTitle,
                category: noteCategory,
                message: noteMessage
             });

             setDoneEdit(true);
             setNoteEdit([]);
             

        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className="new-note">
            {doneEdit && (<Navigate to="/notes" />)}
            <div className="note-box">
                <p className="note-p">Edit Note</p>
                <input id="newTitle" type="text" placeholder="Title" name="title" />
                <input id="newCategory" type="text" placeholder="Category" name="category"/>
                <textarea id="newMessage" name="message"></textarea>
                <button className="note-button" type="submit" onClick={editNote}>Update</button>
            </div> 
        </div>
    )
}