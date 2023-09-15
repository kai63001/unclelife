"use client"
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Label} from "@/components/ui/label";
import {soundList} from "@/app/(dashboard)/widget/pomodoro/sound/sound";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {setSoundUrl, setSoundVolume} from "@/app/redux/slice/pomodoroController.slice";
import {Slider} from "@/components/ui/slider"
import {Button} from "@/components/ui/button";

const CustomSoundToolbar = () => {

    const dispatch = useAppDispatch()
    const {pomodoro} = useAppSelector(state => state.pomodoroReducer)

    const playSound = () => {
        const audio = new Audio(pomodoro.soundUrl || '/sound/endSound.mp3');
        //volume
        audio.volume = ((pomodoro.soundVolume || 100) / 100)
        audio.src = pomodoro.soundUrl || '/sound/endSound.mp3'
        console.log(pomodoro.soundUrl)
        audio.play().then(r => {
            console.log(r)
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <AccordionItem value="customSound">
            <AccordionTrigger>
                Custom Sound
            </AccordionTrigger>
            <AccordionContent className={'pt-1 px-1'}>
                <Label>Select alert sound:</Label>
                <div className={'flex items-center space-x-2'}>
                    <div className={'w-11/12'}>
                        <Select onValueChange={(e) => {
                            dispatch(setSoundUrl(e))
                        }} defaultValue={
                            pomodoro?.soundUrl || '/sound/endSound.mp3'
                        }>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a sound"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        soundList.map((sound, index) => (
                                            <SelectItem key={index} value={sound.url}>{sound.name}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={playSound}>
                        Play
                    </Button>

                </div>
                <div className={'mt-5'}>
                    <Label className={'pb-2 block'}>Sound Volume</Label>
                    <Slider
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={[pomodoro?.soundVolume || 100]}
                        onValueChange={([e]) => {
                            console.log(e)
                            dispatch(setSoundVolume(e))
                        }}
                    />
                </div>

            </AccordionContent>
        </AccordionItem>
    )
}

export default CustomSoundToolbar
