import React, { FC } from "react";
import cn from "classnames";
import { List, Pagination, Button, Tooltip } from "antd";

import UserAvatar from "../../atoms/UserAvatar/UserAvatar";
import "./style.scss";

import { getReactions } from "../../../shared/reactionMethods";
import { getTimeMessage } from "../../../shared/helpres";
import { IBlog, BlogPagination } from "../../../interfaces/blog";
import { HandleClickType } from "./BlogListContainer";
import icons from "../../../shared/icons";

type Props = {
    blogs: Array<IBlog>,
    selfId: string,
    parentPage: "UserInfoPage" | "ProfilePage"
    totalBlogsCount: number,
    pagination: BlogPagination,
    onClick: HandleClickType,
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
        onClick,
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

                    return (
                        <List.Item
                            key={ blog.title }
                            className="blog-item"
                            actions={[
                                <div
                                    onClick={ onClick.bind(null, blog._id, true, likeAction) }
                                    className={ cn({ "is-active": likeAction }) }
                                    key="likes"
                                >
                                    <icons.LikeOutlined />
                                    { likes }
                                </div>,
                                <div
                                    onClick={ onClick.bind(null, blog._id, false, dislikeAction) }
                                    className={ cn({ "is-active": dislikeAction }) }
                                    key="dislikes"
                                >
                                    <icons.DislikeOutlined />
                                    { dislikes }
                                </div>,
                                <div key="comments" >
                                    <icons.MessageOutlined />
                                    2
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
                    )
                }}
            />
        </div>
    )
}

export default BlogList;