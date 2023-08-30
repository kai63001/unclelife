"use client"
import {Button} from "@/components/ui/button";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

const DeleteAccount = () => {
    const supabase = createClientComponentClient();
    const deleteAccount = async () => {
       //rpc
        const {error} = await supabase.rpc('delete_user');
        if (error) {
            console.log("error :", error);
        }
        //logout
        await supabase.auth.signOut();
        //reload
        window.location.reload();
    }
    return (
        <div>
            <Button variant={'destructive'}>Delete account</Button>
        </div>
    )
}

export default DeleteAccount
