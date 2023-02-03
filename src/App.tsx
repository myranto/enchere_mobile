import {IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {Redirect, Route} from 'react-router-dom';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from "./pages/login/Login";
import React from "react";
import {Inscription} from "./pages/login/Inscription";
import {Acceuil} from "./pages/enchere/Acceuil";
import {ListeEncheres} from "./pages/enchere/ListeEncheres";
import {FicheEnchere} from "./pages/enchere/fiche/FicheEnchere";
import  {CheckToken} from "./pages/Authentification/Authentification";
import {Reload_Account} from "./pages/account/Reload_Account";
import {Notification} from "./pages/push/Notification";
import {LogOut} from "./pages/login/LogOut";
setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/ownListencher" />
            </Route>
            <Route path="/reload_account" exact={true}>
              <CheckToken />
              <Reload_Account />
            </Route>
            <Route path="/acceuil" exact={true}>
              <CheckToken />
              <Acceuil />
            </Route>
            <Route path="/log" exact={true}>
              <Login />
            </Route>
            <Route path="/push" exact={true}>
              <Notification />
            </Route>
            <Route path="/inscription" exact={true}>
              <Inscription />
            </Route>
            <Route path="/logout" exact={true}>
              <LogOut />
            </Route>
            <Route path="/ownListencher" exact={true}>
              <CheckToken />

              <ListeEncheres />
            </Route>
            <Route path="/FicheEnchere/:idenchere/:idc" exact={true}>
              <CheckToken />

              <FicheEnchere />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
