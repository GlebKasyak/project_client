import React, { FC, useState } from "react";
import { connect } from "react-redux";

import ProfilePage from "./ProfilePage";

import { TypesFileEnum } from "../../shared/constants/api.contsnts";
import { Handlers } from "../../interfaces/common";
import { UserSelectors } from "../../store/selectors";
import { AppStateType } from "../../store/reducers";
import { IUser, ChangedUserInfoType } from "../../interfaces/user";
import {
  removeUser,
  ThunkDispatchUsersType,
  uploadAvatar,
  setUserStatus,
  changeUserInfo
} from "../../store/actions/user.action";

type MapStateToProps = {
  user: IUser,
}

type MapDispatchToProps = {
    removeUser: () => void,
    uploadAvatar: (type: TypesFileEnum.avatar, file: File) => Promise<boolean>,
    setUserStatus: (status: string) => void,
    changeUserInfo: (data: ChangedUserInfoType) => void,
}

type Props = MapStateToProps & MapDispatchToProps;

const ProfilePageContainer: FC<Props> = (
    {
        user,
        removeUser,
        uploadAvatar,
        setUserStatus,
        changeUserInfo,
    }) => {
  const [editMode, setEditMode] = useState(false);
  const [err, setErr] = useState("");

  const handleUploadAvatar: Handlers.ChangeType = async e => {
    setErr("");

    const response = await uploadAvatar(TypesFileEnum.avatar, e.target.files![0]);
    !response && setErr("Error! Incorrect type of file!");
  };


  return <ProfilePage
      user={ user }
      err={ err }
      editMode={ editMode }
      removeUser={ removeUser }
      onUploadAvatar={ handleUploadAvatar }
      setUserStatus={ setUserStatus }
      setEditMode={ setEditMode }
      changeUserInfo={ changeUserInfo }
  />
};

const mapDispatchToProps = (dispatch: ThunkDispatchUsersType) => ({
    removeUser: () => dispatch(removeUser()),
    uploadAvatar: (type: TypesFileEnum.avatar, file: File) => dispatch(uploadAvatar(type, file)),
    setUserStatus: (status: string) => dispatch(setUserStatus(status)),
    changeUserInfo: (data: ChangedUserInfoType) => dispatch(changeUserInfo(data)),
});

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
    state => ({ user: UserSelectors.getUser(state) }),
    mapDispatchToProps
)(ProfilePageContainer);