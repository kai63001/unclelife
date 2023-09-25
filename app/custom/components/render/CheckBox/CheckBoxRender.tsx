"use client";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

const CheckBoxRender = ({data, updateInputForm, error}: any) => {
    return data.hidden ? (
        <></>
    ) : (
        <>
            <Checkbox
                disabled={data.disable}
                required={data.required}
                id={data.label}
                onCheckedChange={(e) => {
                    updateInputForm(e, data);
                }}
                className={`mr-1 select-none ${error && "border border-red-500"}`}
            />
            <Label
                htmlFor={data.label}
                className={` font-medium text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${error && "text-red-500"}`}
            >
                {data.required && (
                    <span className="text-red-500">*</span>
                )} {data.label}
            </Label>
        </>
    );
};

export default CheckBoxRender;
