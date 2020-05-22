import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Divider, Col, Row, Typography, Button, Tooltip } from "antd";

import { DescriptionItem, UploadButton, ErrorMessage, StatusText, BlogList } from "../../components";
import ProfileStatus from "./ProfileStatus/ProfileStatusContainer";
import ProfileEditForm from "./ProfileEditForm/ProfileEditFormContainer";
import ProfileBlogForm from "./ProfileBlogForm/ProfileBlogFormContainer";
import "./style.scss";

import icons from "../../shared/icons";
import { Handlers, SetStateType } from "../../interfaces/common";
import { IUser, ChangedUserInfoType } from "../../interfaces/user";
import { ENV, PageUrls } from "../../shared/constants";
import showConfirm from "../../shared/showConfirm";
import { timeFromNow } from "../../shared/helpres";


type PropsType = {
    user: IUser,
    err: string,
    editMode: boolean,
    removeUser: () => void,
    onUploadAvatar: Handlers.ChangeType,
    setUserStatus: (status: string) => void
    setEditMode: SetStateType<boolean>,
    changeUserInfo: (data: ChangedUserInfoType) => void,
}

const ProfilePage: FC<PropsType> = (
    {
        user,
        err,
        editMode,
        removeUser,
        onUploadAvatar,
        setUserStatus,
        setEditMode,
        changeUserInfo,
    }) => (
    <>
        { !!err && <ErrorMessage text={ err } /> }
        <div className="container">
           <div className="profile" >
              <div className="profile-left grey-border card-hover">
                  <div className="profile__header" >
                      <Typography.Title level={4} className="profile__title" >
                          <Tooltip title="Edit profile" >
                              <icons.EditOutlined
                                  className="profile__edit-profile"
                                  onClick={ () => setEditMode(true) }
                              />
                          </Tooltip>
                          User Profile
                      </Typography.Title>
                      <StatusText isOnline={ user.isOnline } />
                  </div>
                  <ProfileStatus userStatus={ user.status } updateUserStatus={ setUserStatus } />

                  <DescriptionItem title="The first name" content={ user.firstName } />
                  <DescriptionItem title="The second name" content={ user.secondName } />
                  <DescriptionItem title="Register date" content={ timeFromNow(user.createdAt!) } />
                  <Link
                      to={ `${ PageUrls.friends }?userId=${ user._id }` }
                      className="profile__friends"
                  >
                      Friends: { user.friends.length }
                  </Link>

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
                      <ProfileEditForm
                          editMode={ editMode }
                          firstName={ user.firstName }
                          secondName={ user.secondName }
                          setEditMode={ setEditMode }
                          changeUserInfo={ changeUserInfo }
                      />
                  }
              </div>
               <div className="profile-right">
                   <ProfileBlogForm />
                   <BlogList
                       selfId={ user._id }
                       userId={ user._id }
                       parentPage="ProfilePage"
                   />
               </div>
           </div>
        </div>
    </>
)

export default ProfilePage;