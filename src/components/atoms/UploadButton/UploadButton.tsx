import React, { FC } from "react";
import { Icon } from "antd";

import { Handlers } from "../../../interfaces/common";
import "./style.scss";


type Props = {
    text?: string,
    callback?: Handlers.ChangeType,
    modifier?: string
    iconType?: string
};

const UploadButton: FC<Props> = (
    { text,
        callback,
        modifier,
        iconType
    }) => {

    return (
        <div className={ `upload-file btn upload-file--${ modifier }` }>
            { iconType && <Icon type={ iconType } className="upload-file__icon" /> }{ text }
            <input onChange={ callback } type="file" className="upload-file__file-btn" />
        </div>
    )
};

export default UploadButton;
