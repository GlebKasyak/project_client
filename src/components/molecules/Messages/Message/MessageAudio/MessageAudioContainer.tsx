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
        let clearProgress: NodeJS.Timeout;

        if(!!audioElem.current) {
            audioElem.current.addEventListener("playing", () => setIsPlaying(true), false);

            audioElem.current.addEventListener("ended", () => {
                setIsPlaying(false);

                clearProgress = setTimeout(() => {
                   setProgress(0);
                   setCurrentTime(0);
                }, 500)
            }, false);

            audioElem.current.addEventListener("pause", () => setIsPlaying(false), false);

            audioElem.current.addEventListener("timeupdate", () => {
                const duration = audioElem.current && (audioElem.current.duration || 0);
                setCurrentTime(audioElem.current!.currentTime);
                setProgress(((audioElem.current!.currentTime / duration!) * 100) + (duration! * 0.5))
            })

        }

        return () => clearTimeout(clearProgress);
    }, []);

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