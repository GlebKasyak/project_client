import React, { FC, RefObject } from "react";
import { Picker, BaseEmoji } from "emoji-mart";
import { Button, Col, Form, Icon, Input, Row, Typography, PageHeader, Alert } from "antd";

import { Messages, TypingMessage, Preloader, UploadButton, Mp3Recorder } from "../../components";

import icons from "../../shared/icons";
import { IMessage, MessageTypes } from "../../interfaces/dialog";
import { SetStateType, Handlers } from "../../interfaces/common";
import "./style.scss";

type PropsType = {
    onSubmit: Handlers.SubmitType,
    onChange: Handlers.ChangeType,
    onDelete: (messageId: string, type: MessageTypes) => void,
    onEdit: (messageId: string, messageText: string) => void,
    onSendImage: Handlers.ChangeType,
    handleSendAudio: (blob: Blob) => Promise<void>,
    onEmojiPicker: (emoji: BaseEmoji) => void
    onReadMessages: () => void,
    onScroll: (e: any) => void,
    goBack: () => void,
    openEmoji: SetStateType<boolean>,
    message: string,
    messages: Array<IMessage>,
    userId: string,
    emojiPickerVisible: boolean,
    isTyping: boolean,
    typingMessage: string,
    isLoading: boolean,
    dialogName: string,
    scrollToStart: RefObject<HTMLDivElement>,
    scrollToLastMessageRef: RefObject<HTMLDivElement>,
    thtLastMessageId: string,
    err: string,
    seIsVisibleAudio: () => void,
    isVisibleAudio: boolean
}

const ChatPage: FC<PropsType> = props => (
    <div className="container" >
        <div className="chat-page" onMouseEnter={ props.onReadMessages }>
            <Typography.Title level={4} className="center chat-page_title">
                { props.dialogName }
            </Typography.Title>
            <Row className="chat-page__window" >
                <div  className="chat-page__header" >
                    <PageHeader
                        onBack={ props.goBack }
                        title="Go back"
                    />

                </div>
                <div ref={ props.scrollToStart } onScroll={ props.onScroll } className="infinite-container" >
                    { !!props.messages.length &&
                        <>
                            { props.isLoading &&
                                <Preloader text="Messages are loading" modifier="top-scroll-loader" />
                            }
                            <Messages
                                scrollToLastMessageRef={ props.scrollToLastMessageRef }
                                thtLastMessageId={ props.thtLastMessageId }
                                messages={ props.messages }
                                userId={ props.userId }
                                onDelete={ props.onDelete }
                                onEdit={ props.onEdit }
                            />
                        </>
                    }
                </div>
            </Row>
            <Form layout="inline" className="chat-page__form"  onSubmit={ props.onSubmit }  >
                { !!props.err && <Alert type="error" message={ props.err } banner className="chat-page__alert-err" /> }
                <TypingMessage
                    message={ props.typingMessage }
                    isTyping={ props.isTyping }
                />
                { props.isVisibleAudio &&
                    <Mp3Recorder
                        seIsVisibleAudio={ props.seIsVisibleAudio }
                        handleSendAudio={ props.handleSendAudio }
                    />
                }
                <UploadButton modifier="chat-page" iconType="picture" callback={ props.onSendImage } />
                <Col xs={14} >
                    <Button
                        onClick={ props.openEmoji.bind(null, !props.emojiPickerVisible) }
                        icon="smile"
                        type="link"
                        className="chat-page__smile-btn"
                    />
                    <Input
                        value={ props.message }
                        onChange={ props.onChange }
                        prefix={ <Icon type="message" style={{ color: "rgba(0,0,0, .25)" }} /> }
                        placeholder="Input your message"
                        className="chat-page__input-field"
                        autoFocus={ true }
                    />
                </Col>
                { props.emojiPickerVisible &&
                    <div className="chat-page__emoji-picker">
                        <Picker set="apple" onSelect={ props.onEmojiPicker } />
                    </div>
                }
                <icons.AudioTwoTone
                    onClick={ props.seIsVisibleAudio }
                    className="chat-page__audio-btn form-icon"
                />
                <Button type="primary" className="w-100 btn chat-page__enter-btn" htmlType="submit" disabled={ !props.message } >
                   <icons.EnterOutlined />
                </Button>
            </Form>
        </div>
    </div>
)

export default ChatPage;