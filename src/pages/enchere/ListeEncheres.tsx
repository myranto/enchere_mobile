import React, {useEffect, useState} from "react";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonList, IonMenuButton,
    IonNote,
    IonPage, IonTitle,
    IonToolbar
} from "@ionic/react";
import {BaseUrl} from "../../BaseUrl";
import Menu from "../../components/Menu";
import {useHistory} from "react-router";


export const ListeEncheres: React.FC = () => {

    const iduser = sessionStorage.getItem("idclient");
    const [list,setList] = useState<any>(null);
    useEffect(() => {
        fetch(BaseUrl+"enchere/cli/enchere/select/"+iduser)
            .then((response) => response.json())
            .then((data) => {
                setList(data.data);
                console.log(data.data)
                // localStorage.setItem("list",JSON.stringify(data.data))
            })
            .catch((error) => {
                console.error(error);
            });
    },[]);
    const history = useHistory();

    return (
        <IonPage>
            {/*<Menu/>*/}
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>liste de vos enchere</IonTitle>
                </IonToolbar>
                <IonButton onClick={()=>history.goBack()}>
                    return
                </IonButton>
            </IonHeader>
            <IonContent fullscreen forceOverscroll={false}>
            <div className="container">
                <h1 className="text-info">Liste des Encheres</h1>
                <br/>
                <IonList >

                     {list?.map((e:any)=><Value enchere={e.enchere} idc={iduser} key={e.enchere.id}/>)}

                </IonList>
            </div>
        </IonContent>
        </IonPage>
    );
}

const Value: React.FC<any> = ({enchere,idc}) => {
    const date = new Date(enchere.date_enchere);
    return (
            <IonItem routerLink={`/FicheEnchere/${enchere.id}/${idc}`} detail={false}>
                <div slot="start" className="dot dot-unread"></div>
                <IonLabel className="ion-text-wrap">
            <h2>
               categorie: {enchere.idcategorie.nom}
                <span className="date">
            <IonNote>{date.toString()}</IonNote>
          </span>
            </h2>
            <h3>duration  : {enchere.duree} h<br/>
                <br/>
                <br/>
              <h3 className="text-info"> cliquer pour voir detail</h3>
            </h3>
            <p>
               <center> <StatusCode states={enchere.status}/></center>
            </p>
                </IonLabel>
            </IonItem>

    );
}


const StatusCode:React.FC<any> = ({states}) =>{
    const value = states===0?"non fini":"fini";
    console.log(states)
    return (
     <strong>{value}</strong>
    )
}