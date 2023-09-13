"use client"
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {setBackGroundColor, setBackGroundImage, setTypeBackground} from "@/app/redux/slice/pomodoroController.slice";
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

const BackgroundPomodoroToolBar = () => {
    const dispatch = useAppDispatch()
    const {pomodoro} = useAppSelector(state => state.pomodoroReducer)
    const [images, setImages] = useState<any>([])

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
                        <div>
                            <Input type={'file'} className={'py-1 hidden'}/>
                            <Label className={"flex flex-col mt-1"}>
                                <Button>
                                    <Upload className={'h-4 w-4 mr-2'}/>
                                    <span className={'mr-2'}>
                                        Upload File
                                    </span>
                                    <ProBadge/>
                                </Button>
                            </Label>
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
