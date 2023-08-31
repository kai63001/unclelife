import {createServerSupabaseClient} from "@/app/hook/supabase-server";
// import CardMyForm from "@/app/(dashboard)/form/my/CardMyForm";
import dynamic from "next/dynamic";
const CardMyForm = dynamic(() => import('@/app/(dashboard)/form/my/CardMyForm'), {ssr: false})

export const revalidate = 60
const RenderMyForm = async ({limit = 1000}: { limit?: number }) => {
    //get user id
    //get all forms with user id
    const supabase = createServerSupabaseClient(), {data: session} = await supabase.auth.getSession(),
        userId = session?.session?.user?.id, {
            data,
            error
        } = await supabase.from('form').select('id,detail,databaseId,created_at').eq('user_id', userId).limit(limit).order('created_at', {ascending: false});
    if (error) {
        console.log(error)
    }

    return (
        <>
            {limit != 1000 && (
                <h2 className={'text-2xl font-bold mb-2'}>Recent Forms</h2>
            )}
            <div className={`grid grid-cols-3 gap-4`}>
                {data?.map((form: any, index: number) => (
                    <CardMyForm key={index} form={form}/>
                ))}
            </div>
        </>
    )
}

export default RenderMyForm
