import IndexNavbar from "@/app/index/components/Navbar";
import FooterIndex from "@/app/index/components/FooterIndex";
import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio"
import Link from "next/link";
import {Button} from "@/components/ui/button";

const SubscriptionSuccess = () => {
    return (
        <>
            <main className="flex min-h-screen flex-col">
                <header>
                    <IndexNavbar/>
                </header>
                <section
                    className="max-w-6xl mx-auto w-full flex-col justify-between pt-8 items-center relative md:px-5 px-5">
                    <h1 className="text-center text-5xl font-extrabold mt-8">
                        Subscription Success
                    </h1>
                    <div className={'flex w-auto items-center justify-center my-2'}>
                        <p className={'text-center w-1/2 mt-2'}>
                            {'Thank you for choosing us! Your subscription is now active. We\'re excited to have you with us.'}
                        </p>
                    </div>
                    <div className={'flex justify-center'}>
                        <div className={'w-1/2'}>
                            <AspectRatio ratio={10 / 7}>
                                <Image src="https://media4.giphy.com/media/5GoVLqeAOo6PK/giphy.gif" alt="Image"
                                       fill className="rounded-md object-cover"/>
                            </AspectRatio>
                        </div>
                    </div>
                    <div className={'flex justify-center'}>
                        <Link href={'/home'}>
                            <Button className={'mt-5 ml-5'}>
                                Go Dashboard
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            <FooterIndex/>
        </>
    )
}

export default SubscriptionSuccess
