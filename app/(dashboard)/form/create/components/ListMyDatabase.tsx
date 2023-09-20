"use client"
import {getAuthLink, getListDatabase} from "@/lib/notionApi"
// import CardDatabaseList from "@/app/(dashboard)/form/create/components/CardDatabaseList";
import dynamic from "next/dynamic";
import {Button} from "@/components/ui/button";
import {RefreshCw} from "lucide-react";
import {useEffect, useState} from "react";
import ListMyDatabaseLoading from "@/app/(dashboard)/form/create/components/ListMyDatabaseLoading";

const CardDatabaseList = dynamic(() => import('@/app/(dashboard)/form/create/components/CardDatabaseList'), {ssr: false})

const ListMyDatabase = ({session}: any) => {
    const [listDatabase, setListDatabase] = useState<any>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getListData = async () => {
            const listDatabase = await getListDatabase(session?.session?.user?.id as string).then((data) => {
                setLoading(false)
                if (data.error) {
                    return []
                }
                return data
            }).catch((error) => {
                console.log(error)
                return []
            })
            setListDatabase(listDatabase)
        }
        getListData()
    }, [session?.session?.user?.id]);

    const refreshListDatabase = async () => {
        setLoading(true)
        const listDatabase = await getListDatabase(session?.session?.user?.id as string).then((data) => {
            setLoading(false)
            if (data.error) {
                return []
            }
            return data
        }).catch((error) => {
            console.log(error)
            return []
        })
        setListDatabase(listDatabase)
    }

    const openWindow = async () => {
        const url = await getAuthLink()
        console.log(url)
        const win = window.open(url, '_blank');
        win?.focus();
    }


    return (
        <div className={'mt-4'}>
            <div className={"flex justify-between mb-3"}>
                <div>
                    {/* search */}
                    <Button onClick={openWindow}>
                        Intergate with Notion
                    </Button>
                </div>
                <div className={'flex items-center space-x-3'}>
                    <Button
                        disabled={true}
                        title={'Coming soon'}
                    >
                        Create Form with out Database
                    </Button>
                    <Button
                        onClick={refreshListDatabase}
                    >
                        <RefreshCw className={`w-6 h-6 ${loading && 'animate-spin'}`}/>
                    </Button>
                </div>
            </div>
            {loading ? (<ListMyDatabaseLoading/>) : (
                <div className={'grid grid-cols-3 gap-4'}>
                    <CardDatabaseList listDatabase={listDatabase}/>
                </div>
            )}
        </div>
    )
}

export default ListMyDatabase
