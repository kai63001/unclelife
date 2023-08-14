import {Button} from "@/components/ui/button";
import {Upload} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

const UploadCoverPicture = () => {
    return (
        <div className={'flex flex-col space-y-2'}>
            <p className="text-xs font-bold">
                COVER PICTURE
            </p>
            <Button asChild>
                <Label className={'cursor-pointer'} htmlFor={'uploadCoverPicture'}>
                    Upload Image
                    <Upload className={'w-4 h-4 ml-2'}/>
                </Label>
            </Button>
            <Input type={'file'} id={'uploadCoverPicture'} className={'hidden'}/>
        </div>
    )
}

export default UploadCoverPicture
