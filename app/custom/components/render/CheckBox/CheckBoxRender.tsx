"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CheckBoxRender = ({ data }: any) => {
  return (
    <div className="mt-1">
      <Checkbox id="terms" className="mr-1" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {data.label}
      </label>
    </div>
  );
};

export default CheckBoxRender;
