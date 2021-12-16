import React from "react";
import { Link } from "react-router-dom";
import "./NoteCard.css";

export default function NoteCard({noteID, noteTitle, noteCategory, noteMessage, setNoteToEdit}) {

    const editNote = () => {

        const noteToEditTemp = {
            id: noteID,
            title: noteTitle,
            category: noteCategory,
            message: noteMessage
        }

        setNoteToEdit(noteToEditTemp);
    }

    return (
        <div id={noteID} className="note-card">
            <p id="note-category" className="note-category">{noteCategory}</p>
            <p id="note-title" className="note-title">{noteTitle}</p>
            <p id="note-message" className="note-message">{noteMessage}</p>
            <Link to={"/edit/"+noteID} ><button className="note-card-button" onClick={editNote}>Edit</button></Link>
        </div>
    )
}