import React, { FC, UIEvent, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { BaseEmoji } from "emoji-mart";

import ChatPage from "./ChatPage";

import { getDataFromQueryUrl } from "../../shared/helpres";
import { UserSelectors } from "../../store/selectors";
import { AppStateType } from "../../store/reducers";

import socket from "../../socketServices";
import { Handlers } from "../../interfaces/common";
import { IUser } from "../../interfaces/user";
import { IMessage } from "../../interfaces/dialog";


type PropsType = {
    user: IUser
}

const ChatPageContainer: FC<PropsType> = ({ user }) => {
    const history = useHistory();
    const limit = 20;

    const scrollToStart = useRef<HTMLDivElement | null>(null);
    const scrollToLastMessageRef = useRef<HTMLDivElement | null>(null);

    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [typingMessage, setTypingMessage] = useState("");
    const [message, setMessage] = useState("");
    const [isSendMessage, setIsSendMessage] = useState(false);
    const [modifiedMessageData , setModifiedMessageData] = useState({
        isEditing: false,
        messageId: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [queryData, setQueryData] = useState({ partner: "", dialogId: "", partnerId: "" });

    const [messages, setMessages] = useState<Array<IMessage> | []>([]);
    const [thtLastMessageId, setTheLastMessageId] = useState("");


    useEffect(() => {
        if(!messages.length) {
            const { id, partner, partnerId } = getDataFromQueryUrl(history.location.search);
            setQueryData({ dialogId: id, partner, partnerId });

            if(!!user.firstName) {
                socket.socket.emit("join", { dialogId: id, limit }, (messages: Array<IMessage>) => {
                    !!messages.length && setTheLastMessageId(messages[messages.length - 1]._id);
                    setMessages(messages.reverse());

                });
            }
        }

    }, [history.location.search, user.firstName, messages.length]);


    useEffect(() => {
        socket.socket.on("new message", (message: IMessage) => {
            setMessages(prevMessages => [...prevMessages, message]);

            setIsTyping(false);
            setShowEmojiPicker(false);
            setIsSendMessage(false);
        });

        socket.socket.on("edit message", (modifiedMessage: IMessage) => {
            setMessages((prevMessages: Array<IMessage>) => prevMessages.map(
                message => message._id === modifiedMessage._id ? modifiedMessage : message
            ));

            setIsTyping(false);
        });

        socket.socket.on("delete message", (messageId: string) => {
            setMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
            if(thtLastMessageId === messageId) {
                setTheLastMessageId(messages[messages.length - 1]._id);
            }
        });

        type TypingDataType = {
            typingMessage: string,
            isTyping: boolean
        }

        socket.socket.on("typing", ({ typingMessage, isTyping }: TypingDataType) => {
            setTypingMessage(typingMessage);
            setIsTyping(isTyping);
        });

        return () => {
            socket.socket.off("join");
            socket.socket.off("new message");
            socket.socket.off("edit message");
            socket.socket.off("delete message");
            socket.socket.off("typing");
        };
    }, [thtLastMessageId, messages]);

    useEffect(() => {
        if(messages.length <= limit && scrollToStart.current) {
            scrollToStart.current.scrollTo(0, scrollToStart.current.scrollHeight);
        }
    }, [messages.length, scrollToStart]);

    useEffect(() => {
        if(scrollToStart.current) {
            scrollToStart.current.scrollTo(0, scrollToStart.current.scrollHeight);
        }
    }, [isSendMessage, isTyping]);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        if(e.currentTarget.scrollTop === 0 && hasMore) {
            setIsLoading(true);

            scrollToLastMessageRef.current && scrollToLastMessageRef.current.scrollIntoView();
            socket.socket.emit("previous messages",
                { dialogId: queryData.dialogId, limit, lastMessageId: thtLastMessageId }, (messages: Array<IMessage>) => {

                    !!messages.length && setTheLastMessageId(messages[messages.length - 1]._id);
                    setMessages(prevMessages => [...messages.reverse(), ...prevMessages]);
                    messages.length < limit - 1 && setHasMore(false);
                    setIsLoading(false);
                });
        }
    }

    const handleDeleteMessage = (messageId: string) => {
        socket.socket.emit("delete message", { messageId,  dialogId: queryData.dialogId });
    }

    const handleEditMessage = (messageId: string, messageText: string) => {
        setMessage(messageText);
        setModifiedMessageData({ isEditing: true, messageId });
    }

    const handleSubmit: Handlers.SubmitType = e => {
        e.preventDefault();

        if(!modifiedMessageData.isEditing) {
            setIsSendMessage(true);
            socket.socket.emit("create new message", { message, dialog: queryData.dialogId, author: user._id });
        } else {
            socket.socket.emit("edit message", {
                message,
                dialog: queryData.dialogId,
                messageId: modifiedMessageData.messageId
            });

            setModifiedMessageData({ isEditing: false, messageId: "" });
        }

        setTypingMessage("");
        setMessage("");
    }

    const handleChange: Handlers.ChangeType = ({ target }) => {
        setMessage(target.value);

        socket.socket.emit("typing", {
            dialogId: queryData.dialogId,
            typingMessage: `<span class="typing">${ user.firstName }</span> is typing`,
            isTyping: !!target.value
        });
    }

    const handleEmojiPicker = (emoji: BaseEmoji) => setMessage(message + emoji.native);

    return <ChatPage
        onSubmit={ handleSubmit }
        onScroll={ handleScroll }
        onChange={ handleChange }
        onEmojiPicker={ handleEmojiPicker }
        onDelete={ handleDeleteMessage }
        onEdit={ handleEditMessage }
        goBack={ history.goBack }
        message={ message }
        openEmoji={ setShowEmojiPicker }
        messages={ messages }
        userId={ user._id }
        emojiPickerVisible={ emojiPickerVisible }
        isTyping={ isTyping }
        typingMessage={ typingMessage }
        isLoading={ isLoading }
        dialogName={ queryData.partner }
        scrollToStart={ scrollToStart }
        scrollToLastMessageRef={ scrollToLastMessageRef }
        thtLastMessageId={ thtLastMessageId }
    />
}

export default connect<PropsType, null, {}, AppStateType>(
    state => ({ user: UserSelectors.getUser(state) })
)(ChatPageContainer);
