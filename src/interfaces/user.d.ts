import { IDbDocumentType } from "./common";

export interface UserState {
    user: IUser,
    users: Array<IUser>
}

export interface IUser extends IDbDocumentType{
    firstName: string,
    secondName: string,
    email: string,
    avatar: string,
    password?: string,
    isAuth?: boolean
    isOnline: boolean,
    status: string,
    friends: Array<this | string>
}

export type ChangedUserInfoType = Pick<IUser, "firstName" | "secondName">;

export type LoginDataType = {
    email: string,
    password: string,
    captcha?: string
    count: number
}

export type RegisterDataType = {
    firstName: string,
    secondName: string,
    email: string,
    password: string,
}

