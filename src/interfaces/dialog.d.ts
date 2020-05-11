import { IDbDocumentType, ResponseType } from "./common";
import { IUser } from "./user";

export interface CreateDialogDataType {
    author: string,
    partner: string,
}

export interface DialogState {
    dialogs: Array<IDialog>,
    ifSearching: boolean
}

export type LastMessageType = {
    message: string,
    avatar: string,
    name: string
}

export interface IDialog extends IDbDocumentType {
    author: IUser,
    partner: IUser,
    messages?: Array<IMessage>,
    lastMessage: LastMessageType
}

export interface IMessage extends IDbDocumentType {
    message: string,
    author: IUser,
    dialog: string,
    isChanged: boolean,
    unread: boolean
}

export interface IResponseDialogsData extends ResponseType {
    dialogs?: Array<IDialog>
}