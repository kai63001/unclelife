import { Button } from "@/components/ui/button";
import ConditionGroup from "./ConditionGroup";

const LogicGroup = ({
  group,
  handleOperatorChange,
  handleValueChange,
  addGroup,
  removeGroup,
  addCondition,
  conditionPath,
  removeCondition
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
              removeGroup={() => removeGroup(newPath)}
              conditionPath={newPath}
            />
          );
        } else if (item.type === "group") {
          return (
            <>
            <hr />
            <div>{newPath}</div>
            <LogicGroup
              key={conditionIndex}
              group={item}
              handleOperatorChange={handleOperatorChange}
              handleValueChange={handleValueChange}
              addCondition={addCondition}
              removeCondition={removeCondition}
              addGroup={addGroup}
              removeGroup={() => removeGroup(newPath)}
              conditionPath={newPath}
            />
            </>
          );
        }
      })}
      <div className="flex justify-center mt-2 space-x-2">
        <Button onClick={() => addGroup(conditionPath)}>
          Add Nested Group
        </Button>
        <br />
        {conditionPath != "when" && (
          <Button onClick={() => removeGroup(conditionPath)}>
            Remove Group
          </Button>
        )}
      </div>
    </div>
  );
};

export default LogicGroup;
