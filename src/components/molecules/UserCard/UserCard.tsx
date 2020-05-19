import React from "react";
import { Card, Col, Tooltip } from "antd";
import { Link } from "react-router-dom";

import UserAvatar from "../../atoms/UserAvatar/UserAvatar";

import { PageUrls } from "../../../assets/constants";
import icons from "./../../../shared/icons";
import { IUser } from "../../../interfaces/user";
import "./style.scss";

type PropsType = {
    user: IUser,
    onClick: (partnerId: string) => Promise<void>
};

const UserCard: React.FC<PropsType> = ({ user, onClick }) => (
    <Col xs={24} sm={12} lg={8} className="user-card" >
        <Card
            className="user-card__card"
            actions={[
                <Tooltip title="View profile" >
                    <Link to={ `${ PageUrls.userInfo }?userId=${ user._id }` } >
                        <div>View profile <icons.EyeOutlined /></div>
                    </Link>
                </Tooltip>,
                <Tooltip title="Create dialog" >
                    <div onClick={ onClick.bind(null, user._id) } >
                         <span>Create dialog </span>
                         <icons.MessageOutlined key="message"  />
                    </div>
                </Tooltip>
            ]}
        >
            <Card.Meta
                avatar={ <UserAvatar avatar={ user.avatar } status={ user.isOnline } /> }
                title={
                    <div className="user-card__title" >
                        { user.firstName } { user.secondName }
                    </div>
                }
                description={ user.email }
            />
        </Card>
    </Col>
)

export default UserCard;