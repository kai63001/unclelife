"use client";
import { useAppSelector } from "@/app/redux/hook";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Icons } from "@/components/Icons";

const CustomFormNavbar = () => {
  const [loading, setLoading] = useState(false);
  const { layer } = useAppSelector((state) => state.formReducer);
  const supabase = createClientComponentClient();

  const saveLayer = async () => {
    setLoading(true);
    console.log(layer);
    const { data, error } = await supabase.from("form").insert({
        layer: layer,
    }).select();
    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }
    console.log(data);
    setLoading(false);
  };

  return (
    <div className="mt-5 pl-5 pr-5 flex w-full justify-between items-center fixed z-50">
      <div className="flex space-x-3 items-center">
        <Link href="/" className="bg-background px-5 py-2 rounded-md shadow-me">
          <h1 className="font-bold text-2xl">Uncle Life</h1>
        </Link>
        <div className="bg-background px-5 py-3 rounded-md shadow-me font-medium">
          Custom Form
        </div>
      </div>
      <Button
        onClick={saveLayer}
        disabled={loading}
        className="h-full px-10 py-3 font-medium"
      >
        {loading && <Icons.spinner className="animate-spin mr-2 h-5 w-5" />}
        SAVE
      </Button>
    </div>
  );
};

export default CustomFormNavbar;
