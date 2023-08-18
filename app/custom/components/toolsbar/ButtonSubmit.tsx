import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Input} from "@/components/ui/input";
import ButtonSubmitTab from "@/app/custom/components/toolsbar/ButtonSubmitTab";

const ButtonSubmit = ({onChangeHook, form}: any) => {
    return (
        <AccordionItem value="buttonSubmit">
            <AccordionTrigger>Button Submit</AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col space-y-2">
                    <div className="text-xs font-bold">
                        TEXT OF BUTTON SUBMIT <span className="text-red-500">*</span>
                    </div>
                    <Input
                        placeholder="Submit"
                        className="focus:outline-none focus-visible:ring-0 text-primary"
                        onChange={(e) =>
                            onChangeHook(
                                {
                                    ...form?.button,
                                    text: e.target.value,
                                },
                                "button"
                            )
                        }
                        value={form?.button?.text}
                    />
                    <div className="text-xs font-bold">
                        BUTTON COLOR <span className="text-red-500">*</span>
                    </div>
                    <Input
                        placeholder="Submit"
                        type="color"
                        className="focus:outline-none focus-visible:ring-0 text-black p-0 w-10 border-0"
                        onChange={(e) =>
                            onChangeHook(
                                {
                                    ...form?.button,
                                    color: e.target.value,
                                },
                                "button"
                            )
                        }
                        value={form?.button?.color}
                    />
                    <div className="text-xs font-bold">
                        POSITION <span className="text-red-500">*</span>
                    </div>
                    <ButtonSubmitTab/>

                </div>
            </AccordionContent>
        </AccordionItem>
    )

}

export default ButtonSubmit;
