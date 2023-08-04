'use client';

import {createContext, useContext, useEffect, useState} from 'react';
import {createPagesBrowserClient} from '@supabase/auth-helpers-nextjs';
import {useRouter} from 'next/navigation';

import type {SupabaseClient} from '@supabase/auth-helpers-nextjs';
import type {Database} from '@/lib/types_db';

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
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUserData = async () => {
            const {
                data: {session},
            } = await supabase.auth.getSession();
            if (session) {
                const {data} = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setUser({
                    ...session,
                    ...data
                });
                setIsLoading(false);

            }

        }
        getUserData().then(r => r);

        const {
            data: {subscription}
        } = supabase.auth.onAuthStateChange(() => {
            getUserData().then(r => r);
            router.refresh();
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, supabase]);

    const value = {
        supabase,
        user,
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
