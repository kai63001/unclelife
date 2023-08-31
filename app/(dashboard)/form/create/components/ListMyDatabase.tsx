import {getListDatabase} from "@/lib/notionApi"
import {createServerSupabaseClient} from "@/app/hook/supabase-server";
// import CardDatabaseList from "@/app/(dashboard)/form/create/components/CardDatabaseList";
import dynamic from "next/dynamic";
const CardDatabaseList = dynamic(() => import('@/app/(dashboard)/form/create/components/CardDatabaseList'), {ssr: false})

const ListMyDatabase = async () => {

    const supabase = createServerSupabaseClient(), {data: session} = await supabase.auth.getSession()

    const listDatabase = await getListDatabase(session?.session?.user?.id as string).then((data) => {
        if (data.error) {
            return []
        }
        return data
    }).catch((error) => {
        console.log(error)
        return []
    })


    return (
        <div className={'mt-4'}>
            <div className={'grid grid-cols-3 gap-4'}>
                <CardDatabaseList listDatabase={listDatabase} />
            </div>
        </div>
    )
}

export default ListMyDatabase
