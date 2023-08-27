import IndexNavbar from "@/app/index/components/Navbar";
import PricingBox from "@/app/pricing/components/PricingBox";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Uncle Life - Affordable Plans for Notion Tools',
    description: 'Discover competitive pricing for Notion forms and widgets at Uncle Life. Choose a plan that fits your needs and elevate your Notion experience without breaking the bank.',
}

const PricingPage = () => {
    return (
        <main className="flex min-h-screen h-full flex-col">
            <header>
                <IndexNavbar/>
            </header>
            <section className="max-w-5xl mx-auto w-full flex-col justify-center pt-16 items-center relative">
                <h1 className={'font-bold text-5xl text-center'}>Enhance your experience with our <span
                    className={'bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent'}>Professional</span> plans
                </h1>
                <p className={'text-muted-foreground text-center my-2'}>
                    Upgrade your Notion form and widget creation with our Pro plans. Enjoy advanced features and
                    superior support. Choose the plan that fits your needs best.
                </p>
                <PricingBox/>
            </section>
        </main>
    )
}

export default PricingPage
