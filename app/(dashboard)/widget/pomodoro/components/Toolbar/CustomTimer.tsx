"use client"
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Input} from "@/components/ui/input";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {setCustomTimer} from "@/app/redux/slice/pomodoroController.slice";
import {Button} from "@/components/ui/button";
import {PlusCircle, Trash} from "lucide-react";

const CustomTimerPomodoroToolBar = () => {
    const dispatch = useAppDispatch()
    const {customTimer} = useAppSelector(state => state.pomodoroReducer)

    const handleCustomTimer = (index: number, name: any, value: any) => {
        let newCustomTimer = [...customTimer]
        console.log(newCustomTimer)
        newCustomTimer[index] = {
            ...newCustomTimer[index],
            [name]: value
        }
        dispatch(setCustomTimer(newCustomTimer))
    }

    const addCustomTimer = () => {
        let newCustomTimer = [...customTimer]
        newCustomTimer.push({
            name: 'Work',
            time: 5
        })
        dispatch(setCustomTimer(newCustomTimer))
    }

    const removeCustomTimer = (index: number) => {
        let newCustomTimer = [...customTimer]
        newCustomTimer.splice(index, 1)
        dispatch(setCustomTimer(newCustomTimer))
    }

    return (
        <AccordionItem value="customTimer">
            <AccordionTrigger>
                Custom Timer
            </AccordionTrigger>
            <AccordionContent className={'pt-1 px-1'}>
                {customTimer.map((item: any, index: number) => {
                    return (
                        <div className={'flex space-x-3 mb-2'} key={index}>
                            <div className={'w-1/3'}>
                                <Input type={'number'} onChange={(e) => {
                                    handleCustomTimer(index, 'time', e.target.value)
                                }} value={item?.time} placeholder={'25'}/>
                            </div>
                            <Input onChange={(e) => {
                                handleCustomTimer(index, 'name', e.target.value)
                            }} value={item?.name} placeholder={'Pomodoro'}/>
                            <Button onClick={()=>removeCustomTimer(index)} size={'icon'} variant={'secondary'} className={'px-3'}>
                                <Trash size={16}/>
                            </Button>
                        </div>
                    )
                })}
                <Button onClick={addCustomTimer} variant={'outline'}>
                    <PlusCircle className={'mr-2'} size={16}/>
                    Add Custom Timer
                </Button>
            </AccordionContent>
        </AccordionItem>
    )
}

export default CustomTimerPomodoroToolBar
