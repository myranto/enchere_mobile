import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {checkStorage} from "./pages/Authentification/Authentification";
import {unwatchFile} from "fs";
// import {isLoggedIn} from "../data/login.service";
interface Child {
    children: any,
    path: string,
    exact: boolean
}
export function LoggedRoute({children, ...rest}: Child): JSX.Element {
    console.log(rest)
    return (
        <Route {...rest}  render={()=>
            checkStorage() ? <>{children}</> : <Redirect to="/log"/>
        }>
        </Route>
    );
}