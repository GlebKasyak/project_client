import React, { FC } from "react";
import icons from "../../../shared/icons";

type Props = {
    onClick: () => void,
    text: string,
    isOpen: boolean,
    className: string
}

const TextWithIcon: FC<Props> = ({ onClick, text, isOpen, ...props }) => (
    <p onClick={ onClick } {...props} >
        { isOpen
            ? <icons.CaretUpOutlined />
            : <icons.CaretDownOutlined />
        }
        { text }
    </p>
);

export default TextWithIcon;