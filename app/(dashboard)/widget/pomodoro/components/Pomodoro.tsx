'use client'
import {fonts} from "@/app/(dashboard)/widget/pomodoro/font/font";
import {cn} from "@/lib/utils";
import CustomTimerPomodoro from "@/app/(dashboard)/widget/pomodoro/components/Pomodoro/CustomTimer";
import CountTimerPomodoro from "@/app/(dashboard)/widget/pomodoro/components/Pomodoro/CountTimer";
import ControlPomodoro from "@/app/(dashboard)/widget/pomodoro/components/Pomodoro/ControlPomodoro";
import {useAppSelector} from "@/app/redux/hook";
// import Image from "next/image";

const PomodoroWidget = () => {
    const {pomodoro} = useAppSelector(state => state.pomodoroReducer)


    return (
        <div
            className={cn(fonts[pomodoro.font || 'inter'].className, 'w-full h-full flex flex-col relative text-black justify-center items-center')}>
            <div className={'z-20 w-full h-full flex flex-col relative text-black justify-center items-center'}>
                <CustomTimerPomodoro/>
                <CountTimerPomodoro/>
                <ControlPomodoro/>
            </div>
            {pomodoro.typeBackground === 'image' ? (
                <div></div>
            ): (
                <div className={'absolute top-0 left-0 w-full h-full z-10'} style={{
                    backgroundColor: pomodoro.backgroundColor
                }}>

                </div>
            )}
            {/*<Image src="https://i.pinimg.com/originals/d4/29/3a/d4293acedaafb6a8447a9e57e079e1b3.gif" fill alt="Image"*/}
            {/*       className="rounded-md object-cover z-10"/>*/}
        </div>
    )
}

export default PomodoroWidget
