import IndexNavbar from "@/app/index/components/Navbar";

const PricingPage = () => {
    return (
        <main className="flex min-h-screen h-full flex-col">
            <header>
                <IndexNavbar />
            </header>
            <section className="max-w-4xl mx-auto w-full flex-col justify-center pt-16 items-center relative">
                <h1 className={'font-bold text-5xl text-center'}>Enhance your experience with our <span className={'bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent'}>Professional</span> plans</h1>
                <p className={'text-muted-foreground text-center my-2'}>
                    Upgrade your Notion form and widget creation with our Pro plans. Enjoy advanced features and superior support. Choose the plan that fits your needs best.
                </p>
            </section>
        </main>
    )
}

export default PricingPage