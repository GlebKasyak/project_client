import React, { FC, useEffect } from "react";
import { connect } from "react-redux";

import BlogList from "./BlogList";
import EmptyComponent from "../../atoms/EmptyComponent/EmptyComponent";

import { IBlog, BlogPagination, GetBlogsData } from "../../../interfaces/blog";
import { ReactionType } from "../../../interfaces/reaction";
import {
    blogActions,
    createReaction,
    getBlogs,
    remoteReaction,
    ThunkDispatchBlogsType
} from "../../../store/actions/blog.action";
import { AppStateType } from "../../../store/reducers";
import { BlogSelectors } from "../../../store/selectors";

export type HandleClickType = (blogId: string, reaction: boolean, action: boolean) => void

type MapStateToProps = {
    blogs: Array<IBlog>,
    totalBlogsCount: number,
    pagination: BlogPagination
}

type MapDispatchToProps = {
    getBlogs: (data: GetBlogsData) => void,
    setBlogPage: (page: number) => void,
    createReaction: (data: ReactionType) => void,
    remoteReaction: (data: ReactionType) => void
}

type OwnProps = {
    selfId: string,
    userId: string,
}

type Props = MapStateToProps & MapDispatchToProps & OwnProps;

const BlogListContainer: FC<Props> = (
    {
        blogs,
        selfId,
        userId,
        pagination,
        totalBlogsCount,
        getBlogs,
        setBlogPage,
        createReaction,
        remoteReaction
    }) => {

    const handleClick: HandleClickType = (blogId, reaction, action) => {
        action
            ? remoteReaction({ author: selfId, blogId, reaction })
            : createReaction({ author: selfId, blogId, reaction })
    };

    useEffect(() => {
        if(!!userId) {
            getBlogs({ ...pagination, userId })
        }
    }, [userId, getBlogs, pagination]);

    return !!blogs.length
        ? <BlogList
            blogs={ blogs }
            selfId={ selfId }
            pagination={ pagination }
            totalBlogsCount={ totalBlogsCount }
            setBlogPage={ setBlogPage }
            onClick={ handleClick }
        />
        : <EmptyComponent description="The story is empty" />
}

const mapDispatchToProps = (dispatch: ThunkDispatchBlogsType) => ({
    getBlogs: (data: GetBlogsData) => dispatch(getBlogs(data)),
    setBlogPage: (page: number) => dispatch(blogActions.setBlogPageAC(page)),
    createReaction: (data: ReactionType) => dispatch(createReaction(data)),
    remoteReaction: (data: ReactionType) => dispatch(remoteReaction(data))
});

const mapStateToProps = (state: AppStateType) => ({
    blogs: BlogSelectors.getBlogs(state),
    totalBlogsCount: BlogSelectors.getTotalCount(state),
    pagination: BlogSelectors.getPagination(state),
});

export default connect<MapStateToProps, MapDispatchToProps, OwnProps, AppStateType>(
    mapStateToProps,
    mapDispatchToProps
)(BlogListContainer);