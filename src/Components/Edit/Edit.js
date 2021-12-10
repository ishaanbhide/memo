import "./Edit.css";
import { Navigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Menu from "../../Components/Menu/Menu";
import EditCard from "../EditCard/EditCard";

export default function Edit({loggedIn, setLoggedIn, user, noteEdit, setNoteEdit}) {
    
    return (
        <div className="home">
            {!loggedIn && (<Navigate to="/" />)}
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />
            <Menu />
            <EditCard noteEdit={noteEdit} setNoteEdit={setNoteEdit} user={user} />
        </div>
    )
}