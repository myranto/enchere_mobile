import React, {useEffect, useState} from "react";
import {
    IonButton, IonButtons,
    IonCard,
    IonCardContent,
    IonContent, IonFooter,
    IonHeader, IonItem, IonLabel,
    IonList,
    IonListHeader, IonMenuButton,
    IonPage, IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Toast } from "@capacitor/toast";
import {BaseUrl} from "../../BaseUrl";
import {useHistory} from "react-router";
export const Notification:React.FC  = () =>{
    const nullEntry: any[] = []
    const [notifications, setnotifications] = useState(nullEntry);
    const iduser = sessionStorage.getItem("idclient");
    const [list,setList] = useState<any[]>([]);
    useEffect(()=>{
        PushNotifications.checkPermissions().then((res) => {
            if (res.receive !== 'granted') {
                PushNotifications.requestPermissions().then((res) => {
                    if (res.receive === 'denied') {
                        showToast('Push Notification permission denied');
                    }
                    else {
                        showToast('Push Notification permission granted');
                        register();
                    }
                });
            }
            else {
                register();
            }
        });
        fetch(BaseUrl+"enchere/notification/"+iduser)
            .then((response) => response.json())
            .then((data) => {
                setList(data.data);
                console.log(data.data)
                localStorage.setItem("list",JSON.stringify(data.data))
            })
            .catch((error) => {
                console.error(error);
            });
    },[])
    const register = () => {
        console.log('Initializing HomePage');
        PushNotifications.addListener('registrationError',
            (error: any) => {
                window.alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us
        // the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                setnotifications(notifications => [...notifications, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                setnotifications(notifications => [...notifications, { id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body, type: 'action' }])
            }
        );
    }

    const showToast = async (msg: string) => {
        await Toast.show({
            text: msg
        })
    }
    const history = useHistory();
    return (
        <IonPage id='main'>
            <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>
                        <IonTitle>Notification</IonTitle>
                    </IonToolbar>
                <IonToolbar color="primary">
                    <IonButton  onClick={()=>history.goBack()}>
                        return
                    </IonButton>
                    <IonTitle slot="start"> Push Notifications</IonTitle>
                </IonToolbar>
                <IonToolbar color="light">
                    <IonTitle slot="start">By Enappd Team</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div>
                    <IonList>
                        <IonCard>
                            <IonCardContent>
                                1. You can see here all of your notification<br></br>
                                2. Once registered, you can send push from the Firebase console. <br></br>
                                <a href="https://enappd.gitbook.io/ionic-5-react-capacitor-full-app/features/push-notifications" target="_blank">Check documentation</a><br></br>
                                3. Once your app receives notifications, you'll see the data here in the list
                            </IonCardContent>
                        </IonCard>
                    </IonList>
                </div>
                <IonListHeader mode="ios" lines="full">
                    <IonLabel>Notifications</IonLabel>
                </IonListHeader>
                {notifications.length !== 0 &&
                    <IonList>
                        {notifications.map((notif: any) =>
                            <IonItem key={notif.id}>
                                <IonLabel>
                                    <IonText>
                                        <h3 className="notif-title">{notif.title}</h3>
                                    </IonText>
                                    <p>{notif.body}</p>
                                    {notif.type==='foreground' && <p>This data was received in foreground</p>}
                                    {notif.type==='action' && <p>This data was received on tap</p>}
                                </IonLabel>
                            </IonItem>
                        )}
                    </IonList>}
                {
                    list.length !==0 &&
                    <IonList>
                        {list?.map((l:any)=>
                            <IonItem key={l.id}>
                                <IonLabel>
                                    <IonText>
                                        <h3 className="notif-title">{l.message} enchereID {l.idenchere}</h3>
                                    </IonText>
                                    <p>{l.etat}</p>
                                    <p>concernant le vainqueur : {l.winner}</p>
                                </IonLabel>
                            </IonItem>
                        )}
                    </IonList>
                }
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButton color="success" expand="full" onClick={register}>Register for Push</IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage >
    );
}