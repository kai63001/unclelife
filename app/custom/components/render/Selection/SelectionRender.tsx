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

const SelectionRender = ({ data, updateInputForm, error, isSubscribed }: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <>
      <Label htmlFor={data.label} className="text-lg font-bold cursor-text">
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
          className={`w-full shadow-sm ${error && 'border border-red-500'}`}
        >
          <SelectValue placeholder={(data?.pro?.placeholder && isSubscribed) ? data?.pro?.placeholder : ''} />
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
        {error && (
            <div className="text-red-500 text-xs mt-1">
                {error}
            </div>
        )}
    </>
  );
};

export default SelectionRender;
