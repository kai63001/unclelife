import {createServerSupabaseClient} from "@/app/hook/supabase-server";

const RenderMyForm = async () => {
    const supabase = createServerSupabaseClient();
    //get user id
    //get all forms with user id
    const {data:session} = await supabase.auth.getSession();
    const userId = session?.session?.user?.id;
    const {data, error} = await supabase.from('form').select('*').eq('user', userId)
    ;
    if (error) {
        throw error;
    }

    return (
        <div>
            {data?.map((form: any) => (
                <div key={form.id}>
                    <h1>{form.id}</h1>
                </div>
            ))}
        </div>
    )
}

export const revalidate = 60
export default RenderMyForm
