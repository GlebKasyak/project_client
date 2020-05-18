import React, { FC } from "react";
import { Button, Input } from "antd";
import { BaseEmoji, Picker } from "emoji-mart";

import icons from "../../../shared/icons";
import { SetStateType } from "../../../interfaces/common";
import "./style.scss";

type Props = {
    status: string,
    editMode: boolean,
    setEditMode: SetStateType<boolean>,
    deactivateEditMode: () => void,
    setStatus: SetStateType<string>,
    emojiPickerVisible: boolean,
    onEmojiPicker: (emoji: BaseEmoji) => void,
    openEmoji: SetStateType<boolean>,
}

const ProfileStatus: FC<Props> =  (
    {
        status,
        editMode,
        setEditMode,
        deactivateEditMode,
        setStatus,
        emojiPickerVisible,
        onEmojiPicker,
        openEmoji
    }) => {
  return (
      <div className="profile__status" >
        <div className="profile__status-field" >
          <span>Status:  </span>
          <span onDoubleClick={ () => setEditMode(true) }>{ status || "Your Status" }</span>
        </div>
        { editMode &&
          <div className="profile__status-edit" >
            <Input.TextArea
                value={ status }
                onChange={ ({ target }) => setStatus(target.value) }
                maxLength={100}
                rows={3}
                autoFocus={true}
            />
              { emojiPickerVisible &&
                  <div className="profile__emoji-picker">
                      <Picker set="apple" onSelect={ onEmojiPicker } />
                  </div>
              }
              <div className="profile__buttons" >
                  <Button
                      onClick={ () => setEditMode(false) }
                      className="profile__close-btn"
                  >
                      Close <icons.CloseOutlined />
                  </Button>
                  <div>
                      <Button
                          onClick={ openEmoji.bind(null, !emojiPickerVisible) }
                          type="link"
                          className="profile__smile-btn"
                      >
                          <icons.SmileOutlined />
                      </Button>
                      <Button onClick={ deactivateEditMode } >
                          Save
                      </Button>
                  </div>
              </div>
          </div>
        }
      </div>
  )
}

export default ProfileStatus;