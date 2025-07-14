import React, { useEffect, useState } from "react";
import UserContext from "./UserContext.js";

export default function UserContextProvider(props) {
    const [ isLogin, setLogin ] = useState(null);

        useEffect(()=> {
        if (localStorage.getItem('userToken') !== (null)){
            setLogin(localStorage.getItem('userToken'))
        }
    },[])

    return (
        <UserContext.Provider value={{ isLogin, setLogin }}>
            {props.children}
        </UserContext.Provider>
    );
}