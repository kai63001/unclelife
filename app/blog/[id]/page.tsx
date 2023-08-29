import {getPostById, getAllPosts} from '@/lib/apiMarkdown'
import IndexNavbar from "@/app/index/components/Navbar";
import Image from "next/image";
import FooterIndex from "@/app/index/components/FooterIndex";

export default async function Post({
                                       params: {id},
                                   }: {
    params: { id: string }
}) {
    const {html, title, date, cover} = await getPostById(id)
    return (
        <>
            <main className="flex min-h-screen flex-col md:px-5 px-5">
                <header>
                    <IndexNavbar/>
                </header>
                <article className="max-w-6xl mx-auto w-full flex-col justify-between pt-8 items-center relative ">
                    <h1 className={'text-2xl font-bold'}>{title}</h1>
                    <h4>{date}</h4>
                    <div className={'w-full h-[250px] md:h-[500px] relative'}>
                        <Image src={cover} alt={`Cover Image for ${title}`} className={'object-cover'} fill/>
                    </div>
                    <div className={'prose lg:prose-xl max-w-full prose-red dark:prose-emerald dark:prose-invert mt-5'}
                         dangerouslySetInnerHTML={{__html: html}}/>
                </article>
            </main>
            <FooterIndex/>
        </>
    )
}

// have made, and statically generate them
export async function generateStaticParams() {
    const posts = await getAllPosts()

    return posts.map((post: any) => ({
        id: post.id,
    }))
}

// Set the title of the page to be the post title, note that we no longer use
// component
export async function generateMetadata({
                                           params: {id},
                                       }: {
    params: { id: string }
}) {
    const {title, description} = await getPostById(id)
    return {
        title,
        description
    }
}
