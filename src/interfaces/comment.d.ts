import { IDbDocumentType } from "./common";
import { ReactionFromDB } from "./reaction";
import { IUser } from "./user";


export interface IComment extends IDbDocumentType {
    writer: IUser,
    content: string,
    blogId: string,
    responseTo?: string,
    reactions: Array<ReactionFromDB>
}

export type PostCommentDataType = {
    writer: string,
    responseTo?: string,
    blogId: string,
    content: string
}







