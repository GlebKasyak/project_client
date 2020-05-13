import React, { FC, useState } from "react"
import { ReactMicStopEvent } from "react-mic";

import Mp3Recorder from "./Mp3Recorder";

type Props = {
    seIsVisibleAudio: () => void,
    handleSendAudio: (blob: Blob) => Promise<void>
}

const Mp3RecorderContainer: FC<Props> = ({ seIsVisibleAudio, handleSendAudio }) => {
    const [record, setRecord] = useState(false)

    const handleStop = (recordedData: ReactMicStopEvent) => {
        const blob = new Blob([recordedData.blob], { type : "audio/ogg" });
        handleSendAudio(blob);
    }

    const stopRecording = async () => {
        await setRecord(false);
        await seIsVisibleAudio();
    }

    return <Mp3Recorder
        record={ record }
        handleStop={ handleStop }
        stopRecording={ stopRecording }
        startRecording={ () => setRecord(true) }
    />
}

export default Mp3RecorderContainer;