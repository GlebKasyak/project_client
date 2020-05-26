import React, { FC } from "react"

import { ENV } from "../../../../../shared/constants";
import "./style.scss";

type Props = {
  message: string,
  type: string
};

const MessageImage: FC<Props> =  ({ message, type }) => (
    <a
        href={`${ ENV.SERVER_URL }/${ message }`}
        className="message__link-msg"
        target="_blank"
        rel="noopener noreferrer"
    >
      <img
          src={`${ ENV.SERVER_URL }/${ message }`}
          className="message__img"
          alt={ `${ type } message` }
      />
    </a>
)

export default MessageImage;