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

export const HeaderForOption = ({ data }: any) => {
  const dispatch = useAppDispatch();

  const updateOptionGridLayout = (e: any) => {
    dispatch(
      setLayerWithId({
        id: data?.id,
        value: {
          ...data,
          headerOption: e,
        },
      })
    );
  };

  return (
    <div>
      <span className={"text-lg font-medium"}>Leading Options</span>
      <Select
        value={data?.headerOption}
        onValueChange={(e) => updateOptionGridLayout(e)}
        defaultValue="number"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a leading" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Leading for Option</SelectLabel>
            <SelectItem value="number">Number (1,2,3,4...)</SelectItem>
            <SelectItem value="alphabet">Alphabet (A,B,C,D...)</SelectItem>
            <SelectItem value="hide">Hide</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
