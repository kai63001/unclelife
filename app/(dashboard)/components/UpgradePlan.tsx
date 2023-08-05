"use client"
import Link from "next/link";
import {useSupabase} from "@/app/hook/supabase-provider";

const UpgradePlan = () => {
    const {user} = useSupabase();
    return (
        <div className={'my-4'}>
            {
                !user?.is_subscribed && (
                    <Link
                        href={'/pricing'}
                        className={'w-full h-10 text-center border-amber-400 rounded-md border text-amber-400 duration-200 hover:bg-amber-400 hover:text-white block pt-1.5'}>Upgrade
                        Pro
                    </Link>
                )
            }
        </div>
    )
}

export default UpgradePlan
