import React, { useEffect, FC } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Beforeunload } from 'react-beforeunload';

import { Home, UsersPage, DialogsPage, ChatPage, ProfilePage, UserInfoPage, FriendsPage, Page404 } from "./pages";
import { NavBar } from "./components";
import { LoginForm, RegisterForm } from "./modules";

import socket from "./socketServices";
import { AppStateType } from "./store/reducers";
import { UserSelectors } from "./store/selectors";
import { Auth, DoNotAuth } from "./hoc";
import { storageKeys } from "./shared/constants/commons";
import { PageUrls } from "./shared/constants";
import { getAuthUserData, userActions } from "./store/actions/user.action";
import "./assets/styles/app.scss";

type MapStateToPropsType = {
    isAuth?: boolean,
    userId: string
}

type MapDispatchToPropsType = {
    getAuthUserData: () => void,
    getOnlineStatus: (data: boolean) => void
}

type PropType = MapStateToPropsType & MapDispatchToPropsType;


let App: FC<PropType> = ({ isAuth, userId, getAuthUserData, getOnlineStatus }) => {
  useEffect(() => {
    const authData = localStorage.getItem(storageKeys.isAuth);

    if(!!authData && JSON.parse(authData)) {
        getAuthUserData();
    }

    if(isAuth) {
        socket.setOnlineStatus({ userId, isOnline: true });
        socket.getOnlineStatus(getOnlineStatus);
    }
  }, [isAuth, getAuthUserData, userId, getOnlineStatus]);

  return (
      <Beforeunload onBeforeunload={ () => userId && socket.setOnlineStatus({ userId, isOnline: false }) } >
          <div className={"app " + (isAuth ? "app--active" : "app--not-active")} >
            <NavBar />
            <Switch>
              <Route exact path={ PageUrls.home } component={ DoNotAuth(Home) } />
              <Route exact path={ PageUrls.users } component={ DoNotAuth(UsersPage) } />
              <Route exact path={ PageUrls.dialogs } component={ DoNotAuth(DialogsPage) } />
              <Route exact path={ PageUrls.chat } component={ DoNotAuth(ChatPage) } />
              <Route exact path={ PageUrls.profile } component={ DoNotAuth(ProfilePage) } />
              <Route exact path={ PageUrls.userInfo } component={ DoNotAuth(UserInfoPage) } />
              <Route exact path={ PageUrls.friends } component={ DoNotAuth(FriendsPage) } />

              <Route path={ PageUrls.login } component={ Auth(LoginForm) } />
              <Route path={ PageUrls.register } component={ Auth(RegisterForm) } />

              <Route path={ [PageUrls.page404, "*"] } component={ Page404 } />
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
    { getAuthUserData, getOnlineStatus: userActions.getOnlineStatusAC })
(App);
