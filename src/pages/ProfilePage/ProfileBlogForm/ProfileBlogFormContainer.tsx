import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { BaseEmoji } from "emoji-mart";

import ProfileBlogForm from "./ProfileBlogForm";

import { createBlog } from "../../../store/actions/blog.action";
import { AppStateType } from "../../../store/reducers";
import { UserSelectors } from "../../../store/selectors";
import { NewBlogData } from "../../../interfaces/blog";
import { Handlers } from "../../../interfaces/common";

type MapStateToPropsType = {
    userId: string
}

type MapDispatchToProps = {
    createBlog: (newData: NewBlogData) => void
}

type Props = MapStateToPropsType & MapDispatchToProps;

const initialFormData = {
    title: "",
    description: ""
};

const ProfileBlogFormContainer: FC<Props> = ({ userId, createBlog }) => {
    const [visible, setVisible] = useState(false);
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    const handleChange: Handlers.InputTextAreaChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
    };

    const handleSubmit: Handlers.SubmitType = async e => {
        e.preventDefault();

        await createBlog({ author: userId, ...formData });
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

export default connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>(
    state => ({ userId: UserSelectors.getUserId(state) }),
    { createBlog }
)(ProfileBlogFormContainer);