import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FreeBadge from "../FreeBadge";
import { useTheme } from "next-themes";

export const DarkmodeSelectionForm = ({ onChangeHook, form }: any) => {
  const {setTheme} = useTheme();
  const updateTheme = (e: any) => {
    setTheme(e);
    onChangeHook(
      {
        ...form?.free,
        customizations: {
          ...form?.free?.customizations,
          ["darkMode"]: e,
        },
      },
      "free"
    );
  };

  return (
    <div>
      <Label className="pb-2 uppercase font-bold">
        Dark Mode
        <FreeBadge />
      </Label>
      <Select
        onValueChange={updateTheme}
        defaultValue="system"
        value={form?.free?.customizations?.darkMode}
      >
        <SelectTrigger className="mt-2">
          <SelectValue placeholder="Select a Mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="system">Auto - use system theme</SelectItem>
            <SelectItem value="light">Light Mode</SelectItem>
            <SelectItem value="dark">Dark Mode</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
