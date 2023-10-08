import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GitMerge } from "lucide-react";
import ProBadge from "../toolsbar/ProBadge";
import dynamic from "next/dynamic";
const ConditionLogic = dynamic(() => import("./logic/ConditionLogic"), {
  ssr: false,
});

const ButtonCondition = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={
            "bg-background px-5 py-3 rounded-md shadow-me font-medium flex items-center h-12 border-0 text-md group duration-200"
          }
          variant="outline"
        >
          <GitMerge className="h-4 w-4" />
          <span className="ml-2 group-hover:w-full w-0 hidden group-hover:inline-block">
            Logic
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex space-x-2">
            <GitMerge className="h-4 w-6" /> Conditional logic
            <ProBadge />
          </DialogTitle>
          <DialogDescription>
            Conditional logic enables you to tailor the form experience for your
            respondents by creating intelligent paths based on their input.
          </DialogDescription>
        </DialogHeader>
        <ConditionLogic/>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonCondition;
