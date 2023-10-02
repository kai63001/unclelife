"use client";
import { useAppDispatch } from "@/app/redux/hook";
import { setLayerWithId } from "@/app/redux/slice/formController.slice";

import ProBadge from "../../toolsbar/ProBadge";
import WidthLayout from "./customize/widthLayout";
import PlaceholderField from "./customize/PlaceholderField";
import { placeholderNotAllow } from "../Lib/AllowFieldTypeList";

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
    </div>
  );
};

export default CustomizeSheet;
