import React, { FC } from "react";
import { Tooltip } from "antd";

import "./style.scss";

type Props = {
    isOnline: boolean
};

const StatusText: FC<Props> = ({ isOnline }) => (
    <Tooltip title={ isOnline ? "User is online" : "User is offline" } >
        <span className="status-online" >{ isOnline ? "online" : "offline" }</span>
    </Tooltip>
)

export default StatusText;