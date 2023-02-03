import React, {useState} from "react";
import {IonButton, IonContent, IonInput, IonPage} from "@ionic/react";
import {BaseUrl} from "../../BaseUrl";
import {useHistory} from "react-router";

export const Inscription: React.FC = () => {
    const style={
        color:"red"
    };
    const link = BaseUrl+"enchere/cli/inscription";

    const [response,setResponse] = useState("");

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        const formData = e.target;
        const mdp = formData.elements.namedItem('mdp').value;
        const email = formData.elements.namedItem('email').value;
        const retap = formData.elements.namedItem('retap').value;
        const tel = formData.elements.namedItem('tel').value;
        const user = formData.elements.namedItem('user').value;
        if (mdp!==retap)
            window.alert("entrer un mot de passe correct");
        else{
            const json = {
                "nom":user,
                "email":email,
                "mdp":mdp,
                "tel":tel
            }
            fetch(
                link,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(json),
                }
            )
                .then((response) => response.json())
                .then((res) => {
                    // alert(res.data)
                    if (res.error!==null){
                        setResponse(res.error)
                    }else{
                        window.alert("account create with success!");
                        window.location.href = "/log";
                    }
                })
                .catch((error) => {
                    console.error(error);
                    //TODO implement error
                });
        }
    }
    const history = useHistory();

    return (
        <IonPage>
            <IonContent fullscreen forceOverscroll={false}>

            <main className="page contact-us-page">
                <section className="clean-block clean-form dark">
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-center">Inscription</h1>
                            <label htmlFor="username">Username</label>
                            <IonInput type="text" name="user"></IonInput><br/>

                            <label htmlFor="email">Email</label>
                            <IonInput type="email" name="email" className="form-control"></IonInput><br/>

                            <label htmlFor="tel">telephone</label>
                            <IonInput type="tel" name="tel"   className="form-control"></IonInput><br/>

                            <label htmlFor="pwd">Mot de passe</label>
                            <IonInput type="password" name="mdp"className="form-control"></IonInput><br/>


                            <label htmlFor="pwdconf">Retaper le mot de passe</label>
                            <IonInput type="password" name="retap"
                                      className="form-control"></IonInput><br/>
                            <h3 style={style}>{response}</h3>

                            <center> <IonButton type="submit" className="btn btn-primary">Valider</IonButton></center>

                            <IonButton className="btn btn-danger" onClick={()=>history.goBack()}>
                                return
                            </IonButton>
                        </form>
                    </div>
                </section>
            </main>
            </IonContent>
        </IonPage>
    );
}