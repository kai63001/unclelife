import IndexNavbar from "@/app/index/components/Navbar";
import FooterIndex from "@/app/index/components/FooterIndex";
import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio"
import Link from "next/link";
import {Button} from "@/components/ui/button";

const SubscriptionCancel = () => {
    return (
        <>
            <main className="flex min-h-screen flex-col">
                <header>
                    <IndexNavbar/>
                </header>
                <section
                    className="max-w-6xl mx-auto w-full flex-col justify-between pt-8 items-center relative md:px-5 px-5">
                    <h1 className="text-center text-5xl font-extrabold mt-8">
                        Subscription Canceled
                    </h1>
                    <div className={'flex w-auto items-center justify-center my-2'}>
                        <p className={'text-center w-1/2 mt-2'}>
                            Your subscription has been canceled. We strive to improve. Please share your reasons or
                            feedback
                            to help us serve you better in the future
                        </p>
                    </div>
                    <div className={'flex justify-center'}>
                        <div className={'w-1/2'}>
                            <AspectRatio ratio={10 / 7}>
                                <Image src="https://media1.giphy.com/media/l22ysLe54hZP0wubek/giphy.gif" alt="Image"
                                       fill className="rounded-md object-cover"/>
                            </AspectRatio>
                        </div>
                    </div>
                    <div className={'flex justify-center'}>
                        <Link href={'https://uncle-life.canny.io/feedback/'} target={'_blank'}>
                            <Button variant={'outline'} className={'mt-5'}>
                                Share Feedback
                            </Button>
                        </Link>
                        <Link href={'/'}>
                            <Button className={'mt-5 ml-5'}>
                                Go Home
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            <FooterIndex/>
        </>
    )
}

export default SubscriptionCancel
