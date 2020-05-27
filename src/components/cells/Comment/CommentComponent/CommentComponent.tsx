import React, { FC } from "react";
import moment from "moment";
import { Comment, Tooltip, Avatar } from "antd";

import LikeDislike from "../../../molecules/LikeDislike/LikeDislike";
import "./style.scss";

import icons from "../../../../shared/icons";
import { ENV } from "../../../../shared/constants";
import { IComment } from "../../../../interfaces/comment";
import { getReactions } from "../../../../shared/reactionMethods";
import { timeFromNow } from "../../../../shared/helpres";

type Props = {
    comment: IComment,
    userId: string,
    onClick: () => void,
    deleteComment: (commentId: string, blogId: string) => void
};

const CommentComponent: FC<Props> = (
    {
        comment,
        userId,
        onClick,
        deleteComment
    }) => {
    const { _id, content, createdAt, reactions, writer, blogId } = comment;
    const [likes, dislikes, likeAction, dislikeAction] = getReactions(reactions, userId);

    return (
        <Comment
            className="comment"
            actions={[
                <LikeDislike
                    likes={ likes }
                    likeAction={ likeAction }
                    dislikes={ dislikes }
                    dislikeAction={ dislikeAction }
                    author={ userId }
                    itemId={ _id }
                    itemName="commentId"
                />,
                <span onClick={ onClick } className="comment__replay-to" >Reply to</span>
            ]}
            author={
                <div className="comment__name" >
                    <span>{ writer.firstName }</span>
                    { writer._id === userId &&
                        <icons.CloseOutlined
                            onClick={ deleteComment.bind(null, _id, blogId) }
                            className="comment__delete-btn"
                        />
                    }
                </div>
            }
            avatar={ <Avatar src={ `${ ENV.SERVER_URL }/${ writer.avatar }` } alt={ writer.firstName } /> }
            content={ <p className="comment__content" >{ content }</p> }
            datetime={
                <Tooltip title={ moment(createdAt).format("YYYY-MM-DD HH:mm:ss") }>
                    <time className="comment__time" >{ timeFromNow(createdAt!) }</time>
                </Tooltip>
            }
        />
    )
};

export default CommentComponent;