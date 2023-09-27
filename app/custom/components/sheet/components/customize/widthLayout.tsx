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

const widthLayoutList = [
  {
    id: "1",
    name: "Full",
    value: "w-full",
  },
  {
    id: "2",
    name: "Half",
    value: "w-1/2",
  },
  {
    id: "3",
    name: "Third",
    value: "w-1/3",
  },
  {
    id: "4",
    name: "Quarter",
    value: "w-1/4",
  },
  {
    id: "5",
    value: "w-2/3",
    name: "Two Third",
  },
  {
    id: "6",
    value: "w-3/4",
    name: "Three Quarter",
  },
];
const WidthLayout = ({ data, onChange }:any) => {
  return (
    <div>
      <Label>Field Layout</Label>
      <Select
        defaultValue={data?.pro?.layout || "w-full"}
        onValueChange={(e)=>onChange(e, "layout", "w-full")}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a layout" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Width Layout</SelectLabel>
            {/* <SelectItem value="apple">Apple</SelectItem> */}
            {widthLayoutList.map((item) => (
              <SelectItem key={item.id} value={item.value}>
                ({item.value}) {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default WidthLayout;
