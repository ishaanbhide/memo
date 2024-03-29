import React from "react";
import { Link } from "react-router-dom";
import "./NoteCard.css";

export default function NoteCard({noteID, noteTitle, noteCategory, noteMessage, setNoteToEdit, selectedNotes, setSelectedNotes, setOptionsBar, checked}) {

    const editNote = () => {

        const noteToEditTemp = {
            id: noteID,
            title: noteTitle,
            category: noteCategory,
            message: noteMessage
        }

        setNoteToEdit(noteToEditTemp);
    }

    const selectCheckBox = () => {

        let tempSelectedNotes = selectedNotes;

        if (selectedNotes.includes(noteID)) {
            const tempIndex = tempSelectedNotes.indexOf(noteID);
            tempSelectedNotes.splice(tempIndex, 1);
            setSelectedNotes(tempSelectedNotes);

        } else {
            tempSelectedNotes.push(noteID);
            setSelectedNotes(tempSelectedNotes);
        }

        if (selectedNotes.length > 0) {
            setOptionsBar(true);
            document.getElementById("category-p").classList.add("disabledDiv");
        } else {
            setOptionsBar(false);
            document.getElementById("category-p").classList.remove("disabledDiv");
        }
    }

    return (
        <div id={noteID} className="note-card">
            <input id={noteID} className="note-checkbox" type="checkbox" onChange={selectCheckBox}/>
            <p id="note-category" className="note-category">{noteCategory}</p>
            <p id="note-title" className="note-title">{noteTitle}</p>
            <p id="note-message" className="note-message">{noteMessage}</p>
            <Link to={"/edit/"+noteID} ><button className="note-card-button" onClick={editNote}>Edit</button></Link>
        </div>
    )
}