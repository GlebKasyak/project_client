import React, { FC, RefObject } from "react";
import { Picker, BaseEmoji } from "emoji-mart";
import { Button, Col, Form, Icon, Input, Row, Typography, PageHeader } from "antd";

import { Messages, TypingMessage, Preloader } from "../../components";

import { IMessage } from "../../interfaces/dialog";
import { SetStateType, Handlers } from "../../interfaces/common";
import "./style.scss";

type PropsType = {
    onSubmit: Handlers.SubmitType,
    onChange: Handlers.ChangeType,
    onDelete: (messageId: string) => void,
    onEdit: (messageId: string, messageText: string) => void,
    onScroll: (e: any) => void,
    goBack: () => void,
    onEmojiPicker: (emoji: BaseEmoji) => void
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
}

const ChatPage: FC<PropsType> = props => (
    <div className="container" >
        <div className="chat-page">
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
                <div className="infinite-container" ref={ props.scrollToStart } onScroll={ props.onScroll } >
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
                <TypingMessage
                    message={ props.typingMessage }
                    isTyping={ props.isTyping }
                />
                <Col xs={14} md={14} >
                    <Button
                        onClick={ props.openEmoji.bind(null, !props.emojiPickerVisible) }
                        icon="smile"
                        type="link"
                        className="chat-page__smile-btn"
                    />
                    <Input
                        prefix={ <Icon type="message" style={{ color: "rgba(0,0,0, .25)" }} /> }
                        placeholder="Input your message"
                        value={ props.message }
                        onChange={ props.onChange }
                    />
                </Col>
                { props.emojiPickerVisible &&
                    <div className="chat-page__emoji-picker">
                        <Picker set="apple" onSelect={ props.onEmojiPicker } />
                    </div>
                }
                <Col md={6} xs={14}  >
                    <Button type="primary" className="w-100 btn" htmlType="submit" disabled={ !props.message } >
                        <Icon type="enter" /> Enter
                    </Button>
                </Col>
            </Form>
        </div>
    </div>
)

export default ChatPage;