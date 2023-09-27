"use client";

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { useEffect, useState } from "react";
import {
  setLayerWithId,
} from "@/app/redux/slice/formController.slice";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import AddOptions from "@/app/custom/components/sheet/AddOptions";
import DeleteLayer from "./components/DeleteLayer";
import CustomizeSheet from "./components/CustomizeSheet";

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
          [name]: e,
        },
      })
    );

    // console.log("result :", data);
  };

  const checkThisTypeIsOption = () => {
    switch (data.type) {
      case "select":
        return true;
      case "multi_select":
        return true;
      case "radio_button":
        return true;
      default:
        return false;
    }
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
        <SheetHeader className="h-full">
          <SheetTitle className="font-bold">Update {data.name} Field</SheetTitle>
          <div className="text-primary select-none flex flex-col justify-between h-full">
            <div>
              <span className="text-lg font-medium">General</span>
              <div className={"mt-2 flex flex-col space-y-3"}>
                <div>
                  <Label htmlFor={"label"}>Field Name :</Label>
                  <Input
                    id={"label"}
                    name={"label"}
                    value={data.label}
                    onChange={(e) => {
                      inputOnChange(e.target.value, "label");
                    }}
                  />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {["required", "disable", "hidden"].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Switch
                      onCheckedChange={(e: any) => {
                        inputOnChange(e, item);
                      }}
                      checked={data[item]}
                      id={item}
                    />
                    <label
                      htmlFor={item}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
              <CustomizeSheet id={id} data={data}/>
              {checkThisTypeIsOption() && (
                <div className={"mt-2"}>
                  <AddOptions data={data} />
                </div>
              )}
            </div>

            {/*Delete*/}
            <DeleteLayer id={id}/>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SheetTab;
