import React, { FC, useEffect, useRef, useState } from "react";

import MessageAudio from "./MessageAudio";

type Props = {
    audio: string
}

const MessageAudioContainer: FC<Props> = ({ audio }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioElem = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if(!!audioElem.current) {
            !isPlaying ? audioElem.current.play() : audioElem.current.pause();
        }
    };

    useEffect(() => {
        if(!!audioElem.current) {
            audioElem.current.addEventListener("playing", () => setIsPlaying(true));

            audioElem.current.addEventListener("ended", () => {
                setIsPlaying(false);
                setProgress(0);
                setCurrentTime(0);
            });

            audioElem.current.addEventListener("pause", () => setIsPlaying(false));

            audioElem.current.addEventListener("timeupdate", () => {
                const duration = audioElem.current && (audioElem.current.duration || 0);
                setCurrentTime(audioElem.current!.currentTime);
                setProgress(((audioElem.current!.currentTime / duration!) * 100) + (duration! * 0.5))
            })
        }
    }, [audioElem]);

    return <MessageAudio
        audio={ audio }
        audioElem={ audioElem }
        currentTime={ currentTime }
        isPlaying={ isPlaying }
        progress={ progress }
        togglePlay={ togglePlay }
    />
};

export default MessageAudioContainer;