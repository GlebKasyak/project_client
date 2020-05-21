import { IDbDocumentType } from "./common";
import { ReactionFromDB } from "./reaction";
import { IUser } from "./user";

export type BlogState = {
    blogs: Array<IBlog>,
    pagination: BlogPagination,
    totalBlogsCount: number,
};

export type BlogPagination = {
    limit: number,
    currentPage: number
}

export type GetBlogsData = { userId: string } & BlogPagination;

export interface IBlog extends IDbDocumentType{
    author: IUser,
    title: string,
    description: string,
    reactions: Array<ReactionFromDB>
}

export type NewBlogData = {
    author: string,
    title: string,
    description: string
}

