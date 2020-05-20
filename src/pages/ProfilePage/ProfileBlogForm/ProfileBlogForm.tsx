import React, { FC } from "react";
import { Button, Form, Input } from "antd";
import { BaseEmoji, Picker } from "emoji-mart";

import icons from "../../../shared/icons";
import { Handlers, SetStateType } from "../../../interfaces/common";
import "./style.scss";

type Props = {
    visible: boolean,
    formData: { title: string, description: string },
    emojiPickerVisible: boolean,
    setVisible: SetStateType<boolean>,
    setShowEmojiPicker: SetStateType<boolean>,
    onSubmit: Handlers.SubmitType,
    onChange: Handlers.InputTextAreaChange,
    onEmojiPicker: (emoji: BaseEmoji) => void
};

const ProfileBlogForm: FC<Props> = (
    {
        setVisible,
        visible,
        emojiPickerVisible,
        setShowEmojiPicker,
        onSubmit,
        formData,
        onChange,
        onEmojiPicker
    }) => (
    <div className="profile-blog-form grey-border card-hover" >
        <span onClick={ () => setVisible(!visible) } className="profile-blog-form__title" >Anything new?</span>
        { visible &&
            <Form onSubmit={ onSubmit } >
                <Form.Item label="Title" className="profile-blog-form__item" >
                    <Input
                        value={ formData.title }
                        onChange={ onChange }
                        name="title"
                        minLength={5}
                        maxLength={100}
                        required={true}

                    />
                </Form.Item>
                <Form.Item label="Description" className="profile-blog-form__item" >
                    <Input.TextArea
                        value={ formData.description }
                        onChange={ onChange }
                        name="description"
                        minLength={5}
                        required={true}
                        rows={2}
                    />
                </Form.Item>
                <div className="profile-blog-form__buttons-wrapper" >
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Publish
                        </Button>
                    </Form.Item>
                    <icons.SmileOutlined
                        onClick={ () => setShowEmojiPicker(!emojiPickerVisible) }
                        className="profile-blog-form__smile-btn"
                    />
                </div>
                { emojiPickerVisible &&
                    <div className="profile-blog-form__emoji-picker">
                        <Picker set="apple" onSelect={ onEmojiPicker } />
                    </div>
                }
            </Form>
        }
    </div>
)

export default ProfileBlogForm;