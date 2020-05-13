import React, { FC, useState } from "react";
import { connect } from "react-redux";

import ProfilePage from "./ProfilePage";

import { TypesFileEnum } from "../../assets/constants/api.contsnts";
import { Handlers } from "../../interfaces/common";
import { UserSelectors } from "../../store/selectors";
import { AppStateType } from "../../store/reducers";
import { IUser } from "../../interfaces/user";
import { removeUser, ThunkDispatchUsersType, uploadAvatar } from "../../store/actions/user.action";


type MapStateToProps = {
  user: IUser
}

type MapDispatchToProps = {
  removeUser: () => void,
  uploadAvatar: (type: TypesFileEnum.avatar, file: File) => Promise<boolean>
}

type Props = MapStateToProps & MapDispatchToProps;

const ProfilePageContainer: FC<Props> = ({ user, removeUser, uploadAvatar }) => {
  const [err, setErr] = useState("");

  const handleUploadAvatar: Handlers.ChangeType = async e => {
    setErr("");

    const response = await uploadAvatar(TypesFileEnum.avatar, e.target.files![0]);
    !response && setErr("Error! Incorrect type of file!");
  }

  return <ProfilePage
      user={ user }
      removeUser={ removeUser }
      onUploadAvatar={ handleUploadAvatar }
      err={ err }
  />
};

const mapDispatchToProps = (dispatch: ThunkDispatchUsersType) => ({
  removeUser: () => dispatch(removeUser()),
  uploadAvatar: (type: TypesFileEnum.avatar, file: File) => dispatch(uploadAvatar(type, file))
});

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
    state => ({  user: UserSelectors.getUser(state) }),
    mapDispatchToProps
)(ProfilePageContainer);