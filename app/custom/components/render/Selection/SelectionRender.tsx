import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import RequiredStar from "../RequireStar";

const SelectionRender = ({ data, updateInputForm }: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <div className="">
      <Label htmlFor={data.label} className="">
        {data.label}
        {data.required && <RequiredStar />}
      </Label>
      <Select name={data.label} onValueChange={(e)=>{
        updateInputForm(e, data)
      }} required={data.required}>
        <SelectTrigger
          id={data.label}
          name={data.label}
          disabled={data.disable}
          className="w-full"
        >
          <SelectValue placeholder={data.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data?.options?.map((item: any, index: number) => {
              return (
                <SelectItem key={index} value={item.name}>
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectionRender;
