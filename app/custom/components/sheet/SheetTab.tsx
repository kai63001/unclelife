"use client";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { setLayerWithId } from "@/app/redux/slice/formController.slice";

const SheetTab = ({ id }: any) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>({});
  const { layer } = useAppSelector((state) => state.formReducer);

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

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* setting icon */}
        <button className="hover:bg-[#ececec] rounded-sm px-2 cursor-pointer">
          <Settings className="w-4 h-4" />
        </button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update {data.name} Setting</SheetTitle>
          <SheetDescription className="text-primary select-none">
            <p className="text-lg font-medium">General</p>
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
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SheetTab;
