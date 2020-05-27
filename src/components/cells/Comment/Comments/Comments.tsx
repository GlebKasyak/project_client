import React, { FC, useState, Fragment }from "react";
import { connect } from "react-redux";

import CommentForm from "../CommentForm/CommentFormContainer";
import SingleComment from "../SingleComment/SingleComment";
import ReplyComment from "../ReplyComment/ReplyComment";
import Line from "../../../atoms/Line/Line";

import { PostCommentDataType, IComment } from "../../../../interfaces/comment";

import { addComment } from "../../../../store/actions/blog.action";
import { UserSelectors } from "../../../../store/selectors";
import { AppStateType } from "../../../../store/reducers";

type MapStateToProps = {
    userId: string
};

type MapDispatchToProps = {
    addComment: (data: PostCommentDataType) => void
};

type OwnProps = {
    blogId: string,
    commentList: Array<IComment>
};

type Props = MapStateToProps & MapDispatchToProps & OwnProps;

const Comments: FC<Props> = ({ userId, blogId,commentList,  addComment }) => {
    const [openReply, setOpenReply] = useState(false);

    return (
      <div>
          { !!commentList.length && commentList.map(comment =>
              (!comment.responseTo &&
                  <Fragment key={ comment._id }>
                      <SingleComment
                          comment={ comment }
                          blogId={ blogId }
                      />
                      <ReplyComment
                          commentList={ commentList }
                          parentCommentId={ comment._id }
                          blogId={ blogId }
                      />
                  </Fragment>

              )
          )}

          { openReply
              ? <CommentForm
                    blogId={ blogId }
                    writer={ userId }
                    onClose={ () => setOpenReply(false) }
                    addComment={ addComment }
              />
              : <Line children="Leave a comment" onClick={ () => setOpenReply(!openReply) } />
          }
      </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    userId: UserSelectors.getUserId(state)
});

export default connect<MapStateToProps, MapDispatchToProps, OwnProps, AppStateType>(
    mapStateToProps,
    { addComment }
)(Comments);