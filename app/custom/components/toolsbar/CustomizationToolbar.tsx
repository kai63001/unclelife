import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import ProBadge from "@/app/custom/components/toolsbar/ProBadge";
import UploadCoverPicture from "@/app/custom/components/toolsbar/Customize/UploadCoverPicture";
import HideBranding from "@/app/custom/components/toolsbar/Customize/HideBranding";
import UploadLogoPicture from "./Customize/UploadLogoPicture";
import { DarkmodeSelectionForm } from "./Customize/DarkmodeSelection";

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
                    <UploadCoverPicture onChangeHook={onChangeHook} form={form}/>
                    <UploadLogoPicture onChangeHook={onChangeHook} form={form}/>
                    <HideBranding onChangeHook={onChangeHook} form={form}/>
                    <DarkmodeSelectionForm onChangeHook={onChangeHook} form={form}/>
                </div>
            </AccordionContent>
        </AccordionItem>

    )
}

export default CustomizationToolbar
