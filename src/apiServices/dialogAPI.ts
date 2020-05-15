import axios from "axios";

import { TypesFileEnum, DialogEndPoints } from "../assets/constants/api.contsnts";
import { ScrollDataType } from "../interfaces/common";
import { CreateDialogDataType } from "../interfaces/dialog";

export class DialogAPI {
    static createDialog = (data: CreateDialogDataType) => axios.post(DialogEndPoints.create, data);

    static getDialogsById = (data: ScrollDataType) =>
        axios.get(`${ DialogEndPoints.getDialogs }/${ JSON.stringify(data) }`);

    static removeDialogByID = (dialogId: string) => axios.delete(`${ DialogEndPoints.remove }/${ dialogId }`);

    static searchDialogs = (value: string, userId: string) =>
        axios.post(DialogEndPoints.search, { value, userId });

    static uploadFile = (type: TypesFileEnum.imageMessage | TypesFileEnum.audio, file: File | Blob) => {
        const formData = new FormData();
        formData.append(type, file);

        return axios.post(DialogEndPoints.uploadFile, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    };

}