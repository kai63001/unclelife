"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Icons } from "@/components/Icons";
import { Database } from "@/lib/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const LoginPage = () => {
  const form = useForm();
  const supabase = createClientComponentClient<Database>()

  async function signInWithNotion() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'notion',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
    console.log(data, error)
  }

  return (
    <div className="h-screen w-screen bg-[#F2F2F2] flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* close */}
        <div className="flex justify-end">
          <X size={24} /> 
        </div>
        <h1 className="text-center text-3xl font-bold">UncleLife</h1>
        <h2 className="flex w-full text-center justify-center text-xl whitespace-pre-line my-5">
          One account for
          {"\n"}All your Notion pages
        </h2>
        <Form {...form}>
          <form className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail address:</FormLabel>
                  <FormControl>
                    <Input placeholder="uncle@life.co" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" style={{ marginTop: 20 }}>
              Sign in
            </Button>
          </form>
        </Form>
        <div className="border-b my-4"></div>
        {/* notion login */}
        <div className="flex justify-center items-center">
          <Button onClick={signInWithNotion} className="w-full ">
            <Icons.notion  className="mr-2 h-5 w-5"/>
            Login with Notion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
