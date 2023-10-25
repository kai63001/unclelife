"use client";

import ProBadge from "@/app/custom/components/toolsbar/ProBadge";
import { useSupabase } from "@/app/hook/supabase-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Trash } from "lucide-react";
import { useState } from "react";
import { ShareUrlAlertDelete } from "./ShareURL/ShareURLAlertDelete";

export const ShareURLDetailForm = ({ id, dataSlug }: any) => {
  const [onCustomBackHref, setOnCustomBackHref] = useState(false);
  const [openAlertDelete, setOpenAlertDelete]: any = useState(false);
  const { supabase, user } = useSupabase();
  const [slug, setSlug] = useState(dataSlug || "");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const copyUrl = (data: string) => {
    navigator.clipboard.writeText(`https://unclelife.co/public/form/${data}`);
    toast({
      title: "Success",
      description: "Copied",
    });
  };

  const setHrefBack = async () => {
    if (!user.is_subscribed) {
      toast({
        title: "Error",
        description: "You need to upgrade to use this feature",
        variant: "destructive",
      });
      return;
    }
    if (!slug) {
      toast({
        title: "Error",
        description: "Slug is required",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    //check if slug is exist
    const { data, error } = await supabase
      .from("form")
      .select("id")
      .eq("slug", slug)
      .single();
    if (data) {
      toast({
        title: "Error",
        description: "Slug is already exist",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    //update slug
    const { data: dataUpdate, error: errorUpdate } = await supabase
      .from("form")
      .update({ slug })
      .eq("id", id).select("slug").single();
    if (errorUpdate) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (dataUpdate) {
      toast({
        title: "Success",
        description: "Slug is updated",
      });
    }

    setLoading(false);
    setOnCustomBackHref(false);
  };

  const deleteSlug = async () => {
    const { data, error } = await supabase
      .from("form")
      .update({ slug: null })
      .eq("id", id);
    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      return;
    }
    if (data) {
      toast({
        title: "Success",
        description: "Slug is deleted",
      });
    }
    setOpenAlertDelete(false);
    setSlug("");
  }

  return (
    <div>
      <div className="border dark:bg-background bg-gray-100 rounded-sm mt-1 w-full px-3 py-2 flex justify-between items-center">
        <p>https://unclelife.co/public/form/{id}</p>
        <Button onClick={() => copyUrl(id)} className="py-1 h-7 px-2">
          <Copy className="w-4 h-4 mr-2" />
          COPY
        </Button>
      </div>
      {(slug && !onCustomBackHref ) && (
        <div className="border dark:bg-background bg-gray-100 rounded-sm mt-1 w-full px-3 py-2 flex justify-between items-center">
          <p>https://unclelife.co/public/form/{slug}</p>
          <div className="flexx space-x-2">
            <Button onClick={() => copyUrl(slug)} className="py-1 h-7 px-2">
              <Copy className="w-4 h-4 mr-2" />
              COPY
            </Button>
            <Button
              onClick={() => setOpenAlertDelete(true)}
              variant={"destructive"}
              className="py-1 h-7 px-2"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
          <ShareUrlAlertDelete
            slug={slug}
            open={openAlertDelete}
            setOpen={setOpenAlertDelete}
            deleteData={deleteSlug}
          />
        </div>
      )}
      {onCustomBackHref ? (
        <div className="mt-1 space-x-3 flex items-end">
          <div className="w-3/12">
            <Label>Domain</Label>
            <Input disabled value={`https://unclelife.co/public/form/`} />
          </div>
          <div className="w-7/12">
            <Label>Enter a back-half</Label>
            <Input
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
              }}
              placeholder={"example: contact-form, feedback-unclelife"}
            />
          </div>
          <Button onClick={setHrefBack} loading={loading} className="w-2/12">
            Submit
          </Button>
          <Button
            onClick={() => setOnCustomBackHref(false)}
            variant={"ghost"}
            className="w-1/12"
          >
            close
          </Button>
        </div>
      ) : (
        <Button onClick={() => setOnCustomBackHref(true)} className="mt-1">
          <p className="mr-2">Custom Back-href (Slug)</p>
          <ProBadge />
        </Button>
      )}
    </div>
  );
};
