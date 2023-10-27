import Link from "next/link";
import Login from "@/app/login/components/login";
import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Uncle Life - Login to Access Notion Tools",
  description:
    "Sign in to Uncle Life and unlock the power of Notion forms and widgets. Streamline your workflow and enhance your Notion experience with our specialized tools.",
};

const LoginPage = () => {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button variant={"outline"} asChild>
          <Link
            href="/register"
            className={"absolute right-4 top-4 md:right-8 md:top-8"}
          >
            Register
          </Link>
        </Button>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex w-full">
          <div className="absolute inset-0 bg-zinc-900 w-full" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/">Uncle Life</Link>
          </div>
          <div className="relative z-20 mt-8 flex justify-center items-center h-full">
            <Image
              src="/image/auth/authBanner.png"
              alt="Uncle Life"
              width={800}
              height={800}
            />
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account to continue.
              </p>
            </div>
            <div>
              <Login />
            </div>
            {/* <UserAuthForm /> */}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms-conditions"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
