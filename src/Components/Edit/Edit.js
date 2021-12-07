import "./Edit.css";
import { Navigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Menu from "../../Components/Menu/Menu";
import EditCard from "../EditCard/EditCard";
import { useEffect } from "react";

export default function Edit({loggedIn, setLoggedIn, user, noteEdit, setNoteEdit}) {

    useEffect(()=>{
        console.log({noteEdit});
    })
    
    return (
        <div className="home">
            {!loggedIn && (<Navigate to="/" />)}
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user}/>
            <Menu />
            <EditCard noteEdit={noteEdit} />
        </div>
    )
}