import {useEffect, useState} from "react";
import {BaseUrl} from "../../BaseUrl";

export const LogOut:React.FC = () =>{

    const iduser = sessionStorage.getItem("idclient");
    useEffect(() => {
        fetch(BaseUrl+"enchere/cli/log_out/"+iduser)
            .then((response) => response.json())
            .then((data) => {
                sessionStorage.removeItem("idclient");
                window.alert('log out reussi')
                window.location.replace('/log')
                // localStorage.setItem("list",JSON.stringify(data.data))
            })
            .catch((error) => {
                console.error(error);
            });
    },[]);
    return (<></>);
}