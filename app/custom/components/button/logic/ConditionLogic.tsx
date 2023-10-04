"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
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

const ConditionLogic = () => {
  const dispatch = useAppDispatch();
  const { layer } = useAppSelector((state) => state.formReducer);

  return (
    <div className="border border-dashed px-10 py-4">
      <div className="flex items-center space-x-2 justify-start">
        <p className="font-bold w-1/12 text-muted-foreground">WHEN</p>
        <Select>
          <SelectTrigger className="w-4/12 overflow-hidden ">
            <SelectValue placeholder="Select a field" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fields</SelectLabel>
              {layer?.map((item, index) => (
                <SelectItem key={index} value={item.id}>
                  <p
                    className="overflow-hidden h-5 text-ellipsis"
                    dangerouslySetInnerHTML={{
                      __html: item.label,
                    }}
                  ></p>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-3/12">
            <SelectValue placeholder="Operators" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value=">">{">"}</SelectItem>
              <SelectItem value="<">{"<"}</SelectItem>
              <SelectItem value="=">{"="}</SelectItem>
              <SelectItem value=">=">{">="}</SelectItem>
              <SelectItem value="<=">{"<="}</SelectItem>
              <SelectItem value="!=">{"!="}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input className="w-5/12" placeholder="Enter a value" />
      </div>
      <div className="flex items-center mt-2 space-x-2 justify-start">
        <p className="font-bold w-1/12 text-muted-foreground">THEN</p>
        <Select>
          <SelectTrigger className="w-[32.333333%]">
            <SelectValue placeholder="Field" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fields</SelectLabel>
              {layer?.map((item, index) => (
                <SelectItem key={index} value={item.id}>
                  <p
                    className="overflow-hidden h-5 text-ellipsis"
                    dangerouslySetInnerHTML={{
                      __html: item.label,
                    }}
                  ></p>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-8/12">
            <SelectValue placeholder="Select a Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Actions</SelectLabel>
              <SelectItem value="required">Required</SelectItem>
              <SelectItem value="disabled">Disabled</SelectItem>
              <SelectItem value="hidden">Hidden</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ConditionLogic;
