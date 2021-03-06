import { ThunkAction, ThunkDispatch } from "redux-thunk";

import * as userTypes from "../types/userTypes";
import { UserAPI } from "../../apiServices";
import { AppStateType, InferActionsTypes } from "../reducers";
import { storageKeys } from "../../shared/constants/commons";
import { TypesFileEnum } from "../../shared/constants/api.contsnts";

import { ResponseType, ScrollDataType } from "../../interfaces/common";
import { IUser, LoginDataType, ChangedUserInfoType } from "../../interfaces/user";


export const userActions = {
    loginAC: (payload: IUser) => ({ type: userTypes.LOGIN_USER, payload } as const),
    logoutAC: () => ({ type: userTypes.LOGOUT_USER } as const),
    getUsersAC: (payload: Array<IUser>) => ({ type: userTypes.GET_USERS, payload } as const),
    uploadAvatarAC: (payload: string) => ({ type: userTypes.UPLOAD_AVATAR, payload } as const),
    removeUserAC: () => ({ type: userTypes.REMOVE_USER } as const),
    searchUserByEmailAC: (payload: Array<IUser>) => ({ type: userTypes.SEARCH_USER_BY_EMAIL, payload } as const),
    clearUsersListAC: () => ({ type: userTypes.CLEAR_USERS_LIST } as const),
    getOnlineStatusAC: (payload: boolean) => ({ type: userTypes.GET_ONLINE_STATUS, payload } as const),
    setUserStatusAC: (payload: string) => ({ type: userTypes.SET_USER_STATUS, payload } as const),
    getFriendsAC: (payload: Array<string>) => ({ type: userTypes.GET_FRIENDS, payload } as const),
    changeUserInfoAC: (payload: ChangedUserInfoType) => ({ type: userTypes.CHANGE_USER_INFO, payload } as const),
};


type ThunkActionType<T> = ThunkAction<Promise<T>, AppStateType, unknown, InferActionsTypes<typeof userActions>>;
export type ThunkDispatchUsersType = ThunkDispatch<AppStateType, unknown, InferActionsTypes<typeof userActions>>;


export const getAuthUserData = (): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.me();
    const { success, data } = response.data;

    if(success) dispatch(userActions.loginAC(data!));
};

export const login = (newData: LoginDataType): ThunkActionType<ResponseType> => async dispatch => {
    try {
        const response = await UserAPI.login(newData);

        const { success, data, message } = response.data;
        if(success) {
            localStorage.setItem(storageKeys.token, JSON.stringify({ token: data }));
            dispatch(getAuthUserData());

            return { success, message };
        }
    } catch (err) { return err }
};

export const logout = (): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.logout();

    const { success } = response.data;
    if(success) {
        localStorage.removeItem(storageKeys.isAuth);
        localStorage.removeItem(storageKeys.token);

        dispatch(userActions.logoutAC());
    }
};

export const getUsers = (newData: ScrollDataType): ThunkActionType<Array<IUser>> => async dispatch => {
    const response = await UserAPI.getUsers(newData);

    const { success, data } = response.data;
    if(success) dispatch(userActions.getUsersAC(data));

    return data;
};

export const uploadAvatar = (type: TypesFileEnum.avatar, file: File): ThunkActionType<boolean> => async dispatch => {
   try {
       const response = await UserAPI.uploadAvatar(type, file);

       const { success, data } = response.data;
       if(success) {
           dispatch(userActions.uploadAvatarAC(data));
           return success;
       }
   } catch (err) {
        return false;
   }
};

export const removeUser = (): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.removeUser();

    if(response.data.success) {
        localStorage.clear();
        dispatch(userActions.removeUserAC());
    }
};

export const searchUserByEmail = (value: string, userId: string): ThunkActionType<ResponseType> => async dispatch => {
   try {
       const response = await UserAPI.searchUserByEmail(value, userId);

       const { success, data, message } = response.data;
       if(success) {
           dispatch(userActions.searchUserByEmailAC([data]));
           return { success, message };
       }

   } catch(err) {
       dispatch(userActions.searchUserByEmailAC([]));
       return err;
   }
};

export const setUserStatus = (newStatus: string): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.setUserStatus(newStatus);

    const { success, data } = response.data;
    if(success) dispatch(userActions.setUserStatusAC(data.status))
}

export const changeUserInfo = (newData: ChangedUserInfoType): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.changeUserInfo(newData);

    const { success, data } = response.data;
    if(success) dispatch(userActions.changeUserInfoAC(data))
}