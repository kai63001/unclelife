"use client";

import ColorSelectComponent from "@/app/(dashboard)/widget/pomodoro/components/Toolbar/Customization/ColorSelectComponent";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setLogic } from "@/app/redux/slice/formController.slice";
import { Button } from "@/components/ui/button";
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
  const { layer, logic } = useAppSelector((state) => state.formReducer);

  const handleFieldChange = (e: any, index: any) => {
    const newLogic = [...logic];
    newLogic[index] = {
      ...newLogic[index],
      layerId: e,
    };
    dispatch(setLogic(newLogic));
  };

  const handleOperatorChange = (e: any, index: any) => {
    const newLogic = [...logic];
    newLogic[index] = {
      ...newLogic[index],
      when: {
        ...newLogic[index].when,
        conditions: [
          {
            ...newLogic[index].when.conditions[0],
            type: "condition",
            operator: e,
          },
        ],
      },
    };
    dispatch(setLogic(newLogic));
  };

  const handleValueChange = (e: any, index: any) => {
    const newLogic = [...logic];
    newLogic[index] = {
      ...newLogic[index],
      when: {
        ...newLogic[index].when,
        conditions: [
          {
            ...newLogic[index].when.conditions[0],
            value: e.target.value,
          },
        ],
      },
    };
    dispatch(setLogic(newLogic));
  };

  const handleThenFieldChange = (e: any, index: any) => {
    const newLogic = [...logic];
    newLogic[index] = {
      ...newLogic[index],
      then: {
        ...newLogic[index].then,
        layerId: e,
      },
    };
    dispatch(setLogic(newLogic));
  };

  const handleActionChange = (e: any, index: any) => {
    const newLogic = [...logic];
    newLogic[index] = {
      ...newLogic[index],
      then: {
        ...newLogic[index].then,
        type: e,
      },
    };
    dispatch(setLogic(newLogic));
  };

  const addHandleLogic = () => {
    const newLogic = [...logic];
    newLogic.push({
      when: {
        type: "group",
        operator: "&&",
        conditions: [],
      },
      then: {
        type: "",
      },
    });
    dispatch(setLogic(newLogic));
  };

  return (
    <>
      {logic?.map((item: any, index: any) => (
        <div key={index} className="border border-dashed px-10 py-4">
          <div className="flex items-center space-x-2 justify-start">
            <p
              className="font-bold w-1/12 text-muted-foreground"
              onClick={() => {
                console.log(logic);
              }}
            >
              WHEN
            </p>
            <Select
              onValueChange={(e) => handleFieldChange(e, index)}
              value={logic[index]?.layerId}
            >
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
            <Select
              onValueChange={(e) => handleOperatorChange(e, index)}
              value={
                logic[index]?.when?.conditions.length > 0
                  ? logic[index]?.when?.conditions[0]?.operator
                  : undefined
              }
            >
              <SelectTrigger className="w-3/12">
                <SelectValue placeholder="Operators" />
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
              onChange={(e) => handleValueChange(e, index)}
              value={
                logic[index]?.when?.conditions.length > 0
                  ? logic[index]?.when?.conditions[0]?.value
                  : undefined
              }
              className="w-5/12"
              placeholder="Enter a value"
            />
          </div>
          <div className="flex items-center mt-2 space-x-2 justify-start">
            <p className="font-bold w-1/12 text-muted-foreground">THEN</p>
            <Select onValueChange={(e) => handleThenFieldChange(e, index)} value={
                logic[index]?.then?.layerId || undefined
            }>
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
            <Select
              onValueChange={(e) => handleActionChange(e, index)}
              value={logic[index]?.then?.type || undefined}
            >
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
      ))}
      <Button
        onClick={() => {
          addHandleLogic();
        }}
      >
        Add Logic
      </Button>
    </>
  );
};

export default ConditionLogic;
