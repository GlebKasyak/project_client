import React, { FC, useState } from "react";

import SingleComment from "../SingleComment/SingleComment";
import TextWithIcon from "../../../../components/atoms/TextWithIcon/TextWithIcon";
import "./style.scss";

import { countOfComments } from "../../../../shared/commentsMethods";
import { IComment } from "../../../../interfaces/comment";

type Props = {
    commentList: Array<IComment>,
    parentCommentId?: string,
    blogId: string
};

const ReplyComment: FC<Props> = ({ commentList, parentCommentId, blogId }) => {
    const [openReply, setOpenReply] = useState(false);

    const numberOfComments = countOfComments(commentList, parentCommentId);
    return (
        <div className="reply-comment">
            { !!numberOfComments &&
                <TextWithIcon
                    isOpen={ openReply }
                    onClick={ () => setOpenReply(!openReply) }
                    text={ `View ${ numberOfComments } more comment(s)` }
                    className="reply-comment__numbers"
                />
            }

            { openReply &&
                commentList.map((comment, index) => (
                    comment.responseTo === parentCommentId &&
                        <div className="reply-comment__comment-wrapper" key={ index } >
                            <SingleComment
                                comment={ comment }
                                blogId={ blogId }
                            />
                            <ReplyComment
                                commentList={ commentList }
                                parentCommentId={ comment._id }
                                blogId={ blogId }
                            />
                        </div>)
                )
            }
        </div>
    )
};

export default ReplyComment;