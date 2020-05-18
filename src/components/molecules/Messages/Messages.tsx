import React, { FC, RefObject } from "react";

import Message from "./Message/Message";

import { IMessage, MessageTypes } from "../../../interfaces/dialog";

type PropsType = {
    scrollToLastMessageRef: RefObject<HTMLDivElement>,
    messages: Array<IMessage>,
    userId: string,
    thtLastMessageId: string
    onDelete: (messageId: string, type: MessageTypes) => void,
    onEdit: (messageId: string, messageText: string) => void,
};

const Messages: FC<PropsType> = (
    {
        scrollToLastMessageRef,
        messages,
        userId,
        thtLastMessageId,
        onDelete,
        onEdit
    }) => (
    <div className="messages">
        { messages.map((message: IMessage) =>
            <Message
                key={ message._id }
                message={ message }
                userId={ userId }
                scrollToRef={ message._id === thtLastMessageId ? scrollToLastMessageRef: null }
                onDelete={ onDelete }
                onEdit={ onEdit }
            />
        ) }
    </div>
)

export default Messages;