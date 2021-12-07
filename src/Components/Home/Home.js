import "./Home.css";
import { Navigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import New from "../../Components/New/New";
import Menu from "../../Components/Menu/Menu";

export default function Home({loggedIn, setLoggedIn, user}) {
    
    return (
        <div className="home">
            {!loggedIn && (<Navigate to="/" />)}
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user}/>
            <Menu />
            <New user={user}/>
        </div>
    )
}