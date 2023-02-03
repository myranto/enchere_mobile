import {useHistory, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import '../../../css/front.css';
import Menu from "../../../components/Menu";
import {IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {BaseUrl} from "../../../BaseUrl";
export const FicheEnchere:React.FC = () =>{
    const { idenchere } = useParams<{ idenchere: string,idc:string; }>();
        // let variable:any = null;
    const [variable,setVariable] = useState<any>(null);
    useEffect(() => {
        console.log(BaseUrl+"enchere/cli/enchere/"+idenchere)
        fetch(BaseUrl+"enchere/cli/enchere/"+idenchere)
            .then((response) => response.json())
            .then((data) => {
                setVariable(data.data);
            })
            .catch((error) => {
                console.error("error :"+error);
            });
    },[]);
        // for (let i = 0; i < list.length; i++) {
        //         if (String(list[i].enchere.id)===idenchere){
        //             variable = list[i];
        //             break;
        //         }
        // }
// console.log(variable?.pic[0])
    const history = useHistory();

    return (
       <IonPage >
           {/*<Menu/>*/}
           <IonHeader>
               <IonToolbar>
                   <IonButtons slot="start">
                       <IonMenuButton/>
                   </IonButtons>
                   <IonTitle>Fiche enchere</IonTitle>
               </IonToolbar>
               <IonButton onClick={()=>history.goBack()}>
                   return
               </IonButton>
           </IonHeader>
           <IonContent fullscreen forceOverscroll={false}>
           <div className="limiter">
               <div className="container-login100">
                   <div className="wrap-login100">
           <h1 className="text-info">Description : ... {variable?.enchere?.description}</h1>


                       {/*<center><ul className="cards">*/}

              {variable?.pic.map((e:any)=><Img key={e.id} img={e}/>)}
                       {/*</ul></center>*/}


           <h1 className="text-info">Prix minimale de vente : {variable?.enchere?.prix_vente} Ariary</h1>
           <h1 className="text-info">Prix mise de depart : {variable?.enchere?.prix_mise_enchere} Ariary</h1>
          <p> liste de personne qui ont encherit :</p>
           <table border={1}>
               <thead>
               <tr>
                   <th>nom Client</th>
                   <th>montant</th>
               </tr>
               </thead>
               <tbody>
               {variable?.enchere?.list_rencher?.map((e:any)=><Person_enchere key={e.id} person={e} />)}
               </tbody>
           </table>
                   </div>
               </div>
           </div>
           </IonContent>
       </IonPage>
    );
}
const Person_enchere:React.FC<any> =({person})=>{
    return(
        <tr>
            <td>{person.idclient.nom}</td>
            <td>{person.montant} Ariary</td>
        </tr>
    );
}
const Img: React.FC<any> = ({img}) => {
    return (
        <>
        <li>
            <a  className="card">
                <img src={img.pic_name} className="card__image" alt=""/>
                <div className="card__overlay">
                    <div className="card__header">
                    </div>
                </div>
            </a>
            {/*<img src={img.pic_name} width={100} height={100}  />*/}
        </li>
        </>

    );
}