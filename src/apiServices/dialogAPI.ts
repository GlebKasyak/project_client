import axios from "axios";

import { TypesFileEnum, MainEndpoints } from "../assets/constants/api.contsnts";
import { ScrollDataType } from "../interfaces/common";
import { CreateDialogDataType } from "../interfaces/dialog";

class DialogAPI {
    static createDialog = (data: CreateDialogDataType) => axios.post(`${ MainEndpoints.dialog }`, data);

    static getDialogsById = (data: ScrollDataType) =>
        axios.get(`${ MainEndpoints.dialog }/${ JSON.stringify(data) }`);

    static removeDialogByID = (dialogId: string) => axios.delete(`${ MainEndpoints.dialog }/${ dialogId }`);

    static searchDialogs = (value: string, userId: string) =>
        axios.post(`${ MainEndpoints.dialog }/search`, { value, userId });

    static uploadFile = (type: TypesFileEnum.imageMessage | TypesFileEnum.audio, file: File | Blob) => {
        const formData = new FormData();
        formData.append(type, file, file.type);

        return axios.post(`${ MainEndpoints.dialog }/file`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    };
}

export default DialogAPI;