import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import ProBadge from "@/app/custom/components/toolsbar/ProBadge";
import UploadCoverPicture from "@/app/custom/components/toolsbar/Customize/UploadCoverPicture";

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
                    <UploadCoverPicture/>
                </div>
            </AccordionContent>
        </AccordionItem>

    )
}

export default CustomizationToolbar
