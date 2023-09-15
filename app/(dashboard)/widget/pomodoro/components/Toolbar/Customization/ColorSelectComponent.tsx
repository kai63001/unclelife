"use client"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useAppDispatch} from "@/app/redux/hook";
import {setCustomization} from "@/app/redux/slice/pomodoroController.slice";
import {Button} from "@/components/ui/button";
import {EyeClosedIcon, EyeOpenIcon} from "@radix-ui/react-icons";
import {useState} from "react";

const ColorSelectComponent = ({name, keyValue, type, label, value, hideHidden = false}: any) => {
    const [color, setColor] = useState(value || '#000000')
    const dispatch = useAppDispatch()
    const handleChange = (value: any) => {
        dispatch(setCustomization({
            type,
            key: keyValue,
            value
        }))
    }

    const handleTransparent = () => {
        if (value == 'transparent') {
            if (color == 'transparent') {
                handleChange('#000000')
                setColor('#000000')
                return
            }
            handleChange(color)
            return
        }
        handleChange('transparent')
    }

    return (
        <div>
            <Label htmlFor={name}
                   className={'block text-sm font-medium text-gray-700'}>
                {label}
            </Label>
            <div className={'mt-1 flex space-x-2'}>
                <Input onChange={(e) => {
                    handleChange(e.target.value)
                    setColor(e.target.value)
                }} type="color" value={value} name={name} id="tabSeletedBackgroundColor"
                       className={'px-0 py-0 h-10 w-10 rounded-none'}/>
                {!hideHidden && (
                    <Button onClick={() => {
                        handleTransparent()
                    }} variant={'outline'} size={'icon'}>
                        {value == 'transparent' ? (
                            <EyeClosedIcon className={'w-4 h-4'}/>
                        ) : (
                            <EyeOpenIcon className={'w-4 h-4'}/>
                        )}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ColorSelectComponent
