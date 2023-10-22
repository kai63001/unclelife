"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types_db";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmail = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        description: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    }
    //validate email
    const emailRegex =
      // eslint-disable-next-line no-control-regex
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email is invalid",
        description: "Please check your email",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    toast({
      title: "Success",
      description: "Login successfully",
    });
    setLoading(false);
    //redirect
    router.push("/home");
  };

  async function signInWithNotion() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/callback`,
      },
    });
    if (error) console.log(error);
    setLoading(false);
  }

  return (
    <div>
      <form
        noValidate
        onSubmit={loginWithEmail}
        className="flex justify-center flex-col items-center space-y-2 pb-5 border-b"
      >
        <Input
          placeholder="Email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
        />
        <Button className="w-full" onClick={loginWithEmail}>
          {loading ? <Icons.spinner className="animate-spin" /> : "Login"}
        </Button>
        <div>
          Don{"'"}t have an account?{" "}
          <Link href="/register" className="text-red-500">
            Register
          </Link>
        </div>
      </form>
      <div className="flex justify-center items-center mt-5">
        <Button onClick={signInWithNotion} className="w-full ">
          {loading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <>
              <Icons.google className="mr-2 h-5 w-5" />
              Login with Google
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Login;
