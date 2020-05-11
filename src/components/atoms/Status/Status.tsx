import React, { FC } from "react";
import { Tooltip } from "antd";
import cn from "classnames";

import "./Status.scss";

type Props = {
    online: boolean
}

const Status: FC<Props> = ({ online }) => (
    <Tooltip title={ online ? "online" : "offline" } >
        <span className={ cn("status", { "status--online": online }) } />
    </Tooltip>
);


export default Status;