'use client'
import {useState} from "react";
import {fonts} from "@/app/(dashboard)/widget/pomodoro/font/font";
import {cn} from "@/lib/utils";
import CustomTimerPomodoro from "@/app/(dashboard)/widget/pomodoro/components/Pomodoro/CustomTimer";

const PomodoroWidget = () => {
    const [dynamicFont, setDynamicFont]: any = useState('dot_gothic_16')
    const randomFont = () => {
        let list = ['dot_gothic_16', 'roboto_mono', 'inter']
        let random = Math.floor(Math.random() * list.length)
        setDynamicFont(list[random])
    }


    return (
        <div className={cn(fonts[dynamicFont].className, 'w-full h-full flex flex-col bg-white text-black justify-center items-center')}>
            <CustomTimerPomodoro/>
            <div onClick={randomFont} className={'text-6xl'}>
                25:00
            </div>
        </div>
    )
}

export default PomodoroWidget
