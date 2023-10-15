import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import RegisterCompoment from "./components/Register";

export const metadata: Metadata = {
  title: "Uncle Life - Register to Access Notion Tools",
  description:
    "Sign up for Uncle Life and unlock the power of Notion forms and widgets. Streamline your workflow and enhance your Notion experience with our specialized tools.",
};

const RegisterPage = () => {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button variant={"outline"} asChild>
          <Link
            href="/login"
            className={"absolute right-4 top-4 md:right-8 md:top-8"}
          >
            Login
          </Link>
        </Button>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <Image
            src="/image/auth/authBanner.png"
            quality={100}
            width={600}
            height={700}
            className="absolute inset-0 top-[10%] left-[10%] object-cover"
            alt="Authentication"
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/">Uncle Life</Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Dive into UncleLife and discover a world where form
                creation meets Notion integration. Say goodbye to complicated
                setups and hello to a smoother workflow.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <RegisterCompoment />
            {/* <UserAuthForm /> */}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
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

export default RegisterPage;
