"use client"
import Link from "next/link"
import {
    Card,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import dayjs from "@/lib/dayjs";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/Icons";
import {FileEdit, FileSymlink} from "lucide-react";
import {useAppDispatch} from "@/app/redux/hook";
import {clearAllData} from "@/app/redux/slice/formController.slice";
import {useRouter} from "next/navigation"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const CardMyForm = ({form}: any) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const renderDate = async (date: any) => {
        const newDate = new Date(date)
        return dayjs().to(newDate)
    }

    const openNotion = (e: any, url: string) => {
        e.stopPropagation()
        window.open(`https://notion.so/${url.replaceAll('-','')}`, '_blank')
    }

    const openForm = (e: any, url: string) => {
        e.stopPropagation()
        //clear
        dispatch(clearAllData());
        router.push(`/custom/form?id=${url}`)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{form?.detail?.title || 'Form'}</CardTitle>
                <CardDescription>{renderDate(form?.created_at)}</CardDescription>
            </CardHeader>
            <CardFooter className={'space-x-1 flex justify-between items-center'}>
                <div className={'flex space-x-2'}>
                    <Button variant={'outline'} onClick={(e)=>openForm(e,form.id)}>
                        <FileEdit className={'w-6 h-6'}/>
                    </Button>
                    {/*<Button variant={'outline'} onClick={(e) => openNotion(e, form.databaseId)}>*/}
                    {/*    <Icons.notion className={'w-6 h-6'}/>*/}
                    {/*</Button>*/}
                    <Button variant={'outline'} asChild>
                        <Link href={`/public/form/${form.id}`} target={'_blank'}>
                            <FileSymlink className={'w-6 h-6'}/>
                        </Link>
                    </Button>
                </div>
                <Popover>
                    <PopoverTrigger>
                        <Button variant={'outline'} >
                            <Icons.dotdotdot className={'w-4 h-4 fill-primary'}/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>
            </CardFooter>
        </Card>
    )
}

export default CardMyForm
