"use client";
import { Checkbox } from "@/components/ui/checkbox";

const CheckBoxRender = ({ data }: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <div className="mt-1">
      <Checkbox
        disabled={data.disable}
        required={data.required}
        id={data.label}
        className="mr-1"
      />
      <label
        htmlFor={data.label}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {data.label}
      </label>
    </div>
  );
};

export default CheckBoxRender;
