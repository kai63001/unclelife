"use client"

import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {setCounting} from "@/app/redux/slice/pomodoroController.slice";

const CountTimerPomodoro = () => {
    const dispatch = useAppDispatch()
    const {counting, selectedCustomTimer, customTimer, customization} = useAppSelector(state => state.pomodoroReducer)

    const [count, setCount] = useState(customTimer[0].time * 60);
    const workerRef: any = useRef(null);


    useEffect(() => {
        if (counting == 'start') {
            startTimer();
        } else if (counting == 'pause') {
            pauseTimer()
        } else if (counting == 'stop') {
            stopAndResetTimer()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counting])

    useEffect(() => {
        if (selectedCustomTimer !== null) {
            setCount(customTimer[selectedCustomTimer].time * 60)
            stopAndResetTimer()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCustomTimer]);

    const startTimer = () => {
        workerRef.current = new Worker("/timerWorker.js");

        workerRef.current.onmessage = (event: any) => {
            setCount(event.data);
            // if (event.data === 0) {
            //     const audio = new Audio("/sound/endSound.mp3");
            //     audio.play();
            // }
        };
        workerRef.current.postMessage(count);
    };
    const pauseTimer = () => {
        if (workerRef.current) {
            workerRef.current.terminate();
            workerRef.current = null;
            return
        }
    }

    const stopAndResetTimer = () => {
        workerRef?.current?.terminate();
        workerRef.current = null;
        setCount(customTimer[selectedCustomTimer].time * 60)
        dispatch(setCounting('stop'))
        return
    }

    return (
        <div className={'text-6xl'} style={{
            color: customization.pomodoro.color
        }}>
            {Math.floor(count / 60)
                .toString()
                .padStart(2, "0")}
            :{(count % 60).toString().padStart(2, "0")}
        </div>
    )
}

export default CountTimerPomodoro
