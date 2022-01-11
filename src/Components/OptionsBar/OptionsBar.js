import React, { useState } from "react";
import "./OptionsBar.css";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function OptionsBar({selectedNotes, setDoneSelection, user}) {

    const bulkDelete = async () => {
        
        try {
            console.log("deleting is beginning");

            console.log(selectedNotes);

            selectedNotes.forEach(function (item, index) {
                deleteDoc(doc(db, user.uid, item));
              });

            setDoneSelection(true);
            
        } catch (error) {
            console.log(error.message);
        }

        
        console.log("deleting is done");
        
    }
//{doneSelection && (<Navigate to="/notes" />)}
    return (
        <div className={"options-bar"}>
            <div className="option-items">
                <p className="bulk-delete" onClick={bulkDelete}>Delete</p>
            </div>
        </div>
    )
}