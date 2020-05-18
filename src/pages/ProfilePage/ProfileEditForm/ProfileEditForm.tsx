import React, { FC } from "react";
import { Drawer, Input, Form, Button } from "antd";

import { SetStateType, Handlers } from "../../../interfaces/common";
import "./style.scss";

type Props = {
    editMode: boolean,
    setEditMode: SetStateType<boolean>,
    values: { [x: string]: string },
    onChange: Handlers.ChangeType,
    onSubmit: Handlers.SubmitType
}

const ProfileEditForm: FC<Props> = (
    {
        editMode,
        setEditMode,
        values,
        onChange,
        onSubmit
    }) => (
    <Drawer
        title="Main"
        placement="right"
        closable={ true }
        onClose={ () => setEditMode(false) }
        visible={ editMode }
    >
        <Form name="edit-form" className="profile-edit-form" onSubmit={ onSubmit } >
            <Form.Item label="The first name" className="edit-form-item" >
                <Input
                    value={ values.firstName }
                    onChange={ onChange }
                    name="firstName"
                    minLength={4}
                    maxLength={30}
                />
            </Form.Item>
            <Form.Item label="The second name" className="edit-form-item" >
                <Input
                    value={ values.secondName }
                    onChange={ onChange }
                    name="secondName"
                    minLength={5}
                    maxLength={30}
                />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    </Drawer>
)

export default ProfileEditForm;