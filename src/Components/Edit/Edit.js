import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./Edit.css";
import Header from "../../Components/Header/Header";
import Menu from "../../Components/Menu/Menu";
import EditCard from "../EditCard/EditCard";
import Loader from "../Loader/Loader";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";


export default function Edit({loggedIn, setLoggedIn, user}) {

    const [loadingEdit, setLoadingEdit] = useState(false);
    const [noteEdit, setNoteEdit] = useState([]);
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

    useEffect(async() => {

        if (loggedIn === true) {
          const noteTemp1 = await getNoteToEdit(user);
          const noteTemp2 = noteTemp1.data();
          noteTemp2.id = params.id;
          setNoteEdit(noteTemp2);
        }
  
      }, [loggedIn]);


    return (
        <div className="home">
            
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />
            <Menu />
            {loadingEdit ? (
                <EditCard noteEdit={noteEdit} setNoteEdit={setNoteEdit} user={user} />
            ) : <Loader />}
        </div>
    )
}