"use client"
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {cn} from "@/lib/utils";
import {setSelectedCustomTimer} from "@/app/redux/slice/pomodoroController.slice";

const CustomTimerPomodoro = () => {
    const dispatch = useAppDispatch()
    const {customTimer,selectedCustomTimer} = useAppSelector(state => state.pomodoroReducer)

    return (
        <div className={'flex space-x-3 mb-5'}>
            {customTimer.map((item: any, index: number) => {
                return (
                    <button onClick={()=>{
                        dispatch(setSelectedCustomTimer(index))
                    }} className={cn('border px-3 py-2 rounded-full hover:bg-gray-200', selectedCustomTimer == index && 'bg-black text-white hover:bg-black')} key={index}>
                        {item?.name}
                    </button>
                )
            })}
        </div>
    )
}

export default CustomTimerPomodoro
