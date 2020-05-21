import React, { FC, UIEvent, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { BaseEmoji } from "emoji-mart";

import ChatPage from "./ChatPage";

import { getDataFromQueryUrl } from "../../shared/helpres";
import { UserSelectors } from "../../store/selectors";
import { AppStateType } from "../../store/reducers";

import socket from "../../socketServices";
import { TypesFileEnum } from "../../shared/constants/api.contsnts";
import { socketEvents } from "../../shared/constants";
import { DialogAPI } from "../../apiServices";
import { Handlers } from "../../interfaces/common";
import { IUser } from "../../interfaces/user";
import { IMessage, MessageTypes, EnumTypeOfMessage } from "../../interfaces/dialog";


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
    const [isVisibleAudio, seIsVisibleAudio] = useState(false);
    const [err, setErr] = useState("");

    const [queryData, setQueryData] = useState({ partner: "", dialogId: "", partnerId: "" });

    const [messages, setMessages] = useState<Array<IMessage>>([]);
    const [thtLastMessageId, setTheLastMessageId] = useState("");


    useEffect(() => {
        if(!messages.length) {
            const { id, partner, partnerId } = getDataFromQueryUrl(history.location.search);
            setQueryData({ dialogId: id, partner, partnerId });

            if(!!user.firstName) {
                socket.socket.emit(socketEvents.join, { dialogId: id, limit }, (messages: Array<IMessage>) => {
                    !!messages.length && setTheLastMessageId(messages[messages.length - 1]._id);
                    setMessages(messages.reverse());

                });
            }
        }

    }, [history.location.search, user.firstName, messages.length]);

    useEffect(() => {
        socket.socket.on(socketEvents.newMsg, (message: IMessage) => {
            setMessages(prevMessages => [...prevMessages, message]);

            setIsTyping(false);
            setShowEmojiPicker(false);
            setIsSendMessage(false);
        });

        socket.socket.on(socketEvents.editMsg, (modifiedMessage: IMessage) => {
            setMessages((prevMessages: Array<IMessage>) => prevMessages.map(
                message => message._id === modifiedMessage._id ? modifiedMessage : message
            ));

            setIsTyping(false);
        });

        socket.socket.on(socketEvents.deleteMsg, (messageId: string) => {
            setMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
            if(thtLastMessageId === messageId) {
                setTheLastMessageId(messages[messages.length - 1]._id);
            }
        });

        socket.socket.on(socketEvents.readMsg, (readMessageKeys: Array<string>) => {
            setMessages((prevMessages: Array<IMessage>) => prevMessages.map(message => {
                for(let i = 0; i < readMessageKeys.length; i ++) {
                    message = readMessageKeys[i] === message._id ? { ...message, unread: false } : message;
                }

                return message;
            }));
        });

        type TypingDataType = {
            typingMessage: string,
            isTyping: boolean
        }

        socket.socket.on(socketEvents.typing, ({ typingMessage, isTyping }: TypingDataType) => {
            setTypingMessage(typingMessage);
            setIsTyping(isTyping);
        });

        return () => {
            socket.socket.off(socketEvents.join);
            socket.socket.off(socketEvents.newMsg);
            socket.socket.off(socketEvents.editMsg);
            socket.socket.off(socketEvents.deleteMsg);
            socket.socket.off(socketEvents.readMsg);
            socket.socket.off(socketEvents.typing);
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

        return () => {
            socket.socket.emit(socketEvents.typing,
                { isTyping: false, typingMessage: "", dialogId: queryData.dialogId });
        }
    }, [isSendMessage, isTyping, queryData.dialogId]);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        if(e.currentTarget.scrollTop === 0 && hasMore) {
            setIsLoading(true);

            scrollToLastMessageRef.current && scrollToLastMessageRef.current.scrollIntoView();
            socket.socket.emit(socketEvents.prevMsg,
                { dialogId: queryData.dialogId, limit, lastMessageId: thtLastMessageId }, (messages: Array<IMessage>) => {

                    !!messages.length && setTheLastMessageId(messages[messages.length - 1]._id);
                    setMessages(prevMessages => [...messages.reverse(), ...prevMessages]);
                    messages.length < limit - 1 && setHasMore(false);
                    setIsLoading(false);
                });
        }
    }

    const handleDeleteMessage = (messageId: string, type: MessageTypes) => {
        socket.socket.emit(socketEvents.deleteMsg, { messageId, type, dialogId: queryData.dialogId });
    }

    const handleEditMessage = (messageId: string, messageText: string) => {
        setMessage(messageText);
        setModifiedMessageData({ isEditing: true, messageId });
    }

    const handleSubmit: Handlers.SubmitType = e => {
        e.preventDefault();

        if(!modifiedMessageData.isEditing) {
            setIsSendMessage(true);
            socket.socket.emit(socketEvents.createNewMsg,
                { message, type: EnumTypeOfMessage.text, dialog: queryData.dialogId, author: user._id });

            setErr("");
        } else {
            socket.socket.emit(socketEvents.editMsg, {
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

        socket.socket.emit(socketEvents.typing, {
            dialogId: queryData.dialogId,
            typingMessage: `<span class="typing">${ user.firstName }</span> is typing`,
            isTyping: !!target.value
        });
    }

    const handleReadMessage = () => {
        const unreadMessageKeys = [] as Array<string>;
        messages.map(message => (message.author._id !== user._id) && message.unread && unreadMessageKeys.push(message._id))

        !!unreadMessageKeys.length && socket.socket.emit(socketEvents.readMsg, { dialogId: queryData.dialogId, unreadMessageKeys });
    }

    const handleEmojiPicker = (emoji: BaseEmoji) => setMessage(message + emoji.native);

    const handleSendImage: Handlers.ChangeType = async e => {
        try {
            setErr("");
            const message = await DialogAPI.uploadFile(TypesFileEnum.imageMessage, e.target.files![0]);

            setIsSendMessage(true);
            socket.socket.emit(socketEvents.createNewMsg, {
                    message: message.data.data,
                    type: EnumTypeOfMessage.image,
                    dialog: queryData.dialogId,
                    author: user._id
                });
        } catch (err) {
           setErr("File type must be image")
        }
    }

    const handleSendAudio = async (blob: Blob) => {
        const message = await DialogAPI.uploadFile(TypesFileEnum.audio, blob);

        setIsSendMessage(true);
        socket.socket.emit(socketEvents.createNewMsg, {
            message: message.data.data,
            type: EnumTypeOfMessage.audio,
            dialog: queryData.dialogId,
            author: user._id
        });
    }

    return <ChatPage
        onSubmit={ handleSubmit }
        onScroll={ handleScroll }
        onChange={ handleChange }
        onEmojiPicker={ handleEmojiPicker }
        onDelete={ handleDeleteMessage }
        onEdit={ handleEditMessage }
        onSendImage={ handleSendImage }
        onReadMessages={ handleReadMessage }
        handleSendAudio={ handleSendAudio }
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
        err={ err }
        seIsVisibleAudio={ () => seIsVisibleAudio(!isVisibleAudio) }
        isVisibleAudio={ isVisibleAudio }
    />
}

export default connect<PropsType, null, {}, AppStateType>(
    state => ({ user: UserSelectors.getUser(state) })
)(ChatPageContainer);
