'use client';

import {createContext, useContext, useEffect, useState} from 'react';
import {createPagesBrowserClient} from '@supabase/auth-helpers-nextjs';

import type {SupabaseClient} from '@supabase/auth-helpers-nextjs';
import type {Database} from '@/lib/types_db';
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {setUserData} from "@/app/redux/slice/userController.slice";

type SupabaseContext = {
    supabase: SupabaseClient<Database>;
    user: any;
    isLoading: boolean;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
                                             children
                                         }: {
    children: React.ReactNode;
}) {
    const [supabase] = useState(() => createPagesBrowserClient());
    // const [user, setUser] = useState<any>(null);
    const {data:userData} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUserData = async () => {
            const {
                data: {session},
            } = await supabase.auth.getSession();
            // console.log("user data lock")
            if (session && userData === null) {
                const {data} = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                console.info('search data')
                // setUser({
                //     ...session,
                //     ...data
                // });
                dispatch(setUserData({
                    ...session,
                    ...data
                }))
                setIsLoading(false);

            }

        }
        getUserData().then(r => r);

        const {
            data: {subscription}
        } = supabase.auth.onAuthStateChange(() => {
            getUserData().then(r => r);
        });


        return () => {
            subscription.unsubscribe();
        };
    }, [dispatch, supabase, userData]);

    const value = {
        supabase,
        user: userData,
        isLoading
    }

    return (
        <Context.Provider value={value}>
            <>{children}</>
        </Context.Provider>
    );
}

export const useSupabase = () => {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error('useSupabase must be used inside SupabaseProvider');
    }


    return context;
};
