"use client"
import {Label} from "@/components/ui/label";
import RequiredStar from "@/app/custom/components/render/RequireStar";
import {useState} from "react";

const RadioRender = ({ data, updateInputForm }: any) => {
    const [selected, setSelected] = useState<any>(null);

    const inputOnChange = (e: any) => {
        if(data.disable) return
        setSelected(e);
        updateInputForm(e, data);
    }

    return data.hidden ? (
        <></>
    ) : (
        <div className="mb-1">
            <Label htmlFor={data.label} className="">
                {data.label}
                {data.required && <RequiredStar />}
            </Label>
            <div className="mt-1 flex space-y-2 flex-col">
                {data?.options?.map((item: any, index: number) => {
                    return (
                        <div key={index} onClick={()=>inputOnChange(item.name)} className={`flex ${data.disable ? 'cursor-not-allowed' : 'cursor-pointer'} items-center w-full ${selected == item.name ? 'bg-primary' : 'bg-secondary'} py-3 rounded-sm select-none`}>
                            <label className={`ml-3 block text-sm font-medium ${selected == item.name ? 'text-secondary' : 'text-primary'} cursor-pointer`}>
                                {item.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RadioRender
