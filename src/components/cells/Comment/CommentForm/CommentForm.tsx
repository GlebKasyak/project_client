import React, { FC } from "react";
import { Button, Input } from "antd";
import { Picker, BaseEmoji } from "emoji-mart";

import "./style.scss";

import { Handlers } from "../../../../interfaces/common";

type Props = {
    value: string,
    onChange: Handlers.InputTextAreaChange,
    onSubmit: Handlers.SubmitType
    onClose: () => void,
    openEmoji?: () => void,
    emojiPickerVisible?: boolean,
    onSelect?: (emoji: BaseEmoji) => void
}

const CommentForm: FC<Props> = ({
        value,
        onChange,
        onSubmit,
        onClose,
        openEmoji,
        emojiPickerVisible,
        onSelect
    })=> (
    <form className="comment-form " onSubmit={ onSubmit } >
        <Input.TextArea
            onChange={ onChange }
            value={ value }
            onPressEnter={ onSubmit }
            rows={2}
            autoFocus
            placeholder="Leave a comment"
            className="comment-form__textarea"
        />
        <div className="comment-form__btn-wrapper">
            <Button
                onClick={ onClose }
                className="comment-form__cancel"
            >
                Cancel
            </Button>
            { emojiPickerVisible &&
                <div className="comment-form__emoji-picker">
                    <Picker set="apple" onSelect={ onSelect } />
                </div>
            }
            <Button
                onClick={ openEmoji }
                icon="smile"
                type="link"
                className="comment-form__smile-btn"
            />
            <Button
                disabled={ !value }
                htmlType="submit"
                className="comment-form__button"
            >
                Replay
            </Button>
        </div>
    </form>
);

export default CommentForm;