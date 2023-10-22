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

const SelectionRender = ({
  data,
  updateInputForm,
  error,
  isSubscribed,
}: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <>
      {data?.pro?.hideFieldName && isSubscribed ? null : (
        <Label htmlFor={data.label} className="text-lg font-bold cursor-text">
          <span
            className="inline-block"
            dangerouslySetInnerHTML={{
              __html: data?.label,
            }}
          ></span>
          {data.required && <RequiredStar />}
        </Label>
      )}
      {(data?.helpPositionAboveInput ||
        data?.helpPositionAboveInput == undefined) && (
        <p
          className="text-muted-foreground text-xs"
          dangerouslySetInnerHTML={{
            __html: data?.help,
          }}
        ></p>
      )}
      <Select
        name={data.label}
        onValueChange={(e) => {
          updateInputForm(e, data);
        }}
        required={data.required}
      >
        <SelectTrigger
          id={data.label}
          name={data.label}
          disabled={data.disable}
          className={`w-full shadow-sm hover:shadow-md ${
            error && "border border-red-500"
          }`}
        >
          <SelectValue
            placeholder={
              data?.pro?.placeholder && isSubscribed
                ? data?.pro?.placeholder
                : ""
            }
          />
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
      {!data?.helpPositionAboveInput &&
        data?.helpPositionAboveInput != undefined && (
          <p
            className="text-muted-foreground text-xs"
            dangerouslySetInnerHTML={{
              __html: data?.help,
            }}
          ></p>
        )}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </>
  );
};

export default SelectionRender;
