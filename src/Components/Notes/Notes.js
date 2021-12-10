import React from "react";
import "./Notes.css";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import NoteCard from "../NoteCard/NoteCard";
import Loader from "../Loader/Loader";

export default function Notes({loggedIn, setLoggedIn, user, notes, noteEdit, setNoteEdit, loading}) {
    
    return (
        <div className="notes">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />
            <Menu />
            {loading ? (
                <div className="notes-grid">
                {notes.map((note) => {
                    return (
                        <NoteCard noteID={note.id} noteTitle={note.title} noteCategory={note.category} noteMessage={note.message} noteEdit={noteEdit} setNoteEdit={setNoteEdit} user={user} />
                    )})}
                </div>
            ) : <Loader />}
        </div>
    )
}