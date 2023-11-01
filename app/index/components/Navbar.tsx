import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/types_db";
import { ModeToggle } from "@/components/ModeToggle";
import MobileToggle from "@/app/index/components/MobileToggle";
import dynamic from "next/dynamic";

const CrispWithNoSSR = dynamic(() => import("@/components/Crisp"), {
  ssr: false,
});

const IndexNavbar = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="max-w-6xl m-auto w-full flex justify-between pt-8 items-center">
      <CrispWithNoSSR />
      <Link href="/" className="font-bold text-xl">
        UncleLife
        <span className="ml-2 text-xs">BETA</span>
      </Link>
      <nav className="">
        <ul className="flex space-x-4 items-center">
          <li className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <Link href={"/blog"} className={"md:block hidden mr-2"}>
              Blog
            </Link>
          </li>
          <li className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <Link href={"/pricing"} className={"md:block hidden mr-2"}>
              Pricing
            </Link>
          </li>
          {session ? (
            <li>
              <Link href={"/home"} className={"md:block hidden"}>
                <Button>Dashboard</Button>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link href={"/login"} className={"md:block hidden"}>
                  <Button>
                    <LogIn className="mr-2" size={20} /> Login
                  </Button>
                </Link>
              </li>
            </>
          )}
          <li className={"block md:hidden"}>
            <MobileToggle session={session} />
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default IndexNavbar;
