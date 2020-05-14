import React, { FC, useState, useEffect } from "react";

import ProfileStatus from "./ProfileStatus";
import { BaseEmoji } from "emoji-mart";

type Props = {
  userStatus: string,
  updateUserStatus: (status: string) => void
}

const ProfileStatusContainer: FC<Props> =  ({ userStatus, updateUserStatus }) => {
  const [editMode, setEditMode] = useState(false);
  const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
  const [status, setStatus] = useState(userStatus);

  useEffect(() => {
    setStatus(userStatus)
  }, [userStatus]);

  const deactivateEditMode = () => {
    setEditMode(false);
    updateUserStatus( status )
  };

  const handleEmojiPicker = (emoji: BaseEmoji) => setStatus(status + emoji.native);

  return <ProfileStatus
      status={ status }
      editMode={ editMode }
      setEditMode={ setEditMode }
      deactivateEditMode={ deactivateEditMode }
      setStatus={ setStatus }
      emojiPickerVisible={ emojiPickerVisible }
      onEmojiPicker={ handleEmojiPicker }
      openEmoji={ setShowEmojiPicker }
  />
}

export default ProfileStatusContainer;