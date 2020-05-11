import React, { FC, RefObject } from "react";
import cn from "classnames";

import icons from "../../../../shared/icons";
import showConfirm from "../../../../shared/showConfirm";
import { IMessage } from "../../../../interfaces/dialog";
import { getTimeMessage } from "../../../../shared/helpres";
import "./style.scss";

type PropsType = {
    message: IMessage,
    userId: string,
    scrollToRef: RefObject<HTMLDivElement> | null,
    onDelete: (messageId: string) => void,
    onEdit: (messageId: string, messageText: string) => void
}

const Message: FC<PropsType> = (
    {
        message,
        userId,
        scrollToRef,
        onDelete,
        onEdit
    }) => {

    let self = userId === message.author._id;
    const name = self ? "You" : message.author.firstName;

    return (
        <div
            className={ cn(`message mt-1 ${ message.message }`, { "message--self": self }) }
            ref={ scrollToRef }
        >
            <div className="message__inside-wrapper">
                <time className="message__time">{ getTimeMessage(message.createdAt!) }</time>
                <p className="message__author-name">
                    { name }
                </p>
                <div className="message__box ">
                    <p className="message__text">{ message.message }</p>
                </div>
                { self &&
                    <>
                        <icons.CloseCircleOutlined
                            onClick={ () =>
                                showConfirm(
                                    onDelete.bind(null, message._id),
                                    "Are you sure you want to delete this message?"
                                )
                            }
                            className="message__delete-message"
                        />
                        <icons.EditOutlined onClick={ onEdit.bind(null, message._id, message.message) } />
                        { message.unread && <span className="message__message-status" /> }
                    </>
                }
                { message.isChanged && <span className="message__message-edited" >edited</span> }
            </div>
        </div>
    );
}


export default Message;