import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Input} from "@/components/ui/input";

const CustomTimerPomodoro = () => {
    return (
        <AccordionItem value="customTimer">
            <AccordionTrigger>
                Custom Timer
            </AccordionTrigger>
            <AccordionContent className={'pt-1 px-1'}>
                <div className={'flex space-x-3 '}>
                    <div className={'w-1/3'}>
                        <Input/>
                    </div>
                    <Input/>

                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

export default CustomTimerPomodoro
