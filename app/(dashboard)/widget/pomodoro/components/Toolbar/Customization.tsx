import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const CustomizationPomodoroToolbar = () => {
    return (
        <AccordionItem value="customization">
            <AccordionTrigger>
                Customization
            </AccordionTrigger>
            <AccordionContent className={'pt-1 px-1'}>
                asd
            </AccordionContent>
        </AccordionItem>
    )
}

export default CustomizationPomodoroToolbar
