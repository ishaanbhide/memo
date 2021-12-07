import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./NoteCard.css";

export default function NoteCard({noteID, noteTitle, noteCategory, noteMessage, noteEdit, setNoteEdit}) {

    

    const editNote = () => {
        const noteToEdit = {
            id: noteID,
            title: noteTitle,
            category: noteCategory,
            message: noteMessage
        };

        setNoteEdit(noteToEdit);
    }

    return (
        <div className="note-card">
            <p id="note-category" className="note-category">{noteCategory}</p>
            <p id="note-title" className="note-title">{noteTitle}</p>
            <p id="note-message" className="note-message">{noteMessage}</p>    
            <Link to="/edit" ><button onClick={editNote}>Edit</button></Link>
        </div>
    )
}