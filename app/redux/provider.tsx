'use client';

import {Provider} from 'react-redux';
import {store} from './store';
import {ThemeProvider} from "@/components/theme-provider"
import SupabaseProvider from "@/app/hook/supabase-provider"
import {useSearchParams} from "next/navigation"

export function Providers({children}: any) {
    const searchParams = useSearchParams()
    const theme = searchParams.get('theme') || undefined

    return (
        <Provider store={store}>
            <SupabaseProvider>
            <ThemeProvider attribute="class" defaultTheme="system" forcedTheme={theme} enableSystem>
                {children}
            </ThemeProvider>
            </SupabaseProvider>
        </Provider>
    )
}
