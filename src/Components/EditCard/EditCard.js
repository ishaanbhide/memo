import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import "./EditCard.css";
import { db } from "../../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function EditCard({noteToEdit, setNoteToEdit, user}) {

    const [doneEdit, setDoneEdit] = useState(false);

    useEffect(()=>{
        document.getElementById("newTitle").defaultValue = noteToEdit.title;
        document.getElementById("newCategory").defaultValue = noteToEdit.category;
        document.getElementById("newMessage").defaultValue = noteToEdit.message;

        if (noteToEdit.length !== 0) {
            setDoneEdit(false);
        }

    }, [noteToEdit])


    const editNote = async () => {
        try {
            const noteTitle = document.getElementById("newTitle").value;
            const noteCategory = document.getElementById("newCategory").value;
            const noteMessage = document.getElementById("newMessage").value;

            await updateDoc(doc(db, user.uid, noteToEdit.id), {
                title: noteTitle,
                category: noteCategory,
                message: noteMessage
             });

             setDoneEdit(true);
             setNoteToEdit([]);
             

        } catch (error) {
            console.log(error.message);
        }
    }


    const deleteNote = async () => {
        try {
            await deleteDoc(doc(db, user.uid, noteToEdit.id));
            setDoneEdit(true);
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className="edit-card">
            {doneEdit && (<Navigate to="/home" />)}
            <div className="note-box-edit">
                <p>Edit Note</p>
                <input id="newTitle" type="text" placeholder="Title" name="title" />
                <input id="newCategory" type="text" placeholder="Category" name="category"/>
                <textarea id="newMessage" name="message"></textarea>
                <button className="note-button-edit" type="submit" onClick={editNote}>Update</button>
                <button className="note-button-delete" type="submit" onClick={deleteNote}>Delete</button>
            </div> 
        </div>
    )
}