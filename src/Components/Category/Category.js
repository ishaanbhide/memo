import React from "react";
import "./Category.css";
import Header from "../../Components/Header/Header";
import New from "../../Components/New/New";
import Menu from "../../Components/Menu/Menu";
import Category from "../../Components/Category/Category";

export default function Home({loggedIn, setLoggedIn, user}) {

    return (
        <div className="home">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user}/>
            <Menu />
            <p>This is a specific category page</p>
        </div>
    )
}