import {getListDatabase} from "@/lib/notionApi"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Database} from "lucide-react";
import Image from "next/image";
import {cookies} from "next/headers";
import {createServerSupabaseClient} from "@/app/hook/supabase-server";

const ListMyDatabase = async () => {
    // const [listDatabase, setListDatabase] = useState([])
    //
    // useEffect(() => {
    //     getListDatabase().then((data) => {
    //         console.log(data)
    //         setListDatabase(data)
    //     })
    // }, [])

    const supabase = createServerSupabaseClient(), {data: session} = await supabase.auth.getSession()

    const listDatabase = await getListDatabase(session?.session?.provider_token as string).then((data) => {
        if (data.error) {
            return []
        }
        return data
    }).catch((error) => {
        console.log(error)
        return []
    })

    const checkNotionImageUrl = (url: string) => {
        if (url.includes('notion.so')) {
            return url
        }
        return `https://www.notion.so${url}`
    }


    return (
        <div className={'mt-4'}>
            <div className={'grid grid-cols-3 gap-3'}>
                {listDatabase.map((database: any, index: any) => (
                    <Card className={'hover:bg-secondary cursor-pointer'} key={index}>
                        <CardHeader>
                            <CardTitle className={'flex items-center'}>
                                {database?.icon?.type === 'emoji' ? (
                                    <div
                                        className={'mr-2'}>{database.icon.emoji}</div>) : database?.icon?.type === 'external' ? (
                                    <Image className={'mr-2'} src={checkNotionImageUrl(database.icon.external.url)} alt={'icon'} width={24}
                                           height={24}/>
                                ) : (
                                    <Database size={24} className={'mr-2'}/>
                                )}
                                {database?.title?.length > 0 ? database?.title[0].plain_text : 'Untitled'}
                            </CardTitle>
                            <CardDescription>
                                {database?.description?.length > 0 ? database?.description[0].plain_text : 'No description'}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
                {listDatabase.length === 0 && (
                    <div className={'col-span-3'}>
                        <p className={'text-muted-foreground text-center'}>No database found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListMyDatabase
