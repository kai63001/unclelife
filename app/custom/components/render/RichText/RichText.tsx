import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import RequiredStar from "../RequireStar";
import React from "react";

const RichTextRender = ({data, updateInputForm, error}: any) => {
    return data.hidden ? (
        <></>
    ) : (
        <div>
            <Label htmlFor={data.label} className="">
                {data.label}
                {data.required && <RequiredStar/>}
            </Label>
            <Textarea
                onChange={(e) => updateInputForm(e.target.value, data)}
                name={data.label}
                id={data.label}
                className={`mt-1 block w-full ${error ? 'border-red-500' : ''}`}
                placeholder={data?.placeholder}
                disabled={data.disable}
                required={data.required}
            />
            {error && (
                <div className="text-red-500 text-xs mt-1">
                    {error}
                </div>
            )}
        </div>
    );
};

export default RichTextRender;
