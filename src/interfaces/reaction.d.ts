import { IDbDocumentType } from "./common";
import { IUser } from "./user";

export type ReactionType = {
    author: string | IUser,
    commentId?: string,
    blogId?: string,
    reaction: boolean
}

export type ReactionFromDB = ReactionType & IDbDocumentType;



