import React, { FC } from "react";
import { List, Pagination, Button, Tooltip } from "antd";

import { UserAvatar, LikeDislike, Comments } from "../../index";

import "./style.scss";

import { countOfComments } from "../../../shared/commentsMethods";
import { getReactions } from "../../../shared/reactionMethods";
import { getTimeMessage } from "../../../shared/helpres";
import { IBlog, BlogPagination } from "../../../interfaces/blog";
import { SetStateType } from "../../../interfaces/common";
import icons from "../../../shared/icons";
import cn from "classnames";

type Props = {
    blogs: Array<IBlog>,
    selfId: string,
    parentPage: "UserInfoPage" | "ProfilePage"
    totalBlogsCount: number,
    pagination: BlogPagination,
    visibleBlogId: string,
    setVisibleBlogId: SetStateType<string>
    deleteBlog: (blogId: string) => void,
    setBlogPage: (page: number) => void,
}

const BlogList: FC<Props> = (
    {
        blogs,
        selfId,
        parentPage,
        pagination,
        totalBlogsCount,
        visibleBlogId,
        setVisibleBlogId,
        deleteBlog,
        setBlogPage,
    }) => {

    const isEditMode = parentPage === "ProfilePage";

    return (
        <div className="blog-list grey-border card-hover" >
            <List
                itemLayout="vertical"
                size="large"
                dataSource={ blogs }
                footer={
                    <Pagination
                        total={ totalBlogsCount }
                        defaultPageSize={ pagination.limit }
                        pageSize={ pagination.limit }
                        onChange={ setBlogPage }
                        current={ pagination.currentPage }
                    />
                }
                renderItem={ blog => {
                    const { avatar, firstName, secondName, isOnline } = blog.author;
                    const [likes, dislikes, likeAction, dislikeAction] = getReactions(blog.reactions, selfId);

                    const numberOfComments = countOfComments(blog.comments);
                    const isVisibleComments = visibleBlogId === blog._id;

                    const setVisibleComment = () => {
                        isVisibleComments
                            ? setVisibleBlogId("")
                            : setVisibleBlogId(blog._id);
                    };

                    return (
                        <>
                            <List.Item
                                key={ blog.title }
                                className="blog-item"
                                actions={[
                                    <LikeDislike
                                        likeAction={ likeAction }
                                        dislikeAction={ dislikeAction }
                                        likes={ likes }
                                        dislikes={ dislikes }
                                        author={ selfId }
                                        itemName="blogId"
                                        itemId={ blog._id }
                                    />,
                                    <div
                                        onClick={ setVisibleComment }
                                        className={ cn({ "is-active": isVisibleComments }) }
                                        key="comments"
                                    >
                                        <icons.MessageOutlined />&nbsp;
                                        { numberOfComments }
                                    </div>,
                                    <Tooltip title="Delete blog" >
                                        { isEditMode &&
                                            <Button
                                                onClick={ deleteBlog.bind(null, blog._id) }
                                                type="danger"
                                                key="delete btn"
                                                size="small"
                                            >
                                                <icons.CloseCircleOutlined />
                                            </Button>
                                        }
                                    </Tooltip>
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={ <UserAvatar avatar={ avatar } status={ isOnline } /> }
                                    title={
                                        <div className="blog-item__title" >
                                            <span>{ `${ secondName } ${ firstName }` }</span>
                                            <span className="blog-item__time" >{ getTimeMessage(blog.createdAt!) }</span>
                                        </div>
                                    }
                                    description={ blog.title }
                                />
                                { blog.description }
                            </List.Item>
                            { isVisibleComments &&
                                <Comments blogId={ blog._id } commentList={ blog.comments } />
                            }
                        </>
                    )
                }}
            />
        </div>
    )
}

export default BlogList;