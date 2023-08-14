import {Button} from "@/components/ui/button";
import {Upload} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

const UploadCoverPicture = ({onChangeHook, form}: any) => {
    const uploadCoverPicture = (e: any) => {
        console.log(e)
        // convert to blob
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            const base64data = reader.result;
            onChangeHook({
                ...form?.customizations,
                ['coverPicture']: base64data
            }, 'customizations')
        }

    }

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
            <Input type={'file'} onChange={uploadCoverPicture} id={'uploadCoverPicture'} className={'hidden'}/>
        </div>
    )
}

export default UploadCoverPicture
