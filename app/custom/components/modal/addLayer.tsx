import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {addMoreLayer} from "@/app/redux/slice/formController.slice";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FormInput, ArrowBigDown, AlignJustify, Calendar, CheckSquare, Hash, AlignLeft, AtSign } from "lucide-react";

const ModalAddLayer = () => {
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();
    const {layer}: any = useAppSelector((state) => state.formReducer);

    const typeOfLayerSelection = [
        {
            name: "Text",
            icon: <FormInput className="h-10 w-10"/>,
            type: "text"
        },
        {
            name: "Long",
            icon: <AlignLeft className="h-10 w-10"/>,
            type: "long"
        },
        {
            name: "Email",
            icon: <AtSign className="h-10 w-10"/>,
            type: "email"
        },
        {
            name: "Number",
            icon: <Hash className="h-10 w-10"/>,
            type: "number"
        },
        {
            name: "Select",
            icon: <ArrowBigDown className="h-10 w-10"/>,
            type: "select"
        },
        {
            name: "Multi Select",
            icon: <AlignJustify className="h-10 w-10"/>,
            type: "multi_select"
        },
        {
            name: "Date",
            icon: <Calendar className="h-10 w-10"/>,
        },
        {
            name: "Checkbox",
            icon: <CheckSquare className="h-10 w-10"/>,
        }
    ];

    const randomTitleWithType = (type: string) => {
        switch (type) {
            case "text":
                return "Text";
            case "long":
                return "Long Text";
            case "email":
                return "Email";
            case "number":
                return "Number";
            case "select":
                return "Select";
            case "multi_select":
                return "Multi Select";
            default:
                return "Text";
        }
    }

    const addLayer = (type: string) => {
        const newLayer = {
            id: layer.length + 1,
            name: "New Layer",
            type: type,
            label: randomTitleWithType(type)
        }
        dispatch(addMoreLayer(newLayer));
        //close modal
        setOpen(false);
    }

    return (
        <div>
            <Dialog
                open={open}
                onOpenChange={(e) => {
                    setOpen(e);
                }}
            >
                <DialogTrigger asChild>
                    <Button variant="outline">Add Custom Block</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px]">
                    <DialogHeader>
                        <DialogTitle>Add Input Form</DialogTitle>
                        <DialogDescription>
                            Develop and Structure Data Collection Fields for a Notion-Based
                            Form
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-4 gap-4 py-4">
                        {
                            typeOfLayerSelection.map((item: any, index) => (
                                <div
                                    key={index}
                                    className={`border rounded-sm h-32 flex cursor-pointer hover:bg-gray-300`}
                                    onClick={() => {
                                        addLayer(item.type)
                                    }}
                                >
                                    <div className={`m-auto`}>
                                        <div className={`flex justify-center`}>
                                            {item.icon}
                                        </div>
                                        <strong className="block">{item.name}</strong>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ModalAddLayer;
