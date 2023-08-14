import {Button} from "@/components/ui/button";
import {Upload} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {checkKeyForm, convertImageToWebp} from "@/lib/utils";

const UploadCoverPicture = ({onChangeHook, form}: any) => {


    const uploadCoverPicture = (e: any) => {
        const key = checkKeyForm(onChangeHook, form)
        console.log(key)
        // convert to blob
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            const base64data = reader.result;
            const {data:uriImage} = await convertImageToWebp(base64data, key)
            console.log(uriImage.data.publicURL)
            onChangeHook({
                ...form?.customizations,
                ['coverPicture']: uriImage.data.publicURL
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
