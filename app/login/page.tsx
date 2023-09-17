import {X} from "lucide-react";
import Link from "next/link";
import Login from "@/app/login/components/login";
import {Metadata} from "next";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import MagicLink from "@/app/login/components/magicLink";

export const metadata: Metadata = {
    title: 'Uncle Life - Login to Access Notion Tools',
    description: 'Sign in to Uncle Life and unlock the power of Notion forms and widgets. Streamline your workflow and enhance your Notion experience with our specialized tools.',
}

const LoginPage = () => {
    return (
        <div className="h-screen w-screen bg-customMode flex justify-center items-center">
            <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-md w-full">
                {/* close */}
                <div className="flex justify-end">
                    <Link href="/">
                        <X size={24}/>
                    </Link>
                </div>
                <h1 className="text-center text-3xl font-bold">UncleLife</h1>
                <h2 className="flex w-full text-center justify-center text-xl whitespace-pre-line my-5">
                    Login to Access Notion Tools
                </h2>
                {/*<MagicLink/>*/}
                <div className="border-b my-4"></div>
                {/* notion login */}
                <Login/>
                <p className="text-muted-foreground text-xs text-center mt-3 whitespace-pre-line">
                    By continuing, you are indicating that you accept our{' \n'}
                    <Link href={'/privacy-policy'} className={'text-red-600'} target={'_blank'}
                          rel={'noopener noreferrer'}>Privacy Policy</Link>
                    {' and '}
                    <Link href={'/terms-conditions'} className={'text-red-600'} target={'_blank'}
                          rel={'noopener noreferrer'}>Terms of
                        Service</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
