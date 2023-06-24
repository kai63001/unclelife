import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/types_db";

const IndexNavbar = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="max-w-6xl m-auto w-full flex justify-between pt-8 items-center">
      <div className="font-bold text-xl">UncleLife</div>
      <nav className="">
        <ul className="flex space-x-4 items-center">
          <Link href="/">
            <li className="text-gray-500 hover:text-gray-900">Pricing</li>
          </Link>
          {session ? (
            <Link href="/home">
              <Button>
                <li>Dashboard</li>
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/">
                <li className="text-gray-500 hover:text-gray-900">Sign Up</li>
              </Link>
              <Link href="/login">
                <li>
                  <Button>
                    <LogIn className="mr-2" size={20} /> Login
                  </Button>
                </li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default IndexNavbar;
