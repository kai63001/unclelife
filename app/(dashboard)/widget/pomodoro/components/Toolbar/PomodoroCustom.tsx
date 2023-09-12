"use client"

import * as React from "react"
import {Check, ChevronsUpDown} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const fonts = [
    {
        value: "inter",
        label: "Inter",
    },
    {
        value: "dot_gothic_16",
        label: "Dot Gothic 16",
    },
    {
        value: "roboto_mono",
        label: "Roboto Mono",
    }
]
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Label} from "@/components/ui/label";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {setFont} from "@/app/redux/slice/pomodoroController.slice";

const PomodoroCustomToolBar = () => {
    const dispatch = useAppDispatch()
    const {pomodoro} = useAppSelector(state => state.pomodoroReducer)
    const [open, setOpen] = React.useState(false)
    const [value, setValue]:any = React.useState(pomodoro.font || "")
    return (
        <AccordionItem value="pomodoroCustom">
            <AccordionTrigger>
                Pomodoro Custom
            </AccordionTrigger>
            <AccordionContent className={'pt-1 px-1'}>
                <Label className={'pb-2 block text-muted-foreground'}>
                    Font :
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                        >
                            {value
                                ? fonts.find((font) => font.value === value)?.label
                                : "Select Font"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[330px] p-0">
                        <Command>
                            <CommandInput placeholder="Search font..."/>
                            <CommandEmpty>No font found.</CommandEmpty>
                            <CommandGroup>
                                {fonts.map((font) => (
                                    <CommandItem
                                        key={font.value}
                                        onSelect={(currentValue) => {
                                            let fontValue = currentValue.replace(/\s/g, '_')
                                            setValue(fontValue === value ? "inter" : fontValue)
                                            dispatch(setFont(fontValue === value ? "inter" : fontValue))
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === font.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {font.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </AccordionContent>
        </AccordionItem>
    )
}

export default PomodoroCustomToolBar
