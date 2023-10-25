import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cache } from "react";

const supabase = createClientComponentClient();

export const getFormData = cache(async (id: string) => {
  // check if id is not a uuid
  if (!id.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/)) {
    return await supabase
    .from("form")
    .select("id,layer,detail,databaseId,user_id (is_subscribed,id),logic,notification")
    .eq("slug", id)
    .single();
  }

  return await supabase
    .from("form")
    .select("id,layer,detail,databaseId,user_id (is_subscribed,id),logic,notification")
    .eq("id", id)
    .single();
});

function evaluateCondition(
  operator: string,
  value: any,
  compareValue: any
): boolean {
  switch (operator) {
    case "=":
      return compareValue == value;
    case ">":
      return compareValue > value;
    case "<":
      return compareValue < value;
    case "<=":
      return compareValue <= value;
    case ">=":
      return compareValue >= value;
    case "!=":
      return compareValue != value;
    default:
      return false;
  }
}

export function evaluateGroup(group: any, compareValue: any): boolean {
  if (group.type === "condition") {
    return evaluateCondition(group.operator, group.value, compareValue);
  }

  if (group.operator === "&&") {
    return group.conditions.every((condition: any) =>
      evaluateGroup(condition, compareValue)
    );
  } else if (group.operator === "||") {
    console.log("group.conditions", group.conditions);
    return group.conditions.some((condition: any) =>
      evaluateGroup(condition, compareValue)
    );
  }
  return false;
}
