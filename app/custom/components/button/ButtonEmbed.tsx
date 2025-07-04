"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Braces, ArrowLeft } from "lucide-react";
import { useState } from "react";
import FormInNotion from "@/app/custom/components/button/embed/FormInNotion";
import { useAppSelector } from "@/app/redux/hook";
import FormInWebsite from "@/app/custom/components/button/embed/FormInWebsite";
import FormInQRCode from "@/app/custom/components/button/embed/FormInQrCode";

const ButtonEmbed = () => {
  const [selection, setSelection] = useState("");
  const { infomation } = useAppSelector((state) => state.formReducer);

  const selectionRender = () => {
    switch (selection) {
      case "formInNotion":
        return <FormInNotion />;
      case "formInWebsite":
        return <FormInWebsite />;
      case "formInQRCode":
        return <FormInQRCode />;
      default:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Embed Form</DialogTitle>
              <DialogDescription>
                Pick one of the embed option below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4 py-4">
              <div
                onClick={() => setSelection("formInNotion")}
                className={
                  "border rounded-md px-4 py-2 cursor-pointer hover:bg-secondary"
                }
              >
                Embed Form in Notion Page
              </div>
              <div
                onClick={() => setSelection("formInWebsite")}
                className={
                  "border rounded-md px-4 py-2 cursor-pointer hover:bg-secondary"
                }
              >
                Embed Form in Website
              </div>
              <div
                onClick={() => setSelection("formInQRCode")}
                className={
                  "border rounded-md px-4 py-2 cursor-pointer hover:bg-secondary"
                }
              >
                QR Code
              </div>
            </div>
          </>
        );
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={
            "bg-background px-5 py-3 rounded-md shadow-me font-medium flex items-center h-12 border-0 text-md group duration-200"
          }
          variant="outline"
          disabled={!infomation?.id}
        >
          <Braces className="h-4 w-4" />
          <span className="group-hover:w-full group-hover:inline-block hidden w-0 duration-200 ml-2 transition-all">Embed Form</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        {selection && (
          <div
            onClick={() => setSelection("")}
            className={
              "flex hover:underline space-x-3 items-center cursor-pointer"
            }
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </div>
        )}
        {selectionRender()}
      </DialogContent>
    </Dialog>
  );
};

export default ButtonEmbed;
