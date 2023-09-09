"use client"
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import ProBadge from "@/app/custom/components/toolsbar/ProBadge";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import EmojiPicker, {Theme} from "emoji-picker-react";
import {Trash} from "lucide-react";
import {EyeClosedIcon, EyeOpenIcon} from "@radix-ui/react-icons";

const SuccessPageCustomComponent = ({onChangeHook, form}: any) => {

    const handleClickChangeIcon = (icon: any) => {
        onChangeHook({
            ...form?.pro,
            successPage: {
                ...form?.pro?.successPage,
                ['icon']: icon.emoji
            }
        }, 'pro')
    }

    const clearIcon = () => {
        onChangeHook({
            ...form?.pro,
            successPage: {
                ...form?.pro?.successPage,
                ['icon']: ''
            }
        }, 'pro')
    }

    const hideIcon = () => {
        const icon = form?.pro?.successPage?.icon === 'hide' ? '' : 'hide'
        onChangeHook({
            ...form?.pro,
            successPage: {
                ...form?.pro?.successPage,
                ['icon']: icon
            }
        }, 'pro')
    }

    return (
        <AccordionItem value="customSuccessPage">
            <AccordionTrigger className={'hover:no-underline'}>
                <div>
                    Custom Success Page <ProBadge/>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col space-y-2">
                    <div className="text-xs font-bold">
                        ICON <span className="text-red-500">*</span>
                        <div className={"mt-2 flex space-x-2 items-center"}>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button disabled={form?.pro?.successPage?.icon === 'hide'} variant="outline" size="icon">
                                        {form?.pro?.successPage?.icon && form?.pro?.successPage?.icon !== 'hide' ? form?.pro?.successPage?.icon : '🎉'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className={'ml-10 w-11/12'}>
                                    <Tabs defaultValue="emoji" className="w-full">
                                        <TabsList>
                                            <TabsTrigger value="emoji">Emoji</TabsTrigger>
                                            <TabsTrigger value="password">GIFs</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="emoji">
                                            <EmojiPicker
                                                onEmojiClick={handleClickChangeIcon}
                                                theme={Theme.AUTO}
                                            />
                                        </TabsContent>
                                        <TabsContent value="password">SOON</TabsContent>
                                    </Tabs>
                                </PopoverContent>
                            </Popover>
                            {(form?.pro?.successPage?.icon && form?.pro?.successPage?.icon != 'hide') && (
                                <Button onClick={clearIcon} size={'icon'} variant={'outline'}>
                                    <Trash className={'w-4 h-4'}/>
                                </Button>
                            )}
                            {/*    hide*/}
                            <Button onClick={hideIcon} variant="outline" size="icon">
                                {form?.pro?.successPage?.icon === 'hide' ? (
                                    <EyeClosedIcon className={'w-4 h-4'}/>
                                ) : (
                                    <EyeOpenIcon className={'w-4 h-4'}/>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

export default SuccessPageCustomComponent
