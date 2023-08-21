import dynamic from "next/dynamic";
import {Button} from "@/components/ui/button";
import Link from "next/link"

const IndexNavbar = dynamic(() => import("./index/components/Navbar"), {
    ssr: true,
});

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <header>
                <IndexNavbar/>
            </header>
            <section className="max-w-2xl mx-auto w-full flex-col justify-between pt-8 items-center relative">
                <h1 className="text-center text-5xl font-extrabold mt-28">
                    Level up your Notion docs with <span
                    className={'bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent'}>Forms</span> and <span
                    className={'bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'}>Widgets</span>
                </h1>
                <p className="text-muted-foreground my-4 text-center text-lg">
                    Create beautiful forms and widget connected to your Notion pages
                </p>
                <div className={'flex space-x-3 justify-center py-4'}>
                    <Button asChild>
                        <Link href={'/home'}>
                            Create a form
                        </Link>
                    </Button>
                    <Button variant={'secondary'} asChild>
                        <Link target={'_blank'} href={'/home'}>
                            See Live Example
                        </Link>
                    </Button>
                </div>
                <div className={'text-center pt-2'}>
                    <p className={'text-muted-foreground'}>Free 14-day trial - Cancel anytime</p>
                </div>
            </section>
        </main>
    );
}
