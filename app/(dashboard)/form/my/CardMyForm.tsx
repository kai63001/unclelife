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

const CardMyForm = ({form}: any) => {

    const renderDate = async (date: any) => {
        const newDate = new Date(date)
        return dayjs().to(newDate)
    }

    const openNotion = (e: any, url: string) => {
        e.stopPropagation()
        window.open(`https://notion.so/${url.replaceAll('-','')}`, '_blank')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{form?.detail?.title || 'Form'}</CardTitle>
                <CardDescription>{renderDate(form?.created_at)}</CardDescription>
            </CardHeader>
            <CardFooter className={'space-x-3'}>
                <Button variant={'outline'} asChild>
                    <Link href={`/custom/form?id=${form.id}`}>
                        <FileEdit className={'w-6 h-6'}/>
                    </Link>
                </Button>
                <Button variant={'outline'} onClick={(e) => openNotion(e, form.databaseId)}>
                    <Icons.notion className={'w-6 h-6'}/>
                </Button>
                <Button variant={'outline'} asChild>
                    <Link href={`/public/form/${form.id}`} target={'_blank'}>
                        <FileSymlink className={'w-6 h-6'}/>
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CardMyForm
