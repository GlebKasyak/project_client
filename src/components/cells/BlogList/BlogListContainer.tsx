import React, { FC, useState, useEffect } from "react";
import { connect } from "react-redux";

import BlogList from "./BlogList";
import EmptyComponent from "../../atoms/EmptyComponent/EmptyComponent";

import { IBlog, BlogPagination, GetBlogsData } from "../../../interfaces/blog";
import {
    blogActions,
    deleteBlog,
    getBlogs,
    ThunkDispatchBlogsType
} from "../../../store/actions/blog.action";
import { AppStateType } from "../../../store/reducers";
import { BlogSelectors } from "../../../store/selectors";

type MapStateToProps = {
    blogs: Array<IBlog>,
    totalBlogsCount: number,
    pagination: BlogPagination
}

type MapDispatchToProps = {
    getBlogs: (data: GetBlogsData) => void,
    deleteBlog: (blogId: string) => void,
    setBlogPage: (page: number) => void
}

type OwnProps = {
    selfId: string,
    userId: string,
    parentPage: "UserInfoPage" | "ProfilePage"
}

type Props = MapStateToProps & MapDispatchToProps & OwnProps;

const BlogListContainer: FC<Props> = (
    {
        blogs,
        selfId,
        userId,
        parentPage,
        pagination,
        totalBlogsCount,
        getBlogs,
        deleteBlog,
        setBlogPage
    }) => {
    const [visibleBlogId, setVisibleBlogId] = useState("");

    useEffect(() => {
        if(!!userId) {
            getBlogs({ ...pagination, userId })
        }
    }, [userId, getBlogs, pagination]);

    return !!blogs.length
        ? <BlogList
            blogs={ blogs }
            selfId={ selfId }
            parentPage={ parentPage }
            pagination={ pagination }
            totalBlogsCount={ totalBlogsCount }
            visibleBlogId={ visibleBlogId }
            setVisibleBlogId={ setVisibleBlogId }
            setBlogPage={ setBlogPage }
            deleteBlog={ deleteBlog }
        />
        : <EmptyComponent description="The story is empty" />
}

const mapDispatchToProps = (dispatch: ThunkDispatchBlogsType) => ({
    getBlogs: (data: GetBlogsData) => dispatch(getBlogs(data)),
    deleteBlog: (blogId: string) => dispatch(deleteBlog(blogId)),
    setBlogPage: (page: number) => dispatch(blogActions.setBlogPageAC(page)),
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