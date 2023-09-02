"use client"

import {useSupabase} from "@/app/hook/supabase-provider";
import {useAppSelector} from "@/app/redux/hook";

const AlertUserUsingPro = () => {
    const {user} = useSupabase();
    const {alertPro} = useAppSelector(state => state.formReducer)

    return (
        !user?.is_subscribed && alertPro?.length > 0 ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm10.707-2.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 101.414 1.414L11 9.414l2.293 2.293a1 1 0 001.414-1.414l-3-3z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm leading-5 text-green-700">
                            {'You\'re currently using a Pro feature! While you can view and enjoy this feature on your custom page, please note that it won\'t be visible on public pages.'}
                        </p>
                    </div>
                </div>
            </div>
        ) : (
            <></>
        )
    )
}

export default AlertUserUsingPro
