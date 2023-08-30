"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

const DeleteAccount = () => {
    const supabase = createClientComponentClient();
    const deleteAccount = async (e:any) => {
        e.preventDefault();
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
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Account Deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete your account? This action is irreversible. Once deleted:
                        <ul className={'list-disc px-5'}>
                            <li>
                                All your data, including forms, widgets, and settings, will be permanently removed.
                            </li>
                            <li>
                                Any active subscriptions or services will be terminated immediately.
                            </li>
                            <li>
                                You will lose access to any content or features associated with your account.
                            </li>
                        </ul>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteAccount}>Delete Account</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteAccount
