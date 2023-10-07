import { Button } from "@/components/ui/button";
import ConditionGroup from "./ConditionGroup";
import { X } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";


const LogicGroup = ({
  index,
  group,
  handleOperatorChange,
  handleValueChange,
  addGroup,
  removeGroup,
  addCondition,
  conditionPath,
  removeCondition,
  handleGroupOperatorChange
}: any) => {
  return (
    <div>
      {group.conditions.map((item: any, conditionIndex: any) => {
        const newPath = [...conditionPath, "conditions", conditionIndex];
        if (item.type === "condition") {
          return (
            <ConditionGroup
              index={index}
              key={conditionIndex}
              condition={item}
              handleOperatorChange={handleOperatorChange}
              handleValueChange={handleValueChange}
              addCondition={addCondition}
              removeCondition={removeCondition}
              addGroup={addGroup}
              removeGroup={removeGroup}
              conditionPath={newPath}
              conditionIndex={conditionIndex}
            />
          );
        } else if (item.type === "group") {
          return (
            <>
              <div className="flex justify-center mt-2">
                <Select
                  onValueChange={(e) => handleGroupOperatorChange(e,newPath, index)}
                  value={item?.operator || undefined}
                >
                  <SelectTrigger className="w-2/12">
                    <SelectValue placeholder="Operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fields</SelectLabel>
                      <SelectItem value="&&">AND</SelectItem>
                      <SelectItem value="||">OR</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="border border-dashed px-2 pt-2 pb-3 mt-2">
                <div className="flex justify-end space-x-2 mt-2">
                  {/* <Button onClick={() => removeGroup(newPath)}>
                    Remove Group
                </Button> */}
                  <X
                    onClick={() => removeGroup(newPath, index)}
                    className="cursor-pointer h-6 w-6"
                  />
                </div>
                <LogicGroup
                  index={index}
                  key={conditionIndex}
                  group={item}
                  handleOperatorChange={handleOperatorChange}
                  handleValueChange={handleValueChange}
                  addCondition={addCondition}
                  removeCondition={removeCondition}
                  addGroup={addGroup}
                  removeGroup={removeGroup}
                  conditionPath={newPath}
                />
              </div>
            </>
          );
        }
      })}
      {/* {conditionPath == "when" && (
        <div className="flex justify-end mt-2 space-x-2">
          <Button onClick={() => addGroup(conditionPath)}>
            Add Nested Group
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default LogicGroup;
