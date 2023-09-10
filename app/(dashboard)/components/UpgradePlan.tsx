"use client"
import Link from "next/link";
import {useSupabase} from "@/app/hook/supabase-provider";
import {Crown} from "lucide-react";

const UpgradePlan = () => {
    const {user} = useSupabase();
    return (
        <div className={'my-4'}>
            {
                !user?.is_subscribed && (
                    <Link
                        href={'/pricing'}
                        className={'w-full h-10 text-center border-amber-400 rounded-md border text-amber-400 duration-200 hover:bg-amber-400 hover:text-white flex items-center justify-center'}>
                        <Crown className={'w-6 h-6 mr-2'}/>
                        Upgrade Pro
                    </Link>
                )
            }
        </div>
    )
}

export default UpgradePlan
