import React, { FC } from "react";
import { List } from "antd";
import { History } from "history";

import { UserAvatar } from "../../index";
import "./style.scss";

import { PageUrls } from "../../../assets/constants";
import { IUser } from "../../../interfaces/user";

type Props = {
    users: Array<IUser>,
    history: History
}

const UserList: FC<Props> = ({ users, history }) => (
    <List
        itemLayout="horizontal"
        dataSource={ users }
        renderItem={ user => (
            <List.Item
                onClick={ () => history.push(`${ PageUrls.userInfo }?userId=${ user._id }`) }
                className="user-item"
            >
                <List.Item.Meta
                    avatar={ <UserAvatar avatar={ user.avatar } status={ user.isOnline } /> }
                    title={ <span>{ `${ user.firstName } ${ user.secondName }` }</span> }
                    description={ user.email }
                />
            </List.Item>
        ) }
    />
)

export default UserList;