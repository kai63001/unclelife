"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { GitPullRequest, Group, MoreVertical, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ConditionGroup = ({
  condition,
  handleOperatorChange,
  handleValueChange,
  conditionPath,
  addCondition,
  removeCondition,
  addGroup,
  removeGroup,
}: any) => {
  const handleLocalOperatorChange = (newOperator: string) => {
    handleOperatorChange(newOperator, conditionPath);
  };

  const handleLocalValueChange = (e: any) => {
    handleValueChange(e.target.value, conditionPath);
  };

  return (
    <div className="flex items-center mt-2 space-x-2 justify-start">
      <Select
        value={condition.operator || undefined}
        onValueChange={handleLocalOperatorChange}
      >
        <SelectTrigger className="w-3/12">
          <SelectValue placeholder="Operator" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="=">{"="}</SelectItem>
            <SelectItem value=">">{">"}</SelectItem>
            <SelectItem value="<">{"<"}</SelectItem>
            <SelectItem value=">=">{">="}</SelectItem>
            <SelectItem value="<=">{"<="}</SelectItem>
            <SelectItem value="!=">{"!="}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        value={condition.value}
        onChange={handleLocalValueChange}
        placeholder="Enter value"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={"icon"} className="w-1/12">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem
            onClick={() => {
              addCondition([...conditionPath]);
            }}
            className="w-full pl-5 py-2 hover:bg-muted rounded-md hover:cursor-pointer"
          >
            <GitPullRequest className="h-5 w-5 inline-block mr-2" />
            Add Condition
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              addGroup([...conditionPath.slice(0, -2)]);
            }}
            className="w-full pl-5 py-2 hover:bg-muted rounded-md hover:cursor-pointer"
          >
            <Group className="h-5 w-5 inline-block mr-2" />
            Add Group
          </DropdownMenuItem>
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                removeCondition([...conditionPath]);
              }}
              className="w-full pl-5 py-2 hover:bg-muted rounded-md hover:cursor-pointer text-red-500"
            >
              <Trash className="h-5 w-5 inline-block mr-2" />
              Remove Condtion
            </DropdownMenuItem>
          </>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ConditionGroup;
