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
            <div style={{marginLeft: newPath.length != 3 ? newPath.length * 5 : 0}}>
              <hr />
              {conditionPath}
              <div className="flex justify-end space-x-2 mt-2">
                <Button onClick={() => addGroup(newPath)}>
                  Add Group
                </Button>
                <Button onClick={() => removeGroup(newPath)}>
                    Remove Group
                </Button>
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
      {conditionPath == "when" && (
        <div className="flex justify-center mt-2 space-x-2">
          <Button onClick={() => addGroup(conditionPath)}>
            Add Nested Group
          </Button>
          {/* <br />
        {conditionPath != "when" && (
          <Button onClick={() => removeGroup(conditionPath)}>
            Remove Group
          </Button>
        )} */}
        </div>
      )}
    </div>
  );
};

export default LogicGroup;
