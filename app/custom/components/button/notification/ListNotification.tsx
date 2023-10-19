"use client";

import { Button } from "@/components/ui/button";
import { Send, Mail } from "lucide-react";
import dynamic from "next/dynamic";
const RespondentEmail = dynamic(() => import("./RespontEmail"), {
  ssr: false,
});

const ListNotification = ({
  selectNotification,
  setSelectNotification,
}: any) => {
  if (selectNotification == "RespondentEmail") {
    return <RespondentEmail />;
  }

  return (
    <div className="flex flex-col space-y-3">
      <Button
        onClick={() => setSelectNotification("RespondentEmail")}
        variant={"outline"}
        className="py-5"
      >
        <Send className="h-4 w-4 mr-2" />
        Respondent Email Notifications
      </Button>
      <Button
        variant={"outline"}
        className="py-5"
        disabled={true}
        onClick={() => setSelectNotification("SelfEmail")}
      >
        <Mail className="h-4 w-4 mr-2" />
        Self Email Notifications
      </Button>
    </div>
  );
};

export default ListNotification;
