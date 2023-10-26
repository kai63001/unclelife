import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RequiredStar from "../RequireStar";
import React from "react";
import { useAppSelector } from "@/app/redux/hook";
import { calculateTextColor } from "@/lib/formController";

const RichTextRender = ({
  data,
  updateInputForm,
  error,
  isSubscribed,
}: any) => {
  const { form } = useAppSelector((state) => state.formReducer);

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
      <Textarea
        onChange={(e) => updateInputForm(e.target.value, data)}
        name={data.label}
        id={data.label}
        className={`mt-1 block w-full ${
          error ? "border-red-500" : ""
        } shadow-sm`}
        placeholder={
          data?.pro?.placeholder && isSubscribed ? data?.pro?.placeholder : ""
        }
        disabled={data.disable}
        required={data.required}
        style={{
          backgroundColor:
            form?.pro?.customizations?.light?.enableBackgroundColor &&
            isSubscribed
              ? form?.pro?.customizations?.light?.inputColor
              : null,
          color:
            form?.pro?.customizations?.light?.enableBackgroundColor &&
            isSubscribed
              ? calculateTextColor(form?.pro?.customizations?.light?.inputColor)
              : undefined,
        }}
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
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default RichTextRender;
