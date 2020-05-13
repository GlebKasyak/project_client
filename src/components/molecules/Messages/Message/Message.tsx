import React, { FC, RefObject } from "react";
import cn from "classnames";

import MessageImage from "./MessageImage/MessageImage";
import MessageAudioContainer from "./MessageAudio/MessageAudioContainer";

import icons from "../../../../shared/icons";
import { ENV } from "../../../../assets/constants";
import showConfirm from "../../../../shared/showConfirm";
import { IMessage, MessageTypes, EnumTypeOfMessage } from "../../../../interfaces/dialog";
import { getTimeMessage } from "../../../../shared/helpres";
import "./style.scss";

type PropsType = {
    message: IMessage,
    userId: string,
    scrollToRef: RefObject<HTMLDivElement> | null,
    onDelete: (messageId: string, type: MessageTypes) => void,
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
    const { author, createdAt, _id, unread, type, isChanged } = message;

    let self = userId === author._id;
    const name = self ? "You" : author.firstName;

    return (
        <div
            className={ cn(`message mt-1 ${ message.message }`, { "message--self": self }) }
            ref={ scrollToRef }
        >
            <div className="message__inside-wrapper">
                <time className="message__time">{ getTimeMessage(createdAt!) }</time>
                <p className="message__author-name">
                    { name }
                </p>
                <div className={ `message__box message__box--${ type }` } >
                    { setWrapperForFile(type, message.message) }
                </div>
                { self &&
                    <>
                        <icons.CloseCircleOutlined
                            onClick={ () =>
                                showConfirm(
                                    onDelete.bind(null, _id, type),
                                    "Are you sure you want to delete this message?"
                                )
                            }
                            className="message__delete-message"
                        />
                        { type === EnumTypeOfMessage.text &&
                            <icons.EditOutlined
                                onClick={ onEdit.bind(null, _id, message.message) }
                            />
                        }
                        { unread && <span className="message__message-status" /> }
                    </>
                }
                { isChanged && <span className="message__message-edited" >edited</span> }
            </div>
        </div>
    );
}

const setWrapperForFile = (type: MessageTypes, message: string) => {
    switch(type) {
        case EnumTypeOfMessage.image:
            return <MessageImage message={ message } type={ type } />
        case EnumTypeOfMessage.audio:
            // return <audio src={`${ ENV.SERVER_URL }/${ message }`} className="message__audio" controls />;
            return <MessageAudioContainer audio={ `${ ENV.SERVER_URL }/${ message }` } />;
        case EnumTypeOfMessage.text:
            return <p className="message__text">{ message }</p>;
    }
};


export default Message;