import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import { unified } from 'unified'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShiki from '@leafac/rehype-shiki'
import * as shiki from 'shiki'
import {cache} from "react";

// building of the blog from ~60s->~10s
let p: ReturnType<typeof getParserPre> | undefined

async function getParserPre() {
    return unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(remarkGfm)
        .use(rehypeShiki, {
            highlighter: await shiki.getHighlighter({ theme: 'poimandres' }),
        })
        .use(rehypeStringify)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, {
            content: arg => ({
                type: 'element',
                tagName: 'a',
                properties: {
                    href: '#' + arg.properties?.id,
                    style: 'margin-right: 10px',
                },
                children: [{ type: 'text', value: '#' }],
            }),
        })
}

function getParser() {
    if (!p) {
        p = getParserPre().catch(e => {
            p = undefined
            throw e
        })
    }
    return p
}

export const getPostById = cache(async (id: string) => {
    const realId = id.replace(/\.md$/, '')
    const fullPath = join('_posts', `${realId}.md`)
    const { data, content } = matter(await fs.promises.readFile(fullPath, 'utf8'))

    const parser = await getParser()
    const html = await parser.process(content)

    return {
        ...data,
        title: data.title,
        id: realId,
        date: `${data.date?.toISOString().slice(0, 10)}`,
        html: replaceHtmlImgAddLazyLoad(html.value.toString()),
        cover: data.cover,
        description: data.description,
    }
});

const replaceHtmlImgAddLazyLoad = (html: string) => {
    return html.replace(/<img/g, '<img loading="lazy"')
}

export const getMarkdownInFolderMarkDown = cache(async (file: string) => {
    const realId = file.replace(/\.md$/, '')
    const fullPath = join('_markdown', `${realId}.md`)
    const { data, content } = matter(await fs.promises.readFile(fullPath, 'utf8'))

    const parser = await getParser()
    const html = await parser.process(content)

    return {
        ...data,
        id: realId,
        html: replaceHtmlImgAddLazyLoad(html.value.toString()),
    }
})

export const getAllPosts = cache(async () => {
    const posts = await Promise.all(
        fs.readdirSync('_posts').map(id => getPostById(id)),
    )
    return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
});
