import React from "react";
import { Link } from "react-router-dom";
import "./NoteCard.css";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function NoteCard({noteID, noteTitle, noteCategory, noteMessage, setNoteEdit, user}) {

    const editNote = () => {
        const noteToEdit = {
            id: noteID,
            title: noteTitle,
            category: noteCategory,
            message: noteMessage
        };

        setNoteEdit(noteToEdit);
    }

    const deleteNote = async () => {
        try {
            document.getElementById(noteID).style.display = "none";
            await deleteDoc(doc(db, user.uid, noteID));
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div id={noteID} className="note-card">
            <p id="note-category" className="note-category">{noteCategory}</p>
            <p id="note-title" className="note-title">{noteTitle}</p>
            <p id="note-message" className="note-message">{noteMessage}</p>
            <div className="note-buttons">
                <Link to="/edit" ><button className="note-card-button" onClick={editNote}>Edit</button></Link>
                <button className="note-card-button" type="submit" onClick={deleteNote}>Delete</button>
            </div>
        </div>
    )
}