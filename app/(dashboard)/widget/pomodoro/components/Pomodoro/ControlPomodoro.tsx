"use client"
import {cn} from "@/lib/utils";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {setCounting} from "@/app/redux/slice/pomodoroController.slice";
import {RotateCcw} from "lucide-react";
import {useState} from "react";

const ControlPomodoro = () => {
    const [stopping, setStopping] = useState(false)
    const [onHover, setOnHover] = useState(false)
    const dispatch = useAppDispatch()
    const {counting, customization} = useAppSelector(state => state.pomodoroReducer)

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
                    className={cn('px-10 py-2 border rounded-full duration-200')}
                    style={{
                        // backgroundColor: counting !== 'start' ? customization.start.backgroundColor : customization.pause.backgroundColor,
                        // color: counting !== 'start' ? customization.start.color : customization.pause.color,
                        // check hover
                        backgroundColor: counting !== 'start' ? onHover ? customization.start.backgroundColorHover : customization.start.backgroundColor : onHover ? customization.pause.backgroundColorHover : customization.pause.backgroundColor,
                        color: counting !== 'start' ? onHover ? customization.start.colorHover : customization.start.color : onHover ? customization.pause.colorHover : customization.pause.color,
                        border: `1px solid ${counting !== 'start' ? customization.start.borderColor : customization.pause.borderColor}`
                    }}
                    onMouseEnter={() => {
                        setOnHover(true)
                    }}
                    onMouseLeave={() => {
                        setOnHover(false)
                    }}
            >
                {counting == 'start' ? 'Pause' : 'Start'}
            </button>
            {customization?.resetColor?.color !== 'transparent' && (
                <RotateCcw size={24} onClick={() => {
                    dispatch(setCounting('stop'))
                    setStopping(true)
                    setTimeout(() => {
                        setStopping(false)
                    }, 400)
                }} style={{
                    color: customization.resetColor.color,
                }} className={cn('hover:text-black cursor-pointer', stopping && ('animate-reverse-spin'))}/>
            )}
        </div>
    )
}

export default ControlPomodoro
