import React, { FC } from "react";
import { Link } from "react-router-dom";
import { List, Button } from "antd";
import cn from "classnames";

import UserAvatar from "../../atoms/UserAvatar/UserAvatar";

import { IMessage, MessageTypes, EnumTypeOfMessage } from "../../../interfaces/dialog";
import { getShortenString } from "../../../shared/helpres";
import icons from "../../../shared/icons";
import { ENV } from "../../../shared/constants";
import "./style.scss";

type PropsType = {
    name: string,
    avatar: string,
    status: boolean,
    lastMessage: IMessage,
    dialogId: string,
    onClick: (dialogId: string) => void,
}

const DialogItem: FC<PropsType> = (
    {
        name,
        avatar,
        status,
        lastMessage,
        dialogId,
        onClick,
    }) => (
    <List.Item className="dialog-item" >
        <Link to={ `/chat?id=${ dialogId }&partner=${ name }` } className="dialog-item__link" >
            <List.Item.Meta
                avatar={ <UserAvatar avatar={ avatar } status={ status } /> }
                title={ <p className="dialog-item__partner-name">{ name }</p> }
                description={
                    lastMessage && (
                        <div className="last-message">
                            <img
                                src={ `${ ENV.SERVER_URL }/${ lastMessage.author.avatar }` }
                                alt={ lastMessage.author.firstName }
                                className="last-message__avatar img"
                            />
                            <span className="last-message__author" >{ lastMessage.author.firstName }:</span>
                            <span className={ cn("last-message__message", { "last-message__message--unread": lastMessage.unread }) } >
                                {  getLastMessage(lastMessage.type, getShortenString(lastMessage.message)) }
                            </span>
                        </div>
                    )
                }
            />
        </Link>
        <Button
            onClick={ onClick.bind(null, dialogId) }
            type="danger"
            className="dialog-item__btn"
        >
            Delete dialog
            <icons.DeleteOutlined />
        </Button>
    </List.Item>
)

const getLastMessage = (type: MessageTypes, message: string) => {
    switch (type) {
        case EnumTypeOfMessage.text:
            return message;
        case EnumTypeOfMessage.image:
            return "Image file";
        case EnumTypeOfMessage.audio:
            return "Audio file";
    }
}

export default DialogItem;