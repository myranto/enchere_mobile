import React, {useEffect, useState} from "react";
import {IonButton, IonButtons, IonHeader, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {Link} from "react-router-dom";
import {BaseUrl} from "../../BaseUrl";
import Menu from "../../components/Menu";
import {useHistory} from "react-router";

export const Reload_Account:React.FC = () =>{
    const [response,setResponse] = useState<string>("");
    const [compte,setCompte] = useState<any>(null);
    const style={
        color:"red"
    };
    const iduser = sessionStorage.getItem("idclient");

    useEffect(() => {
        fetch(BaseUrl+"enchere/cli/account/"+iduser)
            .then((response) => response.json())
            .then((data) => {
                setCompte(data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const link = BaseUrl+"enchere/cli/Reload_acccount"
    const handleSubmit = (e:any) =>{
        e.preventDefault()
        const formData = e.target;
        const montant = formData.elements.namedItem('montant').value;
        const obj = {
            "idclient":iduser,
            "montant":montant,
            "est_valider":0
        }
        fetch(
            link,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                // alert(res.data)
                if (data.error!==null){
                    setResponse(data.error)
                }else{
                    alert(data.data)
                    window.location.href = "/ownListencher";
                }
            })
            .catch((error) => {
                console.error(error);
                //TODO implement error
            });
    }
    const history = useHistory();

    return (
      <IonPage>
          {/*<Menu/>*/}
          <IonHeader>
              <IonToolbar>
                  <IonButtons slot="start">
                      <IonMenuButton/>
                  </IonButtons>
                  <IonTitle>Rechargement de compte</IonTitle>
              </IonToolbar>
              <IonButton onClick={()=>history.goBack()}>
                  return
              </IonButton>
          </IonHeader>
          <div className="limiter">
              <div className="container-login100">
                  <div className="wrap-login100">
                      <form className="login100-form validate-form" onSubmit={handleSubmit}>
					<span className="login100-form-title p-b-26">
                        votre compte est de {compte?.vola} ariary
						Reload account
					</span>
                          <span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"></i>
					</span>

                          {/*<div className="wrap-input100 validate-input">*/}
                          {/*    <label htmlFor="username">telephone</label>*/}
                          {/*    <IonInput className="input100" type="text"  name="tel" />*/}
                          {/*    <span className="focus-input100" data-placeholder="numero telephone :"></span>*/}
                          {/*</div>*/}

                          <div className="wrap-input100 validate-input" data-validate="Entrer montant">
						<span className="btn-show-pass">
							<i className="zmdi zmdi-eye"></i>
						</span>
                              <label htmlFor="username">montant</label>

                              <IonInput className="input100" type="number" value={0} name="montant" min={0}
                          />
                              <span className="focus-input100" data-placeholder="entrez montant"></span>
                          </div>
                          <h3 style={style}>{response}</h3>
                          <div className="container-login100-form-btn">
                              <div className="wrap-login100-form-btn">
                                  {/*<div className="login100-form-bgbtn">*/}
                                  {/*    <h1>*/}
                                  {/*        <Link className="btn btn-primary" to='/inscription' > s'inscrire </Link>*/}
                                  {/*    </h1>*/}
                                  {/*</div>*/}
                                  <IonButton className="login100-form-btn" type="submit">
                                      recharger
                                  </IonButton>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </IonPage>
    );
}