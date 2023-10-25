"use client";

import ProBadge from "@/app/custom/components/toolsbar/ProBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import { useState } from "react";

export const ShareURLDetailForm = ({ id }: any) => {
  const [onCustomBackHref, setOnCustomBackHref] = useState(false);
  const { toast } = useToast();
  const copyUrl = () => {
    navigator.clipboard.writeText(`https://unclelife.co/public/form/${id}`);
    toast({
      title: "Success",
      description: "Copied",
    });
  };
  return (
    <div>
      <div className="border dark:bg-background bg-gray-100 rounded-sm mt-1 w-full px-3 py-2 flex justify-between items-center">
        <p>https://unclelife.co/public/form/{id}</p>
        <Button onClick={() => copyUrl()} className="py-1 h-7 px-2">
          <Copy className="w-4 h-4 mr-2" />
          COPY
        </Button>
      </div>
      {onCustomBackHref ? (
        <div className="mt-1 space-x-3 flex items-end">
          <div className="w-3/12">
            <Label>Domain</Label>
            <Input disabled value={`https://unclelife.co/public/form/`} />
          </div>
          <div className="w-7/12">
            <Label>Enter a back-half</Label>
            <Input placeholder={'example: contact-form, feedback-unclelife'} />
          </div>
          <Button className="w-2/12">Submit</Button>
          <Button onClick={()=>setOnCustomBackHref(false)} variant={'ghost'} className="w-1/12">close</Button>
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
