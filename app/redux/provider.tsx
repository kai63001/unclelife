'use client';

import {Provider} from 'react-redux';
import {store} from './store';
import {ThemeProvider} from "@/components/theme-provider"


export function Providers({children}: any) {
    return (
        <Provider store={store}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </Provider>
    )
}