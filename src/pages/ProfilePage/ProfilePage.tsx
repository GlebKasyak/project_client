import React, { FC } from "react";
import { Divider, Col, Row, Typography, Button, Tooltip } from "antd";

import { DescriptionItem, UploadButton, ErrorMessage } from "../../components";
import ProfileStatusContainer from "./ProfileStatus/ProfileStatusContainer";
import ProfileEditFormContainer from "./ProfileEditForm/ProfileEditFormContainer";

import icons from "../../shared/icons";
import { Handlers, SetStateType } from "../../interfaces/common";
import { IUser, ChangedUserInfoType } from "../../interfaces/user";
import { ENV } from "../../assets/constants";
import showConfirm from "../../shared/showConfirm";
import { timeFromNow } from "../../shared/helpres";
import "./style.scss";

type PropsType = {
    user: IUser,
    removeUser: () => void,
    onUploadAvatar: Handlers.ChangeType,
    setUserStatus: (status: string) => void
    err: string,
    setEditMode: SetStateType<boolean>,
    editMode: boolean,
    changeUserInfo: (data: ChangedUserInfoType) => void
}

const ProfilePage: FC<PropsType> = (
    {
        user,
        removeUser,
        onUploadAvatar,
        setUserStatus,
        err,
        setEditMode,
        editMode,
        changeUserInfo
    }) => (
    <>
        { !!err && <ErrorMessage text={ err } /> }
        <div className="profile container">
            <div className="profile__header" >
                <Typography.Title level={4} className="profile__title" >
                    <Tooltip title="Edit profile" >
                        <icons.EditOutlined className="profile__edit-profile" onClick={ () => setEditMode(true) } />
                    </Tooltip>
                    User Profile
                </Typography.Title>
                <span className="profile__status" >{ user.isOnline ? "online" : "offline" }</span>
            </div>
            <ProfileStatusContainer userStatus={ user.status } updateUserStatus={ setUserStatus } />

            <DescriptionItem title="The first name" content={ user.firstName } />
            <DescriptionItem title="The second name" content={ user.secondName } />
            <DescriptionItem title="Register date" content={ timeFromNow(user.createdAt!) } />

            <Row>
                <Col md={12} xs={24} className="profile__avatar" >
                    <DescriptionItem title="Avatar" />
                    <div className="profile-avatar-wrapper" >
                        <img
                            src={ user.avatar && `${ ENV.SERVER_URL }/${ user.avatar }` }
                            alt={ user.firstName }
                            className="profile-avatar img"
                        />
                    </div>
                    <UploadButton
                        text="Update avatar"
                        iconType="upload"
                        callback={ onUploadAvatar }
                    />
                </Col>
            </Row>

            <Divider />
            <p className="profile__section" >Contacts</p>

            <DescriptionItem title="Email" content={ user.email } />
            <Button
                onClick={ () => showConfirm(removeUser, "Do you Want to delete this account?") }
                type="danger"
                icon="delete"
                className="w-100 btn"
            >
                Remove account
            </Button>
            { editMode &&
                <ProfileEditFormContainer
                    editMode={ editMode }
                    setEditMode={ setEditMode }
                    changeUserInfo={ changeUserInfo }
                />
            }
        </div>
    </>
)

export default ProfilePage;