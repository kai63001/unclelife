import Link from 'next/link'
import {getAllPosts} from '@/lib/apiMarkdown'
import IndexNavbar from "@/app/index/components/Navbar";

export default async function Page() {
    const posts = await getAllPosts()

    return (
        <main className="flex min-h-screen flex-col">
            <header>
                <IndexNavbar/>
            </header>
            <section className="max-w-5xl mx-auto w-full flex-col justify-between pt-8 items-center relative">
                <h1 className="text-center text-5xl font-extrabold mt-8">
                    Your Hub for Notion <span
                    className={'bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent'}>Forms</span> and <span
                    className={'bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'}>Widgets</span> Insights
                </h1>
                <ul>
                    {posts.map(post => {
                        const {id, date, title} = post
                        return (
                            <li key={id}>
                                <Link href={`/blog/${id}`}>
                                    {date} - {title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}
