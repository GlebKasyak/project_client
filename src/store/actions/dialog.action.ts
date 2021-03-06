import { ThunkAction, ThunkDispatch } from "redux-thunk";

import * as dialogTypes from "../types/dialogTypes";
import { DialogAPI } from "../../apiServices";
import { AppStateType, InferActionsTypes } from "../reducers";

import { ResponseType, ScrollDataType, IResponseData } from "../../interfaces/common";
import { IDialog } from "../../interfaces/dialog";

export const dialogActions = {
    getDialogsByIdAC: (payload: Array<IDialog>) => ({ type: dialogTypes.GET_DIALOGS_BY_ID, payload } as const),
    removeDialogsByIdAC: (payload: string) => ({ type: dialogTypes.REMOVE_DIALOGS_BY_ID, payload } as const),
    searchDialogsAC: (payload: Array<IDialog>) => ({ type: dialogTypes.SEARCH_DIALOGS, payload } as const),
    clearDialogListAC: () => ({ type: dialogTypes.CLEAR_DIALOG_LIST } as const),
};


type ThunkActionType<T> = ThunkAction<Promise<T>, AppStateType, unknown, InferActionsTypes<typeof dialogActions>>;
export type ThunkDispatchDialogsType = ThunkDispatch<AppStateType, unknown, InferActionsTypes<typeof dialogActions>>;

export const getDialogsById = (scrollData: ScrollDataType): ThunkActionType<IResponseData<Array<IDialog>>> => async dispatch => {
    try {
        const response = await DialogAPI.getDialogsById(scrollData);

        const { success, data } = response.data;

        if(success) {
            dispatch(dialogActions.getDialogsByIdAC(data));
            return { success, data };
        }
    } catch (err) {
        return err;
    }
};

export const deleteDialogsById = (dialogId: string): ThunkActionType<void> => async dispatch => {
    const response = await DialogAPI.removeDialogByID(dialogId);

    if(response.data.success) dispatch(dialogActions.removeDialogsByIdAC(dialogId));
};

export const searchDialogs = (value: string, userId: string): ThunkActionType<ResponseType> => async dispatch => {
   try {
       const response = await DialogAPI.searchDialogs(value, userId);

       const { success, data, message } = response.data;

       if(success) {
           dispatch(dialogActions.clearDialogListAC());
           dispatch(dialogActions.searchDialogsAC(data));

           return { success, message }
       }
   } catch (err) {
       dispatch(dialogActions.clearDialogListAC());
       return err;
   }
}