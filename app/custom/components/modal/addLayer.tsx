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
import {useEffect, useState} from "react";
import {FormInput, ArrowBigDown, AlignJustify, Calendar, CheckSquare, Hash, AlignLeft,AtSign} from "lucide-react";

const ModalAddLayer = () => {
    const [open, setOpen] = useState(false);
    const [layer, setLayer] = useState<any>({
        label: "Title",
        name: "title",
        type: "",
    });
    const [selectOptionList, setSelectOptionList] = useState<any>([]);

    const dispatch = useAppDispatch();
    const {tableOfDatabase}: any = useAppSelector((state) => state.formReducer);
    const typeOfLayerSelection = [
        {
            name: "Text",
            icon: <FormInput className="h-10 w-10"/>,
        },
        {
            name: "Long",
            icon: <AlignLeft className="h-10 w-10"/>,
        },
        {
            name: "Email",
            icon: <AtSign className="h-10 w-10"/>,
        },
        {
            name: "Number",
            icon: <Hash className="h-10 w-10"/>,
        },
        {
            name: "Select",
            icon: <ArrowBigDown className="h-10 w-10"/>,
        },
        {
            name: "Multi Select",
            icon: <AlignJustify className="h-10 w-10"/>,
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

    const saveLayer = () => {
        let newLayer = layer
        if (layer.type === "select" || layer.type === "multi_select") {
            newLayer = {
                ...layer,
                options: selectOptionList,
            };
        }
        console.log(newLayer);
        console.log("saveLayer");

        dispatch(addMoreLayer(newLayer));
        setOpen(false);
    };

    // const filterTableFromType = (type: string) => {
    //   const filter = Object.keys(tableOfDatabase).filter((item) => {
    //     return tableOfDatabase[item].type === type;
    //   });
    //   return filter;
    // };

    //reset state when open
    useEffect(() => {
        if (open) {
            setLayer({
                label: "Title",
                name: "title",
                type: "",
            });
            setSelectOptionList([]);
        }
    }, [open]);

    // const addSelectOption = () => {
    //   setSelectOptionList([...selectOptionList, {
    //     name: "",
    //     color: "gray",
    //   }]);
    // };
    //
    // const deleteSelectOption = (index: number) => {
    //   console.log(index)
    //   const newList = selectOptionList.filter((item:any, i:number) => i !== index);
    //   setSelectOptionList(newList);
    // };

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
                            typeOfLayerSelection.map((item, index) => (
                                <div
                                    key={index}
                                    className={`border rounded-sm h-24 flex cursor-pointer hover:bg-gray-300`}
                                    onClick={() => {
                                        setLayer({
                                            ...layer,
                                            type: item.name,
                                        });
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
