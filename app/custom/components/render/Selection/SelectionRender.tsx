import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SelectionRender = ({ data }: any) => {
  return (
    <div className="">
        <Label className="">{data.label}</Label>
      <Select>
        <SelectTrigger className="w-full">
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
