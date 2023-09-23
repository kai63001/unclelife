"use client"
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/types_db";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/Icons";

const Login = () => {
    const supabase = createClientComponentClient<Database>();

    async function signInWithNotion() {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/callback`,
            },
        });
        if (error) console.log(error);
    }

    return (
        <div className="flex justify-center items-center">
            <Button onClick={signInWithNotion} className="w-full ">
                <Icons.google className="mr-2 h-5 w-5"/>
                Login with Google
            </Button>
        </div>
    )
}

export default Login
