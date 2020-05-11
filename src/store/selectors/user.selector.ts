import { AppStateType } from "../reducers";


export class UserSelectors {
    static getUser = (state: AppStateType) => state.user.user;

    static getUserIsAuth = (state: AppStateType) => state.user.user.isAuth;

    static getUserId = (state: AppStateType) => state.user.user._id;

    static getUserStatus = (state: AppStateType) => state.user.user.isOnline;

    static getUsers = (state: AppStateType) => state.user.users;

}