import { AppStateType } from "../reducers";

export class BlogSelectors {
    static getBlogs = (state: AppStateType) => state.blog.blogs;

    static getTotalCount = (state: AppStateType) => state.blog.totalBlogsCount;

    static getPagination = (state: AppStateType) => state.blog.pagination;
}