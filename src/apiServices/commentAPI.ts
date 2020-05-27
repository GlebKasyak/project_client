import axios from "axios";

import { MainEndpoints } from "../shared/constants/api.contsnts";
import { PostCommentDataType } from "../interfaces/comment";

export default class CommentAPI {
    static postComment = (data: PostCommentDataType) => axios.post(MainEndpoints.comment, data);

    static deleteComment = (commentId: string) =>
        axios.delete(`${ MainEndpoints.comment }/${ commentId }`);
}







