import React from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import New from "../../Components/New/New";
import Menu from "../../Components/Menu/Menu";

export default function Home({loggedIn, setLoggedIn, user}) {

    return (
        <div className="home">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user}/>
            <Menu />
            <New />
        </div>
    )
}