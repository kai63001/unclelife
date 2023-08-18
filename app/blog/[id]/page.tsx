import {getPostById, getAllPosts} from '@/lib/apiMarkdown'

// Generate the post, note that this is a "react server component"! it is
// allowed to be async
export default async function Post({
                                       params: {id},
                                   }: {
    params: { id: string }
}) {
    const {html, title, date} = await getPostById(id)
    return (
        <article>
            <h1>{title}</h1>
            <h4>{date}</h4>
            <div dangerouslySetInnerHTML={{__html: html}}/>
        </article>
    )
}

// have made, and statically generate them
export async function generateStaticParams() {
    const posts = await getAllPosts()

    return posts.map((post:any) => ({
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
    const {title} = await getPostById(id)
    return {
        title,
    }
}
