import React from "react";

import "./style.scss";

type LinePropsType = {
    onClick?: () => void
}

const Line: React.FC<LinePropsType> = ({ children, onClick }) => (
    <div onClick={ onClick } className="line">{ children }</div>
);

export default Line;