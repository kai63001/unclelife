"use client"
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import RequiredStar from "../RequireStar";
import {Button} from "@/components/ui/button";
import {Upload, Trash} from "lucide-react";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import * as React from "react";


const FileRender = ({data, updateInputForm, error}: any) => {
    const [file, setFile] = useState<any>(null);
    const {toast} = useToast();

    const onFileChange = (e: any) => {
        const file = e.target.files[0];
        //limit file size 5mb
        if (file.size > 5000000) {
            toast({
                description: "File size should be less than 5MB.",
                title: "File size too large",
                variant: "destructive",
            })
            return;
        }
        if (file) {
            const reader = new FileReader();
            // to base64
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = reader.result;
                const name = file.name;
                updateInputForm(`${base64}__name__${name}`, data);
                //set file name
                setFile(name);
            }
        }
    }


    return data.hidden ? (
        <></>
    ) : (
        <>
            <Label htmlFor={'uploadFileForm'} className="flex flex-col space-y-2 text-lg">
                <div>
                    {data.label}
                    {data.required && <RequiredStar/>}
                </div>
            </Label>
            {file ? (
                <div>
                    <div className="flex items-center space-x-2 shadow-sm">
                        <div className="flex w-full border px-3 py-2 rounded-md overflow-hidden">
                            <p className={'text-ellipsis overflow-hidden max-w-[370px] whitespace-nowrap'}>{file}</p>
                        </div>
                        <Button asChild onClick={() => {
                            setFile(null);
                            updateInputForm(null, data);
                        }}>
                            <Label className="flex flex-col space-y-2 cursor-pointer">
                                <Trash className="h-4 w-4"/>
                            </Label>
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <Button className={error && 'bg-red-500 text-white shadow-sm'} asChild>
                        <Label htmlFor={'uploadFileForm'} className={`flex space-x-2 cursor-pointer`}>
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
                </>
            )}
            <div className={'text-xs text-muted-foreground mt-1'}>File size should be less than 5MB. </div>
            {error && (
                <div className="text-red-500 text-xs mt-1">
                    {error}
                </div>
            )}
        </>
    );
};

export default FileRender;
