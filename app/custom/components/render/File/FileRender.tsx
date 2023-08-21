"use client"
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import RequiredStar from "../RequireStar";
import {Button} from "@/components/ui/button";
import {Upload, Trash} from "lucide-react";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";


const FileRender = ({data, updateInputForm}: any) => {
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
        <div className={'mt-3'}>
            <Label htmlFor={'uploadFileForm'} className="flex flex-col space-y-2">
                <div>
                    {data.label}
                    {data.required && <RequiredStar/>}
                </div>
            </Label>
            {file ? (
                <div>
                    <div className="flex items-center space-x-2 mt-1">
                        <div className="flex w-full border px-3 py-2 rounded-md flex-col">
                            <p>{file}</p>
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
                    <Button asChild>
                        <Label htmlFor={'uploadFileForm'} className="flex space-x-2 mt-2 cursor-pointer">
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
            <span className={'text-xs text-muted-foreground'}>File size should be less than 5MB. </span>
        </div>
    );
};

export default FileRender;
