"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setLogic } from "@/app/redux/slice/formController.slice";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LogicGroup from "./LogicGroup";
import _ from "lodash";

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

  const handleOperatorChange = (newOperator: string, conditionPath: any[], index:any = 0) => {
    const newLogic = _.cloneDeep(logic);

    // Get the conditions array of the group where you want to add a new condition
    const targetConditions = _.get(newLogic[index], conditionPath);
    console.log(conditionPath);

    // Push a new condition to the target group's conditions array
    if (
      Object.prototype.toString.call(targetConditions) === "[object Object]"
    ) {
      targetConditions.operator = newOperator;
    }

    dispatch(setLogic(newLogic));
  };

  const handleValueChange = (newValue: any, conditionPath: any[],index:any = 0) => {
    const newLogic = _.cloneDeep(logic);

    // Get the conditions array of the group where you want to add a new condition
    const targetConditions = _.get(newLogic[index], conditionPath);
    console.log(conditionPath);

    // Push a new condition to the target group's conditions array
    if (
      Object.prototype.toString.call(targetConditions) === "[object Object]"
    ) {
      targetConditions.value = newValue;
    }

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
        conditions: [
          {
            type: "condition",
            operator: undefined,
            value: "",
          },
        ],
      },
      then: {
        type: "",
      },
    });
    dispatch(setLogic(newLogic));
  };

  const addCondition = (conditionPath: any, index: any = 0) => {
    const newLogic = _.cloneDeep(logic);
    let pointer = newLogic[index];

    for (let i = 0; i < conditionPath.length - 1; i++) {
      pointer = pointer[conditionPath[i]];
    }

    console.log(conditionPath);
    console.log(pointer);

    // get last condition index in the group
    const lastConditionIndex = pointer
      .map((item: any) => item.type)
      .lastIndexOf("condition");

    // Insert a new condition after the last condition
    pointer.splice(lastConditionIndex + 1, 0, {
      type: "condition",
      operator: undefined,
      value: "",
    });

    // pointer.push({
    //   type: "condition",
    //   operator: undefined,
    //   value: "",
    // });

    dispatch(setLogic(newLogic));
  };

  const removeCondition = (conditionPath: any, index: any = 0) => {
    const newLogic = _.cloneDeep(logic);
    let pointer = newLogic[index]; // Assuming you're working with the first logic group

    // Traverse to the parent of the group to be removed
    for (let i = 0; i < conditionPath.length - 1; i++) {
      pointer = pointer[conditionPath[i]];
    }

    // Remove the group from its parent's conditions
    if (Array.isArray(pointer)) {
      pointer.splice(conditionPath[conditionPath.length - 1], 1);
    } else if (pointer && pointer.conditions) {
      pointer.conditions.splice(conditionPath[conditionPath.length - 1], 1);
    }

    dispatch(setLogic(newLogic));
  };

  const addGroup = (conditionPath: any, index: any = 0) => {
    const newLogic = _.cloneDeep(logic);
    let pointer = newLogic[index];

    for (let i = 0; i < conditionPath.length; i++) {
      pointer = pointer[conditionPath[i]];
    }

    console.log(conditionPath);

    pointer.conditions.push({
      type: "group",
      operator: "&&",
      conditions: [
        {
          type: "condition",
          operator: undefined,
          value: "",
        },
      ],
    });

    console.log(newLogic);

    dispatch(setLogic(newLogic));
  };

  const removeGroup = (conditionPath: any, index: any = 0) => {
    //remove group with conditionPath
    const newLogic = _.cloneDeep(logic);
    let pointer = newLogic[index];

    console.log(conditionPath);

    for (let i = 0; i < conditionPath.length - 1; i++) {
      pointer = pointer[conditionPath[i]];
    }

    // Remove the group from its parent's conditions
    if (Array.isArray(pointer)) {
      pointer.splice(conditionPath[conditionPath.length - 1], 1);
    } else if (pointer && pointer.conditions) {
      pointer.conditions.splice(conditionPath[conditionPath.length - 1], 1);
    }

    dispatch(setLogic(newLogic));
  };

  return (
    <>
      {logic?.map((item: any, index: any) => (
        <div key={index} className="border border-dashed px-10 py-4">
          <div className="flex items-center mt-2 space-x-2 justify-start">
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
              value={logic[index]?.then?.layerId || undefined}
            >
              <SelectTrigger className="w-11/12">
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
          </div>
          <LogicGroup
            index={index}
            group={item.when}
            handleOperatorChange={handleOperatorChange}
            handleValueChange={handleValueChange}
            addGroup={addGroup}
            removeGroup={removeGroup}
            addCondition={addCondition}
            removeCondition={removeCondition}
            conditionPath={["when"]}
          />
          <div className="flex w-full m-auto justify-center">
            <div className="w-3 h-3 border mt-1.5"></div>
          </div>
          <div className="flex items-center mt-2 space-x-2 justify-start">
            <p
              className="font-bold w-1/12 text-muted-foreground"
              onClick={() => {
                console.log(logic);
              }}
            >
              THEN
            </p>
            <Select
              onValueChange={(e) => handleThenFieldChange(e, index)}
              value={logic[index]?.then?.layerId || undefined}
            >
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
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-1/12">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem className="w-full pl-5 py-2 hover:bg-muted rounded-md hover:cursor-pointer">
                    <GitPullRequest className="h-5 w-5 inline-block mr-2" />
                    Add Condition
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full pl-5 py-2 hover:bg-muted rounded-md hover:cursor-pointer">
                    <Group className="h-5 w-5 inline-block mr-2" />
                    Add Group
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
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
