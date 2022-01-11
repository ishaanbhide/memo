import React from "react";
import "./OptionsBar.css";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function OptionsBar({selectedNotes, setReloadNotes, user}) {

    const bulkDelete = async () => {
        
        try {
            console.log("deleting is beginning");

            console.log(selectedNotes);

            selectedNotes.forEach(function (item, index) {
                deleteDoc(doc(db, user.uid, item));
              }); 
              
            setReloadNotes(true);
            
        } catch (error) {
            console.log(error.message);
        }
        
    }

    return (
        <div className={"options-bar"}>
            <div className="option-items">
                <p className="bulk-delete" onClick={bulkDelete}>Delete</p>
            </div>
        </div>
    )
}