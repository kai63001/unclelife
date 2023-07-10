"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CheckBoxRender = ({ data, updateInputForm }: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <div className="mt-1">
      <Checkbox
        disabled={data.disable}
        required={data.required}
        id={data.name}
        onCheckedChange={(e) => {
          updateInputForm(e, data.name, data.type);
        }}
        className="mr-1 select-none"
      />
      <Label
        htmlFor={data.name}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {data.label}
      </Label>
    </div>
  );
};

export default CheckBoxRender;
