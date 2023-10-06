import ConditionGroup from "./ConditionGroup";

const LogicGroup = ({
  group,
  handleOperatorChange,
  handleValueChange,
  addGroup,
  removeGroup,
  addCondition,
  conditionPath,
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
              conditionPath={newPath}
            />
          );
        } else if (item.type === "group") {
          return (
            <LogicGroup
              key={conditionIndex}
              group={item}
              handleOperatorChange={handleOperatorChange}
              handleValueChange={handleValueChange}
              addCondition={addCondition}
              addGroup={addGroup}
              removeGroup={() => removeGroup(newPath)}
              conditionPath={newPath}
            />
          );
        }

      })}
      <button
        onClick={() => {
          console.log(addCondition);
          addCondition([...conditionPath, "conditions"]);
        }}
      >
        Add Condition
      </button>
      <br />
      <button onClick={() => addGroup(conditionPath)}>Add Nested Group</button>
      <br />
      {conditionPath != 'when' && (
        <button onClick={() => removeGroup(conditionPath)}>Remove Group</button>
      )}
    </div>
  );
};

export default LogicGroup;
