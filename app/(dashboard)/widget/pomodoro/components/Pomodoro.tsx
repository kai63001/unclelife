'use client'
import {fonts} from "@/app/(dashboard)/widget/pomodoro/font/font";
import {cn} from "@/lib/utils";
import CustomTimerPomodoro from "@/app/(dashboard)/widget/pomodoro/components/Pomodoro/CustomTimer";
import CountTimerPomodoro from "@/app/(dashboard)/widget/pomodoro/components/Pomodoro/CountTimer";
import ControlPomodoro from "@/app/(dashboard)/widget/pomodoro/components/Pomodoro/ControlPomodoro";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import Image from "next/image";
import {useEffect} from "react";
import {
    setAllCustomization,
    setAllPomodoro,
    setCustomTimer,
    setIdPomodoro,
    setKeyPomodoro
} from "@/app/redux/slice/pomodoroController.slice";

const PomodoroWidget = ({data}: any) => {
    const dispatch = useAppDispatch()
    const {pomodoro} = useAppSelector(state => state.pomodoroReducer)
    useEffect(() => {
        if (!data) return
        console.log(data.data)
        dispatch(setCustomTimer(data.data.customTimer))
        dispatch(setKeyPomodoro(data.data.key))
        dispatch(setIdPomodoro(data.id))
        dispatch(setAllPomodoro(data.data.pomodoro))
        dispatch(setAllCustomization(data.data.customization))
    }, [data, dispatch]);

    return (
        <div
            className={cn(fonts[pomodoro.font || 'inter'].className, 'w-full h-full flex flex-col relative text-black justify-center items-center')}>
            <div className={'z-20 w-full h-full flex flex-col relative text-black justify-center items-center'}>
                <CustomTimerPomodoro/>
                <CountTimerPomodoro/>
                <ControlPomodoro/>
            </div>
            {pomodoro.typeBackground === 'image' ? (
                <Image
                    src={pomodoro.backgroundImage || 'https://cdn.pixabay.com/photo/2022/12/01/04/40/backpacker-7628303_1280.jpg'}
                    fill alt="Image"
                    className="rounded-md object-cover z-10"/>
            ) : (
                <div className={'absolute top-0 left-0 w-full h-full z-10'} style={{
                    backgroundColor: pomodoro.backgroundColor
                }}>
                </div>
            )}
        </div>
    )
}

export default PomodoroWidget
