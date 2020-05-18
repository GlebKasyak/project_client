import React, { FC, RefObject } from "react";

import { convertCurrentTime } from "../../../../../shared/helpres";
import icons from "../../../../../shared/icons";
import "./style.scss";

// @ts-ignore
import waveSvg from "../../../../../assets/images/wave.svg";

type Props = {
    audioElem: RefObject<HTMLAudioElement>
    audio: string,
    progress: number,
    togglePlay: () => void,
    isPlaying: boolean,
    currentTime: number
}

const MessageAudio: FC<Props> = (
    {
        audioElem,
        audio,
        progress,
        togglePlay,
        isPlaying,
        currentTime
    }) => (
    <div className="message__audio message__text">
        <audio ref={ audioElem } src={ audio } preload="auto" />
        <div
            className="message__audio-progress"
            style={{ width: `${ progress }%` }}
        />
        <div className="message__audio-info" >
            <div className="message__audio-btn" >
                <button onClick={ togglePlay } >
                    { isPlaying
                        ? <icons.PauseOutlined />
                        : <icons.PlaySquareOutlined />
                    }
                </button>
            </div>
            <div className="message__audio-wave" >
                <img src={ waveSvg } alt="Wave-svg" />
            </div>
            <span className="message__audio-duration" >
                { convertCurrentTime(currentTime) }
            </span>
        </div>
    </div>
);

export default MessageAudio;