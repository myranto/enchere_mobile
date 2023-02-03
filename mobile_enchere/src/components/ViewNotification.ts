import {PushNotifications, Token} from "@capacitor/push-notifications";
import {BaseUrl} from "../BaseUrl";

export const ViewNotification = (idclient: any) => {
    console.log('Initializing ');
    PushNotifications.register();
    PushNotifications.addListener('registration',
        (token: Token) => {
            console.log("token: " +JSON.stringify(token))
            const json = {
                "idclient": idclient,
                "token": token.value
            }
            // window.alert(JSON.stringify(json))
            fetch(
                BaseUrl + "enchere/notification/save_token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(json),
                }
            ).catch((error) => {
                console.log("ty misy error "+JSON.stringify(error));
                //TODO implement error
            });
        }
    );
    PushNotifications.addListener('registrationError',
        (error: any) => {
            window.alert('Error on registration: ' + JSON.stringify(error));
        }
    );
    // useEffect(()=>{

}