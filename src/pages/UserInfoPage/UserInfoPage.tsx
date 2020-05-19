import React, { FC } from "react";
import cn from "classnames";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";

import { StatusText } from "../../components";
import "./style.scss";

import { IUser } from "../../interfaces/user";
import { ENV, PageUrls } from "../../assets/constants";

type Props = {
    selfId: string,
    userInfo: IUser,
    isFriend: boolean,
    handleClick: (id: string) => void
}

const UserInfoPage: FC<Props> = ({ selfId, userInfo, isFriend, handleClick }) => {
    const { avatar, firstName, secondName, email, _id, friends, status, isOnline } = userInfo;

    return (
        <div className="container" >
            <div className="user-info-page" >
                <div className="left-block" >
                    <Card
                        hoverable
                        className="user-info-page__card"
                        cover={
                            <img
                                src={ `${ ENV.SERVER_URL }/${ avatar }` }
                                alt={ firstName }
                                className="user-info-page__card-avatar"
                            />
                        }
                    >
                        <Card.Meta
                            title={ `${ firstName } ${ secondName }` }
                            description={
                                <div>
                                    <div>{ email }</div>
                                    { selfId !== _id && (
                                        <Button
                                            className={ cn(
                                                "user-info-page__btn",
                                                { "user-info-page__btn--is-friend": isFriend })
                                            }
                                            onClick={ handleClick.bind(null, _id) }
                                        >
                                            { isFriend ? "Remove from friends" : "Add to friends list" }
                                        </Button>
                                    ) }
                                </div>
                            }
                        />
                    </Card>
                    <Link
                        to={ `${ PageUrls.friends }?userId=${ _id }` }
                        className={ cn(
                            "user-info-page__friends-wrapper",
                            { "user-info-page__friends-wrapper--disabled": !friends.length })
                        }
                    >
                        Friends
                        <span className="user-info-page__friends" >{ friends.length }</span>
                    </Link>
                </div>
                <div className="right-block" >
                    <div className={ cn(
                        "user-info-page__status",
                        { "user-info-page__status--isHave": status })
                    } >
                        { !!status && <div>{ status }</div> }
                        <StatusText isOnline={ isOnline } />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfoPage;