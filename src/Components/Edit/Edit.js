import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { useParams } from "react-router";
import "./Edit.css";
import EditCard from "../EditCard/EditCard";
import Header from "../Header/Header.js"
import Loader from "../Loader/Loader";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";


export default function Edit({loggedIn, setLoggedIn, user, noteToEdit, setNoteToEdit}) {

    const [loadingEdit, setLoadingEdit] = useState(false);
    const params = useParams();
  
    const getNoteToEdit = async (user) => {
        try {
            const docRef = doc(db, user.uid, params.id);
            const docSnap = await getDoc(docRef);
            setLoadingEdit(true);
            return docSnap;

        } catch(error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (loggedIn === true) {
                if (noteToEdit.length === 0) {
                    const noteTemp1 = await getNoteToEdit(user);
    
                    if (noteTemp1 === undefined) {
                        const noteTemp2 = noteTemp1.data();
                        noteTemp2.id = params.id;
                        setNoteToEdit(noteTemp2);
                    }
                } else {
                    setLoadingEdit(true);
                }
            }
        }
        
        fetchData();
      });


    return (
        <div className="edit">
            {!loggedIn && (<Navigate to="/" />)}
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />

            {loadingEdit ? (
                <div className="edit-page">
                    <EditCard noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} user={user} />
                </div>
            ) : <Loader />}
        </div>
    )
}