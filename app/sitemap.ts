import { MetadataRoute } from 'next'
import {getAllPosts} from "@/lib/apiMarkdown";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const url = 'https://unclelife.co'
    const allBlog = await getAllPosts()
    const blogUrls = allBlog.map((blog) => {
        return {
            url: `${url}/blog/${blog.id}`,
            lastModified: new Date(blog.date).toISOString(),
        }
    })
    return [
        {
            url: `${url}`,
            lastModified: new Date(),
        },
        {
            url: `${url}/blog`,
            lastModified: new Date(),
        },
        {
            url: `${url}/pricing`,
            lastModified: new Date(),
        },
        {
            url: `${url}/`,
            lastModified: new Date(),
        },
        ...blogUrls
    ]
}
