import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import RequiredStar from "../RequireStar";
import {Button} from "@/components/ui/button";
import {Upload} from "lucide-react";

const FileRender = ({data, updateInputForm}: any) => {
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
                onChange={(e) => updateInputForm(e.target.value, data)}
                name={data.label}
                placeholder={data?.placeholder}
                id={'uploadFileForm'}
                disabled={data.disable}
                required={data.required}
                type={'file'}
            />
        </div>
    );
};

export default FileRender;
