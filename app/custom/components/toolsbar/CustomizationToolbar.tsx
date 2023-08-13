import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Upload} from "lucide-react";
import ProBadge from "@/app/custom/components/toolsbar/ProBadge";

const CustomizationToolbar = ({onChangeHook, form}: any) => {
    return (
        <AccordionItem value="customization">
            <AccordionTrigger className={'hover:no-underline'}>
                <div>
                    Customization <ProBadge/>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col space-y-2">
                    <p className="text-xs font-bold">
                        COVER PICTURE
                    </p>
                    <Button>
                        Upload Image
                        <Upload className={'w-4 h-4 ml-2'}/>
                    </Button>
                </div>
            </AccordionContent>
        </AccordionItem>

    )
}

export default CustomizationToolbar
