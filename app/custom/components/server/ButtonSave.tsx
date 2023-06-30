"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Icons } from "@/components/Icons";
import { setInformation } from "@/app/redux/slice/formController.slice";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ButtonSaveCustomForm = ({ session }: any) => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { layer, infomation } = useAppSelector((state) => state.formReducer);
  const supabase = createClientComponentClient();
  const saveLayer = async () => {
    console.log("session", session?.user?.id);
    //log user id
    setLoading(true);
    console.log(layer);
    if (infomation.id) {
      const { data, error } = await supabase
        .from("form")
        .upsert({
          id: infomation.id,
          layer: layer,
        })
        .select();
      if (error) {
        console.log(error);
      }
      setLoading(false);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
      return;
    }
    const { data, error } = await supabase
      .from("form")
      .insert({
        layer: layer,
        user: session?.user?.id || "",
      })
      .select();
    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }
    setLoading(false);
    dispatch(
      setInformation({
        id: data[0].id,
      })
    );
    //toast success
    toast({
      title: "Success",
      description: "Your form has been saved",
    });
  };

  return (
    <Button
      onClick={saveLayer}
      disabled={loading}
      className="h-full px-10 py-3 font-medium"
    >
      {loading && <Icons.spinner className="animate-spin mr-2 h-5 w-5" />}
      SAVE
    </Button>
  );
};

export default ButtonSaveCustomForm;
