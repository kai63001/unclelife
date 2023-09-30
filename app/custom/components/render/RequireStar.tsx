import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RequiredStar = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="inline-block ml-2">
          <div className="blockRequest">
            <span className="required-star text-red-500 mt-1"> *</span>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>
            This field is required. Please fill in this field before submitting
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default RequiredStar;
