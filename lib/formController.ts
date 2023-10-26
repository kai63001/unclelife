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

export function calculateTextColor(color: string): string {
  if (!color) {
    return "#000000";
  }
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16); // hexToR
  const g = parseInt(hex.substring(2, 4), 16); // hexToG
  const b = parseInt(hex.substring(4, 6), 16); // hexToB

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#ffffff";
}