import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Braces} from "lucide-react";


const ButtonEmbed = () => {
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
                <DialogHeader>
                    <DialogTitle>Embed Form</DialogTitle>
                    <DialogDescription>
                        Pick one of the embed option below.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4 py-4">
                    <div className={'border rounded-md px-4 py-2 cursor-pointer hover:bg-secondary'}>
                        Embed Form in Notion Page
                    </div>
                    <div className={'border rounded-md px-4 py-2 cursor-pointer hover:bg-secondary'}>
                        Embed Form in Website
                    </div>
                    <div className={'border rounded-md px-4 py-2 cursor-pointer hover:bg-secondary'}>
                        QR Code
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ButtonEmbed;
