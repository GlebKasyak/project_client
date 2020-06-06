import { useState, useEffect } from "react";

import { IComment } from "../interfaces/comment";

type UseCommentListType = [Array<IComment>, Array<IComment>];

export const useCommentList = (commentList: Array<IComment>, parentCommentId?: string): UseCommentListType => {
    const [currentCommentList, setCurrentCommentList] = useState<Array<IComment>>([]);
    const [nextCommentList, setNextCommentList] = useState<Array<IComment>>([]);

    useEffect(() => {
        commentList.map(comment => {
            if(comment.responseTo === parentCommentId) {
                setCurrentCommentList(prevState => prevState.concat(comment))
            } else {
                setNextCommentList(prevState => prevState.concat(comment))
            }

            return comment;
        });
    }, [commentList, parentCommentId]);

    return [currentCommentList, nextCommentList];
};
