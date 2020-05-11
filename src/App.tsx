import React, { useEffect, FC } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Beforeunload } from 'react-beforeunload';

import { Home, UsersPage, DialogsPage, ChatPage, ProfilePage, Page404 } from "./pages";
import { NavBar } from "./components";
import { LoginForm, RegisterForm } from "./modules";

import socket from "./socketServices";
import { AppStateType } from "./store/reducers";
import { UserSelectors } from "./store/selectors";
import { Auth, DoNotAuth } from "./hoc";
import { storageKeys } from "./assets/constants/commons";
import { urls } from "./assets/constants";
import { getAuthUserData } from "./store/actions/user.action";
import "./assets/styles/app.scss";

type MapStateToPropsType = {
    isAuth?: boolean,
    userId: string
}

type MapDispatchToPropsType = {
    getAuthUserData: () => void
}

type PropType = MapStateToPropsType & MapDispatchToPropsType;


let App: FC<PropType> = ({ isAuth, userId, getAuthUserData }) => {
  useEffect(() => {
    const authData = localStorage.getItem(storageKeys.isAuth);

    if(!!authData && JSON.parse(authData)) getAuthUserData();
    if(isAuth) socket.setOnlineStatus({ userId, isOnline: true });
  }, [isAuth, getAuthUserData, userId]);

  return (
      <Beforeunload onBeforeunload={ () => userId && socket.setOnlineStatus({ userId, isOnline: false }) } >
          <div className={"app " + (isAuth ? "app--active" : "app--not-active")} >
            <NavBar />
            <Switch>
              <Route exact path={ urls.home } component={ DoNotAuth(Home) } />
              <Route exact path={ urls.users } component={ DoNotAuth(UsersPage) } />
              <Route exact path={ urls.dialogs } component={ DoNotAuth(DialogsPage) } />
              <Route exact path={ urls.chat } component={ DoNotAuth(ChatPage) } />
              <Route exact path={ urls.profile } component={ DoNotAuth(ProfilePage) } />

              <Route path={ urls.login } component={ Auth(LoginForm) } />
              <Route path={ urls.register } component={ Auth(RegisterForm) } />

              <Route path={ [urls.page404, "*"] } component={ Page404 } />
            </Switch>
          </div>
      </Beforeunload>
  );
};

const mapStateToProps = (state: AppStateType) => ({
    isAuth: UserSelectors.getUserIsAuth(state),
    userId: UserSelectors.getUserId(state)
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    { getAuthUserData })
(App);
