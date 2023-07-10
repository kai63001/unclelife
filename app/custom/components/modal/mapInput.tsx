import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftRight, ArrowRight } from "lucide-react";

const ModalMapInput = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-full px-10 py-3 font-medium">
          <ArrowLeftRight className="h-4 w-4 mr-3" />
          Map Input
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Map Layer Input <ArrowRight className="h-4 w-6" /> Notion Database{" "}
          </DialogTitle>
          <DialogDescription>
            Map Input Fields to Notion Database Properties
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalMapInput;
