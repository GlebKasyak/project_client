import React, { FC, useState } from "react";

import ProfileEditForm from "./ProfileEditForm";

import { SetStateType, Handlers } from "../../../interfaces/common";
import { ChangedUserInfoType } from "../../../interfaces/user";

type Props = {
    editMode: boolean,
    setEditMode: SetStateType<boolean>,
    changeUserInfo: (data: ChangedUserInfoType) => void
}

const ProfileEditFormContainer: FC<Props> = ({ editMode, setEditMode, changeUserInfo }) => {
    const [values, setValues] = useState<{ [x: string]: string }>({
        firstName: "",
        secondName: ""
    });

    const handleChange: Handlers.ChangeType = e => setValues({ ...values, [e.target.name]: e.target.value });

    const handleSubmit: Handlers.SubmitType = e => {
        e.preventDefault();

        changeUserInfo(values as ChangedUserInfoType);
        setEditMode(false);
        setValues({ firstName: "", secondName: "" });
    }

    return <ProfileEditForm
        editMode={ editMode }
        setEditMode={ setEditMode }
        values={ values }
        onChange={ handleChange }
        onSubmit={ handleSubmit }
    />
}

export default ProfileEditFormContainer;