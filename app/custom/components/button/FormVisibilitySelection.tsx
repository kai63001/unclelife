"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setForm } from "@/app/redux/slice/formController.slice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FormVisibilitySelection = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((state) => state.formReducer);

  const formVisibilityChange = (e: any) => {
    dispatch(
      setForm({
        name: "visibility",
        value: e,
      })
    );
  };

  return (
    <Select
      onValueChange={formVisibilityChange}
      value={form?.visibility}
      defaultValue="public"
    >
      <SelectTrigger className="w-[150px] h-13 font-medium bg-background">
        <SelectValue placeholder="Select form visibility" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
