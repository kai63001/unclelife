"use client"
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {setBackGroundColor, setTypeBackground} from "@/app/redux/slice/pomodoroController.slice";
import {Input} from "@/components/ui/input";

const BackgroundPomodoroToolBar = () => {
    const dispatch = useAppDispatch()
    const {pomodoro} = useAppSelector(state => state.pomodoroReducer)

    const handleBackgroundColor = (e: any) => {
        dispatch(setBackGroundColor(e.target.value))
    }

    return (
        <AccordionItem value="background">
            <AccordionTrigger>
                Background
            </AccordionTrigger>
            <AccordionContent className={'pt-1 px-1'}>
                <div className="flex items-center space-x-2 mb-2">
                    <Switch onCheckedChange={(e) => {
                        const value = e ? 'image' : 'color'
                        dispatch(setTypeBackground(value))
                    }} checked={pomodoro.typeBackground === 'image'} id="backgroundType"/>
                    <Label htmlFor="backgroundType">
                        Background Image
                    </Label>
                </div>
                {pomodoro.typeBackground === 'image' ? (
                    <div>
                        <p className={'text-muted-foreground font-bold'}>
                            Background Image
                        </p>
                    </div>
                ) : (
                    <div>
                        <p className={'text-muted-foreground font-bold mb-2'}>
                            Background Color
                        </p>
                        <Input
                            type={'color'}
                            className={'py-1 overflow-hidden'}
                            onChange={handleBackgroundColor}
                            value={pomodoro.backgroundColor}
                        />
                    </div>
                )}
            </AccordionContent>
        </AccordionItem>
    )
}

export default BackgroundPomodoroToolBar
