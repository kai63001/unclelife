import {createServerSupabaseClient} from "@/app/hook/supabase-server";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import dayjs from "@/lib/dayjs";

export const revalidate = 60
const RenderMyForm = async ({limit = 1000}: { limit?: number }) => {
    //get user id
    //get all forms with user id
    const supabase = createServerSupabaseClient(), {data: session} = await supabase.auth.getSession(),
        userId = session?.session?.user?.id, {
            data,
            error
        } = await supabase.from('form').select('id,detail,created_at').eq('user', userId).limit(limit).order('created_at', {ascending: false});
    if (error) {
        console.log(error)
    }

    const renderDate = async (date: any) => {
        const newDate = new Date(date)
        return dayjs().to(newDate)
    }

    return (
        <>
            {limit != 1000 && (
                <h2 className={'text-2xl font-bold mb-2'}>Recent Forms</h2>
            )}
            <div className={`grid grid-cols-4 gap-4`}>
                {data?.map((form: any, index: number) => (
                    <Link key={index} href={`/custom/form?id=${form.id}`}>
                        <Card>
                            <CardHeader>
                                <CardTitle>{form?.detail?.title || 'Form'}</CardTitle>
                                <CardDescription>{renderDate(form?.created_at)}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    ))}
            </div>
        </>
    )
}

export default RenderMyForm
