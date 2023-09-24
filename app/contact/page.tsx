import IndexNavbar from "@/app/index/components/Navbar";
import FooterIndex from "@/app/index/components/FooterIndex";

const Contact = () => {
    return (
        <>
            <main className="flex min-h-screen flex-col md:px-5 px-5">
                <header>
                    <IndexNavbar/>
                </header>
                <article className="max-w-6xl mx-auto w-full flex-col justify-between pt-14 items-center">
                    <iframe src="https://unclelife.co/public/form/fd177669-3772-4c88-85a2-0d93754b27f1" width="100%"
                            height="700px"></iframe>
                </article>
            </main>
            <FooterIndex/>
        </>
    )
}

export default Contact
