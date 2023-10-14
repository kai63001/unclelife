"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types_db";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Login = () => {
  const supabase = createClientComponentClient<Database>();

  async function signInWithNotion() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/callback`,
      },
    });
    if (error) console.log(error);
  }

  return (
    <div>
      <div className="flex justify-center flex-col items-center space-y-2 pb-5 border-b">
        <Input placeholder="Email address" />
        <Input placeholder="Password" />
        <Button className="w-full">Login</Button>
        <div>
          Don{"'"}t have an account?{" "}
          <Link href="/register" className="text-red-500">
            Register
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center mt-5">
        <Button onClick={signInWithNotion} className="w-full ">
          <Icons.google className="mr-2 h-5 w-5" />
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
