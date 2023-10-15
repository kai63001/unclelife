"use client";

import { useSupabase } from "@/app/hook/supabase-provider";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const RegisterCompoment = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { supabase } = useSupabase();
  const listHowDidYouHearAboutUs = [
    "Google",
    "Twitter",
    "Facebook",
    "Reddit",
    "YouTube",
    "LinkedIn",
    "Instagram",
    "A friend or colleague",
    "Other",
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [howDidYouHearAboutUs, setHowDidYouHearAboutUs]: any =
    useState(undefined);

  const createAccount = async () => {
    //check required
    if (!email || !password || !confirmPassword || !howDidYouHearAboutUs) {
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
    //validate
    if (password !== confirmPassword) {
      toast({
        title: "Password and confirm password must be the same",
        description: "Please check your password",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    const { error, data: createdUser }: any = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/callback`,
      },
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
    const emailIsTaken = createdUser?.user.identities?.length === 0;

    if (emailIsTaken) {
      toast({
        title: "Error",
        description: "Email is taken",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    toast({
      title: "Success",
      description: "Please check your email to verify your account",
      variant: "default",
    });
    //clear form
    setEmail("");
    setPassword("");
    setConfirmPassowrd("");
    setHowDidYouHearAboutUs("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-3">
      <Input
        placeholder="Email address"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <Select
        value={howDidYouHearAboutUs}
        onValueChange={(e) => {
          setHowDidYouHearAboutUs(e);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="How did you come to know about us?" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {listHowDidYouHearAboutUs.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
        type="password"
      />
      <Input
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassowrd(e.target.value);
        }}
        placeholder="Confirm Password"
        type="password"
      />
      <Button onClick={createAccount}>
        {loading ? (
          <Icons.spinner className="animate-spin" />
        ) : (
          "Create Account"
        )}
      </Button>
    </div>
  );
};

export default RegisterCompoment;
