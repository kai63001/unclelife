"use client";
import { useAppDispatch } from "@/app/redux/hook";
import { setLayerWithId } from "@/app/redux/slice/formController.slice";

import ProBadge from "../../toolsbar/ProBadge";
import WidthLayout from "./customize/widthLayout";
import PlaceholderField from "./customize/PlaceholderField";
import { placeholderNotAllow } from "../Lib/AllowFieldTypeList";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CustomizeSheet = ({ id, data }: any) => {
  const dispatch = useAppDispatch();

  const onChange = (e: any, name: any, defaultData: any = "") => {
    const newE = e === defaultData ? null : e;
    dispatch(
      setLayerWithId({
        id: id,
        value: {
          ...data,
          pro: {
            ...data.pro,
            [name]: newE, //? true : false
          },
        },
      })
    );
  };

  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold">
        Customize <ProBadge />
      </h2>
      {!placeholderNotAllow.includes(data.type) && (
        <PlaceholderField data={data} onChange={onChange} />
      )}
      <WidthLayout data={data} onChange={onChange} />
      {!placeholderNotAllow.includes(data.type) && (
        <div className="flex items-center space-x-2 mt-2">
          <Switch
            onCheckedChange={(e) => {
              onChange(e, "hideFieldName", false);
            }}
            checked={data.pro?.hideFieldName}
            id="hideFieldName"
          />
          <Label htmlFor="hideFieldName">Hide Field Name</Label>
        </div>
      )}
    </div>
  );
};

export default CustomizeSheet;
