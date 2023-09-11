"use client"
import {cn} from "@/lib/utils";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {setCounting} from "@/app/redux/slice/pomodoroController.slice";
import {RotateCcw} from "lucide-react";
import {useState} from "react";

const ControlPomodoro = () => {
    const [stopping, setStopping] = useState(false)
    const dispatch = useAppDispatch()
    const {counting} = useAppSelector(state => state.pomodoroReducer)

    const handleStart = () => {
        if (counting == 'start') {
            dispatch(setCounting('pause'))
            return
        }
        dispatch(setCounting('start'))
    }
    return (
        <div className={'flex items-center space-x-3 mt-5'}>
            <button onClick={handleStart}
                    className={cn('px-10 py-2 border rounded-full', 'hover:bg-black hover:text-white', counting == 'start' && 'bg-black text-white')}>
                {counting == 'start' ? 'Pause' : 'Start'}
            </button>
            <RotateCcw size={24} onClick={() => {
                dispatch(setCounting('stop'))
                setStopping(true)
                setTimeout(() => {
                    setStopping(false)
                },1000)
            }} className={cn('hover:text-black cursor-pointer', stopping && ('animate-reverse-spin'))}/>
        </div>
    )
}

export default ControlPomodoro
