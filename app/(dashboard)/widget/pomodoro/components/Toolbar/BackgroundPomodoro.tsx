"use client"
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {
    setBackGroundColor,
    setBackGroundImage,
    setKeyPomodoro,
    setTypeBackground
} from "@/app/redux/slice/pomodoroController.slice";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProBadge from "@/app/custom/components/toolsbar/ProBadge";
import {Check, Upload, Wallpaper} from "lucide-react";
import Image from "next/image"
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {supabase} from "@/lib/supabase";
import {useEffect, useState} from "react";
import {uploadPomodoroWallpaper} from "@/lib/pomodoro";
import {Icons} from "@/components/Icons";
import {useSupabase} from "@/app/hook/supabase-provider";
import {cn} from "@/lib/utils";

const BackgroundPomodoroToolBar = () => {
    const dispatch = useAppDispatch()
    const {pomodoro, key} = useAppSelector(state => state.pomodoroReducer)
    const [images, setImages] = useState<any>([])
    const [withUrl, setWithUrl] = useState(false)
    const [uploading, setUploading] = useState(false)
    const {user} = useSupabase();


    useEffect(() => {
        if (!supabase) return
        const fetchImages = async () => {
            const {data, error} = await supabase.from('pomodoro_wallpaper').select('*')
            if (error) {
                console.log(error)
                return
            }
            setImages(data)
        }
        fetchImages().then(r => r)

    }, []);

    const handleBackgroundColor = (e: any) => {
        dispatch(setBackGroundColor(e.target.value))
    }

    const handleSelectImage = (image: string) => {
        dispatch(setBackGroundImage(image))
    }

    const uploadWallpaper = (e: any) => {
        setUploading(true)
        let newKey = key
        if (key?.length <= 0) {
            // key is uuid random
            newKey = crypto.randomUUID();
            dispatch(setKeyPomodoro(newKey))
        }
        // convert to blob
        const file = e.target.files[0];
        //check file size
        if (file.size > 10000000) {
            alert('File size is too large')
            setUploading(false)
            return
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            const base64data = reader.result;
            const {data: uriImage} = await uploadPomodoroWallpaper(base64data, newKey)
            dispatch(setBackGroundImage(uriImage.data.publicURL))
            setUploading(false)
        }
    }

    return (
        <AccordionItem value="background">
            <AccordionTrigger>
                Background
            </AccordionTrigger>
            <AccordionContent className={'pt-1 px-1'}>
                <div className="flex items-center space-x-2 mb-2">
                    <Switch onCheckedChange={(e) => {
                        const value = e ? 'image' : 'color'
                        dispatch(setTypeBackground(value))
                    }} checked={pomodoro.typeBackground === 'image'} id="backgroundType"/>
                    <Label htmlFor="backgroundType">
                        Background Image
                    </Label>
                </div>
                {pomodoro.typeBackground === 'image' ? (
                    <div>
                        <p className={'text-muted-foreground font-bold'}>
                            Background Image
                        </p>
                        {!withUrl && (
                            <div>
                                <Input disabled={uploading || !user?.is_subscribed} type={'file'}
                                       onChange={uploadWallpaper} accept="image/*"
                                       id={'uploadWallpaperPomodoro'} name={'uploadWallpaperPomodoro'}
                                       className={'py-1 hidden'}/>
                                <Button disabled={uploading || !user?.is_subscribed} className={cn('w-full', (uploading || !user?.is_subscribed) ? 'bg-gray-300 hover:bg-gray-400 cursor-not-allowed' : 'cursor-pointer')} asChild>
                                    <Label htmlFor={'uploadWallpaperPomodoro'}
                                           className={"flex items-center mt-1"}>
                                        {uploading ? (
                                            <Icons.spinner className="animate-spin mr-2 h-5 w-5"/>
                                        ) : (
                                            <Upload className={'h-4 w-4 mr-2'}/>
                                        )}
                                        <span className={'mr-2'}>
                                        Upload File
                                    </span>
                                        <ProBadge/>
                                    </Label>
                                </Button>
                                <span className={'text-muted-foreground text-xs'}>
                            {/*    limit 10mb*/}
                                    Support only image file. Max size 10mb
                            </span>
                                <div className={'border my-2'}>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className={'w-full'} variant="outline">
                                            <Wallpaper className={'h-4 w-4 mr-2'}/>
                                            Choose Wallpaper
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[700px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Choose Wallpaper
                                            </DialogTitle>
                                            <DialogDescription>
                                                Choose a wallpaper for your pomodoro
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid grid-cols-2 gap-2 py-4">
                                            {images.map((item: any, index: any) => (
                                                <AspectRatio
                                                    key={index}
                                                    ratio={16 / 9}
                                                    onClick={() => handleSelectImage(item.wallpaperUrl)}
                                                    className={'rounded-md overflow-hidden cursor-pointer'}>
                                                    <Image
                                                        src={item.wallpaperUrl}
                                                        fill
                                                        alt={item.wallpaperName}
                                                        className={'object-cover'}
                                                    />
                                                    {pomodoro.backgroundImage === item.wallpaperUrl && (
                                                        <div className={'absolute button-0 h-full right-0'}>
                                                            <Check className={'text-red-500 mr-2 mt-2'}/>
                                                        </div>
                                                    )}
                                                </AspectRatio>
                                            ))}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )}
                        <div className={'mt-2 flex items-center space-x-3'}>
                            <Switch onCheckedChange={(e) => {
                                setWithUrl(e)
                            }} checked={withUrl} name={'withUrl'} id={'withUrl'}/>
                            <Label htmlFor={'withUrl'}>
                                With URL Image <ProBadge/>
                            </Label>
                        </div>
                        {withUrl && (
                            <div className={'mt-2'}>
                                <Input className={''} onChange={(e) => {
                                    dispatch(setBackGroundImage(e.target.value))
                                }} value={pomodoro.backgroundImage.indexOf('qpjxzzbztzjosvnoirap') >= 0 ? '' : pomodoro.backgroundImage} placeholder={'Ex. https://image.com/pomodoro.png'}/>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <p className={'text-muted-foreground font-bold mb-2'}>
                            Background Color
                        </p>
                        <Input
                            type={'color'}
                            className={'py-1 overflow-hidden'}
                            onChange={handleBackgroundColor}
                            value={pomodoro.backgroundColor}
                        />
                    </div>
                )}
            </AccordionContent>
        </AccordionItem>
    )
}

export default BackgroundPomodoroToolBar
