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

export interface IDialog extends IDbDocumentType {
    author: IUser,
    partner: IUser,
    messages?: Array<IMessage>,
    lastMessage: IMessage
}

export enum EnumTypeOfMessage {
    text = "text",
    image = "image",
    audio = "audio"
}

export type MessageTypes = EnumTypeOfMessage.text | EnumTypeOfMessage.image | EnumTypeOfMessage.audio;

export interface IMessage extends IDbDocumentType {
    message: string,
    author: IUser,
    dialog: string,
    isChanged: boolean,
    unread: boolean,
    type: MessageTypes
}

export interface IResponseDialogsData extends ResponseType {
    dialogs: Array<IDialog>
}