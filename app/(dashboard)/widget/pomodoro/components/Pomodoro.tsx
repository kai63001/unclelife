'use client'
import {useState} from "react";
import {fonts} from "@/app/(dashboard)/widget/pomodoro/font/font";
import {cn} from "@/lib/utils";
import CustomTimerPomodoro from "@/app/(dashboard)/widget/pomodoro/components/Pomodoro/CustomTimer";
import CountTimerPomodoro from "@/app/(dashboard)/widget/pomodoro/components/Pomodoro/CountTimer";
import ControlPomodoro from "@/app/(dashboard)/widget/pomodoro/components/Pomodoro/ControlPomodoro";
// import Image from "next/image";

const PomodoroWidget = () => {
    const [dynamicFont, setDynamicFont]: any = useState('dot_gothic_16')
    const randomFont = () => {
        let list = ['dot_gothic_16', 'roboto_mono', 'inter']
        let random = Math.floor(Math.random() * list.length)
        setDynamicFont(list[random])
    }


    return (
        <div
            className={cn(fonts[dynamicFont].className, 'w-full h-full flex flex-col relative text-black justify-center items-center')}>
            <div className={'z-20 w-full h-full flex flex-col relative text-black justify-center items-center'}>
                <CustomTimerPomodoro/>
                <div onClick={randomFont}>
                    <CountTimerPomodoro/>
                </div>
                <ControlPomodoro/>
            </div>
            {/*<Image src="https://i.pinimg.com/originals/d4/29/3a/d4293acedaafb6a8447a9e57e079e1b3.gif" fill alt="Image"*/}
            {/*       className="rounded-md object-cover z-10"/>*/}
        </div>
    )
}

export default PomodoroWidget
