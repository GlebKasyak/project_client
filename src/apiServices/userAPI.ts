import axios from "axios";

import { TypesFileEnum } from "../assets/constants/api.contsnts";
import { ScrollDataType } from "../interfaces/common";
import { LoginDataType, RegisterDataType, ChangedUserInfoType } from "../interfaces/user";

export class UserAPI {
    static login = (data: LoginDataType) => axios.post("/users/login", data);

    static me = () => axios.get("/users/");

    static register = (data: RegisterDataType) => axios.post("/users/", data);

    static logout = () => axios.get("/users/logout", );

    static getUsers = ({ userId, limit, page }: ScrollDataType) =>
        axios.get(`/users/all?userId=${ userId }&limit=${ limit }&page=${ page }`);

    static uploadAvatar = (type: TypesFileEnum.avatar, file: File) => {
        const formData = new FormData();
        formData.append(type, file);

        return axios.post("/users/upload-avatar", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    };

    static removeUser = () => axios.delete("/users/");

    static searchUserByEmail = (value: string, userId: string) =>
        axios.post("/users/search", { value, userId });

    static setUserStatus = (status: string) =>
        axios.post("/users/user-status", { status });

    static changeUserInfo = (data: ChangedUserInfoType) =>
        axios.post("/users/new-user-data", data)
}