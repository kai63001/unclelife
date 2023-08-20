"use client"
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import RequiredStar from "../RequireStar";
import {Button} from "@/components/ui/button";
import {Upload} from "lucide-react";

const FileRender = ({data, updateInputForm}: any) => {

    const onFileChange = (e: any) => {
        const file = e.target.files[0];
        //limit file size 5mb
        if (file.size > 5000000) {
            alert("File size should be less than 5MB.");
            return;
        }
        if (file) {
            const reader = new FileReader();
            // to base64
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = reader.result;
                console.log("base64", base64);
                const name = file.name;
                updateInputForm(`${base64}__name__${name}`, data);
            }
        }
    }


    return data.hidden ? (
        <></>
    ) : (
        <div className={'mt-3'}>
            <Label htmlFor={'uploadFileForm'} className="flex flex-col space-y-2">
                <div>
                    {data.label}
                    {data.required && <RequiredStar/>}
                </div>
            </Label>
            <Button asChild>
                <Label htmlFor={'uploadFileForm'} className="flex flex-col space-y-2 mt-2 cursor-pointer">
                    Upload File
                    <Upload className="ml-2 h-4 w-4"/>
                </Label>
            </Button>
            <Input
                className="hidden"
                onChange={onFileChange}
                name={data.label}
                placeholder={data?.placeholder}
                id={'uploadFileForm'}
                disabled={data.disable}
                required={data.required}
                type={'file'}
            />
            <span className={'text-xs text-muted-foreground'}>File size should be less than 5MB. </span>
        </div>
    );
};

export default FileRender;
