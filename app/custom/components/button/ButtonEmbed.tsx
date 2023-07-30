"use client"
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Braces, ArrowLeft} from "lucide-react";
import {useState} from "react";
import FormInNotion from "@/app/custom/components/button/embed/FormInNotion";


const ButtonEmbed = () => {
    const [selection, setSelection] = useState('')

    const selectionRender = () => {
        switch (selection) {
            case 'formInNotion':
                return <FormInNotion/>
            default:
                return <>
                    <DialogHeader>
                        <DialogTitle>Embed Form</DialogTitle>
                        <DialogDescription>
                            Pick one of the embed option below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-3 gap-4 py-4">
                        <div onClick={() => setSelection('formInNotion')}
                             className={'border rounded-md px-4 py-2 cursor-pointer hover:bg-secondary'}>
                            Embed Form in Notion Page
                        </div>
                        <div className={'border rounded-md px-4 py-2 cursor-pointer hover:bg-secondary'}>
                            Embed Form in Website
                        </div>
                        <div className={'border rounded-md px-4 py-2 cursor-pointer hover:bg-secondary'}>
                            QR Code
                        </div>
                    </div>
                </>

        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={'bg-background px-5 py-3 rounded-md shadow-me font-medium flex items-center h-12 border-0 text-md'}
                    variant="outline">
                    <Braces className="mr-2 h-4 w-4"/>
                    Embed Form
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                {selection && <div onClick={() => setSelection('')}
                                   className={'flex hover:underline space-x-3 items-center cursor-pointer'}>
                    <ArrowLeft className="h-4 w-4"/>
                    Back</div>}
                {selectionRender()}
            </DialogContent>
        </Dialog>
    );
};

export default ButtonEmbed;
