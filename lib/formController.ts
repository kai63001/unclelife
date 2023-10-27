import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cache } from "react";

const supabase = createClientComponentClient();

export const getFormData = cache(async (id: string) => {
  // check if id is not a uuid
  if (
    !id.match(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
    )
  ) {
    return await supabase
      .from("form")
      .select(
        "id,layer,detail,databaseId,user_id (is_subscribed,id),logic,notification"
      )
      .eq("slug", id)
      .single();
  }

  return await supabase
    .from("form")
    .select(
      "id,layer,detail,databaseId,user_id (is_subscribed,id),logic,notification"
    )
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

export function convertNumberToAlphabet(number: number): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[number];
}

export function hexColorToHsl(hex: string): string {
  // Remove the '#' if it's included in the input
  hex = hex.replace(/^#/, "");

  // Convert the hex value to RGB
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  // Find the minimum and maximum values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // Calculate the lightness
  let l = (max + min) / 2;

  // Calculate the saturation
  let s = 0;
  if (max !== min) {
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
  }

  // Calculate the hue
  let h = 0;
  if (max === r) {
    h = (g - b) / (max - min);
  } else if (max === g) {
    h = 2 + (b - r) / (max - min);
  } else {
    h = 4 + (r - g) / (max - min);
  }
  h *= 60;
  if (h < 0) {
    h += 360;
  }

  // Round HSL values to percentages
  h = Math.round(h);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}

export function hexColorToRgb(hex: string): string {
  const hexCode = hex.replace("#", "");
  const r = parseInt(hexCode.substring(0, 2), 16); // hexToR
  const g = parseInt(hexCode.substring(2, 4), 16); // hexToG
  const b = parseInt(hexCode.substring(4, 6), 16); // hexToB

  return `${r},${g},${b}`;
}

export function rgbToHsl(rgb: string): string {
  const [r, g, b] = rgb.split(",").map((item) => parseInt(item));
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;

  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  console.log(`${h} ${s} ${l}`);

  return `${h} ${s}% ${l}%`;
}
