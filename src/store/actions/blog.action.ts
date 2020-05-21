import { ThunkAction, ThunkDispatch } from "redux-thunk";

import * as blogTypes from "../types/blogTypes";
import { BlogAPI, ReactionAPI } from "../../apiServices";
import { AppStateType, InferActionsTypes } from "../reducers";

import { ReactionType, ReactionFromDB } from "../../interfaces/reaction";
import { NewBlogData, IBlog, GetBlogsData } from "../../interfaces/blog";

export const blogActions = {
    createBlogAC: (payload: IBlog) => ({ type: blogTypes.CREATE_BLOG, payload } as const),
    getBlogsAC: (payload: Array<IBlog>) => ({ type: blogTypes.GET_BLOGS, payload } as const),
    setTotalBlogsCountAC: (payload: number) => ({ type: blogTypes.SET_TOTAL_BLOGS_COUNT, payload } as const),
    setBlogPageAC: (payload: number) => ({ type: blogTypes.SET_BLOG_PAGE, payload } as const),
    createReactionAC: (payload: ReactionFromDB) => ({ type: blogTypes.INCR_BLOG_REACTIONS, payload } as const),
    remoteReactionAC: (payload: ReactionFromDB) => ({ type: blogTypes.DECR_BLOG_REACTIONS, payload } as const),
};


type ThunkActionType<T> = ThunkAction<Promise<T>, AppStateType, unknown, InferActionsTypes<typeof blogActions>>;
export type ThunkDispatchBlogsType = ThunkDispatch<AppStateType, unknown, InferActionsTypes<typeof blogActions>>;

export const createBlog = (newData: NewBlogData): ThunkActionType<void> => async dispatch => {
   const response = await BlogAPI.createBlog(newData);
   const { success, data } = response.data;

   if(success) {
       dispatch(blogActions.createBlogAC(data));
   }
};

export const getBlogs = (newData: GetBlogsData): ThunkActionType<void> => async dispatch => {
   const response = await BlogAPI.getBlogs(newData);
   const { data: { blogs, totalCount }, success } = response.data;

   if(success) {
       dispatch(blogActions.getBlogsAC(blogs));
       !!totalCount.length && dispatch(blogActions.setTotalBlogsCountAC(totalCount[0]));
   }
};

export const createReaction = (newData: ReactionType): ThunkActionType<void> => async dispatch => {
    const response = await ReactionAPI.createReaction(newData);
    const { success, data } = response.data;

    if(success) {
        dispatch(blogActions.createReactionAC(data))
    }
};

export const remoteReaction = (newData: ReactionType): ThunkActionType<void> => async dispatch => {
    const response = await ReactionAPI.remoteReaction(newData);
    const { success, data } = response.data;

    if(success) {
        dispatch(blogActions.remoteReactionAC(data))
    }
};

