"use client";
import { useAppDispatch } from "@/app/redux/hook";
import { setLayerWithId } from "@/app/redux/slice/formController.slice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const GridColForOption = ({data}: any) => {
  const dispatch = useAppDispatch();

  const updateOptionGridLayout = (e: any) => {
    dispatch(
      setLayerWithId({
        id: data?.id,
        value: {
          ...data,
          gridLayout: e,
        },
      })
    );
  };

  return (
    <div>
      <span className={"text-lg font-medium"}>Options Layout</span>
      <Select value={data?.gridLayout} onValueChange={(e)=>updateOptionGridLayout(e)} defaultValue="grid-cols-1">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Layout" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Grid Layout</SelectLabel>
            <SelectItem value="grid-cols-1">1 Column</SelectItem>
            <SelectItem value="grid-cols-2">2 Column</SelectItem>
            <SelectItem value="grid-cols-3">3 Column</SelectItem>
            <SelectItem value="grid-cols-4">4 Column</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
