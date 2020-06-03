import React, { useState } from "react";
import { connect } from "react-redux";

import CommentForm from "../CommentForm/CommentFormContainer";
import CommentComponent from "../CommentComponent/CommentComponent";

import { addComment, deleteComment } from "../../../../store/actions/blog.action";
import { AppStateType } from "../../../../store/reducers";
import { IComment, PostCommentDataType } from "../../../../interfaces/comment";
import { UserSelectors } from "../../../../store/selectors";

type MapStateToProps = {
    userId: string
};

type MapDispatchToProps = {
    addComment: (data: PostCommentDataType) => void,
    deleteComment: (commentId: string, blogId: string) => void
}

type OwnPropsType = {
    comment: IComment,
    blogId: string,
}

type SingleCommentPropsType = MapStateToProps & MapDispatchToProps & OwnPropsType;

const SingleComment: React.FC<SingleCommentPropsType> = (
    {
        comment,
        blogId,
        userId,
        addComment,
        deleteComment
    }) => {
    const [openReply, setOpenReply] = useState(false);

    return (
        <>
            <CommentComponent
                comment={ comment }
                userId={ userId }
                onClick={ () => setOpenReply(!openReply) }
                deleteComment={ deleteComment }
            />
            { openReply &&
                <CommentForm
                    writer={ userId }
                    blogId={ blogId }
                    responseTo={ comment._id }
                    addComment={ addComment }
                    onClose={ () => setOpenReply(false) }
                />
            }
        </>
    )
};

export default connect<MapStateToProps, MapDispatchToProps, OwnPropsType, AppStateType>(
    state => ({ userId: UserSelectors.getUserId(state) }),
    { addComment, deleteComment })
(SingleComment);