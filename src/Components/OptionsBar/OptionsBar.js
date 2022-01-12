import React from "react";
import "./OptionsBar.css";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function OptionsBar({selectedNotes, setReloadNotes, user, setOptionsBar}) {

    const bulkDelete = async () => {
        
        try {
            selectedNotes.forEach(function (item, index) {
                deleteDoc(doc(db, user.uid, item));
              }); 
              
            setReloadNotes(true);
            setOptionsBar(false);
            
        } catch (error) {
            console.log(error.message);
        }
        
    }

    return (
        <div className="options-bar">
            <div className="option-items">
                <p className="bulk-delete" onClick={bulkDelete}>Delete</p>
            </div>
        </div>
    )
}