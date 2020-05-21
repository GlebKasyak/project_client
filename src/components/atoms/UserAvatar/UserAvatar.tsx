import React, { FC } from "react";
import { Avatar } from "antd";

import { ENV } from "../../../shared/constants";
import Status from "../Status/Status";
import "./style.scss";

type Props = {
    avatar: string,
    status: boolean
}

const UserAvatar: FC<Props> = ({ avatar, status }) => (
    <div className="avatar" >
        <Avatar src={ `${ ENV.SERVER_URL }/${ avatar }` } />
        <Status online={ status } />
    </div>
)

export default UserAvatar;