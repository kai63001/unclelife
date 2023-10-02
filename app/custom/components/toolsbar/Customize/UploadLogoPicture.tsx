"use client"
import {Button} from "@/components/ui/button";
import {Upload, Trash} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {checkKeyForm, convertImageToWebp} from "@/lib/utils";
import {useState} from "react";
import {Icons} from "@/components/Icons";

const UploadLogoPicture = ({onChangeHook, form}: any) => {
    const [uploading, setUploading] = useState(false)

    const uploadLogoPicture = (e: any) => {
        setUploading(true)
        const key = checkKeyForm(onChangeHook, form)
        // convert to blob
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            const base64data = reader.result;
            const {data: uriImage} = await convertImageToWebp(base64data, key, 'logo')
            onChangeHook({
                ...form?.pro,
                customizations: {
                    ...form?.pro?.customizations,
                    ['logoPicture']: uriImage.data.publicURL
                }
            }, 'pro')
            setUploading(false)
        }
    }

    const removeCoverPicture = () => {
        onChangeHook({
            ...form?.pro,
            customizations: {
                ...form?.pro?.customizations,
                ['logoPicture']: null
            }
        }, 'pro')
    }

    return (
        <div className={'flex flex-col space-y-2'}>
            <p className="text-xs font-bold">
                LOGO PICTURE
            </p>
            {form?.pro?.customizations?.logoPicture ? (
                <Button onClick={removeCoverPicture}>
                    Remove Image Cover
                    <Trash className={'w-4 h-4 ml-2'}/>
                </Button>
            ) : (
                <>
                    <Button disabled={uploading} asChild>
                        <Label className={'cursor-pointer'} htmlFor={'uploadLogoPicture'}>
                            {uploading && <Icons.spinner className="animate-spin mr-2 h-5 w-5" />}
                            Upload Image
                            <Upload className={'w-4 h-4 ml-2'}/>
                        </Label>
                    </Button>
                    <Input type={'file'} disabled={uploading} onChange={uploadLogoPicture} id={'uploadLogoPicture'}
                           accept="image/*" className={'hidden'}/>
                </>
            )}
        </div>
    )
}

export default UploadLogoPicture