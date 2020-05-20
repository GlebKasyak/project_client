import axios from "axios";

import { TypesFileEnum, MainEndpoints } from "../assets/constants/api.contsnts";
import { ScrollDataType } from "../interfaces/common";
import { LoginDataType, RegisterDataType, ChangedUserInfoType } from "../interfaces/user";

class UserAPI {
    static login = (data: LoginDataType) => axios.post(`${ MainEndpoints.users }/login`, data);

    static me = () => axios.get(`${ MainEndpoints.users }`);

    static register = (data: RegisterDataType) => axios.post(`${ MainEndpoints.users }`, data);

    static logout = () => axios.get(`${ MainEndpoints.users }/logout`);

    static getUsers = (data: ScrollDataType) =>
        axios.get(`${ MainEndpoints.users }/all/${ JSON.stringify(data) }`);

    static uploadAvatar = (type: TypesFileEnum.avatar, file: File) => {
        const formData = new FormData();
        formData.append(type, file, file.type);

        return axios.post(`${ MainEndpoints.users }/upload-avatar`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    };

    static removeUser = () => axios.delete(`${ MainEndpoints.users }`);

    static searchUserByEmail = (value: string, userId: string) =>
        axios.post(`${ MainEndpoints.users }/search`, { value, userId });

    static setUserStatus = (status: string) =>
        axios.post(`${ MainEndpoints.users }/user-status`, { status });

    static changeUserInfo = (data: ChangedUserInfoType) =>
        axios.post(`${ MainEndpoints.users }/new-user-data`, data);

    static getUserInfo = (userId: string) =>
        axios.get(`${ MainEndpoints.users }/user-info/${ userId }`);
}

export default UserAPI;