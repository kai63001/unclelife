import { Label } from "@/components/ui/label";
import RequiredStar from "../RequireStar";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PhoneComponentInput from "./PhoneComponentInput";

const PhoneRender = ({
  data,
  type = "text",
  updateInputForm,
  error,
  isSubscribed,
}: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <div className="relative mb-2">
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
      <PhoneInput
        className={`mt-1 block w-full ${error ? "border-red-500" : ""}`}
        inputComponent={PhoneComponentInput}
        onChange={(e) => updateInputForm(e, data)}
        name={data.label}
        placeholder={
          data?.pro?.placeholder && isSubscribed ? data?.pro?.placeholder : ""
        }
        id={data.label}
        disabled={data.disable}
        required={data.required}
        type={type}
      />
      {!data?.helpPositionAboveInput &&
        data?.helpPositionAboveInput != undefined && (
          <p
            className="text-muted-foreground text-sm my-2"
            dangerouslySetInnerHTML={{
              __html: data?.help,
            }}
          ></p>
        )}
      {/*    error message*/}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default PhoneRender;
