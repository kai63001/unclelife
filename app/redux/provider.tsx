'use client';

import {Provider} from 'react-redux';
import {store} from './store';
import {ThemeProvider} from "@/components/theme-provider"
import SupabaseProvider from "@/app/hook/supabase-provider"

export function Providers({children}: any) {
    return (
        <Provider store={store}>
            <SupabaseProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
            </SupabaseProvider>
        </Provider>
    )
}
