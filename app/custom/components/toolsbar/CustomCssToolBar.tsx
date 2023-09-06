import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import ProBadge from "@/app/custom/components/toolsbar/ProBadge";
import {Textarea} from "@/components/ui/textarea";

const CustomCssToolBar = ({onChangeHook, form}: any) => {
    return (
        <AccordionItem value="customCSS">
            <AccordionTrigger className={'hover:no-underline'}>
                <div>
                    Custom CSS <ProBadge/>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col space-y-2">
                    <Textarea onChange={(e)=> {
                        onChangeHook({
                            ...form?.pro,
                            customizations: {
                                ...form?.pro?.customizations,
                                ['css']: e.target.value
                            }
                        }, 'pro')
                    }} />
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

export default CustomCssToolBar
