import {getMarkdownInFolderMarkDown} from "@/lib/apiMarkdown";
import IndexNavbar from "@/app/index/components/Navbar";
import FooterIndex from "@/app/index/components/FooterIndex";

const About = async () => {
    const {html} = await getMarkdownInFolderMarkDown('about')
    return (
        <>
            <main className="flex min-h-screen flex-col md:px-5 px-5">
                <header>
                    <IndexNavbar/>
                </header>
                <article className="max-w-6xl mx-auto w-full flex-col justify-between pt-8 items-center relative ">
                    <div className={'prose lg:prose-md max-w-full prose-red dark:prose-emerald dark:prose-invert mt-5'}
                         dangerouslySetInnerHTML={{__html: html}}/>
                </article>
            </main>
            <FooterIndex/>
        </>
    )
}

export default About
