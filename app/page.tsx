import dynamic from "next/dynamic";
import {Button} from "@/components/ui/button";
import Link from "next/link"

const IndexNavbar = dynamic(() => import("./index/components/Navbar"), {
    ssr: true,
});
import type {Metadata} from 'next'
import PricingBox from "@/app/pricing/components/PricingBox";
import FeatureIndex from "@/app/index/components/Feature";
import FooterIndex from "@/app/index/components/FooterIndex";
import FAQs from "@/app/index/components/FAQs";

export const metadata: Metadata = {
    title: 'Uncle Life - Notion Forms & Widgets Simplified',
    description: 'Welcome to Uncle Life, your go-to platform for seamless Notion forms and widgets. Elevate your productivity and organization with our intuitive tools tailored for Notion enthusiasts.',
}


export default function Home() {
    return (
        <>
            <main className="flex min-h-screen flex-col lg:p-0 px-5">
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
                            <Link href={'/form/create'}>
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
                <section className="max-w-5xl mx-auto w-full flex-col justify-between pt-3 mt-10 items-center relative">
                    <FeatureIndex/>
                </section>
                <span
                    className={'mx-auto px-3 py-1 bg-red-600 rounded-full text-sm font-bold mt-12 text-white'}>2 min</span>
                <h2 className="text-center text-3xl font-bold ">Create Forms the Way You Want</h2>
                <p className={'text-center text-muted-foreground'}>Creating custom forms for your Notion workspace has
                    never
                    been easier. Follow these steps:</p>
                <section className="max-w-5xl mx-auto w-full flex-col justify-between pt-3 items-center relative">
                    <ol className={''}>
                        <li className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                            <div>
                                <h2 className={'text-2xl font-medium'}>1. Sign Up & Connect to Notion</h2>
                                <ul className={'text-muted-foreground p-0 m-0'}>
                                    <li>Sign up on our platform.</li>
                                    <li>Connect to Notion from the {`'`}Integrations{`'`} section.</li>
                                    <li>Grant the necessary permissions.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className={'text-2xl font-medium'}>2. Select a Notion Database</h2>
                                <ul className={'text-muted-foreground p-0 m-0'}>
                                    <li>Choose the Notion database you want to link your form with. This ensures that
                                        all
                                        form responses get stored directly in your selected Notion database.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 className={'text-2xl font-medium'}>3. Create a Custom Form</h2>
                                <ul className={'text-muted-foreground p-0 m-0'}>
                                    <li>Start by accessing the form builder tool. Here, you can add essential input
                                        fields
                                        tailored to your needs.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 className={'text-2xl font-medium'}>4. Publish & Share</h2>
                                <ul className={'text-muted-foreground p-0 m-0'}>
                                    <li>{'Once you\'re satisfied with the design and functionality, publish your form.'}</li>
                                </ul>
                            </div>
                        </li>
                    </ol>
                </section>
                <section className="max-w-5xl mx-auto w-full flex-col justify-between pt-3 mt-10 items-center relative">
                    <h2 className="text-center text-3xl font-bold">Pricing</h2>
                    <PricingBox/>
                </section>
                <section className="max-w-5xl mx-auto w-full flex-col justify-between pt-3 mt-10 items-center relative">
                    <h2 className="text-center text-3xl font-bold">Frequently Asked Questions</h2>
                    <FAQs/>
                </section>
            </main>
            <FooterIndex/>
        </>
    );
}
