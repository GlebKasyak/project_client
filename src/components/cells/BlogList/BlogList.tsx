import React, { FC } from "react";
import cn from "classnames";
import { List, Pagination } from "antd";

import UserAvatar from "../../atoms/UserAvatar/UserAvatar";
import "./style.scss";

import { getReactions } from "../../../shared/reactionMethods";
import { IBlog, BlogPagination } from "../../../interfaces/blog";
import { HandleClickType } from "./BlogListContainer";
import icons from "../../../shared/icons";

type Props = {
    blogs: Array<IBlog>,
    selfId: string,
    totalBlogsCount: number,
    pagination: BlogPagination,
    onClick: HandleClickType,
    setBlogPage: (page: number) => void,
}

const BlogList: FC<Props> = (
    {
        blogs,
        selfId,
        pagination,
        totalBlogsCount,
        onClick,
        setBlogPage,
    }) => {

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
                    />
                }
                renderItem={ blog => {
                    const { avatar, firstName, secondName, isOnline } = blog.author;
                    const [likes, dislikes, likeAction, dislikeAction] = getReactions(blog.reactions, selfId);

                    return (
                        <List.Item
                            key={ blog.title }
                            className="blog-list__item"
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
                                // <IconText icon={ icons.MessageOutlined } text="2" key="comments" />,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={ <UserAvatar avatar={ avatar } status={ isOnline } /> }
                                title={ <span>{ `${ secondName } ${ firstName }` }</span> }
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