import Link from 'next/link'
import {getAllPosts} from '@/lib/apiMarkdown'
import IndexNavbar from "@/app/index/components/Navbar";
import {Metadata} from "next";
import Image from "next/image";
import FooterIndex from "@/app/index/components/FooterIndex";

export const metadata: Metadata = {
    title: 'Uncle Life Blog - Insights on Notion Forms & Widgets',
    description: 'Dive into the Uncle Life Blog for expert insights, tips, and articles on maximizing Notion with our specialized forms and widgets. Stay updated and enhance your Notion journey with us.',
}

export const revalidate = 3600; // 1 hour

export default async function Page() {
    const posts = await getAllPosts()

    return (
        <>
            <main className="flex min-h-screen flex-col">
                <header>
                    <IndexNavbar/>
                </header>
                <section className="max-w-6xl mx-auto w-full flex-col justify-between pt-8 items-center relative md:px-5 px-5">
                    <h1 className="text-center text-5xl font-extrabold mt-8">
                        Your Hub for Notion <span
                        className={'bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent'}>Forms</span> and <span
                        className={'bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'}>Widgets</span> Insights
                    </h1>
                    <ul className={'grid grid-cols-1 md:grid-cols-3 gap-4 mt-10'}>
                        {posts.map(post => {
                            const {id, date, title, cover} = post
                            return (
                                <li key={id}>
                                    <Link href={`/blog/${id}`}>
                                        <div className={'relative h-52 overflow-hidden rounded-md'}>
                                            <Image src={cover} alt={`Cover Image for ${title}`} className={'object-cover'}
                                                   fill/>
                                        </div>
                                        <p className={'font-medium mt-1'}>
                                            {title}
                                        </p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </section>
            </main>
            <FooterIndex/>
        </>
    )
}
