import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RequiredStar from "../RequireStar";
import React from "react";

const RichTextRender = ({
  data,
  updateInputForm,
  error,
  isSubscribed,
}: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <>
      <Label htmlFor={data.label} className="text-lg font-bold cursor-text">
        <span
          className="inline-block"
          dangerouslySetInnerHTML={{
            __html: data?.label,
          }}
        ></span>
        {data.required && <RequiredStar />}
      </Label>
      {(data?.helpPositionAboveInput ||
        data?.helpPositionAboveInput == undefined) && (
          <p
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: data?.help,
            }}
          ></p>
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
      />
      {(!data?.helpPositionAboveInput && data?.helpPositionAboveInput != undefined) && (
        <p
          className="text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: data?.help,
          }}
        ></p>
      )}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </>
  );
};

export default RichTextRender;
