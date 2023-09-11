"use client"
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {cn} from "@/lib/utils";
import {setSelectedCustomTimer} from "@/app/redux/slice/pomodoroController.slice";
import {useState} from "react";

const CustomTimerPomodoro = () => {
    const dispatch = useAppDispatch()
    const [customTimerHover, setCustomTimerHover] = useState<number | null>(null)
    const {customTimer, selectedCustomTimer, customization}:any = useAppSelector(state => state.pomodoroReducer)
    const renderBackgroundColor = (index: number,type1:any,type2:any,key1:any,key2:any) => {
        if (selectedCustomTimer == index && customTimerHover == index) {
            return customization[type1][key2]
        }
        if (customTimerHover == index) {
            return customization[type2][key2]
        }
        if (selectedCustomTimer == index) {
            return customization[type1][key1]
        }
        return customization[type2][key1]
    }

    return (
        <div className={'flex space-x-3 mb-5'}>
            {customTimer.map((item: any, index: number) => {
                return (
                    <button onClick={() => {
                        dispatch(setSelectedCustomTimer(index))
                    }}
                            style={{
                                // backgroundColor: selectedCustomTimer == index ? customization.tabSelected.backgroundColor : customization.tab.backgroundColor,
                                // color: selectedCustomTimer == index ? customization.tabSelected.color : customization.tab.color,
                                // borderColor: selectedCustomTimer == index ? customization.tabSelected.borderColor : customization.tab.borderColor
                                backgroundColor: renderBackgroundColor(index,'tabSelected','tab','backgroundColor','backgroundColorHover'),
                                color: renderBackgroundColor(index,'tabSelected','tab','color','colorHover'),
                                // borderColor: renderBackgroundColor(index,'tabSelected','tab','borderColor','borderColorHover')
                                borderColor: selectedCustomTimer == index ? customization.tabSelected.borderColor : customization.tab.borderColor
                            }}
                            onMouseEnter={() => {
                                setCustomTimerHover(index)
                            }}
                            onMouseLeave={() => {
                                setCustomTimerHover(null)
                            }}
                            className={cn('border px-3 py-2 rounded-full hover:bg-gray-200', selectedCustomTimer == index && 'text-white hover:bg-black')}
                            key={index}>
                        {item?.name}
                    </button>
                )
            })}
        </div>
    )
}

export default CustomTimerPomodoro
