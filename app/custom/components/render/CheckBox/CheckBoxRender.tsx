"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CheckBoxRender = ({
  data,
  updateInputForm,
  error,
  isSubscribed,
}: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <>
      {(data?.helpPositionAboveInput ||
        data?.helpPositionAboveInput == undefined) && (
        <p
          className="text-muted-foreground text-sm my-2"
          dangerouslySetInnerHTML={{
            __html: data?.help,
          }}
        ></p>
      )}
      <Checkbox
        disabled={data.disable}
        required={data.required}
        id={data.label}
        onCheckedChange={(e) => {
          updateInputForm(e, data);
        }}
        className={`mr-1 select-none ${error && "border border-red-500"}`}
      />
      <Label
        htmlFor={data.label}
        className={`text-lg font-bold cursor-text leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
          error && "text-red-500"
        }`}
      >
        {data.required && <span className="text-red-500">*</span>}{" "}
        <span
          className="inline-block"
          dangerouslySetInnerHTML={{
            __html: data?.label,
          }}
        ></span>
      </Label>
      {!data?.helpPositionAboveInput &&
        data?.helpPositionAboveInput != undefined && (
          <p
            className="text-muted-foreground text-sm my-2"
            dangerouslySetInnerHTML={{
              __html: data?.help,
            }}
          ></p>
        )}
    </>
  );
};

export default CheckBoxRender;
