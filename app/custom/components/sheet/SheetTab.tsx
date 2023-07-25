"use client";
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
    Sheet,
    SheetTrigger,
} from "@/components/ui/sheet";
import {Settings, Trash} from "lucide-react";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {useEffect, useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {
    deleteLayerWithId,
    setLayerWithId,
} from "@/app/redux/slice/formController.slice";
import {Button} from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SheetTab = ({id}: any) => {
    const dispatch = useAppDispatch();
    const [data, setData] = useState<any>({});
    const {layer} = useAppSelector((state) => state.formReducer);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const layerFilter = layer.filter((item: any) => item.id === id);
        setData(layerFilter[0]);
    }, [id, layer]);

    const inputOnChange = (e: any, name: string) => {
        dispatch(
            setLayerWithId({
                id: id,
                value: {
                    ...data,
                    [name]: e, //? true : false
                },
            })
        );

        console.log("result :", data);
    };

    const confirmationDelete = () => {
        setOpen(true);
    };

    const handleDelete = () => {
        setOpen(false);
        dispatch(
            deleteLayerWithId({
                id: id,
            })
        );
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                {/* setting icon */}
                <button className="hover:bg-[#ececec] rounded-sm px-2 cursor-pointer">
                    <Settings className="w-4 h-4"/>
                </button>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader className="h-full">
                    <SheetTitle>Update {data.name} Setting</SheetTitle>
                    <div className="text-primary select-none flex flex-col justify-between h-full">
                        <div>
                            <span className="text-lg font-medium">General</span>
                            <div className="mt-2 flex flex-col space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        onCheckedChange={(e) => {
                                            inputOnChange(e, "required");
                                        }}
                                        checked={data.required}
                                        id="required"
                                    />
                                    <label
                                        htmlFor="required"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Required
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        onCheckedChange={(e) => {
                                            inputOnChange(e, "disable");
                                        }}
                                        checked={data.disable}
                                        id="disable"
                                    />
                                    <label
                                        htmlFor="disable"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Disable
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        onCheckedChange={(e) => {
                                            inputOnChange(e, "hidden");
                                        }}
                                        checked={data.hidden}
                                        id="hidden"
                                    />
                                    <label
                                        htmlFor="hidden"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Hidden
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/*Delete*/}
                        <div className="">
                            <Button variant={"destructive"} onClick={confirmationDelete}>
                                <Trash className="w-4 h-4"/>
                            </Button>
                            {open && (
                                <AlertDialog open={open}>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently
                                                delete your layer.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel onClick={() => setOpen(false)}>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete}>
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                        </div>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default SheetTab;
