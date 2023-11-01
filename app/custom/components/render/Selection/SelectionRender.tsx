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
import { useAppSelector } from "@/app/redux/hook";
import { calculateTextColor } from "@/lib/formController";

const SelectionRender = ({
  data,
  updateInputForm,
  inputForm,
  error,
  isSubscribed,
}: any) => {
  const { form } = useAppSelector((state) => state.formReducer);

  return data.hidden ? (
    <></>
  ) : (
    <div className="relative mb-2">
      {data?.pro?.hideFieldName && isSubscribed ? null : (
        <Label htmlFor={data.label} className="text-lg cursor-text">
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
          className="text-muted-foreground text-sm my-2"
          dangerouslySetInnerHTML={{
            __html: data?.help,
          }}
        ></p>
      )}
      {data.required && data?.pro?.hideFieldName && isSubscribed && (
        <div className="absolute -top-2 -right-2">
          <RequiredStar />
        </div>
      )}
      <Select
        name={data.label}
        onValueChange={(e) => {
          updateInputForm(e, data);
        }}
        value={inputForm[data.mapTo]?.value}
        required={data.required}
      >
        <SelectTrigger
          id={data.label}
          name={data.label}
          disabled={data.disable}
          className={`w-full shadow-sm hover:shadow-md ${
            error && "border border-red-500"
          }`}
          style={{
            backgroundColor:
              form?.pro?.customizations?.light?.enableBackgroundColor &&
              isSubscribed
                ? form?.pro?.customizations?.light?.inputColor
                : null,
            ...(form?.pro?.customizations?.light?.enableBackgroundColor &&
              isSubscribed &&
              form?.pro?.customizations?.light?.inputColor && {
                color: calculateTextColor(
                  form?.pro?.customizations?.light?.inputColor
                ),
              }),
          }}
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
            className="text-muted-foreground text-sm my-2"
            dangerouslySetInnerHTML={{
              __html: data?.help,
            }}
          ></p>
        )}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default SelectionRender;
