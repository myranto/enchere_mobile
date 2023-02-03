import React, {useState} from "react";
import {BaseUrl} from "../../BaseUrl";
import {IonButton, IonInput} from "@ionic/react";
import {Link} from "react-router-dom";
import '../../css/main.css';
import '../../css/util.css';
import {ViewNotification} from "../../components/ViewNotification";
const  Login: React.FC = () => {
    const style={
        color:"red"
    };
    // const user = (props.action===0)?"client":"admin";
    const link = BaseUrl+"enchere/cli/login";
    let d_email = "stev@gmail.com";
    let d_mdp = "steve";
    // const [email,setEmail] = useState<string>(d_email);
    // const [mdp,setMdp] = useState<string>(d_mdp);
    const [response,setResponse] = useState<string>("");
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const formData = e.target;
        const mdp = formData.elements.namedItem('mdp').value;
        const email = formData.elements.namedItem('email').value;
        const json = {
            "email": email,
            "mdp": mdp
        };
        console.log(link);
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
                    console.log(res.data)
                    const detail = {
                        "id":res.data.id,
                        "token":res.data.token
                    }
                    ViewNotification(detail.id)
                    sessionStorage.setItem("idclient",detail.id);
                    sessionStorage.setItem("client",JSON.stringify(detail));
                window.location.href = "/ownListencher";
                }
            })
            .catch((error) => {
                console.error(error);
                //TODO implement error
            });
    }
    return (
        <>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <form className="login100-form validate-form" onSubmit={handleSubmit}>
					<span className="login100-form-title p-b-26">
						Welcome
					</span>
                                <span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"></i>
					</span>

                                <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                                    <IonInput className="input100" type="email" name="email" value={d_email}/>
                                    <span className="focus-input100" data-placeholder=""></span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="Enter password">
						<span className="btn-show-pass">
							<i className="zmdi zmdi-eye"></i>
						</span>
                                    <IonInput className="input100" type="password" name="mdp" value={d_mdp}
                                    />
                                    <span className="focus-input100" data-placeholder=""></span>
                                </div>
                                <h3 style={style}>{response}</h3>
                                <div className="container-login100-form-btn">
                                    <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn">

                                        </div>
                                        <IonButton className="login100-form-btn" type="submit">
                                            Se Connecter
                                        </IonButton>
                                    </div>
                                    <h1>
                                        <Link  to='/inscription' > s'inscrire </Link>
                                    </h1>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


        </>
            );
}



export default Login;