import { ChangeEvent, Dispatch, SetStateAction, MouseEvent, KeyboardEvent, FormEvent } from "react";
import { ValidationRule } from "antd/lib/form";

export interface ResponseType {
    message?: string,
    success: boolean,
    err?: Error,
}

export namespace Handlers {
    type SubmitType = (e: SubmitTypes) => Promise<void> | void;
    type ChangeType = (e: ChangeEvent<HTMLInputElement>) => void;
    type ClickType = (e: MouseEvent<HTMLButtonElement>) => void;

    type SubmitTypes =
        | FormEvent<HTMLFormElement>
        | KeyboardEvent<HTMLTextAreaElement>
        | MouseEvent<HTMLElement, MouseEvent>

    type InputTextAreaChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
}

export type SetStateType<T> = Dispatch<SetStateAction<T>>;


export type FieldsType = {
    labelField: string,
    nameField: string,
    type?: string,
    rules: [ValidationRule],
    iconType: string,
    initialValue?: string
};

export interface IDbDocumentType {
    _id: string,
    createdAt?: string,
    updatedAt?: string
}

export type ScrollDataType = {
    userId: string,
    limit: number,
    page: number,
    filter?: string,
    value?: string
};

export interface IResponseData<T> extends ResponseType {
    data: T
}
