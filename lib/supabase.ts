import {createClient} from "@supabase/supabase-js";

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string,
    {
        auth: {
            persistSession: false
        }
    }
);
