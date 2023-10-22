"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";

export const ShareURLDetailForm = ({id}:any) => {
  const { toast } = useToast();
  const copyUrl = () => {
    navigator.clipboard.writeText(`https://unclelife.co/public/form/${id}`);
    toast({
      title: "Success",
      description: "Copied",
    });
  };
  return (
    <div className="border bg-gray-100 rounded-sm mt-1 w-full px-3 py-2 flex justify-between items-center">
      <p>https://unclelife.co/public/form/{id}</p>
      <Button onClick={() => copyUrl()} className="py-1 h-7 px-2">
        <Copy className="w-4 h-4 mr-2" />
        COPY
      </Button>
    </div>
  );
};
