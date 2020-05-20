import React, { FC, useState } from "react";
import { BaseEmoji } from "emoji-mart";

import ProfileBlogForm from "./ProfileBlogForm";

import { Handlers } from "../../../interfaces/common";

const initialFormData = {
    title: "",
    description: ""
};

const ProfileBlogFormContainer: FC = () => {
    const [visible, setVisible] = useState(false);
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    const handleChange: Handlers.InputTextAreaChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
    };

    const handleSubmit: Handlers.SubmitType = e => {
        e.preventDefault();

        setFormData(initialFormData);
        setVisible(false);
        setShowEmojiPicker(false);
    };

    const handleEmojiPicker = (emoji: BaseEmoji) => {
        setFormData({ ...formData, description: formData.description + emoji.native });
    };

    return <ProfileBlogForm
        visible={ visible }
        formData={ formData }
        emojiPickerVisible={ emojiPickerVisible }
        setShowEmojiPicker={ setShowEmojiPicker }
        setVisible={ setVisible }
        onSubmit={ handleSubmit }
        onChange={ handleChange }
        onEmojiPicker={ handleEmojiPicker }
    />
}

export default ProfileBlogFormContainer;