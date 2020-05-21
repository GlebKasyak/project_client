import { Reducer } from "redux";

import * as blogTypes from "../types/blogTypes";
import { blogActions } from "../actions/blog.action";
import { BlogState } from "../../interfaces/blog";
import { exhaustiveCheck } from "../../shared/helpres";
import { incrBlogReaction, decrBlogReaction } from "../../shared/reactionMethods";
import { InferActionsTypes } from "./index";

const initialState: BlogState = {
    blogs: [],
    pagination: {
        limit: 2,
        currentPage: 1
    },
    totalBlogsCount: 0,
};

type ActionsTypes = InferActionsTypes<typeof blogActions>;

const reducer: Reducer<BlogState, ActionsTypes> = (state = initialState, action: ActionsTypes): BlogState => {
    switch (action.type) {
        case blogTypes.CREATE_BLOG:
            const { limit, currentPage } = state.pagination;
            const blogs = state.totalBlogsCount / currentPage < limit
                ? [...state.blogs, action.payload]
                : state.blogs;

            return {
                ...state,
                blogs,
                totalBlogsCount: state.totalBlogsCount + 1
            };
        case blogTypes.GET_BLOGS:
            return {
                ...state,
                blogs: action.payload
            };
        case blogTypes.SET_TOTAL_BLOGS_COUNT:
            return {
                ...state,
                totalBlogsCount: action.payload
            };
        case blogTypes.SET_BLOG_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.payload
                }
            };
        case blogTypes.INCR_BLOG_REACTIONS:
            return {
                ...state,
                blogs: state.blogs.map(blog => incrBlogReaction(blog, action.payload))
            };

        case blogTypes.DECR_BLOG_REACTIONS:
            return {
                ...state,
                blogs: state.blogs.map(blog => decrBlogReaction(blog, action.payload))
            };
        default:
            exhaustiveCheck(action);
            return state;
    }
};

export default reducer;