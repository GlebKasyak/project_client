import React, { FC } from "react"
import { ReactMic, ReactMicStopEvent } from "react-mic";
import { Button } from "antd";

import icons from "../../../shared/icons";
import "./style.scss";

type Props = {
    record: boolean,
    handleStop: (recordedData: ReactMicStopEvent) => void,
    stopRecording: () => Promise<void>,
    startRecording: () => void
}

const Mp3RecorderContainer: FC<Props> = ({ record, handleStop, stopRecording, startRecording }) => (
    <div className="mp3-recorder" >
        <ReactMic
            record={ record }
            className="mp3-recorder__sound-wave"
            onStop={ handleStop }
            strokeColor="#1890ff"
            backgroundColor="#edeef0" />
        <Button onClick={ startRecording } className="mp3-recorder__start-btn" >
            <icons.PlaySquareOutlined />
        </Button>
        <Button onClick={ stopRecording } className="mp3-recorder__stop-btn" >
            <icons.PauseOutlined />
        </Button>
    </div>
)

export default Mp3RecorderContainer;