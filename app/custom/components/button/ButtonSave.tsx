"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Icons } from "@/components/Icons";
import { setInformation } from "@/app/redux/slice/formController.slice";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";

const ButtonSaveCustomForm = ({ session }: any) => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { layer, infomation, databaseId, form } = useAppSelector(
    (state) => state.formReducer
  );

  const copyLink = () => {
    console.log("copy link")
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/form/${infomation.id}`
    );
  };
  const supabase = createClientComponentClient();
  const saveLayer = async () => {
    //log user id
    setLoading(true);
    console.log("user", session);
    if (infomation.id) {
      const { data, error } = await supabase
        .from("form")
        .upsert({
          id: infomation.id,
          detail: form,
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
        action: (
          <ToastAction onClick={copyLink} altText="Goto schedule to undo">
            Copy Link
          </ToastAction>
        ),
      });
      return;
    }
    const { data, error } = await supabase
      .from("form")
      .insert({
        layer: layer,
        user: session?.user?.id || "",
        detail: form,
        databaseId,
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
      action: (
        <ToastAction onClick={copyLink} altText="Goto schedule to undo">
          Copy Link
        </ToastAction>
      ),
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
