import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import dynamic from "next/dynamic";
import ProBadge from "../toolsbar/ProBadge";
const ListNotification = dynamic(
  () => import("./notification/ListNotification"),
  {
    ssr: false,
  }
);

const ButtonNotification = () => {
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
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex space-x-2 items-center">
            <Mail className="h-4 w-4 mr-2" />
            Notification & Integrations <ProBadge />
          </DialogTitle>
          {/* <DialogDescription>
            Conditional logic enables you to tailor the form experience for your
            respondents by creating intelligent paths based on their input.
          </DialogDescription> */}
        </DialogHeader>
        <ListNotification />
      </DialogContent>
    </Dialog>
  );
};

export default ButtonNotification;
