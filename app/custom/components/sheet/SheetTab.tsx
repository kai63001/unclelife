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
import { setLayerWithId } from "@/app/redux/slice/formController.slice";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AddOptions from "@/app/custom/components/sheet/AddOptions";
import DeleteLayer from "./components/DeleteLayer";
import CustomizeSheet from "./components/CustomizeSheet";
import RichTextEditor from "@/components/RichTextEditor";
import {
  disabledNotAllow,
  fieldNameNotAllow,
  helpFieldNotAllow,
  requiredNotAllow,
} from "./Lib/AllowFieldTypeList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GridColForOption } from "./optional/GridColForOption";
import { HeaderForOption } from "./optional/HeaderForOption";
import { Input } from "@/components/ui/input";

const SheetTab = ({ id }: any) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>({});
  const { layer, databaseId } = useAppSelector((state) => state.formReducer);

  useEffect(() => {
    const layerFilter = layer?.filter((item: any) => item.id === id);
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

  const checkThisTypeIsRadio = () => {
    switch (data.type) {
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

      <SheetContent className="pr-0">
        <SheetHeader className="">
          <SheetTitle className="font-bold">
            Update {data?.type?.toUpperCase()} Field
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="text-primary select-none flex overflow-y-auto flex-col justify-between h-full pr-5">
          <div>
            <span className="text-lg font-medium">General</span>
            <div className={"mt-2 flex flex-col space-y-3"}>
              {!fieldNameNotAllow.includes(data?.type) && (
                <div>
                  <Label htmlFor={"name"} className="font-semibold">
                    Name :
                  </Label>
                  <Input
                    disabled={!!databaseId}
                    id="name"
                    value={data?.name}
                    onChange={(e: any) => {
                      inputOnChange(e, "name");
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    This is the name of the field in your database.
                  </p>
                </div>
              )}
              {!fieldNameNotAllow.includes(data?.type) && (
                <div>
                  <Label htmlFor={"label"} className="font-semibold">
                    Field Label :
                  </Label>
                  <RichTextEditor
                    content={data?.label}
                    minHeight={50}
                    onChange={(e: any) => {
                      inputOnChange(e, "label");
                    }}
                  />
                </div>
              )}
              {!helpFieldNotAllow.includes(data?.type) && (
                <>
                  <div>
                    <Label htmlFor={"help"} className="font-semibold">
                      Field Help :
                    </Label>
                    <RichTextEditor
                      content={data?.help}
                      minHeight={80}
                      onChange={(e: any) => {
                        inputOnChange(e, "help");
                      }}
                    />
                  </div>
                  <div className="flex items-center pb-5 space-x-2">
                    <Switch
                      onCheckedChange={(e: any) => {
                        inputOnChange(e, "helpPositionAboveInput");
                      }}
                      id="fieldHelpSwitch"
                      checked={
                        data?.helpPositionAboveInput === undefined
                          ? true
                          : data?.helpPositionAboveInput
                      }
                    />
                    <label
                      htmlFor={"fieldHelpSwitch"}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                    >
                      Field Help Above Input
                    </label>
                  </div>
                </>
              )}
            </div>
            <hr />
            <div className="mt-5 grid grid-cols-2 gap-4">
              {["required", "disable", "hidden"]
                ?.filter((item) => {
                  if (item == "required")
                    return !requiredNotAllow.includes(data?.type);
                  if (item == "disable")
                    return !disabledNotAllow.includes(data?.type);
                  return true;
                })
                .map((item, index) => (
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
            {checkThisTypeIsOption() && (
              <div className={"mt-2"}>
                {checkThisTypeIsRadio() && (
                  <>
                    <GridColForOption data={data} />
                    <HeaderForOption data={data} />
                  </>
                )}
                <AddOptions data={data} />
              </div>
            )}
            <CustomizeSheet id={id} data={data} />
          </div>

          {/*Delete*/}
          <DeleteLayer id={id} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SheetTab;
