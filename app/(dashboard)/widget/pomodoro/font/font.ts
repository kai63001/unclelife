import { Inter, Roboto_Mono, DotGothic16 } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    preload: false
})

const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    preload: false
})

const dot_gothic_16 = DotGothic16({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    preload: false
})

export const fonts:any = {
    inter,
    roboto_mono,
    dot_gothic_16
}
