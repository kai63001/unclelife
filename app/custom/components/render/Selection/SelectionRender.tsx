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

const SelectionRender = ({ data }: any) => {
  return (
    data.hidden ? <></> :
    <div className="">
      <Label className="">{data.label}{data.required && <RequiredStar />}</Label>
      <Select required={data.required}>
        <SelectTrigger disabled={data.disable} className="w-full">
          <SelectValue placeholder={data.placeholder || data.label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data.options.map((item: any, index: number) => {
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
