import React, { useEffect, useState } from "react";
import "./Home.css";
import { Navigate } from "react-router-dom";
import New from "../../Components/New/New";
import Header from "../../Components/Header/Header";
import { getDocs } from "@firebase/firestore";
import { collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import Notes from "../Notes/Notes";

export default function Home({loggedIn, setLoggedIn, user, notes, setNotes, setNoteToEdit, reloadNotes, setReloadNotes}) {

    const [loadingHome, setLoadingHome] = useState(false);
    const [dropCategories, setDropCategories] = useState([""]);

    const getNotes = async (user) => {
        try {
            const q = query(collection(db, user.uid), orderBy("date", "desc"));
            const data = await getDocs(q);
            const newNotes = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            return newNotes;

        } catch(error) {
            console.log(error.message);
        }
    }

    useEffect(async() => {

        if (loggedIn === true) {
          const updatedNotes = await getNotes(user);
          console.log(updatedNotes);

          let categoriesTemp = [];
          (updatedNotes.map((note) => categoriesTemp.push(note.category)));
          let categoriesSet = [...new Set(categoriesTemp)];
          setDropCategories(categoriesSet);
          setLoadingHome(true);
          console.log(categoriesSet);
        }
  
    }, [loggedIn]);
    
    return (  
        <div className="home">
            {!loggedIn && (<Navigate to="/" />)}
            
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />

            <div className="home-sections">
                <div className="home-left-section">
                    <New user={user} dropCategories={dropCategories} setDropCategories={setDropCategories} setReloadNotes={setReloadNotes}/>
                </div>

                <div className="home-right-section">
                    <Notes 
                    loggedIn={loggedIn} 
                    setLoggedIn={setLoggedIn} user={user} 
                    notes={notes}
                    setNotes={setNotes}
                    setNoteToEdit={setNoteToEdit}
                    reloadNotes={reloadNotes}
                    setReloadNotes={setReloadNotes}
                    setDropCategories={setDropCategories} />
                </div>
            </div>
        </div>
    )
}