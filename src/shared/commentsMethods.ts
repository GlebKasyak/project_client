import { IBlog } from "../interfaces/blog";
import { IComment } from "../interfaces/comment";

type AddCommentType = (blog: IBlog, blogId: string, comment: Array<IComment>) => IBlog

export const getBlogComments: AddCommentType = (blog, blogId, comments) => {
    if(blog._id === blogId) {
        return { ...blog, comments }
    }

    return blog;
};


export const countOfComments = (commentList: IComment[], condition?: string) => {
    let commentNumber = 0;

    commentList.forEach(comment => {
        if(comment.responseTo === condition) {
            commentNumber++;
        }
    });

    return commentNumber;
};