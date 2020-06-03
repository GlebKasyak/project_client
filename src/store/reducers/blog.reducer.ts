import { Reducer } from "redux";

import * as blogTypes from "../types/blogTypes";
import { blogActions } from "../actions/blog.action";
import { BlogState, IBlog } from "../../interfaces/blog";
import { IComment } from "../../interfaces/comment";
import { exhaustiveCheck } from "../../shared/helpres";
import { incrReaction, decrReaction } from "../../shared/reactionMethods";
import { getBlogComments } from "../../shared/commentsMethods";
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
                ? [action.payload, ...state.blogs]
                : state.blogs;

            return {
                ...state,
                blogs,
                totalBlogsCount: state.totalBlogsCount + 1,
                pagination: {
                    ...state.pagination,
                    currentPage: 1
                }
            };
        case blogTypes.DELETE_BLOG:
            return {
                ...state,
                blogs: state.blogs.filter(blog => blog._id !== action.payload),
                pagination: {
                    ...state.pagination,
                    currentPage: 1
                }
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
                blogs: state.blogs.map(blog => {
                    if(action.payload.blogId) {
                        return incrReaction("blogId", blog, action.payload) as IBlog
                    } else {
                        return {
                            ...blog,
                            comments: blog.comments.map(comment =>
                                incrReaction("commentId", comment, action.payload) as IComment
                            )
                        }
                    }
                })
            };
        case blogTypes.DECR_BLOG_REACTIONS:
            return {
                ...state,
                blogs: state.blogs.map(blog => {
                    if(action.payload.blogId) {
                        return decrReaction("blogId", blog, action.payload) as IBlog
                    } else {
                        return {
                            ...blog,
                            comments: blog.comments.map(comment =>
                                decrReaction("commentId", comment, action.payload) as IComment
                            )
                        }
                    }
                })
            };
        case blogTypes.GET_BLOG_COMMENTS:
            const { data, blogId } = action.payload;
            return {
                ...state,
                blogs: state.blogs.map(blog => getBlogComments(blog, blogId, data))
            }
        default:
            exhaustiveCheck(action);
            return state;
    }
};

export default reducer;