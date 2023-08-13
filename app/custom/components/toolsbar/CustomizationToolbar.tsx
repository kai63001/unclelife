import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";

const CustomizationToolbar = ({onChangeHook, form}: any) => {
    return (
        <AccordionItem value="customization">
            <AccordionTrigger>Customization</AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col space-y-2">
                    <p className="text-xs font-bold">
                        COVER PICTURE
                    </p>
                    <Button>
                        Upload Image
                    </Button>

                </div>
            </AccordionContent>
        </AccordionItem>

    )
}

export default CustomizationToolbar
