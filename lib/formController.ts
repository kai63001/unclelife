import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {cache} from "react";


const supabase = createClientComponentClient();

export const getFormData = cache(async (id: string) => {
    return await supabase
        .from("form")
        .select("layer,detail,databaseId,user_id (is_subscribed,id)")
        .eq("id", id)
        .single()
})
