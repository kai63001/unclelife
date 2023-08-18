"use client"
import {DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useAppSelector} from "@/app/redux/hook";
import {useToast} from "@/components/ui/use-toast";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useState} from "react";

const FormInWebsite = () => {
    const {toast} = useToast();
    const [theme, setTheme] = useState('system')
    const {infomation} = useAppSelector((state) => state.formReducer);
    const copyLink = (idData = infomation.id) => {
        navigator.clipboard.writeText(
            `<iframe src="${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/form/${idData}${theme != 'system' ? '?theme='+theme : ''}" width="100%" height="500px" style="border:none;width:100%;"></iframe>`
        ).then(() => (
            toast({
                title: "Copied",
                description: "Link copied to clipboard",
            })
        ))
    };

    const themeSelection = (e: any) => {
        setTheme(e)
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Embed your form in a website</DialogTitle>
                <DialogDescription>
                    Integrate your form into your website by duplicating the HTML code provided below.
                </DialogDescription>
            </DialogHeader>
            <div>
                <div className={'border rounded-md px-5 py-2 flex items-center justify-between'}>
                    <span className={'text-sm'}>
                        {`
                            <iframe src="${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/form/${infomation.id}${theme != 'system' ? '?theme='+theme : ''}" width="100%" height="500px" style="border:none;width:100%;"></iframe>
                        `}
                    </span>
                    <Button onClick={() => copyLink()}>
                        COPY
                    </Button>
                </div>
                <Accordion type="single" collapsible className="w-full mt-4">
                    <AccordionItem value="Advance">
                        <AccordionTrigger>Advance Options</AccordionTrigger>
                        <AccordionContent>
                            <div className={'flex items-center justify-between'}>
                                <div>
                                    Theme
                                </div>
                                <Select onValueChange={themeSelection} defaultValue={'system'}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Theme"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Themes</SelectLabel>
                                            <SelectItem value="system">System</SelectItem>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
};

export default FormInWebsite
