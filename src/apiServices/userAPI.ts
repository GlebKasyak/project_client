import axios from "axios";

import { TypesFileEnum, UsersEndPoints } from "../assets/constants/api.contsnts";
import { ScrollDataType } from "../interfaces/common";
import { LoginDataType, RegisterDataType, ChangedUserInfoType } from "../interfaces/user";

export class UserAPI {
    static login = (data: LoginDataType) => axios.post(UsersEndPoints.login, data);

    static me = () => axios.get(UsersEndPoints.me);

    static register = (data: RegisterDataType) => axios.post(UsersEndPoints.register, data);

    static logout = () => axios.get(UsersEndPoints.logout);

    static getUsers = (data: ScrollDataType) =>
        axios.get(`${ UsersEndPoints.all }/${ JSON.stringify(data) }`);

    static uploadAvatar = (type: TypesFileEnum.avatar, file: File) => {
        const formData = new FormData();
        formData.append(type, file);

        return axios.post(UsersEndPoints.uploadAvatar, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    };

    static removeUser = () => axios.delete(UsersEndPoints.remove);

    static searchUserByEmail = (value: string, userId: string) =>
        axios.post(UsersEndPoints.search, { value, userId });

    static setUserStatus = (status: string) =>
        axios.post(UsersEndPoints.status, { status });

    static changeUserInfo = (data: ChangedUserInfoType) =>
        axios.post(UsersEndPoints.newUserData, data);

    static getUserInfo = (userId: string) =>
        axios.get(`${ UsersEndPoints.userInfo }/${ userId }`)
}