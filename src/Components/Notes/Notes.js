import React, { useEffect, useState } from "react";
import "./Notes.css";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import NoteCard from "../NoteCard/NoteCard";
import Loader from "../Loader/Loader";
import OptionsBar from "../OptionsBar/OptionsBar";
import { getDocs } from "@firebase/firestore";
import { collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

export default function Notes({loggedIn, setLoggedIn, user, notes, setNotes, setNoteToEdit}) {

    // States

    const [loadingNotes, setLoadingNotes] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState();
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [optionsBar, setOptionsBar] = useState(false);
    const [reloadNotes, setReloadNotes] = useState(false);


    const getNotes = async (user) => {
        try {
            const q = query(collection(db, user.uid), orderBy("date", "desc"));
            const data = await getDocs(q);
            const newNotes = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setNotes(newNotes);
            setFilteredNotes(newNotes);
            setLoadingNotes(true);
            return newNotes;

        } catch(error) {
            console.log(error.message);
        }
    }


    useEffect(async() => {

        if (loggedIn === true) {
          const updatedNotes = await getNotes(user);
          console.log(updatedNotes);

          let categoriesTemp = ["All"];
          (updatedNotes.map((note) => categoriesTemp.push(note.category)));
          let categoriesSet = [...new Set(categoriesTemp)];
          setAllCategories(categoriesSet);
        }
  
      }, [loggedIn]);


      useEffect(async() => {
          if (reloadNotes === true) {
              setLoadingNotes(false);
              if (loggedIn === true) {
                const updatedNotes = await getNotes(user);
                console.log(updatedNotes);
      
                let categoriesTemp = ["All"];
                (updatedNotes.map((note) => categoriesTemp.push(note.category)));
                let categoriesSet = [...new Set(categoriesTemp)];
                setAllCategories(categoriesSet);
              }
              setReloadNotes(false);
          }
      }, [reloadNotes]);


      const filterNotes = (category) => {

        if (category === "All") {
            setFilteredNotes(notes);
            console.log(filteredNotes);
        } else {
            const fNotes = notes.filter(function(note) {
                return (note.category === category);
            });
    
            setFilteredNotes(fNotes);
        }
      }
    
    return (
        <div className="notes">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />
            <Menu />

            
            {loadingNotes ? (
                <>
                    <div className="categories">
                        {allCategories.map(category => {
                            return (
                                <p className="category-p" onClick={() => filterNotes(category)}>{category}</p>
                            )
                        })}
                    </div>

                    <div className="notes-grid">
                    {filteredNotes.map((note) => {
                        return (
                            <NoteCard noteID={note.id} 
                            noteTitle={note.title} 
                            noteCategory={note.category} 
                            noteMessage={note.message} 
                            setNoteToEdit={setNoteToEdit}
                            selectedNotes={selectedNotes}
                            setSelectedNotes={setSelectedNotes}
                            setOptionsBar={setOptionsBar} />
                        )})}
                    </div>
                </>
            ) : <Loader />}

            {optionsBar && (
                <OptionsBar selectedNotes={selectedNotes} 
                setReloadNotes={setReloadNotes}
                user={user} />
            )}
        </div>
    )
}