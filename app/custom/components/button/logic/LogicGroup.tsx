import { Button } from "@/components/ui/button";
import ConditionGroup from "./ConditionGroup";
import { X } from "lucide-react";

const LogicGroup = ({
  group,
  handleOperatorChange,
  handleValueChange,
  addGroup,
  removeGroup,
  addCondition,
  conditionPath,
  removeCondition,
}: any) => {
  return (
    <div>
      {group.conditions.map((item: any, conditionIndex: any) => {
        const newPath = [...conditionPath, "conditions", conditionIndex];
        if (item.type === "condition") {
          return (
            <ConditionGroup
              key={conditionIndex}
              condition={item}
              handleOperatorChange={handleOperatorChange}
              handleValueChange={handleValueChange}
              addCondition={addCondition}
              removeCondition={removeCondition}
              addGroup={addGroup}
              removeGroup={removeGroup}
              conditionPath={newPath}
            />
          );
        } else if (item.type === "group") {
          return (
            <div
              style={{
                marginLeft: newPath.length != 3 ? newPath.length * 5 : 0,
              }}
              className="border border-dashed px-2 pt-2 pb-3 mt-2"
            >
              <div className="flex justify-end space-x-2 mt-2">
                {/* <Button onClick={() => removeGroup(newPath)}>
                    Remove Group
                </Button> */}
                <X
                  onClick={() => removeGroup(newPath)}
                  className="cursor-pointer h-6 w-6"
                />
              </div>
              <LogicGroup
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
