import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
  addCircleOutline,
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  cardOutline,
  heartOutline,
  heartSharp, listCircleOutline, listOutline, logInOutline, logOutOutline,
  mailOutline,
  mailSharp, notificationsCircle,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Recharger compte',
    url: '/reload_account',
    iosIcon: mailOutline,
    mdIcon: cardOutline
  },
  {
    title: 'log in',
    url: '/log',
    iosIcon: paperPlaneOutline,
    mdIcon: logInOutline
  },
  {
    title: 'liste de mes encheres',
    url: '/ownListencher',
    iosIcon: heartOutline,
    mdIcon: listCircleOutline
  },
  {
    title: 'Ajouter enchere',
    url: '/acceuil',
    iosIcon: archiveOutline,
    mdIcon: addCircleOutline
  },
  {
    title: 'notification',
    url: '/push',
    iosIcon: notificationsCircle,
    mdIcon: notificationsCircle
  },
  {
    title: 'log out',
    url: '/logout',
    iosIcon: logOutOutline,
    mdIcon: logOutOutline
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        {/*<IonList id="labels-list">*/}
        {/*  <IonListHeader>Labels</IonListHeader>*/}
        {/*  {labels.map((label, index) => (*/}
        {/*    <IonItem lines="none" key={index}>*/}
        {/*      <IonIcon slot="start" icon={bookmarkOutline} />*/}
        {/*      <IonLabel>{label}</IonLabel>*/}
        {/*    </IonItem>*/}
        {/*  ))}*/}
        {/*</IonList>*/}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
