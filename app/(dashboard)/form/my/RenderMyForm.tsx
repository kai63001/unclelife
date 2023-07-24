import {createServerSupabaseClient} from "@/app/hook/supabase-server";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import dayjs from "@/lib/dayjs";

const RenderMyForm = async () => {
    //get user id
    //get all forms with user id
    const supabase = createServerSupabaseClient(), {data: session} = await supabase.auth.getSession(),
        userId = session?.session?.user?.id, {
            data,
            error
        } = await supabase.from('form').select('id,detail,created_at').eq('user', userId).order('created_at', {ascending: false});
    if (error) {
        console.log(error)
    }

    return (
        <div className={`grid grid-cols-4 gap-4`}>
            {data?.map((form: any, index: number) => (
                <Link key={index} href={`/custom/form?id=${form.id}`}>
                    <Card>
                        <CardHeader>
                            <CardTitle>{form?.detail?.title || 'Form'}</CardTitle>
                            <CardDescription>{dayjs().fromNow(form.created_at)}</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

export const revalidate = 60
export default RenderMyForm
