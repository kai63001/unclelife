import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";

const ButtonMapInput = () => {
  return (
    <div>
      <Button variant="outline" className="h-full px-10 py-3 font-medium">
        <ArrowLeftRight className="h-4 w-4 mr-3" />
        Map Input
      </Button>
    </div>
  );
};

export default ButtonMapInput;
