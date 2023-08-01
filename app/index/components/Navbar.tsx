import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/types_db";
import {ModeToggle} from "@/components/ModeToggle";

const IndexNavbar = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="max-w-6xl m-auto w-full flex justify-between pt-8 items-center">
      <Link href="/" className="font-bold text-xl">
        UncleLife
        <span className="ml-2 text-xs">BETA</span>
      </Link>
      <nav className="">
        <ul className="flex space-x-4 items-center">
          <Link href="https://blog.unclelife.co" target="_blank">
            <li className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Blog</li>
          </Link>
          <Link href={'/pricing'}>
            <li className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Pricing</li>
          </Link>
          {session ? (
            <Link href={'/home'}>
              <Button>
                <li>Dashboard</li>
              </Button>
            </Link>
          ) : (
            <>
              <Link href={'/login'}>
                <li>
                  <Button>
                    <LogIn className="mr-2" size={20} /> Login
                  </Button>
                </li>
              </Link>
            </>
          )}
          <li>
            <ModeToggle/>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default IndexNavbar;
