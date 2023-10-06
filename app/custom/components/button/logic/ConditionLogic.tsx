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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GitPullRequest, Group, MoreVertical, Trash } from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
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

  const handleOperatorChange = (e: any, index: any, conditionIndex: any) => {
    const newLogic = [...logic];
    const newCondition = [...newLogic[index].when.conditions];
    newCondition[conditionIndex] = {
      ...newCondition[conditionIndex],
      operator: e,
    };
    newLogic[index] = {
      ...newLogic[index],
      when: {
        ...newLogic[index].when,
        conditions: newCondition,
      },
    };
    dispatch(setLogic(newLogic));
  };

  const handleValueChange = (e: any, index: any, conditionIndex: any) => {
    const newLogic = [...logic];
    const newCondition = [...newLogic[index].when.conditions];
    newCondition[conditionIndex] = {
      ...newCondition[conditionIndex],
      value: e.target.value,
    };
    newLogic[index] = {
      ...newLogic[index],
      when: {
        ...newLogic[index].when,
        conditions: newCondition,
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

  const handleChangeOperatorMain = (e: any, index: any) => {
    const newLogic = [...logic];
    newLogic[index] = {
      ...newLogic[index],
      when: {
        ...newLogic[index].when,
        operator: e,
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

  const addCondition = (conditionPath: any) => {
    const newLogic = _.cloneDeep(logic);

    // Get the conditions array of the group where you want to add a new condition
    const targetConditions = _.get(newLogic[0], conditionPath);

    // Push a new condition to the target group's conditions array
    if (Array.isArray(targetConditions)) {
      targetConditions.push({
        type: "condition",
        operator: undefined,
        value: "",
      });
    }

    console.log(newLogic)

    dispatch(setLogic(newLogic));
  };

  const removeCondition = (index: any, conditionIndex: any) => {
    const newLogic = [...logic];
    newLogic[index] = {
      ...newLogic[index],
      when: {
        ...newLogic[index].when,
        conditions: newLogic[index].when.conditions.filter(
          (item: any, index: any) => index !== conditionIndex
        ),
      },
    };
    dispatch(setLogic(newLogic));
  };

  const addGroupCondition = (index: any) => {
    const newLogic = [...logic];
    newLogic[index] = {
      ...newLogic[index],
      when: {
        ...newLogic[index].when,
        conditions: [
          ...newLogic[index].when.conditions,
          {
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
        ],
      },
    };
    dispatch(setLogic(newLogic));
  };

  const addGroup = (conditionPath: any) => {
    const newLogic = _.cloneDeep(logic);
    let pointer = newLogic[0];

    for (let i = 0; i < conditionPath.length; i++) {
      pointer = pointer[conditionPath[i]];
    }

    pointer.conditions.push({
      type: "group",
      operator: "&&",
      conditions: [],
    });

    console.log(newLogic);

    dispatch(setLogic(newLogic));
  };

  const removeGroup = (conditionPath: any) => {
    const newLogic = _.cloneDeep(logic);
    let pointer = newLogic[0]; // Assuming you're working with the first logic group

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

    console.log(newLogic);

    dispatch(setLogic(newLogic));
  };

  return (
    <>
      {logic?.map((item: any, index: any) => (
        <div key={index} className="border border-dashed px-10 py-4">
          <LogicGroup
            group={item.when}
            handleOperatorChange={handleOperatorChange}
            handleValueChange={handleValueChange}
            addGroup={addGroup}
            removeGroup={removeGroup}
            addCondition={addCondition}
            conditionPath={["when"]}
          />
          <div className="flex w-full m-auto justify-center">
            <div className="w-3 h-3 border mt-1.5"></div>
          </div>
          <div className="flex items-center mt-2 space-x-2 justify-start">
            <p className="font-bold w-1/12 text-muted-foreground">THEN</p>
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
