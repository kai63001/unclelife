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
import { ArrowLeft, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import ProBadge from "../toolsbar/ProBadge";
import { useState } from "react";
const ListNotification = dynamic(
  () => import("./notification/ListNotification"),
  {
    ssr: false,
  }
);

const ButtonNotification = () => {
  const [selectNotification, setSelectNotification]: any = useState("none");

  const renderHeader = () => {
    switch (selectNotification) {
      case "RespondentEmail":
        return "Respondent Email Notifications";
      case "SelfEmail":
        return "Self Email Notifications";
      default:
        return "Notification & Integrations";
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
        >
          <Mail className="h-4 w-4" />
          <span className="ml-2 group-hover:w-full w-0 hidden group-hover:inline-block">
            Notification
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="flex flex-col space-y-2">
            {selectNotification != "none" && (
              <div className="flex items-center">
                <ArrowLeft
                  onClick={() => setSelectNotification("none")}
                  className="h-4 w-4 mr-2 cursor-pointer"
                />
              </div>
            )}
            <div className="flex space-x-2 items-center">
              <Mail className="h-4 w-4 mr-2" />
              {renderHeader()} <ProBadge />
            </div>
          </DialogTitle>
          {/* <DialogDescription>
            Conditional logic enables you to tailor the form experience for your
            respondents by creating intelligent paths based on their input.
          </DialogDescription> */}
        </DialogHeader>
        <ListNotification
          selectNotification={selectNotification}
          setSelectNotification={setSelectNotification}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ButtonNotification;
