import {X} from "lucide-react";
import Link from "next/link";
import Login from "@/app/login/components/login";
import {Metadata} from "next";

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
                    One account for
                    {"\n"}All your Notion pages
                </h2>
                <div className="border-b my-4"></div>
                {/* notion login */}
                <Login/>
            </div>
        </div>
    );
};

export default LoginPage;
