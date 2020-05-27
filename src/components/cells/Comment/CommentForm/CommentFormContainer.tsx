import React, { FC, useState } from "react";
import { BaseEmoji } from "emoji-mart";

import CommentForm from "./CommentForm";

import { Handlers } from "../../../../interfaces/common";
import { PostCommentDataType } from "../../../../interfaces/comment";

type Props = {
    blogId: string,
    responseTo?: string,
    writer: string,
    onClose: () => void,
    addComment: (data: PostCommentDataType) => void
}

const CommentFormContainer: FC<Props> = ({ blogId, writer, responseTo,  onClose, addComment }) => {
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const fetchData = async (data: PostCommentDataType) => {
        await addComment(data);

        setCommentValue("");
        onClose();
    };

    const handleSubmit: Handlers.SubmitType = e => {
        e.preventDefault();

        fetchData({ content: commentValue, blogId, writer, responseTo });
    };

    const handleSelect = (emoji: BaseEmoji) => setCommentValue(commentValue + emoji.native);

    const handleChange: Handlers.InputTextAreaChange = e => setCommentValue(e.target.value);

    const handleCloseReply = () => {
        onClose();
        setCommentValue("");
    };

    return <CommentForm
        value={ commentValue }
        emojiPickerVisible={ emojiPickerVisible }
        openEmoji={ () => setShowEmojiPicker(!emojiPickerVisible) }
        onSelect={ handleSelect }
        onClose={ handleCloseReply }
        onChange={ handleChange }
        onSubmit={ handleSubmit }
    />
}
export default CommentFormContainer;